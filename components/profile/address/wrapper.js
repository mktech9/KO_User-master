"use client";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import { GridCol } from "@mantine/core";
import NewAddress from "@/components/cart/address/new-address";
import SelectAddress from "@/components/cart/address/select-address";

const AddressWrapper = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const [edit, setEdit] = useState(null);

  return (
    <>
      <GridCol span={{ base: 12, md: 9.5 }}>
        <SelectAddress
          open={open}
          type={"shipping"}
          edit={edit}
          setEdit={setEdit}
          setAddress={() => console.log(v)}
          address={""}
          disableSelection
        />
      </GridCol>
      <NewAddress opened={opened} close={close} edit={edit} />
    </>
  );
};

export default AddressWrapper;
