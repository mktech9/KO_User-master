"use client";

import useWishlist from "@/libs/manage-wishlist";
import { ActionIcon, Box } from "@mantine/core";
import { PiHeartDuotone, PiHeart, PiHeartFill } from "react-icons/pi";

export const WishlistButton = ({ id }) => {
  const { addItemToWishlist, isWishlisted, removeItemFromWishlist, load } =
    useWishlist({ id: id });

  const wishlisted = isWishlisted();

  return (
    <Box style={{ position: "absolute", top: 10, right: 10 }}>
      <ActionIcon
        autoContrast
        color="red"
        size={"lg"}
        variant="subtle"
        onClick={() => {
          if (wishlisted) {
            removeItemFromWishlist();
          } else {
            addItemToWishlist();
          }
        }}
        loading={load}
        disabled={load}
      >
        {wishlisted ? (
          <PiHeartFill size={"1.5rem"} />
        ) : (
          <PiHeartDuotone size={"1.5rem"} />
        )}
      </ActionIcon>
    </Box>
  );
};

export const WishlistButtonDetailsPage = ({ id }) => {
  const { addItemToWishlist, isWishlisted, removeItemFromWishlist, load } =
    useWishlist({ id: id });

  const wishlisted = isWishlisted();

  return (
    <ActionIcon
      autoContrast
      color="red"
      size={"lg"}
      variant="subtle"
      onClick={() => {
        if (wishlisted) {
          removeItemFromWishlist();
        } else {
          addItemToWishlist();
        }
      }}
      loading={load}
      disabled={load}
    >
      {wishlisted ? (
        <PiHeartFill size={"1.75rem"} />
      ) : (
        <PiHeartDuotone size={"1.75rem"} />
      )}
    </ActionIcon>
  );
};
