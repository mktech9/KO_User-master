import { SetLabel } from "@/app/labels-async";
import {
  CreateUserForSignUp,
  LoginToLocalAccount,
  SetSession,
} from "@/libs/manage-user";

export const SignUpHandler = async (setLoad, toast, doc) => {
  try {
    setLoad(true);
    const result = await CreateUserForSignUp(doc);

    if (!result.success) {
      throw new Error(result?.err);
    }

    toast.show({
      title: "Account Created!",
      autoClose: 1500,
      color: "green",
    });
    setLoad(false);
    return true;
  } catch (err) {
    console.log(err);
    toast.show({
      title: err?.message ?? "Something went wrong!",
      autoClose: 1500,
      color: "red",
    });
    setLoad(false);
    return false;
  }
};

export const LoginHandler = async (setLoad, toast, email, password) => {
  try {
    setLoad(true);
    let username = email;

    const result = await LoginToLocalAccount(username, password);

    console.log(result);

    if (result?.redirect) {
      const labels = await SetLabel();

      window.location.href = `${labels.url}${result.link}`;
      return false;
    }

    if (!result.success) {
      throw new Error(result?.err);
    }

    await SetSession(result.user);
    setLoad(false);
    return true;
  } catch (err) {
    console.log(err);
    toast.show({
      title: err?.message ?? "Something went wrong!",
      autoClose: 1500,
      color: "red",
    });
    setLoad(false);
    return false;
  }
};
