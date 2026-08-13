import remarkDirective from "remark-directive";
import remarkFrontmatter from "remark-frontmatter";
import remarkGfm from "remark-gfm";
import remarkMdx from "remark-mdx";
import remarkPresetLintConsistent from "remark-preset-lint-consistent";
import remarkPresetLintRecommended from "remark-preset-lint-recommended";

const remarkConfig = {
  plugins: [
    remarkFrontmatter,
    remarkMdx,
    remarkGfm,
    remarkDirective,
    remarkPresetLintConsistent,
    remarkPresetLintRecommended,
  ],

  settings: {
    bullet: "-",
    emphasis: "_",
    strong: "*",
    fences: true,
    fence: "`",
    listItemIndent: "one",
  },
};

export default remarkConfig;
