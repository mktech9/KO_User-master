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
 * CustomWebpageJsonLd
 * For individual pages (/pages/[slug])
 * Combines SEO, AI_SEO, and Content Enhance data into modular JSON-LD.
 */

const CustomWebpageJsonLd = ({ blog }) => {
  if (!blog) return null;

  const { slug, seo = {} } = blog;

  const title = seo?.metaTitle ?? "Krossover Gifting";

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
      target: `${baseUrl}/pages/{search_term_string}`,
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
        name: title,
        item: `${baseUrl}/pages/${slug}`,
      },
    ],
  });

  // 📄 WebPage
  const WebPageJsonLd = () => ({
    "@type": "WebPage",
    "@id": `${baseUrl}/pages/${slug}`,
    name: seo?.metaTitle || title,
    url: `${baseUrl}/pages/${slug}`,
    description:
      seo?.metaDescription ||
      "Explore insightful corporate gifting trends, ideas, and guides from Krossover Gifting.",
    isPartOf: { "@type": "WebSite", url: baseUrl },
  });

  // 🧠 Semantic Enrichment / AI SEO
  const SemanticJsonLd = () => ({
    "@type": "CreativeWork",
    headline: seo?.metaTitle,
    text:
      seo?.metaDescription ||
      "This article explores key trends and strategies in corporate gifting.",
    about: seo?.metaKeywords,
    genre: "Informational",
    keywords: seo?.metaKeywords,
  });

  // Combine all schemas
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      OrganizationJsonLd(),
      WebsiteJsonLd(),
      BreadcrumbsJsonLd(),
      WebPageJsonLd(),
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

export default CustomWebpageJsonLd;
