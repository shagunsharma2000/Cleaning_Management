import { DataTypes, Model } from "sequelize";
import sequelize from '../dbConfigure/dbConnection';

interface ICustomerAttributes {
    id: string;
    name: string;
    phonenumber: string; 
    password: string;
    email: string;
    address: string;
  
 
}

class Customer extends Model<ICustomerAttributes> implements ICustomerAttributes {
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
