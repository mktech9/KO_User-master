import HtmlCode from "@/components/blogs/details/html_code";
import CustomWebpageJsonLd from "@/libs/json_ld_custom_page";
import {
  Container,
  Group,
  Stack,
  Text,
  Box,
  ActionIcon,
  Divider,
  Breadcrumbs,
  Space,
} from "@mantine/core";
import {
  TbBrandLinkedin,
  TbBrandFacebook,
  TbBrandX,
  TbChevronRight,
  TbHome,
} from "react-icons/tb";
import Link from "next/link";
import Faq from "@/components/blogs/details/faq";

// Replace force-dynamic with revalidate for ISR
export const revalidate = 60; // 24 hours

const getData = async (slug) => {
  const resp = await fetch(
    `https://www.kross-over.net/api/blog/get-page/${slug}`,
    {
      next: { revalidate: 60 },
    },
  ).then((res) => res.json());

  return resp;
};

// ... (generateMetadata function remains the same) ...
export async function generateMetadata({ params }) {
  const awaited_params = await params;
  const slug = awaited_params.slug;

  const page_data = await getData(slug);

  const meta_title = page_data?.seo?.metaTitle
      ? page_data?.seo?.metaTitle
      : "Krossover Gifting",
    meta_description = page_data?.seo?.metaDescription
      ? page_data?.seo?.metaDescription
      : "Krossover Gifting",
    keywords = page_data?.seo?.metaKeywords ?? [],
    canonical = `https://www.kross-over.net/pages/${slug}`,
    ogImage =
      page_data?.coverImage?.[0] ||
      `https://www.kross-over.net/quotation-logo.png`;

  return {
    title: meta_title,
    description: meta_description,
    keywords,
    alternates: {
      canonical,
    },
    viewport: {
      width: "device-width",
      initialScale: 1,
      maximumScale: 1,
    },
    icons: {
      icon: "https://www.kross-over.net/favicon.ico",
      apple: "https://www.kross-over.net/quotation-logo.png",
    },
    openGraph: {
      type: "website",
      locale: "en_US",
      url: canonical,
      siteName: "Krossover Gifting",
      title: meta_title,
      description: meta_description,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: meta_title || "Corporate Gifting Blog - Krossover Gifting",
        },
      ],
      article: {
        section: "Guide",
        publishedTime: page_data?.createdAt,
        modifiedTime: page_data?.updatedAt || page_data?.createdAt,
        authors: ["Krossover Gifting"],
        tags: keywords,
      },
    },
    twitter: {
      card: "summary_large_image",
      title: meta_title,
      description: meta_description,
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
    facebook: {
      admins: "krossovergifting",
    },
    metadataBase: new URL("https://www.kross-over.net"),
  };
}

// Reusable Share Icons Component to avoid code duplication
const ShareIcons = ({ centered = false, slug }) => {
  const url_to_share = `https://www.kross-over.net/pages/${slug}`;

  return (
    <Group justify={centered ? "center" : "flex-start"}>
      <ActionIcon
        variant="filled"
        color="blue"
        component={Link}
        href={`https://www.facebook.com/sharer/sharer.php?u=${url_to_share}`}
        radius="xl"
        size="lg"
      >
        <TbBrandFacebook size={22} />
      </ActionIcon>
      <ActionIcon
        variant="filled"
        color="blue"
        component={Link}
        href={`https://www.linkedin.com/shareArticle?mini=true&url=${url_to_share}`}
        radius="xl"
        size="lg"
      >
        <TbBrandLinkedin size={22} />
      </ActionIcon>
      <ActionIcon
        variant="filled"
        color="dark"
        component={Link}
        href={`https://twitter.com/intent/tweet?url=${url_to_share}`}
        radius="xl"
        size="lg"
      >
        <TbBrandX size={22} />
      </ActionIcon>
    </Group>
  );
};

const Page = async ({ params }) => {
  const awaited_params = await params;
  const slug = awaited_params.slug;
  const page_data = await getData(slug);

  // Use breadcrumbs from cate_tax if available, otherwise fallback to basic breadcrumbs
  const breadcrumbs = page_data?.cate_tax?.breadcrumbs?.length
    ? page_data.cate_tax.breadcrumbs.map((item) => ({
        label: item.name,
        href: item.url,
      }))
    : [
        { label: "Home", href: "/" },
        {
          label: page_data?.seo?.metaTitle || "Shanghai Gifts",
          href: `/pages/${slug}`,
        },
      ];

  return (
    <>
      <CustomWebpageJsonLd blog={page_data} />
      <Container mt={32} size="xl">
        <Breadcrumbs
          separator={
            <TbChevronRight size={14} color="var(--mantine-color-dimmed)" />
          }
          separatorMargin={8}
          styles={{
            root: { flexWrap: "wrap", rowGap: 4 },
          }}
        >
          {breadcrumbs.map((item, index) => {
            const isLast = index === breadcrumbs.length - 1;
            const isFirst = index === 0;

            return (
              <Link
                href={item.href}
                key={index}
                style={{
                  textDecoration: "none",
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                }}
              >
                <Text
                  size="sm"
                  fw={isLast ? 600 : 400}
                  c={isLast ? "dark" : "gray.7"}
                  truncate={isLast}
                  maw={{ base: 200, md: "auto" }}
                  style={{
                    transition: "color 0.2s ease",
                    whiteSpace: "nowrap",
                  }}
                  // className="breadcrumb-link"
                >
                  {item.label}
                </Text>
              </Link>
            );
          })}
        </Breadcrumbs>
        <style>{`
          .breadcrumb-link:hover {
            color: var(--mantine-color-blue-6) !important;
          }
        `}</style>
      </Container>
      <Box
        mt={32}
        style={{
          fontSize: "1.125rem",
          lineHeight: 1.8,
        }}
      >
        <Container size="xl" px={4} pb={24}>
          <HtmlCode data={page_data} />
        </Container>
      </Box>
      {page_data?.content_enhance?.faq?.length > 0 && (
        <>
          <Divider />
          <Container py={32} size="xl">
            <Faq data={page_data?.content_enhance?.faq} />
          </Container>
        </>
      )}
      <Divider />
      <Container py={32} size="xl">
        <Stack align="center">
          <Text size="lg" fw="bold">
            Share This Page
          </Text>
          <ShareIcons slug={slug} />
        </Stack>
      </Container>
    </>
  );
};

export default Page;
