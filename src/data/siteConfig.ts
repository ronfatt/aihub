export interface ScreenshotItem {
  url: string;
  alt: string;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  description: string;
  url: string;
  coverImage?: string;
  coverAlt?: string;
  accentColor?: string;
  coverPattern?: 'rings' | 'grid' | 'orbit' | 'zen' | 'compass' | 'cards' | 'hex' | 'wave';
  category: string;
  tags: string[];
  screenshots?: ScreenshotItem[];
  suitableFor?: string[];       // 适合哪些老师或服务场景（未确认时隐藏对应区域）
  customDirections?: string[];  // 可讨论的定制方向（明确与已有功能区分）
  featured: boolean;
  sortOrder: number;
  visible: boolean;
}

export interface SiteConfig {
  brandName: string;
  brandTagline: string;
  headline: string;
  subheadline: string;
  intro: string;
  whatsappNumber: string;
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
  // WhatsApp 联系号码（国际代码与纯数字，未配置时留空）
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
    slug: "soulflow",
    title: "SoulFlow",
    description: "打开演示页面，亲自探索与体验",
    url: "https://soulflow.vercel.app/",
    coverImage: "/covers/soulflow.png",
    coverAlt: "SoulFlow 身心灵健康与流动数字体验封面",
    category: "待分类",
    tags: [],
    screenshots: [
      {
        url: "/covers/soulflow.png",
        alt: "SoulFlow 首页真实界面截图",
      },
    ],
    // 适合场景与定制方向仅供定制交流讨论，若未核实则保持空数组以隐藏
    suitableFor: [],
    customDirections: [
      "可定制为流派专属冥想引导与身心能量打卡工具",
      "可接入自动化问卷与个性化解读报告生成流程",
    ],
    featured: false,
    sortOrder: 1,
    visible: true,
    accentColor: "#335C4E",
    coverPattern: "wave",
  },
  {
    id: "lucky7",
    slug: "lucky7",
    title: "Lucky7",
    description: "打开演示页面，亲自探索与体验",
    url: "https://lucky7-beryl.vercel.app/",
    coverImage: "/covers/lucky7.png",
    coverAlt: "Lucky7 幸运数字与命理能量分析演示封面",
    category: "待分类",
    tags: [],
    screenshots: [
      {
        url: "/covers/lucky7.png",
        alt: "Lucky7 首页真实界面截图",
      },
    ],
    suitableFor: [],
    customDirections: [
      "可拓展为手机号、身份证或门牌号的专属数字能量解析系统",
      "可融入咨询引流前置测算小工具",
    ],
    featured: false,
    sortOrder: 2,
    visible: true,
    accentColor: "#8C6A38",
    coverPattern: "orbit",
  },
  {
    id: "tianji52",
    slug: "tianji52",
    title: "天机52",
    description: "打开演示页面，亲自探索与体验",
    url: "https://www.tianji52.space/",
    coverImage: "/covers/tianji52.png",
    coverAlt: "天机52 现代命理空间演示封面",
    category: "待分类",
    tags: [],
    screenshots: [
      {
        url: "/covers/tianji52.png",
        alt: "天机52 现代命理空间真实界面截图",
      },
    ],
    suitableFor: [],
    customDirections: [
      "可定制为老师专属的易学/紫微/八字综合学术工作台",
      "可支持会员制内容专栏与案主终身档案归档系统",
    ],
    featured: false,
    sortOrder: 3,
    visible: true,
    accentColor: "#1B3B34",
    coverPattern: "compass",
  },
  {
    id: "8color",
    slug: "8color",
    title: "8Color",
    description: "打开演示页面，亲自探索与体验",
    url: "https://8color.vercel.app/",
    coverImage: "/covers/8color.png",
    coverAlt: "8Color 八镜个人状态罗盘演示封面",
    category: "待分类",
    tags: [],
    screenshots: [
      {
        url: "/covers/8color.png",
        alt: "8Color 八镜个人状态罗盘真实界面截图",
      },
    ],
    suitableFor: [],
    customDirections: [
      "可与五行色彩、能量水晶或奇门遁甲宫位系统深度结合",
      "可用于身心灵工作坊与线下疗愈课的前测评估工具",
    ],
    featured: false,
    sortOrder: 4,
    visible: true,
    accentColor: "#51685F",
    coverPattern: "rings",
  },
  {
    id: "aifengshuihub",
    slug: "aifengshuihub",
    title: "AI Feng Shui Hub",
    description: "打开演示页面，亲自探索与体验",
    url: "https://aifengshuihub.vercel.app/",
    coverImage: "/covers/aifengshuihub.png",
    coverAlt: "AI Feng Shui Hub 易恒星风水命理服务矩阵演示封面",
    category: "待分类",
    tags: [],
    screenshots: [
      {
        url: "/covers/aifengshuihub.png",
        alt: "AI Feng Shui Hub 真实界面截图",
      },
    ],
    suitableFor: [],
    customDirections: [
      "可整合老师名下多款测算工具为一体化品牌主站",
      "可配置专属客服预约挂号与不同老师档位选择",
    ],
    featured: false,
    sortOrder: 5,
    visible: true,
    accentColor: "#2C463F",
    coverPattern: "hex",
  },
  {
    id: "innerverse",
    slug: "innerverse",
    title: "Innerverse",
    description: "打开演示页面，亲自探索与体验",
    url: "https://innerverse-sandy.vercel.app/",
    coverImage: "/covers/innerverse.png",
    coverAlt: "Innerverse 心域 AI 元辰宫交互演示封面",
    category: "待分类",
    tags: [],
    screenshots: [
      {
        url: "/covers/innerverse.png",
        alt: "Innerverse 心域 AI 元辰宫真实界面截图",
      },
    ],
    suitableFor: [],
    customDirections: [
      "可定制为催眠导引、元辰宫探访与心灵剧场等沉浸式视觉交互",
      "可结合老师独家录音音轨与案主可视化心像生成",
    ],
    featured: false,
    sortOrder: 6,
    visible: true,
    accentColor: "#3C544C",
    coverPattern: "zen",
  },
  {
    id: "ainumber",
    slug: "ainumber",
    title: "AI Number",
    description: "打开演示页面，亲自探索与体验",
    url: "https://ainumber.vercel.app/",
    coverImage: "/covers/ainumber.png",
    coverAlt: "AI Number 数问 AI 数字能量解析演示封面",
    category: "待分类",
    tags: [],
    screenshots: [
      {
        url: "/covers/ainumber.png",
        alt: "AI Number 数问 AI 真实界面截图",
      },
    ],
    suitableFor: [],
    customDirections: [
      "可嵌入号码吉凶算法、八星磁场分析并自动生成微信长图报告",
      "可作为私域加微自动测算引流机器人配合使用",
    ],
    featured: false,
    sortOrder: 7,
    visible: true,
    accentColor: "#755F37",
    coverPattern: "grid",
  },
  {
    id: "ainame",
    slug: "ainame",
    title: "AI Name",
    description: "打开演示页面，亲自探索与体验",
    url: "https://ai-name-rust.vercel.app/",
    coverImage: "/covers/ainame.png",
    coverAlt: "AI Name 姓名学初步分析演示封面",
    category: "待分类",
    tags: [],
    screenshots: [
      {
        url: "/covers/ainame.png",
        alt: "AI Name 姓名学分析真实界面截图",
      },
    ],
    suitableFor: [],
    customDirections: [
      "可按老师独门三才五格、生肖喜忌、生辰喜用八字算法重构起名引擎",
      "可支持新生儿宝宝起名与公司字号品牌策划专业交付报告导出",
    ],
    featured: false,
    sortOrder: 8,
    visible: true,
    accentColor: "#22473D",
    coverPattern: "cards",
  },
  {
    id: "qimen",
    slug: "qimen",
    title: "观己",
    description: "以传统奇门遁甲为镜像工具，结合现代心理学与生活对话的高品质个人咨询体验",
    url: "https://qimen-pi.vercel.app/",
    coverImage: "/covers/qimen.png",
    coverAlt: "观己 奇门遁甲与个人咨询交互原型封面",
    category: "待分类",
    tags: ["奇门遁甲", "心理镜像", "命盘演算"],
    screenshots: [
      {
        url: "/covers/qimen.png",
        alt: "观己 奇门遁甲与个人咨询真实界面截图",
      },
    ],
    suitableFor: [
      "适合奇门遁甲研习导师与现代心理咨询师",
      "适合打造高品质深度认知报告与个人咨询预约流程",
    ],
    customDirections: [
      "可定制为独家飞盘/转盘排盘规则的自动化推演系统",
      "可接入自动化问卷与深度解读报告交付系统",
    ],
    featured: false,
    sortOrder: 9,
    visible: true,
    accentColor: "#1B2824",
    coverPattern: "compass",
  },
];
