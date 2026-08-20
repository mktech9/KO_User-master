"use client";

import { useInput } from "@/hooks/use-input";
import { Alert, Button, Stack } from "@mantine/core";
import Step1 from "../steps/step1";
import Step2 from "../steps/step2";
import Step3 from "../steps/step3";
import SummaryTable from "../steps/summary-table";
import { useMemo, useState } from "react";
import { PiWarningDuotone } from "react-icons/pi";
import useCart from "@/hooks/use-cart";
import { uploadFileToFirebaseStorage } from "./utils";
import { notifications } from "@mantine/notifications";

const PurchaseWrapper = ({
  colors,
  printOptions,
  product,
  reseller,
  configs,
}) => {
  const { addToCart } = useCart();
  const [load, setLoad] = useState(false);

  const isVendor = configs?.label !== "super";

  //configuration
  const { input: color } = useInput(
    (v) => v !== "",
    colors && colors[0] ? { label: colors[0]?.name, value: colors[0]?.tag } : ""
  );
  const { input: print } = useInput((v) => v !== "", "");
  const { input: qty } = useInput((v) => v !== "" && v > 0, 1);

  //store print price
  const [printPrice, setPricePrice] = useState(null);

  //brand
  const { input: image } = useInput((v) => v !== "" && v !== null, null);
  const { input: text } = useInput((v) => v !== "", "");
  const { input: driveLink } = useInput((v) => v !== "", "");
  const [preview, setPreview] = useState(null);
  const [comments, setComments] = useState("");

  //calculate print price and summary
  const summary = useMemo(() => {
    let error = false,
      errorMsg = "",
      arr = [],
      range = null;

    let validPrice = reseller ? product?.b2bPrice : product?.price;

    let priceIncrement = 0;
    if (configs?.label !== "super") {
      let percentage = configs?.increment ?? 0;
      priceIncrement = (percentage / 100) * validPrice;

      if (priceIncrement > 0) validPrice += priceIncrement;
    }

    //product info
    const item = {
      title: product.name,
      qty: qty.inputValue,
      rate: validPrice,
      amt: validPrice * qty.inputValue,
    };

    arr.push(item);

    console.log(print, printPrice);

    //printing info
    let printing = null;
    if (print.isValid && printPrice) {
      let prtprc = printPrice?.data;
      const rangeItem = prtprc.prices.find(
        (doc) => +doc.start <= qty.inputValue && +doc.end >= qty.inputValue
      );

      if (rangeItem) {
        range = rangeItem;
        let rate = printPrice.double
          ? (+rangeItem?.double * qty.inputValue + +rangeItem.minDouble) *
            printPrice.color
          : (+rangeItem?.single * qty.inputValue + +rangeItem.minSingle) *
            printPrice.color;

        printing = {
          title: print.inputValue,
          qty: qty.inputValue,
          rate: printPrice.double ? +rangeItem?.double : +rangeItem?.single,
          amt: rate,
        };
      } else {
        error = true;
        errorMsg = "Quantity out of printing range!";
      }
    }

    if (printing) {
      arr.push(printing);
    }

    //subtotal
    const subTotal = {
      title: "Subtotal",
      qty: "",
      rate: "",
      amt: item.amt + (printing?.amt ?? 0),
      bold: true,
    };

    arr.push(subTotal);

    //subtotal
    const vat = {
      title: "VAT",
      qty: "",
      rate: "",
      amt: (subTotal.amt * 5) / 100,
      bold: true,
    };

    arr.push(vat);

    const total = {
      title: "Total",
      qty: "",
      rate: "",
      amt: subTotal.amt + vat.amt,
      bold: true,
    };

    arr.push(total);

    return {
      item,
      printing,
      subTotal,
      vat,
      total,
      arr,
      error,
      errorMsg,
      range,
    };
  }, [qty.inputValue, printPrice, print.inputValue, reseller]);

  //add to cart handler
  const AddToCartHandler = async () => {
    try {
      setLoad(true);
      let config = {
        color: color.inputValue,
        rangeId: summary.range?.id,
        rangeItem: summary?.range,
        qty: qty.inputValue,
        comments,
        clientSummary: {
          item: summary.item,
          printing: summary.printing,
          subTotal: summary.subTotal,
          vat: summary.vat,
          total: summary.total,
        },
      };

      if (print?.isValid && printPrice) {
        config.printName = print.inputValue;
        config.printSide = printPrice?.double;
        config.printColorCount = printPrice?.color;
        config.printType = printPrice?.printing;
        config.isPrint = true;
      } else {
        config.isPrint = false;
      }

      if (image.inputValue) {
        config.brandImage = await uploadFileToFirebaseStorage(image.inputValue);
      }

      if (text !== "") {
        config.brandText = text.inputValue;
      }

      if (driveLink !== "") {
        config.brandDriveLink = driveLink.inputValue;
      }

      if (preview) {
        config.printPreview = await uploadFileToFirebaseStorage(preview);
      }

      const doc = {
        product: product._id,
        print: printPrice?.data?._id,
        config,
      };

      await addToCart(doc);
      notifications.show({
        title: "Item added!",
        autoClose: 1500,
        color: "green",
      });
      setLoad(false);
    } catch (err) {
      console.log(err);
      setLoad(false);
    }
  };

  return (
    <>
      <Stack gap={10}>
        {!isVendor && (
          <>
            <Step2 qty={qty} totalQty={product.qty} />
            <Step1
              color={color}
              print={print}
              colors={colors}
              printOptions={printOptions}
              setPrintPrice={setPricePrice}
            />
          </>
        )}
        <Step3
          product={product}
          image={image}
          text={text}
          driveLink={driveLink}
          preview={preview}
          setPreview={setPreview}
          reseller={reseller}
          isVendor={isVendor}
          comments={comments}
          setComments={setComments}
        />
      </Stack>
      {!isVendor && (
        <>
          <SummaryTable data={summary.arr} />
          {(product?.qty > 0 && !color.isValid) || !qty.isValid ? (
            <Alert
              icon={<PiWarningDuotone />}
              color="red"
              title="Please fill out the mandatory color & qty field."
            />
          ) : summary.error ? (
            <Alert
              icon={<PiWarningDuotone />}
              color="red"
              title={summary.errorMsg}
            />
          ) : (
            ""
          )}
          <Button
            autoContrast
            size="lg"
            disabled={
              !color.isValid || !qty.isValid || load || product?.qty < 1
            }
            loading={load}
            onClick={AddToCartHandler}
          >
            {product?.qty > 0 ? "Add to basket" : "Out of Stock"}
          </Button>
        </>
      )}
    </>
  );
};

export default PurchaseWrapper;
