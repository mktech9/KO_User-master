"use client";

import { useEffect, useState } from "react";
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
import Pusher from "pusher-js";
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
  const [products, setProducts] = useState(data?.products || []);

  // -----------------------------------------
  // Sync when home page data changes
  // -----------------------------------------
  useEffect(() => {
    setProducts(data?.products || []);
  }, [data?.products]);

  // -----------------------------------------
  // Pusher realtime product updates
  // -----------------------------------------
  useEffect(() => {
    Pusher.logToConsole = true;

    const pusher = new Pusher(
      process.env.NEXT_PUBLIC_PUSHER_KEY,
      {
        cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER,
        forceTLS: true,
      }
    );

    pusher.connection.bind("state_change", (states) => {
      console.log("PUSHER STATE:", states);
    });

    const channel = pusher.subscribe("products");

    channel.bind(
      "pusher:subscription_succeeded",
      () => {
        console.log("✅ HOME PRODUCT SLIDER SUBSCRIBED");
      }
    );

    channel.bind("product-updated", async (event) => {
      console.log("🔥 HOME PRODUCT UPDATED:", event);

      const code = event?.code;

      if (!code) return;

      try {
        const response = await fetch(
          `/api/products/${code}`,
          {
            cache: "no-store",
          }
        );

        if (!response.ok) {
          console.log("Product not found:", code);
          return;
        }

        const updatedProduct = await response.json();

        console.log(
          "🏠 HOME LATEST PRODUCT:",
          updatedProduct
        );

        setProducts((currentProducts) =>
          currentProducts.map((product) =>
            product.code === code
              ? {
                  ...product,
                  ...updatedProduct,
                }
              : product
          )
        );
      } catch (error) {
        console.error(
          "Home realtime product refresh error:",
          error
        );
      }
    });

    return () => {
      channel.unbind_all();
      pusher.unsubscribe("products");
      pusher.disconnect();
    };
  }, []);

  const item = (
    <>
      {title && title !== "" && (
        <Stack gap={0} mb={24} align="center">
          <Title
            order={1}
            fw={700}
            style={{
              fontSize: desktop ? 34 : 24,
            }}
          >
            {title}
          </Title>

          <Text
            fw={500}
            maw={550}
            ta="center"
            size="sm"
            opacity={0.7}
          >
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
        h="auto"
        withIndicators
        withControls={desktop ? true : false}
        previousControlIcon={
          <ThemeIcon
            visibleFrom="md"
            autoContrast
            size="xl"
            radius="xl"
            variant="gradient"
          >
            <PiArrowLeft />
          </ThemeIcon>
        }
        nextControlIcon={
          <ThemeIcon
            visibleFrom="md"
            autoContrast
            size="xl"
            radius="xl"
            variant="gradient"
          >
            <PiArrowRight />
          </ThemeIcon>
        }
        controlSize="2.5rem"
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
        slideGap="xl"
        containScroll="trimSnaps"
        dragFree
      >
        {products
          ?.filter((doc) => {
            if (configs?.label !== "super") {
              return (
                !doc?.disabledFor?.includes(configs?.label) &&
                doc?.isActive
              );
            } else {
              return reseller
                ? doc?.active &&
                    doc?.active[`${rsActive}`]
                : doc?.active &&
                    doc?.active[`${csActive}`];
            }
          })
          ?.map((doc) => (
            <CarouselSlide key={doc?.ref || doc?.code}>
              <ProductCard1
                data={doc}
                disableColor={true}
                disableDivider={true}
                reseller={reseller}
              />
            </CarouselSlide>
          ))}
      </Carousel>
    </>
  );

  if (fullWidth) {
    return <Box mt={24}>{item}</Box>;
  }

  return (
    <Container w="100%" size="xl" mt={24} mb={24}>
      {item}
    </Container>
  );
};

export default ProductsSlider;