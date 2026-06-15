import {Table, Column, Model, DataType, Validate, AllowNull} from 'sequelize-typescript'
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
        type: DataType.STRING
    })
    declare addressLine: string

    @Column({
        type: DataType.STRING,
    })
    declare city: string

    @Column({
        type: DataType.STRING,
    })
    declare state: string

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
    @Column({
        type: DataType.STRING,
        allowNull: false,
        defaultValue: "Testing Anoynomus"
    })
    declare firstName: string

    @Column({
        type: DataType.STRING,
        allowNull: false,
        defaultValue: "Testing Anoynomus"
    })
    declare lastName: string

    @Column({
        type: DataType.STRING,
        allowNull: false,
        defaultValue: "Testing Anoynomus"
    })
    declare email : string
    @Column({
        type: DataType.STRING,
        allowNull: false,
        defaultValue: "Testing Anoynomus"
    })
    declare zipcode : string

}

export default Order