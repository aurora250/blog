import type { AlbumsConfig } from "../types/albumsConfig.ts";
import { withUserConfig } from "../utils/config-overlay.ts";

export const albumsConfig: AlbumsConfig = withUserConfig("albums", {
	// 相册需要自备图片素材（public/images/albums/<相册名>/ 下的 info.json 与图片）。
	// 示例相册已随示例内容一并删除，因此先关闭；备好素材后改为 true 即可恢复（导航入口同步出现）。
	enable: false,
	title: "$t:albums",
	description: "$t:albumsBanner",
});
