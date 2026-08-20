"use client";

import { ChipSelect, ColorSelect } from "@/components/search/advanced";
import UpdateURLParams from "@/utils/useUpdateParams";
import { useDebouncedValue } from "@mantine/hooks";
import { useEffect, useMemo, useState } from "react";

const FilterModule = ({
  type,
  data,
  title,
  defaultValue,
  paramName,
  header,
}) => {
  const searchParams =
    typeof window !== "undefined" ? window.location.search : "";
  const [load, setLoad] = useState(false);

  const [value, setValue] = useState(defaultValue);
  let Item = type === "color" ? ColorSelect : ChipSelect;

  //debounce
  const [debounce] = useDebouncedValue(value, 500, { leading: true });

  const defaultVal = useMemo(() => {
    const params = new URLSearchParams(searchParams);

    //get parameters
    const pVal = params?.get(paramName);
    const val = pVal ? pVal?.split(",") : [];

    return { val };
  }, [searchParams]);

  useEffect(() => {
    setValue(defaultVal.val);
  }, [defaultVal]);

  return (
    <>
      <UpdateURLParams
        params={{
          [paramName]: debounce?.join(","),
        }}
        setLoad={setLoad}
      />
      <Item
        text={title}
        value={value}
        setValue={setValue}
        data={data}
        load={load}
        header={header}
      />
    </>
  );
};

export default FilterModule;
