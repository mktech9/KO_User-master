"use client";

import useCache from "@/store/useCache";
import { notifications } from "@mantine/notifications";
import { useState } from "react";
import { PlaceOrder } from ".";
import { useRouter } from "next/navigation";
import { SetSession } from "../manage-user";

const usePlaceOrder = (isAuth) => {
  const [load, setLoad] = useState(false);
  const router = useRouter();
  const { address } = useCache();

  const placeOrder = async (
    items,
    summary,
    user,
    orderType,
    orderAddress,
    reseller,
    payLater,
    configs
  ) => {
    try {
      setLoad(true);
      const orderResp = await PlaceOrder(
        items,
        summary,
        user,
        address,
        orderType,
        orderAddress,
        reseller,
        payLater
      );

      if (!orderResp.success) {
        throw new Error(orderResp?.message ?? "Something went wrong!");
      }

      if (!isAuth) {
        await SetSession(orderResp.user);
      }

      if (orderResp?.payLater) {
        // router.push(`/status/${orderResp?.oid}`);
        window.location.href = `${configs?.url}/status/${orderResp?.oid}`;
      } else {
        router.push(orderResp?.paymentLink);
        localStorage.setItem("refresh", true);
      }

      setLoad(false);
    } catch (err) {
      console.log(err);
      setLoad(false);
      notifications.show({
        title: err?.message ?? "",
        color: "red",
        autoClose: 1500,
      });
    }
  };

  return { placeOrder, load };
};

export default usePlaceOrder;
