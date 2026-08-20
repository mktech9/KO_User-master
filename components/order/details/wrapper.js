import Crumbs from "@/components/common/breadcrumbs";
import {
  Container,
  Divider,
  Grid,
  GridCol,
  Group,
  Paper,
  Space,
  Stack,
  Text,
  ThemeIcon,
} from "@mantine/core";
import { PiXDuotone } from "react-icons/pi";
import OrderTimeline from "./progress";
import OrderItems from "./items";
import OrderDetails from "./order-details";
import OrderPayment from "./order-payment";
import OrderCustomer from "./order-customer";
import OrderSummary from "./order-summary";

const OrderWrapper = ({ data }) => {
  return (
    <>
      <Container size={"xl"}>
        <Grid align="stretch" gutter={{ base: 20, md: 40 }}>
          <GridCol span={12}>
            <Space h={30} />
            <Crumbs
              data={[
                { title: "Home", href: "/" },
                {
                  title: data?.oid,
                  href: `/status/${data?.oid}`,
                },
                {
                  title: "Details",
                  href: `/status/${data?.oid}/details`,
                  current: true,
                },
              ]}
            />
            <Space h={5} />
            <Stack>
              <Text fw={700} size="xl">
                Order ID: #{data?.oid}
              </Text>
            </Stack>
            <Divider mt={{ base: 15, md: 30 }} />
          </GridCol>
          {data?.status === "cancelled" || data.status === "failed" ? (
            <>
              <GridCol span={12}>
                <Paper bg={"gray.0"} p={20} h={"100%"}>
                  <Stack gap={30}>
                    <Text fw={600} size="md">
                      Order Progress
                    </Text>
                    <Group>
                      <ThemeIcon autoContrast radius={"xl"} color="red">
                        <PiXDuotone />
                      </ThemeIcon>
                      <Text fw={500} size="sm">
                        Order status not availaible, due to order cancellation
                        or faliure.
                      </Text>
                    </Group>
                  </Stack>
                </Paper>
              </GridCol>
            </>
          ) : (
            <OrderTimeline status={data?.status} type={data.deliveryType} />
          )}
          <OrderDetails data={data} />
          <OrderPayment data={data} />
          <OrderCustomer data={data} />
          <OrderItems items={data?.items} />
          <OrderSummary data={data} />
        </Grid>
      </Container>
      <Space h={25} />
    </>
  );
};

export default OrderWrapper;
