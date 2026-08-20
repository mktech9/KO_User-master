"use client";

import { useDisclosure } from "@mantine/hooks";
import {
  Drawer,
  Button,
  Burger,
  DrawerHeader,
  Group,
  CloseButton,
  Divider,
  DrawerBody,
} from "@mantine/core";
import { Logo } from "../desktop";
import { useState } from "react";
import MobileItemMain from "./mobile-item-main";
import MobileItemSub from "./mobile-item-sub";
import MobileItemType from "./mobile-item-type";

const MobileDrawer = ({ data }) => {
  const [opened, { open, close }] = useDisclosure(false);

  //states
  const [selected, setSelected] = useState(null);
  const [sub, setSub] = useState(null);

  return (
    <>
      <Drawer
        opened={opened}
        onClose={close}
        withCloseButton={false}
        padding={0}
      >
        <DrawerBody p={0}>
          <Group w={"100%"} px={15} py={15} justify="space-between">
            <Logo width={100} />
            <CloseButton onClick={close} size={"sm"} />
          </Group>
          <Divider />
          {!selected && !sub && (
            <MobileItemMain data={data} setSelected={setSelected} close={close} />
          )}
          {selected && !sub && (
            <MobileItemSub
              data={selected}
              setSelected={setSelected}
              setSub={setSub}
              close={close}
            />
          )}
          {selected && sub && (
            <MobileItemType
              data={selected}
              sub={sub}
              setSelected={setSelected}
              setSub={setSub}
              close={close}
            />
          )}
        </DrawerBody>
      </Drawer>
      <Burger opened={opened} onClick={open} />
    </>
  );
};

export default MobileDrawer;
