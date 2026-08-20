import {
  ColorInput,
  GridCol,
  Paper,
  Select,
  Stack,
  Text,
  Textarea,
} from "@mantine/core";
import FileUpload from "../product/steps/file-upload";
import FontPicker from "font-picker-react";

const PrintPreviewSettings = ({
  active,
  image,
  text,
  textSettings,
  setTextSettings,
  setActive,
}) => {
  return (
    <>
      {active === "Logo" && (
        <>
          <GridCol span={12}>
            <Paper withBorder p={"md"}>
              <FileUpload
                file={image.inputValue}
                setFile={(file) => {
                  image.setInput(file);
                  setActive("Preview");
                }}
                outline={true}
              />
            </Paper>
          </GridCol>
        </>
      )}
      {active === "Text" && (
        <>
          <GridCol span={12}>
            <Textarea
              radius={"md"}
              variant="default"
              placeholder="Enter Text"
              value={text.inputValue}
              onChange={text.inputHandler}
              styles={{
                input: {
                  borderColor: "#495abe",
                },
              }}
            />
          </GridCol>
          <GridCol span={4}>
            <Select
              w={"100%"}
              data={["400", "500", "600", "700", "800", "900"]}
              label="Font Weight"
              value={textSettings.weight}
              onChange={(v) => setTextSettings({ ...textSettings, weight: v })}
            />
          </GridCol>
          <GridCol span={4}>
            <Select
              w={"100%"}
              data={["left", "center", "right"]}
              label="Align"
              value={textSettings.align}
              onChange={(v) => setTextSettings({ ...textSettings, align: v })}
            />
          </GridCol>
          <GridCol span={4}>
            <Select
              w={"100%"}
              data={[
                "12",
                "14",
                "16",
                "18",
                "20",
                "22",
                "24",
                "26",
                "28",
                "30",
              ]}
              label="Font Size"
              value={textSettings.size}
              onChange={(v) => setTextSettings({ ...textSettings, size: v })}
            />
          </GridCol>
          <GridCol span={6}>
            <ColorInput
              label="Color"
              value={textSettings.color}
              onChange={(v) => setTextSettings({ ...textSettings, color: v })}
            />
          </GridCol>
          <GridCol span={6}>
            <Stack gap={2.6}>
              <Text style={{ fontSize: 14 }} fw={500}>
                Font Style
              </Text>
              <FontPicker
                apiKey={"AIzaSyDV6nRS3iMjFwsp6PWeugwum1sXF1ZN8PI"}
                activeFontFamily={textSettings.fontFamily}
                onChange={(nextFont) =>
                  setTextSettings({
                    ...textSettings,
                    fontFamily: nextFont.family,
                  })
                }
                sort="popularity"
              />
            </Stack>
          </GridCol>
        </>
      )}
    </>
  );
};

export default PrintPreviewSettings;
