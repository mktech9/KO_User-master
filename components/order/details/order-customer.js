import { GridCol, Group, Paper, Stack, Text } from "@mantine/core";

const OrderCustomer = ({ data }) => {
  return (
    <GridCol span={{ base: 12, md: 4 }}>
      <Paper bg={"gray.0"} p={20} h={"100%"}>
        <Stack gap={15}>
          <Text fw={600} size="md">
            Customer Details
          </Text>
          <Stack gap={5}>
            <Group justify="space-between">
              <Text fw={400} size="sm" opacity={0.7}>
                Customer Name
              </Text>
              <Text fw={600} size="sm">
                {data?.customer?.fullName}
              </Text>
            </Group>
            <Group wrap="nowrap" justify="space-between">
              <Text fw={400} size="sm" opacity={0.7}>
                Customer Email ID
              </Text>
              <Text fw={600} size="sm">
                {data?.customer?.email}
              </Text>
            </Group>
            <Group justify="space-between">
              <Text fw={400} size="sm" opacity={0.7}>
                Customer Contact
              </Text>
              <Text fw={600} size="sm">
                {data?.customer?.mobileNo}
              </Text>
            </Group>
          </Stack>
        </Stack>
      </Paper>
    </GridCol>
  );
};

export default OrderCustomer;
