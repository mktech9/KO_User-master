import { SetLabel } from "@/app/labels-async";
import {
  Center,
  Container,
  Space,
  Stack,
  Text,
  ThemeIcon,
} from "@mantine/core";
import { PiCheckFatDuotone } from "react-icons/pi";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  let configs = await SetLabel();
  global.configs = configs;

  return {
    title: "Registered!",
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
      title: "Registered!",
      description:
        "Register as Reseller to learn about opportunities for reselling our products.",
      url: `${configs?.url}/resellers/success`,
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

  return (
    <>
      <Container size={"xl"}>
        <Center h={400}>
          <Stack align="center">
            <ThemeIcon
              autoContrast
              size={"5rem"}
              variant="gradient"
              gradient={{ from: "green", to: "lime", deg: 90 }}
              radius={"50%"}
            >
              <PiCheckFatDuotone size={"2rem"} />
            </ThemeIcon>
            <Text fw={700} size="xl">
              Your Request has been recieved.
            </Text>
            <Text ta={"center"} maw={590}>
              Congratulations! 🎉 Your request to register as a reseller has
              been successfully received. Our team will be in touch with you
              shortly to proceed with the next steps. Thank you for choosing to
              partner with us. We look forward to working together!
            </Text>
          </Stack>
        </Center>
      </Container>
      <Space h={25} />
    </>
  );
};

export default Page;
