import { Center, Pagination, SimpleGrid, Text } from "@mantine/core";
import BlogItem from ".";
import BlogPagination from "./pagination";

const ItemHolder = ({
  currentPage,
  totalPages,
  searchQuery,
  category,
  data,
}) => {
  return (
    <>
      {data?.length > 0 ? (
        <SimpleGrid cols={{ base: 1, md: 2 }} spacing="xl">
          {data?.map((doc, i) => {
            return <BlogItem doc={doc} key={i} />;
          })}
        </SimpleGrid>
      ) : (
        <Text fw={700} style={{ fontSize: 24 }}>No blog found...</Text>
      )}
      <Center mt={32}>
        <BlogPagination
          {...{ currentPage, totalPages, searchQuery, category }}
        />
      </Center>
    </>
  );
};

export default ItemHolder;
