import { Box, Divider, Grid, GridCol, Stack, Text } from "@mantine/core";
import CartItem from "../blocks/cart-item";

const CartItemsWrapper = ({ items, coupon, isAuth }) => {
  return (
    <>
      <Box visibleFrom="md">
        <ItemsColumnTitle />
      </Box>
      <Stack mt={20} gap={20}>
        {items?.map((doc) => {
          let isDiscounted = false;
          if (coupon) {
            isDiscounted = coupon?.validOn?.some(
              (dc) => dc._id === (isAuth ? doc._id : doc.id)
            );
          }

          return (
            <>
              <CartItem
                doc={doc}
                key={doc.id}
                isDiscounted={isDiscounted}
                coupon={coupon}
              />
              <Divider key={doc.id + "_dividerz"} />
            </>
          );
        })}
      </Stack>
    </>
  );
};

const ItemsColumnTitle = () => {
  return (
    <Grid mt={15}>
      <GridCol span={12}>
        <Divider />
      </GridCol>
      <GridCol span={1.5}>
        <Text size="sm" fw={600}>
          Image
        </Text>
      </GridCol>
      <GridCol span={5.5}>
        <Text size="sm" fw={600}>
          Product
        </Text>
      </GridCol>
      <GridCol span={5}>
        <Text size="sm" fw={600} ta={"right"}>
          Subtotal
        </Text>
      </GridCol>
      <GridCol span={12}>
        <Divider />
      </GridCol>
    </Grid>
  );
};

export default CartItemsWrapper;
