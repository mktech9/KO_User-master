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
} from "@mantine/core";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { notifications } from "@mantine/notifications";

export function AuthenticationForm(props) {
  const router = useRouter();
  const [load, setLoad] = useState(false);
  const form = useForm({
    initialValues: {
      email: "",
    },

    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : "Invalid email"),
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

            const resp = await fetch(
              `https://ko-api.vercel.app/order/reset-password`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  email: form.getValues().email,
                  website: global?.configs?.website,
                }),
              }
            ).then((res) => res.json());

            if (!resp.success) {
              throw new Error(resp?.msg ?? "Invalid email address!");
            }

            notifications.show({
              title: "Check your inbox for futher instructions!",
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
          <TextInput
            required
            label="Email"
            placeholder="hello@mantine.dev"
            value={form.values.email}
            onChange={(event) =>
              form.setFieldValue("email", event.currentTarget.value)
            }
            error={form.errors.email && "Invalid email"}
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
              Get Reset Link
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
