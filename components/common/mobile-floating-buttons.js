"use client";

import { Affix, Group, Button, Box, Text, Stack, Space } from "@mantine/core";
import { PiPhoneFill, PiWhatsappLogoFill } from "react-icons/pi";
import { usePathname } from "next/navigation";

const MobileFloatingButtons = () => {
  const pathname = usePathname();
  const phoneNumber = "+971527940227";
  const whatsappNumber = "971527940227";

  // Hide on cart, auth, blog, and search pages
  const hiddenPaths = ["/basket", "/auth", "/blog", "/search"];
  const shouldHide = hiddenPaths.some((path) => pathname?.startsWith(path));

  if (shouldHide) return null;

  return (
    <>
      <Space h={96} bg="#f4f4f4" />
      <Affix
        position={{ bottom: 0, left: 0, right: 0 }}
        style={{
          width: "100%",
          zIndex: 999,
        }}
        hiddenFrom="sm"
      >
        <Stack gap={0}>
          {/* Buttons Row */}
          <Group
            justify="center"
            gap="sm"
            px="lg"
            py="sm"
            style={{
              background: "transparent",
            }}
            wrap="nowrap"
          >
            {/* Call Now Button - Filled */}
            <Button
              w="100%"
              component="a"
              href={`tel:${phoneNumber}`}
              leftSection={<PiPhoneFill size={16} />}
              radius="xl"
              size="md"
              bg="#457ec0"
            >
              Call Now
            </Button>
            <Button
              w="100%"
              component="a"
              href={`https://wa.me/${whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              leftSection={<PiWhatsappLogoFill size={16} />}
              radius="xl"
              size="md"
              bg="#457ec0"
            >
              Whatsapp
            </Button>
          </Group>

          {/* Promotional Bar */}
          {/* <Box
            w="100%"
            bg="#1e3a5f"
            px="md"
            py="md"
            style={{ textAlign: "center" }}
          >
            <Group gap={6} justify="center" wrap="nowrap">
              <Text size="sm" c="white" fw={600}>
                🔍
              </Text>
              <Text size="md" c="white" fw={700}>
                Find Your Perfect Promotional Product
              </Text>
            </Group>
            <Text size="xs" c="orange.5" mt={2}>
              Search by color, size, price, material & more—fast & easy!👆
            </Text>
          </Box> */}
        </Stack>
      </Affix>
    </>
  );
};

export default MobileFloatingButtons;
