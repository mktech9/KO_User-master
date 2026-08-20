import { SetLabel } from "@/app/labels-async";
import OrderWrapper from "@/components/order/details/wrapper";
import Order from "@/utils/mongo-models/order";
import connectMongo from "@/utils/mongoose";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  let configs = await SetLabel();
  global.configs = configs;

  return {
    title: "Track Order",
    description: "Follow the delivery progress of your orders.",
    robots: {
    index: true,
    googleBot: {
      index: true,
    },
  },viewport: {
      width: "device-width",
      initialScale: 1,
      maximumScale: 1,
    },
    icons: {
      icon: configs?.favicon,
      apple: configs?.logo_header,
    },
    openGraph: {
      title: "Track Order",
      description: "Follow the delivery progress of your orders.",
      url: `${configs?.url}/status/[oid]/details`,
      siteName: configs?.siteName,
      images: [
        {
          url: configs?.logo_header,
          width: 800,
          height: 600,
        },
      ],
      locale: "en_AE",
      type: "website",
    },
    facebook: {
      admins: "krossovergifts",
    },
    twitter: {
      creator: "krossovergifts",
    },
  };
}

const getOrder = async (oid) => {
  await connectMongo();
  const item = await Order.findOne({ oid }).lean();
  return item;
};

const Page = async ({ params }) => {
  let configs = await SetLabel();
  global.configs = configs;

  let data = await getOrder(params.oid);

  return (
    <>
      <OrderWrapper data={data} />
    </>
  );
};

export default Page;
