"use client";

import moment from "moment";
import { numberToWords } from "./utils";
import styles from "./index.module.css";

const QuotationShanghai = ({
  no,
  resellerData,
  items,
  summary,
  componentRef,
}) => {
  let reseller = resellerData?.resellerId;

  return (
    <>
      <div className={styles.quotation}>
        <div
          ref={componentRef}
          className="quotation container mx-auto max-w-5xl py-16"
        >
          <h1
            className="font-bold text-3xl text-center"
            style={{ color: "#1d4387" }}
          >
            QUOTATION
          </h1>
          <div className="mt-8 grid grid-cols-12 gap-8">
            <div className="rounded-xl col-span-7 gap-8">
              <div className="flex flex-row justify-center h-36 bg-black rounded-xl">
                {/* <img
                  src="/quotation-logo.png"
                  style={{ objectFit: "contain", maxHeight: 172 }}
                /> */}
              </div>
              <div className="p-6">
                <p className="font-bold text-lg">Shanghai Gifts TR</p>
                <div className="grid grid-cols-2 gap-6">
                  <div style={{ borderRight: "1px solid black" }}>
                    <p className="text-sm mt-2 font-medium">
                      Opp Sharjah City Center
                      <br />
                      Industrial Area-I S06B
                      <br />
                      POBox-77749-sharjah, UAE
                    </p>
                  </div>
                  <div>
                    <p className="text-sm mt-2 font-medium">
                      Emirate : Sharjah
                      <br />
                      TRN : 100577447400003
                      <br />
                      E-Mail : sales@shanghaigifts.net
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="p-6 rounded-xl col-span-5"
              style={{ background: "#fef6ee" }}
            >
              <div className="grid grid-cols-6">
                <p className="font-bold text col-span-2">Quote No</p>
                <p className="font-semibold">:&nbsp;&nbsp;{no}</p>
              </div>
              <div className="grid grid-cols-6 mt-2">
                <p className="font-bold text col-span-2">Date</p>
                <p className="font-semibold">
                  :&nbsp;&nbsp;{moment().format("DD/MM/YYYY")}
                </p>
              </div>
              <div className="grid grid-cols-6 mt-2">
                <p className="font-bold text col-span-2">Quote To</p>
                <div className="col-span-4">
                  <p className="font-bold">
                    :&nbsp;&nbsp;{reseller?.companyName}
                  </p>
                  <p className="text-sm mt-2 font-medium pl-4">
                    {reseller?.billAddress}
                    <br />
                    {reseller?.billCity}, {reseller?.billCountry} <br />
                    {reseller?.emailId}
                    <br />
                    {reseller?.comContact}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div
            className="mt-8 grid grid-cols-12  rounded-md p-2 gap-4"
            style={{ background: "#fef6ee" }}
          >
            <p className="col-span-2 font-semibold text-center">Image</p>
            <p className="col-span-3 font-semibold ">Description of Goods</p>
            <p className="col-span-2 font-medium text-center">Quantity</p>
            <p className="col-span-2 font-medium text-center">Rate</p>
            <p className="col-span-1 font-medium">per</p>
            <p className="col-span-2 font-medium text-center">Amount</p>
          </div>
          <div
            className="mt-8 border-black"
            style={{ border: "1px solid black" }}
          >
            <div className="py-8">
              {items?.map((doc, i) => {
                return (
                  <>
                    <div
                      key={i}
                      className="grid grid-cols-12 rounded-md px-2 py- gap-4"
                    >
                      <div className="col-span-2 flex flex-row justify-center">
                        <img
                          src={doc?.product?.images[0]?.publicUrl}
                          style={{
                            maxWidth: "100%",
                            maxHeight: "100%",
                            objectFit: "contain",
                          }}
                          width={75}
                          height={75}
                        />
                      </div>
                      <div className="col-span-3">
                        <p className="font-bold text-gray-600 text-lg">
                          {doc?.product?.code}
                        </p>
                        <p className="font-semibold">{doc?.product?.name}</p>

                        <p className="text-sm font-medium">
                          Print :{" "}
                          {doc?.config?.isPrint
                            ? doc?.config?.printName
                            : "Without printing"}
                        </p>
                      </div>
                      <p className="col-span-2 font-medium text-center">
                        {doc?.config?.qty} Pcs
                      </p>
                      <p className="col-span-2 font-medium text-center">
                        AED {doc?.cartConfig?.unitPrice?.toFixed(2)}
                      </p>
                      <p className="col-span-1 font-medium">Nos</p>
                      <p className="col-span-2 font-semibold text-center">
                        AED {doc?.cartConfig?.total?.toFixed(2)}
                      </p>
                    </div>
                    {items?.length !== i + 1 && (
                      <div key={`${i}Divider`} className="pt-4 pb-8 px-4">
                        <hr className="border-black" />
                      </div>
                    )}
                  </>
                );
              })}
            </div>

            <div
              className="py-2 border-black"
              style={{ borderTop: "1px solid black" }}
            >
              <div className="grid grid-cols-12 rounded-md px-2 py- gap-4">
                <p className="col-span-10"></p>
                <p className="col-span-2 font-semibold text-center">
                  AED {summary?.subtotal?.toFixed(2)}
                </p>
              </div>
              <div className="grid grid-cols-12 rounded-md px-2 gap-4 mt-4">
                <p className="col-span-2"></p>
                <p className="col-span-3 font-semibold text-right pr-4">
                  VAT (5%)
                </p>
                <p className="col-span-5"></p>
                <p className="col-span-2 font-semibold text-center">
                  AED {summary?.vat?.toFixed(2)}
                </p>
              </div>
            </div>
            <div
              className=" border-black"
              style={{ borderTop: "1px solid black" }}
            >
              <div className="grid grid-cols-12 rounded-md px-2 gap-4">
                <div
                  className="col-span-2 py-2 border-black"
                  style={{ borderRight: "1px solid black" }}
                ></div>
                <div
                  className="col-span-3 py-2 border-black"
                  style={{ borderRight: "1px solid black" }}
                >
                  <p className="font-semibold text-right pr-4">Total</p>
                </div>
                <div
                  className="col-span-2 py-2 border-black"
                  style={{ borderRight: "1px solid black" }}
                >
                  <p className="col-span-2 font-semibold text-center">
                    {summary?.totalUnits} Pcs
                  </p>
                </div>
                <div
                  className="col-span-2 py-2 border-black"
                  style={{ borderRight: "1px solid black" }}
                ></div>
                <div
                  className="col-span-1 py-2 border-black"
                  style={{ borderRight: "1px solid black" }}
                ></div>
                <div className="col-span-2 py-2">
                  <p className="font-semibold text-center">
                    AED {summary?.total?.toFixed(2)}
                  </p>
                </div>
              </div>
              <div
                className="border-black"
                style={{ borderTop: "1px solid black" }}
              >
                <div className="flex flex-row items-center justify-between py-2 px-4 gap-4">
                  <p className="font-medium">Amount Chargable (in words)</p>
                  <p className="font-semibold">
                    UAE Dirhams {numberToWords(Math.round(summary?.total))} only
                    (AED {summary?.total?.toFixed(2)})
                  </p>
                </div>
              </div>
            </div>
          </div>
          <hr className="border-black mt-12 mb-8" />
          <div className="grid grid-cols-12">
            <div className="col-span-6 flex flex-col gap-2 px-4 font-medium">
              <p className="font-bold">Company's Bank Details</p>
              <div className="grid grid-cols-12 ">
                <p className="col-span-6">Ac Holder's Name</p>
                <p className="col-span-6">: Krossover Gifts Trading L.L.C.</p>
              </div>
              <div className="grid grid-cols-12">
                <p className="col-span-6">Bank Name</p>
                <p className="col-span-6">: Emirates NBD</p>
              </div>
              <div className="grid grid-cols-12">
                <p className="col-span-6">A/c No.</p>
                <p className="col-span-6">: 101-4065597001</p>
              </div>
              <div className="grid grid-cols-12">
                <p className="col-span-6">IBAN</p>
                <p className="col-span-6">: AE480260001014065597001</p>
              </div>
              <div className="grid grid-cols-12">
                <p className="col-span-6">Branch & SWIFT Code</p>
                <p className="col-span-6">: Karama & EBILAEAD</p>
              </div>
            </div>
            <div className="col-span-1"></div>
            <div
              className="col-span-5 p-4 rounded-md"
              style={{ background: "#eeeeee" }}
            >
              <div className="flex flex-col gap-2">
                <p className="font-bold">Order Summary</p>
                <div className="flex flex-row justify-between mt-4 font-medium">
                  <p className="text-sm">Subtotal</p>
                  <p className="text-sm font-bold">
                    AED {summary?.subtotal?.toFixed(2)}
                  </p>
                </div>
                <div className="flex flex-row justify-between font-medium">
                  <p className="text-sm">VAT (5%)</p>
                  <p className="text-sm font-bold">
                    AED {summary?.vat?.toFixed(2)}
                  </p>
                </div>
                <hr className="border-black" />
                <div className="flex flex-row justify-between">
                  <p className="font-bold">Estimated Total</p>
                  <p className="font-bold">AED {summary?.total?.toFixed(2)}</p>
                </div>
              </div>
            </div>
          </div>
          <hr className="border-black mt-8 mb-32" />
          <div className="flex flex-row justify-end px-4">
            <div className="flex flex-col">
              <p className="font-semibold">For Shanghai Gifts TR.</p>
              <p className="text-sm text-right">Authorised Signatory</p>
            </div>
          </div>
          <hr className="border-black mt-8 mb-16" />
          <p className="text-sm text-center">
            This is a Computer Generated Document
          </p>
        </div>
      </div>
    </>
  );
};

export default QuotationShanghai;
