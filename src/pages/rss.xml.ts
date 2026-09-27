import rss from "@astrojs/rss";
import { getFeedPosts } from "@utils/feed";
import { getSiteWithBase } from "@utils/url-utils";
import type { APIContext } from "astro";
import { siteConfig } from "@/config";

export async function GET(context: APIContext): Promise<Response> {
	// 必须带 base：`context.site` 只有根域名，项目站点下会生成缺子路径的死链。
	const site = getSiteWithBase(context.site);
	const posts = await getFeedPosts(site);

	return rss({
		title: siteConfig.title,
		description: siteConfig.subtitle || "No description",
		site: site.href,
		items: posts.map((post) => ({
			title: post.title,
			pubDate: post.pubDate,
			description: post.description,
			link: post.link,
			content: post.contentHtml,
		})),
		customData: `<language>${siteConfig.lang}</language>`,
	});
}
