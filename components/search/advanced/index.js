"use client";

import Price from "@/components/browse/filters/price";
import {
  ActionIcon,
  Box,
  Button,
  Chip,
  ChipGroup,
  ColorSwatch,
  Container,
  Divider,
  Grid,
  GridCol,
  Group,
  Loader,
  MultiSelect,
  NumberInput,
  Space,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { PiMagnifyingGlassDuotone } from "react-icons/pi";

const label = {
  fontSize: 14,
  marginBottom: 5,
  fontWeight: 600,
};

const AdvancedSearch = ({ data, reseller }) => {
  const isVendor = global?.configs?.label;

  const [load, setLoad] = useState(false);
  const router = useRouter();

  //initialize search values
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState([]);
  const [stock, setStock] = useState("");
  const [colors, setColors] = useState([]);
  const [size, setSize] = useState([]);
  const [labels, setLabels] = useState([]);
  const [basic, setBasic] = useState([]);
  const [type, setType] = useState([]);
  const [capacity, setCapacity] = useState([]);
  const [material, setMaterial] = useState([]);
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(10000);

  const searchHandler = async () => {
    try {
      setLoad(true);
      let url = "/products?";

      if (search !== "") {
        url += `search=${encodeURIComponent(search)}&`;
      }

      if (stock !== "" && +stock > 0) {
        url += `stock=${stock}&`;
      }

      if (colors?.length > 0) {
        url += `color=${encodeURIComponent(colors?.join(","))}&`;
      }

      if (size?.length > 0) {
        url += `size=${encodeURIComponent(size?.join(","))}&`;
      }

      if (labels?.length > 0) {
        url += `label=${encodeURIComponent(labels?.join(","))}&`;
      }

      if (basic?.length > 0) {
        url += `filterBy=${encodeURIComponent(basic?.join(","))}&`;
      }

      if (type?.length > 0) {
        url += `printType=${encodeURIComponent(type?.join(","))}&`;
      }

      if (capacity?.length > 0) {
        url += `capacity=${encodeURIComponent(capacity?.join(","))}&`;
      }

      if (material?.length > 0) {
        url += `material=${encodeURIComponent(material?.join(","))}&`;
      }

      if (category?.length > 0) {
        url += `category=${encodeURIComponent(category?.join(","))}&`;
      }

      url += `priceMin=${min}&priceMax=${max}`;

      router.push(url);
    } catch (err) {
      console.log(err);
      setLoad(false);
    }
  };

  const clear = () => {
    setSearch("");
    setCategory([]);
    setStock("");
    setColors([]);
    setSize([]);
    setLabels([]);
    setBasic([]);
    setType([]);
    setCapacity([]);
    setMaterial([]);
  };

  let btns = (
    <>
      <Button autoContrast miw={150} color="dark" size="md" onClick={clear}>
        Clear
      </Button>
      <Button
        autoContrast
        miw={150}
        size="md"
        onClick={searchHandler}
        disabled={load}
        loading={load}
      >
        Search
      </Button>
    </>
  );

  return (
    <>
      <Box py={30}>
        <Container size={"xl"}>
          <Stack gap={10}>
            <Text fw={600} size="1.6rem">
              Advanced Product Search
            </Text>
            <Text fw={500} size="sm">
              Use the options below to find your perfect promotional product
            </Text>
          </Stack>
        </Container>
      </Box>
      <Box bg={"#f4f4f4"} py={30}>
        <Container size={"xl"}>
          <Grid gutter={40} align="stretch">
            <GridCol span={{ base: 12, md: 6 }}>
              <TextInput
                label="Enter a search term"
                w={"100%"}
                size="lg"
                styles={{
                  input: {
                    fontSize: 14,
                  },
                  label: {
                    ...label,
                    fontSize: 15,
                    fontWeight: 700,
                  },
                }}
                placeholder="Search product, brand, colour, keyword or code"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </GridCol>
            <GridCol span={{ base: 12, md: 6 }}>
              <MultiSelect
                data={data?.category?.map((doc) => {
                  return doc.name;
                })}
                label="By Category"
                placeholder="Select categories"
                styles={{
                  input: {
                    fontSize: 14,
                  },
                  label: {
                    ...label,
                    fontSize: 15,
                    fontWeight: 700,
                  },
                  option: {
                    fontSize: 14,
                  },
                  pill: {
                    fontSize: 12,
                  },
                }}
                multiple
                size="lg"
                value={category}
                onChange={setCategory}
              />
            </GridCol>
            {reseller && (
              <GridCol span={{ base: 12, md: 6 }}>
                <Stack gap={0}>
                  <Text fw={700} mb={10} style={{ fontSize: 15 }}>
                    Stock
                  </Text>
                  <Group w={"100%"} wrap="nowrap">
                    <Text fw={500} style={{ fontSize: 14 }}>
                      0
                    </Text>
                    <Divider w={"100%"} size={"md"} />
                    <Text fw={500} style={{ fontSize: 14 }}>
                      100000
                    </Text>
                  </Group>
                  <Group mt={10} justify="right">
                    <NumberInput
                      w={100}
                      size="md"
                      styles={{
                        input: {
                          fontSize: 14,
                        },
                        label,
                      }}
                      value={stock}
                      onChange={setStock}
                    />
                  </Group>
                </Stack>
              </GridCol>
            )}
            {!isVendor && (
              <GridCol span={6}>
                <Price
                  text="Price"
                  min={min}
                  max={max}
                  setMin={setMin}
                  setMax={setMax}
                />
              </GridCol>
            )}
            <GridCol span={{ base: 12, md: 6 }}>
              <ColorSelect
                data={data?.colors}
                value={colors}
                setValue={setColors}
              />
            </GridCol>
            <GridCol span={{ base: 12, md: 6 }}>
              <ChipSelect
                text={"Filters"}
                value={basic}
                setValue={setBasic}
                data={data?.basic}
              />
            </GridCol>
            <GridCol span={{ base: 12, md: 6 }}>
              <ChipSelect
                text={"Item Size"}
                value={size}
                setValue={setSize}
                data={data?.size}
              />
            </GridCol>
            <GridCol span={{ base: 12, md: 6 }}>
              <ChipSelect
                text={"Labels"}
                value={labels}
                setValue={setLabels}
                data={data?.labels}
              />
            </GridCol>
            <GridCol span={{ base: 12, md: 6 }}>
              <ChipSelect
                text={"Capacity"}
                value={capacity}
                setValue={setCapacity}
                data={data?.capacity}
              />
            </GridCol>
            <GridCol span={{ base: 12, md: 6 }}>
              <ChipSelect
                text={"Printing Techniques"}
                value={type}
                setValue={setType}
                data={data?.type}
              />
            </GridCol>
            <GridCol span={{ base: 12, md: 6 }}>
              <ChipSelect
                text={"Main Materials"}
                value={material}
                setValue={setMaterial}
                data={data?.material}
              />
            </GridCol>
            <GridCol span={12}>
              <Stack mt={20} justify="flex-end" h={"100%"}>
                <Group justify="right" visibleFrom="md" w={"100%"}>
                  {btns}
                </Group>
                <Group justify="space-between" hiddenFrom="md" w={"100%"}>
                  {btns}
                </Group>
              </Stack>
            </GridCol>
          </Grid>
        </Container>
        <Space h={25} />
      </Box>
    </>
  );
};

export const ColorSelect = ({ data, value, setValue, load, header }) => {
  const addItem = (item) => {
    let copy = [...value, item];
    setValue(copy);
  };

  const removeItem = (item) => {
    let copy = [...value].filter((doc) => doc !== item);
    setValue(copy);
  };

  return (
    <>
      <Stack gap={0}>
        {!header && (
          <Group justify="space-between" mb={10}>
            <Text fw={700} style={{ fontSize: 15 }}>
              Colors
            </Text>
            {load && <Loader type="dots" size={"sm"} />}
          </Group>
        )}
        <Group gap={10}>
          {data?.map((doc, i) => {
            let checked = value?.includes(doc.name);
            return (
              <ColorSwatch
                onClick={() =>
                  checked ? removeItem(doc.name) : addItem(doc.name)
                }
                styles={{
                  shadowOverlay: {
                    border: checked ? "2.5px solid black" : "none",
                  },
                }}
                size={"1.5rem"}
                withShadow
                color={doc.tag}
                key={i}
              />
            );
          })}
        </Group>
      </Stack>
    </>
  );
};

export const ChipSelect = ({ text, value, setValue, data, load, header }) => {
  return (
    <>
      <Stack gap={0} className="advanced-search">
        {!header && (
          <Group justify="space-between" mb={10}>
            <Text fw={700} style={{ fontSize: 15 }}>
              {text}
            </Text>
            {load && <Loader type="dots" size={"sm"} />}
          </Group>
        )}
        <ChipGroup value={value} onChange={setValue} multiple>
          <Group gap={5}>
            {data?.map((doc, i) => {
              return (
                <Chip key={i} radius={"xl"} value={doc.name} size="xs" fw={500}>
                  {doc.name}
                </Chip>
              );
            })}
          </Group>
        </ChipGroup>
      </Stack>
    </>
  );
};

export default AdvancedSearch;
