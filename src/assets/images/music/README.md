# 本地曲目封面

放在这里作为 `src/data/music.ts` 中 `cover` 字段的值，路径同样**相对 `src/`**：

```ts
{ id: "song-1", title: "曲名", artist: "艺术家",
  cover: "assets/images/music/song-1.webp",
  source: "/assets/music/url/song-1.mp3" },
```

音频文件请放到 `public/assets/music/url/`，`source` 用以 `/` 开头的 public 路径引用。
也可以直接用外链（`https://...`）作为 `cover` 与 `source`。
