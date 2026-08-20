import { SetLabel } from "@/app/labels-async";
import EditProfile from "@/components/profile/edit-profile";
import { GetAccountDetails } from "@/libs/my-account";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  let configs = await SetLabel();
  global.configs = configs;

  return {
    title: "Edit Details",
    description: "Update your account information and settings.",
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
      title: "Edit Details",
      description: "Update your account information and settings.",
      url: `${configs?.url}/profile/edit-profile`,
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

  const data = await GetAccountDetails();

  return <EditProfile data={data} />;
};

export default Page;
