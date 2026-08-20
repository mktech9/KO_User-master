"use client";

import { Button } from "@mantine/core";
import { useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import { notifications } from "@mantine/notifications";
import { CreateNewQuotation } from "@/libs/quotation";
import QuotationDefault from "./quotation-default";
import QuotationShanghai from "./quotation-shanghai";

const Quotation = ({ no, resellerData, items, summary, configs }) => {
  const [load, setLoad] = useState(false);
  const Component =
    process.env.NEXT_PUBLIC_website === "default"
      ? QuotationDefault
      : QuotationShanghai;

  let reseller = resellerData?.resellerId;
  const componentRef = useRef();

  const handleDownload = useReactToPrint({
    content: () => componentRef.current,
    removeAfterPrint: false,
    pageStyle: `@page {
    size: 297mm 420mm;
}

@media print {
    @page {
        size: A3 portrait;
        margin: 0mm !important;
    }
}

@media all {
    .pagebreak {
        overflow: visible;
    }
}`,
  });

  const handleQuotationPrint = async () => {
    try {
      setLoad(true);
      const resp = await CreateNewQuotation(
        no,
        reseller?._id,
        items,
        summary,
        configs?.label
      );

      setLoad(false);
      handleDownload();
    } catch (err) {
      console.log(err);
      notifications.show({
        title: err?.message ?? "Something went wrong!",
        autoClose: 1500,
        color: "red",
      });
      return setLoad(false);
    }
  };

  return (
    <>
      <Button disabled={load} onClick={handleQuotationPrint} loading={load}>
        Get Quotation
      </Button>
      <Component
        componentRef={componentRef}
        items={items}
        no={no}
        resellerData={resellerData}
        summary={summary}
        configs={configs}
      />
    </>
  );
};

export default Quotation;
