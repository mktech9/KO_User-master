"use client";

import UpdateURLParams from "@/utils/useUpdateParams";
import { Checkbox, Divider, Group, Loader, Stack, Text } from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import { useEffect, useMemo, useState } from "react";

const CategoryFilter = ({ text, data, header }) => {
  const searchParams =
    typeof window !== "undefined" ? window.location.search : "";
  const [load, setLoad] = useState(false);
  let length = data?.length;

  //value states
  const [value, setValue] = useState([]);
  const [subs, setSubs] = useState([]);
  const [types, setTypes] = useState([]);

  //debounce
  const [debounce] = useDebouncedValue({ value, subs, types }, 500, {
    leading: true,
  });

  const defaultValue = useMemo(() => {
    const params = new URLSearchParams(searchParams);

    //get parameters
    const pCate = params?.get("category"),
      pSub = params?.get("subCategory"),
      pType = params?.get("subTypes");

    const cate = pCate ? pCate?.split(",") : [],
      sub = pSub ? pSub?.split(",") : [],
      type = pType ? pType?.split(",") : [];

    return { cate, sub, type };
  }, [searchParams]);

  //Update default value
  useEffect(() => {
    setValue(defaultValue.cate);
    setSubs(defaultValue.sub);
    setTypes(defaultValue.type);
  }, [defaultValue]);

  //add main
  const addMain = (val) => {
    let copy = [...value, val];
    setValue(copy);
  };

  //remove main
  const removeMain = (val, doc) => {
    let copy = [...value].filter((doc) => doc !== val);

    let type = [],
      sub = [];
    doc?.subCategory?.forEach((d) => {
      let items = d.subTypes.map((ds) => ds.name);
      type = [...type, ...items];
      sub.push(d.name);
    });

    const subCopy = [...subs].filter((d) => !sub.includes(d));
    setSubs(subCopy);

    const typesCopy = [...types].filter((d) => !type.includes(d));
    setTypes(typesCopy);

    setValue(copy);
  };

  //add sub
  const addSub = (val) => {
    let copy = [...subs, val];
    setSubs(copy);
  };

  //remove sub
  const removeSub = (val, doc) => {
    let copy = [...subs].filter((doc) => doc !== val);

    //remove any subTypes
    let type = doc?.subTypes?.map((doc) => doc.name);
    const typesCopy = [...types].filter((d) => !type.includes(d));

    setTypes(typesCopy);
    setSubs(copy);
  };

  //add type
  const addType = (val) => {
    let copy = [...types, val];
    setTypes(copy);
  };

  //remove type
  const removeType = (val) => {
    let copy = [...types].filter((doc) => doc !== val);
    setTypes(copy);
  };

  return (
    <>
      {/* Initialize URL Change */}
      <UpdateURLParams
        params={{
          category: debounce.value?.join(","),
          subCategory: debounce.subs?.join(","),
          subTypes: debounce.types?.join(","),
        }}
        setLoad={setLoad}
      />
      <Stack gap={0} className="advanced-search">
        {!header && (
          <Group justify="space-between" mb={10}>
            <Text fw={700} style={{ fontSize: 15 }}>
              {text}
            </Text>
            {load && <Loader type="dots" size={"sm"} />}
          </Group>
        )}

        <Stack gap={10}>
          {data?.map((doc, i) => {
            const isChecked = value?.includes(doc.name);

            //level 1 Main
            return (
              <>
                <Checkbox
                  size="xs"
                  styles={{
                    label: {
                      fontWeight: 500,
                      fontSize: 14,
                    },
                  }}
                  value={`${doc.name}`}
                  label={doc.name}
                  key={doc.id}
                  checked={isChecked}
                  onChange={() =>
                    isChecked ? removeMain(doc.name, doc) : addMain(doc.name)
                  }
                />
                {isChecked && doc.subCategory?.length > 0 && (
                  //level 2 Subs
                  <Stack my={5}>
                    {doc?.subCategory?.map((sb) => {
                      const isSubChecked = subs?.includes(sb?.name);

                      return (
                        <>
                          <Checkbox
                            size="xs"
                            styles={{
                              label: {
                                fontWeight: 500,
                                fontSize: 14,
                              },
                            }}
                            ml={30}
                            value={sb.name}
                            label={sb.name}
                            key={sb.id}
                            checked={isSubChecked}
                            onChange={() =>
                              isSubChecked
                                ? removeSub(sb.name, sb)
                                : addSub(sb.name)
                            }
                          />
                          {isSubChecked && sb.subTypes?.length > 0 && (
                            //level 3 Types
                            <Stack my={5}>
                              {sb?.subTypes?.map((d) => {
                                const isTypeChecked = types?.includes(d?.name);

                                return (
                                  <Checkbox
                                    size="xs"
                                    styles={{
                                      label: {
                                        fontWeight: 500,
                                        fontSize: 14,
                                      },
                                    }}
                                    ml={60}
                                    value={d.name}
                                    label={d.name}
                                    key={d.id}
                                    checked={isTypeChecked}
                                    onChange={() =>
                                      isTypeChecked
                                        ? removeType(d.name)
                                        : addType(d.name)
                                    }
                                  />
                                );
                              })}
                            </Stack>
                          )}
                        </>
                      );
                    })}
                  </Stack>
                )}
                {i !== length - 1 && <Divider />}
              </>
            );
          })}
        </Stack>
      </Stack>
    </>
  );
};

export default CategoryFilter;
