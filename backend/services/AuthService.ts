import UserModel from "../models/User";
import User from "../interfaces/User";

export const storeUser = async (user: any): Promise<User> => {
    try {
      const createdUser = await UserModel.create(user);
      return createdUser;
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  }

  export const getUserByEmail = async (email: any): Promise<User | null> => {
    try {
      const foundUser = await UserModel.findOne(email);
      return foundUser;
    } catch (error) {
      console.error("Error fetching user:", error);
      throw error;
    }
  }
