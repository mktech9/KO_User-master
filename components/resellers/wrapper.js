"use client";

import { database } from "@/firebase";
import { useInput } from "@/hooks/use-input";
import {
  Button,
  Card,
  Container,
  Divider,
  Grid,
  GridCol,
  Group,
  Select,
  Stack,
  Switch,
  Text,
  TextInput,
  Textarea,
} from "@mantine/core";
import { useEffect, useState } from "react";
import { countryList } from "./country-list";
import { notifications } from "@mantine/notifications";
import { hash } from "bcryptjs";
import FileUpload from "../product/steps/file-upload";
import { uploadFileToFirebaseStorage } from "../product/purchase/utils";
import { useRouter } from "next/navigation";
import { baseUrl } from "@/config";
import { useMediaQuery } from "@mantine/hooks";

const CustomRequiredLabel = ({ label }) => {
  return (
    <Group>
      <Text size="sm" fw={500}>
        {label} &nbsp;
        <Text fw={500} size="sm" c="red" fs="italic" span>
          (Req.)
        </Text>
      </Text>
    </Group>
  );
};

const ResellerWrapper = ({ sales: personList, configs }) => {
  const matches = useMediaQuery("(max-width: 64em)");

  //sales query data
  const [load, setLoad] = useState(false);
  const router = useRouter();

  const [shippingAsBilling, setShippingIsBilling] = useState(true);

  const { input: mtc } = useInput((v) => v !== "", "");
  const { input: companyName } = useInput((v) => v !== "", "");
  const { input: comContact } = useInput((v) => v !== "", "");
  const { input: purchaseMobileNo } = useInput((v) => v !== "", "");
  const { input: purchaseNo } = useInput((v) => v !== "", "");
  const { input: purchaseEmail } = useInput((v) => v !== "", "");
  const { input: accPerson } = useInput((v) => v !== "", "");
  const { input: accMobileNo } = useInput((v) => v !== "", "");
  const { input: accEmail } = useInput((v) => v !== "", "");
  const { input: mobileNo } = useInput((v) => v !== "", "");
  const { input: emailId } = useInput((v) => v !== "", "");
  const { input: pass } = useInput((v) => v !== "", "");
  const { input: emailId2 } = useInput((v) => v !== "", "");
  const { input: emailIdOptional } = useInput((v) => v !== "", "");
  const { input: whatsappOptional } = useInput((v) => v !== "", "");

  //billing
  const { input: billCountry } = useInput((v) => v !== "", "");
  const { input: billCity } = useInput((v) => v !== "", "");
  const { input: billAddress } = useInput((v) => v !== "", "");

  //shipping
  const { input: shipCountry } = useInput((v) => v !== "", "");
  const { input: shipCity } = useInput((v) => v !== "", "");
  const { input: shipAddress } = useInput((v) => v !== "", "");

  const [license, setLicense] = useState(null);
  const [vat, setVat] = useState(null);
  const [eid, setEid] = useState(null);
  const [eidBack, setEidBack] = useState(null);

  const submitHandler = async () => {
    try {
      setLoad(true);

      if (
        !mtc.isValid ||
        !companyName.isValid ||
        !comContact.isValid ||
        !purchaseMobileNo.isValid ||
        !purchaseNo.isValid ||
        !purchaseEmail.isValid ||
        !accEmail.isValid ||
        !accMobileNo.isValid ||
        !accPerson.isValid ||
        !emailId.isValid ||
        !pass.isValid ||
        !license ||
        !vat ||
        !eid ||
        !eidBack ||
        !whatsappOptional.isValid
      ) {
        return notifications.show({
          title: "Please fill all the required fields before proceeding!",
          autoClose: 3000,
          color: "red",
        });
      }

      let doc = {
        shippingAsBilling,
        mtc: mtc.inputValue,
        companyName: companyName.inputValue,
        comContact: comContact.inputValue,
        purchaseMobileNo: purchaseMobileNo.inputValue,
        purchaseEmail: purchaseEmail.inputValue,
        purchaseNo: purchaseNo.inputValue,
        accPerson: accPerson.inputValue,
        accMobileNo: accMobileNo.inputValue,
        accEmail: accEmail.inputValue,
        mobileNo: mobileNo.inputValue,
        emailId: emailId.inputValue,
        emailId2: emailId2.inputValue,
        emailIdOptional: emailIdOptional.inputValue,
        whatsappOptional: whatsappOptional.inputValue,
        billCountry: billCountry.inputValue,
        billAddress: billAddress.inputValue,
        billCity: billCity.inputValue,
        shipCountry: shipCountry.inputValue,
        shipCity: shipCity.inputValue,
        shipAddress: shipAddress.inputValue,
        active: false,
        approved: false,
        pass: await hash(pass.inputValue, 12),
        date: new Date().toISOString(),
        tag: configs?.label,
        website: configs.name === "Shanghai Gifting" ? "shanghai" : "default",
      };

      if (license) {
        doc.license = await uploadFileToFirebaseStorage(license);
      }

      if (vat) {
        doc.vat = await uploadFileToFirebaseStorage(vat);
      }

      if (eid) {
        doc.eid = await uploadFileToFirebaseStorage(eid);
      }

      if (eidBack) {
        doc.eidBack = await uploadFileToFirebaseStorage(eidBack);
      }

      const resp = await fetch(`${baseUrl}/reseller/create-reseller`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...doc,
        }),
      }).then((res) => res.json());

      if (!resp.success) {
        throw new Error(resp?.msg ?? "Something went wrong!");
      }

      setLoad(false);
      router.push("/resellers/success");
    } catch (err) {
      console.log(err);
      notifications.show({
        title: "Something went wrong!",
        autoClose: 1500,
        color: "red",
      });
      return setLoad(false);
    }
  };

  return (
    <>
      <Container mt={50} size={"xl"}>
        <Stack gap={5}>
          <Text ta={"center"} fw={700} style={{ fontSize: 24 }}>
            Reseller Registration Form
          </Text>
          <Text ta={"center"} fw={500} style={{ fontSize: 14 }} opacity={0.7}>
            Please fill up the field below.
          </Text>
        </Stack>
        <Card mt={30} shadow="xs" withBorder p={matches ? 20 : 40}>
          <Stack>
            <Grid gutter={20} w={"100%"}>
              <GridCol span={{ base: 12, md: 4 }}>
                <Select
                  size="md"
                  variant="filled"
                  styles={{
                    label: {
                      fontSize: 14,
                    },
                  }}
                  data={personList?.map((doc) => {
                    return { label: doc.name, value: doc._id };
                  })}
                  label={
                    <CustomRequiredLabel label="Select Sales Person name" />
                  }
                  placeholder="Select sales person"
                  value={mtc.inputValue}
                  onChange={mtc.setInput}
                  onBlur={mtc.blurHandler}
                  error={mtc.error ? "Please select a sales person." : ""}
                />
              </GridCol>
              <GridCol span={12}>
                <Text my={20} size="sm" fw={500}></Text>
              </GridCol>
              <GridCol span={{ base: 12, md: 6 }}>
                <TextInput
                  size="md"
                  variant="filled"
                  styles={{
                    label: {
                      fontSize: 14,
                    },
                  }}
                  label={<CustomRequiredLabel label="Company Name" />}
                  placeholder="Enter the name"
                  value={companyName.inputValue}
                  onChange={companyName.inputHandler}
                  onBlur={companyName.blurHandler}
                  error={
                    companyName.error ? "Please enter a Company Name." : ""
                  }
                />
              </GridCol>
              <GridCol span={6} visibleFrom="md" />
              <GridCol span={{ base: 12, md: 6 }}>
                <TextInput
                  size="md"
                  variant="filled"
                  styles={{
                    label: {
                      fontSize: 14,
                    },
                  }}
                  label={<CustomRequiredLabel label="Company Contact Number" />}
                  placeholder="ex. +971 OO 123 4567"
                  value={comContact.inputValue}
                  onChange={comContact.inputHandler}
                  onBlur={comContact.blurHandler}
                  error={
                    comContact.error
                      ? "A valid Company Contact Number is required!"
                      : ""
                  }
                />
              </GridCol>
              <GridCol span={{ base: 12, md: 6 }}>
                <TextInput
                  size="md"
                  variant="filled"
                  styles={{
                    label: {
                      fontSize: 14,
                    },
                  }}
                  label={
                    <CustomRequiredLabel label="Contact Mobile Number ( SMS Purpose )" />
                  }
                  placeholder="ex. +971 OO 123 4567"
                  value={mobileNo.inputValue}
                  onChange={mobileNo.inputHandler}
                  onBlur={mobileNo.blurHandler}
                  error={
                    mobileNo.error
                      ? "A valid Contact Mobile Number is required!"
                      : ""
                  }
                />
              </GridCol>
              <GridCol span={8}></GridCol>
              <GridCol span={{ base: 12, md: 6 }}>
                <TextInput
                  size="md"
                  variant="filled"
                  styles={{
                    label: {
                      fontSize: 14,
                    },
                  }}
                  label={<CustomRequiredLabel label="Email ID" />}
                  description="Primary email, will be used for login etc."
                  placeholder="ex. sample@email.com"
                  value={emailId.inputValue}
                  onChange={emailId.inputHandler}
                  onBlur={emailId.blurHandler}
                  error={emailId.error ? "A valid email id is required!" : ""}
                />
              </GridCol>
              <GridCol span={{ base: 12, md: 6 }}>
                <TextInput
                  size="md"
                  variant="filled"
                  styles={{
                    label: {
                      fontSize: 14,
                    },
                  }}
                  label={<CustomRequiredLabel label="Password" />}
                  description="For logging into your reseller account."
                  placeholder=""
                  value={pass.inputValue}
                  onChange={pass.inputHandler}
                  onBlur={pass.blurHandler}
                  error={pass.error ? "A valid email id is required!" : ""}
                />
              </GridCol>
              <GridCol span={6}>
                <TextInput
                  size="md"
                  variant="filled"
                  styles={{
                    label: {
                      fontSize: 14,
                    },
                  }}
                  label="Second Email ID"
                  placeholder="ex. sample@email.com"
                  value={emailId2.inputValue}
                  onChange={emailId2.inputHandler}
                  onBlur={emailId2.blurHandler}
                  error={emailId2.error ? "A valid email id is required!" : ""}
                />
              </GridCol>
              <GridCol span={12}>
                <Text mt={20} fw={700} size="lg">
                  Reseller Contact Person
                </Text>
                <Divider mt={20} />
              </GridCol>
              <GridCol span={{ base: 12, md: 4 }}>
                <TextInput
                  size="md"
                  variant="filled"
                  styles={{
                    label: {
                      fontSize: 14,
                    },
                  }}
                  label={<CustomRequiredLabel label="Purchaser's Name" />}
                  placeholder=""
                  value={purchaseNo.inputValue}
                  onChange={purchaseNo.inputHandler}
                  onBlur={purchaseNo.blurHandler}
                  error={
                    purchaseNo.error
                      ? "A valid Purchaser's Name is required!"
                      : ""
                  }
                />
              </GridCol>
              <GridCol span={{ base: 12, md: 4 }}>
                <TextInput
                  size="md"
                  variant="filled"
                  styles={{
                    label: {
                      fontSize: 14,
                    },
                  }}
                  label={
                    <CustomRequiredLabel label="Purchaser's Phone Number" />
                  }
                  placeholder="ex. +971 OO 123 4567"
                  value={purchaseMobileNo.inputValue}
                  onChange={purchaseMobileNo.inputHandler}
                  onBlur={purchaseMobileNo.blurHandler}
                  error={
                    purchaseMobileNo.error
                      ? "A valid Purchaser's Phone Number is required!"
                      : ""
                  }
                />
              </GridCol>
              <GridCol span={{ base: 12, md: 4 }}>
                <TextInput
                  size="md"
                  variant="filled"
                  styles={{
                    label: {
                      fontSize: 14,
                    },
                  }}
                  label={<CustomRequiredLabel label="Purchaser's Email" />}
                  placeholder="ex. sample@email.com"
                  value={purchaseEmail.inputValue}
                  onChange={purchaseEmail.inputHandler}
                  onBlur={purchaseEmail.blurHandler}
                  error={
                    purchaseEmail.error
                      ? "A valid Purchaser's Email is required!"
                      : ""
                  }
                />
              </GridCol>
              <GridCol span={{ base: 12, md: 4 }}>
                <TextInput
                  size="md"
                  variant="filled"
                  styles={{
                    label: {
                      fontSize: 14,
                    },
                  }}
                  label={<CustomRequiredLabel label="Accountant Name" />}
                  placeholder=""
                  value={accPerson.inputValue}
                  onChange={accPerson.inputHandler}
                  onBlur={accPerson.blurHandler}
                  error={
                    accPerson.error
                      ? "A valid Accountant Name is required!"
                      : ""
                  }
                />
              </GridCol>
              <GridCol span={{ base: 12, md: 4 }}>
                <TextInput
                  size="md"
                  variant="filled"
                  styles={{
                    label: {
                      fontSize: 14,
                    },
                  }}
                  label={<CustomRequiredLabel label="Accountant Number" />}
                  placeholder="ex. +971 OO 123 4567"
                  value={accMobileNo.inputValue}
                  onChange={accMobileNo.inputHandler}
                  onBlur={accMobileNo.blurHandler}
                  error={
                    accMobileNo.error
                      ? "A valid Accountant Number is required!"
                      : ""
                  }
                />
              </GridCol>
              <GridCol span={{ base: 12, md: 4 }}>
                <TextInput
                  size="md"
                  variant="filled"
                  styles={{
                    label: {
                      fontSize: 14,
                    },
                  }}
                  label={<CustomRequiredLabel label="Accountant Email" />}
                  placeholder="ex. sample@email.com"
                  value={accEmail.inputValue}
                  onChange={accEmail.inputHandler}
                  onBlur={accEmail.blurHandler}
                  error={
                    accEmail.error
                      ? "A valid Accountant Email is required!"
                      : ""
                  }
                />
              </GridCol>
              <GridCol span={12}>
                <Text mt={20} fw={700} size="lg">
                  Billing Address Details
                </Text>
                <Divider mt={20} />
              </GridCol>
              <GridCol span={{ base: 12, md: 6 }}>
                <Select
                  size="md"
                  variant="filled"
                  styles={{
                    label: {
                      fontSize: 14,
                    },
                  }}
                  data={countryList?.map((doc) => {
                    return doc.name;
                  })}
                  searchable
                  label={<CustomRequiredLabel label="Billing Country" />}
                  placeholder="Select the country"
                  value={billCountry.inputValue}
                  onChange={billCountry.setInput}
                  onBlur={billCountry.blurHandler}
                  error={
                    billCountry.error ? "A valid country is required!" : ""
                  }
                />
              </GridCol>
              <GridCol span={{ base: 12, md: 6 }}>
                <TextInput
                  size="md"
                  variant="filled"
                  styles={{
                    label: {
                      fontSize: 14,
                    },
                  }}
                  label={<CustomRequiredLabel label="Billing City" />}
                  placeholder="ex. Dubai"
                  value={billCity.inputValue}
                  onChange={billCity.inputHandler}
                  onBlur={billCity.blurHandler}
                  error={billCity.error ? "A valid city name is required!" : ""}
                />
              </GridCol>
              <GridCol span={12}>
                <Textarea
                  autosize
                  size="md"
                  variant="filled"
                  styles={{
                    label: {
                      fontSize: 14,
                    },
                  }}
                  label={
                    <CustomRequiredLabel label="Full Address / Complete Area Details" />
                  }
                  placeholder="Ex. Office 12345 - 2nd Floor"
                  value={billAddress.inputValue}
                  onChange={billAddress.inputHandler}
                  onBlur={billAddress.blurHandler}
                  error={
                    billAddress.error ? "A valid address is required!" : ""
                  }
                />
              </GridCol>
              <GridCol span={12}>
                <Text mt={20} fw={700} size="lg">
                  Shipping Address Details
                </Text>
                <Divider my={20} />
              </GridCol>
              <GridCol span={{ base: 12, md: 3 }}>
                <Switch
                  size="md"
                  styles={{
                    label: {
                      fontWeight: 700,
                      fontSize: 14,
                    },
                  }}
                  label="Same as billing address"
                  checked={shippingAsBilling}
                  onChange={(e) => setShippingIsBilling(true)}
                />
              </GridCol>
              <GridCol span={{ base: 12, md: 4 }}>
                <Switch
                  size="md"
                  styles={{
                    label: {
                      fontWeight: 700,
                      fontSize: 14,
                    },
                  }}
                  label="Add Shipping Details"
                  checked={!shippingAsBilling}
                  onChange={(e) => setShippingIsBilling(false)}
                />
              </GridCol>
              {!shippingAsBilling && (
                <>
                  <GridCol mt={20} span={{ base: 12, md: 6 }}>
                    <Select
                      size="md"
                      variant="filled"
                      styles={{
                        label: {
                          fontSize: 14,
                        },
                      }}
                      data={countryList?.map((doc) => {
                        return doc.name;
                      })}
                      searchable
                      label={<CustomRequiredLabel label="Shipping Country" />}
                      placeholder="Select the country"
                      value={shipCountry.inputValue}
                      onChange={shipCountry.setInput}
                      onBlur={shipCountry.blurHandler}
                      error={
                        shipCountry.error
                          ? "A valid shipping country is required!"
                          : ""
                      }
                    />
                  </GridCol>
                  <GridCol mt={20} span={{ base: 12, md: 6 }}>
                    <TextInput
                      size="md"
                      variant="filled"
                      styles={{
                        label: {
                          fontSize: 14,
                        },
                      }}
                      label={<CustomRequiredLabel label="Shipping City" />}
                      placeholder="ex. Dubai"
                      value={shipCity.inputValue}
                      onChange={shipCity.inputHandler}
                      onBlur={shipCity.blurHandler}
                      error={
                        shipCity.error ? "A valid last name is required!" : ""
                      }
                    />
                  </GridCol>
                  <GridCol span={12}>
                    <Textarea
                      autosize
                      size="md"
                      variant="filled"
                      styles={{
                        label: {
                          fontSize: 14,
                        },
                      }}
                      label={
                        <CustomRequiredLabel label="Full Address / Complete Area Details" />
                      }
                      placeholder="Ex. Office 12345 - 2nd Floor"
                      value={shipAddress.inputValue}
                      onChange={shipAddress.inputHandler}
                      onBlur={shipAddress.blurHandler}
                      error={
                        shipAddress.error
                          ? "A valid shipping address is required!"
                          : ""
                      }
                    />
                  </GridCol>
                </>
              )}
              <GridCol span={12}>
                <Text mt={20} fw={700} size="lg">
                  Uploads and Attachments
                </Text>
                <Divider mt={20} />
              </GridCol>
              <GridCol span={{ base: 12, md: 6 }}>
                <Stack>
                  <Stack gap={5}>
                    <CustomRequiredLabel label="Upload Trade License" />
                    <Text size="xs" fw={500} opacity={0.7}>
                      Accepted file types: pdf, jpg, png, doc, jpeg, docx, ppt,
                      pptx, Max. file size: 5 MB.
                    </Text>
                  </Stack>
                  <FileUpload
                    file={license}
                    setFile={setLicense}
                    fileTypes={
                      ".pdf, .jpg, .jpeg, .png, .doc, .docx, .ppt, .pptx"
                    }
                  />
                </Stack>
              </GridCol>
              <GridCol span={{ base: 12, md: 6 }}>
                <Stack>
                  <Stack gap={5}>
                    <CustomRequiredLabel label="Upload VAT Certificate" />
                    <Text size="xs" fw={500} opacity={0.7}>
                      Accepted file types: pdf, jpg, png, doc, jpeg, docx, ppt,
                      pptx, Max. file size: 5 MB.
                    </Text>
                  </Stack>
                  <FileUpload
                    file={vat}
                    setFile={setVat}
                    fileTypes={
                      ".pdf, .jpg, .jpeg, .png, .doc, .docx, .ppt, .pptx"
                    }
                  />
                </Stack>
              </GridCol>
              <GridCol span={{ base: 12, md: 6 }}>
                <Stack>
                  <Stack gap={5}>
                    <CustomRequiredLabel label="Upload EID / National ID ( Front )" />
                    <Text size="xs" fw={500} opacity={0.7}>
                      Accepted file types: pdf, jpg, png, doc, jpeg, docx, ppt,
                      pptx, Max. file size: 5 MB.
                    </Text>
                  </Stack>
                  <FileUpload
                    file={eid}
                    setFile={setEid}
                    fileTypes={
                      ".pdf, .jpg, .jpeg, .png, .doc, .docx, .ppt, .pptx"
                    }
                  />
                </Stack>
              </GridCol>
              <GridCol span={{ base: 12, md: 6 }}>
                <Stack>
                  <Stack gap={5}>
                    <CustomRequiredLabel label="Upload EID / National ID ( Back )" />
                    <Text size="xs" fw={500} opacity={0.7}>
                      Accepted file types: pdf, jpg, png, doc, jpeg, docx, ppt,
                      pptx, Max. file size: 5 MB.
                    </Text>
                  </Stack>
                  <FileUpload
                    file={eidBack}
                    setFile={setEidBack}
                    fileTypes={
                      ".pdf, .jpg, .jpeg, .png, .doc, .docx, .ppt, .pptx"
                    }
                  />
                </Stack>
              </GridCol>
              <GridCol span={12}>
                <Divider mt={20} />
              </GridCol>
              <GridCol span={6}>
                <TextInput
                  autosize
                  size="md"
                  variant="filled"
                  styles={{
                    label: {
                      fontSize: 14,
                    },
                  }}
                  label="Promotional Email"
                  description="for Promotions and Offers"
                  placeholder="ex. sample@email.com"
                  value={emailIdOptional.inputValue}
                  onChange={emailIdOptional.inputHandler}
                  onBlur={emailIdOptional.blurHandler}
                />
              </GridCol>
              <GridCol span={6}>
                <TextInput
                  autosize
                  size="md"
                  variant="filled"
                  styles={{
                    label: {
                      fontSize: 14,
                    },
                  }}
                  label={<CustomRequiredLabel label="Whatsapp Number" />}
                  description="For new products information & Offers"
                  placeholder="ex.+971 9997775643"
                  value={whatsappOptional.inputValue}
                  onChange={whatsappOptional.inputHandler}
                  onBlur={whatsappOptional.blurHandler}
                />
              </GridCol>
              <GridCol mt={20} span={12}>
                <Button
                  autoContrast
                  fullWidth
                  size="md"
                  onClick={submitHandler}
                  loading={load}
                  disabled={load}
                >
                  Submit Form
                </Button>
              </GridCol>
            </Grid>
          </Stack>
        </Card>
      </Container>
    </>
  );
};

export default ResellerWrapper;
