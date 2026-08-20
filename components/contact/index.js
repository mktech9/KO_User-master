import {
  Box,
  Container,
  Grid,
  GridCol,
  Group,
  SimpleGrid,
  Space,
  Stack,
  Text,
  ThemeIcon,
} from "@mantine/core";
import parser from "html-react-parser";
import ContactForm from "./contact-form";
import { PiEnvelopeFill, PiPhoneFill } from "react-icons/pi";

const ContactPage = () => {
  return (
    <>
      <Box bg={"#e7f0ff"}>
        <Container size={"xl"} py={60}>
          <Grid gutter={60}>
            <GridCol span={{ base: 12, md: 7.5 }}>
              <Stack gap={5} h={"100%"}>
                <Text style={{ fontSize: 46 }} fw={750}>
                  Contact us
                </Text>
                <Text size="sm" fw={500} opacity={0.9}>
                  Have any questions or need assistance? We're here to help!
                  <br /> Reach out to us anytime, and our support team will get
                  back to you as soon as possible.
                </Text>
                <Space h={10} />
                <Group gap={4}>
                  <ThemeIcon variant="transparent">
                    <PiEnvelopeFill size="1.5rem" />
                  </ThemeIcon>{" "}
                  <Text size="md" fw={700} opacity={0.9}>
                    {global?.configs?.contactData?.email}
                  </Text>
                </Group>
                <Group gap={4}>
                  <ThemeIcon variant="transparent">
                    <PiPhoneFill size="1.5rem" />
                  </ThemeIcon>
                  <Text size="md" fw={700} opacity={0.9}>
                    {global?.configs?.contactData?.contact}
                  </Text>
                </Group>
                <SimpleGrid mt={40} spacing={40} cols={{ base: 1 }}>
                  <Stack gap={5}>
                    <Text size="md" fw={750}>
                      Contact Address
                    </Text>
                    <Text size="sm" fw={500} opacity={0.9}>
                      {parser(global?.configs?.contactData?.address ?? "")}
                    </Text>
                  </Stack>
                </SimpleGrid>
              </Stack>
            </GridCol>
            <GridCol span={{ base: 12, md: 4.5 }}>
              <ContactForm />
            </GridCol>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default ContactPage;
