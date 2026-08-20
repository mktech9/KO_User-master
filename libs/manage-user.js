"use server";

import { GetUserRef, setAuthCookies } from "@/auth";
import { encrypt } from "@/auth/encrypt";
import { SendNewUserEmail } from "@/utils/mail-templates/order";
import Reseller from "@/utils/mongo-models/reseller";
import User from "@/utils/mongo-models/user";
import connectMongo from "@/utils/mongoose";
import { compare, hash } from "bcryptjs";
import { redirect } from "next/navigation";
import { SetLabel } from "../app/labels-async";

export const CreateUser = async (doc, label) => {
  try {
    await connectMongo();
    let user;

    const configs = await SetLabel();

    const check = await User.findOne({ username: doc.email }).lean();
    if (check) {
      user = check;
    } else {
      const hashedPassword = await hash(doc.password ?? "1234567890", 12);
      const newItem = new User({
        ...doc,
        username: doc.email,
        password: hashedPassword,
        tag: configs?.label,
      });
      await newItem.save();

      await SendNewUserEmail(doc.email);

      user = newItem;
    }

    return { success: true, user };
  } catch (err) {
    console.log(err);
    return { success: false, err: err?.message };
  }
};

export const CreateUserForSignUp = async (doc) => {
  try {
    await connectMongo();
    let user;

    const check = await User.findOne({ username: doc.email }).lean();
    if (check) {
      throw new Error(
        "An user with this following credentials already exists!"
      );
    } else {
      const configs = await SetLabel();

      const hashedPassword = await hash(doc.password, 12);
      const newItem = new User({
        ...doc,
        username: doc.email,
        password: hashedPassword,
        tag: configs?.label,
      });
      await newItem.save();

      await SendNewUserEmail(doc.email);

      user = newItem;
    }

    return { success: true, user };
  } catch (err) {
    console.log(err);
    return { success: false, err: err?.message };
  }
};

export const LoginToLocalAccount = async (email, pass) => {
  try {
    await connectMongo();
    let user;

    const check = await User.findOne({ username: email });
    if (!check) {
      throw new Error("Invalid email address!");
    }

    user = check;

    console.log(pass, user.password);
    const passCheck = await compare(pass, user.password);

    // if (!passCheck) {
    //   throw new Error("Invalid password!");
    // }

    if (user.userType === "reseller" && !user.isApproved) {
      throw new Error("Invalid credentials!");
    }

    if (user.userType === "reseller") {
      const resellerData = await Reseller.findById(user.resellerId).lean();

      if (resellerData?.resetPassword) {
        return {
          redirect: true,
          link: `/reset-password/${user.resellerId}`,
        };
      }
    }

    return {
      success: true,
      user: {
        _id: user._id,
        username: email,
        name: user.name,
        mobile: user.mobile,
        countryCode: user.countryCode,
        type: user.type,
        userType: user.userType ?? "customer",
      },
    };
  } catch (err) {
    console.log(err);
    return { success: false, err: err?.message };
  }
};

export const SetSession = async (user) => {
  const token = encrypt(user._id, "mysecret");
  setAuthCookies({
    access: token,
    ref: user._id,
    id: user.username,
    userType: user.userType,
  });
  return redirect("/");
};

export const CheckIsReseller = async () => {
  try {
    const _id = await GetUserRef();
    const user = await User.findById(_id).lean();

    if (user.userType === "reseller" && user.isApproved) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const CheckIsPaylater = async () => {
  try {
    const _id = await GetUserRef();
    const user = await User.findById(_id).lean();
    let payLater = await Reseller.findById(user.resellerId).lean();

    if (payLater.payLater) {
      return true;
    } else {
      throw new Error("Not a reseller related account!");
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};
