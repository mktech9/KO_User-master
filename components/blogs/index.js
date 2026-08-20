import { Container, Grid, GridCol } from "@mantine/core";
import HomeBreadcumb from "./header/breadcumb";
import LatestSection from "./header/latest";
import ItemHolder from "./item/holder";
import Archives from "./archives";
import CategorySection from "./header/category";
import Tags from "./header/tags";

const BlogsWrapper = ({
  data,
  category,
  latest,
  metadata,
  currentPage,
  totalPages,
  searchQuery,
  category_name,
  current_category,
  tags,
}) => {
  return (
    <>
      {category_name ? (
        <CategorySection
          data={current_category ? current_category.name : category_name}
          current_category={current_category}
        />
      ) : (
        <LatestSection data={latest} />
      )}
      <HomeBreadcumb
        categories={category}
        data={metadata}
        active={
          current_category ? current_category.slug : category_name || "all"
        }
        searchQuery={searchQuery}
      />
      <Container size="xl" py="xl">
        {tags?.length > 0 && (
          <>
            <Tags tags={tags} total={data} />
          </>
        )}
        <Grid>
          <GridCol span={{ base: 12, md: 8.5 }}>
            <ItemHolder
              searchQuery={searchQuery}
              category={category_name}
              currentPage={currentPage}
              totalPages={totalPages}
              data={data}
            />
          </GridCol>
          <GridCol span={{ base: 0, md: 0.5 }} />
          <GridCol span={{ base: 12, md: 3 }}>
            <Archives
              content_type={metadata?.add_tags ?? []}
              tags={metadata?.tags ?? []}
              date_archive={metadata?.date_archive ?? []}
              tag_array={tags}
            />
          </GridCol>
        </Grid>
      </Container>
    </>
  );
};

export default BlogsWrapper;
