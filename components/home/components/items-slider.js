"use client";

import {
  Box,
  Button,
  Container,
  Stack,
  Text,
  ThemeIcon,
  Title,
} from "@mantine/core";
import { Carousel, CarouselSlide } from "@mantine/carousel";
import { PiArrowLeft, PiArrowRight } from "react-icons/pi";
import classes from "./index.module.css";
import Link from "next/link";
import ProductCard1 from "@/components/common/product-card-1";
import { csActive, rsActive } from "@/config";

const ProductsSlider = ({
  desktop,
  fullWidth,
  title,
  subText,
  data,
  reseller,
  configs,
}) => {
  console.log(data);

  const item = (
    <>
      {title && title !== "" && (
        <Stack gap={0} mb={24} align="center">
          <Title order={1} fw={700} style={{ fontSize: desktop ? 34 : 24 }}>
            {title}
          </Title>
          <Text fw={500} maw={550} ta={"center"} size="sm" opacity={0.7}>
            {subText}
          </Text>
          <Button
            autoContrast
            mt={12}
            variant="outline"
            component={Link}
            href={data?.link ?? "/"}
          >
            Explore
          </Button>
        </Stack>
      )}
      <Carousel
        h={"auto"}
        withIndicators
        withControls={desktop ? true : false}
        previousControlIcon={
          <ThemeIcon
            visibleFrom="md"
            autoContrast
            size={"xl"}
            radius={"xl"}
            variant="gradient"
          >
            <PiArrowLeft />
          </ThemeIcon>
        }
        nextControlIcon={
          <ThemeIcon
            visibleFrom="md"
            autoContrast
            size={"xl"}
            radius={"xl"}
            variant="gradient"
          >
            <PiArrowRight />
          </ThemeIcon>
        }
        controlSize={"2.5rem"}
        classNames={
          desktop
            ? {
                root: classes.carousel,
                control: classes.control,
                controls: classes.carouselControls,
                indicator: classes.carouselIndicator,
              }
            : {
                control: classes.control,
                indicator: classes.carouselIndicator,
              }
        }
        slideSize={{ base: "75%", md: "20%" }}
        align={fullWidth ? "center" : "start"}
        slideGap={"xl"}
        containScroll="trimSnaps"
        dragFree
      >
        {data?.products
          ?.filter((doc) => {
            if (configs?.label !== "super") {
              return (
                !doc?.disabledFor?.includes(configs?.label) && doc.isActive
              );
            } else {
              return reseller
                ? doc.active && doc.active[`${rsActive}`]
                : doc.active && doc.active[`${csActive}`]
            }
          })
          ?.map((doc, i) => {
            return (
              <CarouselSlide key={i}>
                <ProductCard1
                  data={doc}
                  disableColor={true}
                  disableDivider={true}
                  reseller={reseller}
                />
              </CarouselSlide>
            );
          })}
      </Carousel>
    </>
  );

  if (fullWidth) {
    return <Box mt={24}>{item}</Box>;
  }

  return (
    <Container w={"100%"} size={"xl"} mt={24} mb={24}>
      {item}
    </Container>
  );
};

export default ProductsSlider;
