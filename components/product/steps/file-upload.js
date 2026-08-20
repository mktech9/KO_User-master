import { FileButton, Button, Group, Text, Stack } from "@mantine/core";
import { useState } from "react";

const FileUpload = ({ file, setFile, outline, disabled, fileTypes }) => {
  const [error, setError] = useState(null); // For showing the error message
  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB in bytes

  let accept = "image/png,image/jpeg";
  if (fileTypes) {
    accept = fileTypes;
  }

  const handleFileChange = (file) => {
    if (file) {
      if (file.size > MAX_FILE_SIZE) {
        setError("File size exceeds 5 MB");
        setFile(null); // Clear file selection
      } else {
        setError(null);
        setFile(file);
      }
    }
  };

  return (
    <>
      <Stack gap={0}>
        <Group justify="center">
          <FileButton onChange={handleFileChange} accept={accept}>
            {(props) => (
              <Button
                autoContrast
                color={outline ? "dark" : "gray"}
                variant={outline ? "outline" : "light"}
                fullWidth
                radius={"md"}
                {...props}
                styles={{
                  label: {
                    fontWeight: 400,
                    fontSize: 14,
                  },
                }}
                disabled={disabled}
              >
                Upload file
              </Button>
            )}
          </FileButton>
        </Group>
        {file && (
          <Text size="xs" ta="center" mt="sm">
            Picked file: {file.name}
          </Text>
        )}
        {error && (
          <Text size="xs" ta="center" color="red" mt="sm">
            {error}
          </Text>
        )}
      </Stack>
    </>
  );
};

export default FileUpload;
