"use client";

import { ActionIcon, Group, TextInput } from "@mantine/core";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { PiFadersHorizontal, PiMagnifyingGlass, PiMagnifyingGlassDuotone } from "react-icons/pi";

const Search = () => {
  const [value, setValue] = useState("");
  const [load, setLoad] = useState(false);

  const router = useRouter();

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

  return (
    <Group>
      <TextInput
        value={value}
        onChange={(e) => setValue(e.target.value)}
        radius={"xl"}
        w={"100%"}
        rightSection={
          <ActionIcon autoContrast
            radius={"xl"}
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
          },
        }}
        placeholder="Search product, brand, colour, keyword or code"
      />
      <ActionIcon autoContrast
        radius={"xl"}
        variant="subtle"
        component={Link}
        href={"/search/advanced"}
      >
        <PiFadersHorizontal size={"1.5rem"} />
      </ActionIcon>
    </Group>
  );
};

export default Search;
