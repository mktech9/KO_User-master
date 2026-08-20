"use client";

import React from "react";

const baseUrl = "https://www.kross-over.net",
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

/**
 * BlogSingleJsonLd
 * For individual blog pages (/blog/[category]/[slug])
 * Combines SEO, AI_SEO, and Content Enhance data into modular JSON-LD.
 */
const BlogSingleJsonLd = ({ blog, current_category }) => {
  if (!blog) return null;

  const {
    title,
    excerpt,
    slug,
    category,
    coverImage,
    createdAt,
    updatedAt,
    author,
    seo = {},
    ai_seo = {},
    content_enhance = {},
  } = blog;

  const cate_name = current_category ? current_category.name : category,
    cate_slug = current_category ? current_category.slug : category;

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
      { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: `${baseUrl}/blog`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: cate_name,
        item: `${baseUrl}/blog/${cate_slug}`,
      },
      {
        "@type": "ListItem",
        position: 4,
        name: title,
        item: `${baseUrl}/blog/${cate_slug}/${slug}`,
      },
    ],
  });

  // 📄 WebPage
  const WebPageJsonLd = () => ({
    "@type": "WebPage",
    "@id": `${baseUrl}/blog/${cate_slug}/${slug}`,
    name: seo?.metaTitle || title,
    url: `${baseUrl}/blog/${cate_slug}/${slug}`,
    description:
      seo?.metaDescription ||
      excerpt ||
      "Explore insightful corporate gifting trends, ideas, and guides from Krossover Gifting.",
    isPartOf: { "@type": "WebSite", url: baseUrl },
  });

  // 📝 BlogPosting
  const BlogPostingJsonLd = () => ({
    "@type": "BlogPosting",
    headline: seo?.metaTitle || title,
    description: seo?.metaDescription || excerpt,
    image: coverImage?.[0],
    keywords:
      seo?.metaKeywords ||
      ai_seo?.ai_tags?.join(", ") ||
      content_enhance?.keywords ||
      [],
    articleSection: cate_name,
    inLanguage: "en",
    author: {
      "@type": "Person",
      name: author?.authorName || "Editorial Team",
      url: author?.authorUrl || baseUrl,
      image: author?.authorAvatar,
      sameAs: author?.socialLinks || [],
    },
    publisher: {
      "@type": "Organization",
      name: organization.name,
      logo: {
        "@type": "ImageObject",
        url: organization.logo,
      },
    },
    datePublished: createdAt,
    dateModified: updatedAt || createdAt,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${baseUrl}/blog/${cate_slug}/${slug}`,
    },
    ...(content_enhance && {
      wordCount: content_enhance.wordCount,
      timeRequired: `${content_enhance.readingTime}M`,
      text: content_enhance.featuredQuote || "",
    }),
  });

  // ✍️ Author (if individual entity)
  const AuthorJsonLd = () => ({
    "@type": "Person",
    name: author?.authorName || "Editorial Team",
    image: author?.authorAvatar,
    url: author?.authorUrl || baseUrl,
    sameAs: author?.socialLinks || [],
    worksFor: {
      "@type": "Organization",
      name: organization.name,
    },
  });

  // 🧠 Semantic Enrichment / AI SEO
  const SemanticJsonLd = () => ({
    "@type": "CreativeWork",
    headline: ai_seo?.semanticSummary || seo?.metaTitle,
    text:
      content_enhance?.semanticSummary ||
      "This article explores key trends and strategies in corporate gifting.",
    about:
      ai_seo?.ai_topics?.map((t) => t.name) ||
      ai_seo?.ai_entities?.map((e) => e.name) ||
      [],
    genre: ai_seo?.search_intent || "Informational",
    keywords: seo?.metaKeywords || ai_seo?.ai_tags || [],
  });

  // Combine all schemas
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      OrganizationJsonLd(),
      WebsiteJsonLd(),
      BreadcrumbsJsonLd(),
      WebPageJsonLd(),
      BlogPostingJsonLd(),
      AuthorJsonLd(),
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

export default BlogSingleJsonLd;
