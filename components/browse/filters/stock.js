"use client";

import UpdateURLParams from "@/utils/useUpdateParams";
import {
  ActionIcon,
  Divider,
  Group,
  Loader,
  NumberInput,
  Stack,
  Text,
} from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import { useEffect, useMemo, useState } from "react";
import { PiMagnifyingGlass } from "react-icons/pi";

const Stock = ({ text, header }) => {
  const searchParams =
    typeof window !== "undefined" ? window.location.search : "";
  const [load, setLoad] = useState(false);

  const [value, setValue] = useState(null);
  const [stock, setStock] = useState(0);

  //debounce
  const [debounce] = useDebouncedValue(value, 500, { leading: true });

  const defaultVal = useMemo(() => {
    const params = new URLSearchParams(searchParams);

    //get parameters
    const pVal = params?.get("stock");
    const val = pVal ? +pVal : 0;

    return { val };
  }, [searchParams]);

  useEffect(() => {
    setStock(defaultVal.val);
    setValue(defaultVal.val);
  }, [defaultVal]);

  return (
    <>
      <UpdateURLParams
        params={{
          stock: debounce,
        }}
        setLoad={setLoad}
      />
      <Stack gap={0} className="advanced-search">
        {!header && (
          <Group justify="space-between" mb={10}>
            <Text fw={700} style={{ fontSize: 15 }}>
              {text}
            </Text>
            {load && <Loader type="dots" size={"sm"} />}
          </Group>
        )}
        <Group w={"100%"} wrap="nowrap">
          <Text fw={500} style={{ fontSize: 14 }}>
            0
          </Text>
          <Divider w={"100%"} size={"md"} />
          <Text fw={500} miw={55} style={{ fontSize: 14 }}>
            100000
          </Text>
        </Group>
        <Group mt={10} justify="right">
          <NumberInput
            w={75}
            size="xs"
            styles={{
              input: {
                fontSize: 14,
              },
            }}
            value={stock}
            onChange={setStock}
          />
          <ActionIcon autoContrast size={"md"} onClick={() => setValue(stock)}>
            <PiMagnifyingGlass />
          </ActionIcon>
        </Group>
      </Stack>
    </>
  );
};

export default Stock;
