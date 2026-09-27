import type { APIRoute } from "astro";
import { url } from "@/utils/url-utils";

// `import.meta.env.SITE` 只含根域名，不含 `base`（GitHub Pages 项目站点会带 /<repo> 子路径），
// 因此必须用 `url()` 拼出带 base 的地址，否则 sitemap 地址会指向不存在的路径。
const robotsTxt = `
User-agent: *
Disallow: /_astro/

Sitemap: ${new URL(url("/sitemap-index.xml"), import.meta.env.SITE).href}
`.trim();

export const GET: APIRoute = () => {
	return new Response(robotsTxt, {
		headers: {
			"Content-Type": "text/plain; charset=utf-8",
		},
	});
};
