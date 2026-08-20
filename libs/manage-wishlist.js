import { GetUserRef } from "@/auth";
import useCache from "@/store/useCache";
import { notifications } from "@mantine/notifications";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AddToWishlist, RemoveFromWishlist } from "./wishlist-server-utils";

const useWishlist = ({ id }) => {
  const router = useRouter();

  const { wishlist, setCache } = useCache();
  const [load, setLoad] = useState(false);

  const isWishlisted = () => {
    return wishlist?.includes(id);
  };

  const addItemToWishlist = async () => {
    try {
      setLoad(true);
      const userId = await GetUserRef();

      if (!userId) {
        return router.push("/auth");
      }

      console.log(id, userId);
      const item = await AddToWishlist({ userId, id });
      console.log(item);
      setCache(item?.products ?? [], "wishlist");
      setLoad(false);
    } catch (err) {
      console.log(err);
      setLoad(false);
      notifications.show({
        title: err?.message,
        autoClose: 1500,
        color: "red",
      });
    }
  };

  const removeItemFromWishlist = async () => {
    try {
      setLoad(true);
      const userId = await GetUserRef();

      if (!userId) {
        return router.push("/auth");
      }

      const item = await RemoveFromWishlist({ userId, id });
      console.log(item);

      setCache(item?.products ?? [], "wishlist");
      setLoad(false);
    } catch (err) {
      console.log(err);
      setLoad(false);
      notifications.show({
        title: err?.message,
        autoClose: 1500,
        color: "red",
      });
    }
  };

  return {
    addItemToWishlist,
    removeItemFromWishlist,
    wishlist,
    load,
    isWishlisted,
  };
};

export default useWishlist;
