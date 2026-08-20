"use client";

import {
  Badge,
  Box,
  Divider,
  Group,
  Select,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { inter } from "../local_font";
import moment from "moment";
import Link from "next/link";

const ArchivesAlt = ({
  category = [],
  tags = [],
  date_archive = [],
  category_name = "",
  current_category = null,
}) => {
  return (
    <Box
      style={{
        backgroundColor: "#fff",
        border: "1px solid #e9ecef",
        borderRadius: 16,
        padding: "clamp(20px, 3vw, 32px)",
        boxShadow: "0 4px 20px rgba(0,0,0,0.04)",
      }}
    >
      <Box>
        <Title
          order={5}
          className={inter.className}
          c="#2a367c"
          fw={700}
          style={{ letterSpacing: "0.05em" }}
        >
          OUR BLOGS
        </Title>
        <Divider
          mt={8}
          variant="dashed"
          size="md"
          color="rgba(42,54,124,0.25)"
        />
        <Stack mt={24} gap={4}>
          <Text
            variant="gradient"
            gradient={{ from: "blue", to: "grape" }}
            fw={600}
            component={Link}
            href={`/blog`}
            size="md"
            tt="capitalize"
          >
            All Blogs
          </Text>
          {category?.length > 0
            ? category?.map((doc) => {
                return (
                  <Text
                    variant="gradient"
                    key={doc?.slug}
                    gradient={{ from: "blue", to: "grape" }}
                    fw={600}
                    component={Link}
                    href={`/blog/${doc?.slug}`}
                    size="md"
                    tt="capitalize"
                  >
                    {doc?.name}
                  </Text>
                );
              })
            : "No category found"}
        </Stack>
      </Box>
      {/* ARCHIVES SECTION */}
      <Box mt={40}>
        <Title
          order={5}
          className={inter.className}
          c="#2a367c"
          fw={700}
          style={{ letterSpacing: "0.05em" }}
        >
          ARCHIVES
        </Title>
        <Divider
          mt={8}
          variant="dashed"
          size="md"
          color="rgba(42,54,124,0.25)"
        />
        <Select
          mt={24}
          size="md"
          data={[
            { label: "-- All dates", value: "all" },
            ...date_archive?.map((doc) => ({
              label: moment(doc).format("MMMM YYYY"),
              value: moment(doc).format("MMMM-YYYY").toLowerCase(),
            })),
          ]}
          defaultValue="all"
          onChange={(selectedDate) => {
            window.location.href = `/blog/${category_name}?date=${selectedDate}`;
          }}
          styles={{
            input: {
              borderRadius: 12,
              borderColor: "#d0d5e0",
              backgroundColor: "#f8f9fb",
              fontWeight: 500,
              color: "#2a367c",
              boxShadow: "inset 0 1px 2px rgba(0,0,0,0.03)",
            },
          }}
        />
      </Box>

      {/* TAGS SECTION */}
      <Box mt={40}>
        <Title
          order={5}
          className={inter.className}
          c="#2a367c"
          fw={700}
          style={{ letterSpacing: "0.05em" }}
        >
          TAGS
        </Title>
        <Divider
          mt={8}
          variant="dashed"
          size="md"
          color="rgba(42,54,124,0.25)"
        />

        <Group mt={24} gap={8}>
          {tags?.length > 0
            ? tags.map((doc) => (
                <Badge
                  key={doc}
                  size="lg"
                  style={{
                    textTransform: "none",
                    fontWeight: 500,
                    borderRadius: "md",
                    backgroundColor: "#f4f6fa",
                    color: "#2a367c",
                    border: "1px solid rgba(42, 54, 124, 0.15)",
                    transition: "all 0.2s ease",
                    cursor: "pointer",
                  }}
                  component={Link}
                  href={`/blog/${category_name}?tags=${doc.replace(
                    /\s+/g,
                    "-"
                  )}`}
                >
                  {doc}
                </Badge>
              ))
            : "No tags found"}
        </Group>
      </Box>
    </Box>
  );
};

export default ArchivesAlt;
