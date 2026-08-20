import { PasswordInput, TextInput } from "@mantine/core";

const Common = ({ form }) => {
  return (
    <>
      <TextInput
        required
        label="Email"
        placeholder="hello@mantine.dev"
        value={form.values.email}
        onChange={(event) =>
          form.setFieldValue("email", event.currentTarget.value)
        }
        error={form.errors.email && "Invalid email"}
        radius="md"
      />
      <PasswordInput
        required
        label="Password"
        placeholder="Your password"
        value={form.values.password}
        onChange={(event) =>
          form.setFieldValue("password", event.currentTarget.value)
        }
        error={
          form.errors.password &&
          "Password should include at least 6 characters"
        }
        radius="md"
      />
    </>
  );
};

export default Common;
