import {
  PiClockAfternoonDuotone,
  PiCheckFatDuotone,
  PiPackageDuotone,
  PiTruckDuotone,
  PiCheckCircleDuotone,
} from "react-icons/pi";
import {
  GridCol,
  Paper,
  Stack,
  Stepper,
  StepperStep,
  Text,
  Timeline,
  TimelineItem,
} from "@mantine/core";

let shippping = [
  {
    status: "pending",
    icon: PiClockAfternoonDuotone,
    value: "Currently awaiting confirmation from your payment gateway.",
  },
  {
    status: "confirmed",
    icon: PiCheckFatDuotone,
    value: "Payment Confirmed!, your order will be packed soon!",
  },
  {
    status: "processed",
    icon: PiPackageDuotone,
    value: "Order Processed!",
  },
  {
    status: "delivered",
    icon: PiCheckCircleDuotone,
    value: "Order has been successfully delivered!",
  },
];

let pickup = [
  {
    status: "pending",
    icon: PiClockAfternoonDuotone,
    value: "Currently awaiting confirmation from your payment gateway.",
  },
  {
    status: "confirmed",
    icon: PiCheckFatDuotone,
    value: "Payment Confirmed!, your order will be packed soon!",
  },
  {
    status: "processed",
    icon: PiPackageDuotone,
    value: "Order is ready to be picked up at your selected address!",
  },
  {
    status: "delivered",
    icon: PiCheckCircleDuotone,
    value: "Order has been picked up successfully!",
  },
];

const OrderTimeline = ({ type, status }) => {
  let data = type === "shipping" ? shippping : pickup;
  const active = data?.findIndex((doc) => doc.status === status);

  return (
    <>
      <GridCol span={12}>
        <Paper bg={"gray.0"} p={20} h={"100%"}>
          <Stack gap={30}>
            <Text fw={600} size="md">
              Order Progress
            </Text>
            <Stepper visibleFrom="md" active={active}>
              {data?.map((doc, i) => {
                let Icon = doc.icon;
                return (
                  <>
                    <StepperStep
                      label={doc.status}
                      description={active === i ? doc.value : ""}
                      icon={<Icon size={"1.5rem"} />}
                    />
                  </>
                );
              })}
            </Stepper>
            <Timeline active={active} color="cyan" hiddenFrom="md">
              {data?.map((doc, i) => {
                let Icon = doc.icon;

                return (
                  <TimelineItem
                    bullet={<Icon size={"1.2rem"} />}
                    title={
                      <Text
                        fw={600}
                        size="sm"
                        style={{ textTransform: "capitalize" }}
                        key={i}
                      >
                        {doc.status}
                      </Text>
                    }
                  >
                    {active === i && (
                      <Text size="xs" opacity={0.7}>
                        {doc.value}
                      </Text>
                    )}
                  </TimelineItem>
                );
              })}
            </Timeline>
          </Stack>
        </Paper>
      </GridCol>
    </>
  );
};

export default OrderTimeline;
