import ResellerWrapper from "@/components/resellers/wrapper";
import { GetSalesPersonList } from "@/libs/resellers";
import { Space } from "@mantine/core";
import { SetLabel } from "../labels-async";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  let configs = await SetLabel();
  global.configs = configs;

  return {
    title: "Register as Reseller",
    description:
      "Register as Reseller to learn about opportunities for reselling our products.",
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
      title: "Register as Reseller",
      description:
        "Register as Reseller to learn about opportunities for reselling our products.",
      url: `${configs?.url}/resellers`,
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

  const salesPerson = await GetSalesPersonList();

  return (
    <>
      <ResellerWrapper sales={salesPerson} configs={configs} />
      <Space h={30} />
    </>
  );
};

export default Page;
