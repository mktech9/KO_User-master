"use client";

import {
  Box,
  Button,
  Grid,
  GridCol,
  Popover,
  PopoverDropdown,
  PopoverTarget,
  Paper,
  Space,
  Stack,
  Text,
  AspectRatio,
} from "@mantine/core";
import { TbChevronDown } from "react-icons/tb";
import ProductDropdownUnstyled from "./pd-unstyled";
import { useState, useRef, useEffect } from "react";
import ProductDropdownSub from "./pd-sub";
import { Image } from "@mantine/core";
import styles from "./index.module.css";
import { useDisclosure } from "@mantine/hooks";
import { useRouter } from "next/navigation";
import Link from "next/link";

const ProductDropdown = ({ data }) => {
  const [opened, { open, close }] = useDisclosure();
  const [hover, setHover] = useState(false);
  const [active, setActive] = useState(0);
  const timeoutRef = useRef(null);

  const router = useRouter();

  const handleMouseEnter = () => {
    clearTimeout(timeoutRef.current);
    setHover(true);
    open();
  };

  const handleMouseLeave = () => {
    setHover(false);
    timeoutRef.current = setTimeout(() => {
      if (!hover) {
        close();
      }
    }, 200); // Adjust delay as needed
  };

  const handlePopoverMouseEnter = () => {
    clearTimeout(timeoutRef.current);
    setHover(true);
  };

  const handlePopoverMouseLeave = () => {
    setHover(false);
    timeoutRef.current = setTimeout(() => {
      if (!hover) {
        close();
      }
    }, 200); // Adjust delay as needed
  };

  // Close popover if neither the button nor the popover is hovered
  useEffect(() => {
    if (!hover) {
      timeoutRef.current = setTimeout(() => {
        close();
      }, 200); // Adjust delay as needed
    }
    return () => clearTimeout(timeoutRef.current);
  }, [hover, close]);

  return (
    <Popover
      offset={12}
      shadow={0}
      position="bottom-start"
      withinPortal
      onClose={close}
      opened={opened}
    >
      <PopoverTarget>
        <Button
          autoContrast
          size="compact-sm"
          variant="transparent"
          rightSection={<TbChevronDown />}
          p={0}
          color="black"
          className={styles.navLink}
          style={{ fontSize: 15 }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          component={Link}
          href="/products"
        >
          All Categories
        </Button>
      </PopoverTarget>
      <PopoverDropdown
        w={"100%"}
        maw="80.5rem"
        bg={"transparent"}
        style={{ border: "none" }}
        p={0}
        onMouseEnter={handlePopoverMouseEnter}
        onMouseLeave={handlePopoverMouseLeave}
      >
        <Paper
          bg={"#fff"}
          w={"100%"}
          radius={0}
          shadow="md"
          withBorder
          style={{ borderTop: "none" }}
        >
          <Grid gutter={0}>
            <GridCol span={2.5}>
              <Stack gap={0}>
                <Text
                  px={20}
                  pt={20}
                  pb={10}
                  size="sm"
                  fw={700}
                  style={{ fontSize: 14 }}
                >
                  Product Categories
                </Text>
                {data?.map((doc, i) => {
                  if (doc._id) {
                    return (
                      <ProductDropdownUnstyled
                        key={doc._id}
                        doc={doc}
                        active={i === active}
                        setActive={() => setActive(i)}
                        close={close}
                      />
                    );
                  }
                })}
              </Stack>
            </GridCol>
            <GridCol span={9.5} bg={"#f4f4f4"}>
              <Grid>
                <GridCol span={8.6}>
                  <Grid px={30} py={20} gutter={45}>
                    {data &&
                      data[active] &&
                      data[active]?.subcategories?.map((doc, i) => {
                        return (
                          <GridCol span={3} key={doc._id}>
                            <ProductDropdownSub
                              category={data[active] ? data[active]?.name : ""}
                              data={doc}
                              close={close}
                            />
                          </GridCol>
                        );
                      })}
                  </Grid>
                </GridCol>
                <GridCol span={3.4}>
                  <Stack>
                    <AspectRatio
                      ratio={1 / 1}
                      maw={300}
                      mx="auto"
                      style={{ position: "relative" }}
                    >
                      <Image
                        src={data && data[active] ? data[active]?.image : "/"}
                        style={{ objectFit: "contain" }}
                        fit="contain"
                        alt={data && data[active] ? data[active]?.name : ""}
                        title={data && data[active] ? data[active]?.name : ""}
                      />
                    </AspectRatio>
                    {data && data[active] && (
                      <Stack gap={5} px={20}>
                        <Text fw={500} size="sm">
                          {data && data[active] && data[active]?.title}
                        </Text>
                        <Text fw={500} size="xs" opacity={0.7}>
                          {data && data[active] && data[active]?.subText}
                        </Text>
                        <Space h={10} />
                        {data && data[active] && data[active]?.name && (
                          <Button
                            autoContrast
                            w={"fit-content"}
                            onClick={() => {
                              close();
                              router.push(
                                `/${encodeURIComponent(
                                  data[active]?.name?.replace(/\s/g, "-")
                                )}`
                              );
                            }}
                          >
                            Shop Now
                          </Button>
                        )}
                        <Space h={20} />
                      </Stack>
                    )}
                  </Stack>
                </GridCol>
              </Grid>
            </GridCol>
          </Grid>
        </Paper>
      </PopoverDropdown>
    </Popover>
  );
};

export default ProductDropdown;
