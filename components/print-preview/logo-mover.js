"use client";

import { ActionIcon, Box, Center, Image, Paper } from "@mantine/core";

import "./css/styles.css";
import { useEffect, useMemo, useRef, useState } from "react";
import Moveable from "react-moveable";
import { PiX } from "react-icons/pi";

const LogoMover = ({ edit: isEdit, children, setActive, parent, clear }) => {
  const [target, setTarget] = useState(false);

  const childRef = useRef(null);
  const [childStyle, setChildStyle] = useState({
    width: "100px",
    height: "100px",
    top: "50px",
    left: "50px",
  });

  if (!childRef || !parent) {
    console.log("YODA");
    return <></>;
  }

  useEffect(() => {
    setTarget(childRef.current);
  }, [childRef.current]);

  return (
    <>
      <Paper
        ref={childRef}
        bg={"transparent"}
        onClick={() => setActive()}
        style={{
          ...childStyle,
          position: "absolute",
        }}
      >
        <Box w={"100%"} h={"100%"} style={{ position: "relative" }}>
          {children}
          {isEdit && (
            <Center
              w={"100%"}
              style={{
                position: "absolute",
                bottom: -34,
                zIndex: 999,
              }}
            >
              <ActionIcon radius={"xl"} size={"xs"} onClick={clear}>
                <PiX />
              </ActionIcon>
            </Center>
          )}
        </Box>
      </Paper>
      {target && (
        <Moveable
          target={target}
          container={parent}
          draggable={isEdit}
          resizable={isEdit}
          rotatable={isEdit}
          scalable={isEdit}
          snappable={isEdit}
          keepRatio={false}
          hideDefaultLines={!isEdit}
          onDrag={(e) => {
            setChildStyle((prevStyle) => ({
              ...prevStyle,
              top: `${e.top}px`,
              left: `${e.left}px`,
            }));
          }}
          onResize={(e) => {
            setChildStyle((prevStyle) => ({
              ...prevStyle,
              width: `${e.width}px`,
              height: `${e.height}px`,
              top: `${e.top}px`,
              left: `${e.left}px`,
            }));
          }}
          onRotate={(e) => {
            childRef.current.style.transform = `rotate(${e.beforeRotate}deg)`;
          }}
          onScale={(e) => {
            setChildStyle((prevStyle) => ({
              ...prevStyle,
              transform: `scale(${e.scale[0]})`,
            }));
          }}
        />
      )}
    </>
  );
};

export const Logo = ({ logo, onClick }) => {
  let image = useMemo(() => {
    if (logo.inputValue) {
      return URL.createObjectURL(logo.inputValue);
    }
  }, [logo.inputValue]);

  if (image) {
    return (
      <Box w={"100%"} h={"100%"} style={{ zIndex: 99 }} onClick={onClick}>
        <Image src={image} fit="contain" />
      </Box>
    );
  }
};

export default LogoMover;
