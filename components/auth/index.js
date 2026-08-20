"use client";

import { useToggle, upperFirst } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import {
  Text,
  Paper,
  Group,
  Button,
  Divider,
  Checkbox,
  Anchor,
  Stack,
} from "@mantine/core";
import { PiGoogleLogoDuotone, PiGoogleLogo } from "react-icons/pi";
import { useState } from "react";
import SignUp from "./sign-up";
import Common from "./common";
import { LoginHandler, SignUpHandler } from "./utils";
import { notifications } from "@mantine/notifications";
import { useGoogleLogin } from "@/hooks/use-google-login";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { SetLabel } from "@/app/labels-async";

export function AuthenticationForm(props) {
  const router = useRouter();
  const { requestConsent, loading } = useGoogleLogin();

  const [type, toggle] = useToggle(["login", "register"]);
  const [load, setLoad] = useState(false);
  const form = useForm({
    initialValues: {
      email: "",
      name: "",
      password: "",
      mobile: "",
      countryCode: "",
      terms: true,
    },

    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : "Invalid email"),
      password: (val) =>
        val.length < 6 ? "Password should include at least 6 characters" : null,
      name: (val) =>
        type === "register" && val === "" ? "Full Name is required!" : null,
      mobile: (val) =>
        type === "register" && val === "" ? "Mobile number is required!" : null,
      countryCode: (val) =>
        type === "register" && val === "" ? "Country Code is required!" : null,
      terms: (val) =>
        type === "register" && val === false
          ? "Please accept our terms & conditions!"
          : null,
    },
  });

  return (
    <Paper w={"100%"} maw={370} shadow={0} radius="md" p="0" {...props}>
      <Text size="xl" fw={700} ta={"center"}>
        {type === "login"
          ? `Login to ${props?.name} with`
          : `Register on ${props?.name} with`}
      </Text>

      <Group grow mb="md" mt="md">
        <Button
          autoContrast
          color="dark"
          leftSection={<PiGoogleLogo size={"1.5rem"} />}
          radius={"xl"}
          loading={loading}
          disabled={loading}
          onClick={requestConsent}
        >
          Google
        </Button>
      </Group>

      <Divider label="Or continue with email" labelPosition="center" my="lg" />

      <form
        onSubmit={form.onSubmit(async () => {
          if (type === "register") {
            let doc = form.getTransformedValues();
            console.log(doc);
            const result = await SignUpHandler(setLoad, notifications, doc);

            if (result) {
              toggle();
              form.reset();
            }
          } else {
            let doc = form.getTransformedValues();
            const result = await LoginHandler(
              setLoad,
              notifications,
              doc.email,
              doc.password
            );

            const labels = await SetLabel();

            if (result) {
              window.location.href = labels?.url;
            }
          }
        })}
      >
        <Stack>
          {type === "register" && <SignUp form={form} />}
          <Common form={form} />
          {type === "register" && (
            <Checkbox
              label="I accept terms and conditions"
              checked={form.values.terms}
              onChange={(event) =>
                form.setFieldValue("terms", event.currentTarget.checked)
              }
            />
          )}
        </Stack>

        <Group justify="space-between" mt="xl">
          <Stack gap={0} align="flex-start">
            <Anchor
              component="button"
              type="button"
              opacity={0.7}
              onClick={() => toggle()}
              size="sm"
              fw={500}
            >
              {type === "register"
                ? "Already have an account?"
                : "Don't have an account?"}
            </Anchor>
            <Anchor
              opacity={0.7}
              component={Link}
              href={"/auth/reset-password"}
              size="sm"
              fw={500}
            >
              {"Forgot Password?"}
            </Anchor>
          </Stack>
          <Button
            autoContrast
            type="submit"
            radius="xl"
            loading={load}
            disabled={load}
          >
            {upperFirst(type)}
          </Button>
        </Group>
      </form>
    </Paper>
  );
}
