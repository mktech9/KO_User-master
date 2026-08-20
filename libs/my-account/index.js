"use server";

import { GetUserRef } from "@/auth";
import User from "@/utils/mongo-models/user";
import Order from "@/utils/mongo-models/order";
import connectMongo from "@/utils/mongoose";
import { compare, hash } from "bcryptjs";
import Reseller from "@/utils/mongo-models/reseller";

export const GetAccountDetails = async () => {
  try {
    await connectMongo();

    const userId = await GetUserRef();
    const item = await User.findById(userId).populate("resellerId").lean();

    return item;
  } catch (err) {
    console.log(err);
  }
};

export const GetOrders = async () => {
  try {
    await connectMongo();

    const userId = await GetUserRef();
    const items = await Order.find({ userId }).lean();

    return items;
  } catch (err) {
    console.log(err);
  }
};

export const UpdateProfileData = async (doc) => {
  try {
    await connectMongo();
    const userId = await GetUserRef();

    await User.findByIdAndUpdate(userId, { $set: doc });
    return true;
  } catch (err) {
    console.log(err);
    throw new Error(err?.message ?? "Something went wrong!");
  }
};

export const UpdatePassword = async (doc, resetPasswordChange) => {
  try {
    await connectMongo();
    const userId = await GetUserRef();
    const user = await User.findById(userId);

    const passMatches = await compare(doc.old, user.password);

    if (!passMatches) {
      throw new Error("Incorrect Password!");
    }

    const newPassword = await hash(doc.newPass, 12);

    if (resetPasswordChange) {
      await Reseller.findById(user?.resellerId, {
        $set: {
          password: newPassword,
          resetPassword: false,
        },
      });
    }

    await User.findByIdAndUpdate(userId, { $set: { password: newPassword } });
    return true;
  } catch (err) {
    console.log(err);
    throw new Error(err?.message ?? "Something went wrong!");
  }
};

export const UpdatePassword3 = async (token, password) => {
  try {
    await connectMongo();
    const user = await User.findOne({ token });

    if (!user) {
      throw new Error(
        "It seems that your reset-link is either invalid or expired!"
      );
    }

    const newPassword = await hash(password, 12);

    if (user.resellerId) {
      await Reseller.findById(user?.resellerId, {
        $set: {
          password: newPassword,
        },
      });
    }

    user.password = newPassword;
    await user.save();
    return { success: true };
  } catch (err) {
    console.log(err);
    return { success: false, msg: err?.message };
  }
};

export const UpdatePassword2 = async (doc, resetPasswordChange, id) => {
  try {
    await connectMongo();
    const user = await User.findOne({ resellerId: id });

    const passMatches = await compare(doc.old, user.password);

    if (!passMatches) {
      throw new Error("Incorrect Password!");
    }

    const newPassword = await hash(doc.newPass, 12);

    if (resetPasswordChange) {
      await Reseller.findByIdAndUpdate(user?.resellerId, {
        $set: {
          password: newPassword,
          resetPassword: false,
        },
      });
    }

    await User.findByIdAndUpdate(user._id, { $set: { password: newPassword } });
    return { success: true };
  } catch (err) {
    console.log(err);
    return { success: false, err: err?.message };
  }
};
