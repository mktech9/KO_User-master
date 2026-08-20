"use client";

import UpdateURLParams from "@/utils/useUpdateParams";
import {
  ActionIcon,
  Box,
  Center,
  Divider,
  Grid,
  GridCol,
  Pagination,
  Paper,
  Text,
} from "@mantine/core";
import { useDebouncedValue, useMediaQuery } from "@mantine/hooks";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { PiArrowLeftDuotone, PiArrowRightDuotone } from "react-icons/pi";

const Paginate = ({ count }) => {
  const matches = useMediaQuery("(max-width: 64em)");
  const searchParams = useSearchParams();
  const [load, setLoad] = useState(false);

  const [value, setValue] = useState(1);

  //debounce
  const [debounce] = useDebouncedValue(value, 500, { leading: true });

  const defaultVal = useMemo(() => {
    const params = new URLSearchParams(searchParams);

    //get parameters
    const pVal = params?.get("page");
    const val = pVal ? +pVal : 1;

    return { val };
  }, [searchParams]);

  useEffect(() => {
    console.log(count);
    setValue(defaultVal.val);
  }, [defaultVal, count]);

  const currentData = useMemo(() => {
    let start = value > 1 ? (value - 1) * 20 : 0;
    start += 1;
    let end = value * 20;
    end = end >= count ? count : end;
    return {
      start,
      end,
    };
  }, [count, value]);

  return (
    <>
      <UpdateURLParams
        params={{
          page: debounce,
        }}
        setLoad={setLoad}
      />
      <GridCol span={{ base: 12, md: 3 }} visibleFrom="md">
        <Center h={"100%"}>
          <Text w={"100%"} ta={"right"} fw={600} opacity={0.7} size="14px">
            {currentData?.start} - {currentData?.end} of{" "}
            {count?.toLocaleString("en-In")} items
          </Text>
        </Center>
      </GridCol>
      <GridCol
        span={{ base: 12, md: 6 }}
        p={matches ? 0 : 0}
        mt={matches ? 20 : 0}
      >
        <Center h={"100%"} visibleFrom="md">
          <Pagination
            disabled={load}
            siblings={2}
            value={value}
            onChange={setValue}
            boundaries={2}
            size={"sm"}
            total={Math.ceil(count / 20)}
          />
        </Center>
      </GridCol>
      <GridCol span={12} hiddenFrom="md" p={0}>
        <Paper withBorder>
          <Box p={15}>
            <Text w={"100%"} ta={"left"} fw={600} opacity={0.7} size="14px">
              {currentData?.start} - {currentData?.end} of{" "}
              {count?.toLocaleString("en-In")} items
            </Text>
          </Box>
          <Divider />
          <Box px={10} py={10}>
            <Grid>
              <GridCol span={1.5}>
                <ActionIcon
                  autoContrast
                  size={"1.625rem"}
                  color="gray"
                  variant="transparent"
                  onClick={() => {
                    if (value > 1) {
                      setValue(value - 1);
                    }
                  }}
                >
                  <PiArrowLeftDuotone />
                </ActionIcon>
              </GridCol>
              <GridCol span={9}>
                <Box>
                  <Pagination
                    disabled={load}
                    siblings={2}
                    value={value}
                    onChange={setValue}
                    boundaries={2}
                    size={"sm"}
                    total={Math.ceil(count / 20)}
                    withControls={false}
                  />
                </Box>
              </GridCol>
              <GridCol px={10} span={1.5}>
                <ActionIcon
                  autoContrast
                  size={"1.625rem"}
                  color="gray"
                  variant="transparent"
                  onClick={() => {
                    if (value < Math.ceil(count / 20)) {
                      setValue(value + 1);
                    }
                  }}
                >
                  <PiArrowRightDuotone />
                </ActionIcon>
              </GridCol>
            </Grid>
          </Box>
        </Paper>
      </GridCol>
    </>
  );
};

export default Paginate;
