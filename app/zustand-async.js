"use client";

import useAddress from "@/hooks/use-address";
import { GetItems } from "@/libs/wishlist-server-utils";
import useCache from "@/store/useCache";
import useConfig from "@/store/use-config-store";
import { useEffect } from "react";

const CombinedLoaderAsync = ({ log, currency, language }) => {
  const { setCache } = useCache();
  const { getAddress } = useAddress();
  const { setConfig } = useConfig();

  useEffect(() => {
    console.log(log);

    // Run all tasks in parallel using Promise.all
    Promise.all([
      // Fetch and set wishlist items
      GetItems().then((items) => setCache(items, "wishlist")),

      // Fetch and set address
      getAddress().then(() => console.log("Address Retrieval done!")),

      // Set currency and language configurations (synchronous tasks)
      Promise.resolve().then(() => {
        setConfig(currency, "currency");
        setConfig(language, "language");
      }),
    ])
      .then(() => {
        console.log("All tasks completed successfully!");
      })
      .catch((error) => {
        console.error("An error occurred while running tasks:", error);
      });
  }, []);

  return <></>;
};

export default CombinedLoaderAsync;
