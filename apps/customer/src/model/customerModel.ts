import { DataTypes, Model } from "sequelize";
import sequelize from '../dbConfig/dbConnection';
import {CustomerData} from '../utils/interface/customerinterface';

class Customer extends Model<CustomerData> {
    public id!: string;
    public name!: string;
    public phonenumber!: string;
    public password!: string;
    public email!: string;
    public address!: string;
    public isDeleted!: boolean;
    public deletedBy!: string;
    public deletedAt!: Date;
    public createdAt!: Date;
    public updatedAt!: Date;
}

Customer.init({ 
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    phonenumber: {
        type: DataTypes.STRING(15), 
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(100), 
        allowNull: false,
        validate: {
            isEmail: true 
        }
    },
    address: {
        type: DataTypes.STRING(100), 
        allowNull: false
    },
    isDeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    deletedBy: {
        type: DataTypes.UUID, // Assuming deletedBy is a UUID
        allowNull: true,
    },
    deletedAt: {
        type: DataTypes.DATE,
        allowNull: true,
    },
}, {
    sequelize,
    modelName: 'Customer' 
});

sequelize.sync()
    .then(() => {
        console.log('Customer table linked successfully!');
    })
    .catch((error) => {
        console.error('Unable to create table: ', error);
    });

export default Customer;
