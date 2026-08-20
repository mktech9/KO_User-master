"use client";

import { Box, Card, Stack, Textarea } from "@mantine/core";
import StepIndicator from "./step-indicator";
import dynamic from "next/dynamic";

const PrintPreviewWrapper = dynamic(
  () => import("@/components/print-preview/wrapper/print-preview-wrapper"),
  { ssr: false }
);

const Step3 = ({
  image,
  text,
  driveLink,
  preview,
  setPreview,
  product,
  reseller,
  isVendor,
  comments,
  setComments,
}) => {
  return (
    <>
      <Stack gap={5}>
        <StepIndicator
          step={"3"}
          hideNum={isVendor}
          text="Customize & Preview"
        />
        <Card withBorder p={10} mt={5}>
          <PrintPreviewWrapper
            image={product?.printSample}
            text={text}
            logo={image}
            link={driveLink}
            preview={preview}
            setPreview={setPreview}
            reseller={reseller}
            comments={comments}
            setComments={setComments}
          />
          {!isVendor && (
            <Box mt={15}>
              <Textarea
                autosize
                placeholder="Paste the Google Drive link for the high-resolution logo/image file"
                description="file formats: Pdf, Svg, Ai*"
                variant="filled"
                radius={"md"}
                value={driveLink.inputValue}
                onChange={driveLink.inputHandler}
              />
            </Box>
          )}
        </Card>
      </Stack>
    </>
  );
};

export default Step3;
