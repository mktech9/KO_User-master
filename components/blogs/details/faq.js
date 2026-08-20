"use client";

import { Accordion, Box, Title, Text, Space, Paper } from "@mantine/core";
import { inter } from "../local_font";

const Faq = ({ data = [] }) => {
  if (!data.length) return null;

  return (
    <Paper
      withBorder
      radius="lg"
      //   shadow="sm"
      p={{ base: 12, md: 24 }}
      mt={24}
      style={{
        background: "linear-gradient(145deg, #f9fafc 0%, #ffffff 100%)",
        border: "1px solid rgba(0,0,0,0.05)",
      }}
    >
      <Box px={{ base: 4, md: 12 }}>
        {/* <Space h={24} /> */}

        <Box mb={24}>
          <Title order={2} className={inter.className} visibleFrom="md">
            Frequently Asked Questions
          </Title>
          <Title order={4} className={inter.className} hiddenFrom="md">
            Frequently Asked Questions
          </Title>
          <Text mt={4} opacity={0.75} visibleFrom="md">
            Find answers to the most common questions below.
          </Text>
          <Text mt={4} size="sm" opacity={0.75} hiddenFrom="md">
            Find answers to the most common questions below.
          </Text>
        </Box>

        <Accordion
          variant="contained"
          radius="md"
          chevronPosition="right"
          transitionDuration={200}
          styles={(theme) => ({
            item: {
              backgroundColor:
                theme.colorScheme === "dark" ? "#1a1b1e" : "#f8f9fb",
              border: "1px solid rgba(0,0,0,0.05)",
              //   borderRadius: "12px",
              transition: "all 0.2s ease",
              "&:hover": {
                background: "linear-gradient(90deg, #edf2ff, #f3f0ff)",
                transform: "translateY(-1px)",
                boxShadow: "0 3px 8px rgba(0,0,0,0.06)",
              },
              "& + &": {
                marginTop: theme.spacing.sm,
              },
            },
            // control: {
            //   padding: "14px 18px",
            // },
            // panel: {
            //   padding: "0 18px 14px",
            // },
          })}
        >
          {data.map((item, index) => (
            <Accordion.Item key={index} value={`faq-${index}`}>
              <Accordion.Control>
                <Text fw={600} size="md" c="#2a367c" visibleFrom="md">
                  {item.question}
                </Text>
                <Text fw={600} size="sm" c="#2a367c" hiddenFrom="md">
                  {item.question}
                </Text>
              </Accordion.Control>
              <Accordion.Panel>
                <Text lh={1.7} opacity={0.8} visibleFrom="md">
                  {item.answer}
                </Text>
                <Text lh={1.7} size="sm" opacity={0.8} hiddenFrom="md">
                  {item.answer}
                </Text>
              </Accordion.Panel>
            </Accordion.Item>
          ))}
        </Accordion>

        <Space h={24} />
      </Box>
    </Paper>
  );
};

export default Faq;
