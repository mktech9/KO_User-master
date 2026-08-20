import {
  Center,
  Divider,
  Grid,
  GridCol,
  Group,
  SimpleGrid,
  Stack,
  Text,
} from "@mantine/core";
import parser from "html-react-parser";

const ContentsAndDetails = ({ data }) => {
  return (
    <>
      <Text style={{ fontSize: 14 }} fw={500} opacity={0.9}>
        {parser(data?.shortDescrp ?? "")}
      </Text>
      <Grid align="stretch">
        <GridCol span={5.5}>
          <Stack gap={5}>
            <Text style={{ fontSize: 16 }} span fw={700} opacity={1}>
              In Box:
            </Text>
            <Text style={{ fontSize: 14 }} fw={500} opacity={0.9}>
              {data?.inBox}
            </Text>
          </Stack>
        </GridCol>
        <GridCol span={1}>
          <Center h={"100%"}>
            <Divider h={"100%"} orientation="vertical" />
          </Center>
        </GridCol>
        <GridCol span={5.5}>
          <Stack gap={5}>
            <Text style={{ fontSize: 16 }} span fw={700} opacity={1}>
              Materials:
            </Text>
            <Text style={{ fontSize: 14 }} fw={500} opacity={0.9}>
              {data?.material}
            </Text>
          </Stack>
        </GridCol>
      </Grid>
    </>
  );
};

export default ContentsAndDetails;
