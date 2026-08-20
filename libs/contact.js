"use server";

import Contact from "@/utils/mongo-models/contact";
import connectMongo from "@/utils/mongoose";
import { sendEnquiryMail } from "@/utils/enquiry-email";

const website = process.env.website;

export const CreateQuery = async (doc) => {
  try {
    await connectMongo();

    const lastEnquiry = await Contact.findOne({
      enquiryNo: { $regex: /^KRO-\d+$/ },
    })
      .sort({ createdAt: -1 })
      .select("enquiryNo")
      .lean();

    let nextNumber = 1;

    if (lastEnquiry?.enquiryNo) {
      const lastNumber = parseInt(
        lastEnquiry.enquiryNo.replace("KRO-", ""),
        10,
      );

      if (!isNaN(lastNumber)) {
        nextNumber = lastNumber + 1;
      }
    }

    const enquiryNo = `KRO-${String(nextNumber).padStart(6, "0")}`;

    console.log("GENERATED ENQUIRY NO:", enquiryNo);

    const contact = await new Contact({
      ...doc,
      enquiryNo,
      tag: process.env.vendor,
      website,
    }).save();

    console.log("SAVED CONTACT:", contact);

    try {
      await sendEnquiryMail({
        enquiryNo: contact.enquiryNo,
        name: doc.name,
        email: doc.email,
        mobile: doc.mobile,
        message: doc.message,
      });

      console.log("ENQUIRY EMAILS SENT:", contact.enquiryNo);
    } catch (emailError) {
      console.error("EMAIL ERROR:", emailError);
    }

    return {
      success: true,
      enquiryNo: contact.enquiryNo,
    };
  } catch (err) {
    console.error("CREATE QUERY ERROR:", err);

    return {
      success: false,
      enquiryNo: null,
    };
  }
};
