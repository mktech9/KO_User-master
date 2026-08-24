"use client";

import { useEffect, useState } from "react";
import { SimpleGrid } from "@mantine/core";
import Pusher from "pusher-js";
import ProductCard1 from "../common/product-card-1";
import { NoItemMessage } from "../cart/blocks/view-branding";

const ProductHolderClient = ({
  initialItems,
  paramtrs,
  filters,
  reseller,
}) => {
  const [items, setItems] = useState(initialItems || []);
  

  // console.log("CLIENT PRODUCT ITEMS:", items?.length);

  useEffect(() => {
    // console.log("🚀 PRODUCT HOLDER CLIENT MOUNTED");

    Pusher.logToConsole = true;

    const pusher = new Pusher(
      process.env.NEXT_PUBLIC_PUSHER_KEY,
      {
        cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER,
        forceTLS: true,
      }
    );

    pusher.connection.bind("state_change", (states) => {
      console.log("PUSHER STATE:", states);
    });

    const channel = pusher.subscribe("products");

    channel.bind(
      "pusher:subscription_succeeded",
      () => {
        console.log("✅ SUBSCRIBED TO PRODUCTS");
      }
    );

    channel.bind("product-updated", async (event) => {
      console.log("🔥 PRODUCT UPDATED:", event);

      const code = event?.code;

      if (!code) return;

      try {
        const response = await fetch(
          `/api/products/${code}`,
          {
            cache: "no-store",
          }
        );

        if (!response.ok) return;

        const updatedProduct = await response.json();

        setItems((currentItems) =>
          currentItems.map((item) =>
            item.code === code
              ? {
                  ...item,
                  ...updatedProduct,
                }
              : item
          )
        );
      } catch (error) {
        console.error(
          "Realtime product refresh error:",
          error
        );
      }
    });

    return () => {
      channel.unbind_all();
      pusher.unsubscribe("products");
      pusher.disconnect();
    };
  }, []);

  return (
    <>
      {items?.length > 0 ? (
        <>
          <SimpleGrid
            visibleFrom="md"
            spacing="sm"
            h="fit-content"
            cols={{ base: 1, md: 4 }}
            style={{ alignItems: "stretch" }}
          >
            {items.map((doc) => (
              <ProductCard1
                key={doc.ref}
                reseller={reseller}
                data={doc}
              />
            ))}
          </SimpleGrid>

          <SimpleGrid
            hiddenFrom="md"
            spacing="sm"
            cols={{ base: 2, md: 4 }}
            style={{ alignItems: "stretch" }}
          >
            {items.map((doc) => (
              <ProductCard1
                key={doc.ref}
                reseller={reseller}
                data={doc}
              />
            ))}
          </SimpleGrid>
        </>
      ) : (
        <NoItemMessage />
      )}
    </>
  );
};

export default ProductHolderClient;