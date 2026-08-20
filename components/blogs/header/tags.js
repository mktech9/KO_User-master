"use client";

import { Divider, Group, Paper, Text, UnstyledButton } from "@mantine/core";
import { useSearchParams } from "next/navigation";
import { TbX } from "react-icons/tb";

const Tags = ({ tags = [], total = [] }) => {
  const searchParams = useSearchParams();

  const decodedTags = tags || [];

  const handleTagClick = (tag) => {
    let selectedTags_new = [...decodedTags].filter((t) => t !== tag);

    let query = "";

    let decodedDate = searchParams.get("date") || "all";
    query += `date=${decodedDate.toLowerCase().replace(/\s+/g, "-")}`;

    if (selectedTags_new.length > 0) {
      const tagsParam = selectedTags_new
        .map((t) => t.replace(/\s+/g, "-"))
        .join(",");

      query += query ? `&tags=${tagsParam}` : `tags=${tagsParam}`;
    }

    window.location.href = `?${query}`;
  };

  return (
    <>
      <Text fw={700} size="xl">
        <b>{total?.length}</b> {total?.length > 1 ? "Articles" : "Article"}{" "}
        found
      </Text>
      <Group mt={8} mb={24}>
        {tags?.length > 0
          ? tags.map((doc) => (
              <UnstyledButton key={doc} onClick={() => handleTagClick(doc)}>
                <Paper bg="gray.0" py={2} px={12} withBorder radius="md">
                  <Group gap={4}>
                    <Text c="#454545">{doc?.replace(/-/g, " ")}</Text>
                    <TbX />
                  </Group>
                </Paper>
              </UnstyledButton>
            ))
          : "No tags found"}
      </Group>
      <Divider mb={24} />
    </>
  );
};

export default Tags;
