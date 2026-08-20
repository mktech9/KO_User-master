"use server";

import User from "@/utils/mongo-models/user";
import connectMongo from "@/utils/mongoose";
import { CreateUser } from "../manage-user";
import Address from "@/utils/mongo-models/address";

export const HandleNotAuthenticated = async (user, address, label) => {
  try {
    await connectMongo();
    let userData;

    const userExists = await User.findOne({ username: user.email })
      .limit(1)
      .lean();
    if (userExists) {
      userData = userExists;
    } else {
      const { success, user: userDoc } = await CreateUser(user, label);
      console.log({ success, userDoc });
      if (!success) {
        throw new Error("Error occured!");
      }

      for (let i = 0; i < address?.length; i++) {
        let addressItem = address[i];
        addressItem.userId = userDoc._id;

        await new Address(addressItem).save();
      }

      userData = userDoc;
    }

    if (!userData?._id) {
      throw new Error("Error occured!");
    }

    return userData;
  } catch (err) {
    console.log(err);
    throw new Error("Error occured!");
  }
};
