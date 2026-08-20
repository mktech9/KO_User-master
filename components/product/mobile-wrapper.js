import { Container, Divider, Grid, GridCol, Space, Stack } from "@mantine/core";
import ImageGallery from "../common/gallery";
import Crumbs from "../common/breadcrumbs";
import Labels from "./details/labels";
import TitleSection from "./details/title";
import ContentsAndDetails from "./details/contents-and-details";
import PrintingAreaImages from "./related/printing-area";
import DetailsArray, {
  Description,
  MarketingSpace,
} from "./details/details-array";
import Items from "./related/items";
import PurchaseWrapper from "./purchase/wrapper";
import ReviewsWrapper from "./reviews";
import RelatedColors from "./related/colors";

const ProductDetailsWrapperMobile = ({
  product,
  colors,
  printOptions,
  marketing,
  related,
  labels,
  reseller,
  reviews,
  configs,
}) => {
  return (
    <>
      <Container mt={30} size={"xl"}>
        <Grid>
          <GridCol span={12}>
            <ImageGallery images={product?.images} />
          </GridCol>
          <GridCol span={12}>
            <Stack>
              <Labels />
              <TitleSection
                data={product}
                reseller={reseller}
                reviews={reviews}
                configs={configs}
              />
              <ContentsAndDetails data={product} />
            </Stack>
          </GridCol>
          <GridCol span={12}>
            <Space h={30} />
            <Stack>
              <PurchaseWrapper
                colors={colors}
                printOptions={printOptions}
                product={product}
                reseller={reseller}
                configs={configs}
              />
            </Stack>
          </GridCol>
          <GridCol span={12}>
            <Space h={30} />
            <Stack>
              <PrintingAreaImages
                download={product?.downloadableFile}
                document={product.document}
                printingArea={product.printingArea}
              />
              {product?.relatedProducts?.length > 0 && (
                <RelatedColors data={product} />
              )}
              <Divider my={20} />
              <DetailsArray data={product.details} />
              <Divider my={20} />
              <Stack gap={30}>
                <Description data={product?.descrp} />
              </Stack>
              <Divider my={20} />
              <MarketingSpace
                data={
                  marketing?.useHtmlCode
                    ? marketing?.htmlCode
                    : marketing?.contentBox
                }
              />
              <ReviewsWrapper reviews={reviews} />
              {related?.length > 0 && (
                <>
                  <Divider my={20} />
                  <Items
                    text={"Related Products"}
                    items={related}
                    reseller={reseller}
                  />
                </>
              )}
            </Stack>
          </GridCol>
        </Grid>
      </Container>
    </>
  );
};

export default ProductDetailsWrapperMobile;
