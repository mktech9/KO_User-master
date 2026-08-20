"use client";

import {
  Button,
  CloseButton,
  Container,
  Divider,
  Group,
  Modal,
  ModalBody,
  ModalHeader,
  Text,
} from "@mantine/core";
import PrintPreviewComponent from "..";
import { PiCheck } from "react-icons/pi";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import html2canvas from "html2canvas";

const PrintPreviewWrapper = ({
  logo,
  text,
  link,
  preview,
  setPreview,
  image,
  reseller,
  comments,
  setComments,
}) => {
  const [active, setActive] = useState("Preview");
  const [opened, { open, close }] = useDisclosure(false);
  const [load, setLoad] = useState(false);

  const savePreview = async () => {
    try {
      setActive("Preview");
      setLoad(true);
      const div = document.getElementById("print-preview");

      if (div) {
        console.log(div);
        const canvas = await html2canvas(div, {
          format: "png",
          useCORS: true,
          allowTaint: true,
        });

        canvas.toBlob(
          async (blob) => {
            setPreview(blob);
            setLoad(false);
            close();
          },
          "image/png",
          100
        );
      }
    } catch (err) {
      console.log(err);
      setLoad(false);
    }
  };

  return (
    <>
      <Button
        autoContrast
        size="md"
        variant="outline"
        color={!image ? "gray" : "dark"}
        onClick={() => {
          setActive("Preview");
          open();
        }}
        disabled={load || !image}
      >
        {image ? "Customize & Preview" : "Customize not available!"}
      </Button>
      <Modal
        padding={0}
        opened={opened}
        onClose={close}
        fullScreen
        withCloseButton={false}
        keepMounted={true}
        returnFocus
      >
        <ModalHeader>
          <Container w={"100%"} size={"xl"}>
            <Group justify="space-between">
              <Text fw={700}>Print Customization</Text>
              <Group>
                <CloseButton onClick={close} />
                <Button
                  autoContrast
                  leftSection={<PiCheck />}
                  onClick={savePreview}
                  loading={load}
                >
                  Save
                </Button>
              </Group>
            </Group>
          </Container>
        </ModalHeader>
        <Divider />
        <ModalBody mt={15}>
          <Container size={"xl"}>
            <PrintPreviewComponent
              logo={logo}
              text={text}
              link={link}
              image={image}
              preview={preview}
              active={active}
              setActive={setActive}
              setPreview={setPreview}
              reseller={reseller}
              comments={comments}
              setComments={setComments}
            />
          </Container>
        </ModalBody>
      </Modal>
    </>
  );
};

export default PrintPreviewWrapper;
