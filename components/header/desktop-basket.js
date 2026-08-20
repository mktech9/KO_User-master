"use client";

import useCart from "@/hooks/use-cart";
import { ActionIcon, Badge, Stack, Text } from "@mantine/core";
import Link from "next/link";
import { useEffect } from "react";
import { PiShoppingCart, PiShoppingCartDuotone } from "react-icons/pi";

const DesktopBasket = ({ noText }) => {
  const { cart, getItems } = useCart();

  useEffect(() => {
    getItems();
  }, []);

  return (
    <>
      <Stack
        gap={0}
        align="center"
        style={{ position: "relative" }}
        component={Link}
        href="/basket"
      >
        <ActionIcon autoContrast size="md" color="black" variant="subtle">
          <PiShoppingCart size={"1.5rem"} />
        </ActionIcon>
        {cart?.length > 0 && (
          <Badge
            autoContrast
            size="xs"
            circle
            color="dark"
            style={{ position: "absolute", top: 0, right: 0 }}
          >
            {cart?.length}
          </Badge>
        )}
        {!noText && (
          <Text style={{ fontSize: 11 }} fw={600}>
            Basket
          </Text>
        )}
      </Stack>
    </>
  );
};

export default DesktopBasket;
