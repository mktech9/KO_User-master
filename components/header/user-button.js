import { checkIsAuthValid } from "@/auth";
import {
  ActionIcon,
  Box,
  Menu,
  MenuDivider,
  MenuDropdown,
  MenuItem,
  MenuTarget,
  Stack,
  Text,
} from "@mantine/core";
import Link from "next/link";
import {
  PiHeartDuotone,
  PiHeart,
  PiListDuotone,
  PiList,
  PiMapPinDuotone,
  PiMapPin,
  PiPencilDuotone,
  PiPencil,
  PiPlusDuotone,
  PiPlus,
  PiUser,
  PiUserDuotone,
} from "react-icons/pi";
import SignOut from "./sign-out";

const UserButton = async () => {
  const isAuth = await checkIsAuthValid();

  return (
    <>
      <Menu shadow="md" width={200} offset={10} position="bottom">
        <MenuTarget>
          <Box>
            <Stack gap={0} align="center">
              <ActionIcon autoContrast color="black" size="md" variant="subtle">
                <PiUser size={"1.5rem"} />
              </ActionIcon>
              <Text visibleFrom="md" style={{ fontSize: 11 }} fw={600}>
                {isAuth ? "Profile" : "Account"}
              </Text>
            </Stack>
          </Box>
        </MenuTarget>
        <MenuDropdown>
          {isAuth ? (
            <Stack gap={0}>
              <MenuItem
                component={Link}
                href={"/profile"}
                leftSection={<PiUser />}
              >
                My Account
              </MenuItem>
              <MenuItem
                component={Link}
                href={"/profile/wishlist"}
                leftSection={<PiHeart />}
              >
                Wishlist
              </MenuItem>
              <MenuItem
                component={Link}
                href={"/profile/orders"}
                leftSection={<PiList />}
              >
                Orders
              </MenuItem>
              <MenuItem
                component={Link}
                href={"/profile/manage-address"}
                leftSection={<PiMapPin />}
              >
                Manage Address
              </MenuItem>
              <SignOut />
            </Stack>
          ) : (
            <MenuItem component={Link} href={"/auth"} leftSection={<PiPlus />}>
              Sign In
            </MenuItem>
          )}
        </MenuDropdown>
      </Menu>
    </>
  );
};

export default UserButton;
