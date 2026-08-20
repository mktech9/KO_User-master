"use client";

import Crumbs from "@/components/common/breadcrumbs";
import {
  Button,
  Center,
  Container,
  Divider,
  Grid,
  GridCol,
  Group,
  Paper,
  SimpleGrid,
  Space,
  Stack,
  Text,
  ThemeIcon,
  UnstyledButton,
} from "@mantine/core";
import { usePathname } from "next/navigation";
import {
  PiArrowLeftDuotone,
  PiHeartDuotone,
  PiListChecksDuotone,
  PiMapPinDuotone,
  PiPencilDuotone,
  PiUserDuotone,
} from "react-icons/pi";
import Link from "next/link";

const ProfileLayout = ({ children }) => {
  let pathname = usePathname();
  let currentPath =
    pathname === "/profile"
      ? "My Account"
      : pathname === "/profile/wishlist"
      ? "Wishlist"
      : pathname === "/profile/orders"
      ? "Orders"
      : pathname === "/profile/manage-address"
      ? "Manage Address"
      : "Edit Details";

  return (
    <>
      <Container mt={30} size={"xl"}>
        <Stack gap={15}>
          <Stack gap={5} visibleFrom="md">
            <Crumbs
              data={[
                { title: "Home", href: "/" },
                {
                  title: "My Account",
                  href: "/profile",
                  current: true,
                },
              ]}
            />
            <Text fw={700} size="xl">
              {currentPath}
            </Text>
          </Stack>
          <Group gap={5} hiddenFrom="md" justify="space-between">
            <Button
              autoContrast
              w={"fit-content"}
              leftSection={<PiArrowLeftDuotone />}
              variant="transparent"
              size="compact-sm"
              p={0}
              td={"underline"}
              component={Link}
              href={pathname === "My Account" ? "/" : "/profile"}
            >
              Back
            </Button>
            <Text fw={700} size="md">
              {currentPath}
            </Text>
            <Button
              autoContrast
              w={"fit-content"}
              leftSection={<PiArrowLeftDuotone />}
              variant="transparent"
              size="compact-sm"
              p={0}
              td={"underline"}
              style={{ visibility: "hidden" }}
            >
              Back
            </Button>
          </Group>
          <Grid w={"100%"}>
            <GridCol span={12}>
              <Divider my={{ base: 5, md: 0 }} />
            </GridCol>
            <GridCol span={{ base: 12, md: 2 }} visibleFrom="md">
              <Items pathname={pathname} />
            </GridCol>
            <GridCol span={0.5} visibleFrom="md">
              <Center h={"100%"}>
                <Divider orientation="vertical" h={"100%"} />
              </Center>
            </GridCol>
            {children}
          </Grid>
        </Stack>
      </Container>
    </>
  );
};

export const Items = ({ pathname, hideMyAccount }) => {
  const items = (
    <>
      {!hideMyAccount && (
        <Item
          icon={PiUserDuotone}
          link={"/profile"}
          active={pathname === "/profile"}
          text={"Profile Details"}
        />
      )}
      <Divider visibleFrom="md" />
      <Item
        icon={PiHeartDuotone}
        link={"/profile/wishlist"}
        active={pathname === "/profile/wishlist"}
        text={"Wishlist"}
      />
      <Divider visibleFrom="md" />
      <Item
        icon={PiListChecksDuotone}
        link={"/profile/orders"}
        active={pathname === "/profile/orders"}
        text={"Orders"}
      />
      <Divider visibleFrom="md" />
      <Item
        icon={PiMapPinDuotone}
        link={"/profile/manage-address"}
        active={pathname === "/profile/manage-address"}
        text={"Manage Address"}
      />
      <Divider visibleFrom="md" />
      <Item
        icon={PiPencilDuotone}
        link={"/profile/edit-profile"}
        active={pathname === "/profile/edit-profile"}
        text={"Edit Details"}
      />
    </>
  );

  return (
    <>
      <Stack gap={10} visibleFrom="md">
        {items}
      </Stack>
      <SimpleGrid cols={2} hiddenFrom="md">
        {items}
      </SimpleGrid>
    </>
  );
};

const Item = ({ icon, text, active, link }) => {
  let Icon = icon;

  const item = (
    <>
      <ThemeIcon autoContrast variant={active ? "gradient" : "transparent"}>
        <Icon />
      </ThemeIcon>
      <Text fw={500} size="sm" td={active ? "underline" : "none"}>
        {text}
      </Text>
    </>
  );

  return (
    <>
      <UnstyledButton component={Link} href={link}>
        <Group visibleFrom="md">{item}</Group>
        <Paper withBorder hiddenFrom="md" py={20}>
          <Stack align="center" gap={3}>
            {item}
          </Stack>
        </Paper>
      </UnstyledButton>
    </>
  );
};

export default ProfileLayout;
