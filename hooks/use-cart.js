"use client";

import { useState } from "react";
import { v4 } from "uuid";
import {
  AddtoCart,
  ChangeQuantity,
  GetItems,
  PopulateLocalCart,
  RemoveFromCart,
} from "@/libs/cart-server-utils";
import { checkIsAuthValid } from "@/auth";
import useCache from "@/store/useCache";
import { notifications } from "@mantine/notifications";

const useCart = () => {
  //status update states
  const [load, setLoad] = useState(false);
  const { cart, setCache } = useCache();

  //add to cart
  const addToCart = async (item) => {
    try {
      setLoad(true);
      let itemWithId = { id: v4(), ...item };
      const items = await AddToCart(itemWithId);
      setCache(items, "cart");
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

  //change item quantity
  const dialQuantity = async (itemId, id, inc, v) => {
    try {
      setLoad(true);
      const isAuth = await checkIsAuthValid();
      let items = [];

      if (isAuth) {
        items = await ChangeQuantity(inc, id, v);
        console.log(items);
      } else {
        items = await DialLocalQuantity(inc, itemId, v);
      }

      setCache(items, "cart");
      setLoad(false);
    } catch (err) {
      setLoad(true);
      console.log(err);
      setLoad(false);
      notifications.show({
        title: err?.message,
        autoClose: 1500,
        color: "red",
      });
    }
  };

  //remove from cart
  const removeFromCart = async (id, itemId) => {
    try {
      setLoad(true);
      const items = await removedFromCart(id, itemId);
      setCache(items, "cart");
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

  //get cart items
  const getItems = async () => {
    try {
      setLoad(true);
      const isAuth = await checkIsAuthValid();
      let items = [];

      if (isAuth) {
        items = await GetItems();
      } else {
        const local = JSON.parse(localStorage?.getItem("cart")) ?? [];
        items = await PopulateLocalCart(local);
        console.log(local, items);
      }

      setCache(items, "cart");
      setLoad(false);
    } catch (err) {
      console.log(err);
    }
  };

  return { addToCart, load, removeFromCart, getItems, cart, dialQuantity };
};

export default useCart;

export const AddToCart = async (item) => {
  const isAuth = await checkIsAuthValid();

  let items = [];
  if (isAuth) {
    items = await AddtoCart({ item });
  } else {
    const cartItems = JSON.parse(localStorage.getItem("cart") ?? "[]");
    const copy = [...cartItems, item];
    localStorage.setItem("cart", JSON.stringify(copy));
    items = await PopulateLocalCart(copy);
  }
  return items;
};

export const DialLocalQuantity = async (inc, id, v) => {
  let cartItems = JSON.parse(localStorage.getItem("cart") ?? "[]");

  const idx = cartItems?.findIndex((doc) => doc.id === id);
  if (idx >= 0) {
    if (v > 0) {
      cartItems[idx].config.qty = +v;
    } else {
      cartItems[idx].config.qty += inc ? 1 : -1;
    }

    localStorage.setItem("cart", JSON.stringify(cartItems));
    const items = await PopulateLocalCart(cartItems);
    return items;
  }
};

const removedFromCart = async (_id, itemId) => {
  const isAuth = await checkIsAuthValid();

  let items = [];
  if (isAuth) {
    items = await RemoveFromCart(_id);
  } else {
    const cartItems = JSON.parse(localStorage.getItem("cart") ?? "[]");
    const copy = cartItems?.filter((doc) => doc.id !== itemId);
    localStorage.setItem("cart", JSON.stringify(copy));
    items = await PopulateLocalCart(copy);
  }
  return items;
};
