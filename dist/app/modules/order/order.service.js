"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const insertIntoDB = (user, OrderData) => __awaiter(void 0, void 0, void 0, function* () {
    const orderData = {
        userId: user.userId,
        orderedBooks: OrderData.orderedBooks,
    };
    const result = yield prisma_1.default.order.create({
        data: orderData,
    });
    return result;
});
const getAllFromDB = (user) => __awaiter(void 0, void 0, void 0, function* () {
    if (user.role === 'admin') {
        const result = yield prisma_1.default.order.findMany({});
        return result;
    }
    else if (user.role === 'customer') {
        const result = yield prisma_1.default.order.findMany({
            where: {
                userId: user.userId,
            },
        });
        return result;
    }
});
const getByIdFromDB = (user, id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.order.findUnique({
        where: {
            id,
        },
    });
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'order not found');
    }
    if ((user.role === 'customer' && user.userId != (result === null || result === void 0 ? void 0 : result.userId)) ||
        user.role != 'admin') {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, 'hei thief, you are not the creator of the order');
    }
    return result;
});
const getAllFromDBForSpecificCustomer = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.order.findMany({
        where: {
            userId: user.userId,
        },
    });
    return result;
});
exports.OrderService = {
    insertIntoDB,
    getAllFromDB,
    getByIdFromDB,
    getAllFromDBForSpecificCustomer,
};
