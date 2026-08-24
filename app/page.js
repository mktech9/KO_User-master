import { checkIsAuthValid } from "@/auth";
import { CheckIsReseller } from "@/libs/manage-user";
import HomeWrapper from "@/components/home";
import { SetLabel } from "./labels-async";
import { Image } from "@mantine/core";

export const revalidate = 0;

export async function generateMetadata() {
  let configs = await SetLabel();
  global.configs = configs;

  return {
    title: "Promotional Gift Suppliers in Dubai | Corporate Gifts Dubai",
    description: `Krossover: Your one-stop shop for personalized promotional gifts. Explore our vast selection of high-quality items, expertly customized to suit your needs in Dubai.`,
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
      title: configs?.name,
      description: `${configs?.name} is a versatile online platform offering a vast selection of stock products that allow users to customize with their own logos and text. Users can find an extensive range of items such as apparel, accessories, home goods, and office supplies. Each product is available for personalized branding, making it an ideal choice for businesses, organizations, or individuals looking to create unique, branded merchandise.`,
      url: `${configs?.url}`,
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

  if (global?.configs.label !== "super") {
    return (
      <>
        <Image src={"/vendor_image.webp"} fit="contain" w="100%" />
      </>
    );
  } else {
    return <HomeWrapper reseller={reseller} isAuth={isAuth} configs={configs} />;
  }
};

export default Page;
