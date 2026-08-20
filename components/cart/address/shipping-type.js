"use client";

import {
  Checkbox,
  Group,
  Paper,
  SimpleGrid,
  Stack,
  Text,
  ThemeIcon,
  UnstyledButton,
} from "@mantine/core";
import {
  PiPackageDuotone,
  PiPackage,
  PiTruckDuotone,
  PiTruck,
} from "react-icons/pi";

const ShippingType = ({ value, setValue }) => {
  return (
    <>
      <SimpleGrid cols={{ base: 1, md: 2 }}>
        <Item
          setActive={() => setValue("shipping")}
          active={value === "shipping"}
          icon={PiPackage}
          value="shipping"
          title="Shipping Address"
          text="Shipping address is where we’ll deliver at your desired location"
        />
        <Item
          setActive={() => setValue("pickup")}
          active={value === "pickup"}
          icon={PiTruck}
          value="pickup"
          title="Pickup"
          text="Pickup address is where you would collect from our premises"
        />
      </SimpleGrid>
    </>
  );
};

const Item = ({ icon, value, title, text, active, setActive }) => {
  let Icon = icon;

  return (
    <>
      <UnstyledButton onClick={setActive}>
        <Paper p={15} bg={"gray.0"} withBorder>
          <Group wrap="nowrap" justify="space-between">
            <Group wrap="nowrap">
              <ThemeIcon autoContrast size={"xl"} variant="gradient">
                <Icon size={"1.5rem"} />
              </ThemeIcon>
              <Stack gap={0}>
                <Text size="sm" fw={500}>
                  {title}
                </Text>
                <Text size="xs" fw={500} opacity={0.7}>
                  {text}
                </Text>
              </Stack>
            </Group>
            <Checkbox checked={active} radius={"xl"} size="md" />
          </Group>
        </Paper>
      </UnstyledButton>
    </>
  );
};

export default ShippingType;
