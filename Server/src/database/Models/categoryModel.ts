import {Model, Table, Column, DataType} from 'sequelize-typescript'

@Table({
    tableName: "categories",
    modelName: "Çategory",
    timestamps: true
})

class Category extends Model{
    @Column({
        primaryKey: true,
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4
    })
    declare id: string

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    declare categoryName: string

}

export default Category