import { Box, Divider, Paper, SimpleGrid, Stack, Text } from "@mantine/core";
import Image from "next/image";
import Link from "next/link";

const RelatedColors = ({ data }) => {
  return (
    <>
      <Stack gap={15}>
        <Divider />
        <Text style={{ fontSize: 18 }} span fw={700} opacity={1}>
          Color Options
        </Text>
        <SimpleGrid
          my={10}
          cols={{ base: 2, md: 4 }}
          spacing={{ base: 50, md: "md" }}
        >
          {data?.relatedProducts?.map((doc) => {
            return (
              <Paper
                key={doc._id}
                px="xs"
                py="xs"
                withBorder
                component={Link}
                href={`/products/${doc?.name?.replace(/\s/g, "-")}/${
                  doc?.code
                }`}
                style={{ textDecoration: "none", color: "black" }}
              >
                <Box w="100%" h={120} style={{ position: "relative" }}>
                  <Image
                    fill
                    src={
                      doc?.images && doc?.images[0]
                        ? doc?.images[0]?.publicUrl
                        : ""
                    }
                    alt={
                      doc?.images && doc?.images[0] ? data?.images[0]?.alt : ""
                    }
                    title={
                      doc?.images && doc?.images[0] ? doc?.images[0]?.alt : ""
                    }
                    style={{ objectFit: "contain" }}
                  />
                </Box>
                <Text
                  size="sm"
                  fw={500}
                  mt={4}
                  ta="center"
                  truncate
                  lineClamp={1}
                >
                  {doc?.fColor?.join(", ")}
                </Text>
              </Paper>
            );
          })}
        </SimpleGrid>
      </Stack>
    </>
  );
};

export default RelatedColors;
