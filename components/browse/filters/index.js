import { Anchor, Stack } from "@mantine/core";
import FilterModule from "./filter-module";
import CategoryFilter from "./category-filter";
import Stock from "./stock";
import Link from "next/link";
import CategoryFilter2 from "./category-filter-2";

const BrowseFilters = async ({ data, reseller, paramtrs, seo }) => {
  //Desktop Only
  return (
    <>
      <Stack gap={"xl"}>
        <Anchor
          td={"underline"}
          style={{ lineHeight: 1 }}
          c={"dark"}
          size="sm"
          fw={500}
          component={Link}
          href={"/search/advanced"}
        >
          Search all products
        </Anchor>
        {seo ? (
          <CategoryFilter2
            text={"By Category"}
            data={data?.category}
            paramtrs={paramtrs}
            seo={seo}
          />
        ) : (
          <CategoryFilter
            text={"By Category"}
            data={data?.category}
            paramtrs={paramtrs}
            seo={seo}
          />
        )}
        {reseller && <Stock text={"Stock"} />}
        <FilterModule
          paramName="filterBy"
          type={"chip"}
          data={data?.basic}
          defaultValue={[]}
          currentValue={""}
          title={"Filter By"}
        />
        <FilterModule
          paramName="size"
          type={"chip"}
          data={data?.size}
          defaultValue={[]}
          currentValue={""}
          title={"Item Size"}
        />
        <FilterModule
          paramName="label"
          type={"chip"}
          data={data?.labels}
          defaultValue={[]}
          currentValue={""}
          title={"Labels"}
        />
        <FilterModule
          paramName="color"
          type={"color"}
          data={data?.colors}
          defaultValue={[]}
          currentValue={""}
          title={"Color"}
        />
        <FilterModule
          paramName="capacity"
          type={"chip"}
          data={data?.capacity}
          defaultValue={[]}
          currentValue={""}
          title={"Capacity"}
        />
        <FilterModule
          paramName="printType"
          type={"chip"}
          data={data?.type}
          defaultValue={[]}
          currentValue={""}
          title={"Print Techniques"}
        />
        <FilterModule
          paramName="material"
          type={"chip"}
          data={data?.material}
          defaultValue={[]}
          currentValue={""}
          title={"Main Material"}
        />
      </Stack>
    </>
  );
};

export default BrowseFilters;
