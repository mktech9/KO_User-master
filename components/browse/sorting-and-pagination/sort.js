"use client";

import UpdateURLParams from "@/utils/useUpdateParams";
import { Select } from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import { useEffect, useMemo, useState } from "react";

const SortInput = () => {
  const searchParams =
    typeof window !== "undefined" ? window.location.search : "";
  const [load, setLoad] = useState(false);

  const [value, setValue] = useState("latest");

  //debounce
  const [debounce] = useDebouncedValue(value, 500, { leading: true });

  const defaultVal = useMemo(() => {
    const params = new URLSearchParams(searchParams);

    //get parameters
    const pVal = params?.get("sortBy");
    const val = pVal ? pVal : "latest";

    return { val };
  }, [searchParams]);

  useEffect(() => {
    setValue(defaultVal.val);
  }, [defaultVal]);

  return (
    <>
      <UpdateURLParams
        params={{
          sortBy: debounce,
        }}
        setLoad={setLoad}
      />
      <Select
        variant="default"
        data={[
          { label: "Latest First", value: "latest" },
          { label: "Oldest First", value: "oldest" },
          { label: "Price low to high", value: "price-low" },
          { label: "Price high to low", value: "price-high" },
        ]}
        placeholder="Sort By"
        value={value}
        onChange={setValue}
      />
    </>
  );
};

export default SortInput;
