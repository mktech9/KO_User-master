import { Button, Grid, GridCol, Group, Space, Stack } from "@mantine/core";
import ShippingType from "./address/shipping-type";
import SelectAddress from "./address/select-address";
import LeftSectionTitle from "./wrappers/left-section-title";
import Summary from "./blocks/summary";
import DatePickerForCart from "./blocks/date-picker";
import { useMemo, useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import NewAddress from "./address/new-address";
import { PiArrowLeftDuotone } from "react-icons/pi";
import { useInput } from "@/hooks/use-input";
import UserDetails from "./address/user-details";
import usePlaceOrder from "@/libs/order/use-place-order";
import { notifications } from "@mantine/notifications";

const Step2Wrapper = ({
  items,
  summary,
  setStep,
  isAuth,
  reseller,
  payLater,
  tax,
  configs,
}) => {
  const { placeOrder, load } = usePlaceOrder(isAuth);
  const [opened, { open, close }] = useDisclosure(false);

  const [edit, setEdit] = useState(null);
  const [orderType, setOrderType] = useState("shipping");
  const [address, setAddress] = useState({
    id: null,
    data: null,
  });

  const { input: name } = useInput((v) => v !== "", "");
  const { input: email } = useInput((v) => v !== "", "");
  const { input: mobile } = useInput((v) => v !== "", "");
  const { input: mobileCode } = useInput((v) => v !== "", "");

  const payHandler = (paylater) => {
    if (
      !isAuth &&
      (!name.isValid ||
        !email.isValid ||
        !mobile.isValid ||
        !mobileCode.isValid)
    ) {
      name.blurHandler();
      email.blurHandler();
      mobile.blurHandler();
      mobileCode.blurHandler();
      return notifications.show({
        title: "Please provide all the required information!",
        autoClose: 1500,
        color: "red",
      });
    } else {
      let user = {
        number: mobile.inputValue,
        countryCode: mobileCode.inputValue,
        name: name.inputValue,
        email: email.inputValue,
      };
      placeOrder(
        items,
        summary,
        user,
        orderType,
        address.data,
        reseller,
        paylater,
        configs
      );
    }
  };

  return (
    <>
      <GridCol span={{ base: 12, md: 8 }}>
        <Stack gap={10}>
          <Button
            autoContrast
            leftSection={<PiArrowLeftDuotone />}
            w={"fit-content"}
            variant="transparent"
            size="compact-sm"
            p={0}
            td={"underline"}
            onClick={() => setStep(1)}
          >
            Shopping basket
          </Button>
          {!isAuth && (
            <>
              <Space h={15} />
              <UserDetails
                name={name}
                email={email}
                mobile={mobile}
                mobileCode={mobileCode}
              />
            </>
          )}
          <Space h={15} />
          <LeftSectionTitle step={"address"} />
          <Space h={15} />
          <ShippingType
            value={orderType}
            setValue={(v) => {
              setOrderType(v);
              setAddress({ id: null, data: null });
            }}
          />
          <Space h={15} />
          <SelectAddress
            open={open}
            type={orderType}
            edit={edit}
            setEdit={setEdit}
            setAddress={setAddress}
            address={address}
          />
        </Stack>
      </GridCol>
      <GridCol span={{ base: 12, md: 4 }}>
        <Stack gap={10}>
          <Grid>
            <GridCol span={12}>
              <Summary
                summary={summary?.amount}
                tax={tax}
                reseller={reseller}
                orderType={orderType}
              />
            </GridCol>
            <GridCol span={12}>
              <DatePickerForCart
                date={summary?.date}
                disableInput
                reseller={reseller}
              />
            </GridCol>
            <GridCol span={12}>
              <Group wrap="nowrap">
                {payLater && (
                  <Button
                    autoContrast
                    size="md"
                    fullWidth
                    disabled={
                      address.id === null || address.data === null || load
                    }
                    onClick={() => payHandler(true)}
                    loading={load}
                    color="dark"
                  >
                    Pay Later
                  </Button>
                )}
                <Button
                  autoContrast
                  size="md"
                  fullWidth
                  disabled={
                    address.id === null || address.data === null || load
                  }
                  onClick={() => payHandler(false)}
                  loading={load}
                >
                  Pay Now
                </Button>
              </Group>
            </GridCol>
          </Grid>
        </Stack>
      </GridCol>
      <NewAddress opened={opened} close={close} edit={edit} />
    </>
  );
};

export default Step2Wrapper;
