"use client";

import useConfig from "@/store/use-config-store";
import { Group, Loader, Paper, Select, ThemeIcon } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useState } from "react";
import { TbChevronDown } from "react-icons/tb";
import { SetLanguage } from "./libs";
import { PiTextAaDuotone } from "react-icons/pi";

const LanguageToggler = ({ noBorder }) => {
  const [load, setLoad] = useState(false);
  const { language: currency, setConfig } = useConfig();

  const onChangeHandler = async (v) => {
    try {
      setLoad(true);

      //change currency cookie server action
      const resp = await SetLanguage(v);
      localStorage.setItem("googtrans", v);

      if (!resp) {
        throw new Error("Error changing currency!");
      }

      document.cookie = `googtrans=${v}; path=/`; // Subdomain-specific
      document.cookie = `googtrans=${v}; domain=.kross-over.net; path=/`; // Root domain

      setConfig(v, "language");
      setLoad(false);

      notifications.show({
        title: "Success!",
        color: "green",
        autoClose: 1500,
      });

      window.location.reload();
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
            <PiTextAaDuotone />
          </ThemeIcon>
          <Select
            variant="unstyled"
            data={[
              { label: "English", value: "/auto/en" },
              { label: "Russian", value: "/auto/ru" },
              { label: "Arabic", value: "/auto/ar" },
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
            maw={70}
            value={currency}
            onChange={onChangeHandler}
            disabled={load}
          />
        </Group>
      </Paper>
    </>
  );
};

export default LanguageToggler;
