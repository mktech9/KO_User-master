"use client";

import useConfig from "@/store/use-config-store";
import { Group, Loader, Paper, Select, ThemeIcon } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useState } from "react";
import { PiMoney } from "react-icons/pi";
import { TbChevronDown } from "react-icons/tb";
import { SetCurrency } from "./libs";

const CurrencyToggler = ({ noBorder }) => {
  const [load, setLoad] = useState(false);
  const { currency, setConfig } = useConfig();

  const onChangeHandler = async (v) => {
    try {
      setLoad(true);

      //change currency cookie server action
      const resp = await SetCurrency(v);

      if (!resp) {
        throw new Error("Error changing currency!");
      }

      setConfig(v, "currency");
      setLoad(false);

      notifications.show({
        title: "Success!",
        color: "green",
        autoClose: 1500,
      });
    } catch (err) {
      console.log(err);
      notifications.show({
        title: err?.message ?? "Something went wrong!",
        autoClose: 1500,
        color: "red",
      });
      setLoad(false);
    }
  };

  return (
    <>
      <Paper
        withBorder={!noBorder}
        radius={"sm"}
        px={noBorder ? 0 : 5}
        py={noBorder ? 0 : 2.5}
      >
        <Group gap={5}>
          <ThemeIcon
            variant="light"
            color="gray"
            size={noBorder ? "sm" : "md"}
            radius={"xs"}
          >
            {currency === "" ? <Loader size="xs" /> : <PiMoney />}
          </ThemeIcon>
          <Select
            variant="unstyled"
            data={[
              { label: "USD", value: "usd" },
              { label: "AED", value: "aed" },
              { label: "SAR", value: "sar" },
            ]}
            rightSection={load ? <Loader size="xs" /> : <TbChevronDown />}
            size="xs"
            styles={{
              input: {
                fontWeight: 600,
              },
              dropdown: {
                minWidth: "fit-content",
              },
            }}
            placeholder="Loading..."
            maw={55}
            value={currency}
            onChange={onChangeHandler}
            disabled={load}
          />
        </Group>
      </Paper>
    </>
  );
};

export default CurrencyToggler;
