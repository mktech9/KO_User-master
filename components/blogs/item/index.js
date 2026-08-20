"use client";

import { Box, Divider, Group, Image, Paper, Text } from "@mantine/core";
import moment from "moment";
import Link from "next/link";
import { TbFolderFilled } from "react-icons/tb";

const BlogItem = ({ doc }) => {
  const coverImage = doc?.coverImage && doc?.coverImage[0];

  return (
    <Paper
      withBorder
      radius="lg"
      style={{
        overflow: "hidden",
        transition: "transform 0.25s ease, box-shadow 0.25s ease",
        boxShadow: "0 2px 10px rgba(0,0,0,0.04)",
        cursor: "pointer",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-4px)";
        e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.08)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 2px 10px rgba(0,0,0,0.04)";
      }}
      component={Link}
      href={`/blog/${doc.category}/${doc?.slug}`}
    >
      {/* Image Section */}
      <Box style={{ position: "relative", overflow: "hidden" }}>
        <Image
          src={coverImage}
          h={160}
          w="100%"
          style={{
            objectFit: "cover",
            transition: "transform 0.4s ease",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.transform = "scale(1.05)")
          }
          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1.0)")}
        />
      </Box>

      {/* Content Section */}
      <Box h={112} p="md">
        <Text
          fw={600}
          lh={1.35}
          c="#1f1f1f"
          style={{
            fontSize: 20,
            letterSpacing: "-0.01em",
          }}
          lineClamp={3}
        >
          {doc?.title}
        </Text>
        {/* <Text size="sm" c="dimmed" style={{ lineHeight: 1.6 }}>
          Discover how thoughtful, high-end gifting strategies communicate
          prestige and build lasting business relationships in today’s luxury
          markets.
        </Text> */}
      </Box>

      <Divider />

      {/* Footer Section */}
      <Box bg="#f9f9fb" py="xs" px="md">
        <Group justify="space-between">
          <Text fw={500} size="xs" c="rgba(0,0,0,0.55)">
            {moment(doc?.createdAt).fromNow()}
          </Text>

          <Group gap={6}>
            <TbFolderFilled size={14} color="#2a367c" />
            <Text fw={600} size="xs" c="#2a367c" style={{ opacity: 0.8 }}>
              {doc?.category}
            </Text>
          </Group>
        </Group>
      </Box>
    </Paper>
  );
};

export default BlogItem;
