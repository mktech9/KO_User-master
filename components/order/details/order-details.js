import { GridCol, Group, Paper, Stack, Text } from "@mantine/core";
import moment from "moment";

const OrderDetails = ({ data }) => {
  let doc = data?.address;

  return (
    <GridCol span={{ base: 12, md: 4 }}>
      <Paper bg={'gray.0'} p={20}>
        <Stack gap={15}>
          <Text fw={600} size="md">
            Order Details
          </Text>
          <Stack gap={5}>
            <Group justify="space-between">
              <Text fw={400} size="sm" opacity={0.7}>
                Order Date
              </Text>
              <Text fw={600} size="sm">
                {moment(data?.date)?.format("DD MMM yyyy")}
              </Text>
            </Group>
            <Group justify="space-between">
              <Text fw={400} size="sm" opacity={0.7}>
                Delivery Type
              </Text>
              <Text fw={600} size="sm">
                {data?.deliveryType}
              </Text>
            </Group>
            <Group justify="space-between">
              <Text fw={400} size="sm" opacity={0.7}>
                Delivery / Pickup Date
              </Text>
              <Text fw={600} size="sm">
                {moment(data?.forDate)?.format("DD MMM yyyy")}
              </Text>
            </Group>
            <Group gap={5} align="flex-start" justify="space-between">
              <Text fw={400} size="sm" opacity={0.7}>
                Delivery / Pickup Address
              </Text>
              <Text fw={500} size="sm" ta={'right'}>
                {data?.deliveryType === "shipping" ? (
                  <>
                    {`${doc?.fName} ${doc.lName}`} <br />
                    {`${doc.address}`} <br />{" "}
                    {doc.landmark ? (
                      <>
                        {`${doc.landmark},`}
                        <br />
                      </>
                    ) : (
                      ""
                    )}
                    {`${doc?.area}, ${doc?.state}`}
                    <br /> {`${doc.mobileCode ?? "+91"} ${doc.mobile}`}
                  </>
                ) : (
                  <>{doc?.name}</>
                )}
              </Text>
            </Group>
          </Stack>
        </Stack>
      </Paper>
    </GridCol>
  );
};

export default OrderDetails;
