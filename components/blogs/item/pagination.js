"use client";

import { Center, Pagination } from "@mantine/core";

const BlogPagination = ({ currentPage, totalPages, searchQuery, category }) => {
  return (
    <Center mt={32}>
      <Pagination
        total={totalPages}
        value={currentPage}
        onChange={(page) => {
          let url_string = "/blog";
          if (category) url_string += `/${category}`;

          if (page > 1) {
            url_string += `/page/${page}`;
          }

          const url = `${url_string}${
            searchQuery ? `?search=${searchQuery}` : ""
          }`;
          window.location.href = url; // SSR-friendly navigation
        }}
      />
    </Center>
  );
};

export default BlogPagination;
