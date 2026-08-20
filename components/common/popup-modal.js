"use client";

import { CloseButton, Modal, ModalBody } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Image from "next/image";

const PopupModal = ({ popupShow, image }) => {
  const [opened, { open, close }] = useDisclosure(popupShow);

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        padding={0}
        centered
        withCloseButton={false}
        radius="lg"
        size="xl"
      >
        <ModalBody pos="relative">
          <Image
            width={0}
            height={0}
            src={image}
            style={{ objectFit: "contain", width: "100%", height: "auto" }}
            sizes="60vw"
            priority
            fetchPriority="high"
          />
          <CloseButton
            variant="subtle"
            pos="absolute"
            onClick={close}
            top={12}
            right={12}
          />
        </ModalBody>
      </Modal>
    </>
  );
};

export default PopupModal;
