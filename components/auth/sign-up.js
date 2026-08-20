import { codes } from "@/utils/codes";
import { Group, Paper, Select, Stack, Text, TextInput } from "@mantine/core";

const SignUp = ({ form }) => {
  return (
    <>
      <>
        <TextInput
          label="Name"
          placeholder="Your name"
          value={form.values.name}
          onChange={(event) =>
            form.setFieldValue("name", event.currentTarget.value)
          }
          radius="md"
          error={form.errors.name && "Full name is required!"}
        />
        <Stack gap={2}>
          <Text style={{ fontSize: 14 }} fw={500}>
            Mobile Number
          </Text>
          <Paper withBorder px={10}>
            <Group gap={10} wrap="nowrap">
              <Select
                w={85}
                variant="unstyled"
                radius={0}
                size="sm"
                searchable
                placeholder="Country"
                data={codes.map((doc) => {
                  let active = `${doc?.dial_code}` === form.values.countryCode;
                  return {
                    label: active
                      ? `${doc.dial_code}`
                      : `${doc?.dial_code} (${doc.name})`,
                    value: `${doc?.dial_code}`,
                  };
                })}
                styles={{
                  dropdown: {
                    minWidth: "fit-content",
                  },
                }}
                value={form.values.countryCode}
                onChange={(v) => form.setFieldValue("countryCode", v)}
                // error={form.errors.countryCode && "Required!"}
              />
              <TextInput
                variant="unstyled"
                placeholder="Your mobile number"
                value={form.values.mobile}
                onChange={(event) =>
                  form.setFieldValue("mobile", event.currentTarget.value)
                }
                radius="md"
                // error={form.errors.mobile && "Mobile Number is required!"}
              />
            </Group>
          </Paper>
        </Stack>
      </>
    </>
  );
};

export default SignUp;
