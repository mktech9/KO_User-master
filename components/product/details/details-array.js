import { Box, Divider, SimpleGrid, Stack, Text } from "@mantine/core";
import parser from "html-react-parser";

const DetailsArray = ({ data }) => {
  return (
    <>
      <Stack gap={12}>
        <SimpleGrid spacing={0} cols={{ base: 2, md: 4 }}>
          {data?.slice(0, 4).map((doc, i) => {
            return <Item doc={doc} key={i} />;
          })}
        </SimpleGrid>
        {data?.length > 4 && (
          <>
            <Divider m={0} />
            <SimpleGrid spacing={0} cols={{ base: 2, md: 4 }}>
              {data?.slice(4, data?.length).map((doc, i) => {
                return <Item doc={doc} key={i} />;
              })}
            </SimpleGrid>
          </>
        )}
      </Stack>
    </>
  );
};

export const Description = ({ data }) => {
  return (
    <>
      <Stack gap={5}>
        <Text style={{ fontSize: 16 }} span fw={700} opacity={1}>
          Product Description:
        </Text>
        <Box maw="100%" w="100%" style={{ overflowX: "hidden" }}>
          {parser(data ?? "")}
        </Box>
      </Stack>
    </>
  );
};

export const MarketingSpace = ({ data }) => {
  return (
    <>
      <Box>{parser(data ?? "")}</Box>
    </>
  );
};

const Item = ({ doc }) => {
  return (
    <>
      <Stack gap={12}>
        <Text style={{ fontSize: 14 }} span fw={700} opacity={0.7}>
          {doc.title}:
        </Text>
        <Divider />
        <Text style={{ fontSize: 14 }} fw={500}>
          {doc.value}
        </Text>
      </Stack>
    </>
  );
};

export default DetailsArray;
