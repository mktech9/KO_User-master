"use client";

import { ActionIcon, NumberInput, Stack } from "@mantine/core";
import StepIndicator from "./step-indicator";
import { PiMinus, PiPlus } from "react-icons/pi";

const Step2 = ({ qty, totalQty }) => {
  return (
    <>
      <Stack gap={5}>
        <StepIndicator
          step="1"
          text="Select Quantity"
          rightSection={
            <>
              <NumberInput
                maw={150}
                value={qty.inputValue}
                onChange={(v) => {
                  if (v > totalQty) {
                    qty.setInput(totalQty);
                  } else {
                    qty.setInput(v);
                  }
                }}
                min={1}
                max={totalQty}
                styles={{
                  input: {
                    textAlign: "center",
                  },
                }}
                leftSection={
                  <ActionIcon
                    autoContrast
                    disabled={qty.inputValue < 1}
                    onClick={() =>
                      qty.setInput(qty.inputValue > 0 ? qty.inputValue - 1 : 0)
                    }
                  >
                    <PiMinus />
                  </ActionIcon>
                }
                rightSectionWidth={35}
                rightSection={
                  <ActionIcon
                    autoContrast
                    disabled={qty.inputValue >= totalQty}
                    onClick={() => qty.setInput(qty.inputValue + 1)}
                  >
                    <PiPlus />
                  </ActionIcon>
                }
              />
            </>
          }
        />
      </Stack>
    </>
  );
};

export default Step2;
