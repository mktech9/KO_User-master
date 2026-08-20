import { Stack, Text, ThemeIcon } from "@mantine/core";
import {
  PiCheckFatDuotone,
  PiClockAfternoonDuotone,
  PiWarningCircleDuotone,
} from "react-icons/pi";

let configs = {
  pending: {
    title: "Awaiting Confirmation!",
    message: "Your order is being processed. Thank you for your patience!",
    icon: PiClockAfternoonDuotone,
    color1: "dark",
    color2: "cyan",
  },
  confirmed: {
    title: "Order Confirmed!",
    message: "Hooray! Your order is confirmed and on its way to you.",
    icon: PiCheckFatDuotone,
    color1: "green",
    color2: "lime",
  },
  failed: {
    title: "Order Failed!",
    message:
      "Oops! There was an issue processing your order. Please contact support for assistance.",
    icon: PiWarningCircleDuotone,
    color1: "red",
    color2: "orange",
  },
  payLater: {
    title: "Order Reserved!",
    message: "Your order is being processed. Thank you for your patience!",
    icon: PiClockAfternoonDuotone,
    color1: "violet",
    color2: "grape",
  },
};

const StatusMessage = ({ status, payLater }) => {
  const data =
    payLater && status === "pending" ? configs.payLater : configs[status];

  return (
    <>
      <Stack align="center">
        <Icon icon={data?.icon} color1={data?.color1} color2={data?.color2} />
        <Stack gap={0} align="center">
          <Text fw={700} size="xl">
            {data?.title}
          </Text>
          <Text size="sm" ta={"center"} opacity={0.7}>
            {data?.message}
          </Text>
        </Stack>
      </Stack>
    </>
  );
};

const Icon = ({ icon, color1, color2 }) => {
  let GivenIcon = icon;

  return (
    <>
      <ThemeIcon
        autoContrast
        radius={"50%"}
        size={"5rem"}
        variant="gradient"
        gradient={{ from: color1, to: color2, deg: 90 }}
      >
        <GivenIcon size={"2.5rem"} />
      </ThemeIcon>
    </>
  );
};

export default StatusMessage;
