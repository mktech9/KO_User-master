import { checkIsAuthValid } from "@/auth";
import CartWrapper from "@/components/cart";
import { GetTax } from "@/libs/get-header-data";
import { CheckIsPaylater, CheckIsReseller } from "@/libs/manage-user";
import { SetLabel } from "../labels-async";
import { GetAccountDetails } from "@/libs/my-account";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  let configs = await SetLabel();
  global.configs = configs;

  return {
    title: "Checkout",
    description: "Manage your selected products for easy checkout and review.",
    robots: {
      index: true,
      googleBot: {
        index: true,
      },
    },
    viewport: {
      width: "device-width",
      initialScale: 1,
      maximumScale: 1,
    },
    icons: {
      icon: configs?.favicon,
      apple: configs?.logo_header,
    },
    openGraph: {
      title: "Checkout",
      description:
        "Manage your selected products for easy checkout and review.",
      url: `${configs?.url}/basket`,
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
  const { tax, shipping } = await GetTax();

  if (isAuth) {
    reseller = await CheckIsReseller();
  }

  let payLater = false,
    resellerData = null;
  if (reseller) {
    console.log("checked");
    payLater = await CheckIsPaylater();
    resellerData = await GetAccountDetails();
  }

  console.log("ISRESELLER=> ", reseller, isAuth, payLater);

  return (
    <>
      <CartWrapper
        isAuth={isAuth}
        reseller={reseller}
        tax={tax}
        payLater={payLater}
        resellerData={resellerData}
        shipping={shipping}
        configs={configs}
      />
    </>
  );
};

export default Page;
