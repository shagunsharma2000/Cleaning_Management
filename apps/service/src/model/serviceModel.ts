// import { DataTypes, Model } from "sequelize";
// import sequelize from '../dbconfig/dbConnection'; 
// import Status from '../utils/enums/indexEnums';
// import {serviceData} from "../utils/interface/serviceinterface"
// import { defaultValueSchemable } from "sequelize/types/utils";


// class service extends Model <serviceData> {
//     public id!: number;
//     public name!: string;
//     public description!: string;
//     public duration!: String;
//     public price!: number;
//     public status!: Status;
//     public dateTime!: Date;
//     public isDeleted!: boolean;
//     public deletedBy!: string;
//     public deletedAt!: Date;
//     public createdAt!: Date;
//     public updatedAt!: Date;
// }

// service.init({ 
//     id: {
//         type: DataTypes.UUID,
//         defaultValue: DataTypes.UUIDV4,
//         allowNull: false,
//         primaryKey: true
//     },
//     name: {
//         type: DataTypes.STRING(50),
//         allowNull: false
//     },
//     description: {
//         type: DataTypes.STRING,
//       },
//       duration: {
//         type: DataTypes.NUMBER,
//         allowNull: false,
//       },
//       price: {
//         type: DataTypes.NUMBER,
//         allowNull: false,
//       },
//       status: {
//         type: DataTypes.ENUM,
//         values: Object.values(Status),
//         allowNull: false  
//     },
//     dateTime:{
//         type: DataTypes.DATE,
//         allowNull: false 
//     },
//     isDeleted: {
//         type: DataTypes.BOOLEAN,
//         defaultValue: false,
//     },
//     deletedBy: {
//         type: DataTypes.UUID,
//         allowNull: true,
//     },
//     deletedAt: {
//         type: DataTypes.DATE,
//         allowNull: true,
//     },

// }, {
//     sequelize,
//     modelName: 'service' 
// });

// sequelize.sync()
//     .then(() => {
//         console.log('dcbnmbvc');   
//         console.log('service table linked successfully!');
//     })
//     .catch((error) => {
//         console.error('Unable to create table: ', error);
//     });

// export default service;















import { DataTypes, Model } from "sequelize";
import sequelize from '../dbconfig/dbConnection'; 
import Status from '../utils/enums/indexEnums';
import { serviceData } from "../utils/interface/serviceinterface";

class Service extends Model<serviceData> {
    public id!: number;
    public name!: string;
    public description!: string;
    public duration!: string;
    public price!: number;
    public status!: Status;
    public dateTime!: Date;
    public isDeleted!: boolean;
    public deletedBy!: string | null;
    public deletedAt!: Date | null;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Service.init({ 
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
    description: {
        type: DataTypes.STRING,
    },
    duration: {
        type: DataTypes.STRING, // Assuming duration is a string, change it accordingly
        allowNull: false,
    },
    price: {
        type: DataTypes.FLOAT, // Change the type to INTEGER if it's an integer
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM,
        values: Object.values(Status),
        allowNull: false  
    },
    dateTime: {
        type: DataTypes.DATE,
        allowNull: false 
    },
    isDeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    deletedBy: {
        type: DataTypes.UUID,
        allowNull: true,
    },
    deletedAt: {
        type: DataTypes.DATE,
        allowNull: true,
    },
}, {
    sequelize,
    modelName: 'service',
});

sequelize.sync()
    .then(() => {
        console.log('Service table linked successfully!');
    })
    .catch((error) => {
        console.error('Unable to create table: ', error);
    });

export default Service;
