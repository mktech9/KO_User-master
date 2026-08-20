import { SetLabel } from "@/app/labels-async";
import { checkIsAuthValid } from "@/auth";
import AdvancedSearch from "@/components/search/advanced";
import { getBrowseFiltersData } from "@/libs/browse-products";
import { CheckIsReseller } from "@/libs/manage-user";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  let configs = await SetLabel();
  global.configs = configs;

  return {
    title: "Advanced Search",
    description: "Use detailed filters to refine your product search.",
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
      title: "Advanced Search",
      description: "Use detailed filters to refine your product search.",
      url: `${configs?.url}/search/advanced`,
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

  const isAuth = await checkIsAuthValid();
  let reseller = false;

  if (isAuth) {
    reseller = await CheckIsReseller();
  }

  const data = await getBrowseFiltersData();

  return (
    <>
      <AdvancedSearch data={data} reseller={reseller} />
    </>
  );
};

export default Page;
