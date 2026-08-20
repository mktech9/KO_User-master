"use server";

import connectMongo from "@/utils/mongoose";
import Quotation from "@/utils/mongo-models/quotation";
import { SendQuotationMails } from "@/utils/mail-templates/order";
const website = process.env.website;

export const CreateNewQuotation = async (
  no,
  resellerId,
  items,
  summary,
  label
) => {
  try {
    await connectMongo();

    const check = await Quotation.findOne({ no });
    if (check) {
      check.reseller = resellerId;
      check.items = items;
      check.summary = summary;

      await check.save();
      return true;
    }

    const doc = {
      no,
      reseller: resellerId,
      items,
      summary,
      website,
      tag: label,
    };
    await new Quotation(doc).save();

    await SendQuotationMails(no);

    return true;
  } catch (err) {
    console.log(err);
    throw new Error(err?.message ?? "Something went wrong!");
  }
};
