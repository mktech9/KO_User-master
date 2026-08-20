"use client";

import { Stack, Text, Title } from "@mantine/core";
import Crumbs from "../common/breadcrumbs";
import { useParams } from "next/navigation";

const SectionTitle = ({ paramtrs, titleData, seo, level }) => {
  const params = useParams();

  let breaddata = [];

  if (seo) {
    breaddata = [
      { title: "Home", href: "/" },
      {
        title: decodeURIComponent(params?.category?.replace(/-/g, " ")),
        href: `/${encodeURIComponent(params?.category)}`,
        current: level === 1,
      },
    ];

    if (params?.subcategory) {
      breaddata.push({
        title: decodeURIComponent(params?.subcategory?.replace(/-/g, " ")),
        href: `/${encodeURIComponent(params?.category)}/${encodeURIComponent(
          params?.subcategory
        )}`,
        current: level === 2,
      });
    }

    if (params?.subtypes) {
      breaddata.push({
        title: decodeURIComponent(params?.subtypes?.replace(/-/g, " ")),
        href: `/${encodeURIComponent(params?.category)}/${encodeURIComponent(
          params?.subcategory
        )}/${encodeURIComponent(params?.subtypes)}`,
        current: level === 3,
      });
    }
  } else {
    breaddata = [
      { title: "Home", href: "/" },
      {
        title: paramtrs.isSingleCategory
          ? paramtrs?.subTypes?.length > 0
            ? paramtrs.subTypes[0]
            : paramtrs?.subCategory?.length > 0
            ? paramtrs.subCategory[0]
            : paramtrs.category[0]
          : "Search Results",
        href: "/",
        current: true,
      },
    ];
  }

  return (
    <>
      <Stack gap={10} h={"100%"} justify="center">
        <Crumbs c="#fff" data={breaddata} />
        <Title order={1} mt={10} c="#fff">
          {paramtrs.isSingleCategory ? (
            <>
              {paramtrs?.subTypes?.length > 0
                ? paramtrs.subTypes[0]
                : paramtrs?.subCategory?.length > 0
                ? paramtrs.subCategory[0]
                : paramtrs.category[0]}
            </>
          ) : (
            "All Categories"
          )}
        </Title>
        {titleData && titleData?.titleItem && (
          <Text fw={500} size={"sm"} c={"#fff"}>
            {titleData?.titleItem?.subText}
          </Text>
        )}
      </Stack>
    </>
  );
};

export default SectionTitle;
