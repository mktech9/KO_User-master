import { SetLabel } from "@/app/labels-async";
import { checkIsAuthValid } from "@/auth";
import BrowseProducts from "@/components/browse";
import BrowseProductsMobile from "@/components/browse/mobile";
import { getBrowseFiltersData } from "@/libs/browse-products";
import {
  getPaginatedCount,
  getQueryParameters,
} from "@/libs/get-paginated-product";
import { CheckIsReseller } from "@/libs/manage-user";
import Category from "@/utils/mongo-models/category";
import SubCategory from "@/utils/mongo-models/subCategory";
import SubType from "@/utils/mongo-models/subTypes";
import connectMongo from "@/utils/mongoose";
import { Box, Space } from "@mantine/core";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  let configs = await SetLabel();
  global.configs = configs;

  //get category
  let cate = decodeURIComponent(params?.category?.replace(/-/g, " "));
  const category = await Category.findOne({ name: cate });

  return {
    title: category?.title,
    description: category?.subText,
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
      title: category?.title,
      description: category?.subText,
      url: `${configs?.url}/${params?.category}`,
      siteName: configs?.siteName,
      images: [
        {
          url: category?.image,
          width: 800,
          height: 600,
        },
      ],
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

const getTitle = async (subCategory, subType, category) => {
  await connectMongo();
  let titleItem;

  const categry = category;

  if (subType) {
    titleItem = await SubType.findOne({ name: subType }).lean();
  } else if (subCategory) {
    titleItem = await SubCategory.findOne({ name: subCategory }).lean();
  } else {
    titleItem = categry;
  }

  return { titleItem, category: categry };
};

const Page = async ({ params, searchParams }) => {
  let configs = await SetLabel();
  global.configs = configs;

  const isAuth = await checkIsAuthValid();
  console.log("ATUH => ", isAuth);
  let reseller = false;
  if (isAuth) {
    reseller = await CheckIsReseller();
  }

  const data = await getBrowseFiltersData();
  let parameters = await getQueryParameters(searchParams);

  let cate = decodeURIComponent(params?.category?.replace(/-/g, " "));

  //get category
  const category = await Category.findOne({ name: cate });

  if (!category) {
    redirect("/products");
  }

  parameters.category = [cate];
  parameters.isSingleCategory = true;
  parameters.seo = "category";
  parameters.isSeoPage = true;

  // if (sub) {
  //   parameters.subCategory = [sub];
  //   parameters.seo = "subcategory";
  // }

  // if (subType) {
  //   parameters.subTypes = [subType];
  //   parameters.seo = "subtype";
  // }

  const totalCount = await getPaginatedCount(parameters, data, reseller);
  let titleData;

  if (parameters.isSingleCategory) {
    titleData = await getTitle(null, null, category);
  }

  return (
    <>
      <Box visibleFrom="md">
        <BrowseProducts
          paramtrs={parameters}
          filters={data}
          count={totalCount}
          titleData={titleData}
          reseller={reseller}
          seo
          level={1}
          content={titleData.titleItem?.content || ""}
        />
      </Box>
      <Box hiddenFrom="md">
        <BrowseProductsMobile
          paramtrs={parameters}
          filters={data}
          count={totalCount}
          titleData={titleData}
          reseller={reseller}
          seo
          level={1}
          content={titleData.titleItem?.content || ""}
        />
      </Box>
      <Space h={25} />
    </>
  );
};

export default Page;
