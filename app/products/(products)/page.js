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

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  let configs = await SetLabel();
  global.configs = configs;

  return {
    title: "Browse Products",
    description:
      "Explore our diverse selection of stock items for customization.",
    robots: {
    index: true,
    googleBot: {
      index: true,
    },
  },viewport: {
      width: "device-width",
      initialScale: 1,
      maximumScale: 1,
    },
    icons: {
      icon: configs?.favicon,
      apple: configs?.logo_header,
    },
    openGraph: {
      title: "Browse Products",
      description:
        "Explore our diverse selection of stock items for customization.",
      url: `${configs?.url}/products`,
      siteName: configs?.siteName,
      images: [
        {
          url: configs?.logo_header,
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

const getTitle = async (subCategory, subType, searchParams) => {
  await connectMongo();
  let titleItem;

  let cateName = searchParams?.category;
  const categry = await Category.findOne({ name: cateName }).lean();

  if (subType) {
    titleItem = await SubType.findOne({ name: subType }).lean();
  } else if (subCategory) {
    titleItem = await SubCategory.findOne({ name: subCategory }).lean();
  } else {
    titleItem = categry;
  }

  return { titleItem, category: categry };
};

const Page = async ({ searchParams }) => {
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

  const totalCount = await getPaginatedCount(parameters, data, reseller);
  let titleData;

  if (parameters.isSingleCategory) {
    titleData = await getTitle(
      parameters?.subCategory[0],
      parameters?.subTypes[0],
      searchParams
    );
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
        />
      </Box>
      <Box hiddenFrom="md">
        <BrowseProductsMobile
          paramtrs={parameters}
          filters={data}
          count={totalCount}
          titleData={titleData}
          reseller={reseller}
        />
      </Box>
      <Space h={25} />
    </>
  );
};

export default Page;
