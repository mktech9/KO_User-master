"use client";

import { useEffect, useState } from "react";
import Pusher from "pusher-js";
import {
  Container,
  Divider,
  Grid,
  GridCol,
  Space,
  Stack,
} from "@mantine/core";

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
  product: initialProduct,
  colors,
  printOptions,
  marketing,
  related,
  labels,
  reseller,
  reviews,
  configs,
}) => {
 

  const [product, setProduct] = useState(initialProduct);

 

  useEffect(() => {
    setProduct(initialProduct);
  }, [initialProduct]);



  useEffect(() => {
    if (!initialProduct?.code) {
      return;
    }

    console.log(
      "🚀 Starting Pusher for product:",
      initialProduct.code
    );

    Pusher.logToConsole = true;

    const pusher = new Pusher(
      process.env.NEXT_PUBLIC_PUSHER_KEY,
      {
        cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER,
        forceTLS: true,
      }
    );


    pusher.connection.bind("state_change", (states) => {
      console.log("PRODUCT DETAILS PUSHER STATE:", states);
    });

    pusher.connection.bind("error", (error) => {
      console.error(
        "PRODUCT DETAILS PUSHER ERROR:",
        error
      );
    });


    const channel = pusher.subscribe("products");

    channel.bind(
      "pusher:subscription_succeeded",
      () => {
        console.log(
          "✅ PRODUCT DETAILS SUBSCRIBED TO PRODUCTS"
        );
      }
    );

   

    channel.bind("product-updated", async (event) => {
      console.log(
        "🔥 PRODUCT DETAILS UPDATE EVENT:",
        event
      );

      const code = event?.code;

      if (!code) {
        console.log(
          "⚠️ Product update event does not contain code"
        );
        return;
      }

   

      if (code !== initialProduct?.code) {
        console.log(
          "ℹ️ Update belongs to another product:",
          code
        );

        return;
      }

      try {
        console.log(
          "🔄 Fetching latest product:",
          code
        );

        const response = await fetch(
          `/api/products/${encodeURIComponent(code)}`,
          {
            cache: "no-store",
          }
        );

        if (!response.ok) {
          console.error(
            "❌ Failed to fetch updated product:",
            response.status
          );

          return;
        }

        const updatedProduct = await response.json();

        console.log(
          "✅ LATEST PRODUCT:",
          updatedProduct
        );


        setProduct((currentProduct) => ({
          ...currentProduct,
          ...updatedProduct,
        }));
      } catch (error) {
        console.error(
          "❌ Realtime product refresh error:",
          error
        );
      }
    });



    return () => {
      console.log(
        "🧹 Cleaning up product Pusher connection"
      );

      channel.unbind_all();

      pusher.unsubscribe("products");

      pusher.disconnect();
    };
  }, [initialProduct?.code]);


  return (
    <>
      <Container mt={30} size="xl">
        {/* Breadcrumbs */}
        <Crumbs
          data={[
            {
              title: "Home",
              href: "/",
            },
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

        <Grid
          mt={30}
          gutter={40}
          align="stretch"
        >
          {/* ==========================================
              LEFT SIDE
              ========================================== */}

          <GridCol span={7}>
            <Stack gap={30}>
              {/* Product Images */}

              <ImageGallery
                images={product?.images}
              />

              {/* Printing Area */}

              <PrintingAreaImages
                download={product?.downloadableFile}
                document={product?.document}
                printingArea={product?.printingArea}
              />

              {/* Related Colors */}

              {product?.relatedProducts?.length > 0 && (
                <RelatedColors
                  data={product}
                />
              )}

              <Divider />

              {/* Product Details */}

              <DetailsArray
                data={product?.details}
              />
            </Stack>
          </GridCol>

          {/* ==========================================
              RIGHT SIDE
              ========================================== */}

          <GridCol span={5}>
            <Stack gap={15}>
              {/* Product Labels */}

              <Labels
                data={product?.fLabel}
              />

              {/* Product Name / Price / Rating */}

              <TitleSection
                data={product}
                reseller={reseller}
                reviews={reviews}
                configs={configs}
              />

              {/* Product Content */}

              <ContentsAndDetails
                data={product}
              />

              <Space />

              {/* Purchase Section */}

              <PurchaseWrapper
                colors={colors}
                printOptions={printOptions}
                product={product}
                reseller={reseller}
                configs={configs}
              />
            </Stack>
          </GridCol>

          {/* ==========================================
              DESCRIPTION
              ========================================== */}

          <GridCol span={12}>
            <Divider />
          </GridCol>

          <GridCol span={7}>
            <Stack gap={30}>
              <Description
                data={product?.descrp}
              />
            </Stack>
          </GridCol>

          {/* ==========================================
              MARKETING
              ========================================== */}

          <GridCol span={5}>
            <MarketingSpace
              data={
                marketing?.useHtmlCode
                  ? marketing?.htmlCode
                  : marketing?.contentBox
              }
            />
          </GridCol>

          {/* ==========================================
              REVIEWS
              ========================================== */}

          <ReviewsWrapper
            reviews={reviews}
            data={product}
          />

          {/* ==========================================
              RELATED PRODUCTS
              ========================================== */}

          {related?.length > 0 && (
            <>
              <GridCol span={12}>
                <Divider />
              </GridCol>

              <GridCol span={12}>
                <Items
                  text="Related Products"
                  items={related}
                  reseller={reseller}
                />
              </GridCol>
            </>
          )}

          {/* ==========================================
              BESTSELLER PRODUCTS
              ========================================== */}

          {labels?.length > 0 && (
            <>
              <GridCol span={12}>
                <Divider />
              </GridCol>

              <GridCol span={12}>
                <Items
                  text="Bestseller Products"
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