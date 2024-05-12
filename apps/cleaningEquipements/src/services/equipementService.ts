import Equipements from '../models/equipementModel';
import logger from '../utils/logger';
import slugify from 'slugify';

export class equipementServices {
  public static async addTools(body: any) {
    try {
      const slug = slugify(body.toolName, { lower: true });

      const tool = await Equipements.create({
        toolName: body.toolName,
        description: body.description,
        slug: slug,
      });
      return tool;
    } catch (err: any) {
      logger.error(err);
      throw new Error(err.message);
    }
  }

  //Listing of tools
  public static async toolListing(query: any) {
    try {
      const toolData = await Equipements.findAll({
        where: { isDeleted: false },
        attributes: ['id', 'name', 'description', 'price'],
        order: [['createdAt', 'asc']],
        offset: query.page ? (parseInt(query.page) - 1) * parseInt(query.limit) : 0,
        limit: query.limit ? parseInt(query.limit) : 10,
      });
      return toolData;
    } catch (err: any) {
      logger.error(err);
      throw new Error(err.message);
    }
  }
  //Get tool by id
  public static async getById(toolId: string) {
    try {
      const tool = await Equipements.findOne({ where: { id: toolId } });
      if (tool) {
        return tool;
      } else {
        throw new Error('Tool not found');
      }
    } catch (err: any) {
      logger.error(err);
      throw new Error(err.message);
    }
  }

  //Update Tools
  public static async toolUpdate(params: any, body: any) {
    try {
      const tools = await Equipements.findOne({
        where: {
          id: params.id,
        },
      });
      if (!tools) {
        return 'notExist';
      } else {
        return await tools.update(body);
      }
    } catch (err: any) {
      logger.error(err);
      throw new Error(err.message);
    }
  }
  //Soft Delete tool
  public static async toolDelete(toolId: string) {
    try {
      const tool = await Equipements.findOne({ where: { id: toolId } });
      if (!tool) {
        return 'NotExist';
      } else {
        const today = new Date();
        return await tool.update({ isDeleted: true, deletedAt: today });
      }
    } catch (err: any) {
      logger.error(err);
      throw new Error(err.message);
    }
  }
}

export default equipementServices;
