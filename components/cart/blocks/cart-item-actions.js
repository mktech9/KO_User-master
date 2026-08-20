import {
  ActionIcon,
  Alert,
  Box,
  Divider,
  Grid,
  GridCol,
  Group,
  Stack,
  Text,
} from "@mantine/core";
import CartQuantityInput from "./cart-quantity-input";
import { PiTrashDuotone } from "react-icons/pi";
import AppearanceOfLogo from "./view-branding";
import useCart from "@/hooks/use-cart";
import { useMediaQuery } from "@mantine/hooks";
import { CouponApplied } from "./cart-item";
import CurrencyReadOnly from "@/components/currency/currency-read-only";

const CartItemActions = ({ summary, doc, isDiscounted, coupon }) => {
  const matches = useMediaQuery("(max-width: 64em)");
  const { removeFromCart } = useCart();

  return (
    <>
      <GridCol hiddenFrom="md" span={3}>
        <Stack justify="center" align="center"></Stack>
      </GridCol>
      <GridCol span={{ base: 9, md: 5 }}>
        <Stack hiddenFrom="md" gap={0}>
          <Text fw={600} size="xs" opacity={0.7}>
            <CurrencyReadOnly value={summary?.itemPrice} currency="aed" /> per
            item x {doc?.config?.qty}
          </Text>
          {+summary?.minPrinting > 0 && (
            <Text fw={600} size="xs" opacity={0.7}>
              <CurrencyReadOnly
                value={
                  +summary?.rate * doc?.config?.qty + +summary?.minPrinting
                }
                currency="aed"
              />
              Printing charge
            </Text>
          )}
        </Stack>
        <Stack visibleFrom="md" align={matches ? "start" : "flex-end"} gap={0}>
          <Text fw={700} size={"md"}>
            <CurrencyReadOnly value={summary?.total} currency="aed" />
          </Text>
          <Text fw={600} size="sm" opacity={0.7}>
            <CurrencyReadOnly value={summary?.itemPrice} currency="aed" /> per
            item x {doc?.config?.qty}
          </Text>
          {+summary?.minPrinting > 0 && (
            <Text fw={600} size="sm" opacity={0.7}>
              <CurrencyReadOnly
                value={
                  +summary?.rate * doc?.config?.qty + +summary?.minPrinting
                }
                currency="aed"
              />{" "}
              Printing charge
            </Text>
          )}
          <Grid w={"100%"} gutter={20} mt={15} align="stretch">
            <GridCol span={6} visibleFrom="md">
              <Group h={"100%"} justify="right">
                <ActionIcon
                  autoContrast
                  variant="transparent"
                  onClick={() => removeFromCart(doc._id, doc.id)}
                >
                  <PiTrashDuotone size={"1.2rem"} />
                </ActionIcon>
                <AppearanceOfLogo config={doc?.config} />
              </Group>
            </GridCol>
            <GridCol span={6} visibleFrom="md">
              <CartQuantityInput
                id={doc._id}
                max={+doc?.product?.qty}
                qty={doc?.config?.qty}
                itemId={doc.id}
              />
            </GridCol>
          </Grid>
        </Stack>
      </GridCol>
      <GridCol hiddenFrom="md" span={3}>
        <Stack justify="center" align="center"></Stack>
      </GridCol>
      <GridCol hiddenFrom="md" span={9}>
        <Group justify="space-between">
          <CartQuantityInput
            id={doc._id}
            max={+doc?.product?.qty}
            qty={doc?.config?.qty}
            itemId={doc.id}
            width={150}
          />

          <AppearanceOfLogo config={doc?.config} />
          <ActionIcon
            autoContrast
            variant="transparent"
            onClick={() => removeFromCart(doc._id, doc.id)}
          >
            <PiTrashDuotone size={"1.2rem"} />
          </ActionIcon>
        </Group>
        <InvalidStates doc={doc} />
        {isDiscounted && (
          <CouponApplied coupon={coupon} total={doc?.cartConfig?.total} />
        )}
      </GridCol>
    </>
  );
};

export const InvalidStates = ({ doc }) => {
  return (
    <>
      <Box>
        {doc?.tampered ? (
          <Box mt={10} p={10} bg={"red.0"}>
            <Stack gap={0}>
              <Text size="sm" fw={600} c={"red"}>
                Invalid item!
              </Text>
              <Text size="xs" opacity={0.7} c={"red"}>
                Looks like product has been tampered, remove the item to
                proceed.
              </Text>
            </Stack>
          </Box>
        ) : doc?.invalid ? (
          <Box mt={10} p={10} bg={"red.0"}>
            <Stack gap={0}>
              <Text size="sm" fw={600} c={"red"}>
                Product no longer in service!
              </Text>
              <Text size="xs" opacity={0.7} c={"red"}>
                The printing type selected for this item is no longer in
                service, remove the item to proceed.!
              </Text>
            </Stack>
          </Box>
        ) : !doc?.inStock ? (
          <Box mt={10} p={10} bg={"red.0"}>
            <Stack gap={0}>
              <Text size="sm" fw={600} c={"red"}>
                Out of stock!
              </Text>
              <Text size="xs" opacity={0.7} c={"red"}>
                Adjust quantities to be under or equal to {doc?.maxStock},
                before proceeding!
              </Text>
            </Stack>
          </Box>
        ) : (
          ""
        )}
      </Box>
    </>
  );
};

export default CartItemActions;
