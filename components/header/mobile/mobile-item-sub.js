import { ActionIcon, Anchor, Divider, Group, Stack, Text } from "@mantine/core";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { TbChevronRight, TbChevronUp } from "react-icons/tb";

const MobileItemSub = ({ data, setSelected, setSub, close }) => {
  let length = data?.length,
    all = data?.type === "all",
    item = data?.data;

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
        {!all && (
          <>
            {item?.items?.map((doc, i) => {
              return (
                <>
                  <Item
                    doc={doc}
                    key={i}
                    type="side"
                    close={close}
                    // setItem={() => setSelected({ type: "side", data: doc })}
                  />
                  {length !== i + 1 && <Divider />}
                </>
              );
            })}
          </>
        )}
        {all && (
          <>
            {item?.map((doc, i) => {
              if (doc._id) {
                return (
                  <>
                    <ItemAll
                      doc={doc}
                      key={i}
                      type="side"
                      link={`/${encodeURIComponent(
                        doc?.name?.replace(/\s/g, "-")
                      )}`}
                      setItem={() => setSub({ type: "sub", data: doc })}
                      close={close}
                    />
                    {length !== i + 1 && <Divider />}
                  </>
                );
              }
            })}
          </>
        )}
      </Stack>
    </>
  );
};

const Item = ({ doc, close }) => {
  const router = useRouter();

  return (
    <>
      <Group
        py={10}
        pl={15}
        pr={17.5}
        justify="space-between"
        onClick={() => {
          router.push(doc?.value ?? "/");
          if (close) {
            close();
          }
        }}
      >
        <Anchor fw={500} style={{ fontSize: 14, color: "rgb(22,22,22)" }}>
          {doc?.title}
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

const ItemAll = ({ doc, setItem, link, close }) => {
  const router = useRouter();

  return (
    <>
      <Group py={10} pl={15} pr={17.5} justify="space-between">
        <Anchor
          fw={500}
          style={{ fontSize: 14, color: "rgb(22,22,22)" }}
          onClick={() => {
            router.push(link ?? "/");
            if (close) {
              close();
            }
          }}
        >
          {doc?.name}
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

export default MobileItemSub;
