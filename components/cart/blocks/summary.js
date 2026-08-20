import CurrencyReadOnly from "@/components/currency/currency-read-only";
import { Divider, Group, Paper, Stack, Text } from "@mantine/core";

const Summary = ({ summary, tax, reseller, orderType }) => {
  return (
    <>
      <Paper radius={"md"} p={20} bg={"#f4f4f4"}>
        <Stack gap={10}>
          <Text size="md" fw={700}>
            Order Summary
          </Text>
          <Group justify="space-between">
            <Text size="sm" fw={500} opacity={0.7}>
              Subtotal
            </Text>
            <Text size="sm" fw={700}>
              <CurrencyReadOnly value={summary?.subtotal} currency="aed" />
            </Text>
          </Group>
          <Group justify="space-between">
            <Text size="sm" fw={500} opacity={0.7}>
              Discount
            </Text>
            <Text size="sm" fw={700}>
              <CurrencyReadOnly value={summary?.discount} currency="aed" />
            </Text>
          </Group>
          <Group justify="space-between">
            <Text size="sm" fw={500} opacity={0.7}>
              VAT ({tax}%)
            </Text>
            <Text size="sm" fw={700}>
              <CurrencyReadOnly value={summary?.vat} currency="aed" />
            </Text>
          </Group>
          {!reseller && (
            <Group justify="space-between">
              <Text size="sm" fw={500} opacity={0.7}>
                Shipping
              </Text>
              <Text size="sm" fw={700}>
                {orderType === "pickup" ? (
                  "Free Shipping"
                ) : summary?.shipping > 0 ? (
                  <CurrencyReadOnly value={summary?.shipping} currency="aed" />
                ) : (
                  "Free Shipping"
                )}
              </Text>
            </Group>
          )}
          <Divider size={"md"} />
          <Group justify="space-between">
            <Text size="sm" fw={700}>
              Estimated Total
            </Text>
            <Text size="sm" fw={700}>
              <CurrencyReadOnly
                value={
                  orderType === "pickup"
                    ? summary?.total - summary?.shipping
                    : summary?.total
                }
                currency="aed"
              />
            </Text>
          </Group>
        </Stack>
      </Paper>
    </>
  );
};

export default Summary;
