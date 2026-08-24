import {
  Badge,
  Box,
  Group,
  Paper,
  Space,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import Image from "next/image";
import ProductCardColors from "./product-card-colors";
import { WishlistButton } from "./wishlist-button";
import Link from "next/link";
import CurrencyReadOnly from "../currency/currency-read-only";
import { csActive, rsActive } from "@/config";

const ProductCard1 = ({ data, disableColor, reseller }) => {
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
    <>
      <Box
        style={{ position: "relative" }}
        w={"100%"}
        h="100%"
        opacity={data?.qty > 0 ? 1 : 0.7}
        bg="red"
      >
        <Paper
          w={"100%"}
          radius={0}
          component={Link}
          style={{ textDecoration: "none", color: "black" }}
          href={`/products/${data?.name?.replace(/\s/g, "-")}/${data?.code}`}
          bg={"#f1f3f5"}
          py={0}
          h={"100%"}
          mih="fit-content"
          withBorder
        >
          <Box px={0} pt={0}>
            <Box
              w={"100%"}
              h={{ base: 175, md: 223 }}
              style={{ position: "relative" }}
            >
              <Image
                style={{ objectFit: "cover" }}
                fill
                src={
                  data?.images && data?.images[0]
                    ? data?.images[0]?.publicUrl
                    : ""
                }
                alt={
                  data?.images && data?.images[0] ? data?.images[0]?.alt : ""
                }
                title={
                  data?.images && data?.images[0] ? data?.images[0]?.alt : ""
                }
                quality={15}
              />
              <Box
                px={10}
                style={{ position: "absolute", bottom: 10, left: 0 }}
              >
                <Group gap={5}>
                  {data?.fLabel?.map((doc) => {
                    return (
                      <Badge autoContrast color="dark" key={doc}>
                        {doc}
                      </Badge>
                    );
                  })}
                </Group>
              </Box>
            </Box>
          </Box>
          <Space h={30} />
          <Box px={10}>
            <Stack gap={7}>
              <Title order={3} fw={500} lh={1.2} size="12px" opacity={0.7}>
                {data?.brand}-{data?.code}
              </Title>
              <Title order={3} lineClamp={1} fw={600} style={{ fontSize: 16 }}>
                {data?.name}
              </Title>
            </Stack>
          </Box>
          {!disableColor && (
            <>
              {" "}
              <Space h={15} />
              <Box px={10}>
                <ProductCardColors colors={data?.colors} />
              </Box>
            </>
          )}
          <Space h={15} />
          <Box px={10} pb={10}>
            <Stack gap={7}>
              {/* {!isVendor && ( */}
                <Text fw={700} lh={1.2} size="14px">
                  {isSlashedPrice && (
                    <Text span fw={600} c="#e74033" td="line-through" pr={4}>
                      <CurrencyReadOnly currency="aed" value={slashValue} />
                    </Text>
                  )}
                  <CurrencyReadOnly currency="aed" value={prodPrice} /> / unit
                </Text>
              {/* )} */}
              {data?.qty > 0 ? (
                <>
                  {showQty && (
                    <Group gap={7}>
                      <Badge autoContrast size="0.5rem" circle></Badge>
                      <Text fw={500} lh={1.2} size="12px" opacity={0.7}>
                        In Stock ({data?.qty})
                      </Text>
                    </Group>
                  )}
                </>
              ) : (
                <Group gap={7}>
                  <Badge autoContrast size="0.5rem" circle color="red"></Badge>
                  <Text fw={500} lh={1.2} size="12px" opacity={0.7}>
                    Out of Stock
                  </Text>
                </Group>
              )}
              {showQty && data?.stockText && data?.stockText !== "" && (
                <Text size="sm" mt={-3} fw={600}>
                  {data.stockText}
                </Text>
              )}
            </Stack>
          </Box>
        </Paper>
        {!isVendor && <WishlistButton id={data?._id} />}
      </Box>
    </>
  );
};

export default ProductCard1;
