import { Stack, Text } from "@mantine/core";

const LeftSectionTitle = ({ step }) => {
  return (
    <>
      <Stack gap={5}>
        <Text size="xl" style={{ fontSize: 27 }} fw={700}>
          {step === "address" ? "Shipping type" : "Shopping basket"}
        </Text>
        <Text size="sm">
          {step === "address"
            ? " Choose between pickup and shipping address."
            : "All transactions are safe and secure."}
        </Text>
      </Stack>
    </>
  );
};

export default LeftSectionTitle;
