import { Request, Response } from 'express';
import { equipementServices } from '../services/equipementService';
import { message, statusCode } from '../utils/constants';
import { failAction, successAction } from '../utils/response';
import logger from '../utils/logger';
import { fail } from 'assert';
import Equipements from '../models/equipementModel';

class equipementController {
  //AddTool
  public static async addTool(req: Request, res: Response) {
    try {
      const tool = await equipementServices.addTools(req.body);
      if (tool) {
        res.status(statusCode.success).json(successAction(statusCode.success, tool, message.alreadyExist('tool')));
      } else {
        res.status(statusCode.success).json(successAction(statusCode.success, tool, message.add('tool')));
      }
    } catch (err: any) {
      logger.error(message.errorLog('addTool', 'equipementController', err));
      res.status(statusCode.badRequest).json(failAction(statusCode.badRequest, err.message, message.somethingWrong));
    }
  }
  //listing of tools
  public static async toolListing(req: Request, res: Response) {
    try {
      const data = await equipementServices.toolListing(req.query);
      res.status(statusCode.success).json(successAction(statusCode.success, data, message.fetch('User')));
    } catch (err: any) {
      logger.error(message.errorLog('toolListing', 'equipementController', err));
      res.status(statusCode.badRequest).json(failAction(statusCode.badRequest, err.message, message.somethingWrong));
    }
  }

  //Get tool by id
  public static async getToolById(req: Request, res: Response) {
    try {
      const toolId = req.params.id;
      const tool = await equipementServices.getById(toolId);
      if (tool) {
        res.status(statusCode.success).json(successAction(statusCode.success, tool, message.fetch('tools')));
      }
      res.status(statusCode.notFound).json(failAction(statusCode.notFound, message.notExist('tool')));
    } catch (err: any) {
      logger.error(message.errorLog('specificTool', 'equipementController', err));
      res.status(statusCode.badRequest).json(failAction(statusCode.badRequest, err.message, message.somethingWrong));
    }
  }

  //Update Tools
  public static async toolUpdate(req: Request, res: Response) {
    try {
      const data = await equipementServices.toolUpdate(req.params, req.body);
      res.status(statusCode.success).json(successAction(statusCode.success, data, message.update('User')));
    } catch (err: any) {
      logger.error(message.errorLog('toolUpdate', 'equipementController', err));
      res.status(statusCode.badRequest).json(failAction(statusCode.badRequest, err.message, message.somethingWrong));
    }
  }

  //Soft Delete tool
  public static async userDelete(params: any) {
    try {
      const tool = await Equipements.findOne({
        where: {
          id: params.id,
        },
      });
      if (!tool) {
        return 'notExist';
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

export default equipementController;
