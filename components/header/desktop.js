import {
  ActionIcon,
  Box,
  Center,
  Container,
  Grid,
  GridCol,
  Group,
  Stack,
  Text,
} from "@mantine/core";
import { PiHeart } from "react-icons/pi";
import SubHeader from "./sub-header";
import DesktopLinks from "./desktop-links";
import Link from "next/link";
import UserButton from "./user-button";
import DesktopBasket from "./desktop-basket";
import SearchModule from "../search/universal/search-module";

const DesktopHeader = ({ data }) => {
  return (
    <>
      <header style={{ display: "unset" }}>
        <SubHeader />
        <Box w={"100%"} style={{ borderBottom: "1px solid rgba(0,0,0,0.1)" }}>
          <Container py={10} size={"xl"}>
            <Grid align="stretch">
              <GridCol span={3}>
                <Center h={"100%"} style={{ justifyContent: "flex-start" }}>
                  <Box pt={4} component={Link} href={"/"}>
                    <Logo />
                  </Box>
                </Center>
              </GridCol>
              <GridCol span={6}>
                <Center h={"100%"}>
                  <Group w={"100%"} wrap="nowrap">
                    <SearchModule />
                  </Group>
                </Center>
              </GridCol>
              <GridCol span={3}>
                {global.configs?.label === "super" && (
                  <Group wrap="nowrap" gap={"xl"} justify="right" h={"100%"}>
                    <Box>
                      <UserButton />
                    </Box>
                    <Stack
                      gap={0}
                      align="center"
                      component={Link}
                      href="/profile/wishlist"
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      <ActionIcon
                        autoContrast
                        color="black"
                        size="md"
                        variant="subtle"
                      >
                        <PiHeart size={"1.5rem"} />
                      </ActionIcon>
                      <Text style={{ fontSize: 11 }} fw={600}>
                        Wishlist
                      </Text>
                    </Stack>
                    <DesktopBasket />
                  </Group>
                )}
              </GridCol>
            </Grid>
          </Container>
        </Box>
        <Box style={{ position: "sticky", top: 0, zIndex: 99 }} bg={"#fff"}>
          <DesktopLinks data={data} />
        </Box>
      </header>
    </>
  );
};

export default DesktopHeader;

export const Logo = ({ width }) => {
  return (
    <>
      <img
        src={global.configs?.logo_header}
        width={width ?? 180}
        style={{ objectFit: "contain", maxHeight: 45 }}
        alt="Kross Over – Corporate & Promotional Gifts Supplier"
        title="Kross Over – Corporate & Promotional Gifts Supplier"
      />
    </>
  );
};
