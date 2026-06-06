import {Table, Column, Model, DataType, Validate} from 'sequelize-typescript'
import { OrderStatus } from '../../globals/types'



@Table({
    tableName: 'orders',
    modelName: 'Order',
    timestamps: true
})

class Order extends Model{
    @Column({
        primaryKey: true,
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4
    })
    declare id: string

    @Column({
        type: DataType.STRING,
        allowNull: false,
        validate:{
            is: {
            args: /^[0-9]{10}$/,
            msg: "Phone number must be exactly 10 digits"
        }
        }
    })
    declare phoneNumber: string

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    declare shippingAddress: string

    @Column({
        type: DataType.FLOAT,
        allowNull: false
    })
    declare totalAmount: number

    @Column({
        type: DataType.ENUM(OrderStatus.Cancelled, OrderStatus.Delivered, OrderStatus.OnTheWay, OrderStatus.Pending, OrderStatus.Preparation),
        defaultValue: OrderStatus.Pending
    })
    declare orderStatus : string

}

export default Order