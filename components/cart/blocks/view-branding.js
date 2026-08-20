"use client";

import { useDisclosure } from "@mantine/hooks";
import {
  Modal,
  Button,
  ModalOverlay,
  ModalHeader,
  ModalTitle,
  ModalCloseButton,
  ActionIcon,
  Group,
  Text,
  CloseButton,
  ModalBody,
  SegmentedControl,
  Stack,
  ThemeIcon,
  Space,
  Box,
  Image,
} from "@mantine/core";
import {
  PiPaintBrushBroadDuotone,
  PiPaintBrushBroad,
  PiXCircleDuotone,
  PiXCircle,
} from "react-icons/pi";
import { useState } from "react";

const AppearanceOfLogo = ({ config }) => {
  const [opened, { open, close }] = useDisclosure(false);
  const [view, setView] = useState("logo");

  return (
    <>
      <Modal
        padding={15}
        opened={opened}
        onClose={close}
        withCloseButton={false}
      >
        <ModalHeader>
          <Group w={"100%"} justify="space-between">
            <Text fw={700}>View Branding</Text>
            <CloseButton onClick={close} />
          </Group>
        </ModalHeader>
        <ModalBody pt={5} w={"100%"}>
          <SegmentedControl
            w={"100%"}
            data={[
              { label: "Logo", value: "logo" },
              { label: "Text", value: "text" },
              { label: "Link", value: "link" },
              { label: "Saved", value: "saved" },
            ]}
            value={view}
            onChange={setView}
          />
          <Space h={30} />
          {view === "logo" && (
            <>
              {config?.brandImage && config.brandImage !== "" ? (
                <Box w={"100%"}>
                  <Image fit="contain" src={config?.brandImage} />
                </Box>
              ) : (
                <NoItemMessage text="No image uploaded!" />
              )}
            </>
          )}
          {view === "text" && (
            <>
              {config?.brandText && config.brandText !== "" ? (
                <Text fw={500} ta={"center"}>
                  {config.brandText}
                </Text>
              ) : (
                <NoItemMessage text="No text provided!" />
              )}
            </>
          )}
          {view === "link" && (
            <>
              {config?.brandDriveLink && config.brandDriveLink !== "" ? (
                <Box w={"100%"} h={300} style={{ position: "relative" }}>
                  <Image src={config?.brandDriveLink} fill />
                </Box>
              ) : (
                <NoItemMessage text="No link provided!" />
              )}
            </>
          )}
          {view === "saved" && (
            <>
              {config?.printPreview && config?.printPreview !== "" ? (
                <Box w={"100%"} h={300} style={{ position: "relative" }}>
                  <Image src={config?.printPreview} fill />
                </Box>
              ) : (
                <NoItemMessage text="No customization added!" />
              )}
            </>
          )}
        </ModalBody>
      </Modal>
      <ActionIcon autoContrast variant="transparent" onClick={open}>
        <PiPaintBrushBroad size={"1.2rem"} />
      </ActionIcon>
    </>
  );
};

export const NoItemMessage = ({ text }) => {
  return (
    <>
      <Stack align="center">
        <ThemeIcon
          autoContrast
          color="red"
          gradient={{ from: "red", to: "orange", deg: 90 }}
          variant="gradient"
          size={"xl"}
          radius={"xl"}
        >
          <PiXCircle size={"1.5rem"} />
        </ThemeIcon>
        <Text>{text ?? "No Item"}</Text>
      </Stack>
    </>
  );
};

export default AppearanceOfLogo;
