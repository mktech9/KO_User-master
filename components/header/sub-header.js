import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  GridCol,
  Group,
} from "@mantine/core";
import Link from "next/link";
import { PiEnvelopeFill, PiPhoneFill, PiUsersThreeFill } from "react-icons/pi";
import LanguageToggler from "../localization";
import CurrencyToggler from "../currency/currency-toggler";

const SubHeader = () => {
  let configs = global.configs;

  return (
    <Box
      w={"100%"}
      style={{ borderBottom: "1px solid rgba(0,0,0,0.1)" }}
      h={40}
    >
      <Container size={"xl"}>
        <Grid gutter={0} h={40}>
          <GridCol span={{ base: 12, md: 5 }}>
            <Group h={40} pr={25}>
              <Button
                autoContrast
                variant="white"
                size="compact-sm"
                leftSection={<PiPhoneFill size={"1.2rem"} />}
                color="cyan"
                style={{
                  fontSize: 14,
                }}
                p={0}
                visibleFrom="md"
              >
                {configs?.contact}
              </Button>
              <Button
                autoContrast
                variant="white"
                size="compact-sm"
                leftSection={<PiPhoneFill size={"1.2rem"} />}
                color="cyan"
                style={{
                  fontSize: 10,
                }}
                p={0}
                hiddenFrom="md"
              >
                {configs?.contact}
              </Button>
              <Button
                autoContrast
                variant="white"
                size="compact-sm"
                leftSection={<PiEnvelopeFill size={"1.2rem"} />}
                color="cyan"
                style={{
                  fontSize: 14,
                }}
                visibleFrom="md"
                component={Link}
                target="_blank"
                href={`mailto:${configs?.email}`}
              >
                {configs?.email}
              </Button>
              <Button
                autoContrast
                variant="white"
                size="compact-sm"
                leftSection={<PiEnvelopeFill size={"1.2rem"} />}
                color="cyan"
                style={{
                  fontSize: 10,
                }}
                hiddenFrom="md"
                component={Link}
                target="_blank"
                href={`mailto:${configs?.email}`}
              >
                {configs?.email}
              </Button>
            </Group>
          </GridCol>
          <GridCol span={{ base: 12, md: 4.5 }} visibleFrom="md">
            <Group h={40} pr={25} justify="right">
              {global?.configs?.label === "super" && (
                <Button
                  autoContrast
                  variant="white"
                  size="compact-sm"
                  leftSection={<PiUsersThreeFill size={"1.2rem"} />}
                  color="cyan"
                  style={{
                    fontSize: 14,
                  }}
                  component={Link}
                  href={"/resellers"}
                >
                  Reseller Registration
                </Button>
              )}
            </Group>
          </GridCol>
          <GridCol
            h={40}
            visibleFrom="md"
            span={{ base: 12, md: 2.5, xl: 2.5 }}
          >
            <Group justify="right">
              <Divider
                color="#dbdbdb"
                visibleFrom="md"
                orientation="vertical"
                h={40}
              />
              <LanguageToggler noBorder />
              <CurrencyToggler noBorder />
            </Group>
          </GridCol>
        </Grid>
      </Container>
    </Box>
  );
};

export default SubHeader;
