"use client";

import { useMediaQuery } from "@mantine/hooks";
import { useInput } from "@/hooks/use-input";
import { codes } from "@/utils/codes";
import {
  Button,
  Container,
  Grid,
  GridCol,
  Group,
  Paper,
  Select,
  Space,
  Stack,
  Text,
  TextInput,
  ThemeIcon,
} from "@mantine/core";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { notifications } from "@mantine/notifications";
import {
  UpdatePassword,
  UpdatePassword2,
  UpdateProfileData,
} from "@/libs/my-account";

const ResetPassword = ({ resellerId }) => {
  const matches = useMediaQuery("(max-width: 64em)");

  const router = useRouter();
  const [load, setLoad] = useState(false);
  const [load2, setLoad2] = useState(false);

  const { input: old } = useInput((v) => v !== "", "");
  const { input: newPass } = useInput((v) => v?.length >= 6, "");
  const { input: confirmPass } = useInput((v) => v === newPass.inputValue, "");

  const updatePasswordHandler = async () => {
    try {
      setLoad2(true);
      const resp = await UpdatePassword2(
        {
          old: old.inputValue,
          newPass: newPass.inputValue,
        },
        true,
        resellerId
      );

      if (!resp.success) {
        throw new Error(resp?.err ?? "An error occured!");
      }

      notifications.show({
        title: "Success!",
        autoClose: 1500,
        color: "green",
      });
      router.push("/auth");
      setLoad2(false);
    } catch (err) {
      console.log(err);
      setLoad2(false);
      notifications.show({
        title: err?.message ?? "Something went wrong!",
        autoClose: 1500,
        color: "red",
      });
    }
  };

  return (
    <>
      <Container size="xs">
        <Grid>
          <GridCol>
            <Grid>
              <GridCol span={12}>
                <Space h={60} />
              </GridCol>
              <GridCol span={12}>
                <Text fw={850} style={{ fontSize: 24 }}>
                  Change Password to continue:
                </Text>
                <Text fw={500} opacity={0.7}>
                  This is a mandatory step required on the first sign in, please
                  change your password to continue:
                </Text>
              </GridCol>
              <GridCol span={12}>
                <Space h={30} />
              </GridCol>
              <GridCol span={12}>
                <TextInput
                  label="Old Password"
                  placeholder="Old Password"
                  type="password"
                  value={old.inputValue}
                  onChange={old.inputHandler}
                  onBlur={old.blurHandler}
                  error={old.error ? "Your old password is required!" : ""}
                  withAsterisk
                  size="md"
                />
              </GridCol>
              <GridCol span={12}>
                <TextInput
                  label="New Password"
                  placeholder="New Password"
                  type="password"
                  value={newPass.inputValue}
                  onChange={newPass.inputHandler}
                  onBlur={newPass.blurHandler}
                  error={newPass.error ? "Required!" : ""}
                  withAsterisk
                  size="md"
                />
              </GridCol>
              <GridCol span={12}>
                <TextInput
                  label="Confirm New Password"
                  placeholder=" Confirm New Password"
                  type="password"
                  value={confirmPass.inputValue}
                  onChange={confirmPass.inputHandler}
                  onBlur={confirmPass.blurHandler}
                  error={confirmPass.error ? "Confirm your password." : ""}
                  withAsterisk
                  size="md"
                />
              </GridCol>
              <GridCol span={12}>
                <Group justify="right">
                  <Button
                    autoContrast
                    fullWidth={matches}
                    size="md"
                    onClick={() => updatePasswordHandler()}
                    disabled={
                      !old.isValid ||
                      !newPass.isValid ||
                      !confirmPass.isValid ||
                      load2
                    }
                    loading={load2}
                  >
                    Save
                  </Button>
                </Group>
              </GridCol>
            </Grid>
          </GridCol>
          <GridCol span={12}>
            <Space h={60} />
          </GridCol>
        </Grid>
      </Container>
    </>
  );
};

export default ResetPassword;
