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
import { UpdatePassword, UpdateProfileData } from "@/libs/my-account";
import Link from "next/link";
import { PiGearFill } from "react-icons/pi";

const EditProfile = ({ data }) => {
  const matches = useMediaQuery("(max-width: 64em)");

  const router = useRouter();
  const [load, setLoad] = useState(false);
  const [load2, setLoad2] = useState(false);

  const { input: name } = useInput((v) => v !== "", data?.name);
  const { input: code } = useInput((v) => v !== "", data?.countryCode ?? "");
  const { input: mobile } = useInput((v) => v !== "", data?.number ?? "");

  const { input: old } = useInput((v) => v !== "", "");
  const { input: newPass } = useInput((v) => v?.length >= 6, "");
  const { input: confirmPass } = useInput((v) => v === newPass.inputValue, "");

  const updateContactHandler = async () => {
    try {
      setLoad(true);
      const resp = await UpdateProfileData({
        name: name.inputValue,
        countryCode: code.inputValue,
        number: mobile.inputValue,
      });

      notifications.show({
        title: "Saved!",
        autoClose: 1500,
        color: "green",
      });
      router.push("/profile");
      setLoad(false);
    } catch (err) {
      console.log(err);
      setLoad(false);
      notifications.show({
        title: err?.message ?? "Something went wrong!",
        autoClose: 1500,
        color: "red",
      });
    }
  };

  const updatePasswordHandler = async () => {
    try {
      setLoad2(true);
      const resp = await UpdatePassword({
        old: old.inputValue,
        newPass: newPass.inputValue,
      });

      notifications.show({
        title: "Saved!",
        autoClose: 1500,
        color: "green",
      });
      router.push("/profile");
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
      <GridCol span={{ base: 12, md: 4 }}>
        <Grid>
          {data?.resellerId ? (
            <GridCol span={12}>
              <Paper
                withBorder
                p="sm"
                component={Link}
                href={`/resellers/${data?._id}`}
                style={{ textDecoration: "none", color: "#121212" }}
              >
                <Group gap={12}>
                  <ThemeIcon radius="xl" size="xl" variant="transparent">
                    <PiGearFill size="2.25rem" />
                  </ThemeIcon>
                  <Stack gap={0}>
                    <Text fw={700}>Account Configuration</Text>
                    <Text fw={500} size="sm" opacity={0.7}>
                      Manage your reseller account details.
                    </Text>
                  </Stack>
                </Group>
              </Paper>
            </GridCol>
          ) : (
            <>
              <GridCol span={12}>
                <Text fw={700} size="md">
                  Name & Contact No.
                </Text>
              </GridCol>
              <GridCol span={12}>
                <TextInput
                  label="Your Name"
                  placeholder="Your full name..."
                  value={name.inputValue}
                  onChange={name.inputHandler}
                  onBlur={name.blurHandler}
                  error={name.error ? "Your full name is required!" : ""}
                  withAsterisk
                />
              </GridCol>
              <GridCol span={{ base: 4, md: 4 }}>
                <Select
                  label="Country"
                  placeholder="Your country code..."
                  data={codes.map((doc) => {
                    let active = `${doc?.dial_code}` === code.inputValue;
                    return {
                      label: active
                        ? `${doc.dial_code}`
                        : `${doc?.dial_code} (${doc.name})`,
                      value: `${doc?.dial_code}`,
                    };
                  })}
                  value={code.inputValue}
                  onChange={code.setInput}
                  onBlur={code.blurHandler}
                  error={code.error ? "Your country code is required!" : ""}
                  withAsterisk
                  searchable
                />
              </GridCol>
              <GridCol span={{ base: 8, md: 8 }}>
                <TextInput
                  label="Mobile Number"
                  placeholder="Your mobile number..."
                  value={mobile.inputValue}
                  onChange={mobile.inputHandler}
                  onBlur={mobile.blurHandler}
                  error={mobile.error ? "Your mobile number is required!" : ""}
                  withAsterisk
                />
              </GridCol>
              <GridCol span={{ base: 12, md: 8 }}>
                <Button
                  autoContrast
                  fullWidth={matches}
                  size="md"
                  onClick={() => updateContactHandler()}
                  disabled={
                    !name.isValid || !code.isValid || !mobile.isValid || load
                  }
                  loading={load}
                >
                  Save
                </Button>
              </GridCol>
            </>
          )}
          <GridCol span={12}>
            <Space h={30} />
          </GridCol>
          <GridCol span={12}>
            <Text fw={700} size="md">
              Change Password
            </Text>
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
            />
          </GridCol>
          <GridCol span={{ base: 12, md: 8 }}>
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
          </GridCol>
        </Grid>
      </GridCol>
    </>
  );
};

export default EditProfile;
