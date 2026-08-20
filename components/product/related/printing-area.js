"use client";

import { Box, Button, Divider, SimpleGrid, Stack, Text } from "@mantine/core";
import Image from "next/image";
import Link from "next/link";
import { PiDownloadDuotone } from "react-icons/pi";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";

const PrintingAreaImages = ({ download, document, printingArea }) => {
  let images = [...Object.values(printingArea ?? {})];

  return (
    <>
      <Stack gap={15}>
        <Divider />
        <Text style={{ fontSize: 18 }} span fw={700} opacity={1}>
          Printing Area Images
        </Text>
        <PhotoProvider>
          <SimpleGrid
            my={10}
            cols={{ base: 2, md: 4 }}
            spacing={{ base: 50, md: "md" }}
          >
            {images?.map((doc, i) => {
              if (doc.url && doc.url !== "") {
                return (
                  <PhotoView src={doc.url} key={i}>
                    <Box
                      w={"100%"}
                      h={150}
                      style={{
                        position: "relative",
                        borderRadius: 12,
                        overflow: "hidden",
                      }}
                    >
                      <Image
                        src={doc.url}
                        style={{ objectFit: "contain" }}
                        fill
                        alt={doc?.alt ? doc.alt : ""}
                        title={doc?.alt ? doc.alt : ""}
                      />
                    </Box>
                  </PhotoView>
                );
              }
            })}
          </SimpleGrid>
        </PhotoProvider>
        <SimpleGrid
          cols={{ base: 2, md: 4 }}
          spacing={{ base: "xl", md: "md" }}
        >
          <Button
            autoContrast
            component={Link}
            target="_blank"
            href={download ?? "/"}
            size="md"
            leftSection={<PiDownloadDuotone />}
          >
            All Images
          </Button>
          <Button
            autoContrast
            component={Link}
            target="_blank"
            href={document ?? "/"}
            size="md"
            leftSection={<PiDownloadDuotone />}
          >
            Product Chart
          </Button>
        </SimpleGrid>
      </Stack>
    </>
  );
};

export default PrintingAreaImages;
