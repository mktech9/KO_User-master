"use server";

import Vendor from "@/utils/mongo-models/vendor";
import connectMongo from "@/utils/mongoose";
import { defaultWebsite } from "./websites";
import { GetHeaders } from "./get-label";

let configs;

export const SetLabel = async () => {
  let label = await GetHeaders();

  let value;

  await connectMongo();
  const vendor = await Vendor.findOne({
    url: { $in: [`https://${label}`, `http://${label}`] },
  }).lean();

  if (!vendor || !vendor.isActive) {
    value = defaultWebsite;
    value.website = process.env.website;
  } else {
    value = {
      name: vendor.name,
      color: Array(10).fill(vendor?.color),
      secondaryColor: Array(10).fill(vendor?.secondaryColor),
      logo_header: vendor.logo.publicUrl,
      logo_footer: vendor.logo.publicUrl,
      label: vendor.tag,
      email: vendor.contactEmail,
      contact: vendor.contactNumber,
      favicon: vendor.favicon?.publicUrl,
      url: vendor.url,
      commission: vendor.commission,
      commissionType: vendor.commissionType,
      socialMedia: vendor.socialMedia,
      about: vendor.about,
      updatedAt: vendor.updatedAt,
      website: process.env.website,
      footerText: vendor.footerText,
      contactData: {
        address: vendor.address,
        email: vendor.contactEmail,
        contact: vendor.contactNumber,
      },
      increment: vendor.increment ?? 0,
    };
  }

  configs = value;
  return configs;
};
