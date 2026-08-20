"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Badge, Box, Divider, Group, Select, Text, Title } from "@mantine/core";
import { inter } from "../local_font";
import moment from "moment";

const Archives = ({
  content_type = [],
  tags = [],
  date_archive = [],
  tag_array = [],
}) => {
  const searchParams = useSearchParams();

  // Decode from URL (replace '-' with spaces, split tags by ',')
  const decodedDate = searchParams.get("date") || "all";
  const decodedTags = tag_array
    ? tag_array.map((t) => t.replace(/-/g, " "))
    : [];

  const [selectedDate, setSelectedDate] = useState(decodedDate);

  useEffect(() => {
    console.log("decodedDate", decodedDate);
    setSelectedDate(decodedDate);
  }, [decodedDate]);

  const handleTagClick = (tag) => {
    let prev = [...decodedTags];
    let newTags = prev.includes(tag)
      ? prev.filter((t) => t !== tag)
      : [...prev, tag];

    let query = "";

    query += `date=${decodedDate.toLowerCase().replace(/\s+/g, "-")}`;

    if (newTags.length > 0) {
      const tagsParam = newTags.map((t) => t.replace(/\s+/g, "-")).join(",");
      query += query ? `&tags=${tagsParam}` : `tags=${tagsParam}`;
    }

    window.location.href = `?${query}`;
  };

  const handleDateChange = (dateTag) => {
    let prev = [...decodedTags];
    let newTags = prev;

    let query = "";

    query += `date=${dateTag.toLowerCase().replace(/\s+/g, "-")}`;

    if (newTags.length > 0) {
      const tagsParam = newTags.map((t) => t.replace(/\s+/g, "-")).join(",");
      query += query ? `&tags=${tagsParam}` : `tags=${tagsParam}`;
    }

    window.location.href = `?${query}`;
  };

  const tagStyle = (isActive) => ({
    textTransform: "none",
    fontWeight: 500,
    borderRadius: "md",
    backgroundColor: isActive ? "#2a367c" : "#f4f6fa",
    color: isActive ? "#fff" : "#2a367c",
    border: "1px solid rgba(42, 54, 124, 0.15)",
    transition: "all 0.2s ease",
    cursor: "pointer",
  });

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
      {/* ARCHIVES SECTION */}
      <Box>
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
          value={selectedDate}
          onChange={(v) => handleDateChange(v)}
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

        <Text mt={24} fw={600} opacity={0.8} c="#1f1f1f">
          Content Type
        </Text>
        <Group mt={8} gap={8}>
          {content_type?.length > 0
            ? content_type.map((doc) => (
                <Badge
                  key={doc}
                  size="lg"
                  style={tagStyle(decodedTags.includes(doc))}
                  onClick={() => handleTagClick(doc)}
                >
                  {doc}
                </Badge>
              ))
            : "No tags found"}
        </Group>
      </Box>

      {/* Other tags */}
      <Box mt={32}>
        <Text mt={8} fw={600} opacity={0.8} c="#1f1f1f">
          Others
        </Text>
        <Group mt={8} gap={8}>
          {tags?.length > 0
            ? tags.map((doc) => (
                <Badge
                  key={doc}
                  size="lg"
                  style={tagStyle(decodedTags.includes(doc))}
                  onClick={() => handleTagClick(doc)}
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

export default Archives;
