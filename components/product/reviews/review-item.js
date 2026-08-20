import { Group, Paper, Text, ThemeIcon } from "@mantine/core";
import moment from "moment";
import { PiStarFill } from "react-icons/pi";

const ReviewItem = ({ doc }) => {
  return (
    <>
      <Paper withBorder p="sm" radius={"md"} h="100%">
        <div>
          <Group justify="space-between">
            <div>
              <Text size="sm" fw={500}>
                {doc?.userId?.name}
              </Text>
              <Text size="sm" fw={500} c="dimmed">
                {moment(doc?.createdAt).fromNow()}
              </Text>
            </div>
            <Paper withBorder px={12} py={4}>
              <Group gap={4} wrap="nowrap">
                <Text fw={600} style={{ fontSize: 14 }}>
                  {doc?.rating}
                </Text>
                <ThemeIcon variant="transparent" size="1rem">
                  <PiStarFill size="1rem" />
                </ThemeIcon>
              </Group>
            </Paper>
          </Group>
          <Text pt="sm" size="sm" fw={500}>
            {doc?.review}
          </Text>
        </div>
      </Paper>
    </>
  );
};

export default ReviewItem;
