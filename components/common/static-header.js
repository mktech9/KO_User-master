import { Container, Stack, Text } from "@mantine/core";
import Crumbs from "./breadcrumbs";

const StaticHeader = ({ title, data }) => {
  return (
    <>
      <Container mt={30} size={"xl"}>
        <Stack gap={5}>
          <Crumbs
            data={[
              { title: "Home", href: "/" },
              {
                title: title,
                href: `/page/${data}`,
                current: true,
              },
            ]}
          />
          <Text fw={700} style={{ fontSize: 25 }}>
            {title}
          </Text>
        </Stack>
      </Container>
    </>
  );
};

export default StaticHeader;
