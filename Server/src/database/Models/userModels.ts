import { Table, Column, Model, DataType } from "sequelize-typescript";

@Table({
    tableName: "users",
    modelName: "User",
    timestamps: true,
})
class User extends Model {
    @Column({
        primaryKey: true,
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4
    })
    declare id: string;

    @Column({
        type: DataType.STRING,
        unique: true
    })
    declare username: string

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    declare email: string; // declare: Tells the typescript the property exist , email: column/property name, string: datatype in typescript

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    declare password: string;

    @Column({
        type: DataType.ENUM('customer', 'admin'),
        defaultValue: 'customer'
    })
    declare role: 'customer' | 'admin';

    @Column({
        type: DataType.STRING
    })
    declare otp: string;

    @Column({
        type: DataType.STRING
    })
    declare otpGeneratedTime: string;
}

export default User;