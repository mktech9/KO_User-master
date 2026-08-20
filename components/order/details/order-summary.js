import CurrencyReadOnly from "@/components/currency/currency-read-only";
import { GridCol, Group, Paper, Stack, Text } from "@mantine/core";

const OrderSummary = ({ data }) => {
  return (
    <GridCol span={{ base: 12, md: 4 }}>
      <Paper bg={"gray.0"} p={20} h={"100%"}>
        <Stack gap={15}>
          <Text fw={600} size="md">
            Order Summary
          </Text>
          <Stack gap={5}>
            <Group justify="space-between">
              <Text fw={400} size="sm" opacity={0.7}>
                Subtotal
              </Text>
              <Text fw={600} size="sm">
                <CurrencyReadOnly
                  value={data?.summary?.subTotal}
                  currency="aed"
                />
              </Text>
            </Group>
            <Group justify="space-between">
              <Text fw={400} size="sm" opacity={0.7}>
                Discount
              </Text>
              <Text fw={600} size="sm">
                <CurrencyReadOnly
                  value={data?.summary?.discount}
                  currency="aed"
                />
              </Text>
            </Group>
            <Group justify="space-between">
              <Text fw={400} size="sm" opacity={0.7}>
                VAT (%12)
              </Text>
              <Text fw={600} size="sm">
                <CurrencyReadOnly value={data?.summary?.tax} currency="aed" />
              </Text>
            </Group>
            <Group justify="space-between">
              <Text fw={400} size="sm" opacity={0.7}>
                Shipping
              </Text>
              <Text fw={600} size="sm">
                <CurrencyReadOnly
                  value={data?.summary?.shipping ?? 0}
                  currency="aed"
                />
              </Text>
            </Group>
            <Group justify="space-between">
              <Text fw={400} size="sm" opacity={0.7}>
                Total
              </Text>
              <Text fw={600} size="sm">
                <CurrencyReadOnly value={data?.summary?.total} currency="aed" />
              </Text>
            </Group>
          </Stack>
        </Stack>
      </Paper>
    </GridCol>
  );
};

export default OrderSummary;
