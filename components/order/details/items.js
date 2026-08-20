"use client";

import AppearanceOfLogo from "@/components/cart/blocks/view-branding";
import CurrencyReadOnly from "@/components/currency/currency-read-only";
import ReviewModal from "@/components/product/reviews/review-modal";
import {
  Box,
  Button,
  Divider,
  GridCol,
  Group,
  Paper,
  Stack,
  Text,
} from "@mantine/core";
import Image from "next/image";
import { useState } from "react";

const OrderItems = ({ items }) => {
  return (
    <>
      <GridCol span={{ base: 12, md: 8 }}>
        <Paper p={20} bg={"#f7f7f7"} h={"100%"}>
          <Stack gap={30}>
            <Text fw={600} size="md">
              Order Items
            </Text>
            <Stack>
              {items?.map((doc, i) => {
                return <OrderItem data={doc} key={doc._id} />;
              })}
            </Stack>
          </Stack>
        </Paper>
      </GridCol>
    </>
  );
};

const OrderItem = ({ data, setItem }) => {
  const item = (
    <>
      <Stack gap={0}>
        <Text fw={600} size="sm">
          {data?.productData?.name}
        </Text>
        <Text fw={600} size="xs">
          {data?.productData?.brand} ({data?.productData?.code})
        </Text>
        <Group mt={5} gap={10}>
          <Text fw={500} size="xs" opacity={0.7}>
            {data?.config?.color?.label}
          </Text>
          <Divider orientation="vertical" />
          <Text fw={500} size="xs" opacity={0.7}>
            {data?.config?.printName} ({data?.config?.printColorCount} Color)
          </Text>
        </Group>
        {/* <Button
          size="compact-xs"
          td="underline"
          p={0}
          variant="subtle"
          onClick={setItem}
        >
          Write a review
        </Button> */}
      </Stack>
      <Stack gap={0} align={"flex-end"}>
        <Text fw={600} size="xs" opacity={0.7}>
          {data?.config?.qty} Qty
        </Text>
        <Text fw={700} size="sm">
          <CurrencyReadOnly value={data?.cartConfig?.total} currency="aed" />
        </Text>

        <AppearanceOfLogo config={data?.config} />
      </Stack>
    </>
  );

  return (
    <>
      <Box>
        <Group wrap="nowrap">
          <Box w={75} h={75} miw={75} style={{ position: "relative" }}>
            <Image src={data?.productData?.image} fill />
          </Box>
          <Stack gap={0} w={"100%"}>
            <Group visibleFrom="md" justify="space-between">
              {item}
            </Group>
            <Stack hiddenFrom="md">{item}</Stack>
          </Stack>
        </Group>
      </Box>
    </>
  );
};

export default OrderItems;
