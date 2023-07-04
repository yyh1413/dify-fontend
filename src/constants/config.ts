import { L1, L2, L3, L4, L5 } from "@/constants/routerUrl";
import i1 from "@/assets/images/menu/i1.png";
import i2 from "@/assets/images/menu/i2.png";
import i3 from "@/assets/images/menu/i3.png";
import i4 from "@/assets/images/menu/i4.png";
import i5 from "@/assets/images/menu/i5.png";
import i6 from "@/assets/images/menu/i6.png";
import i7 from "@/assets/images/menu/i7.png";
import i8 from "@/assets/images/menu/i8.png";

export const main = {
  [L1]: [
    {
      icon: i1,
      title: "Listing 评分工具",
      content:
        "请输入一段产品的描述，同时加上核心关键字，AI会针对你的提交内容进行打分（本功能基于GPT3.5模型，产品属于内测阶段，不对结果做任何保证）",
      url: import.meta.env.VITE_APP_DOMAIN + "/completion/oSevtqfumSUOyHsP",
    },
    {
      icon: i7,
      title: "基于竞争对手文案进行优化的工具",
      content:
        "这个工具可以帮助你分析竞争对手的文案，并提供优化建议。通过比较你的文案和竞争对手的文案，你可以了解到差距所在，并获得改进自己文案的方法",
      url: import.meta.env.VITE_APP_DOMAIN + "/chat/lN0JRBcJvm8UWTtM",
    },
  ],
  [L2]: [
    {
      icon: i2,
      title: "Case处理",
      content:
        "此文档介绍一个邮件生成工具，可以帮助用户快速生成邮件。该工具可以用于Case处理和客服处理。",
      url: import.meta.env.VITE_APP_DOMAIN + "/completion/dBY33PaoraH62So8",
    },
  ],
  [L3]: [
    {
      icon: i3,
      title: "客服处理",
      content:
        "此文档介绍一个邮件生成工具，可以帮助用户快速生成邮件。该工具可以用于Case处理和客服处理。",
      url: import.meta.env.VITE_APP_DOMAIN + "/completion/dBY33PaoraH62So8",
    },
  ],
  [L4]: [
    {
      icon: i4,
      title: "亚马逊常见问题查询",
      content: "请提供要查询的亚马逊常见问题。",
      url: import.meta.env.VITE_APP_DOMAIN + "/chat/X4qt4n9bHfF5dlUE",
    },
  ],
  [L5]: [
    {
      icon: i5,
      title: "亚马逊面试官",
      content: "这里是亚马逊的面试官信息。",
      url: import.meta.env.VITE_APP_DOMAIN + "/chat/IdVCCkZdGLFL0MWS",
    },
  ],
};
