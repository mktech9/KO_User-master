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

const SectionCatalouge = ({ datas }) => {
  return (
    <>
      <Container size="xl">
        <SimpleGrid cols={{ base: 1, md: 6 }}>
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
        <Box bg="orange.0" w="100%" h={290} style={{ position: "relative" }}>
          <Image src={doc?.image} fill style={{ objectFit: "cover" }} />
        </Box>
        <Text fw={600} ta="center" size="sm" c="cyan" mih={50}>
          {doc.name}
        </Text>
        <Group wrap="nowrap" gap={4}>
          {doc?.flipBookLink && doc?.flipBookLink !== "" && (
            <Button
              mb={8}
              leftSection={<PiBook />}
              component={Link}
              href={`/catalogue/${encodeURIComponent(doc?.flipBookLink)}`}
              target="_blank"
              w="fit-content"
            >
              View
            </Button>
          )}
          <Button
            mb={8}
            leftSection={<PiDownloadFill />}
            component={Link}
            href={doc.link ?? "/"}
            target="_blank"
            w="fit-content"
          >
            Save
          </Button>
        </Group>
      </Stack>
    </>
  );
};

export default SectionCatalouge;
