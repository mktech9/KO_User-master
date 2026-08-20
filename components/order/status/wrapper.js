"use client";

import {
  Box,
  Button,
  Container,
  Divider,
  Group,
  Paper,
  Space,
  Stack,
  Text,
} from "@mantine/core";
import StatusMessage from "./status-message";
import Link from "next/link";
import { useEffect } from "react";
import CurrencyReadOnly from "@/components/currency/currency-read-only";

const OrderStatusWrapper = ({ order }) => {
  useEffect(() => {
    const isRefresh = localStorage.getItem("refresh");

    if (isRefresh) {
      localStorage.removeItem("refresh");
      window.location.reload();
    }
  }, []);

  return (
    <>
      <Container size={"xl"} mt={60}>
        <Stack align="center">
          <StatusMessage status={order?.status} payLater={order?.payLater} />
          <Space h={30} />
          <Paper withBorder w={"100%"} maw={500} p={20}>
            <Stack gap={10}>
              <Group justify="space-between">
                <Text fw={500} size="sm" opacity={0.9}>
                  Subtotal
                </Text>
                <Text fw={600} size="sm">
                  <CurrencyReadOnly
                    value={order?.summary?.subTotal}
                    currency="aed"
                  />
                </Text>
              </Group>
              <Divider />
              <Group justify="space-between">
                <Text fw={500} size="sm" opacity={0.9}>
                  Discount
                </Text>
                <Text fw={600} size="sm">
                  {" "}
                  <CurrencyReadOnly
                    value={order?.summary?.discount}
                    currency="aed"
                  />
                </Text>
              </Group>
              <Divider />
              <Group justify="space-between">
                <Text fw={500} size="sm" opacity={0.9}>
                  VAT (5%)
                </Text>
                <Text fw={600} size="sm">
                  {" "}
                  <CurrencyReadOnly
                    value={order?.summary?.tax}
                    currency="aed"
                  />
                </Text>
              </Group>
              <Divider />

              <Group justify="space-between">
                <Text fw={500} size="sm" opacity={0.9}>
                  Shipping
                </Text>
                <Text fw={600} size="sm">
                  {" "}
                  <CurrencyReadOnly
                    value={order?.summary?.shippping ?? 0}
                    currency="aed"
                  />
                </Text>
              </Group>
              <Divider />
              <Group justify="space-between">
                <Text fw={500} size="sm" opacity={0.9}>
                  Total
                </Text>
                <Text fw={600} size="sm">
                  {" "}
                  <CurrencyReadOnly
                    value={order?.summary?.total}
                    currency="aed"
                  />
                </Text>
              </Group>
            </Stack>
          </Paper>
          <Box w={"100%"} maw={500}>
            <Group justify="space-between" wrap="nowrap">
              <Button
                autoContrast
                variant="outline"
                fullWidth
                component={Link}
                href={"/"}
              >
                Back to home
              </Button>
              <Button
                autoContrast
                fullWidth
                component={Link}
                href={`${order.oid}/details`}
              >
                Track Order
              </Button>
            </Group>
          </Box>
        </Stack>
      </Container>
      <Space h={25} />
    </>
  );
};

export default OrderStatusWrapper;
