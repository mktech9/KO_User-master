import { GetCatalogue } from "@/libs/print-preview";
import useCache from "@/store/useCache";
import {
  ActionIcon,
  Box,
  Center,
  Collapse,
  Divider,
  Group,
  Loader,
  Paper,
  ScrollArea,
  SimpleGrid,
  Stack,
  Text,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import Image from "next/image";
import { useEffect, useState } from "react";
import { PiArrowDownDuotone, PiArrowDown, PiArrowUpDuotone, PiArrowUp } from "react-icons/pi";

const Catalogue = ({ catalogue, setCatalouge }) => {
  const [type, setType] = useState("");
  const { catalouge, setCache } = useCache();
  const [load, setLoad] = useState(false);

  let length = Object.keys(catalouge)?.length - 1;

  useEffect(() => {
    if (length < 1) {
      setLoad(true);
      GetCatalogue()
        .then((items) => {
          setCache(items, "catalouge");
          setLoad(false);
        })
        .catch((err) => {
          console.log(err);
          notifications.show({
            color: "red",
            title: err?.message ?? "Something went wrong!",
            autoClose: 1500,
          });
          setLoad(false);
        });
    }
  }, []);

  if (load) {
    return (
      <Center mt={10}>
        <Loader />
      </Center>
    );
  }

  return (
    <>
      <Text>Browse Templates</Text>
      <Stack mt={10}>
        {Object?.keys(catalouge).map((doc, i) => {
          return (
            <>
              <Paper key={doc}>
                <Group
                  justify="space-between"
                  onClick={() => (doc == type ? setType("") : setType(doc))}
                >
                  <Stack gap={0}>
                    <Text fw={500} size="sm">
                      {doc}
                    </Text>
                    <Text fw={500} size="xs" opacity={0.7}>
                      {catalouge[doc]?.length} Items
                    </Text>
                  </Stack>
                  <ActionIcon autoContrast variant="subtle">
                    {type === doc ? (
                      <PiArrowUp />
                    ) : (
                      <PiArrowDown />
                    )}
                  </ActionIcon>
                </Group>
                <Collapse in={type === doc}>
                  <Paper mt={10}>
                    <ScrollArea>
                      <SimpleGrid
                        cols={3}
                        style={{ borderRadius: 4 }}
                        spacing={15}
                      >
                        {catalouge[doc]?.map((dc) => {
                          return (
                            <Box
                              w={"100%"}
                              style={{
                                position: "relative",
                                borderRadius: 4,
                                overflow: "hidden",
                              }}
                              key={dc?._id}
                              onClick={() => setCatalouge(dc)}
                              bg={
                                dc._id === catalogue?._id
                                  ? "orange.1"
                                  : "gray.0"
                              }
                            >
                              <Center h={100}>
                                <Image
                                  src={dc?.image}
                                  fill
                                  style={{ objectFit: "contain", padding: 10 }}
                                />
                              </Center>
                            </Box>
                          );
                        })}
                      </SimpleGrid>
                    </ScrollArea>
                  </Paper>
                </Collapse>
              </Paper>
              {length !== i && <Divider />}
            </>
          );
        })}
      </Stack>
    </>
  );
};

export default Catalogue;
