"use server";

export const SendConfirmEmail = async (order) => {
  try {
    await fetch("https://ko-api.vercel.app/order/send-status-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        oid: order?._id,
        status: "confirm",
      }),
      cache: "no-store",
    });
  } catch (err) {
    console.log(err);
  }
};

export const SendNewUserEmail = async (email) => {
  try {
    await fetch("https://ko-api.vercel.app/order/new-user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        website: global?.configs?.website,
      }),
      cache: "no-store",
    });
  } catch (err) {
    console.log(err);
  }
};

export const SendFailedEmail = async (order) => {
  try {
    await fetch("https://ko-api.vercel.app/order/send-status-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        oid: order?._id,
        status: "failed",
      }),
      cache: "no-store",
    });
  } catch (err) {
    console.log(err);
  }
};

export const SendReservedEmail = async (order) => {
  try {
    await fetch("https://ko-api.vercel.app/order/send-status-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        oid: order?._id,
        status: "reserved",
      }),
      cache: "no-store",
    });
  } catch (err) {
    console.log(err);
  }
};

export const SendQuotationMails = async (quoteNo) => {
  try {
    await fetch("https://ko-api.vercel.app/order/quotation-downloaded", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: quoteNo,
        website: global?.configs?.website,
      }),
      cache: "no-store",
    });
  } catch (err) {
    console.log(err);
  }
};
