"use client";

import { useForm } from "@mantine/form";
import {
  Text,
  Paper,
  Group,
  Button,
  Divider,
  Anchor,
  Stack,
  TextInput,
  PasswordInput,
} from "@mantine/core";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { notifications } from "@mantine/notifications";
import { UpdatePassword3 } from "@/libs/my-account";

export function AuthenticationForm(props) {
  const router = useRouter();
  const [load, setLoad] = useState(false);
  const form = useForm({
    initialValues: {
      password: "",
      confirmPassword: "",
    },

    validate: {
      password: (val) =>
        val?.length >= 8 ? null : "Password should atleast be of 8 characters.",
      confirmPassword: (val, values) =>
        val === values.confirmPassword
          ? null
          : "Please first confirm your password.",
    },
  });

  return (
    <Paper w={"100%"} maw={370} shadow={0} radius="md" p="0" {...props}>
      <Text size="xl" fw={700} ta={"center"}>
        Forgot Password
      </Text>
      <form
        onSubmit={form.onSubmit(async () => {
          try {
            setLoad(true);

            if (!form.isValid()) {
              form.validate();
              throw new Error(
                "Please fill out the required fields to continue."
              );
            }

            const formValues = form.getValues();

            const resp = await UpdatePassword3(
              props.token,
              formValues.password
            );

            if (!resp.success) {
              throw new Error(resp?.msg ?? "An error occured!");
            }

            notifications.show({
              title: "Password Reset Successfull!",
              autoClose: 1500,
              color: "green",
            });

            setLoad(false);
            router.push("/auth");
          } catch (err) {
            console.log(err);
            notifications.show({
              title: err?.message,
              autoClose: 1500,
              color: "red",
            });
            setLoad(false);
          }
        })}
      >
        <Stack mt="xl">
          <PasswordInput
            required
            label="New Password"
            placeholder="New Passowrd"
            value={form.values.password}
            onChange={(event) =>
              form.setFieldValue("password", event.currentTarget.value)
            }
            error={
              form.errors.password &&
              "Password should atleast be of 8 characters."
            }
            radius="md"
          />
          <PasswordInput
            required
            label="Confirm Password"
            placeholder="Confirm Passowrd"
            value={form.values.confirmPassword}
            onChange={(event) =>
              form.setFieldValue("confirmPassword", event.currentTarget.value)
            }
            error={
              form.errors.confirmPassword &&
              "Please first confirm your password."
            }
            radius="md"
          />
        </Stack>

        <Group justify="space-between" mt="md">
          <Stack gap={12} w="100%" align="center">
            <Button
              w="100%"
              autoContrast
              type="submit"
              radius="xl"
              loading={load}
              disabled={load}
            >
              Reset Password
            </Button>
            <Anchor
              type="button"
              opacity={0.7}
              size="sm"
              fw={500}
              ta="center"
              component={Link}
              href={"/auth"}
            >
              Back to Sign in
            </Anchor>
          </Stack>
        </Group>
      </form>
    </Paper>
  );
}
