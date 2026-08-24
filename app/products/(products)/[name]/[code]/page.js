import { SetLabel } from "@/app/labels-async";
import { checkIsAuthValid } from "@/auth";
import ProductDetailsWrapperMobile from "@/components/product/mobile-wrapper";
import ProductDetailsWrapper from "@/components/product/wrapper";
import { GetMarketingSpot, GetRelatedProducts } from "@/libs/browse-products";
import { CheckIsReseller } from "@/libs/manage-user";
import { GetReviews, GetSingleProductByCode } from "@/libs/view-product";
import { Box, Space } from "@mantine/core";
import { notFound } from "next/navigation";
import Script from "next/script";

export const revalidate = 600;

export async function generateMetadata({ params }) {
  let configs = await SetLabel();
  global.configs = configs;
  const productData = await GetSingleProductByCode(params.code, configs);
  const product = productData?.product;

  return {
    title: product?.meta?.title ? product?.meta?.title : product?.name,
    description: product?.meta?.description
      ? product?.meta?.description
      : `${product?.brand ?? ""} (${product?.code ?? ""})`,
    robots: {
      index: true,
      googleBot: {
        index: true,
      },
    },
    viewport: {
      width: "device-width",
      initialScale: 1,
      maximumScale: 1,
    },
    icons: {
      icon: configs?.favicon,
      apple: configs?.logo_header,
    },
    openGraph: {
      title: product?.meta?.title ? product?.meta?.title : product?.name,
      description: product?.meta?.description
        ? product?.meta?.description
        : `${product?.brand ?? ""} (${product?.code ?? ""})`,
      // url: `${configs?.url}/products/${product?._id}`,
      url: `https://www.kross-over.net/products/${encodeURIComponent(
  product?.name?.replace(/\s/g, "-")
)}/${encodeURIComponent(product?.code)}`,
      siteName: configs?.siteName,
      images: product?.images?.map((doc) => {
        return {
          url: doc?.publicUrl,
          width: 800,
          height: 600,
        };
      }),
      locale: "en_AE",
      type: "website",
    },
    facebook: {
      admins: "krossovergifts",
    },
    twitter: {
      creator: "krossovergifts",
    },
  };
}

const Page = async ({ params }) => {
  let configs = await SetLabel();
  global.configs = configs;

  const isAuth = await checkIsAuthValid();
  let reseller = false;
  if (isAuth) {
    reseller = await CheckIsReseller();
  }

  const [productResult, marketing] = await Promise.all([
    GetSingleProductByCode(params.code, configs, reseller),
    GetMarketingSpot(),
  ]);

  const product = productResult?.product;
  const colors = productResult?.colors ?? [];
  const printOptions = productResult?.printOptions ?? {};

  if (!product) {
    notFound();
  }

  const reviews = await GetReviews(product?._id);

  const { related, label } = await GetRelatedProducts(
    product.category,
    product.sub,
    product.subType,
    product.fLabel,
    product._id,
    configs,
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org/",
            "@type": "Product",

            name: product?.name || "",

            image: product?.images?.[0]?.publicUrl || "",

            description: product?.shortDescrp || "",

            sku: product?.code || "",

            offers: {
              "@type": "Offer",
              price: Number(
                reseller ? product?.b2bPrice : product?.price,
              ).toFixed(2),
              priceCurrency: "AED",
              availability:
                product?.qty > 0
                  ? "https://schema.org/InStock"
                  : "https://schema.org/OutOfStock",
            },

            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: reviews?.totalRating > 0 ? reviews.totalRating : 5,
              bestRating: "5",
              worstRating: "5",
              ratingCount: reviews?.length > 0 ? reviews.length : 1,
            },
          }),
        }}
      />
      <Box visibleFrom="md">
        <ProductDetailsWrapper
          product={product}
          colors={colors}
          printOptions={printOptions}
          marketing={marketing}
          related={related}
          labels={label}
          reseller={reseller}
          reviews={reviews}
          configs={configs}
        />
      </Box>
      <Box hiddenFrom="md">
        <ProductDetailsWrapperMobile
          product={product}
          colors={colors}
          printOptions={printOptions}
          marketing={marketing}
          related={related}
          labels={label}
          reseller={reseller}
          reviews={reviews}
          configs={configs}
        />
      </Box>
      <Space h={25} />
    </>
  );
};

export default Page;
