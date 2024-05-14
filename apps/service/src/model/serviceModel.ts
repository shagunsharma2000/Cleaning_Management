import { DataTypes, Model } from 'sequelize';
import sequelize from '../dbconfig/dbConnection';
import Status from '../utils/enums/indexEnums';
import { serviceData } from '../utils/interface/serviceinterface';

class Service extends Model<serviceData> {
  public id!: number;
  public name!: string;
  public description!: string;
  public duration!: string;
  public price!: number;
  public status!: Status;
  public address: string;
  public dateTime!: Date;
  public isDeleted!: boolean;
  public deletedBy!: string | null;
  public deletedAt!: Date | null;
}

Service.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
    },
    duration: {
      type: DataTypes.STRING, // Assuming duration is a string, change it accordingly
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM,
      values: Object.values(Status),
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dateTime: {
      type: DataTypes.DATE,
      allowNull: false,
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
  },
  {
    sequelize,
    modelName: 'service',
  },
);

sequelize
  .sync()
  .then(() => {
    console.log('Service table linked successfully!');
  })
  .catch((error) => {
    console.error('Unable to create table: ', error);
  });

export default Service;
