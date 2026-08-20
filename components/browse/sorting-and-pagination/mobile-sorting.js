"use client";

import {
  Accordion,
  AccordionControl,
  AccordionItem,
  AccordionPanel,
  ActionIcon,
  Anchor,
  Badge,
  Box,
  Center,
  CloseButton,
  Collapse,
  Grid,
  GridCol,
  Group,
  Paper,
  Stack,
  Text,
} from "@mantine/core";
import SortInput from "./sort";
import { PiFadersHorizontalDuotone, PiFadersHorizontal } from "react-icons/pi";
import { useDisclosure } from "@mantine/hooks";
import Link from "next/link";
import CategoryFilter from "../filters/category-filter";
import Stock from "../filters/stock";
import FilterModule from "../filters/filter-module";
import CategoryFilter2 from "../filters/category-filter-2";

const MobileSorting = ({ data, paramtrs, reseller, seo }) => {
  console.log(paramtrs);
  const [opened, { toggle }] = useDisclosure(false);

  return (
    <>
      <Paper>
        <Grid align="stretch">
          <GridCol span={10}>
            <SortInput />
          </GridCol>
          <GridCol span={2}>
            <Center h={"100%"}>
              <ActionIcon
                autoContrast
                variant="transparent"
                size={"md"}
                onClick={toggle}
              >
                <PiFadersHorizontal size={"1.5rem"} />
              </ActionIcon>
            </Center>
          </GridCol>
        </Grid>
      </Paper>
      <Collapse in={opened}>
        <Paper mt={10} bg={"gray.0"}>
          <Stack p={15}>
            <Group justify="space-between">
              <Text fw={600}>Filters</Text>
              <CloseButton onClick={toggle} />
            </Group>
            <Anchor
              td={"underline"}
              style={{ lineHeight: 1 }}
              c={"dark"}
              size="sm"
              fw={500}
              component={Link}
              href={"/search/advanced"}
            >
              Search all products
            </Anchor>
          </Stack>
          <Accordion
            styles={{
              control: {
                fontSize: 14,
                fontWeight: 600,
              },
            }}
          >
            <AccordionItem value="category">
              <AccordionControl>
                Category{" "}
                {paramtrs?.category?.length > 0 && (
                  <Badge autoContrast ml={10} size="sm" circle>
                    {paramtrs?.category?.length}
                  </Badge>
                )}
              </AccordionControl>
              <AccordionPanel>
                {seo ? (
                  <CategoryFilter2
                    header
                    text={"By Category"}
                    data={data?.category}
                  />
                ) : (
                  <CategoryFilter
                    header
                    text={"By Category"}
                    data={data?.category}
                  />
                )}
              </AccordionPanel>
            </AccordionItem>
            {reseller && (
              <AccordionItem value="stock">
                <AccordionControl>
                  Stock{" "}
                  {paramtrs?.stock > 0 && (
                    <Badge autoContrast ml={10} size="sm" circle>
                      1
                    </Badge>
                  )}
                </AccordionControl>
                <AccordionPanel>
                  <Stock header text={"Stock"} />
                </AccordionPanel>
              </AccordionItem>
            )}
            <AccordionItem value="filter">
              <AccordionControl>
                Filter By{" "}
                {paramtrs?.basic?.length > 0 && (
                  <Badge autoContrast ml={10} size="sm" circle>
                    {paramtrs?.basic?.length}
                  </Badge>
                )}
              </AccordionControl>
              <AccordionPanel>
                <FilterModule
                  paramName="filterBy"
                  type={"chip"}
                  data={data?.basic}
                  defaultValue={[]}
                  currentValue={""}
                  title={"Filter By"}
                  header
                />
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem value="size">
              <AccordionControl>
                Item Size{" "}
                {paramtrs?.size?.length > 0 && (
                  <Badge autoContrast ml={10} size="sm" circle>
                    {paramtrs?.size?.length}
                  </Badge>
                )}
              </AccordionControl>
              <AccordionPanel>
                <FilterModule
                  paramName="size"
                  type={"chip"}
                  data={data?.size}
                  defaultValue={[]}
                  currentValue={""}
                  title={"Item Size"}
                  header
                />
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem value="label">
              <AccordionControl>
                Labels{" "}
                {paramtrs?.label.length > 0 && (
                  <Badge autoContrast ml={10} size="sm" circle>
                    {paramtrs?.label?.length}
                  </Badge>
                )}
              </AccordionControl>
              <AccordionPanel>
                <FilterModule
                  paramName="label"
                  type={"chip"}
                  data={data?.labels}
                  defaultValue={[]}
                  currentValue={""}
                  title={"Labels"}
                  header
                />
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem value="color">
              <AccordionControl>
                Color{" "}
                {paramtrs?.color?.length > 0 && (
                  <Badge autoContrast ml={10} size="sm" circle>
                    {paramtrs?.color?.length}
                  </Badge>
                )}
              </AccordionControl>
              <AccordionPanel>
                <FilterModule
                  paramName="color"
                  type={"color"}
                  data={data?.colors}
                  defaultValue={[]}
                  currentValue={""}
                  title={"Color"}
                  header
                />
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem value="capacity">
              <AccordionControl>
                Capacity{" "}
                {paramtrs?.capacity?.length > 0 && (
                  <Badge autoContrast ml={10} size="sm" circle>
                    {paramtrs?.capacity?.length}
                  </Badge>
                )}
              </AccordionControl>
              <AccordionPanel>
                <FilterModule
                  paramName="capacity"
                  type={"chip"}
                  data={data?.capacity}
                  defaultValue={[]}
                  currentValue={""}
                  title={"Capacity"}
                  header
                />
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem value="print techniques">
              <AccordionControl>
                Print Techniques{" "}
                {paramtrs?.printType?.length > 0 && (
                  <Badge autoContrast ml={10} size="sm" circle>
                    {paramtrs?.printType?.length}
                  </Badge>
                )}
              </AccordionControl>
              <AccordionPanel>
                <FilterModule
                  paramName="printType"
                  type={"chip"}
                  data={data?.type}
                  defaultValue={[]}
                  currentValue={""}
                  title={"print Techniques"}
                  header
                />
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem value="main material">
              <AccordionControl>
                Main Material{" "}
                {paramtrs?.material?.length > 0 && (
                  <Badge autoContrast ml={10} size="sm" circle>
                    {paramtrs?.material?.length}
                  </Badge>
                )}
              </AccordionControl>
              <AccordionPanel>
                <FilterModule
                  paramName="material"
                  type={"chip"}
                  data={data?.material}
                  defaultValue={[]}
                  currentValue={""}
                  title={"Main Material"}
                  header
                />
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </Paper>
      </Collapse>
    </>
  );
};

export default MobileSorting;
