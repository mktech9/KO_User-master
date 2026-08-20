import {
  Box,
  Button,
  Container,
  Group,
  SimpleGrid,
  Stack,
  Text,
} from "@mantine/core";
import Image from "next/image";
import Link from "next/link";
import { PiBook, PiDownloadFill } from "react-icons/pi";

const MainSection = ({ datas }) => {
  return (
    <>
      <Container size="xl">
        <SimpleGrid cols={{ base: 1, md: 3 }}>
          {datas?.map((doc) => {
            return <Item doc={doc} key={doc._id} />;
          })}
        </SimpleGrid>
      </Container>
    </>
  );
};

const Item = ({ doc }) => {
  return (
    <>
      <Stack align="center">
        <Box w="100%" h={290} style={{ position: "relative" }}>
          <Image src={doc?.image} fill style={{ objectFit: "contain" }} />
        </Box>
        <Text fw={700} ta="center" size="lg" c="cyan">
          {doc.name}
        </Text>
        <Group wrap="nowrap" gap={4}>
          {doc?.flipBookLink && doc?.flipBookLink !== "" && (
            <Button
              leftSection={<PiBook />}
              component={Link}
              href={`/catalogue/${encodeURIComponent(doc?.flipBookLink)}`}
              target="_blank"
              w="fit-content"
              size="md"
            >
              View
            </Button>
          )}
          <Button
            leftSection={<PiDownloadFill />}
            component={Link}
            href={doc.link ?? "/"}
            target="_blank"
            w="fit-content"
            size="md"
          >
            Save
          </Button>
        </Group>
      </Stack>
    </>
  );
};

export default MainSection;
