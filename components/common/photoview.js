"use client";

import { Button } from "@mantine/core";
import { useState } from "react";
import { PiGridFourFill } from "react-icons/pi";
import { PhotoSlider } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";

const AllImages = ({ images }) => {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <Button
        leftSection={<PiGridFourFill />}
        style={{
          background: "#fff",
          color: "black",
          position: "absolute",
          top: 0,
          right: 0,
        }}
        onClick={() => setVisible(true)}
        size="compact-sm"
      >
        Fullscreen
      </Button>
      <PhotoSlider
        images={images.map((item, i) => ({
          src: item?.publicUrl,
          key: i,
        }))}
        visible={visible}
        onClose={() => setVisible(false)}
      />
    </>
  );
};

export default AllImages;
