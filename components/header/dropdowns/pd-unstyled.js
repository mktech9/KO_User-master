import { Box, Text, UnstyledButton } from "@mantine/core";
import styles from "./index.module.css";
import { usePathname, useRouter } from "next/navigation";
import * as NProgress from "nprogress";

const ProductDropdownUnstyled = ({ doc, active, setActive, close }) => {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <>
      <UnstyledButton
        onClick={() => {
          if (pathname !== "/products") {
            NProgress.start();
          }
          close();
          router.push(`/${encodeURIComponent(doc?.name?.replace(/\s/g, "-"))}`);
        }}
        onMouseEnter={setActive}
        className={active ? styles.active : ""}
        px={20}
        py={10}
      >
        <Box>
          <Text size="sm" fw={500} style={{ fontSize: 14 }}>
            {doc?.name}
          </Text>
        </Box>
      </UnstyledButton>
    </>
  );
};

export default ProductDropdownUnstyled;
