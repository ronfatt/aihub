export interface Project {
  id: string;
  title: string;
  description: string;
  url: string;
  coverImage?: string; // Optional path to custom screenshot or image
  accentColor?: string; // Aesthetic accent for placeholder cover
  coverPattern?: 'rings' | 'grid' | 'orbit' | 'zen' | 'compass' | 'cards' | 'hex' | 'wave';
  category: string; // e.g. "待分类" (will not be displayed to visitor if "待分类")
  tags: string[];
  featured: boolean; // default false
  sortOrder: number;
  visible: boolean;
}

export interface SiteConfig {
  brandName: string;
  brandTagline: string;
  headline: string;
  subheadline: string;
  intro: string;
  whatsappNumber: string; // Empty by default; configure when ready
  serviceDirections: {
    title: string;
    description: string;
  }[];
  workflowSteps: {
    step: string;
    title: string;
    desc: string;
  }[];
  disclaimer: string;
}

export const siteConfig: SiteConfig = {
  brandName: "RMS Digital Experiences",
  brandTagline: "命理与身心灵数字产品演示中心",
  headline: "让专业，被体验。",
  subheadline: "为命理、风水与身心灵老师打造专属数字应用。",
  intro: "浏览演示作品，亲自体验，探索你的品牌可以拥有怎样的系统。",
  // WhatsApp 联系号码（仅需国家代码与纯数字，例如 "8613800000000" 或 "85291234567"），未配置时留空
  whatsappNumber: "", 
  serviceDirections: [
    {
      title: "品牌官网与互动体验",
      description: "契合个人宗派风骨的视觉门户，提供沉浸式测算与互动测试入口。",
    },
    {
      title: "专业内容与分析流程",
      description: "将独家排盘逻辑、八字星盘规则、卦象推演算法转化为自动化数字流程。",
    },
    {
      title: "客户资料收集与报告交付",
      description: "规范化求测者生辰与问题录入，一键生成排版讲究、可长久留存的分析报告。",
    },
    {
      title: "咨询预约与服务流程",
      description: "清晰展示项目档位、日程时段选择、问诊须知与微信/日程同步提醒。",
    },
    {
      title: "课程、会员与内容平台",
      description: "弟子传承、会员专栏、音视频教学体系，搭建独立沉淀私域的知识系统。",
    },
    {
      title: "管理后台与运营数据",
      description: "案主档案数字化归档、客资状态跟踪与复购分析，告别零散微信备忘录。",
    },
  ],
  workflowSteps: [
    {
      step: "01",
      title: "需求沟通",
      desc: "深入了解您的学术流派、服务方式与核心客群，梳理数字化诉求。",
    },
    {
      step: "02",
      title: "确认范围",
      desc: "明确功能架构、页面层级、交互流程与工期规划，提供透明报价方案。",
    },
    {
      step: "03",
      title: "开发与测试",
      desc: "高品质视觉设计与前后端研发，配合严格的命理逻辑校验与移动端适配。",
    },
    {
      step: "04",
      title: "交付与维护",
      desc: "协助域名绑定、系统部署与使用指导，提供持续稳定的技术护航。",
    },
  ],
  disclaimer: "相关体验用于文化探索与自我反思，不保证预测结果。",
};

export const projectsData: Project[] = [
  {
    id: "soulflow",
    title: "SoulFlow",
    description: "打开演示页面，亲自探索与体验",
    url: "https://soulflow.vercel.app/",
    category: "待分类",
    tags: [],
    featured: false,
    sortOrder: 1,
    visible: true,
    accentColor: "#335C4E",
    coverPattern: "wave",
  },
  {
    id: "lucky7",
    title: "Lucky7",
    description: "打开演示页面，亲自探索与体验",
    url: "https://lucky7-beryl.vercel.app/",
    category: "待分类",
    tags: [],
    featured: false,
    sortOrder: 2,
    visible: true,
    accentColor: "#8C6A38",
    coverPattern: "orbit",
  },
  {
    id: "tianji52",
    title: "天机52",
    description: "打开演示页面，亲自探索与体验",
    url: "https://www.tianji52.space/",
    category: "待分类",
    tags: [],
    featured: false,
    sortOrder: 3,
    visible: true,
    accentColor: "#1B3B34",
    coverPattern: "compass",
  },
  {
    id: "8color",
    title: "8Color",
    description: "打开演示页面，亲自探索与体验",
    url: "https://8color.vercel.app/",
    category: "待分类",
    tags: [],
    featured: false,
    sortOrder: 4,
    visible: true,
    accentColor: "#51685F",
    coverPattern: "rings",
  },
  {
    id: "aifengshuihub",
    title: "AI Feng Shui Hub",
    description: "打开演示页面，亲自探索与体验",
    url: "https://aifengshuihub.vercel.app/",
    category: "待分类",
    tags: [],
    featured: false,
    sortOrder: 5,
    visible: true,
    accentColor: "#2C463F",
    coverPattern: "hex",
  },
  {
    id: "innerverse",
    title: "Innerverse",
    description: "打开演示页面，亲自探索与体验",
    url: "https://innerverse-sandy.vercel.app/",
    category: "待分类",
    tags: [],
    featured: false,
    sortOrder: 6,
    visible: true,
    accentColor: "#3C544C",
    coverPattern: "zen",
  },
  {
    id: "ainumber",
    title: "AI Number",
    description: "打开演示页面，亲自探索与体验",
    url: "https://ainumber.vercel.app/",
    category: "待分类",
    tags: [],
    featured: false,
    sortOrder: 7,
    visible: true,
    accentColor: "#755F37",
    coverPattern: "grid",
  },
  {
    id: "ainame",
    title: "AI Name",
    description: "打开演示页面，亲自探索与体验",
    url: "https://ai-name-rust.vercel.app/",
    category: "待分类",
    tags: [],
    featured: false,
    sortOrder: 8,
    visible: true,
    accentColor: "#22473D",
    coverPattern: "cards",
  },
];
