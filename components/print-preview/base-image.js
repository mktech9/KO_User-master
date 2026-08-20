import { Box, Center, Container, Image } from "@mantine/core";
import LogoMover, { Logo } from "./logo-mover";
import TextMover from "./text-mover";
import { useRef } from "react";
import ImageMover from "./image-mover";

const BaseImage = ({
  active,
  setActive,
  show,
  logo,
  text,
  textSettings,
  image,
  catalogue,
  setCatalouge,
}) => {
  const parentRef = useRef(null);

  if (!parentRef) {
    return;
  }

  return (
    <>
      <Center id="print-preview">
        <Box
          w={"fit-content"}
          ref={parentRef}
          style={{ position: "relative", overflow: "hidden" }}
        >
          <Image
            w={"100%"}
            fit="contain"
            src={image?.url}
            alt={image?.alt}
            title={image?.alt}
            onClick={() => setActive("Preview")}
          />
          {catalogue && show["Catalogue"] && (
            <LogoMover
              edit={active === "Catalogue"}
              setActive={() => setActive("Catalogue")}
              parent={parentRef.current}
              clear={() => setCatalouge(null)}
              key={3}
            >
              <ImageMover
                image={catalogue?.image}
                onClick={() => setActive("Catalogue")}
                key={catalogue?.image}
              />
            </LogoMover>
          )}
          {logo?.inputValue && show["Logo"] && (
            <LogoMover
              edit={active === "Logo"}
              setActive={() => setActive("Logo")}
              parent={parentRef.current}
              clear={() => logo.setInput(null)}
              key={1}
            >
              <Logo logo={logo} onClick={() => setActive("Logo")} />
            </LogoMover>
          )}
          {text?.inputValue !== "" && show["Text"] && (
            <LogoMover
              edit={active === "Text"}
              setActive={() => setActive("Text")}
              parent={parentRef.current}
              clear={() => text.setInput("")}
              key={2}
            >
              <TextMover
                text={text}
                attributes={textSettings}
                onClick={() => setActive("Text")}
              />
            </LogoMover>
          )}
        </Box>
      </Center>
    </>
  );
};

export default BaseImage;
