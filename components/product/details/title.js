"use client";

import { WishlistButtonDetailsPage } from "@/components/common/wishlist-button";
import CurrencyReadOnly from "@/components/currency/currency-read-only";
import { csActive, rsActive } from "@/config";

import {
  Divider,
  Group,
  Paper,
  Stack,
  Text,
  ThemeIcon,
  Title,
} from "@mantine/core";

import { PiStarFill } from "react-icons/pi";

const TitleSection = ({
  data,
  reseller,
  reviews,
  configs,
}) => {
  /*
   * ---------------------------------------------------------
   * PRODUCT PRICE
   * ---------------------------------------------------------
   */

  const basePrice = reseller
    ? Number(data?.b2bPrice ?? 0)
    : Number(data?.price ?? 0);

  /*
   * ---------------------------------------------------------
   * CONFIG
   * ---------------------------------------------------------
   *
   * IMPORTANT:
   *
   * Do NOT use:
   *
   * global?.configs
   *
   * Use the configs prop coming from the parent.
   */

  const isVendor = configs?.label !== "super";

  const incrementPercentage =
    Number(configs?.increment ?? 0);

  /*
   * Calculate increment.
   */
  const priceIncrement =
    isVendor && basePrice > 0
      ? (incrementPercentage / 100) * basePrice
      : 0;

  /*
   * Final product price.
   */
  const prodPrice =
    basePrice + priceIncrement;

  /*
   * ---------------------------------------------------------
   * STOCK
   * ---------------------------------------------------------
   */

  const showQty = reseller
    ? data?.qtyActive?.[rsActive]
    : data?.qtyActive?.[csActive];

  /*
   * ---------------------------------------------------------
   * ORIGINAL / SLASHED PRICE
   * ---------------------------------------------------------
   */

  const slashValue = reseller
    ? Number(data?.originalPriceB2b ?? 0)
    : Number(data?.originalPrice ?? 0);

  const isSlashedPrice =
    slashValue > 0;

  /*
   * ---------------------------------------------------------
   * DEBUG
   * ---------------------------------------------------------
   *
   * Keep this temporarily while testing.
   */
  console.log("💰 TITLE SECTION:", {
    code: data?.code,
    price: data?.price,
    b2bPrice: data?.b2bPrice,
    reseller,
    basePrice,
    increment: incrementPercentage,
    finalPrice: prodPrice,
    configs,
    isVendor,
  });

  return (
    <Stack gap={0}>

      {/* ==========================================
          BRAND + CODE
          ========================================== */}

      <Group
        justify="space-between"
        wrap="nowrap"
      >
        <Title
          order={3}
          visibleFrom="md"
          style={{ fontSize: 27 }}
          fw={850}
          opacity={0.9}
        >
          {`${data?.brand ?? ""} | ${data?.code ?? ""}`}
        </Title>

        <Title
          order={3}
          hiddenFrom="md"
          style={{ fontSize: 24 }}
          fw={850}
          opacity={0.9}
        >
          {`${data?.brand ?? ""} | ${data?.code ?? ""}`}
        </Title>

        {!isVendor && (
          <WishlistButtonDetailsPage
            id={data?._id}
          />
        )}
      </Group>

      {/* ==========================================
          PRODUCT NAME
          ========================================== */}

      <Group>
        <Title
          order={3}
          visibleFrom="md"
          style={{ fontSize: 24 }}
          fw={700}
          opacity={0.7}
        >
          {data?.name ?? ""}
        </Title>

        <Title
          order={3}
          hiddenFrom="md"
          style={{ fontSize: 21 }}
          fw={700}
          opacity={0.7}
        >
          {data?.name ?? ""}
        </Title>
      </Group>

      {/* ==========================================
          PRICE
          ========================================== */}

      {!isVendor && (
        <Group gap={4}>
          <Text
            style={{ fontSize: 18 }}
            fw={850}
          >
            {isSlashedPrice && (
              <Text
                span
                style={{ fontSize: 18 }}
                fw={850}
                c="#e74033"
                td="line-through"
                pr={4}
              >
                <CurrencyReadOnly
                  currency="aed"
                  value={slashValue}
                />
              </Text>
            )}

            <CurrencyReadOnly
              currency="aed"
              value={prodPrice}
            />
          </Text>
        </Group>
      )}

      {/* ==========================================
          STOCK
          ========================================== */}

      {data?.qty > 0 ? (
        <>
          {showQty && (
            <Group gap={8}>
              <Text
                size="sm"
                fw={500}
                opacity={0.7}
              >
                In Stock | Available for Order{" "}

                <Text
                  fw={600}
                  span
                >
                  ({data?.qty})
                </Text>{" "}

                {(isVendor || reseller) &&
                  data?.reserved > 0 &&
                  data?.qty > 0 && (
                    <>
                      | Reserved{" "}

                      <Text
                        fw={600}
                        span
                      >
                        ({data?.reserved})
                      </Text>
                    </>
                  )}
              </Text>

              {showQty &&
                data?.stockText &&
                data.stockText !== "" && (
                  <Text
                    size="md"
                    fw={700}
                  >
                    | {data.stockText}
                  </Text>
                )}
            </Group>
          )}
        </>
      ) : (
        <Group gap={8}>
          <Text
            size="sm"
            c="red"
            fw={600}
            opacity={0.9}
          >
            Out of Stock
          </Text>

          {showQty &&
            data?.stockText &&
            data.stockText !== "" && (
              <Text
                size="md"
                fw={700}
              >
                | {data.stockText}
              </Text>
            )}
        </Group>
      )}

      {/* ==========================================
          REVIEWS
          ========================================== */}

      <Paper
        mt={20}
        withBorder
        px="xs"
        py={4}
        w="fit-content"
      >
        <Group gap={4}>
          <Text
            fw={500}
            size="sm"
          >
            {reviews?.totalRating > 0
              ? reviews.totalRating
              : 0}
          </Text>

          <ThemeIcon
            size="xs"
            variant="transparent"
            color="cyan"
          >
            <PiStarFill />
          </ThemeIcon>

          <Divider
            mx={4}
            orientation="vertical"
          />

          <Text
            fw={500}
            size="sm"
            opacity={0.7}
          >
            {reviews?.length > 1
              ? `${reviews.length} Reviews`
              : reviews?.length === 1
              ? "1 Review"
              : "No reviews yet"}
          </Text>
        </Group>
      </Paper>

    </Stack>
  );
};

export default TitleSection;