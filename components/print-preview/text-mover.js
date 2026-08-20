import { Box, Text } from "@mantine/core";

const TextMover = ({ text, attributes }) => {
  return (
    <Text
      fw={attributes.weight}
      c={attributes.color}
      className="apply-font"
      style={{
        fontSize: +attributes.size,
        whiteSpace: "pre-line",
        zIndex: 100,
      }}
      ta={attributes.align}
    >
      {text.inputValue}
    </Text>
  );
};

export default TextMover;
