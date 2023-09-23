import { Order } from '@prisma/client';
import httpStatus from 'http-status';
import { JwtPayload } from 'jsonwebtoken';
import ApiError from '../../../errors/ApiError';
import prisma from '../../../shared/prisma';
import { OrderInput } from './order.interface';

const insertIntoDB = async (
  user: JwtPayload,
  OrderData: OrderInput
): Promise<Order> => {
  const orderData = {
    userId: user.userId,
    orderedBooks: OrderData.orderedBooks,
  };

  const result = await prisma.order.create({
    data: orderData,
  });
  return result;
};

const getAllFromDB = async (
  user: JwtPayload
): Promise<Order[] | null | undefined> => {
  if (user.role === 'admin') {
    const result = await prisma.order.findMany({});
    return result;
  } else if (user.role === 'customer') {
    const result = await prisma.order.findMany({
      where: {
        userId: user.userId,
      },
    });
    return result;
  }
};

const getByIdFromDB = async (
  user: JwtPayload,
  id: string
): Promise<Order | null> => {
  const result = await prisma.order.findUnique({
    where: {
      id,
    },
  });
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'order not found');
  }

  if (
    (user.role === 'customer' && user.userId != result?.userId) ||
    user.role != 'admin'
  ) {
    throw new ApiError(
      httpStatus.UNAUTHORIZED,
      'hei thief, you are not the creator of the order'
    );
  }

  return result;
};
const getAllFromDBForSpecificCustomer = async (
  user: JwtPayload
): Promise<Order[] | null> => {
  const result = await prisma.order.findMany({
    where: {
      userId: user.userId,
    },
  });
  return result;
};

export const OrderService = {
  insertIntoDB,
  getAllFromDB,
  getByIdFromDB,
  getAllFromDBForSpecificCustomer,
};
