import { checkIsAuthValid } from "@/auth";
import {
  AddAddress,
  EditAddress,
  GetAddress,
  RemoveAddress,
} from "@/libs/address-server-utils";
import useCache from "@/store/useCache";
import { notifications } from "@mantine/notifications";
import { useState } from "react";
import { v4 } from "uuid";

const useAddress = () => {
  const [load, setLoad] = useState(false);
  const [load2, setLoad2] = useState(false);
  const { address, setCache } = useCache();

  //add new address
  const newAddress = async (item) => {
    try {
      setLoad(true);
      let itemWithId = { id: v4(), ...item };
      const isAuth = await checkIsAuthValid();
      let success = false;

      if (isAuth) {
        success = await AddAddress(item);
      } else {
        const items = JSON.parse(localStorage.getItem("address")) ?? [];
        let copy = [...items, itemWithId];
        localStorage.setItem("address", JSON.stringify(copy));
        success = true;
      }

      if (!success) {
        throw new Error("Something went wrong!");
      }

      await getAddress();

      setLoad(false);
      notifications.show({
        title: "Saved!",
        autoClose: 1500,
        color: "green",
      });
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

  const removeAddress = async (item) => {
    try {
      setLoad(true);
      const isAuth = await checkIsAuthValid();
      let success = false;

      if (isAuth) {
        success = await RemoveAddress(item._id);
      } else {
        const items = JSON.parse(localStorage.getItem("address")) ?? [];
        let copy = [...items].filter((doc) => doc.id !== item.id);
        localStorage.setItem("address", JSON.stringify(copy));
        success = true;
      }

      if (!success) {
        throw new Error("Something went wrong!");
      }

      await getAddress();

      setLoad(false);
      notifications.show({
        title: "Removed!",
        autoClose: 1500,
        color: "green",
      });
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

  const editAddress = async (item, itemId, id) => {
    try {
      setLoad(true);
      const isAuth = await checkIsAuthValid();
      let success = false;

      if (isAuth) {
        success = await EditAddress(item, id);
      } else {
        const items = JSON.parse(localStorage.getItem("address")) ?? [];
        let copy = [...items];

        const idx = copy.findIndex((doc) => doc.id === itemId);
        if (idx >= 0) {
          copy[idx] = { ...item, id: itemId };
          localStorage.setItem("address", JSON.stringify(copy));
          success = true;
        }
      }

      if (!success) {
        throw new Error("Something went wrong!");
      }

      await getAddress();

      setLoad(false);
      notifications.show({
        title: "Removed!",
        autoClose: 1500,
        color: "green",
      });
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

  const getAddress = async () => {
    try {
      setLoad2(true);
      const isAuth = await checkIsAuthValid();
      let items = [];

      if (isAuth) {
        items = await GetAddress();
      } else {
        items = JSON.parse(localStorage.getItem("address")) ?? [];
      }

      setCache(items, "address");
      setLoad2(false);
    } catch (err) {
      console.log(err);
      setLoad2(false);
    }
  };

  return {
    newAddress,
    removeAddress,
    editAddress,
    getAddress,
    address,
    load,
    load2,
  };
};

export default useAddress;
