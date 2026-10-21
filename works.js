// ============================================================
// 作品配置 / WORK CONFIG
//
// 以后只改这个文件，不需要动 index.html。
//
// 1. 把 .glb 模型放到 assets/models/ 文件夹。
// 2. 在下面每一项的 model 里填写路径，例如：
//      { model: "assets/models/my-model.glb", accent: "#8c69c7" }
// 3. 想增加作品就复制一整行；想删除作品就删掉一整行。
// 4. accent 是背景强调色，可省略。
// 5. poster 是可选的加载海报/背景图，可省略。
//
// 不会填也没关系：model 留空时，页面会显示“添加你的模型”的占位。
// ============================================================

window.PORTFOLIO_WORKS = [
  // 作品 1
  { model: "assets/models/model.gltf", poster: "", accent: "#8c69c7" },

  // 作品 2
  { model: "", poster: "", accent: "#5d8e83" },

  // 作品 3
  { model: "", poster: "", accent: "#ba8a54" },

  // 作品 4
  { model: "", poster: "", accent: "#6582a7" }
];
