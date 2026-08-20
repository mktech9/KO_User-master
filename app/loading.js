import { Box, Center, Loader, Skeleton, Stack, Text } from "@mantine/core";

const Loading = () => {
  return (
    <>
      <Box
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          zIndex: 999,
        }}
      >
        <Skeleton w={"100%"} h={"100dvh"}>
          <Center
            h={"100%"}
            w={"100%"}
            style={{ position: "absolute", top: 0, left: 0, zIndex: 99 }}
          >
            <Stack align="center">
              <Loader color="cyan" />
              <Text size="sm" fw={600}>
                Loading...
              </Text>
            </Stack>
          </Center>
        </Skeleton>
      </Box>
    </>
  );
};

export default Loading;
