export const BLOG_URL = "www.52798.xyz/";
export const HASH_FILE = "./.build-hash.json";

// 计算年份范围
const startYear = 2025;
const currentYear = new Date().getFullYear();
const yearRange = `${startYear}-${currentYear}`;

export const BLOG_CONFIG = {
  title: "Holdon",
  author: "Holdon",
  description: "动起来就好，想做就去做吧。涵有闲博客，记录生活点滴，分享生活感悟。",
  language: "zh-CN",
  keywords: "blog, Holdon, Hu, 碎片生活, note, 个人博客, 生活记录",
  yearRange,
  analytics: `
    <!-- 百度统计 -->
    <script>
    var _hmt = _hmt || [];
    (function() {
      var hm = document.createElement("script");
      hm.src = "https://hm.baidu.com/hm.js?dd3de863d99a084d9ebd540d0bb7724b";
      hm.async = true;
      var s = document.getElementsByTagName("script")[0]; 
      s.parentNode.insertBefore(hm, s);
    })();
    </script>
  `
};
