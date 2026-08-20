import {
  Badge,
  Box,
  ColorSwatch,
  Divider,
  Grid,
  GridCol,
  Group,
  Paper,
  SimpleGrid,
  Stack,
  Text,
  ThemeIcon,
} from "@mantine/core";
import Image from "next/image";
import CartItemActions, { InvalidStates } from "./cart-item-actions";
import { PiPercentDuotone } from "react-icons/pi";
import CurrencyReadOnly from "@/components/currency/currency-read-only";

const CartItem = ({ doc, isDiscounted, coupon }) => {
  let { product } = doc;

  return (
    <>
      <Paper radius={"lg"}>
        <Grid>
          <GridCol span={{ base: 3, md: 1.5 }}>
            <Paper
              w={"100%"}
              h={90}
              style={{
                position: "relative",
                borderRadius: 8,
                overflow: "hidden",
              }}
            >
              <Image
                src={product?.images[0]?.publicUrl}
                fill
                style={{ objectFit: "contain" }}
              />
            </Paper>
          </GridCol>
          <GridCol span={{ base: 9, md: 5.5 }}>
            <Stack gap={0}>
              <Group justify="space-between" align="baseline">
                <Stack gap={0}>
                  <Text fw={500} size="md" opacity={0.7}>
                    {product.brand} ({product.code})
                  </Text>
                  <Text fw={600} size="sm">
                    {product.name}
                  </Text>
                </Stack>
                <Text hiddenFrom="md" fw={700} size={"sm"}>
                  <CurrencyReadOnly
                    value={doc?.cartConfig?.total}
                    currency="aed"
                  />
                </Text>
              </Group>
              <Configs doc={doc} />
              <Box visibleFrom="md">
                <InvalidStates doc={doc} />
                {isDiscounted && (
                  <CouponApplied
                    coupon={coupon}
                    total={doc?.cartConfig?.total}
                  />
                )}
              </Box>
            </Stack>
          </GridCol>
          <CartItemActions
            summary={doc?.cartConfig}
            doc={doc}
            isDiscounted={isDiscounted}
            coupon={coupon}
          />
        </Grid>
      </Paper>
    </>
  );
};

export const Configs = ({ doc }) => {
  return (
    <>
      <Grid gutter={0} mt={10}>
        {doc.config?.isPrint && (
          <>
            <GridCol span={12}>
              <Text fw={500} size="xs" c={"#696969"}>
                Print:&nbsp;
                <Text span fw={600} opacity={1} c="#343434">
                  {doc?.config?.printName}
                </Text>
              </Text>
            </GridCol>
            <GridCol span={12}>
              <Text fw={500} size="xs" c={"#696969"}>
                Print Color:&nbsp;
                <Text span fw={600} opacity={1} c="#343434">
                  {doc?.config?.printColorCount}
                </Text>
              </Text>
            </GridCol>
          </>
        )}
        <GridCol span={12}>
          <Text fw={500} size="xs" c={"#696969"}>
            Color:&nbsp;
            <Text span fw={600} opacity={1} c="#343434">
              {doc?.config?.color?.label}
            </Text>
          </Text>
        </GridCol>
      </Grid>
    </>
  );
};

export const CouponApplied = ({ coupon, total }) => {
  return (
    <Paper mt={10}>
      <Group>
        <Stack gap={0}>
          <Text fw={700} color="green" size="xs" opacity={0.9}>
            Saved{" "}
            {coupon?.discountType === "amount" ? (
              <>
                <CurrencyReadOnly
                  value={coupon?.discount / coupon?.validOn?.length}
                  currency="aed"
                />
              </>
            ) : (
              <CurrencyReadOnly
                value={(+total * coupon?.amt) / 100}
                currency="aed"
              />
            )}
          </Text>
        </Stack>
      </Group>
    </Paper>
  );
};

export default CartItem;
