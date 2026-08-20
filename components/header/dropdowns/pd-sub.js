import { Space, Stack, Text } from "@mantine/core";
import { usePathname, useRouter } from "next/navigation";
import * as NProgress from "nprogress";
import styles from "./index.module.css";

const ProductDropdownSub = ({ category, data, close }) => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <>
      <Stack gap={0}>
        <Text
          style={{ fontSize: 14, cursor: "pointer" }}
          fw={700}
          className={styles.hover_link2}
          onClick={() => {
            if (pathname !== "/products") {
              NProgress.start();
            }
            close();
            router.push(
              `/${encodeURIComponent(
                category?.replace(/\s/g, "-")
              )}/${encodeURIComponent(data?.name?.replace(/\s/g, "-"))}`
            );
          }}
        >
          {data?.name}
        </Text>
        <Space h={7.5} />
        {data?.subtypes?.map((doc, i) => {
          return (
            <Text
              style={{ fontSize: 14, cursor: "pointer" }}
              fw={500}
              className={styles.hover_link}
              key={i}
              opacity={0.9}
              onClick={() => {
                if (pathname !== "/products") {
                  NProgress.start();
                }
                close();
                router.push(
                  `/${encodeURIComponent(
                    category?.replace(/\s/g, "-")
                  )}/${encodeURIComponent(
                    data?.name?.replace(/\s/g, "-")
                  )}/${encodeURIComponent(doc?.name?.replace(/\s/g, "-"))}`
                );
              }}
            >
              {doc?.name}
            </Text>
          );
        })}
      </Stack>
    </>
  );
};

export default ProductDropdownSub;
