"use client";

import { useInput } from "@/hooks/use-input";
import { CreateQuery } from "@/libs/contact";
import {
  Box,
  Button,
  Grid,
  GridCol,
  LoadingOverlay,
  Paper,
  Stack,
  Text,
  TextInput,
  Textarea,
  ThemeIcon,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import Link from "next/link";
import { useState } from "react";
import { PiCheckFatDuotone } from "react-icons/pi";

const ContactForm = () => {
  const [load, setLoad] = useState(false);
  const [success, setSuccess] = useState(false);

  const { input: name } = useInput((v) => v !== "", "");
  const { input: email } = useInput((v) => v !== "", "");
  const { input: mobile } = useInput((v) => v !== "", "");
  const { input: message } = useInput((v) => v !== "", "");

  const submitHandler = async () => {
    try {
      if (
        !name.isValid ||
        !email.isValid ||
        !message.isValid ||
        !mobile.isValid
      ) {
        name.blurHandler();
        email.blurHandler();
        mobile.blurHandler();
        message.blurHandler();
        return;
      }

      setLoad(true);
      const doc = {
        name: name.inputValue,
        email: email.inputValue,
        mobile: mobile.inputValue,
        message: message.inputValue,
        isResolved: false,
      };

      const response = await CreateQuery(doc);

      if (!response) {
        throw new Error("Something went wrong!");
      }

      setLoad(false);
      setSuccess(true);
    } catch (err) {
      console.log(err);
      setLoad(false);
      notifications.show({
        title: err?.message,
        autoClose: 1500,
        color: "red",
      });
    }
  };

  return (
    <>
      <Paper
        p={20}
        shadow="md"
        radius={"md"}
        style={{ position: "relative", overflow: "hidden" }}
        mih={490}
      >
        <LoadingOverlay visible={load} />
        {!success ? (
          <Box>
            <Stack gap={0}>
              <Text style={{ fontSize: 27 }} fw={750}>
                Get in touch
              </Text>
              <Text size="sm" fw={500} opacity={0.9}>
                You can reach us anytime.
              </Text>
            </Stack>
            <Grid mt={30}>
              <GridCol span={12}>
                <TextInput
                  placeholder="Your full name..."
                  value={name.inputValue}
                  onChange={name.inputHandler}
                  onBlur={name.blurHandler}
                  error={name.error ? "Name is required!" : ""}
                />
              </GridCol>
              <GridCol span={6}>
                <TextInput
                  placeholder="Your email address..."
                  value={email.inputValue}
                  onChange={email.inputHandler}
                  onBlur={email.blurHandler}
                  error={email.error ? "Email is required!" : ""}
                />
              </GridCol>
              <GridCol span={6}>
                <TextInput
                  placeholder="Your mobile number..."
                  value={mobile.inputValue}
                  onChange={mobile.inputHandler}
                  onBlur={mobile.blurHandler}
                  error={mobile.error ? "Mobile-number is required!" : ""}
                />
              </GridCol>
              <GridCol span={12}>
                <Textarea
                  autosize
                  minRows={5}
                  placeholder="Your message..."
                  value={message.inputValue}
                  onChange={message.inputHandler}
                  onBlur={message.blurHandler}
                  error={message.error ? "Message is required!" : ""}
                />
              </GridCol>
              <GridCol span={12}>
                <Stack align="center">
                  <Button              autoContrast
                    mt={30}
                    size="md"
                    fullWidth
                    onClick={submitHandler}
                    disabled={load}
                    loading={load}
                  >
                    Submit
                  </Button>
                  <Text
                    size="xs"
                    ta={"center"}
                    maw={300}
                    opacity={0.95}
                    fw={500}
                  >
                    By contacting us, you agree to our{" "}
                    <Text
                      span
                      fw={700}
                      component={Link}
                      href={"/static/terms"}
                      td={"underline"}
                    >
                      Terms of service
                    </Text>{" "}
                    and{" "}
                    <Text
                      span
                      fw={700}
                      component={Link}
                      href={"/static/privacy-policy"}
                      td={"underline"}
                    >
                      Privacy policy
                    </Text>
                    .
                  </Text>
                </Stack>
              </GridCol>
            </Grid>
          </Box>
        ) : (
          <Stack align="center" justify="center" mih={430}>
            <ThemeIcon autoContrast
              size={"5rem"}
              variant="gradient"
              radius={"50%"}
              gradient={{ from: "green", to: "lime", deg: 180 }}
            >
              <PiCheckFatDuotone size={"2rem"} />
            </ThemeIcon>
            <Stack gap={0} align="center">
              <Text size="md" fw={600}>
                Submited!
              </Text>
              <Text size="xs" ta={"center"} fw={500} opacity={0.7}>
                We will reach out to you within 24 hours.
              </Text>
            </Stack>
          </Stack>
        )}
      </Paper>
    </>
  );
};

export default ContactForm;
