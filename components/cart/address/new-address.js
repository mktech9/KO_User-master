"use client";

import {
  Button,
  CloseButton,
  Grid,
  GridCol,
  Group,
  Modal,
  ModalBody,
  ModalHeader,
  Space,
  Text,
} from "@mantine/core";
import {
  FloatingLabelArea,
  FloatingLabelInput,
  FloatingLabelSelect,
} from "./floating-label";
import { useInput } from "@/hooks/use-input";
import { codes } from "@/utils/codes";
import useAddress from "@/hooks/use-address";
import { useEffect } from "react";
import { Countries } from "./countries";

const NewAddress = ({ opened, close, edit }) => {
  const { input: fName } = useInput((v) => v !== "", "");
  const { input: lName } = useInput((v) => v !== "", "");
  const { input: address } = useInput((v) => v !== "", "");
  const { input: landmark } = useInput((v) => v !== "", "");
  const { input: country } = useInput((v) => v !== "", "");
  const { input: zip } = useInput((v) => v !== "", "");
  const { input: state } = useInput((v) => v !== "", "");
  const { input: area } = useInput((v) => v !== "", "");
  const { input: mobile } = useInput((v) => v !== "", "");
  const { input: code } = useInput((v) => v !== "", "+971");

  useEffect(() => {
    if (edit) {
      fName.setInput(edit?.fName);
      lName.setInput(edit?.lName);
      address.setInput(edit?.address);
      landmark.setInput(edit?.landmark);
      state.setInput(edit?.state);
      area.setInput(edit?.area);
      mobile.setInput(edit?.mobile);
      code.setInput(edit?.mobileCode);
      country.setInput(edit?.country);
      zip.setInput(edit?.zip);
    } else {
      clearInput();
    }
  }, [edit]);

  const { newAddress, editAddress, load } = useAddress();

  const getDocument = () => {
    return {
      fName: fName.inputValue,
      lName: lName.inputValue,
      address: address.inputValue,
      landmark: landmark.inputValue,
      state: state.inputValue,
      area: area.inputValue,
      mobile: mobile.inputValue,
      mobileCode: code.inputValue,
      country: country.inputValue,
      zip: zip.inputValue,
    };
  };

  const clearInput = () => {
    fName.clearInput();
    lName.clearInput();
    address.clearInput();
    landmark.clearInput();
    state.clearInput();
    area.clearInput();
    mobile.clearInput();
    code.setInput("+971");
    country.clearInput();
    zip.clearInput();
  };

  const newAddressHandler = async () => {
    if (
      !fName.isValid ||
      !lName.isValid ||
      !address.isValid ||
      !state.isValid ||
      !area.isValid ||
      !mobile.isValid ||
      !code.isValid ||
      !country.isValid ||
      !zip.isValid
    ) {
      fName.blurHandler();
      lName.blurHandler();
      address.blurHandler();
      state.blurHandler();
      area.blurHandler();
      mobile.blurHandler();
      code.blurHandler();
      country.blurHandler();
      zip.blurHandler();
      return;
    }

    const doc = getDocument();
    console.log(doc);
    if (edit) {
      await editAddress(doc, edit?.id, edit?._id);
    } else {
      await newAddress(doc);
    }
    clearInput();
    close();
  };

  return (
    <Modal size={"lg"} opened={opened} onClose={close} withCloseButton={false}>
      <ModalHeader>
        <Group w={"100%"} justify="space-between">
          <Text fw={500} size="sm">
            {edit ? "Edit Address" : "New Address"}
          </Text>
          <CloseButton onClick={close} />
        </Group>
      </ModalHeader>
      <ModalBody>
        <Space h={15} />
        <Grid>
          <GridCol span={{ base: 12, md: 6 }}>
            <FloatingLabelInput
              label="First Name"
              placeholder="First Name"
              value={fName.inputValue}
              onChange={fName.inputHandler}
              error={fName.error ? "Required" : ""}
            />
          </GridCol>
          <GridCol span={{ base: 12, md: 6 }}>
            <FloatingLabelInput
              label="Last Name"
              placeholder="Last Name"
              value={lName.inputValue}
              onChange={lName.inputHandler}
              error={lName.error ? "Required" : ""}
            />
          </GridCol>
          <GridCol span={{ base: 12 }}>
            <FloatingLabelArea
              label="Address"
              placeholder="Address"
              value={address.inputValue}
              onChange={address.inputHandler}
              error={address.error ? "Required" : ""}
              autoSize
            />
          </GridCol>
          <GridCol span={{ base: 12 }}>
            <FloatingLabelInput
              label="Landmark (Optional)"
              placeholder="Landmark (Optional)"
              value={landmark.inputValue}
              onChange={landmark.inputHandler}
              error={landmark.error ? "Required" : ""}
            />
          </GridCol>
          <GridCol span={{ base: 12, md: 4 }}>
            <FloatingLabelSelect
              label="Country"
              placeholder="Country"
              data={Countries.map((doc) => doc.name)}
              value={country.inputValue}
              onChange={country.setInput}
              error={country.error ? "Required" : ""}
              searchable
            />
          </GridCol>
          <GridCol span={{ base: 12, md: 4 }}>
            <FloatingLabelInput
              label="City"
              placeholder="City"
              value={state.inputValue}
              onChange={state.inputHandler}
              error={state.error ? "Required" : ""}
            />
          </GridCol>
          <GridCol span={{ base: 12, md: 4 }}>
            <FloatingLabelInput
              label="Postal Code"
              placeholder="Postal Code"
              value={zip.inputValue}
              onChange={zip.inputHandler}
              error={zip.error ? "Required" : ""}
            />
          </GridCol>
          <GridCol span={{ base: 12 }}>
            <FloatingLabelInput
              label="Area"
              placeholder="Area"
              value={area.inputValue}
              onChange={area.inputHandler}
              error={area.error ? "Required" : ""}
            />
          </GridCol>
          <GridCol span={{ base: 4 }}>
            <FloatingLabelSelect
              label="Country Code"
              placeholder="Country Code"
              data={codes.map((doc) => {
                let active = `${doc?.dial_code}` === code.inputValue;
                return {
                  label: active
                    ? `${doc.dial_code}`
                    : `${doc?.dial_code} (${doc.name})`,
                  value: `${doc?.dial_code}`,
                };
              })}
              value={code.inputValue}
              onChange={code.setInput}
              searchable
            />
          </GridCol>
          <GridCol span={{ base: 8 }}>
            <FloatingLabelInput
              label="Mobile Number"
              placeholder="Mobile Number"
              value={mobile.inputValue}
              onChange={mobile.inputHandler}
              error={mobile.error ? "Required" : ""}
            />
          </GridCol>
        </Grid>
        <Space h={30} />
        <Group justify="right">
          <Button
            autoContrast
            onClick={newAddressHandler}
            disabled={load}
            loading={load}
          >
            Save
          </Button>
        </Group>
      </ModalBody>
    </Modal>
  );
};

export default NewAddress;
