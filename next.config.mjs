/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "kross-over.net" }],
        destination: "https://www.kross-over.net/:path*",
        permanent: true,
      },
    ];
  },
  images: {
    domains: [
      "media2.giphy.com",
      "storage.googleapis.com",
      "shopboxfox.com",
      "source.unsplash.com",
      "images.unsplash.com",
      "img.freepik.com",
      "plus.unsplash.com",
      "freepngimg.com",
      "firebasestorage.googleapis.com",
      "cdn1.midocean.com",
    ],
  },
};

export default nextConfig;
