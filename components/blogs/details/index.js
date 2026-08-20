import { Container, Grid, GridCol, Space } from "@mantine/core";
import BlogDetailsSection from "../header/blog_details";
import HtmlCode from "./html_code";
import Faq from "./faq";
import BrowseMore from "./browse_more";
import ArchivesAlt from "../archives/alt";
import BlogNavigation from "./navigate_blogs";

const BlogDetails = ({
  data,
  category,
  metadata,
  related,
  current_category,
}) => {
  return (
    <>
      <BlogDetailsSection data={data} current_category={current_category} />
      <Container size="xl" py="xl">
        <Grid>
          <GridCol span={{ base: 12, md: 8.5 }}>
            <HtmlCode data={data} />
            {data?.content_enhance?.faq?.length > 0 && (
              <>
                <Space h={24} />
                <Faq data={data?.content_enhance?.faq} />
              </>
            )}

            <BrowseMore
              data={data}
              related={related}
              current_category={current_category}
            />
            <Space h={24} />
            <BlogNavigation
              prevBlog={{
                category: data?.category,
                slug: data?.relation?.previousSlug,
              }}
              nextBlog={{
                category: data?.category,
                slug: data?.relation?.nextSlug,
              }}
            />
          </GridCol>
          <GridCol span={{ base: 0, md: 0.5 }} />
          <GridCol span={{ base: 12, md: 3 }}>
            <ArchivesAlt
              category={category}
              date_archive={metadata.date_archive}
              tags={data?.seo?.metaKeywords}
              category_name={data?.category}
              current_category={current_category}
            />
          </GridCol>
        </Grid>
      </Container>
    </>
  );
};

export default BlogDetails;
