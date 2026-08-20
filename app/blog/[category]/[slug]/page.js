import BlogDetails from "@/components/blogs/details";
import BlogSingleJsonLd from "@/libs/json_ld_blog";
import { sortItems } from "@/utils/blog_utils";

// Replace force-dynamic with revalidate for ISR
export const dynamic = "force-dynamic";

const getData = async (slug) => {
  const resp = await fetch(`https://www.kross-over.net/api/blog/${slug}`).then(
    (res) => res.json()
  );

  return resp;
};

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export async function generateMetadata({ params }) {
  const { category, slug } = await params;

  const blog = await getData(slug);

  // Fallbacks
  const baseUrl = "https://www.kross-over.net";
  const category_name = decodeURIComponent(category);
  const capital_category = capitalizeFirstLetter(category_name);
  const title =
    blog?.seo?.metaTitle ||
    `${blog?.title || capital_category} | Krossover Gifting Blog`;
  const description =
    blog?.seo?.metaDescription ||
    blog?.excerpt ||
    "Explore expert insights on corporate gifting, branding, and thoughtful gift ideas from Krossover Gifting.";
  const keywords = blog?.seo?.metaKeywords || [
    blog?.title,
    category_name,
    "corporate gifting blog",
    "business gift ideas",
    "custom gifts",
    "branded merchandise",
    "employee gifting tips",
    "premium corporate presents",
    "sustainable gifts",
    "office giveaways",
    "executive gifts",
    "personalized corporate gifts",
  ];
  const canonical = `${baseUrl}/blog/${category}/${slug}`;
  const ogImage = blog?.coverImage?.[0] || `${baseUrl}/quotation-logo.png`;

  // Optional AI/AEO signals
  const ai_summary = blog?.ai_seo?.semanticSummary;
  const focusKeyphrase =
    blog?.seo?.focusKeyphrase || blog?.ai_seo?.search_intent;

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical,
    },
    openGraph: {
      type: "article",
      locale: "en_US",
      url: canonical,
      siteName: "Krossover Gifting",
      title,
      description,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: blog?.title || "Corporate Gifting Blog - Krossover Gifting",
        },
      ],
      article: {
        section: capital_category,
        publishedTime: blog?.createdAt,
        modifiedTime: blog?.updatedAt || blog?.createdAt,
        authors: [blog?.author?.authorName || "Editorial Team"],
        tags: blog?.ai_seo?.ai_tags || [],
      },
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
      creator: "@krossovergifting",
    },
    robots: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
    category: capital_category,
    metadataBase: new URL(baseUrl),
  };
}

const getBlogsData = async () => {
  const resp = await fetch(`https://www.kross-over.net/api/blog/get-all`);
  return resp.json();
};

const Page = async ({ params }) => {
  const paramz = await params;
  const [data, metadata] = await Promise.all([
    getData(paramz.slug),
    getBlogsData(),
  ]);

  const { items, category } = metadata;
  const calculated_metadata = sortItems(items);

  const current_category = category.find((c) => c.slug === data.category);

  //randomize after filtering by category and keep only 2 items
  const related = items
    .filter((i) => i.category === data.category && i.slug !== data.slug)
    .sort(() => 0.5 - Math.random())
    .slice(0, 2);

  return (
    <>
      <BlogSingleJsonLd blog={data} current_category={current_category} />
      <BlogDetails
        data={data}
        category={category}
        metadata={calculated_metadata}
        related={related}
        current_category={current_category}
      />
    </>
  );
};

export default Page;
