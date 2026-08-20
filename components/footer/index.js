import {
  Box,
  Center,
  Container,
  Divider,
  Grid,
  GridCol,
  Group,
  Space,
  Stack,
  Text,
  ThemeIcon,
} from "@mantine/core";
import FooterGroup from "./footer-group";
import {
  PiFacebookLogoFill,
  PiInstagramLogoFill,
  PiLinkedinLogoFill,
  PiTwitterLogoFill,
  PiTiktokLogoFill,
} from "react-icons/pi";
import { Logo } from "../header/desktop";
import { GetFooterData } from "@/libs/get-header-data";
import Link from "next/link";
import CurrencyToggler from "../currency/currency-toggler";
import LanguageToggler from "../localization";

const FooterWrapper = async () => {
  const data = await GetFooterData();

  const isVendor = global?.configs?.label !== "super";

  const links = (
    <>
      {" "}
      <Text
        style={{ fontSize: 14 }}
        fw={500}
        c={"#161616"}
        opacity={0.7}
        component={Link}
        href={"/static/privacy-policy"}
      >
        Privacy Policy
      </Text>
      <Text style={{ fontSize: 14 }} fw={500} c={"#161616"} opacity={0.7}>
        |
      </Text>
      <Text
        style={{ fontSize: 14 }}
        fw={500}
        c={"#161616"}
        opacity={0.7}
        component={Link}
        href={"/static/terms"}
      >
        Terms & Condition
      </Text>
      <Text style={{ fontSize: 14 }} fw={500} c={"#161616"} opacity={0.7}>
        |
      </Text>
      <Text
        style={{ fontSize: 14 }}
        fw={500}
        c={"#161616"}
        opacity={0.7}
        component={Link}
        href={"/static/shipping-policy"}
      >
        Shipping Policy
      </Text>
    </>
  );

  return (
    <>
      {/* <Space h={30} /> */}
      <Box bg={"#f4f4f4"} style={{ borderTop: "1px solid #dbdcdd" }} py={30}>
        <Container size={"xl"}>
          <Grid gutter={30}>
            {!isVendor && (
              <GridCol span={{ base: 12, md: 10 }}>
                <Grid gutter={30}>
                  {data?.items?.map((doc) => {
                    return (
                      <GridCol span={{ base: 6, md: 3 }} key={doc._id}>
                        <FooterGroup data={doc} />
                      </GridCol>
                    );
                  })}
                </Grid>
              </GridCol>
            )}
            <GridCol span={{ base: 12, md: isVendor ? 12 : 2 }}>
              <Stack gap={0} align={isVendor ? "center" : "flex-start"} w='100%'>
                <Box visibleFrom="md">
                  <Logo width={150} />
                </Box>
                <Space h={10} />
                <Text fw={700} style={{ fontSize: 16 }} c={"#161616"}>
                  Follow us on
                </Text>
                <Space h={10} />
                <Group>
                  {global?.configs?.socialMedia?.fb &&
                    global?.configs?.socialMedia?.fb !== "" && (
                      <ThemeIcon
                        autoContrast
                        component={Link}
                        href={global?.configs?.socialMedia?.fb}
                        radius={"md"}
                      >
                        <PiFacebookLogoFill size={"1.25rem"} />
                      </ThemeIcon>
                    )}
                  {global?.configs?.socialMedia?.ig &&
                    global?.configs?.socialMedia?.ig !== "" && (
                      <ThemeIcon
                        autoContrast
                        component={Link}
                        href={global?.configs?.socialMedia?.ig}
                        radius={"md"}
                      >
                        <PiInstagramLogoFill size={"1.25rem"} />
                      </ThemeIcon>
                    )}
                  {global?.configs?.socialMedia?.yt &&
                    global?.configs?.socialMedia?.yt !== "" && (
                      <ThemeIcon
                        autoContrast
                        component={Link}
                        href={global?.configs?.socialMedia?.yt}
                        radius={"md"}
                      >
                        <PiLinkedinLogoFill size={"1.25rem"} />
                      </ThemeIcon>
                    )}
                  {global?.configs?.socialMedia?.tw &&
                    global?.configs?.socialMedia?.tw !== "" && (
                      <ThemeIcon
                        autoContrast
                        component={Link}
                        href={global?.configs?.socialMedia?.tw}
                        radius={"md"}
                      >
                        <PiTwitterLogoFill size={"1.25rem"} />
                      </ThemeIcon>
                    )}
                       <ThemeIcon
                        autoContrast
                        component={Link}
                        href={"https://www.tiktok.com/@krossovergifts"}
                        radius={"md"}
                      >
                        <PiTiktokLogoFill size={"1.25rem"} />
                      </ThemeIcon>
                </Group>
              </Stack>
            </GridCol>
            <GridCol span={12}>
              <Divider mb={30} />
              <Group justify="space-between">
                <Group w={"100%"} hiddenFrom="md" justify="center" gap={10}>
                  {links}
                </Group>
                <Center w={"100%"} hiddenFrom="md">
                  <Logo width={150} />
                </Center>
                <Text visibleFrom="md">{global?.configs?.footerText}</Text>
                <Group justify="center" hiddenFrom="md" w="100%">
                  <Text ta="center">{global?.configs?.footerText}</Text>
                </Group>
                <Group visibleFrom="md" gap={10}>
                  <LanguageToggler /> <CurrencyToggler />
                </Group>
                <Group
                  mt={10}
                  w="100%"
                  hiddenFrom="md"
                  justify="space-between"
                  gap={10}
                >
                  <LanguageToggler /> <CurrencyToggler />
                </Group>
              </Group>
            </GridCol>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default FooterWrapper;
