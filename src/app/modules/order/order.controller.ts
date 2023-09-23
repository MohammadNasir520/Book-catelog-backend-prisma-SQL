import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { JwtPayload } from 'jsonwebtoken';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { OrderService } from './order.service';

const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
  const user = req.user as JwtPayload;
  const result = await OrderService.insertIntoDB(user, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order created successfully',
    data: result,
  });
});

const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
  const user = req.user as JwtPayload;
  const result = await OrderService.getAllFromDB(user);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Orders fetched successfully',
    data: result,
  });
});

const getByIdFromDB = catchAsync(async (req: Request, res: Response) => {
  const user = req.user as JwtPayload;

  const { id } = req.params;
  const result = await OrderService.getByIdFromDB(user, id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order fetched successfully',
    data: result,
  });
});

const updateIntoDB = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const payload = req.body;

  const result = await OrderService.updateIntoDB(id, payload);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order updated successfully',
    data: result,
  });
});
const deleteFromDB = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await OrderService.deleteFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order deleted successfully',
    data: result,
  });
});

const getAllFromDBByCategoryId = catchAsync(
  async (req: Request, res: Response) => {
    const categoryId = req.params.categoryId;

    const result = await OrderService.getAllFromDBByCategoryId(categoryId);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Orders with associated category data fetched successfully',
      data: result,
    });
  }
);

export const OrderController = {
  insertIntoDB,
  getAllFromDB,
  getByIdFromDB,
  updateIntoDB,
  deleteFromDB,
  getAllFromDBByCategoryId,
};
