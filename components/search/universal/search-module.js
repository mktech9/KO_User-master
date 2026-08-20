"use client";

import { SearchFromDatabase } from "@/libs/search-module";
import {
  ActionIcon,
  Box,
  Group,
  Popover,
  PopoverDropdown,
  PopoverTarget,
  Space,
  Stack,
  Text,
  TextInput,
  Transition,
} from "@mantine/core";
import { useDebouncedValue, useMediaQuery } from "@mantine/hooks";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { PiFadersHorizontal, PiMagnifyingGlass } from "react-icons/pi";
import SearchItem from "./search-item";
import SearchCategory from "./search-category";

const SearchModule = () => {
  const matches = useMediaQuery("(max-width: 64em)");

  const [value, setValue] = useState("");
  const [load, setLoad] = useState(false);
  const [show, setShow] = useState(false);

  const [data, setData] = useState({ items: [], category: [] });

  const router = useRouter();

  //debounced value
  const [debounced] = useDebouncedValue(value, 500);

  useEffect(() => {
    if (debounced !== "") {
      setLoad(true);
      searchDBHandler().then(({ items, category }) => {
        if (items?.length > 0 || category?.length > 0) {
          setShow(true);
          setData({ items, category });
          return setLoad(false);
        } else {
          setShow(false);
          setData({ items: [], category: [] });
          return setLoad(false);
        }
      });
    } else {
      setShow(false);
      setData({ items: [], category: [] });
    }
  }, [debounced]);

  const searchHandler = async () => {
    try {
      setLoad(true);
      const url = `/products?search=${value}`;
      router.push(url);
      setLoad(false);
    } catch (err) {
      console.log(err);
      setLoad(false);
    }
  };

  const searchDBHandler = async () => {
    const { items, category } = await SearchFromDatabase(debounced);
    return { items, category };
  };

  return (
    <>
      <Transition
        mounted={show}
        transition="fade"
        duration={400}
        timingFunction="ease"
      >
        {(styles) => (
          <Box
            w={"100dvw"}
            h={"100dvh"}
            style={{
              ...styles,
              position: "fixed",
              left: 0,
              top: 0,
              background: "rgba(0, 0, 0, 0.5)",
              zIndex: 100,
            }}
          ></Box>
        )}
      </Transition>
      <Popover
        width={"target"}
        shadow="md"
        opened={show}
        onClose={() => setShow(false)}
        offset={matches ? -2.5 : 0}
        style={{ zIndex: 101 }}
      >
        <PopoverTarget>
          <Group
            w={"100%"}
            wrap="nowrap"
            onClick={() => {
              if (data?.items?.length > 0 || data?.category?.length > 0) {
                setShow(true);
              }
            }}
            gap={matches ? 7 : 20}
          >
            <TextInput
              color="black"
              variant={matches ? "unstyled" : "default"}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              radius={matches ? "sm" : "xl"}
              w={"100%"}
              rightSection={
                <ActionIcon
                  autoContrast
                  color="black"
                  radius={matches ? "sm" : "xl"}
                  onClick={searchHandler}
                  disabled={value === "" || load}
                  loading={load}
                >
                  <PiMagnifyingGlass />
                </ActionIcon>
              }
              size="md"
              rightSectionWidth={41}
              styles={{
                input: {
                  fontSize: 14,
                  paddingLeft: matches ? 5 : "",
                },
              }}
              placeholder="i'm looking for"
            />
            <ActionIcon
              autoContrast
              color={matches ? "black" : "black"}
              radius={matches ? "sm" : "xl"}
              size={matches ? "md" : "lg"}
              variant={matches ? "filled" : "white"}
              component={Link}
              href={"/search/advanced"}
            >
              <PiFadersHorizontal size={"1.5rem"} />
            </ActionIcon>
          </Group>
        </PopoverTarget>
        <PopoverDropdown p={0} w={"100%"}>
          {data?.items?.length > 0 && (
            <>
              <Stack gap={0} onClick={() => setShow(false)}>
                <Text px={20} py={15} fw={600}>
                  Products
                </Text>
                {data.items?.map((doc, i) => {
                  return <SearchItem product={doc} key={i} />;
                })}
              </Stack>
            </>
          )}
          {data?.category?.length > 0 && (
            <>
              <Stack gap={0} onClick={() => setShow(false)}>
                <Text px={20} py={15} fw={600}>
                  Category
                </Text>
                {data.category?.map((doc, i) => {
                  return <SearchCategory link={doc} key={i} />;
                })}
              </Stack>
            </>
          )}
          <Space h={15} />
        </PopoverDropdown>
      </Popover>
    </>
  );
};

export default SearchModule;
