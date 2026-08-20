import { Box, Container, Text, Title } from "@mantine/core";
import { inter } from "../local_font";

const CategorySection = ({ data, current_category }) => {
  return (
    <Box
      pos="relative"
      style={{
        background: `linear-gradient(90deg, #2a367c, #65cbf4)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        padding: "clamp(64px, 5vw, 128px) 0",
      }}
    >
      <Container
        size="xl"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          gap: 24,
        }}
      >
        {/* Title */}
        <Title
          className={inter.className}
          c="#fff"
          fw={800}
          style={{
            fontSize: "clamp(32px, 6vw, 64px)",
            lineHeight: 1.15,
            maxWidth: "min(60ch, 90%)",
            textShadow: "0 4px 24px rgba(0,0,0,0.25)",
            letterSpacing: "-0.02em",
          }}
          tt="capitalize"
        >
          {data}
        </Title>

        {/* Optional subtext for elegance */}
        <Text
          // size="lg"
          c="rgba(255,255,255,0.85)"
          style={{
            maxWidth: "min(60ch, 90%)",
            fontWeight: 400,
            lineHeight: 1.6,
            fontSize: "clamp(15px, 2.5vw, 20px)",
          }}
        >
          {current_category?.details}
        </Text>
      </Container>
    </Box>
  );
};

export default CategorySection;
