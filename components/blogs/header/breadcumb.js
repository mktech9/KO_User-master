"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import {
  ActionIcon,
  Anchor,
  Box,
  Breadcrumbs,
  Collapse,
  Container,
  Grid,
  GridCol,
  Group,
  Paper,
  Select,
  Stack,
  Text,
  TextInput,
  ThemeIcon,
} from "@mantine/core";
import {
  TbAsterisk,
  TbChevronDown,
  TbChevronUp,
  TbSearch,
} from "react-icons/tb";
import { useDisclosure } from "@mantine/hooks";
import Link from "next/link";

const HomeBreadcrumb = ({
  categories = [],
  data = [],
  active = "all",
  searchQuery = "",
}) => {
  const [opened, { toggle }] = useDisclosure();

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Initialize input with current querystring value if exists
  const [searchValue, setSearchValue] = useState(searchQuery);

  // Handle typing and update querystring
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);

    // Build new URL with updated search param
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set("search", value);
    } else {
      params.delete("search");
    }

    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const items = [
    { title: "All Blogs", href: "/blog", light: active === "all" },
    ...categories?.map((item) => ({
      title: item?.name,
      href: `/blog/${item?.slug}`,
      light: active === item?.slug,
    })),
  ].map((item, index) => (
    <Anchor
      key={index}
      href={item.href}
      style={{
        // textDecoration: "none",
        transition: "color 0.25s ease, opacity 0.25s ease",
        textTransform: "capitalize !important",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.color = "#1a245f")}
      onMouseLeave={(e) =>
        (e.currentTarget.style.color = item.light
          ? "rgba(42,54,124,0.75)"
          : "#2a367c")
      }
    >
      <Text
        fw={item.light ? 900 : 700}
        variant={item.light ? "gradient" : "text"}
        gradient={{ from: "blue", to: "grape" }}
        c={item.light ? "rgba(42,54,124,0.75)" : "#2a367c"}
        tt="capitalize"
        td={item.light ? "underline" : "none"}
      >
        {item.title}
      </Text>
    </Anchor>
  ));

  return (
    <Box
      bg="#f8f9fb"
      style={{
        borderBottom: "1px solid #e5e7eb",
        boxShadow: "inset 0 -1px 0 rgba(0,0,0,0.03)",
      }}
    >
      <Container size="xl" py={16}>
        <Grid align="center">
          {/* Breadcrumb Section */}
          <GridCol span={{ base: 12, md: 9 }}>
            <Group gap="xs" wrap="wrap" visibleFrom="md">
              <Breadcrumbs
                separator={<TbAsterisk size="0.75rem" />}
                separatorMargin="xs"
              >
                {items}
              </Breadcrumbs>
            </Group>
            <Paper
              withBorder
              style={{
                backgroundColor: "#fff",
                border: "1px solid #dee2e6",
                boxShadow: "0 2px 6px rgba(0,0,0,0.04)",
                transition: "all 0.2s ease",
              }}
              pl={16}
              pr={6}
              hiddenFrom="md"
              radius="md"
            >
              <Group h="2.625rem" justify="space-between" onClick={toggle}>
                <Text
                  variant="gradient"
                  gradient={{ from: "blue", to: "grape" }}
                  fw={700}
                  tt="capitalize"
                >
                  {active === "all" ? "All Blogs" : active?.replace(/-/g, " ")}
                </Text>
                <ActionIcon variant="transparent">
                  {opened ? (
                    <TbChevronUp size="1.25rem" />
                  ) : (
                    <TbChevronDown size="1.25rem" />
                  )}
                </ActionIcon>
              </Group>
              <Collapse in={opened}>
                <Stack py={12} gap={4}>
                  <Text
                    fw={500}
                    component={Link}
                    href={`/blog`}
                    size="md"
                    tt="capitalize"
                    opacity={0.75}
                  >
                    All Blogs
                  </Text>
                  {categories?.length > 0
                    ? categories?.map((doc) => {
                        return (
                          <Text
                            // variant="gradient"
                            key={doc?.slug}
                            // gradient={{ from: "blue", to: "grape" }}
                            fw={500}
                            component={Link}
                            href={`/blog/${doc?.slug}`}
                            size="md"
                            tt="capitalize"
                            opacity={0.75}
                          >
                            {doc?.name}
                          </Text>
                        );
                      })
                    : "No category found"}
                </Stack>
              </Collapse>
            </Paper>
          </GridCol>

          {/* Search Section */}
          <GridCol span={{ base: 12, md: 3 }}>
            <TextInput
              size="md"
              placeholder="Search articles..."
              radius="md"
              value={searchValue}
              onChange={handleSearchChange}
              rightSection={<TbSearch size="1.25rem" color="#6c7aa0" />}
              styles={{
                input: {
                  backgroundColor: "#fff",
                  border: "1px solid #dee2e6",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.04)",
                  transition: "all 0.2s ease",
                },
                inputFocused: {
                  borderColor: "#2a367c",
                  boxShadow: "0 0 0 2px rgba(42,54,124,0.15)",
                },
              }}
            />
          </GridCol>
        </Grid>
      </Container>
    </Box>
  );
};

export default HomeBreadcrumb;
