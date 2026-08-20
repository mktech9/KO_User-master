"use server";

import { SetLabel } from "@/app/labels-async";
import PrintPrice from "@/utils/mongo-models/printPrice";
import Product from "@/utils/mongo-models/product";
import connectMongo from "@/utils/mongoose";

export const CartValidation = async (items, reseller, label) => {
  try {
    await connectMongo();

    const labels = await SetLabel();

    let cartItems = [],
      outOfStock = [],
      tampered = [],
      invalid = [];

    for (let i = 0; i < items?.length; i++) {
      const item = items[i];
      let serverItem = {};
      const serverProduct = await Product.findById(item?.product._id).lean();
      const serverPrint = await PrintPrice.findById(item?.print?._id).lean();

      let amt = reseller ? serverProduct.b2bPrice : serverProduct.price;

      let priceIncrement = 0;
      if (labels?.label !== "super") {
        let percentage = labels?.increment ?? 0;
        priceIncrement = (percentage / 100) * amt;

        if (priceIncrement > 0) amt += priceIncrement;
      }

      console.log(amt, reseller, serverProduct.b2bPrice, serverProduct.price);

      //check for quantity
      let totalForProduct = 0;
      items.forEach((doc) => {
        if (doc?.product?._id === serverProduct._id) {
          totalForProduct += doc?.config?.qty;
        }
      });

      if (totalForProduct > serverProduct?.qty) {
        outOfStock.push({ _id: item?._id, qty: serverProduct?.qty });
        continue;
      }

      //calculate server price
      if (item.config?.isPrint) {
        //check if print-price is availaible
        if (!serverPrint) {
          invalid.push(item);
          continue;
        }

        let prtprc = serverPrint;
        const rangeItem = prtprc.prices.find(
          (d) => +d.start <= item?.config?.qty && +d.end >= item?.config?.qty
        );

        if (rangeItem) {
          let rate = item.config?.printSide
              ? Math.pow(
                  +rangeItem?.double * item?.config?.qty + +rangeItem.minDouble,
                  item?.config?.printColorCount
                )
              : Math.pow(
                  +rangeItem?.single * item?.config?.qty + +rangeItem.minSingle,
                  item?.config?.printColorCount
                ),
            rateOnly = item.config?.printSide
              ? Math.pow(
                  +rangeItem?.double * item?.config?.qty,
                  item?.config?.printColorCount
                )
              : Math.pow(
                  +rangeItem?.single * item?.config?.qty,
                  item?.config?.printColorCount
                );

          const serverConfig = {
            printRate: rate,
            rate: rateOnly,
            printPerQty: item.config?.printSide
              ? rangeItem.double
              : rangeItem.single,
            printSide: prtprc.double,
            printColorCount: prtprc.color,
            printType: prtprc.printing,
            unitPrice:
              amt +
              Math.pow(
                item.config?.printSide ? rangeItem.double : rangeItem.single,
                item?.config?.printColorCount
              ),
            itemPrice: amt,
            minPrinting: item.config?.printSide
              ? +rangeItem.minDouble
              : +rangeItem.minSingle,
            total: amt * item?.config?.qty + rate,
          };

          serverItem.cartConfig = serverConfig;
        } else {
          invalid.push({ _id: item?._id });
          continue;
        }
      } else {
        serverItem.cartConfig = {
          printRate: 0,
          rate: 0,
          printPerQty: 0,
          printSide: false,
          printColorCount: 0,
          printType: false,
          unitPrice: amt,
          itemPrice: amt,
          minPrinting: 0,
          total: amt * item?.config?.qty,
        };
      }

      //check for price-tampering
      console.log("PRICE-TAMPERING => ", item?.cartConfig?.total, serverItem.cartConfig?.total);
      if (item?.cartConfig?.total !== serverItem.cartConfig?.total) {
        tampered.push({ _id: item?._id });
        continue;
      }

      //calculate commissions
      let commission = 0;
      if (label && label !== "super") {
        const vendorConfig = await SetLabel();

        let vendorCommission =
          serverProduct.commissions && serverProduct.commissions[label]
            ? serverProduct.commissions[label]
            : {
                value: vendorConfig?.commission,
                type: vendorConfig?.commissionType,
                method: "vendor",
              };

        if (vendorCommission) {
          let totalCommission =
            vendorCommission?.type === "percent"
              ? (+serverItem?.cartConfig?.total * +(vendorCommission?.value ?? 0)) /
                100
              : vendorCommission?.type === "per-qty"
              ? item?.config?.qty * +(vendorCommission?.value ?? 0)
              : vendorCommission?.method === "vendor"
              ? (vendorCommission?.value ?? 0) / items?.length
              : vendorCommission?.value ?? 0;

          commission = totalCommission;
        }
      }

      serverItem.product = serverProduct._id;
      serverItem.productData = {
        price: serverProduct.price,
        image: serverProduct.images[0]?.publicUrl,
        name: serverProduct?.name,
        brand: serverProduct?.brand,
        code: serverProduct?.code,
      };
      serverItem.print = item?.print?._id ?? item?.print;
      serverItem.config = item?.config;
      serverItem.commission = commission;

      cartItems?.push(serverItem);
    }

    if (outOfStock?.length > 0 || tampered?.length > 0 || invalid?.length > 0) {
      return { success: false, outOfStock, tampered, invalid };
    } else {
      return { success: true, cartItems };
    }
  } catch (err) {
    console.log(err);
  }
};

export const CartValidationAtCheckout = async (items, reseller) => {
  try {
    await connectMongo();

    const labels = await SetLabel();

    let outOfStock = [],
      tampered = [],
      invalid = [];

    for (let i = 0; i < items?.length; i++) {
      const item = items[i];
      let serverItem = {};
      const serverProduct = await Product.findById(item?.product._id).lean();
      const serverPrint = await PrintPrice.findById(item?.print?._id).lean();

      let amt = reseller ? serverProduct.b2bPrice : serverProduct.price;

      let priceIncrement = 0;
      if (labels?.label !== "super") {
        let percentage = labels?.increment ?? 0;
        priceIncrement = (percentage / 100) * amt;

        if (priceIncrement > 0) amt += priceIncrement;
      }

      //check for quantity
      let totalForProduct = 0;
      items.forEach((doc) => {
        console.log(doc?.product?._id, serverProduct._id);
        if (doc?.product?._id == serverProduct._id) {
          totalForProduct += doc?.config?.qty;
        }
      });

      if (totalForProduct > serverProduct?.qty) {
        outOfStock.push({ _id: item?._id, qty: serverProduct?.qty });
        continue;
      }

      //calculate server price
      if (item.config?.isPrint) {
        //check if print-price is availaible
        if (!serverPrint) {
          invalid.push(item);
          continue;
        }

        let prtprc = serverPrint;
        const rangeItem = prtprc.prices.find(
          (d) => +d.start <= item?.config?.qty && +d.end >= item?.config?.qty
        );

        if (rangeItem) {
          let rate = item.config?.printSide
            ? Math.pow(
                +rangeItem?.double * item?.config?.qty + +rangeItem.minDouble,
                item?.config?.printColorCount
              )
            : Math.pow(
                +rangeItem?.single * item?.config?.qty + +rangeItem.minSingle,
                item?.config?.printColorCount
              );

          const serverConfig = {
            printRate: rate,
            printPerQty: item.config?.printSide
              ? rangeItem.double
              : rangeItem.single,
            printSide: prtprc.double,
            printColorCount: prtprc.color,
            printType: prtprc.printing,
            unitPrice:
              amt +
              Math.pow(
                item.config?.printSide ? rangeItem.double : rangeItem.single,
                item?.config?.printColorCount
              ),
            minPrinting: item.config?.printSide
              ? +rangeItem.minDouble
              : +rangeItem.minSingle,
            total: amt * item?.config?.qty + rate,
          };

          serverItem.cartConfig = serverConfig;
        } else {
          invalid.push({ _id: item?._id });
          continue;
        }
      } else {
        serverItem.cartConfig = {
          printRate: 0,
          printPerQty: 0,
          printSide: false,
          printColorCount: 0,
          printType: false,
          unitPrice: amt,
          minPrinting: 0,
          total: amt * item?.config?.qty,
        };
      }

      console.log(item?.cartConfig?.total, serverItem.cartConfig?.total, amt);

      //check for price-tampering
      if (item?.cartConfig?.total !== serverItem.cartConfig?.total) {
        tampered.push({ _id: item?._id });
        continue;
      }
    }

    if (outOfStock?.length > 0 || tampered?.length > 0 || invalid?.length > 0) {
      return { success: false, outOfStock, tampered, invalid };
    } else {
      return { success: true };
    }
  } catch (err) {
    console.log(err);
  }
};
