"use client";

import { Box, Button, Group } from "@mantine/core";
import Link from "next/link";
import { TbChevronLeft, TbChevronRight } from "react-icons/tb";

const BlogNavigation = ({ prevBlog, nextBlog }) => {
  return (
    <Group justify="space-between" mt={10} w="100%">
      {/* Previous Blog */}
      {prevBlog && prevBlog?.slug?.trim() !== "" ? (
        <Button
          component={Link}
          href={`/blog/${prevBlog.category}/${prevBlog.slug}`}
          variant="outline"
          color="blue"
          leftSection={<TbChevronLeft size="1.25rem" />}
          radius="md"
        >
          Previous
        </Button>
      ) : (
        <Box /> // empty placeholder to keep spacing
      )}

      {/* Next Blog */}
      {nextBlog && nextBlog?.slug?.trim() !== "" ? (
        <Button
          component={Link}
          href={`/blog/${nextBlog.category}/${nextBlog.slug}`}
          variant="filled"
          color="blue"
          rightSection={<TbChevronRight size="1.25rem" />}
          radius="md"
        >
          Read Next Blog
        </Button>
      ) : (
        <Box /> // empty placeholder to keep spacing
      )}
    </Group>
  );
};

export default BlogNavigation;
