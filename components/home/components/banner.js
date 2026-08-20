import { Box, Container, Image } from "@mantine/core";
import Link from "next/link";

const Banner = ({ height, fullWidth, data }) => {
  const item = (
    <Box component={Link} href={data?.link ?? "/"}>
      <Image
        w="100%"
        src={data.image}
        fill
        style={{ objectFit: "contain" }}
        alt={data?.imageAlt ?? ""}
        title={data?.imageAlt ?? ""}
      />
    </Box>
  );

  if (fullWidth) {
    return item;
  }

  return (
    <Container w={"100%"} size={"xl"}>
      {item}
    </Container>
  );
};

export default Banner;
