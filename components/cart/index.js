"use client";

import { Container, Grid, GridCol } from "@mantine/core";
import Crumbs from "../common/breadcrumbs";
import { useState } from "react";
import Step1Wrapper from "./step1-wrapper";
import Step2Wrapper from "./step2-wrapper";

const CartWrapper = ({
  isAuth,
  reseller,
  tax,
  payLater,
  resellerData,
  shipping,
  configs,
}) => {
  //main cart settings
  const [step, setStep] = useState(1);
  const [items, setItems] = useState([]);
  const [summary, setSummary] = useState(null);

  return (
    <>
      <Container size={"xl"} my={30}>
        <Grid gutter={50}>
          <GridCol span={12}>
            <Crumbs
              data={[
                { title: "Home", href: "/" },
                {
                  title: "Basket",
                  href: "/basket",
                  current: true,
                },
              ]}
            />
          </GridCol>
          {step === 1 && (
            <Step1Wrapper
              proceed={(items, summary) => {
                setItems(items);
                setSummary(summary);
                setStep(2);
              }}
              summary={summary}
              reseller={reseller}
              tax={tax}
              isAuth={isAuth}
              resellerData={resellerData}
              shipping={shipping}
              configs={configs}
            />
          )}
          {step === 2 && (
            <Step2Wrapper
              setStep={setStep}
              items={items}
              summary={summary}
              isAuth={isAuth}
              reseller={reseller}
              payLater={payLater}
              tax={tax}
              configs={configs}
            />
          )}
        </Grid>
      </Container>
    </>
  );
};

export default CartWrapper;
