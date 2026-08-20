"use client";

import { Divider, Group, NumberInput, Stack, Text } from "@mantine/core";

const Price = ({ text, header, min, max, setMin, setMax }) => {
  return (
    <>
      <Stack gap={0} className="advanced-search">
        {!header && (
          <Group justify="space-between" mb={10}>
            <Text fw={700} style={{ fontSize: 15 }}>
              {text}
            </Text>
          </Group>
        )}
        <Group w={"100%"} wrap="nowrap">
          <Text fw={500} style={{ fontSize: 14 }}>
            {min}
          </Text>{" "}
          <Divider w={"100%"} size={"md"} />{" "}
          <Text fw={500} style={{ fontSize: 14 }}>
            {max}
          </Text>
        </Group>
        <Group mt={10} justify="space-between">
          <NumberInput
            w={125}
            size="md"
            styles={{
              input: {
                fontSize: 14,
              },
            }}
            min={0}
            value={min}
            onChange={setMin}
          />{" "}
          <NumberInput
            w={125}
            size="md"
            styles={{
              input: {
                fontSize: 14,
              },
            }}
            min={min}
            value={max}
            onChange={setMax}
          />
        </Group>
      </Stack>
    </>
  );
};

export default Price;
