import {
  BackgroundImage,
  Box,
  Container,
  Grid,
  GridCol,
  Stack,
} from "@mantine/core";
import SectionTitle from "./section-title";
import SortingPagination from "./sorting-and-pagination";
import GetItems from "./loaders/get-items";
import MobileSorting from "./sorting-and-pagination/mobile-sorting";
import parser from "html-react-parser";

const BrowseProductsMobile = ({
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
        h={"auto"}
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
        <Grid gutter={0}>
          {/* <GridCol span={3}>
            <BrowseFilters data={filters} />
          </GridCol> */}
          <GridCol span={12}>
            <Stack gap={"xl"}>
              {/* <Crumbs /> */}
              <Stack gap={0}>
                <MobileSorting
                  data={filters}
                  paramtrs={paramtrs}
                  reseller={reseller}
                  seo={seo}
                />
                <SortingPagination count={count} />
              </Stack>
              <GetItems
                paramtrs={paramtrs}
                count={count}
                filters={filters}
                reseller={reseller}
              />
              <SortingPagination noSort count={count} />
            </Stack>
          </GridCol>
          {content && (
            <>
              <GridCol span={12} mt={20}>{parser(content)}</GridCol>
            </>
          )}
        </Grid>
      </Container>
    </>
  );
};

export default BrowseProductsMobile;
