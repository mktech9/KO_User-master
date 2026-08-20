import { SetLabel } from "@/app/labels-async";
import GoogleAuth from "./component";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  let configs = await SetLabel();
  global.configs = configs;

  return {
    title: "Please Wait...",
    description: `${configs?.name} is a versatile online platform offering a vast selection of stock products that allow users to customize with their own logos and text. Users can find an extensive range of items such as apparel, accessories, home goods, and office supplies. Each product is available for personalized branding, making it an ideal choice for businesses, organizations, or individuals looking to create unique, branded merchandise.`,
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
      title: "Login / Register",
      description: `${configs?.name} is a versatile online platform offering a vast selection of stock products that allow users to customize with their own logos and text. Users can find an extensive range of items such as apparel, accessories, home goods, and office supplies. Each product is available for personalized branding, making it an ideal choice for businesses, organizations, or individuals looking to create unique, branded merchandise.`,
      url: `${configs?.url}/auth`,
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

  return <GoogleAuth />;
};

export default Page;
