import type { ProfileConfig } from "@/types/config";
import { withUserConfig } from "../utils/config-overlay.ts";

/**
 * 博主资料：头像 / 名称 / 简介 / 社交链接（侧栏 Profile 卡片、页脚、RSS 作者等消费）。
 * 类型见 src/types/config.ts。
 */
export const profileConfig: ProfileConfig = withUserConfig("profile", {
	// 头像：相对 src 目录的路径（走构建期图片优化），或以 "/" 开头的 public 路径。
	// 请替换为自己的头像，例如把图片放到 src/assets/images/avatar.webp 后写 "assets/images/avatar.webp"。
	avatar: "assets/images/demo-avatar.webp",
	name: "Aurora",
	bio: "记录 · 思考 · 构建", // 侧栏个人简介，请替换为你自己的介绍
	links: [
		{
			name: "GitHub",
			icon: "fa6-brands:github",
			url: "https://github.com/aurora250",
		},
	],
});
