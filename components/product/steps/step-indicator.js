import { Badge, Group, Paper, Text } from "@mantine/core";

const StepIndicator = ({ step, text, rightSection, hideNum }) => {
  return (
    <>
      <Paper radius={"md"} p={10} withBorder bg={"#f0f0f0"}>
        <Group justify="space-between">
          <Group gap={20}>
            {!hideNum && (
              <Badge autoContrast circle color="dark" m={0} size="lg">
                {step}
              </Badge>
            )}
            <Text style={{ fontSize: 14 }} fw={700} opacity={0.9}>
              {text}
            </Text>
          </Group>
          {rightSection && rightSection}
        </Group>
      </Paper>
    </>
  );
};

export default StepIndicator;
