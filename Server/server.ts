import adminSeeder from "./src/adminSeeder";
import app from "./src/app";
import { envConfig } from "./src/config/config";
import CategoryController from "./src/controllers/categoryController";
import { connectDB } from "./src/database/connection";
import { Server, Socket } from "socket.io";
import Jwt from "jsonwebtoken";
import User from "./src/database/Models/userModels";

interface OnlineUser {
  socketId: string;
  userId: string;
  role: string;
}

async function startServer() {
  try {
    // Connect DB
    await connectDB();

    // Seed data
    await adminSeeder();
    await CategoryController.seedCategory();

    const port = envConfig.port;

    // Start HTTP server
    const server = app.listen(port, () => {
      console.log(`Server started on port ${port}`);
    });

    // Socket.IO
    const io = new Server(server, {
      cors: {
        origin: "*",
      },
      pingTimeout: 60000,
      pingInterval: 25000,
    });

    let onlineUsers: OnlineUser[] = [];

    const addToOnlineUsers = (
      socketId: string,
      userId: string,
      role: string
    ) => {
      onlineUsers = onlineUsers.filter(
        (user) => user.userId !== userId
      );

      onlineUsers.push({
        socketId,
        userId,
        role,
      });
    };

    const removeUser = (socketId: string) => {
      onlineUsers = onlineUsers.filter(
        (user) => user.socketId !== socketId
      );
    };

    io.on("connection", async (socket: Socket) => {
      console.log("Client connected:", socket.id);

      try {
        // If frontend sends token via auth
        const token =
          socket.handshake.auth?.token ||
          socket.handshake.headers.token;

        console.log("Received Token:", token);

        if (!token) {
          socket.emit("authError", "Please provide token");
          socket.disconnect(true);
          return;
        }

        const decoded: any = Jwt.verify(
          token as string,
          envConfig.jwtsecretKey as string
        );

        const userData = await User.findByPk(decoded.userId);

        if (!userData) {
          socket.emit("authError", "User not found");
          socket.disconnect(true);
          return;
        }

        addToOnlineUsers(
          socket.id,
          decoded.userId,
          userData.role
        );

        console.log("Online Users:", onlineUsers);

        io.emit("getOnlineUsers", onlineUsers);

        // Order status update event
        socket.on("updateOrderStatus", (data) => {
          const { status, orderId, userId } = data;

          console.log({
            status,
            orderId,
            userId,
          });

          const foundUser = onlineUsers.find(
            (user) => user.userId == userId
          );

          if (foundUser) {
            io.to(foundUser.socketId).emit(
              "orderStatusUpdated",
              {
                message: "Order status updated successfully",
                status,
                orderId,
              }
            );
          } else {
            socket.emit(
              "customError",
              "User is not online"
            );
          }
        });

        socket.on("disconnect", (reason) => {
          console.log(
            `Client disconnected: ${socket.id}`
          );
          console.log("Reason:", reason);

          removeUser(socket.id);

          io.emit("getOnlineUsers", onlineUsers);
        });
      } catch (err) {
        console.error("Socket Authentication Error:", err);

        socket.emit("authError", "Invalid token");
        socket.disconnect(true);
      }
    });

    io.engine.on("connection_error", (err) => {
      console.error("Connection Error:");
      console.error("Code:", err.code);
      console.error("Message:", err.message);
    });
  } catch (err) {
    console.error("Server Startup Error:", err);
  }
}

startServer();