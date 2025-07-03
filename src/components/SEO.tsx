import Head from 'next/head';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
}

export default function SEO({
  title = "Blog Sitesi - Yazılar ve Düşünceler",
  description = "Teknoloji, yazılım ve güncel konular hakkında kaliteli içerikler. Modern blog deneyimi için bizi takip edin.",
  keywords = "blog, teknoloji, yazılım, web development, next.js, javascript, typescript",
  image = "/blog-og-image.jpg",
  url = "https://yourblog.com",
  type = "website"
}: SEOProps) {
  return (
    <Head>

      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="Blog Sitesi" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="robots" content="index, follow" />
      

      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content="Blog Sitesi" />
      

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      

      <link rel="canonical" href={url} />
      <meta name="theme-color" content="#3B82F6" />
      

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "Blog Sitesi",
            "description": description,
            "url": url,
            "potentialAction": {
              "@type": "SearchAction",
              "target": {
                "@type": "EntryPoint",
                "urlTemplate": `${url}/search?q={search_term_string}`
              },
              "query-input": "required name=search_term_string"
            }
          })
        }}
      />
    </Head>
  );
}
