import { SimpleGrid, Skeleton } from "@mantine/core";
import { Suspense } from "react";
import ProductHolder from "../product-holder";

let height = { base: 252, md: 300 };

const GetItems = async ({ paramtrs, count, filters, reseller }) => {
  let keyString = JSON.stringify({ ...paramtrs });

  return (
    <>
      <Suspense
        key={keyString}
        fallback={
          <SimpleGrid spacing={"xl"} cols={{ base: 2, md: 4 }}>
            <Skeleton radius={0} w={"100%"} h={height} />
            <Skeleton radius={0} w={"100%"} h={height} />
            <Skeleton radius={0} w={"100%"} h={height} />
            <Skeleton radius={0} w={"100%"} h={height} />
            <Skeleton radius={0} w={"100%"} h={height} />
            <Skeleton radius={0} w={"100%"} h={height} />
            <Skeleton radius={0} w={"100%"} h={height} />
            <Skeleton radius={0} w={"100%"} h={height} />
            <Skeleton radius={0} w={"100%"} h={height} />
            <Skeleton radius={0} w={"100%"} h={height} />
            <Skeleton radius={0} w={"100%"} h={height} />
            <Skeleton radius={0} w={"100%"} h={height} />
          </SimpleGrid>
        }
      >
        <ProductHolder
          paramtrs={paramtrs}
          filters={filters}
          reseller={reseller}
        />
      </Suspense>
    </>
  );
};

export default GetItems;
