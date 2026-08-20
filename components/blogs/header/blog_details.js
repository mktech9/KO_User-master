"use client";

import React from "react";
import {
  Box,
  Container,
  Group,
  Avatar,
  Text,
  Title,
  Blockquote,
  Flex,
  Stack,
  Paper,
  SimpleGrid,
  Divider,
} from "@mantine/core";
import { TbClockHour4, TbCalendar } from "react-icons/tb";
import moment from "moment";
import { inter } from "../local_font";

// A small, reusable component for meta items
const MetaItem = ({ icon, label, value }) => (
  <Stack gap={2}>
    <Text
      size="xs"
      c="gray.5"
      tt="uppercase"
      fw={600}
      lh={1.2}
      visibleFrom="md"
    >
      {label}
    </Text>
    <Group gap={4} noWrap>
      <Box pt={4} c="violet.3">
        {icon}
      </Box>
      <Text size="sm" c="gray.1" fw={500}>
        {value}
      </Text>
    </Group>
  </Stack>
);

const BlogDetailsSection = ({ data, current_category }) => {
  // --- Data Extraction and Fallbacks ---
  const image =
    data?.coverImage?.[0] ||
    "https://placehold.co/1920x1080/0a0a0a/4a4a4a?text=Elegant+Design";
  const author = data?.author?.authorName || "Unknown Author";
  const authorAvatar =
    data?.author?.authorAvatar ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(
      author
    )}&background=1a1b1e&color=fff&font-size=0.33`;
  const category = current_category ? current_category.name : data?.category;
  const publishedDate = data?.createdAt
    ? moment(data.createdAt).format("MMMM D, YYYY")
    : "—";

  // --- Content Metrics ---
  const wordCount = data?.content_enhance?.wordCount || 0;
  const readingTime = data?.content_enhance?.readingTime || 0;
  const featuredQuote = data?.content_enhance?.featuredQuote;

  return (
    <Box
      pos="relative"
      style={{
        backgroundImage: `
          linear-gradient(to top, rgba(10, 10, 12, 1) 15%, rgba(10, 10, 12, 0.85) 50%, rgba(10, 10, 12, 0.6)),
          radial-gradient(circle at 40% 30%, rgba(134, 73, 227, 0.15), transparent 60%),
          url('${image}')
        `,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        fontFamily: "'Inter', sans-serif",
        color: "#fff",
      }}
    >
      <Container size="xl" py={{ base: 60, md: 100 }}>
        <Flex direction="column" gap="lg" align="flex-start">
          {/* Category Badge */}
          <Paper
            withBorder
            radius="xl"
            px="md"
            py={6}
            style={{
              background:
                "linear-gradient(145deg, rgba(255,255,255,0.18), rgba(255,255,255,0.05))",
              borderColor: "rgba(255,255,255,0.25)",
              // backdropFilter: "blur(6px)",
              // WebkitBackdropFilter: "blur(6px)",
              alignSelf: "flex-start",
            }}
            visibleFrom="md"
          >
            <Text
              fw={700}
              size="md"
              c="rgba(255,255,255,0.95)"
              style={{
                letterSpacing: "0.05em",
                textTransform: "uppercase",
              }}
            >
              {category}
            </Text>
          </Paper>
          <Paper
            withBorder
            radius="xl"
            px="sm"
            py={4}
            style={{
              background:
                "linear-gradient(145deg, rgba(255,255,255,0.18), rgba(255,255,255,0.05))",
              borderColor: "rgba(255,255,255,0.25)",
              // backdropFilter: "blur(6px)",
              // WebkitBackdropFilter: "blur(6px)",
              alignSelf: "flex-start",
            }}
            hiddenFrom="md"
          >
            <Text
              fw={700}
              size="sm"
              c="rgba(255,255,255,0.95)"
              style={{
                letterSpacing: "0.05em",
                textTransform: "uppercase",
              }}
            >
              {category}
            </Text>
          </Paper>
          {/* Main Title */}
          <Title
            mt={{ base: 12, md: 0 }}
            c="#fff"
            fw={800}
            order={1}
            style={{
              fontSize: "clamp(32px, 6vw, 72px)",
              lineHeight: 1.2,
              textShadow: "0 4px 32px rgba(0,0,0,0.6)",
              letterSpacing: "-0.04em",
              //   maxWidth: "min(18ch, 100%)",
            }}
            className={inter.className}
          >
            {data?.title || "Untitled Post"}
          </Title>

          {/* Excerpt / Subtitle */}
          {data?.excerpt && (
            <Text
              // size="xl"
              c="gray.3"
              style={{
                lineHeight: 1.7,
                // maxWidth: "65ch",
                fontWeight: 400,
                fontSize: "clamp(15px, 2.5vw, 20px)",
              }}
            >
              {data.excerpt}
            </Text>
          )}

          {/* Author & Meta Info */}
          <Box
            style={{
              width: "100%",
              borderTop: "1px solid rgba(255, 255, 255, 0.08)",
              marginTop: "32px",
              paddingTop: "24px",
            }}
            visibleFrom="md"
          >
            <Group justify="space-between" align="center">
              {/* Author */}
              <Group spacing="md" align="center">
                <Avatar
                  src={authorAvatar}
                  radius="xl"
                  size="lg"
                  alt={author}
                  styles={{
                    root: {
                      border: "2px solid rgba(255,255,255,0.15)",
                      boxShadow: "0 0 24px rgba(0,0,0,0.4)",
                    },
                  }}
                />
                <div>
                  <Text fw={600} c="gray.0" size="lg" lh={1.2}>
                    {author}
                  </Text>
                  <Text size="sm" c="gray.5" fw={400}>
                    Checkout out our latest products catalog.
                  </Text>
                </div>
              </Group>

              {/* Other Meta */}
              <Group gap="xl">
                <MetaItem
                  icon={<TbCalendar size={18} />}
                  label="Published"
                  value={publishedDate}
                />
                <MetaItem
                  icon={<TbClockHour4 size={18} />}
                  label="Reading Time"
                  value={`${readingTime} min read`}
                />
                <MetaItem
                  icon={<TbClockHour4 size={18} />}
                  label="Word Count"
                  value={`${wordCount.toLocaleString()} words`}
                />
              </Group>
            </Group>
          </Box>
          <Box
            style={{
              width: "100%",
              borderTop: "1px solid rgba(255, 255, 255, 0.08)",
              marginTop: "16px",
              paddingTop: "12px",
            }}
            hiddenFrom="md"
          >
            <SimpleGrid cols={2}>
              <MetaItem
                icon={<TbCalendar size={18} />}
                label="Published"
                value={publishedDate}
              />
              <MetaItem
                icon={<TbClockHour4 size={18} />}
                label="Time to Read"
                value={`${readingTime} min ( ${wordCount.toLocaleString()} words )`}
              />
            </SimpleGrid>
            <Divider color="rgba(255, 255, 255, 0.08)" mt={8} mb={32} />
            <Group spacing="md" align="center">
              <Avatar
                src={authorAvatar}
                radius="xl"
                size="md"
                alt={author}
                styles={{
                  root: {
                    border: "2px solid rgba(255,255,255,0.15)",
                    boxShadow: "0 0 24px rgba(0,0,0,0.4)",
                  },
                }}
              />
              <div>
                <Text fw={600} c="gray.0" size="md" lh={1.2}>
                  {author}
                </Text>
                <Text size="xs" c="gray.5" fw={400}>
                  Checkout out our latest products catalog.
                </Text>
              </div>
            </Group>
          </Box>

          {/* Featured Quote */}
          {featuredQuote && (
            <Blockquote
              mt="xl"
              style={{
                color: "rgba(255,255,255,0.9)",
                background:
                  "linear-gradient(135deg, rgba(40, 41, 48, 0.6), rgba(45, 46, 55, 0.6))",
                borderLeft: "4px solid #8b5cf6",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255,255,255,0.1)",
                boxShadow: "0 8px 30px rgba(0,0,0,0.4)",
                // maxWidth: "min(75ch, 100%)",
                padding: "28px 36px",
                borderRadius: "14px",
                fontStyle: "italic",
                fontSize: "1.15rem",
                lineHeight: 1.6,
              }}
              visibleFrom="md"
            >
              {featuredQuote}
            </Blockquote>
          )}
        </Flex>
      </Container>
    </Box>
  );
};

export default BlogDetailsSection;
