import {
  ActionIcon,
  Box,
  Checkbox,
  Container,
  Grid,
  GridCol,
  Group,
  Image,
  Paper,
  SegmentedControl,
  Stack,
  Text,
  TextInput,
  Textarea,
  ThemeIcon,
} from "@mantine/core";
import BaseImage from "./base-image";
import { useEffect, useState } from "react";
import PrintPreviewSettings from "./settings";
import { PiX, PiXDuotone } from "react-icons/pi";
import Catalogue from "./catalogue";

const PrintPreviewComponent = ({
  logo,
  text,
  image,
  preview,
  active,
  setActive,
  setPreview,
  reseller,
  comments,
  setComments,
}) => {
  const [show, setShow] = useState({
    Logo: true,
    Text: true,
    Link: true,
    Catalogue: true,
  });
  const [catalogue, setCatalouge] = useState(null);
  const [textSettings, setTextSettings] = useState({
    color: "#121212",
    weight: "500",
    size: "16",
    align: "left",
    fontFamily: "Poppins",
  });

  return (
    <>
      <Grid>
        <GridCol span={{ base: 12, md: 4 }} order={{ base: 2, md: 1 }}>
          <Textarea
            autosize
            variant="filled"
            placeholder="Write comments here..."
            mb={15}
          />
          <SegmentedControl
            data={
              reseller
                ? ["Logo", "Text", "Preview"]
                : [
                    { label: "Templates", value: "Catalogue" },
                    "Logo",
                    "Text",
                    "Preview",
                  ]
            }
            fullWidth
            value={active}
            onChange={setActive}
          />
          {active !== "Preview" && (
            <Grid mt={15}>
              <GridCol span={12}>
                <Paper withBorder p={"md"}>
                  <Checkbox
                    checked={show[active]}
                    onChange={() =>
                      setShow({ ...show, [active]: !show[active] })
                    }
                    w={"100%"}
                    label="Visible"
                    size={{ base: "xs", md: "sm" }}
                  />
                </Paper>
              </GridCol>
              {active !== "Catalogue" ? (
                <PrintPreviewSettings
                  active={active}
                  setActive={setActive}
                  image={logo}
                  text={text}
                  textSettings={textSettings}
                  setTextSettings={setTextSettings}
                />
              ) : (
                <GridCol span={12}>
                  <Catalogue
                    catalogue={catalogue}
                    setCatalouge={setCatalouge}
                  />
                </GridCol>
              )}
            </Grid>
          )}
          {active === "Preview" && (
            <>
              <Paper p={15} withBorder mt={15}>
                {preview ? (
                  <>
                    <Group justify="space-between" mb={15}>
                      <Text size="sm">Saved Preview</Text>
                      <ActionIcon
                        variant="transparent"
                        onClick={() => setPreview(null)}
                      >
                        <PiX size={"1.5rem"} />
                      </ActionIcon>
                    </Group>
                    <Image src={URL.createObjectURL(preview)} />
                  </>
                ) : (
                  <Stack align="center" gap={10}>
                    <ThemeIcon autoContrast size={"xl"} radius={"50%"}>
                      <PiXDuotone />
                    </ThemeIcon>
                    <Text size="sm">Saved style not found!</Text>
                  </Stack>
                )}
              </Paper>
              <Stack mt={16} gap={12}>
                <Text fw={500} size="sm">
                  To ensure the highest quality print for your customized
                  product, please adhere to the following guidelines when
                  uploading your logo:
                </Text>
                <Text size="sm">
                  1. Upload Logo for Preview:
                  <ul>
                    <li>
                      Use the upload feature to preview your logo on the
                      product.
                    </li>
                    <li>Accepted formats for preview: JPEG, PNG.</li>
                  </ul>
                </Text>
                <Text size="sm">
                  2. Submit High-Resolution File:
                  <ul>
                    <li>
                      For the final print, provide a high-resolution logo file
                      in one of the following formats: PDF, SVG, or AI.
                    </li>
                    <li>
                      Paste the Google Drive link to your high-resolution file
                      in the designated field.
                    </li>
                  </ul>
                </Text>
                <Text size="sm">
                  Note: Ensure that your high-resolution file is clear, properly
                  formatted, and accessible via the provided Google Drive link
                  to avoid any delays or issues with your order. We recommend a
                  minimum resolution of 300 DPI for optimal print quality.
                </Text>
              </Stack>
            </>
          )}
        </GridCol>
        <GridCol span={{ base: 12, md: 8 }} order={{ base: 1, md: 2 }}>
          <BaseImage
            active={active}
            setActive={setActive}
            show={show}
            logo={logo}
            text={text}
            textSettings={textSettings}
            image={image}
            catalogue={catalogue}
            setCatalouge={setCatalouge}
          />
        </GridCol>
      </Grid>
    </>
  );
};

export default PrintPreviewComponent;
