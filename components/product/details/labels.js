import { Button, Group } from "@mantine/core";

const Labels = ({ data }) => {
  if (data?.length > 0) {
    return (
      <Group>
        {data?.map((doc, i) => {
          return (
            <Button
              autoContrast
              key={i}
              size="compact-sm"
              style={{ fontSize: 12 }}
              radius={"sm"}
              color="dark"
              variant="gradient"
              gradient={{ from: "cyan", to: "dark", deg: 90 }}
            >
              {doc}
            </Button>
          );
        })}
      </Group>
    );
  }
};

export default Labels;
