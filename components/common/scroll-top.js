"use client";

import { ActionIcon, Affix, Transition } from "@mantine/core";
import { useWindowScroll } from "@mantine/hooks";
import { PiArrowUpBold } from "react-icons/pi";

const ScrollTop = () => {
  const [scroll, scrollTo] = useWindowScroll();

  return (
    <>
      <Affix position={{ bottom: 24, left: 20 }} visibleFrom="md">
        <Transition transition="slide-up" mounted={scroll.y > 0}>
          {(transitionStyles) => (
            <ActionIcon
              style={transitionStyles}
              size="xl"
              onClick={() => scrollTo({ y: 0 })}
              radius="xl"
            >
              <PiArrowUpBold size={24} />
            </ActionIcon>
          )}
        </Transition>
      </Affix>
    </>
  );
};

export default ScrollTop;
