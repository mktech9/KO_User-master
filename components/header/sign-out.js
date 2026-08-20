"use client";

import { destroyAuthCookies } from "@/auth";
import { MenuItem } from "@mantine/core";
import { useRouter } from "next/navigation";
import { PiSignOutDuotone, PiSignOut } from "react-icons/pi";

const SignOut = () => {
  const router = useRouter();

  const signoutHandler = async () => {
    await destroyAuthCookies();
    window.location.reload();
    router.refresh();
  };

  return (
    <MenuItem
      onClick={() => signoutHandler()}
      leftSection={<PiSignOut />}
      color="red"
    >
      Sign Out
    </MenuItem>
  );
};

export default SignOut;
