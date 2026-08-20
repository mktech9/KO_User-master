import { Box, Image } from "@mantine/core";

const ImageMover = ({ image, onClick }) => {
  return (
    <Box w={"100%"} h={"100%"} onClick={onClick}>
      <Image src={image} fit="contain" />
    </Box>
  );
};

export default ImageMover;
