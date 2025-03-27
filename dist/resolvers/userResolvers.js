"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userResolvers = void 0;
//userResolvers.ts
exports.userResolvers = {
    Mutation: {
        registerUser: async (_, { name, email, password }, { userService }) => userService.registerUser(name, email, password),
    },
};
