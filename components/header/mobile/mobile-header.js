import {
  ActionIcon,
  Box,
  Center,
  Container,
  Grid,
  GridCol,
  Group,
  Stack,
} from "@mantine/core";
import SubHeader from "../sub-header";
import { Logo } from "../desktop";
import UserButton from "../user-button";
import { PiHeart } from "react-icons/pi";
import DesktopBasket from "../desktop-basket";
import SearchModule from "@/components/search/universal/search-module";
import MobileDrawer from "./mobile-drawer";
import Link from "next/link";

const MobileHeader = ({ data }) => {
  return (
    <>
      <header style={{ display: "unset" }}>
        <SubHeader />
        <Box w={"100%"} style={{ borderBottom: "1px solid rgba(0,0,0,0.1)" }}>
          <Container py={10} size={"xl"}>
            <Grid align="stretch">
              <GridCol span={5}>
                <Group wrap="nowrap">
                  <MobileDrawer data={data} />
                  <Box component={Link} href={"/"} h="100%">
                    <Center h="100%">
                      <Logo width={120} />
                    </Center>
                  </Box>
                </Group>
              </GridCol>
              <GridCol span={7}>
                <Group wrap="nowrap" gap={"md"} justify="right" h={"100%"}>
                  <Stack>
                    <UserButton />
                  </Stack>
                  <ActionIcon
                    autoContrast
                    color="black"
                    size="md"
                    variant="subtle"
                    component={Link}
                    href="/profile/wishlist"
                  >
                    <PiHeart size={"1.5rem"} />
                  </ActionIcon>
                  <DesktopBasket noText />
                </Group>
              </GridCol>
            </Grid>
          </Container>
        </Box>
        <Box
          w={"100%"}
          bg={"#f4f4f4"}
          style={{ borderBottom: "1px solid rgba(0,0,0,0.1)" }}
        >
          <Container size={"xl"}>
            <SearchModule />
          </Container>
        </Box>
      </header>
    </>
  );
};

export default MobileHeader;
