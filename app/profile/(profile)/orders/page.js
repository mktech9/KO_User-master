import { SetLabel } from "@/app/labels-async";
import OrderListWrapper from "@/components/order/list/wrapper";
import { GetOrders } from "@/libs/my-account";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  let configs = await SetLabel();
  global.configs = configs;

  return {
    title: "Manage Orders",
    description: "Review your order history and track recent purchases.",
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
      title: "Manage Orders",
      description: "Review your order history and track recent purchases.",
      url: `${configs?.url}/profile/orders`,
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

const Page = async () => {
  let configs = await SetLabel();
  global.configs = configs;

  const data = await GetOrders();

  return (
    <>
      <OrderListWrapper data={data} />
    </>
  );
};

export default Page;
