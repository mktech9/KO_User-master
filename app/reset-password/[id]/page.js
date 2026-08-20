import { SetLabel } from "@/app/labels-async";
import ResetPassword from "@/components/profile/reset-password";
import { GetResellerById } from "@/libs/resellers";
import { redirect } from "next/navigation";

export const revalidate = 600;

const Page = async ({ params }) => {
  let configs = await SetLabel();
  global.configs = configs;

  const resellerData = await GetResellerById(params.id);

  if (!resellerData || !resellerData?.resetPassword) {
    redirect("/");
  }

  return (
    <>
      <ResetPassword resellerId={params.id} />
    </>
  );
};

export default Page;
