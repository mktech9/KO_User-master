import { Group, Stack, Text } from "@mantine/core";
import Image from "next/image";
import styles from "./index.module.css";
import Link from "next/link";

const SearchItem = ({ product }) => {
  return (
    <>
      <Group
        px={20}
        py={10}
        className={styles.item}
        style={{ cursor: "pointer" }}
        component={Link}
        href={`/products/${product?.name?.replace(/\s/g, "-")}/${product?.code}`}
      >
        <Image
          src={product.images[0]?.publicUrl}
          width={40}
          height={40}
          style={{ objectFit: "contain" }}
        />
        <Stack gap={0}>
          <Text
            size="sm"
            fw={500}
            opacity={0.7}
          >{`${product.brand} (${product.code})`}</Text>
          <Text size="xs" fw={500}>
            {product.name}
          </Text>
        </Stack>
      </Group>
    </>
  );
};

export default SearchItem;
