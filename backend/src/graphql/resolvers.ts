import bcrypt from "bcryptjs";
import User from "../models/User";
import News from "../models/News";
import { signToken } from "../utils/jwt";

export const root = {
  signup: async ({ name, email, password }: any) => {
    const existing = await User.findOne({ email });
    if (existing) throw new Error("Email already exists");

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashed });

    const token = signToken({ id: user._id });
    return { token, user };
  },

  login: async ({ email, password }: any) => {
    const user = await User.findOne({ email });
    if (!user) throw new Error("User not found");

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) throw new Error("Invalid password");

    const token = signToken({ id: user._id });
    return { token, user };
  },

  me: async (_: any, context: any) => {
    if (!context.user) return null;
    return User.findById(context.user.id);
  },

  newsByCategory: async ({ category }: any) => {
    return News.find({ category }).sort({ scrapedAt: -1 }).limit(20);
  },
};
