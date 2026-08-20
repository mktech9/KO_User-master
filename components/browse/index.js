import {
  BackgroundImage,
  Box,
  Container,
  Grid,
  GridCol,
  Stack,
} from "@mantine/core";
import SectionTitle from "./section-title";
import BrowseFilters from "./filters";
import SortingPagination from "./sorting-and-pagination";
import GetItems from "./loaders/get-items";
import parser from "html-react-parser";

const BrowseProducts = ({
  paramtrs,
  count,
  filters,
  titleData,
  reseller,
  seo,
  level,
  content,
}) => {
  return (
    <>
      <Box
        w={"100%"}
        h={200}
        mx="auto"
        bg={"#f4f4f4"}
        style={{ position: "relative" }}
      >
        <BackgroundImage
          h={"100%"}
          src={
            titleData && titleData?.category && titleData?.category?.image
              ? titleData?.category?.image
              : "/"
          }
        >
          <Box
            h={"100%"}
            style={{
              background:
                "linear-gradient(0deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.5) 100%)",
            }}
          >
            <Container h={"100%"} size={"xl"} py={30}>
              <SectionTitle
                paramtrs={paramtrs}
                titleData={titleData}
                seo={seo}
                level={level}
              />
            </Container>
          </Box>
        </BackgroundImage>
      </Box>
      <Container mt={"xl"} size={"xl"}>
        <Grid gutter={60}>
          <GridCol span={3}>
            <BrowseFilters
              data={filters}
              reseller={reseller}
              paramtrs={paramtrs}
              seo={seo}
            />
          </GridCol>
          <GridCol span={9}>
            <Stack gap={"xl"}>
              <SortingPagination count={count} />
              <GetItems
                paramtrs={paramtrs}
                count={count}
                filters={filters}
                reseller={reseller}
              />
              <SortingPagination noSort count={count} />
            </Stack>
            {content && <Box mt={32}>{parser(content)}</Box>}
          </GridCol>
        </Grid>
      </Container>
    </>
  );
};

export default BrowseProducts;
