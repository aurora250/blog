import type { ProfileConfig } from "@/types/config";
import { withUserConfig } from "../utils/config-overlay.ts";

/**
 * 博主资料：头像 / 名称 / 简介 / 社交链接（侧栏 Profile 卡片、页脚、RSS 作者等消费）。
 * 类型见 src/types/config.ts。
 */
export const profileConfig: ProfileConfig = withUserConfig("profile", {
	// 头像：相对 src 目录的路径（走构建期图片优化），或以 "/" 开头的 public 路径。
	// 当前是从站点 logo 生成的占位图，请替换成你自己的头像：
	// 把图片放到 src/assets/images/avatar.webp 覆盖即可（尺寸建议 256x256 以上）。
	avatar: "assets/images/avatar.webp",
	name: "胡恩麒",
	bio: "C++ / Rust / Go · 维护 NexusForce", // 侧栏个人简介
	links: [
		{
			name: "GitHub",
			icon: "fa6-brands:github",
			url: "https://github.com/aurora250",
		},
	],
});
