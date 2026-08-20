import { Anchor } from "@mantine/core";
import Link from "next/link";

const SearchCategory = ({ link }) => {
  return (
    <>
      <Anchor
        px={20}
        py={2.5}
        style={{ fontSize: 14 }}
        c={"dark"}
        component={Link}
        href={
          link?.type === "category"
            ? `/${encodeURIComponent(link.category?.replace(/\s/g, "-"))}`
            : `${encodeURIComponent(
                link.category?.replace(/\s/g, "-")
              )}/${link.subCategory?.replace(/\s/g, "-")}`
        }
      >
        {link?.type === "category"
          ? link?.category
          : `${link.category} > ${link.subCategory}`}
      </Anchor>
    </>
  );
};

export default SearchCategory;
