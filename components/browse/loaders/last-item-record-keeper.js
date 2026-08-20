"use client";

import UpdateURLParams from "@/utils/useUpdateParams";

const LastItemRecordKeeper = ({ lastItem, sortBy, firstItem }) => {
  let field = sortBy === "price-low" || sortBy === "price-high" ? "price" : "";
  console.log(sortBy);

  return (
    <>
      <UpdateURLParams
        params={{
          cursor1: lastItem[field],
          cursor2: lastItem?.ref,
          cursor3: firstItem?.ref,
        }}
        setLoad={(v) => console.log(v)}
      />
    </>
  );
};

export default LastItemRecordKeeper;
