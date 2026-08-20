import { checkIsAuthValid } from "@/auth";
import ProfileLayout from "./wrapper";
import { redirect } from "next/navigation";
import { Space } from "@mantine/core";

const Layout = async ({ children }) => {
  const isAuth = await checkIsAuthValid();

  if (!isAuth) {
    return redirect("/auth");
  }

  return (
    <>
      <ProfileLayout>{children}</ProfileLayout>
      <Space h={25} />
    </>
  );
};

export default Layout;
