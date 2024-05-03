const Sitemap = () => {};

export const getServerSideProps = async ({ res }) => {
  const response = await fetch('https://iba-students-url.vercel.app/api/users');
  const data = await response.json();

  res.setHeader('Content-Type', 'text/xml');
  res.write(createSitemap(data));
  res.end();

  return {
    props: {},
  };
};

const createSitemap = (data) => `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
<url>
      <loc>${`https://bba29.iba-ju.edu.bd`}</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
      <changefreq>monthly</changefreq>
      <priority>0.7</priority>
    </url>
  ${data
    .map(({ handle }) => `
    <url>
      <loc>${`https://bba29.iba-ju.edu.bd/${handle}`}</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
      <changefreq>monthly</changefreq>
      <priority>0.7</priority>
    </url>
  `)
    .join('')}
</urlset>
`;

export default Sitemap;