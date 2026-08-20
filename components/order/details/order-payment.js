import CurrencyReadOnly from "@/components/currency/currency-read-only";
import { GridCol, Group, Paper, Stack, Text, Tooltip } from "@mantine/core";
import moment from "moment";

const OrderPayment = ({ data }) => {
  return (
    <GridCol span={{ base: 12, md: 4 }}>
      <Paper bg={"gray.0"} p={20} h={"100%"}>
        <Stack gap={15}>
          <Text fw={600} size="md">
            Order Payment
          </Text>
          <Stack gap={5}>
            <Group justify="space-between">
              <Text fw={400} size="sm" opacity={0.7}>
                Payment Status
              </Text>
              <Text fw={600} size="sm">
                {data?.paymentStatus ?? "pending"}
              </Text>
            </Group>
            <Group justify="space-between">
              <Text fw={400} size="sm" opacity={0.7}>
                Payment Method
              </Text>
              <Text fw={600} size="sm">
                {data?.payLater ? "Pay Later" : "Online Payment"}
              </Text>
            </Group>
            <Group justify="space-between">
              <Text fw={400} size="sm" opacity={0.7}>
                Is Paid
              </Text>
              <Text fw={600} size="sm">
                {data?.isPaid ? "Paid" : "Not Paid"}
              </Text>
            </Group>
            <Group justify="space-between">
              <Text fw={400} size="sm" opacity={0.7}>
                Payment ID
              </Text>
              <Tooltip
                label={
                  data?.payLater
                    ? data?.paymentGateway?.payLater
                      ? data?.paymentGateway?.payLater
                          ?.map((doc) => doc?.id)
                          ?.join(", ")
                      : ""
                    : data?.paymentGateway?.id
                }
                multiline
              >
                <Text fw={600} size="sm" maw={150} truncate>
                  {data?.payLater
                    ? data?.paymentGateway?.payLater
                      ? data?.paymentGateway?.payLater
                          ?.map((doc) => doc?.id)
                          ?.join(", ")
                      : ""
                    : data?.paymentGateway?.id}
                </Text>
              </Tooltip>
            </Group>
            <Group justify="space-between">
              <Text fw={400} size="sm" opacity={0.7}>
                Payment Date
              </Text>
              <Tooltip
                label={
                  data?.payLater
                    ? data?.paymentGateway?.payLater
                      ? data?.paymentGateway?.payLater
                          ?.map((doc) =>
                            moment(doc?.date).format("DD MMM YYYY h:mm A")
                          )
                          ?.join(", ")
                      : ""
                    : moment(data?.paymentGateway?.date).format(
                        "DD MMM YYYY h:mm A"
                      )
                }
                multiline
              >
                <Text fw={600} size="sm" maw={150} truncate>
                  {data?.payLater
                    ? data?.paymentGateway?.payLater
                      ? data?.paymentGateway?.payLater
                          ?.map((doc) =>
                            moment(doc?.date).format("DD MMM YYYY h:mm A")
                          )
                          ?.join(", ")
                      : ""
                    : moment(data?.paymentGateway?.date).format(
                        "DD MMM YYYY h:mm A"
                      )}
                </Text>
              </Tooltip>
            </Group>
            <Group justify="space-between">
              <Text fw={400} size="sm" opacity={0.7}>
                Balance Due
              </Text>
              <Text fw={600} size="sm">
                <CurrencyReadOnly value={data?.balance} currency="aed" />
              </Text>
            </Group>
            <Group justify="space-between">
              <Text fw={400} size="sm" opacity={0.7}>
                Total Paid
              </Text>
              <Text fw={600} size="sm">
                <CurrencyReadOnly value={data?.paid} currency="aed" />
              </Text>
            </Group>
          </Stack>
        </Stack>
      </Paper>
    </GridCol>
  );
};

export default OrderPayment;
