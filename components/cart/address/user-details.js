import { codes } from "@/utils/codes";
import {
  Grid,
  GridCol,
  Group,
  Paper,
  Select,
  Space,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";

const UserDetails = ({ name, email, mobile, mobileCode }) => {
  return (
    <>
      <Stack>
        <Stack gap={5}>
          <Text size="xl" style={{ fontSize: 27 }} fw={700}>
            Customer Information
          </Text>
          <Text size="sm">Provide us with few details</Text>
        </Stack>
        <Space h={5} />
        <Grid>
          <GridCol span={{ base: 12, md: 6 }}>
            <TextInput
              label="Name"
              placeholder="Your name"
              value={name.inputValue}
              onChange={name.inputHandler}
              radius="md"
              error={name.error && "Full name is required!"}
            />
          </GridCol>
          <GridCol span={{ base: 12, md: 6 }}>
            <TextInput
              label="Email"
              placeholder="youremail@emailprovider.com"
              value={email.inputValue}
              onChange={email.inputHandler}
              radius="md"
              error={email.error && "An email address is required!"}
            />
          </GridCol>
          <GridCol span={12}>
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
                      let active =
                        `${doc?.dial_code}` === mobileCode.inputValue;
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
                    value={mobileCode.inputValue}
                    onChange={mobileCode.setInput}
                    // error={form.errors.countryCode && "Required!"}
                  />
                  <TextInput
                    variant="unstyled"
                    placeholder="Your mobile number"
                    value={mobile.inputValue}
                    onChange={mobile.inputHandler}
                    radius="md"
                    // error={form.errors.mobile && "Mobile Number is required!"}
                  />
                </Group>
              </Paper>
            </Stack>
          </GridCol>
        </Grid>
      </Stack>
    </>
  );
};

export default UserDetails;
