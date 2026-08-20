"use client";

import { usePathname, useRouter } from "next/navigation";
import { memo, useEffect } from "react";

const ignoreList = ["cursor1", "cursor2", "cursor3", "page", "next"];

export const useURLParams = (params, setLoad) => {
  const router = useRouter();
  const searchParams =
    typeof window !== "undefined" ? window.location.search : "";
  const pathname = usePathname();

  const updateParams = async () => {
    const paramsToUpdate = new URLSearchParams(searchParams);
    for (const key in params) {
      if (!ignoreList?.includes(key)) {
        paramsToUpdate.set("page", 1);
      }

      if (params[key] !== undefined && params[key] !== null) {
        paramsToUpdate.set(key, params[key]);
      }
    }

    await new Promise((resolve) => {
      router.replace(`${pathname}?${paramsToUpdate}`, { scroll: false });
      setTimeout(() => {
        resolve(true);
      }, 1500);
    });
  };

  useEffect(() => {
    setLoad(true);
    updateParams().then(() => setLoad(false));
  }, [params]);

  return null;
};

export const UpdateURLParams = memo(
  ({ params, setLoad }) => {
    useURLParams(params, setLoad ? setLoad : (v) => console.log(v));
    return <></>;
  },
  (prevProps, nextProps) =>
    JSON.stringify(prevProps.params) === JSON.stringify(nextProps.params)
);

export default UpdateURLParams;
