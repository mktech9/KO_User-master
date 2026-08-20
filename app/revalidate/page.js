"use client";

import { Button, Card, Center, Select } from "@mantine/core";
import { BustAnyCache } from "./cache_buster";
import { useState } from "react";
import { notifications } from "@mantine/notifications";

const Revalidate = () => {
  const [value, setValue] = useState("home");
  const [loading, setLoading] = useState(false);

  const handleRevalidate = async () => {
    if (
      !window.confirm(
        "Are you sure you want to revalidate the cache? This will likely cost you data reads."
      )
    ) {
      return;
    }

    try {
      setLoading(true);
      const resp = await BustAnyCache(value); // SERVER ACTION call
      if (!resp.success) throw new Error(resp.msg ?? "Something went wrong!");

      notifications.show({
        title: "Cache revalidated successfully.",
        color: "green",
        autoClose: 3000,
      });
    } catch (err) {
      console.error(err);
      notifications.show({
        title: err?.message ?? "Something went wrong!",
        color: "red",
        autoClose: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Center w="100%" h="50dvh">
      <Card miw={"450px"} withBorder p={"32px"}>
        <Select
          mt={4}
          size="lg"
          data={[{ label: "Blogs", value: "blogs" }]}
          value={value}
          placeholder="Please select a section to revalidate"
          onChange={setValue}
          radius="lg"
        />

        <Button
          mt={12}
          size="lg"
          loading={loading}
          disabled={loading}
          onClick={handleRevalidate}
          radius="xl"
        >
          Revalidate
        </Button>
      </Card>
    </Center>
  );
};

export default Revalidate;
