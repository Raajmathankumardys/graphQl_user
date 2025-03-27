//userResolvers.ts
export const userResolvers = {
  Mutation: {
    registerUser: async (_: any, { name, email, password }: any, { userService }: any) =>
      userService.registerUser(name, email, password),
  },
};
