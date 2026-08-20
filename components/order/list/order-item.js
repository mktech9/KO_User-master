import {
  Avatar,
  AvatarGroup,
  Badge,
  Button,
  Grid,
  GridCol,
  Group,
  Paper,
  Stack,
  Text,
} from "@mantine/core";
import moment from "moment";
import {
  PiCheckCircleDuotone,
  PiCheckFatDuotone,
  PiClockAfternoonDuotone,
  PiPackageDuotone,
  PiTruckDuotone,
  PiWarningDuotone,
  PiXDuotone,
} from "react-icons/pi";
import Link from "next/link";
import CurrencyReadOnly from "@/components/currency/currency-read-only";

const OrderItem = ({ doc }) => {
  return (
    <>
      <Paper
        style={{ cursor: "pointer", textDecoration: "none", color: "black" }}
        component={Link}
        href={`/status/${doc.oid}/details`}
      >
        <Grid>
          <GridCol span={12}>
            <Stack>
              <Stack gap={0}>
                <Group justify="space-between">
                  <Text fw={600} style={{ fontSize: 16 }}>
                    #{doc.oid}
                  </Text>
                  <Text fw={600} style={{ fontSize: 14 }}>
                    <CurrencyReadOnly value={doc?.total} currency="aed" />
                  </Text>
                </Group>
                <Text fw={500} style={{ fontSize: 14 }} opacity={0.9}>
                  For Date: {moment(doc.forDate).format("DD MMMM yyyy")}
                </Text>
                <Text fw={500} style={{ fontSize: 14 }} opacity={0.9}>
                  Ordered On: {moment(doc.date).format("DD MMMM yyyy")}
                </Text>
                <Group justify="space-between" mt={10}>
                  <Group align="center" gap={5}>
                    <AvatarGroup color="red">
                      {doc?.items?.map((d) => {
                        return (
                          <Avatar
                            size={"2rem"}
                            variant="gradient"
                            src={d?.productData?.image}
                          />
                        );
                      })}
                    </AvatarGroup>
                    <Text fw={500} size="sm" opacity={0.7}>
                      {doc?.items?.length > 1
                        ? `${doc?.items?.length} Items`
                        : "1 Item"}
                    </Text>
                  </Group>
                  <OrderStatus status={doc.status} />
                </Group>
              </Stack>
            </Stack>
          </GridCol>
        </Grid>
      </Paper>
    </>
  );
};

export const OrderStatus = ({ status }) => {
  let Icon =
    status === "failed"
      ? PiWarningDuotone
      : status === "cancelled"
      ? PiXDuotone
      : status === "pending"
      ? PiClockAfternoonDuotone
      : status === "confirmed"
      ? PiCheckFatDuotone
      : status === "processed"
      ? PiPackageDuotone
      : status === "delivered"
      ? PiCheckCircleDuotone
      : status === "ready"
      ? PiTruckDuotone
      : PiCheckCircleDuotone;

  return (
    <Button
      autoContrast
      leftSection={<Icon size={"1.2rem"} />}
      size="compact-sm"
      p={0}
      variant="transparent"
    >
      {status}
    </Button>
  );
};

export default OrderItem;
