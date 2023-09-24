"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidation = void 0;
const zod_1 = require("zod");
const UserSignUpZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({ required_error: 'name is required' }),
        email: zod_1.z.string({ required_error: 'phone number is required' }),
        role: zod_1.z.enum(['customer', 'admin'], {
            required_error: 'role is required and must be customer or buyer',
        }),
        password: zod_1.z.string({ required_error: 'password is required' }),
        contactNo: zod_1.z.string({ required_error: 'contactNo is required' }),
        address: zod_1.z.string({ required_error: 'address is required' }),
        profileImg: zod_1.z.string({ required_error: 'profileImg is required' }),
    }),
});
const UserSignInZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string({ required_error: 'phone number is required' }),
        password: zod_1.z.string({ required_error: 'password is required' }),
    }),
});
exports.userValidation = {
    UserSignUpZodSchema,
    UserSignInZodSchema,
};
