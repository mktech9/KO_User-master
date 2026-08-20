import GetHeaderData from "@/libs/get-header-data";
import DesktopHeader from "./desktop";
import { Box } from "@mantine/core";
import MobileHeader from "./mobile/mobile-header";

const Header = async () => {
  const data = await GetHeaderData();

  return (
    <>
      <Box w={"100%"} visibleFrom="md">
        <DesktopHeader data={data} />
      </Box>
      <Box w={"100%"} hiddenFrom="md" >
        <MobileHeader data={data} />
      </Box>
    </>
  );
};

export default Header;
