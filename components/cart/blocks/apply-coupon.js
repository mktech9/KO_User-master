"use client";

import {
  ActionIcon,
  Button,
  Collapse,
  Group,
  Paper,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  PiArrowDownDuotone,
  PiArrowUpDuotone,
  PiCheckDuotone,
  PiCheck,
  PiXDuotone,
  PiX,
} from "react-icons/pi";
import { notifications } from "@mantine/notifications";
import { useState } from "react";
import { CheckCoupon } from "@/libs/apply-coupon";

const ApplyCoupon = ({ coupon, setCoupon, items, isAuth, reseller }) => {
  const [opened, { toggle }] = useDisclosure(false);

  const [code, setCode] = useState("");
  const [load, setLoad] = useState(false);
  const [error, setError] = useState(null);

  const applyCouponHandler = async () => {
    try {
      setLoad(true);

      console.log(items);
      const couponz = await CheckCoupon(code, items, isAuth, reseller);
      if (couponz.valid) {
        setCoupon(couponz);
        console.log(couponz);
      } else {
        throw new Error(couponz.err);
      }

      setLoad(false);
    } catch (err) {
      console.log(err);
      notifications.show({
        title: err?.message ?? "Something went wrong",
        autoClose: 1500,
      });
      setError(err?.message ?? "Invalid Coupon!");
      setLoad(false);
    }
  };

  return (
    <>
      <Paper radius={"md"} p={20} bg={"#f4f4f4"}>
        <Stack gap={10}>
          {coupon && (
            <Stack>
              <Stack gap={10}>
                <Paper
                  bg={"green.0"}
                  p={10}
                  withBorder
                  style={{ borderStyle: "dashed" }}
                >
                  <Stack gap={5}>
                    <Text size="sm" fw={700} c={"green.7"}>
                      "{coupon?.code}" Applied
                    </Text>
                    <Text size="xs" fw={500} opacity={0.7}>
                      {coupon?.couponDetails}
                    </Text>
                  </Stack>
                </Paper>
              </Stack>
              <Button
                autoContrast
                variant="transparent"
                size="compact-xs"
                w={"fit-content"}
                px={0}
                leftSection={<PiX />}
                onClick={() => setCoupon(null)}
              >
                Remove Coupon
              </Button>
            </Stack>
          )}
          {!coupon && (
            <>
              <Group
                justify="space-between"
                onClick={toggle}
                style={{ cursor: "pointer" }}
              >
                <Text size="md" fw={700}>
                  Enter a Promotional Code
                </Text>
                <ActionIcon autoContrast variant="transparent">
                  {opened ? <PiArrowUpDuotone /> : <PiArrowDownDuotone />}
                </ActionIcon>
              </Group>
              <Collapse in={opened}>
                <TextInput
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="Enter a promotional code"
                  rightSection={
                    <ActionIcon
                      autoContrast
                      disabled={code === "" || load}
                      loading={load}
                      onClick={applyCouponHandler}
                    >
                      <PiCheck />
                    </ActionIcon>
                  }
                />
              </Collapse>
            </>
          )}
        </Stack>
      </Paper>
    </>
  );
};

export default ApplyCoupon;
