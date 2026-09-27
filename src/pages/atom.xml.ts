import { buildAtomXml, getFeedPosts } from "@utils/feed";
import { getSiteWithBase } from "@utils/url-utils";
import type { APIContext } from "astro";
import { profileConfig, siteConfig } from "@/config";

export async function GET(context: APIContext): Promise<Response> {
	// 必须带 base：`context.site` 只有根域名，项目站点下会生成缺子路径的死链。
	const site = getSiteWithBase(context.site);
	const posts = await getFeedPosts(site);

	const xml = buildAtomXml({
		title: siteConfig.title,
		subtitle: siteConfig.subtitle || "No description",
		lang: siteConfig.lang,
		author: profileConfig.name,
		siteUrl: site.href,
		feedUrl: new URL("atom.xml", site).href,
		items: posts,
	});

	return new Response(xml, {
		headers: {
			"Content-Type": "application/atom+xml; charset=utf-8",
		},
	});
}
