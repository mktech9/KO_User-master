"use client";

import {
  Avatar,
  Box,
  Divider,
  GridCol,
  Group,
  Paper,
  Space,
  Stack,
  Text,
  ThemeIcon,
} from "@mantine/core";
import { usePathname } from "next/navigation";
import { Items } from "@/app/profile/(profile)/wrapper";
import {
  PiCurrencyDollarDuotone,
  PiGearFill,
  PiUserDuotone,
} from "react-icons/pi";
import moment from "moment";
import Link from "next/link";

function getInitials(words) {
  // Split the words by spaces
  const wordsArray = words.split(" ");

  // Map over the array and return the first character of each word
  const initialsArray = wordsArray.map((word) => word.charAt(0));

  // Join the array into a string and return
  return initialsArray.join("");
}

const ProfilePage = ({ data }) => {
  const pathname = usePathname();

  return (
    <>
      <GridCol span={{ base: 12, md: 4 }}>
        <Paper w={"100%"}>
          <Stack h={"100%"} justify="center">
            <Group visibleFrom="md">
              <Avatar size={"5rem"} variant="gradient">
                {getInitials(data?.name ?? "A")}
              </Avatar>
              <Stack gap={0}>
                <Text fw={700} size="lg">
                  {data?.name}
                </Text>

                <Text fw={500} size="sm">
                  Joined{" "}
                  {moment(data?.createdAt ?? new Date()).format("DD MMMM yyyy")}
                </Text>
              </Stack>
            </Group>
            <Stack hiddenFrom="md" align="center">
              <Avatar size={"5rem"} variant="gradient">
                NS
              </Avatar>
              <Stack gap={0}>
                <Text fw={700} size="lg">
                  Nemantaj Sahu
                </Text>
              </Stack>
            </Stack>
            <Box hiddenFrom="md">
              <Space h={10} />
              <Items pathname={pathname} hideMyAccount />
            </Box>
            <Space h={10} />
            <Stack w={"100%"} gap={10}>
              <Group w={"100%"} justify="space-between">
                <Text fw={500} size="sm">
                  Email ID:
                </Text>
                <Text fw={600} size="sm">
                  {data?.username}
                </Text>
              </Group>
              <Divider />
              <Group w={"100%"} justify="space-between">
                <Text fw={500} size="sm">
                  Mobile Number:
                </Text>
                <Text fw={600} size="sm">
                  {data?.countryCode} {data?.number}
                </Text>
              </Group>
              <Divider />
              <Group w={"100%"} justify="space-between">
                <Text fw={500} size="sm">
                  Account Type:
                </Text>
                {data?.userType === "reseller" ? (
                  <Paper bg={"green.1"}>
                    <Group gap={5}>
                      <PiCurrencyDollarDuotone />
                      <Text fw={500} size="sm">
                        Reseller Account
                      </Text>
                    </Group>
                  </Paper>
                ) : (
                  <Paper bg={"green.1"}>
                    <Group gap={5}>
                      <PiUserDuotone />
                      <Text fw={500} size="sm">
                        Customer Account
                      </Text>
                    </Group>
                  </Paper>
                )}
              </Group>
            </Stack>
          </Stack>
        </Paper>
      </GridCol>
    </>
  );
};

export default ProfilePage;
