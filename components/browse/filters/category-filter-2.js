"use client";

import { Checkbox, Divider, Group, Loader, Stack, Text } from "@mantine/core";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

let filterList = [
  "stock",
  "filterBy",
  "label",
  "color",
  "capacity",
  "material",
  "type",
];

const CategoryFilter2 = ({ text, data, header }) => {
  const router = useRouter();
  const params = useParams();
  const searchParams =
    typeof window !== "undefined" ? window.location.search : "";
  const [load, setLoad] = useState(false);
  let length = data?.length;

  const paramsUrl = useMemo(() => {
    return Object.keys(searchParams)
      .filter((doc) => filterList?.includes(doc))
      ?.map((doc) => `${doc}=${searchParams[doc]}`)
      ?.join("&");
  }, [searchParams]);

  //value states
  const [value, setValue] = useState([]);
  const [subs, setSubs] = useState([]);
  const [types, setTypes] = useState([]);

  //Update default value
  useEffect(() => {
    setValue(
      params.category
        ? [decodeURIComponent(params?.category?.replace(/-/g, " "))]
        : []
    );
    setSubs(
      params.subcategory
        ? [decodeURIComponent(params?.subcategory?.replace(/-/g, " "))]
        : []
    );
    setTypes(
      params.subtypes
        ? [decodeURIComponent(params?.subtypes?.replace(/-/g, " "))]
        : []
    );
  }, [params]);

  //get category
  const getCategoryStrings = (c, s, t) => {
    let categories = c?.join(","),
      subcategories = s?.join(","),
      subtypes = t?.join(",");

    return { categories, subcategories, subtypes };
  };

  //add main
  const addMain = (val) => {
    let copy = [...value, val];
    setValue(copy);

    if (copy?.length !== 1) {
      const cateStrings = getCategoryStrings(copy, subs, types);
      router.replace(
        `/products?category=${cateStrings.categories}&subCategory=${cateStrings.subcategories}&subTypes=${cateStrings.subtypes}&${paramsUrl}`
      );
    }
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

    if (copy?.length !== 1) {
      const cateStrings = getCategoryStrings(copy, subCopy, typesCopy);
      router.replace(
        `/products?category=${cateStrings.categories}&subCategory=${cateStrings.subcategories}&subTypes=${cateStrings.subtypes}&${paramsUrl}`
      );
    }
  };

  //add sub
  const addSub = (val) => {
    let copy = [...subs, val];
    setSubs(copy);

    if (copy?.length > 1) {
      const cateStrings = getCategoryStrings(value, copy, types);
      router.replace(
        `/products?category=${cateStrings.categories}&subCategory=${cateStrings.subcategories}&subTypes=${cateStrings.subtypes}&${paramsUrl}`
      );
    } else if (copy?.length === 1) {
      router.replace(
        `/${params?.category}/${encodeURIComponent(
          val?.replace(/\s/g, "-")
        )}?${paramsUrl}`
      );
    } else {
      router.replace(`/${params?.category}?${paramsUrl}`);
    }
  };

  //remove sub
  const removeSub = (val, doc) => {
    let copy = [...subs].filter((doc) => doc !== val);

    //remove any subTypes
    let type = doc?.subTypes?.map((doc) => doc.name);
    const typesCopy = [...types].filter((d) => !type.includes(d));

    setTypes(typesCopy);
    setSubs(copy);

    if (copy?.length > 1) {
      const cateStrings = getCategoryStrings(value, copy, typesCopy);
      router.replace(
        `/products?category=${cateStrings.categories}&subCategory=${cateStrings.subcategories}&subTypes=${cateStrings.subtypes}&${paramsUrl}`
      );
    } else if (copy?.length === 1) {
      router.replace(
        `/${encodeURIComponent(params?.category)}/${encodeURIComponent(
          encodeURIComponent(val?.replace(/\s/g, "-"))
        )}?${paramsUrl}`
      );
    } else {
      router.replace(`/${encodeURIComponent(params?.category)}?${paramsUrl}`);
    }
  };

  //add type
  const addType = (val) => {
    let copy = [...types, val];
    setTypes(copy);

    if (copy?.length > 1) {
      const cateStrings = getCategoryStrings(value, subs, copy);
      router.replace(
        `/products?category=${cateStrings.categories}&subCategory=${cateStrings.subcategories}&subTypes=${cateStrings.subtypes}&${paramsUrl}`
      );
    } else if (copy?.length === 1) {
      router.replace(
        `/${encodeURIComponent(params?.category)}/${encodeURIComponent(
          params?.subcategory
        )}/${encodeURIComponent(val?.replace(/\s/g, "-"))}?${paramsUrl}`
      );
    } else {
      router.replace(
        `/${encodeURIComponent(params?.category)}/${encodeURIComponent(
          params?.subcategory
        )}?${paramsUrl}`
      );
    }
  };

  //remove type
  const removeType = (val) => {
    let copy = [...types].filter((doc) => doc !== val);
    setTypes(copy);

    if (copy?.length > 1) {
      const cateStrings = getCategoryStrings(value, subs, copy);
      router.replace(
        `/products?category=${cateStrings.categories}&subCategory=${cateStrings.subcategories}&subTypes=${cateStrings.subtypes}&${paramsUrl}`
      );
    } else if (copy?.length === 1) {
      router.replace(
        `/${params?.category}/${params?.subcategory}/${encodeURIComponent(
          val?.replace(/\s/g, "-")
        )}?${paramsUrl}`
      );
    } else {
      router.replace(
        `/${params?.category}/${params?.subcategory}?${paramsUrl}`
      );
    }
  };

  return (
    <>
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

export default CategoryFilter2;
