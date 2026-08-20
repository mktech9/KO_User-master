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

const ProductDetailsWrapper = ({
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
        <Crumbs
          data={[
            { title: "Home", href: "/" },
            {
              title: "Products",
              href: "/products",
            },
            {
              title: product?.name,
              href: "/",
              current: true,
            },
          ]}
        />
        <Grid mt={30} gutter={40} align="stretch">
          <GridCol span={7}>
            <Stack gap={30}>
              <ImageGallery images={product?.images} />
              <PrintingAreaImages
                download={product?.downloadableFile}
                document={product?.document}
                printingArea={product?.printingArea}
              />
              {product?.relatedProducts?.length > 0 && (
                <RelatedColors data={product} />
              )}
              <Divider />
              <DetailsArray data={product.details} />
            </Stack>
          </GridCol>
          <GridCol span={5}>
            <Stack gap={15}>
              <Labels data={product?.fLabel} />
              <TitleSection
                data={product}
                reseller={reseller}
                reviews={reviews}
                configs={configs}
              />
              <ContentsAndDetails data={product} />
              <Space />
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
            <Divider />
          </GridCol>
          <GridCol span={7}>
            <Stack gap={30}>
              <Description data={product?.descrp} />
            </Stack>
          </GridCol>
          <GridCol span={5}>
            <MarketingSpace
              data={
                marketing?.useHtmlCode
                  ? marketing?.htmlCode
                  : marketing?.contentBox
              }
            />
          </GridCol>
          <ReviewsWrapper reviews={reviews} data={product} />
          {related?.length > 0 && (
            <>
              <GridCol span={12}>
                <Divider />
              </GridCol>
              <GridCol span={12}>
                <Items
                  text={"Related Products"}
                  items={related}
                  reseller={reseller}
                />
              </GridCol>
            </>
          )}
          {labels?.length > 0 && (
            <>
              <GridCol span={12}>
                <Divider />
              </GridCol>
              <GridCol span={12}>
                <Items
                  text={"Bestseller Products"}
                  items={labels}
                  reseller={reseller}
                />
              </GridCol>
            </>
          )}
        </Grid>
      </Container>
    </>
  );
};

export default ProductDetailsWrapper;
