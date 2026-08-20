"use client";

import { Carousel, CarouselSlide } from "@mantine/carousel";
import { ActionIcon, Box, Stack } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import Image from "next/image";
import { useState } from "react";
import { PiArrowLeft, PiArrowRight } from "react-icons/pi";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";

const ImageGallery = ({ images }) => {
  const [slide, setSlide] = useState(0);
  const [embla, setEmbla] = useState(null);

  const matches = useMediaQuery("(max-width: 64em)");

  return (
    <>
      <Stack style={{ position: "relative" }}>
        <PhotoProvider>
          <Carousel
            w={"100%"}
            style={{ borderRadius: 12, overflow: "hidden" }}
            withControls={false}
            height={matches ? 200 : 450}
            onSlideChange={(index) => setSlide(index)}
            getEmblaApi={setEmbla}
          >
            {images?.map((doc) => {
              return (
                <CarouselSlide key={doc.publicUrl} h={"100%"}>
                  <PhotoView src={doc.publicUrl}>
                    <Box w={"100%"} h={"100%"} style={{ position: "relative" }}>
                      <Image
                        style={{ objectFit: "contain" }}
                        fill
                        src={doc.publicUrl}
                        alt={doc?.alt ? doc.alt : ""}
                        title={doc?.alt ? doc.alt : ""}
                      />
                    </Box>
                  </PhotoView>
                </CarouselSlide>
              );
            })}
          </Carousel>
        </PhotoProvider>
        <Carousel
          style={{ borderRadius: 12, overflow: "hidden" }}
          height={75}
          slideSize={matches ? "15%" : "20%"}
          align={"start"}
          slideGap={"lg"}
          px={0}
          onSlideChange={(index) => {
            if (embla) {
              embla.scrollTo(index);
            }
            setSlide(index);
          }}
          controlsOffset={-30}
          withControls={false}
          previousControlIcon={
            <ActionIcon autoContrast radius={"xl"} color="dark" size={"lg"}>
              <PiArrowLeft />
            </ActionIcon>
          }
          nextControlIcon={
            <ActionIcon autoContrast radius={"xl"} color="dark" size={"lg"}>
              <PiArrowRight />
            </ActionIcon>
          }
        >
          {images?.map((doc, i) => {
            return (
              <CarouselSlide
                key={doc.publicUrl}
                onClick={() => {
                  embla.scrollTo(i);
                  setSlide(i);
                }}
                opacity={slide === i ? 1 : 0.7}
              >
                <Box w={"100%"} h={"100%"} style={{ position: "relative" }}>
                  <Image
                    fill
                    style={{ objectFit: "contain" }}
                    src={doc.publicUrl}
                    alt={doc?.alt ? doc.alt : ""}
                    title={doc?.alt ? doc.alt : ""}
                  />
                </Box>
              </CarouselSlide>
            );
          })}
        </Carousel>
      </Stack>
    </>
  );
};

export default ImageGallery;
