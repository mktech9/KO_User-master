import connectMongo from "@/utils/mongoose";
import HomeLayout from "@/utils/mongo-models/home-layout";
import Product from "@/utils/mongo-models/product";

import { Box, Stack } from "@mantine/core";
import FullScreenSlider from "./components/full-screen-slider";
import Banner from "./components/banner";
import ItemsSlider from "./components/product-slider";
import ProductsSlider from "./components/items-slider";
import PopupModal from "../common/popup-modal";

// Optimized data fetching with field selection and proper error handling
const getData = async (type) => {
  try {
    await connectMongo();

    const data = await HomeLayout.findOne({
      website: process.env.website ?? "default",
      layoutType: type,
    })
      .select("desktop mobile showPopup popup")
      .populate([
        {
          path: "desktop.products",
          select:
            "_id name price b2bPrice qty code images fLabel brand colors disabledFor isActive active qtyActive stockText originalPrice originalPriceB2b", // Select only necessary fields
        },
        {
          path: "mobile.products",
          select:
            "_id name price b2bPrice qty code images fLabel brand colors disabledFor isActive active qtyActive stockText originalPrice originalPriceB2b",
        },
      ])
      .lean();

    return {
      desktop: data?.desktop ?? [],
      mobile: data?.mobile ?? [],
      showPopup: data?.showPopup,
      popup: data?.popup,
    };
  } catch (err) {
    console.error("Error fetching home layout data:", err);
    return {
      desktop: [],
      mobile: [],
      showPopup: false,
      popup: null,
    };
  }
};

// Unified section renderer to reduce code duplication
const renderSections = (sections, isDesktop, reseller, configs) => {
  return sections.map((doc) => {
    const commonProps = {
      height: doc.height,
      desktop: isDesktop,
      fullWidth: doc.fullscreen,
      data: doc,
      key: doc._id, // Use unique identifier from data
      reseller: reseller,
      title: doc.title,
      subText: doc.subText,
      configs: configs,
    };

    switch (doc.type) {
      case "carousel-slider":
        return <FullScreenSlider {...commonProps} />;
      case "banner":
        return <Banner {...commonProps} />;
      case "items-slider":
        return <ItemsSlider {...commonProps} />;
      case "products-slider":
        return <ProductsSlider {...commonProps} />;
      default:
        return null;
    }
  });
};

const HomeWrapper = async ({ reseller, isAuth, configs }) => {
  let type = reseller ? "b2b" : isAuth ? "b2c" : "login";
  const data = await getData(type);

  return (
    <>
      <Box visibleFrom="md">
        <Stack gap={12}>
          {renderSections(data.desktop, true, reseller, configs)}
        </Stack>
      </Box>
      <Box hiddenFrom="md">
        <Stack gap={12}>
          {renderSections(data.mobile, false, reseller, configs)}
        </Stack>
      </Box>
      <PopupModal popupShow={data?.showPopup} image={data?.popup} />
    </>
  );
};

export default HomeWrapper;
