import ProductCard1 from "@/components/common/product-card-1";
import { Carousel, CarouselSlide } from "@mantine/carousel";
import { SimpleGrid, Skeleton, Stack, Text } from "@mantine/core";

const Items = ({ text, items, reseller }) => {
  return (
    <Stack gap={30}>
      <Text style={{ fontSize: 18 }} span fw={700} opacity={1}>
        {text}
      </Text>
      <Carousel
        withIndicators={false}
        height={"auto"}
        slideSize={{ base: "75%", md: "20%" }}
        slideGap="md"
        loop
        align="start"
        slidesToScroll={3}
      >
        {items?.map((doc) => {
          return (
            <CarouselSlide key={doc._id}>
              <ProductCard1 disableDivider data={doc} reseller={reseller} />
            </CarouselSlide>
          );
        })}
      </Carousel>
    </Stack>
  );
};

export default Items;
