import { DataTypes, Model } from 'sequelize';
import { ILocationData } from '../utils/interface/customerinterface';
import sequelize from '../dbConfig/dbConnection';

class Location extends Model<ILocationData> {
  public id!: string;
  public serviceproviderId: string;
  public start!: { latitude: number; longitude: number };
  public end!: { latitude: number; longitude: number };
  public distance: number;
  public isDeleted!: boolean;
  public deletedBy!: string;
  public deletedAt!: Date;
  public createdAt!: Date;
  public updatedAt!: Date;
}

Location.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    serviceproviderId: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },

    start: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    end: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    distance: {
      type: DataTypes.FLOAT, 
      allowNull: true, 
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
    modelName: 'Location',
  },
);
sequelize
  .sync()
  .then(() => {
    console.log('Customer table linked successfully!');
  })
  .catch((error) => {
    console.error('Unable to create table: ', error);
  });

export default Location;
