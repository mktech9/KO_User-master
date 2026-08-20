import { SimpleGrid } from "@mantine/core";
import ProductCard1 from "../common/product-card-1";
import { getPaginatedProducts } from "@/libs/get-paginated-product";
import { NoItemMessage } from "../cart/blocks/view-branding";

const ProductHolder = async ({ paramtrs, filters, reseller }) => {
  const items = await getPaginatedProducts(paramtrs, filters, reseller);

  return (
    <>
      {items?.length > 0 ? (
        <>
          <SimpleGrid
            visibleFrom="md"
            spacing={"sm"}
            h="fit-content"
            cols={{ base: 1, md: 4 }}
            style={{ alignItems: "stretch" }}
          >
            {items?.map((doc) => {
              return (
                <ProductCard1 key={doc.ref} reseller={reseller} data={doc} />
              );
            })}
          </SimpleGrid>
          <SimpleGrid
            hiddenFrom="md"
            spacing={"sm"}
            cols={{ base: 2, md: 4 }}
            style={{ alignItems: "stretch" }}
          >
            {items?.map((doc) => {
              return (
                <ProductCard1 key={doc.ref} data={doc} reseller={reseller} />
              );
            })}
          </SimpleGrid>
        </>
      ) : (
        <>
          <NoItemMessage />
        </>
      )}
    </>
  );
};

export default ProductHolder;
