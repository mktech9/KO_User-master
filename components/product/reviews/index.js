"use client";

import { Divider, GridCol, SimpleGrid, Space, Text } from "@mantine/core";
import ReviewsHeader from "./reviews-header";
import ReviewItem from "./review-item";
import { useState } from "react";

const ReviewsWrapper = ({ reviews, data }) => {
  const [viewAll, setViewAll] = useState(false);

  return (
    <>
      <GridCol span={12}>
        <Divider />
      </GridCol>
      <GridCol span={12}>
        <Text style={{ fontSize: 16 }} span fw={700} opacity={1}>
          Reviews:
        </Text>
        <Space h={10} />
        <ReviewsHeader reviews={reviews} data={data} />
        <Space h={30} />
        <Text style={{ fontSize: 16 }} span fw={700} opacity={1}>
          What Customers Said:
        </Text>
        <Space h={20} />
        <SimpleGrid cols={{ base: 1, md: 3 }}>
          {reviews?.items?.map((doc) => {
            return <ReviewItem doc={doc} key={doc._id} />;
          })}
        </SimpleGrid>
      </GridCol>
      {/* <ReviewModal /> */}
    </>
  );
};

export default ReviewsWrapper;
