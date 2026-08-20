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

const TitleSection = ({ data, reseller, reviews }) => {
  let priceIncrement = 0,
    prodPrice = reseller ? data?.b2bPrice : data.price;
  if (global?.configs?.label !== "super") {
    let percentage = global?.configs?.increment ?? 0;
    priceIncrement = (percentage / 100) * prodPrice;

    if (priceIncrement > 0) prodPrice += priceIncrement;
  }

  const isVendor = global?.configs?.label !== "super";
  const showQty = reseller
    ? data?.qtyActive && data?.qtyActive[rsActive]
    : data?.qtyActive && data?.qtyActive[csActive];

  let slashValue = reseller ? data?.originalPriceB2b : data?.originalPrice;
  const isSlashedPrice = slashValue > 0;

  return (
    <Stack gap={0}>
      <Group justify="space-between" wrap="nowrap">
        <Title
          order={3}
          visibleFrom="md"
          style={{ fontSize: 27 }}
          fw={850}
          opacity={0.9}
        >
          {`${data?.brand} | ${data?.code}`}
        </Title>
        <Title
          order={3}
          hiddenFrom="md"
          style={{ fontSize: 24 }}
          fw={850}
          opacity={0.9}
        >
          {`${data?.brand} | ${data?.code}`}
        </Title>
        {!isVendor && <WishlistButtonDetailsPage id={data?._id} />}
      </Group>
      <Group>
        <Title
          order={3}
          visibleFrom="md"
          style={{ fontSize: 24 }}
          fw={700}
          opacity={0.7}
        >
          {data?.name}
        </Title>
        <Title
          order={3}
          hiddenFrom="md"
          style={{ fontSize: 21 }}
          fw={700}
          opacity={0.7}
        >
          {data?.name}
        </Title>
      </Group>
      {!isVendor && (
        <Group gap={4}>
          <Text style={{ fontSize: 18 }} fw={850}>
            {isSlashedPrice && (
              <Text
                span
                style={{ fontSize: 18 }}
                fw={850}
                c="#e74033"
                td="line-through"
                pr={4}
              >
                <CurrencyReadOnly currency="aed" value={slashValue} />
              </Text>
            )}
            <CurrencyReadOnly currency="aed" value={prodPrice} />
          </Text>
        </Group>
      )}
      {data?.qty > 0 ? (
        <>
          {showQty && (
            <Group gap={8}>
              <Text size="sm" fw={500} opacity={0.7}>
                In Stock | Available for Order{" "}
                <Text fw={600} span>
                  ({data?.qty})
                </Text>{" "}
                {(isVendor || reseller) &&
                  data?.reserved > 0 &&
                  data?.qty > 0 && (
                    <>
                      | Reserved{" "}
                      <Text fw={600} span>
                        ({data?.reserved})
                      </Text>
                    </>
                  )}
              </Text>
              {showQty && data?.stockText && data?.stockText !== "" && (
                <Text size="md" fw={700}>
                  | {data.stockText}
                </Text>
              )}
            </Group>
          )}
        </>
      ) : (
        <Group gap={8}>
          <Text size="sm" color="red" fw={600} opacity={0.9}>
            Out of Stock
          </Text>
          {showQty && data?.stockText && data?.stockText !== "" && (
            <Text size="md" fw={700}>
              | {data.stockText}
            </Text>
          )}
        </Group>
      )}
      <Paper mt={20} withBorder px="xs" py={4} w="fit-content">
        <Group gap={4}>
          <Text fw={500} size="sm">
            {reviews?.totalRating > 0 ? reviews?.totalRating : 0}
          </Text>
          <ThemeIcon size="xs" variant="transparent" color="cyan">
            <PiStarFill />
          </ThemeIcon>
          <Divider mx={4} orientation="vertical" />
          <Text fw={500} size="sm" opacity={0.7}>
            {reviews?.length > 1
              ? `${reviews?.length} Reviews`
              : reviews?.length === 1
              ? "1 Review"
              : "No reviews yet"}
          </Text>
        </Group>
      </Paper>
      {/* {reseller && data?.reserved > 0 && data?.qty > 0 && (
        <Paper mt={20} pl={5}>
          <Group wrap="nowrap">
            <Indicator color="orange" />
            <Text size="sm" fw={500} c={"#525252"}>
              {data?.reserved} units of this item have been reserved.
            </Text>
          </Group>
        </Paper>
      )} */}
    </Stack>
  );
};

export default TitleSection;
