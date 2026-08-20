import useCart from "@/hooks/use-cart";
import { ActionIcon, NumberInput } from "@mantine/core";
import { PiMinus, PiPlus } from "react-icons/pi";

const CartQuantityInput = ({ qty, max, id, itemId, width }) => {
  const { dialQuantity, removeFromCart, load } = useCart();

  return (
    <>
      <NumberInput
        w={width ?? "100%"}
        maw={200}
        max={max}
        onBlur={(e) => {
          let v = e.target.value;
          if (v <= 1) {
            dialQuantity(itemId, id, false, 1);
          } else {
            dialQuantity(itemId, id, false, v > max ? max : v);
          }
        }}
        styles={{
          input: {
            textAlign: "center",
            background: "#f8f8f8",
          },
        }}
        leftSection={
          <ActionIcon
            autoContrast
            variant="transparent"
            onClick={() => {
              if (qty <= 1) {
                removeFromCart(id, itemId);
              } else {
                dialQuantity(itemId, id, false);
              }
            }}
            disabled={load}
            loading={load}
          >
            <PiMinus />
          </ActionIcon>
        }
        rightSectionWidth={35}
        rightSection={
          <ActionIcon
            autoContrast
            variant="transparent"
            onClick={() => dialQuantity(itemId, id, true)}
            disabled={load || qty >= max}
            loading={load}
          >
            <PiPlus />
          </ActionIcon>
        }
        value={qty}
      />
    </>
  );
};

export default CartQuantityInput;
