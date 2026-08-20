import { Space, Stack, Text } from "@mantine/core";
import Link from "next/link";

const FooterGroup = ({ data }) => {
  return (
    <>
      <Stack gap={0}>
        <Text fw={700} style={{ fontSize: 16 }} c={"#161616"}>
          {data?.title}
        </Text>
        <Space h={10} />
        {data?.items?.map((doc, i) => {
          return (
            <Text
              fw={500}
              c={"#161616"}
              opacity={0.7}
              style={{ fontSize: 14 }}
              component={Link}
              href={doc.link ?? "/"}
            >
              {doc.title}
            </Text>
          );
        })}
      </Stack>
    </>
  );
};

export default FooterGroup;
