/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || "https://weekly-app.net",
  generateRobotsTxt: true,
  generateIndexSitemap: true,
  changefreq: "weekly",
  priority: 0.7,
  sitemapSize: 5000,
  exclude: ["/404", "/500", "/_error", "/_app", "/_document", "/api/*"],
  robotsTxtOptions: {
    additionalSitemaps: [],
    policies: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api"],
      },
      {
        userAgent: "Yeti",
        allow: "/",
        disallow: ["/api"],
      },
      {
        userAgent: "NaverBot",
        allow: "/",
        disallow: ["/api"],
      },
    ],
  },
  transform: async (config, path) => {
    // 페이지별 우선순위 설정
    const priorityMap = {
      "/": 1.0,
      "/bmi": 0.9,
      "/weather": 0.9,
      "/quickwin": 0.8,
      "/ladder": 0.8,
      "/dday": 0.8,
      "/age": 0.8,
      "/character-counter": 0.8,
      "/case-converter": 0.8,
      "/percent": 0.8,
      "/interest-calculator": 0.8,
      "/compound-interest": 0.8,
      "/installment-calculator": 0.8,
      "/vat-calculator": 0.8,
      "/stock-average-calculator": 0.8,
      "/gpa": 0.8,
      "/fraction-calculator": 0.8,
      "/conversion": 0.8,
    };

    const priority = priorityMap[path] || 0.7;

    return {
      loc: path,
      changefreq: config.changefreq,
      priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
      alternateRefs: config.alternateRefs ?? [],
    };
  },
  additionalPaths: async (config) => {
    const result = [];
    // 동적 경로가 있다면 여기에 추가
    return result;
  },
};
