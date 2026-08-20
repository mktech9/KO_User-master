import { SetLabel } from "@/app/labels-async";
import StaticHeader from "@/components/common/static-header";
import { GetStaticData, GetStaticDataTags } from "@/libs/get-static-data";
import { Container } from "@mantine/core";
import parser from "html-react-parser";

export const revalidate = 600;

export async function generateMetadata() {
  let configs = await SetLabel();
  global.configs = configs;

  const data = await GetStaticDataTags("refund");

  return {
    title: data?.title,
    description: data?.description,
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
      title: data?.title,
      description: data?.description,
      url: `${configs?.url}/static/refund-policy`,
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

  const data = await GetStaticData("refund");

  return (
    <>
      <StaticHeader title={"Refund Policy"} data={"/static/refund-policy"} />
      <Container my={30} size={"xl"}>
        {parser(data ?? "")}
      </Container>
    </>
  );
};

export default Page;
