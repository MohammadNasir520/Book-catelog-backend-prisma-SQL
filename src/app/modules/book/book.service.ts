import { Book } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';

const insertIntoDB = async (data: Book): Promise<Book> => {
  const result = await prisma.book.create({
    data,
    include: {
      category: true,
    },
  });
  return result;
};

const getAllFromDB = async (
  options: IPaginationOptions
): Promise<IGenericResponse<Book[]>> => {
  console.log(options);

  const { page, limit, skip } = paginationHelpers.calculatePagination(options);

  console.log(page, limit, skip);

  const result = await prisma.book.findMany({
    include: {
      category: true,
    },
    skip,
    take: limit,
    orderBy: {
      [options.sortBy as string]: options.sortOrder,
    },
  });

  return {
    meta: {
      total: 0,
      page,
      limit,
    },
    data: result,
  };
};

const getByIdFromDB = async (id: string): Promise<Book | null> => {
  const result = await prisma.book.findUnique({
    where: {
      id,
    },
  });
  return result;
};

const updateIntoDB = async (
  id: string,
  payload: Partial<Book>
): Promise<Book> => {
  const result = await prisma.book.update({
    where: {
      id: id,
    },
    data: payload,
  });
  return result;
};

const deleteFromDB = async (id: string) => {
  const result = await prisma.book.delete({
    where: {
      id: id,
    },
  });
  return result;
};

const getAllFromDBByCategoryId = async (
  categoryId: string
): Promise<Book[]> => {
  const result = await prisma.book.findMany({
    where: {
      categoryId: categoryId,
    },
    include: {
      category: true,
    },
  });
  return result;
};

export const BookService = {
  insertIntoDB,
  getAllFromDB,
  getByIdFromDB,
  updateIntoDB,
  deleteFromDB,
  getAllFromDBByCategoryId,
};
