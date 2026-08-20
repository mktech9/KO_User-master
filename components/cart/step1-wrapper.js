import {
  Button,
  Grid,
  GridCol,
  Group,
  Stack,
  Text,
  ThemeIcon,
} from "@mantine/core";
import LeftSectionTitle from "./wrappers/left-section-title";
import Summary from "./blocks/summary";
import DatePickerForCart from "./blocks/date-picker";
import ApplyCoupon from "./blocks/apply-coupon";
import CartItemsWrapper from "./wrappers/cart-items-wrapper";
import useCart from "@/hooks/use-cart";
import { useMemo, useState } from "react";
import { CartValidationAtCheckout } from "@/libs/order/cart-validation";
import { notifications } from "@mantine/notifications";
import { PiShoppingCartSimple } from "react-icons/pi";
import Quotation from "@/utils/quotation/quotation";
import { generateUniqueString } from "@/libs/order/generate-oid";
import { useWindowScroll } from "@mantine/hooks";

const Step1Wrapper = ({
  proceed,
  summary: prevSummary,
  reseller,
  tax,
  isAuth,
  resellerData,
  shipping: shipConfigs,
  configs,
}) => {
  const [scroll, scrollTo] = useWindowScroll();
  const quotationNo = generateUniqueString();

  const { cart, load } = useCart();
  const [date, setDate] = useState(prevSummary?.date ?? null);

  //invalid state
  const [invalid, setInvalid] = useState({
    outOfStock: [],
    tampered: [],
    invalid: [],
  });

  const [coupon, setCoupon] = useState(null);

  //cart-items individual price
  const items = useMemo(() => {
    let candy = cart;
    candy?.forEach((doc, i) => {
      //############################
      //check if user is reseller, if reseller change to doc?.product?.b2bPrice

      let amt = reseller ? doc?.product?.b2bPrice : doc.product?.price;

      let priceIncrement = 0;
      if (configs?.label !== "super") {
        let percentage = configs?.increment ?? 0;
        priceIncrement = (percentage / 100) * amt;

        if (priceIncrement > 0) amt += priceIncrement;
      }

      if (doc.config?.isPrint) {
        let prtprc = doc.print;
        const rangeItem = prtprc.prices.find(
          (d) => +d.start <= doc?.config?.qty && +d.end >= doc?.config?.qty
        );

        if (rangeItem) {
          let rate = doc.config?.printSide
              ? Math.pow(
                  +rangeItem?.double * doc?.config?.qty + +rangeItem.minDouble,
                  doc?.config?.printColorCount
                )
              : Math.pow(
                  +rangeItem?.single * doc?.config?.qty + +rangeItem.minSingle,
                  doc?.config?.printColorCount
                ),
            rateOnly = doc.config?.printSide
              ? Math.pow(
                  +rangeItem?.double * doc?.config?.qty,
                  doc?.config?.printColorCount
                )
              : Math.pow(
                  +rangeItem?.single * doc?.config?.qty,
                  doc?.config?.printColorCount
                );

          candy[i].cartConfig = {
            printRate: rate,
            rate: rateOnly,
            printPerQty: doc.config?.printSide
              ? rangeItem.double
              : rangeItem.single,
            printSide: prtprc.double,
            printColorCount: prtprc.color,
            printType: prtprc.printing,
            itemPrice: amt,
            unitPrice:
              amt +
              Math.pow(
                doc.config?.printSide ? rangeItem.double : rangeItem.single,
                doc?.config?.printColorCount
              ),
            minPrinting: doc.config?.printSide
              ? +rangeItem.minDouble
              : +rangeItem.minSingle,
            total: amt * doc?.config?.qty + rate,
          };
        }
      } else {
        candy[i].cartConfig = {
          printRate: 0,
          rate: 0,
          printPerQty: 0,
          printSide: false,
          printColorCount: 0,
          printType: false,
          itemPrice: amt,
          unitPrice: amt,
          minPrinting: 0,
          total: amt * doc?.config?.qty,
        };
      }

      if (invalid?.outOfStock?.length > 0) {
        const item = invalid.outOfStock.find((d) => d?._id == doc._id);
        if (item) {
          candy[i].inStock = false;
          candy[i].maxStock = item?.qty;
        }
      } else {
        candy[i].inStock = true;
        candy[i].maxStock = 0;
      }

      if (invalid?.tampered?.some((d) => doc._id === d?._id)) {
        candy[i].tampered = true;
      } else {
        candy[i].tampered = false;
      }

      if (invalid?.invalid?.some((d) => doc._id === d?._id)) {
        candy[i].invalid = true;
      } else {
        candy[i].invalid = false;
      }
    });

    return candy;
  }, [cart, invalid.outOfStock, invalid.tampered, invalid.invalid, reseller]);

  //calculate cart summary
  const summary = useMemo(() => {
    let subtotal = 0,
      discount = coupon ? coupon?.discount : 0,
      vat = 0,
      total = 0,
      totalUnits = 0,
      shipping;

    subtotal = items?.reduce((a, b) => a + b?.cartConfig?.total, 0);
    vat = (subtotal * tax) / 100;
    shipping = reseller
      ? 0
      : subtotal < shipConfigs?.freeAbove
      ? shipConfigs?.charges
      : 0;
    total = subtotal + vat + shipping - discount;

    totalUnits = items?.reduce((a, b) => a + +b?.config?.qty, 0);

    return {
      subtotal,
      discount,
      vat,
      totalUnits,
      total,
      shipping,
    };
  }, [items, coupon]);

  return (
    <>
      <GridCol span={{ base: 12, md: 8 }}>
        <Stack gap={10}>
          {!load && (cart?.length < 1 || !cart) ? (
            <>
              <Stack align="center" h={300} justify="center">
                <ThemeIcon
                  autoContrast
                  size={"5rem"}
                  radius={"50%"}
                  variant="gradient"
                >
                  <PiShoppingCartSimple size={"2.5rem"} />
                </ThemeIcon>
                <Stack gap={0} align="center">
                  <Text fw={600} size="md">
                    Hey, it feels so light!
                  </Text>
                  <Text fw={500} size="sm" opacity={0.7}>
                    There is nothing in your bag. Let's add some items.
                  </Text>
                </Stack>
              </Stack>
            </>
          ) : (
            <>
              <Group justify="space-between">
                <LeftSectionTitle step={1} />
                {reseller && items?.length > 0 && (
                  <Quotation
                    no={quotationNo}
                    resellerData={resellerData}
                    items={items}
                    summary={summary}
                    configs={configs}
                  />
                )}
              </Group>
              <CartItemsWrapper items={items} coupon={coupon} isAuth={isAuth} />
            </>
          )}
        </Stack>
      </GridCol>
      <GridCol span={{ base: 12, md: 4 }}>
        <Stack gap={10}>
          <Grid>
            <GridCol span={12}>
              <Summary summary={summary} tax={tax} reseller={reseller} />
            </GridCol>
            <GridCol span={12}>
              <ApplyCoupon
                coupon={coupon}
                setCoupon={setCoupon}
                items={items}
                isAuth={isAuth}
                reseller={reseller}
              />
            </GridCol>

            <GridCol span={12}>
              {!reseller && (
                <DatePickerForCart
                  date={date}
                  setDate={setDate}
                  reseller={reseller}
                />
              )}
            </GridCol>
            <GridCol span={12}>
              <Button
                autoContrast
                size="md"
                fullWidth
                disabled={reseller ? false : !date}
                onClick={async () => {
                  console.log(items);
                  const cartRes = await CartValidationAtCheckout(
                    items,
                    reseller
                  );
                  console.log(cartRes);
                  if (!cartRes.success) {
                    setInvalid({
                      outOfStock: cartRes.outOfStock,
                      tampered: cartRes.tampered,
                      invalid: cartRes.invalid,
                    });
                    return notifications.show({
                      title: "Invalid Cart!",
                      autoClose: 3000,
                    });
                  } else {
                    setInvalid({ outOfStock: [], tampered: [], invalid: [] });
                  }
                  proceed(items, { amount: summary, date, coupon });
                  scrollTo({ y: 0 });
                }}
              >
                Proceed
              </Button>
            </GridCol>
          </Grid>
        </Stack>
      </GridCol>
    </>
  );
};

export default Step1Wrapper;
