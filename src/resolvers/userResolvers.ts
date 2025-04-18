//userResolvers.ts
export const userResolvers = {
  Mutation: {
    registerUser: async (_: any, { name, email, password }: any, { userService }: any) =>
      userService.registerUser(name, email, password),
    loginUser: async (_: any, { email, password }: any, { userService }: any) => {
      return await userService.loginUser(email, password);
    }
  },
  Query: {
    getUserById: async (_: any, { userId }: any, { userService }: any) => {
      return await userService.getUserById(userId);
    }
  }  
};
