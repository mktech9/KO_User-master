"use client";

import { Box, Container, Stack, ThemeIcon } from "@mantine/core";
import { Carousel, CarouselSlide } from "@mantine/carousel";
import { PiArrowLeft, PiArrowRight } from "react-icons/pi";
import classes from "./index.module.css";
import { useRef } from "react";
import Autoplay from "embla-carousel-autoplay";
import Link from "next/link";
import Image from "next/image";

const FullScreenSlider = ({ desktop, fullWidth, data }) => {
  const autoplay = useRef(Autoplay({ delay: 2000 }));

  const item = (
    <Carousel
      containScroll="trimSnaps"
      h={"auto"}
      withControls={desktop ? true : false}
      withIndicators={data?.images?.length <= 1 ? false : true}
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
            }
      }
      plugins={[autoplay.current]}
      onMouseEnter={autoplay.current.stop}
      onMouseLeave={autoplay.current.reset}
    >
      {data?.images.map((doc, i) => {
        return (
          <CarouselSlide key={i} component={Link} href={doc?.link ?? "/"}>
            <Image
              width={0}
              height={0}
              src={doc?.publicUrl}
              style={{ objectFit: "contain", width: "100%", height: "auto" }}
              alt={doc?.alt ?? ""}
              title={doc?.alt ?? ""}
              sizes="75vw"
              priority
              fetchPriority="high"
            />
            <Box style={{ position: "absolute", top: 0 }} h={"100%"} w={"100%"}>
              <Container size={"xl"} h={"100%"} w={"100%"}>
                <Stack h={"100%"} justify="center" gap={0}></Stack>
              </Container>
            </Box>
          </CarouselSlide>
        );
      })}
    </Carousel>
  );

  if (fullWidth) {
    return item;
  }

  return (
    <Container w={"100%"} size={"xl"}>
      {item}
    </Container>
  );
};

export default FullScreenSlider;
