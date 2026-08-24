import { getPaginatedProducts } from "@/libs/get-paginated-product";
import ProductHolderClient from "./product-holder-client";

const ProductHolder = async ({
  paramtrs,
  filters,
  reseller,
}) => {
  const items = await getPaginatedProducts(
    paramtrs,
    filters,
    reseller
  );

  // console.log("SERVER PRODUCT ITEMS:", items?.length);

  return (
    <ProductHolderClient
      initialItems={items}
      paramtrs={paramtrs}
      filters={filters}
      reseller={reseller}
    />
  );
};

export default ProductHolder;