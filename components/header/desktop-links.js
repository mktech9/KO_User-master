import {
  Anchor,
  Box,
  Button,
  Container,
  Grid,
  GridCol,
  Group,
  HoverCard,
  HoverCardDropdown,
  HoverCardTarget,
  Space,
  Stack,
  Text,
} from "@mantine/core";
import { TbChevronDown } from "react-icons/tb";
import ProductDropdown from "./dropdowns/product-dropdown";
import Link from "next/link";
import styles from "./dropdowns/index.module.css";

const DesktopLinks = ({ data }) => {
  return (
    <>
      <Box
        w={"100%"}
        // bg={"violet.0"}
        style={{ borderBottom: "1px solid rgba(0,0,0,0.1)", zIndex: 49 }}
        h={50}
      >
        <Container size={"xl"}>
          <Group h={50} gap={25}>
            <ProductDropdown data={data && data ? data?.categories : []} />
            {global?.configs?.label !== "super" ? (
              <>
                <PopoverLink
                  text={"Catalouge 2024"}
                  data={{ link: "/catalouge", items: [] }}
                />
                <PopoverLink
                  text={"Contact Us"}
                  data={{ link: "/contact-us", items: [] }}
                />
                <PopoverLink
                  text={"About Us"}
                  data={{ link: "/static/about-us", items: [] }}
                />
              </>
            ) : (
              <>
                {data?.others?.map((doc, i) => {
                  return <PopoverLink text={doc?.title} data={doc} key={i} />;
                })}
              </>
            )}
          </Group>
        </Container>
      </Box>
    </>
  );
};

const PopoverLink = ({ text, color, data }) => {
  return (
    <>
      <HoverCard
        shadow="lg"
        offset={12}
        styles={{
          dropdown: {
            borderTop: "none",
          },
        }}
        radius={0}
        position="bottom"
      >
        <HoverCardTarget>
          <Button
            autoContrast
            className={`${styles.navLink} ${styles.navLinkGrowUp}`}
            component={Link}
            href={data?.link ?? "/"}
            size="compact-sm"
            variant="transparent"
            rightSection={data?.items?.length > 0 && <TbChevronDown />}
            p={0}
            color={"black"}
            style={{ fontSize: 15 }}
          >
            {text}
          </Button>
        </HoverCardTarget>
        <HoverCardDropdown p={0} w={200}>
          <Stack gap={0}>
            {data?.items?.map((doc, i) => {
              return (
                <Box
                  key={i}
                  px={20}
                  py={10}
                  className={styles.item}
                  component={Link}
                  href={doc?.value}
                  style={{ textDecoration: "none" }}
                >
                  <Text
                    fw={500}
                    style={{ fontSize: 14 }}
                    c={"black"}
                    className={styles.hover_link}
                  >
                    {doc?.title}
                  </Text>
                </Box>
              );
            })}
          </Stack>
        </HoverCardDropdown>
      </HoverCard>
    </>
  );
};

export default DesktopLinks;
