import { checkIsAuthValid } from "@/auth";
import { AuthenticationForm } from "@/components/auth/update-paasword";
import { Box, Center, Container, Grid, GridCol } from "@mantine/core";
import Image from "next/image";
import { redirect } from "next/navigation";
import { SetLabel } from "../../../labels-async";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  let configs = await SetLabel();
  global.configs = configs;

  return {
    title: "Reset Password",
    description: `${configs?.name} is a versatile online platform offering a vast selection of stock products that allow users to customize with their own logos and text. Users can find an extensive range of items such as apparel, accessories, home goods, and office supplies. Each product is available for personalized branding, making it an ideal choice for businesses, organizations, or individuals looking to create unique, branded merchandise.`,
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
      title: "Reset Password",
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

const Page = async ({ params }) => {
  let configs = await SetLabel();
  global.configs = configs;

  const isAuth = await checkIsAuthValid();

  if (isAuth) {
    return redirect("/");
  }

  return (
    <>
      <Container my={30} size={"xl"}>
        <Grid align="stretch">
          <GridCol span={{ base: 12, md: 6 }}>
            <Box
              mih={{ base: 200, md: 500 }}
              w={"100%"}
              h={"100%"}
              style={{
                position: "relative",
                borderRadius: 12,
                overflow: "hidden",
              }}
            >
              <Image
                src={"/login_artwork.webp"}
                fill
                style={{ objectFit: "contain" }}
              />
            </Box>
          </GridCol>
          <GridCol span={{ base: 12, md: 6 }}>
            <Center h={"100%"}>
              <AuthenticationForm
                name={global?.configs?.name}
                token={params?.id}
              />
            </Center>
          </GridCol>
        </Grid>
      </Container>
    </>
  );
};

export default Page;
