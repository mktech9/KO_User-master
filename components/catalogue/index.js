import { Container, Divider, Group, Space, Text } from "@mantine/core";
import MainSection from "./main-section";
import SectionCatalouge from "./section-catalouge";

const Catalouge = ({ main, sections }) => {
  return (
    <>
      <Space h={32} />
      <MainSection datas={main} />
      <Space h={64} />
      <Container size="xl">
        <Group wrap="nowrap">
          <Text fw={850} style={{ fontSize: 34, lineHeight: 1.25 }} c="cyan">
            Section
            <br />
            Catalouge
          </Text>
          <Divider w="100%" />
        </Group>
      </Container>
      <Space h={32} />
      <SectionCatalouge datas={sections} />
      <Space h={32} />
    </>
  );
};

export default Catalouge;
