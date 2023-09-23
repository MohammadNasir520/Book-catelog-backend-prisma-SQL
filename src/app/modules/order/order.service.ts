import { Order } from '@prisma/client';
import { JwtPayload } from 'jsonwebtoken';
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

const getByIdFromDB = async (id: string): Promise<Order | null> => {
  const result = await prisma.order.findUnique({
    where: {
      id,
    },
  });
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

const updateIntoDB = async (
  id: string,
  payload: Partial<Order>
): Promise<Order> => {
  const result = await prisma.order.update({
    where: {
      id: id,
    },
    data: payload,
  });
  return result;
};

const deleteFromDB = async (id: string) => {
  const result = await prisma.order.delete({
    where: {
      id: id,
    },
  });
  return result;
};

const getAllFromDBByCategoryId = async (
  categoryId: string
): Promise<Order[]> => {
  const result = await prisma.order.findMany({});
  return result;
};

export const OrderService = {
  insertIntoDB,
  getAllFromDB,
  getByIdFromDB,
  updateIntoDB,
  deleteFromDB,
  getAllFromDBByCategoryId,
  getAllFromDBForSpecificCustomer,
};
