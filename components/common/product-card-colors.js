import {
  Button,
  ColorSwatch,
  Group,
  Popover,
  PopoverDropdown,
  PopoverTarget,
} from "@mantine/core";

const ProductCardColors = ({ colors }) => {
  const isMore =
    colors?.length >= 8 ? colors?.slice(7, colors?.length - 1) : [];

  return (
    <>
      <Group gap={5}>
        {colors?.slice(0, 7)?.map((doc) => {
          return <ColorSwatch size={"1rem"} color={doc.tag} />;
        })}
        {isMore?.length > 0 && (
          <Popover width={"auto"} position="bottom" withArrow shadow="md">
            <PopoverTarget>
              <Button              autoContrast color="dark" radius={"xl"} size="compact-xs">
                +{isMore?.length}
              </Button>
            </PopoverTarget>
            <PopoverDropdown>
              <Group gap={5}>
                {colors?.slice(7, colors?.length - 1)?.map((doc) => {
                  return <ColorSwatch size={"1rem"} color={doc.tag} />;
                })}
              </Group>
            </PopoverDropdown>
          </Popover>
        )}
      </Group>
    </>
  );
};

export default ProductCardColors;
