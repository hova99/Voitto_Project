const { SitemapStream, streamToPromise } = require('sitemap');
const { createWriteStream } = require('fs');
const path = require('path');

const sitemap = new SitemapStream({ hostname: 'https://voittoconcrete.com' });
const writeStream = createWriteStream(path.resolve(__dirname, 'public', 'sitemap.xml'));

sitemap.pipe(writeStream);

sitemap.write({ url: '/', changefreq: 'monthly', priority: 1.0 });
sitemap.write({ url: '/about', changefreq: 'monthly', priority: 0.8 });
sitemap.write({ url: '/products', changefreq: 'weekly', priority: 0.9 });
sitemap.write({ url: '/contact', changefreq: 'yearly', priority: 0.5 });

sitemap.end();

streamToPromise(sitemap).then(() => console.log('✅ Sitemap generated in public/'));
