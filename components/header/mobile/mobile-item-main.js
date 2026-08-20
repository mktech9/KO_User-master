import { ActionIcon, Anchor, Divider, Group, Stack } from "@mantine/core";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { TbChevronRight } from "react-icons/tb";

const MobileItemMain = ({ data, setSelected, close }) => {
  const router = useRouter();
  let length = data?.length;

  return (
    <>
      <Stack gap={5} py={5}>
        <Group
          py={7.5}
          pl={15}
          pr={17.5}
          justify="space-between"
          onClick={() => {
            if (close) {
              close();
            }
            router.push("/");
          }}
        >
          <Anchor fw={500} style={{ fontSize: 14, color: "rgb(22,22,22)" }}>
            Home
          </Anchor>
          <ActionIcon
            autoContrast
            color="rgb(22,22,22)"
            variant="transparent"
            size={"xs"}
          >
            <TbChevronRight />
          </ActionIcon>
        </Group>
        <Divider />
        <Item
          doc={{ title: "All Categories", link: "/products" }}
          type="all"
          setItem={() => setSelected({ type: "all", data: data?.categories })}
        />
        <Divider />

        {data?.others?.map((doc, i) => {
          return (
            <>
              <Item
                doc={doc}
                key={i}
                type="side"
                setItem={() => setSelected({ type: "side", data: doc })}
                close={close}
              />
              {length !== i + 1 && <Divider />}
            </>
          );
        })}
      </Stack>
    </>
  );
};

const Item = ({ doc, type, setItem, close }) => {
  const router = useRouter();

  return (
    <>
      <Group py={7.5} pl={15} pr={17.5} justify="space-between">
        <Anchor
          fw={500}
          style={{ fontSize: 14, color: "rgb(22,22,22)" }}
          // href={doc?.link ?? "/"}
          onClick={() => {
            if (close) {
              close();
            }
            router.push(doc?.link ?? "/");
          }}
        >
          {doc?.title}
        </Anchor>
        <Group w={"40%"} justify="right" onClick={setItem}>
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

export default MobileItemMain;
