import {
  Box,
  Container,
  Paper,
  Text,
  Title,
  UnstyledButton,
} from "@mantine/core";
import { inter } from "../local_font";
import Link from "next/link";

const LatestSection = ({ data }) => {
  const image = data?.coverImage && data?.coverImage[0];

  return (
    <UnstyledButton
      component={Link}
      href={`/blog/${data?.category}/${data?.slug}`}
    >
      <Box
        pos="relative"
        style={{
          backgroundImage: `linear-gradient(rgba(10,10,10,0.65), rgba(10,10,10,0.35)), url('${image}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          padding: "clamp(48px, 8vw, 128px) 0",
        }}
      >
        <Container
          size="xl"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: "clamp(16px, 3vw, 32px)",
            // paddingInline: "clamp(16px, 5vw, 64px)",
            textAlign: "left",
          }}
        >
          {/* Tag */}
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
              Latest
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
              Latest
            </Text>
          </Paper>
          {/* Title */}
          <Title
            mt={{ base: 12, md: 0 }}
            className={inter.className}
            c="#fff"
            fw={800}
            style={{
              fontSize: "clamp(32px, 6vw, 64px)",
              lineHeight: 1.15,
              maxWidth: "min(70ch, 100%)",
              textShadow: "0 4px 24px rgba(0,0,0,0.25)",
              letterSpacing: "-0.015em",
            }}
            // visibleFrom="md"
          >
            {data.title}
          </Title>

          {/* Excerpt */}
          {data?.excerpt && (
            <Text
              size="md"
              c="rgba(255,255,255,0.88)"
              style={{
                maxWidth: "min(65ch, 100%)",
                fontWeight: 400,
                lineHeight: 1.65,
                fontSize: "clamp(15px, 2.5vw, 20px)",
              }}
            >
              {data.excerpt}
            </Text>
          )}
        </Container>
      </Box>
    </UnstyledButton>
  );
};

export default LatestSection;
