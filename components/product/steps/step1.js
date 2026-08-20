"use client";

import {
  ActionIcon,
  Card,
  ColorSwatch,
  Group,
  NumberInput,
  Paper,
  Select,
  SimpleGrid,
  Stack,
  Text,
} from "@mantine/core";
import StepIndicator from "./step-indicator";
import {
  PiCheckCircleDuotone,
  PiMinusDuotone,
  PiPlusDuotone,
} from "react-icons/pi";
import { useMemo } from "react";

const Step1 = ({
  color,
  print,
  colors,
  printOptions,
  setPrintPrice,
  qty,
  totalQty,
}) => {
  const options = useMemo(() => {
    let items = [];
    Object.keys(printOptions)?.forEach((_id) => {
      let item = printOptions[_id];

      //iterate
      item.items?.forEach((d) => {
        if (d.active) {
          items.push({
            ...d,
            displayText: item.displayText,
            tag: item.tag,
            data: item.data,
          });
        }
      });
    });

    return items;
  }, [printOptions]);

  return (
    <>
      <Stack gap={5}>
        <StepIndicator step="2" text="Product color & Printing Method" />
        <Card p={10} withBorder mt={5}>
          <SimpleGrid cols={2}>
            <Select
              // label="Product Colors"
              variant="filled"
              placeholder="Color of the Product"
              data={colors?.map((doc) => {
                return { label: doc.name, value: doc.tag };
              })}
              renderOption={ColorSelect}
              rightSection={
                <ColorSwatch
                  size={"1rem"}
                  color={color.inputValue?.value ?? "#fff"}
                />
              }
              radius={"md"}
              value={color.inputValue?.value ?? ""}
              onChange={(v, option) => {
                color.setInput(option);
              }}
            />
            <Select
              // label="Printing Type & Side"
              variant="filled"
              placeholder="Select printing method"
              data={[
                { label: "No Printing Required", value: "" },
                ...options.map((doc) => {
                  return {
                    label: `${doc.displayText} | ${doc.title}`,
                    value: `${doc.displayText} | ${doc.title}`,
                    data: doc,
                  };
                }),
              ]}
              radius={"md"}
              value={print.inputValue}
              onChange={(v, option) => {
                print.setInput(v);
                setPrintPrice(option?.data);
              }}
            />
          </SimpleGrid>
        </Card>
      </Stack>
    </>
  );
};

const ColorSelect = ({ option, checked }) => {
  return (
    <>
      <Group flex="1" gap="xs">
        <ColorSwatch size={"1.5rem"} color={option?.value ?? "#fff"} />
        {option?.label}
        {checked && (
          <PiCheckCircleDuotone style={{ marginInlineStart: "auto" }} />
        )}
      </Group>
    </>
  );
};

export default Step1;
