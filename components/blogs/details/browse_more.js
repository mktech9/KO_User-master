"use client";

import {
  Badge,
  Box,
  Divider,
  Group,
  Space,
  Text,
  Title,
  Paper,
  SimpleGrid,
} from "@mantine/core";
import Link from "next/link";
import BlogItem from "../item";

const BrowseMore = ({ data, related, current_category }) => {
  const category = data?.category || "articles";
  const tags = data?.seo?.metaKeywords || [];

  if (!tags.length) return null;

  return (
    <Paper
      withBorder
      radius="lg"
      //   shadow="sm"
      p={{ base: 12, md: 24 }}
      mt={24}
      style={{
        background: "linear-gradient(145deg, #f9fafc 0%, #ffffff 100%)",
        border: "1px solid rgba(0,0,0,0.05)",
      }}
    >
      <Box px={{ base: 4, md: 12 }}>
        <Divider
          labelPosition="center"
          label={<Text fw={600}>Discover More</Text>}
        />
        <Space h={24} />

        <Title order={4} fw={600}>
          Browse more on{" "}
          <Text
            span
            fw={800}
            c="#2a367c"
            style={{
              textTransform: "capitalize",
              transition: "color 0.25s ease",
            }}
            component={Link}
            href={`/blog/${category}`}
          >
            {current_category ? current_category.name : category}
          </Text>
        </Title>

        <Space h={12} />

        <Group gap={12} wrap="wrap">
          {tags.map((item) => (
            <Badge
              key={item}
              component={Link}
              href={`/blog/${category}?tags=${item.replace(/\s+/g, "-")}`}
              variant="light"
              size="lg"
              radius="md"
              px={14}
              py={6}
              fw={500}
              style={{
                background: "linear-gradient(90deg, #edf2ff, #f3f0ff)",
                color: "#2a367c",
                border: "1px solid rgba(42, 54, 124, 0.15)",
                textTransform: "none",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background =
                  "linear-gradient(90deg, #dbe4ff, #e5dbff)";
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 4px 10px rgba(0,0,0,0.08)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background =
                  "linear-gradient(90deg, #edf2ff, #f3f0ff)";
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              {item}
            </Badge>
          ))}
        </Group>

        <Space h={24} />
        {related?.length > 0 && (
          <>
            <SimpleGrid cols={{ base: 1, md: 2 }}>
              {related?.map((item) => (
                <BlogItem doc={item} key={item._id} />
              ))}
            </SimpleGrid>
            <Space h={24} />
          </>
        )}
      </Box>
    </Paper>
  );
};

export default BrowseMore;
