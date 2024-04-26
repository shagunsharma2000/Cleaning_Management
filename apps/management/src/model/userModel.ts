import { DataTypes, Model } from "sequelize";
import sequelize from '../dbConfigure/dbConnection';
import  Role  from "../utils/enums/indexEnums"; // Assuming Role is an enum

interface IUserAttributes {
    id: string;
    name: string;
    phonenumber: string; // Changed to string as BigInt is not supported by Sequelize
    password: string;
    email: string;
    address: string;
    available: boolean;
    Role: Role; // Changed to lowercase as per naming convention
}

class User extends Model<IUserAttributes> implements IUserAttributes {
    public id!: string;
    public name!: string;
    public phonenumber!: string;
    public password!: string;
    public email!: string;
    public address!: string;
    public available!: boolean;
    public Role!: Role; // Changed to lowercase as per naming convention
    public isDeleted!: boolean;
    public deletedBy!: string;
    public deletedAt!: Date;
    public createdAt!: Date;
    public updatedAt!: Date;
}

User.init({ 
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
        type: DataTypes.STRING(15), // Adjusted to string type with a length
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(100), // Adjusted the length as per common email length
        allowNull: false,
        validate: {
            isEmail: true // Adding email format validation
        }
    },
    address: {
        type: DataTypes.STRING(100), // Adjusted the length as per requirement
        allowNull: false
    },
    available: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    Role: {
                 type: DataTypes.ENUM,
                 values: Object.values(Role),
                 allowNull: false 
             },
}, {
    sequelize,
    modelName: 'User' 
});

sequelize.sync()
    .then(() => {
        console.log('User table linked successfully!');
    })
    .catch((error) => {
        console.error('Unable to create table: ', error);
    });

export default User;
