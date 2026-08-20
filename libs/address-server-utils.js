"use server";

import { GetUserRef } from "@/auth";
import Address from "@/utils/mongo-models/address";
import Delivery from "@/utils/mongo-models/delivery";
import connectMongo from "@/utils/mongoose";

export const AddAddress = async (item) => {
  try {
    const _id = await GetUserRef();
    await connectMongo();

    let newAddress = new Address({ ...item, userId: _id });
    await newAddress.save();

    return true;
  } catch (err) {}
};

export const RemoveAddress = async (id) => {
  try {
    await connectMongo();

    await Address.findByIdAndDelete(id);
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const EditAddress = async (item, id) => {
  try {
    const _id = await GetUserRef();
    await connectMongo();

    await Address.findByIdAndUpdate(
      id,
      {
        $set: { ...item, userId: _id },
      },
      { new: true }
    );

    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const GetAddress = async () => {
  try {
    const _id = await GetUserRef();
    await connectMongo();

    const items = await Address.find({ userId: _id }).lean();
    return items;
  } catch (err) {
    console.log(err);
    return [];
  }
};

export const GetDelivery = async () => {
  try {
    await connectMongo();
    const items = await Delivery.find({}).lean();
    return items;
  } catch (err) {
    console.log(err);
    return [];
  }
};
