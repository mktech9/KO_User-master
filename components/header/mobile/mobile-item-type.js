import {
  ActionIcon,
  Anchor,
  Box,
  Button,
  Collapse,
  Divider,
  Group,
  Space,
  Stack,
  Text,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { TbChevronRight, TbChevronUp } from "react-icons/tb";

const MobileItemType = ({ data, sub, setSelected, setSub, close }) => {
  let length = data?.length,
    all = data?.type === "all",
    item = data?.data,
    category = sub?.data;

  return (
    <>
      <Stack gap={0}>
        <Group
          pl={15}
          pr={17.5}
          pb={15}
          pt={15}
          bg={"#f4f4f4"}
          justify="space-between"
          onClick={() => {
            setSelected(null);
            setSub(null);
          }}
        >
          <Text fw={700} style={{ fontSize: 16, color: "rgb(22,22,22)" }}>
            {all ? "All Categories" : item?.title}
          </Text>
          <ActionIcon
            autoContrast
            color="rgb(22,22,22)"
            variant="transparent"
            size={"xs"}
          >
            <TbChevronUp />
          </ActionIcon>
        </Group>
        <Divider />
        <Group
          pl={15}
          pr={17.5}
          py={15}
          bg={"#f4f4f4"}
          justify="space-between"
          onClick={() => {
            setSub(null);
          }}
        >
          <Text fw={700} style={{ fontSize: 16, color: "rgb(22,22,22)" }}>
            {category?.name}
          </Text>
          <ActionIcon
            autoContrast
            color="rgb(22,22,22)"
            variant="transparent"
            size={"xs"}
          >
            <TbChevronUp />
          </ActionIcon>
        </Group>
        <Divider />
        <>
          {category?.subcategories?.map((doc, i) => {
            return (
              <>
                <Item
                  doc={doc}
                  key={i}
                  type="side"
                  category={category?.name}
                  link={`/${encodeURIComponent(
                    category?.name?.replace(/\s/g, "-")
                  )}/${encodeURIComponent(doc?.name?.replace(/\s/g, "-"))}`}
                  close={close}
                  // setItem={() => setSelected({ type: "side", data: doc })}
                />
                <Divider />
              </>
            );
          })}
        </>
        <Stack py={20} bg={"#f4f4f4"} align="center">
          <Box w={"70%"} h={400} style={{ position: "relative" }}>
            <Image src={category?.image ? category.image : "/"} fill />
          </Box>
          <Stack w={"70%"} align="center" gap={5}>
            <Text fw={500} size="sm">
              {category?.title}
            </Text>
            <Text fw={500} size="xs" ta={"center"} opacity={0.7}>
              {category?.subText}
            </Text>
            <Space h={10} />
            <Button
              autoContrast
              w={"fit-content"}
              component={Link}
              href={`/${encodeURIComponent(
                category?.name?.replace(/\s/g, "-")
              )}`}
            >
              Shop Now
            </Button>
            <Space h={20} />
          </Stack>
        </Stack>
      </Stack>
    </>
  );
};

const Item = ({ doc, link, category, close }) => {
  const router = useRouter();
  const [opened, { toggle }] = useDisclosure(false);

  return (
    <>
      <Group py={10} pl={15} pr={17.5} justify="space-between">
        <Anchor
          onClick={() => {
            router.push(link ?? "/");
            if (close) {
              close();
            }
          }}
          fw={500}
          style={{ fontSize: 14, color: "rgb(22,22,22)" }}
        >
          {doc?.name}
        </Anchor>
        <Group w={"40%"} justify="right" onClick={toggle}>
          <ActionIcon
            autoContrast
            color="rgb(22,22,22)"
            variant="transparent"
            size={"xs"}
          >
            {opened ? <TbChevronUp /> : <TbChevronRight />}
          </ActionIcon>
        </Group>
      </Group>
      <Collapse in={opened}>
        <Box w={"100%"} py={0} bg={"#f4f4f4"}>
          <Stack gap={0}>
            <Divider />
            {doc?.subtypes?.map((d, i) => {
              return (
                <>
                  <ItemSubTwo
                    doc={d}
                    key={i}
                    type="side"
                    link={`/${encodeURIComponent(
                      category?.replace(/\s/g, "-")
                    )}/${encodeURIComponent(
                      doc?.name?.replace(/\s/g, "-")
                    )}/${encodeURIComponent(d?.name?.replace(/\s/g, "-"))}`}
                    close={close}
                    // setItem={() => setSelected({ type: "side", data: doc })}
                  />
                  {doc?.subTypes?.length !== i + 1 && <Divider />}
                </>
              );
            })}
          </Stack>
        </Box>
      </Collapse>
    </>
  );
};

const ItemSubTwo = ({ doc, link, close }) => {
  const router = useRouter();

  return (
    <>
      <Group bg={"#fafafa"} py={10} pl={25} pr={27.5} justify="space-between">
        <Anchor
          onClick={() => {
            router.push(link ?? "/");
            if (close) {
              close();
            }
          }}
          fw={500}
          style={{ fontSize: 14, color: "rgb(22,22,22)" }}
        >
          {doc?.name}
        </Anchor>
        <Group w={"40%"} justify="right">
          <ActionIcon
            autoContrast
            color="rgb(22,22,22)"
            variant="transparent"
            size={"xs"}
          >
            <TbChevronRight />
          </ActionIcon>
        </Group>
      </Group>
    </>
  );
};

export default MobileItemType;
