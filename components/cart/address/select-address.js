import {
  ActionIcon,
  Checkbox,
  Group,
  Paper,
  SimpleGrid,
  Space,
  Stack,
  Text,
  ThemeIcon,
} from "@mantine/core";
import {
  PiPencilDuotone,
  PiPencil,
  PiPlus,
  PiPlusDuotone,
  PiTrashDuotone,
  PiTrash,
} from "react-icons/pi";
import useAddress from "@/hooks/use-address";
import useCache from "@/store/useCache";
import { useEffect } from "react";
import { GetDelivery } from "@/libs/address-server-utils";

const SelectAddress = ({
  open,
  type,
  edit,
  setEdit,
  address,
  setAddress,
  disableSelection,
}) => {
  const { address: userAddress } = useAddress();
  const { delivery, setCache } = useCache();
  let items = type === "shipping" ? userAddress : delivery;

  useEffect(() => {
    GetDelivery().then((data) => setCache(data, "delivery"));
  }, []);

  return (
    <>
      <Stack>
        {!disableSelection && (
          <>
            <Stack gap={5}>
              <Text size="xl" style={{ fontSize: 27 }} fw={700}>
                Select an address
              </Text>
              <Text size="sm">
                {type === "shipping"
                  ? "Select an address from the list or add new address"
                  : "Select an address from the list"}
              </Text>
            </Stack>
            <Space h={15} />
          </>
        )}

        <SimpleGrid cols={{ base: 1, md: 3 }}>
          {items?.map((doc, i) => {
            return (
              <AddressItem
                disabled={disableSelection}
                doc={doc}
                type={type}
                key={i}
                edit={() => {
                  setEdit(doc);
                  open();
                }}
                active={
                  doc?.id ? address?.id === doc.id : doc?._id === address?.id
                }
                setActive={(doc) => {
                  setAddress({
                    id: doc?.id ? doc.id : doc?._id,
                    data: doc,
                  });
                }}
              />
            );
          })}
          {type === "shipping" && (
            <NewAddressButton
              open={() => {
                setEdit(false);
                open();
              }}
            />
          )}
        </SimpleGrid>
      </Stack>
      {/* <NewAddress /> */}
    </>
  );
};

const AddressItem = ({ doc, type, edit, active, setActive, disabled }) => {
  const { removeAddress, load } = useAddress();

  return (
    <>
      <Paper
        p={15}
        withBorder
        bg={"gray.0"}
        onClick={() =>
          !disabled
            ? setActive(doc)
            : console.log("Selection disabled for this page.")
        }
      >
        <Group justify="space-between" align="baseline">
          <Text size="sm" mt={10} style={{ whiteSpace: "pre-line" }}>
            {type === "shipping" ? (
              <>
                {`${doc?.fName} ${doc.lName}`} <br />
                {`${doc.address}`} <br />{" "}
                {doc.landmark ? (
                  <>
                    {`${doc.landmark},`}
                    <br />
                  </>
                ) : (
                  ""
                )}
                {`${doc?.area}, ${doc?.zip}`}
                <br />
                {`${doc?.state}, ${doc?.country}`}
                <br /> {`${doc.mobileCode ?? "+91"} ${doc.mobile}`}
              </>
            ) : (
              <>{doc?.name}</>
            )}
          </Text>
          {!disabled && <Checkbox checked={active} size="md" radius={"xl"} />}
        </Group>
        {type === "shipping" && (
          <Group justify="right">
            <ActionIcon
              autoContrast
              variant="transparent"
              disabled={load}
              onClick={() => {
                if (window.confirm("Are you sure?")) {
                  removeAddress(doc);
                }
              }}
              loading={load}
            >
              <PiTrash />
            </ActionIcon>
            <ActionIcon autoContrast variant="transparent" onClick={edit}>
              <PiPencil />
            </ActionIcon>
          </Group>
        )}
      </Paper>
    </>
  );
};

export const NewAddressButton = ({ open }) => {
  return (
    <Paper
      p={15}
      withBorder
      bg={"gray.0"}
      onClick={open}
      style={{ cursor: "pointer" }}
    >
      <Stack h={"100%"} justify="center" align="center">
        <ThemeIcon autoContrast radius={"xl"} size={"xl"} variant="gradient">
          <PiPlus size={"1.5rem"} />
        </ThemeIcon>
        <Text size="sm" fw={500}>
          New Address
        </Text>
      </Stack>
    </Paper>
  );
};

export default SelectAddress;
