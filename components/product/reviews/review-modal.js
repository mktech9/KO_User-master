"use client";

import { SubmitReview } from "@/libs/view-product";
import {
  Button,
  Center,
  CloseButton,
  Group,
  Modal,
  ModalBody,
  ModalHeader,
  Paper,
  Rating,
  Stack,
  Text,
  TextInput,
  Textarea,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { useState } from "react";
import { PiPlus } from "react-icons/pi";

const ReviewModal = ({ product }) => {
  const [opened, { open, close }] = useDisclosure();

  const form = useForm({
    initialValues: {
      rating: 5,
      review: "",
      name: "",
      email: "",
    },
    validate: {
      rating: (value) => (value >= 1 ? null : "Invalid Rating"),
      review: (value) => (value !== "" ? null : "Invalid Review"),
      name: (value) => (value !== "" ? null : "Invalid Name"),
      email: (value) => (value !== "" ? null : "Invalid Email"),
    },
  });

  const [load, setLoad] = useState(false);

  const saveHandler = async () => {
    try {
      const isValid = form.isValid();

      if (!isValid) {
        form.validate();
        throw new Error("Please fill out the required fields.");
      }
      const doc = form.getValues();
      const resp = await SubmitReview(doc, product);

      setLoad(false);
      notifications.show({
        title: "Thank you for providing feedback!",
        autoClose: 1500,
        color: "green",
      });
      close();
    } catch (err) {
      console.log(err);
      notifications.show({
        title: err?.message ?? "Something went wrong!",
        autoClose: 1500,
        color: "red",
      });
      setLoad(false);
    }
  };

  return (
    <>
      <Button onClick={open} leftSection={<PiPlus />} mt={8}>
        Write a review
      </Button>
      <Modal
        padding={0}
        opened={opened}
        onClose={close}
        withCloseButton={false}
        radius="md"
      >
        <ModalHeader px={32} py={24}>
          <Group justify="space-between" w="100%">
            <CloseButton style={{ visibility: "hidden" }} />
            <Stack gap={0} align="center">
              <Text fw={700} size="xl">
                Write a review
              </Text>
              <Text fw={500} size="sm">
                {opened?.productData?.code} {opened?.productData?.name}
              </Text>
            </Stack>
            <CloseButton />
          </Group>
        </ModalHeader>
        <ModalBody px={32} pb={32}>
          <Stack>
            <TextInput
              placeholder="Your Name"
              label="Your Name"
              key={form.key("name")}
              {...form.getInputProps("name")}
            />
            <TextInput
              placeholder="Your Email ID"
              label="Your Email ID"
              key={form.key("email")}
              {...form.getInputProps("email")}
            />
            <Stack gap={4} w="100%">
              <Text size="sm" fw={500} ta="center">
                Your Rating
              </Text>
              <Paper p="xs" withBorder w="100%">
                <Center w="100%">
                  <Rating
                    color="cyan"
                    size={"xl"}
                    key={form.key("rating")}
                    {...form.getInputProps("rating")}
                  />
                </Center>
              </Paper>
            </Stack>
            <Textarea
              minRows={4}
              autosize
              placeholder="Start writing here..."
              key={form.key("review")}
              {...form.getInputProps("review")}
            />
            <Button disabled={load} loading={load} onClick={saveHandler}>
              Submit
            </Button>
          </Stack>
        </ModalBody>
      </Modal>
    </>
  );
};

export default ReviewModal;
