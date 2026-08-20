const baseUrl = "https://www.kross-over.net",
  seo = {},
  ai_seo = {},
  content_enhance = {},
  //   items = [],
  organization = {
    name: "Krossover Gifting",
    url: "https://www.kross-over.net",
    logo: "https://www.kross-over.net/quotation-logo.png",
    sameAs: [
      "https://www.facebook.com/krossovergifts",
      "https://www.instagram.com/krossovergifts/",
      "https://www.linkedin.com/company/krossovergifts/about/",
      "https://twitter.com/krossovergifts",
    ],
  },
  brand = {
    name: "Krossover Gifting",
    url: "https://www.kross-over.net",
  };

const BlogCollectionJsonLd = ({ items = [] }) => {
  // 🏢 Organization / Brand
  const OrganizationJsonLd = () => ({
    "@type": "Organization",
    name: organization.name,
    url: organization.url,
    logo: organization.logo,
    sameAs: organization.sameAs,
    brand: {
      "@type": "Brand",
      name: brand.name,
      url: brand.url,
    },
  });

  // 🌐 Website + SearchAction
  const WebsiteJsonLd = () => ({
    "@type": "WebSite",
    name: organization.name,
    url: baseUrl,
    potentialAction: {
      "@type": "SearchAction",
      target: `${baseUrl}/blog?search={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  });

  // 🧭 BreadcrumbList
  const BreadcrumbsJsonLd = () => ({
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: baseUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: `${baseUrl}/blog`,
      },
    ],
  });

  // 📰 CollectionPage + ItemList (All blogs)
  const CollectionPageJsonLd = () => ({
    "@type": "CollectionPage",
    "@id": `${baseUrl}/blog`,
    name: "Krossover Gifting Blog – Corporate Gifting Insights & Inspiration",
    url: `${baseUrl}/blog`,
    description:
      "Discover thoughtful corporate gifting insights, product trends, and expert branding ideas from Krossover Gifting.",
    isPartOf: { "@type": "WebSite", url: baseUrl },
    mainEntity: {
      "@type": "ItemList",
      itemListOrder: "Descending",
      itemListElement: items.map((post, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: `${baseUrl}/blog/${post.slug}`,
        name: post.title,
        image: post.coverImage?.[0],
        description: post.excerpt,
      })),
    },
  });

  // 🧾 BlogPosting (Top 5 featured articles)
  const BlogPostsJsonLd = () =>
    items.slice(0, 5).map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      description: post.excerpt,
      image: post.coverImage?.[0],
      keywords: post.seo?.metaKeywords,
      articleSection: post.category,
      inLanguage: "en",
      author: {
        "@type": "Person",
        name: post.author?.authorName || "Editorial Team",
        url: post.author?.authorUrl || baseUrl,
        image: post.author?.authorAvatar,
        sameAs: post.author?.socialLinks || [],
      },
      publisher: {
        "@type": "Organization",
        name: organization.name,
        logo: {
          "@type": "ImageObject",
          url: organization.logo,
        },
      },
      datePublished: post.createdAt,
      dateModified: post.updatedAt || post.createdAt,
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": `${baseUrl}/blog/${post.slug}`,
      },
      ...(post.content_enhance && {
        wordCount: post.content_enhance.wordCount,
        timeRequired: `${post.content_enhance.readingTime}M`,
        text: post.content_enhance.featuredQuote || "",
      }),
    }));

  // ✍️ Author Entities (unique authors)
  const AuthorJsonLd = () => {
    const authors = items
      .map((b) => b.author)
      .filter(Boolean)
      .reduce((acc, a) => {
        if (!acc.find((x) => x.authorName === a.authorName)) acc.push(a);
        return acc;
      }, []);

    return authors.map((a) => ({
      "@type": "Person",
      name: a.authorName,
      image: a.authorAvatar,
      url: a.authorUrl || baseUrl,
      sameAs: a.socialLinks || [],
      worksFor: {
        "@type": "Organization",
        name: organization.name,
      },
    }));
  };

  // 🧠 AI & Semantic Enrichment
  const SemanticJsonLd = () => ({
    "@type": "CreativeWork",
    headline:
      "Krossover Gifting Blog – Corporate Gifting Insights & Inspiration",
    text: "Discover thoughtful corporate gifting insights, product trends, and expert branding ideas from Krossover Gifting.",
    about: [
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
    genre: "Informational",
    keywords: [
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
  });

  // Combine all schemas
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      OrganizationJsonLd(),
      WebsiteJsonLd(),
      BreadcrumbsJsonLd(),
      CollectionPageJsonLd(),
      ...BlogPostsJsonLd(),
      ...AuthorJsonLd(),
      SemanticJsonLd(),
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(jsonLd, null, 2).replace(/</g, "\\u003c"),
      }}
    />
  );
};

export default BlogCollectionJsonLd;
