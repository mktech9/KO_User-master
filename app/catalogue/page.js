import Catalouge from "@/components/catalogue";
import { SetLabel } from "../labels-async";
import { GetCatalouges } from "@/libs/home-layout";

export const revalidate = 600;

export async function generateMetadata({ params }) {
  let configs = await SetLabel();
  global.configs = configs;

  return {
    title: "Catalouge",
    description: "Get in touch with our team for assistance and inquiries.",
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
      title: "Contact Us",
      description: "Get in touch with our team for assistance and inquiries.",
      url: `${configs?.url}/contact-us`,
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

  const { main, sections } = await GetCatalouges();

  return <Catalouge main={main} sections={sections} />;
};

export default Page;
