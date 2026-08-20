import {
  Divider,
  Grid,
  GridCol,
  Group,
  Progress,
  SimpleGrid,
  Stack,
  Text,
  ThemeIcon,
} from "@mantine/core";
import { PiStarFill } from "react-icons/pi";
import ReviewModal from "./review-modal";

const ReviewsHeader = ({ reviews, data }) => {
  return (
    <>
      <Grid>
        <GridCol span={{ base: 4, md: 1.5 }}>
          <Stack justify="center" gap={0} align="center">
            <Group gap={4} visibleFrom="md">
              <Text fw={700} style={{ fontSize: 34 }}>
                {reviews?.totalRating > 0 ? reviews?.totalRating : 0}
              </Text>
              <ThemeIcon variant="transparent" size="2rem">
                <PiStarFill size="2rem" />
              </ThemeIcon>
            </Group>
            <Group gap={0} hiddenFrom="md">
              <Text fw={700} style={{ fontSize: 24 }}>
                {reviews?.totalRating > 0 ? reviews?.totalRating : 0}
              </Text>
              <ThemeIcon variant="transparent" size="2rem">
                <PiStarFill size="1.5rem" />
              </ThemeIcon>
            </Group>
            <Text fw={500} size="sm" opacity={0.7}>
              {reviews?.length > 1
                ? `${reviews?.length} Reviews`
                : reviews?.length === 1
                ? "1 Review"
                : "No reviews yet"}
            </Text>
          </Stack>
          <ReviewModal product={data} />
        </GridCol>
        <GridCol span={{ base: 1, md: 0.3 }}>
          <Divider h="100%" orientation="vertical" />
        </GridCol>
        <GridCol span={{ base: 6, md: 2 }}>
          <Stack gap={4}>
            <ProgressBar
              text={5}
              reviews={reviews?.grouped?.five}
              value={(reviews?.grouped?.five / reviews?.length) * 100}
              color="green"
            />
            <ProgressBar
              text={4}
              reviews={reviews?.grouped?.four}
              value={(reviews?.grouped?.four / reviews?.length) * 100}
              color="green"
            />
            <ProgressBar
              text={3}
              reviews={reviews?.grouped?.three}
              value={(reviews?.grouped?.three / reviews?.length) * 100}
              color="lime"
            />
            <ProgressBar
              text={2}
              reviews={reviews?.grouped?.two}
              value={(reviews?.grouped?.two / reviews?.length) * 100}
              color="orange"
            />
            <ProgressBar
              text={1}
              reviews={reviews?.grouped?.one}
              value={(reviews?.grouped?.one / reviews?.length) * 100}
              color="red"
            />
          </Stack>
        </GridCol>
      </Grid>
    </>
  );
};

const ProgressBar = ({ text, reviews, value, color }) => {
  return (
    <Group wrap="nowrap" gap={8}>
      <Group wrap="nowrap" gap={4}>
        <Text size="sm" fw={500} opacity={0.7} miw={10}>
          {text}
        </Text>
        <ThemeIcon variant="transparent" size="1rem" color="gray">
          <PiStarFill size="1rem" />
        </ThemeIcon>
      </Group>
      <Progress w="100%" color={color} value={value} />
      <Text size="sm" fw={500} opacity={0.7} miw={10}>
        {reviews}
      </Text>
    </Group>
  );
};

export default ReviewsHeader;
