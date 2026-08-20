"use server";

const stripe = require("stripe")(process.env.STRIPE);

export const createPaymentLink = async (order) => {
  try {
    let payload = {
      line_items: [
        {
          price_data: {
            currency: "aed",
            product_data: {
              name: `${order.oid} - Krossover Gifts`,
            },
            unit_amount: Math.round(order?.summary?.total * 100),
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `https://www.kross-over.net/status/${order?.oid}`,
      cancel_url: `https://www.kross-over.net/status/${order?.oid}`,
      client_reference_id: order.oid,
      customer_email: order?.customer?.email,
    };

    console.log(payload.line_items[0]);

    const response = await stripe.checkout.sessions.create(payload);

    console.log(response);

    if (!response.url) {
      throw new Error("Error occured while creating payment link!");
    }

    console.log(response);

    return response.url;
  } catch (err) {
    console.log(err);
    throw new Error(err?.message);
  }
};
