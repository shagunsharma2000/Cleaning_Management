import { DataTypes, Model } from "sequelize";
import sequelize from '../dbConfigure/dbConnection';
import  Role  from "../utils/enums/indexEnums"; 
import {UserData} from "../../src/utils/interface/userInterface"


class User extends Model <UserData> {
    public id!: string;
    public name!: string;
    public phonenumber!: string;
    public password!: string;
    public email!: string;
    public address!: string;
    public available!: boolean;
    public assignedServices!: string;
    public role!: Role;
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
    available: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    assignedServices: {
        type: DataTypes.ARRAY(DataTypes.UUID), // Assuming assignedServices is an array of UUIDs
        allowNull: true,
    },
    role: {
        type: DataTypes.ENUM,
        values: Object.values(Role),
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
    modelName: 'User' 
});

sequelize.sync()
    .then(() => {
        console.log('dcbnmbvc');   
        console.log('User table linked successfully!');
    })
    .catch((error) => {
        console.error('Unable to create table: ', error);
    });

export default User;
