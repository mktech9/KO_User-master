import { Breadcrumbs, Anchor } from "@mantine/core";
import { TbChevronRight } from "react-icons/tb";

let defaultCrumbs = [{ title: "Home", href: "#" }];

const Crumbs = ({ c, data }) => {
  const items = [...(data ?? defaultCrumbs)].map((item, index) => (
    <Anchor
      href={item.href}
      c={c ? c : "#161616"}
      size="sm"
      fw={500}
      key={index}
      underline={item?.current ? "always" : "hover"}
    >
      {item.title}
    </Anchor>
  ));

  return (
    <>
      <Breadcrumbs
        separator={<TbChevronRight color={c ? c : "#161616"} />}
        separatorMargin="xs"
      >
        {items}
      </Breadcrumbs>
    </>
  );
};

export default Crumbs;
