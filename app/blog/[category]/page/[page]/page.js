import BlogsWrapper from "@/components/blogs";
import BlogCollectionCategoryJsonLd from "@/libs/json_ld_category";
import { filterBlock, sortItems } from "@/utils/blog_utils";

// Replace force-dynamic with revalidate for ISR
// export const dynamic = "force-static";
export const dynamic = "force-dynamic";

const ITEMS_PER_PAGE = 10;

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export async function generateMetadata({ params }) {
  const paramz = await params;
  const raw_category = paramz.category;

  const category_name = decodeURIComponent(raw_category),
    capital_category = capitalizeFirstLetter(category_name?.replace(/-/g, " "));

  return {
    title: `${capital_category} | Krossover Gifting Blog`,
    description:
      "Explore Krossover Gifting’s latest blogs featuring corporate gifting trends, product ideas, branding tips, and thoughtful gifting guides to impress clients and employees alike.",
    keywords: [
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
    ],
    alternates: {
      canonical: `https://www.kross-over.net/blog/${raw_category}`,
    },
    openGraph: {
      type: "website",
      locale: "en_US",
      url: `https://www.kross-over.net/blog/${raw_category}`,
      siteName: "Krossover Gifting",
      title: `Krossover Gifting Blog - ${capital_category}`,
      description:
        "Stay ahead with Krossover Gifting. Read expert insights on corporate gifts, personalized products, brand engagement, and creative gifting strategies.",
      images: [
        {
          url: "https://www.kross-over.net/quotation-logo.png",
          width: 284,
          height: 232,
          alt: "Corporate Gifting Blog - Krossover Gifting",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `Krossover Gifting Blog - ${capital_category}`,
      description:
        "Discover curated gifting insights, product inspiration, and corporate branding tips from Krossover Gifting.",
      images: ["https://www.kross-over.net/quotation-logo.png"],
      creator: "@krossovergifting",
    },
    robots: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
    category: "Corporate Gifting Insights",
    metadataBase: new URL("https://www.kross-over.net"),
  };
}

const getBlogs = async () => {
  const resp = await fetch(`https://www.kross-over.net/api/blog/get-all`);
  return resp.json();
};

const Page = async ({ params, searchParams }) => {
  const paramz = await params;
  const raw_category = paramz.category;
  const category_name = decodeURIComponent(paramz.category);
  const capital_category = capitalizeFirstLetter(category_name);
  const page = parseInt(paramz.page || "1", 10);
  const searchQuery = searchParams.search?.toLowerCase() || "",
    date = searchParams.date?.toLowerCase() || "all",
    tags = searchParams.tags?.toLowerCase() || "";

  let tagsArray = [];
  if (typeof tags === "string") {
    const aiKeywords = tags
      .split(",")
      .map((t) => t.trim())
      .filter((t) => t);
    tagsArray.push(...aiKeywords);
  }

  const { items, category } = await getBlogs();

  const current_category = category.find((c) => c.slug === category_name);

  const categorized = [...items].filter((i) => i.category === category_name);
  const metadata = sortItems(categorized);

  //latest
  const latest = items[0];

  // Filter items by search query
  const filteredItems = filterBlock(
    items,
    category_name,
    searchQuery,
    date,
    tagsArray
  );

  // Pagination
  const totalPages = Math.ceil(filteredItems.length / ITEMS_PER_PAGE);
  const start = (page - 1) * ITEMS_PER_PAGE;
  const paginatedItems = filteredItems.slice(start, start + ITEMS_PER_PAGE);

  return (
    <>
      <BlogCollectionCategoryJsonLd
        raw_category={raw_category}
        category_name={
          current_category ? current_category.name : capital_category
        }
        items={categorized}
        current_category={current_category}
      />
      <BlogsWrapper
        data={paginatedItems}
        category={category}
        latest={latest}
        metadata={metadata}
        currentPage={page}
        totalPages={totalPages}
        searchQuery={searchQuery}
        category_name={category_name}
        current_category={current_category}
        tags={tagsArray}
      />
    </>
  );
};

export default Page;
