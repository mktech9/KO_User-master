import { SetLabel } from "@/app/labels-async";
import StaticHeader from "@/components/common/static-header";
import { GetCustomData } from "@/libs/get-static-data";
import { Container } from "@mantine/core";
import parser from "html-react-parser";

export const revalidate = 600;

export async function generateMetadata({ params }) {
  let configs = await SetLabel();
  global.configs = configs;
  const data = await GetCustomData(params?.pageName);

  return {
    title: data?.metaTitle ? data.metaTitle : data?.title,
    description: data?.metaDescription ? data.metaDescription : configs?.name,
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
      description: "Krossover",
      url: `${configs.url}/page/${params?.pageName}`,
      siteName: configs?.siteName,
      images: [
        {
          url: configs.logo_header,
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

const Page = async ({ params }) => {
  let configs = await SetLabel();
  global.configs = configs;

  const data = await GetCustomData(params?.pageName);

  return (
    <>
      <StaticHeader title={data?.title} data={params?.pageName} />
      <Container my={30} size={"xl"}>
        {parser(data?.value ?? "")}
      </Container>
    </>
  );
};

export default Page;
