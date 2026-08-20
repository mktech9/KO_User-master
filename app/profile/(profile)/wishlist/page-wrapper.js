"use client";

import { NoItemMessage } from "@/components/cart/blocks/view-branding";
import ProductCard1 from "@/components/common/product-card-1";
import { GetPopulatedItems } from "@/libs/wishlist-server-utils";
import useCache from "@/store/useCache";
import { GridCol, SimpleGrid, Stack } from "@mantine/core";
import { useEffect, useState } from "react";

const PageWrapper = () => {
  const { wishlist } = useCache();
  const [items, setItems] = useState([]);

  useEffect(() => {
    GetPopulatedItems(wishlist).then((data) => setItems(data));
  }, [wishlist]);

  return (
    <>
      <GridCol span={{ base: 12, md: 9 }}>
        {items?.length > 0 ? (
          <SimpleGrid spacing={10} cols={{ base: 2, md: 4 }}>
            {items?.map((doc) => {
              return <ProductCard1 disableColor disableDivider data={doc} />;
            })}
          </SimpleGrid>
        ) : (
          <Stack mt={90}>
            <NoItemMessage />
          </Stack>
        )}
      </GridCol>
    </>
  );
};

export default PageWrapper;
