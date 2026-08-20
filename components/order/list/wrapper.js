"use client";

import {
  Button,
  Container,
  Divider,
  GridCol,
  Group,
  NativeSelect,
  Paper,
  Popover,
  PopoverDropdown,
  PopoverTarget,
  Select,
  Stack,
  Text,
  TextInput,
  ThemeIcon,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  PiFadersDuotone,
  PiMagnifyingGlassDuotone,
  PiMagnifyingGlass,
  PiXCircleDuotone,
  PiXCircle,
} from "react-icons/pi";
import OrderItem from "./order-item";
import { useMemo, useState } from "react";
import moment from "moment";

const OrderListWrapper = ({ data }) => {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("Date");
  const [orderBy, setOrderBy] = useState("Descending");
  const [status, setStatus] = useState("All");

  const adjList = useMemo(() => {
    if (data?.length > 0) {
      let items = [...data];

      if (search !== "") {
        const regex = new RegExp(search, "i");
        items = items?.filter(
          (doc) =>
            regex.test(doc.oid) ||
            regex.test(moment(doc?.date).format("DD MMMM yyyy")) ||
            regex.test(moment(doc?.forDate).format("DD MMMM yyyy"))
        );
      }

      if (status === "Pending") {
        items = items.filter((doc) => doc.status === "pending");
      } else if (status === "Failed") {
        items = items.filter((doc) => doc.status === "failed");
      } else if (status === "Confirmed") {
        items = items.filter(
          (doc) => doc.status !== "pending" && doc.status !== "failed"
        );
      }

      if (sortBy === "Amount") {
        items = items.sort((a, b) => {
          return a.total - b.total;
        });
      } else if (sortBy === "Date") {
        items = items.sort((a, b) => {
          return new Date(a.date) - new Date(b.date);
        });
      } else {
        items = items.sort((a, b) => {
          return new Date(a.forDate) - new Date(b.forDate);
        });
      }

      return orderBy === "Ascending" ? items : items.reverse();
    } else {
      return [];
    }
  }, [data, search, sortBy, orderBy, status]);

  return (
    <>
      <GridCol span={{ base: 12, md: 6 }}>
        <Stack>
          <Paper>
            <Group justify="space-between" wrap="nowrap">
              <TextInput
                placeholder="Search..."
                leftSection={
                  <ThemeIcon autoContrast mr={10}>
                    <PiMagnifyingGlass />
                  </ThemeIcon>
                }
                leftSectionWidth={46}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Popover shadow="lg" trapFocus>
                <PopoverTarget>
                  <Button
                    autoContrast
                    variant="outline"
                    leftSection={<PiFadersDuotone />}
                  >
                    Filters
                  </Button>
                </PopoverTarget>
                <PopoverDropdown p={20} w={200}>
                  <Stack>
                    <NativeSelect
                      label="By Status"
                      data={["Confirmed", "Pending", "Failed", "All"]}
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                      withinPortal={false}
                    />
                    <NativeSelect
                      label="Sort By"
                      data={["Date", "Amount", "Delivery/Pickup Date"]}
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                    />
                    <NativeSelect
                      label="Order By"
                      data={["Ascending", "Descending"]}
                      value={orderBy}
                      onChange={(e) => setOrderBy(e.target.value)}
                    />
                  </Stack>
                </PopoverDropdown>
              </Popover>
            </Group>
          </Paper>
          <Stack mt={25}>
            {adjList?.length > 0 ? (
              adjList?.map((doc) => {
                return (
                  <>
                    <OrderItem doc={doc} key={doc._id} />
                    <Divider key={doc._id + "Dividerez"} />
                  </>
                );
              })
            ) : (
              <Stack align="center">
                <ThemeIcon autoContrast radius={"xl"} variant="gradient">
                  <PiXCircle />{" "}
                </ThemeIcon>
                <Text size="sm">No results found.</Text>
              </Stack>
            )}
          </Stack>
        </Stack>
      </GridCol>
    </>
  );
};

export default OrderListWrapper;
