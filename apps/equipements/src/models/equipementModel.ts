import { DataTypes, Model } from 'sequelize';
import sequelize from '../dbConfig/dbConnection';
import slugify from 'slugify';
import { IEquipements } from '../utils/interface/IEquipements';

class Equipements extends Model<IEquipements> {
  public id!: string;
  public toolName!: string;
  public description!: string;
  public slug!: string;
  public isDeleted!: boolean;
  public deletedBy!: string;
  public deletedAt!: Date;
}

Equipements.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    toolName: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    description: {
      type: DataTypes.STRING(100),
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
    modelName: 'Equipement',
    hooks: {
      // Hook to automatically generate a slug before creating a new record

      beforeCreate: (equipenments: Equipements) => {
        equipenments.slug = slugify(equipenments.toolName, { lower: true });
      },
    },
  },
);

sequelize
  .sync()
  .then(() => {
    console.log('Equipement table linked successfully!');
  })
  .catch((error) => {
    console.error('Unable to create table: ', error);
  });

export default Equipements;
