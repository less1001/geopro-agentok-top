export type SkillGroup = 'audit' | 'content' | 'monitor' | 'asset' | 'ops';
export type Skill = {
  id: string;
  title: string;
  subtitle: string;
  group: SkillGroup;
  price: string;
  entry: string;
  inputs: string[];
  outputs: string[];
};

export const skills: Skill[] = [
  { id: 'yao-geo-panorama-audit', title: 'GEO全景诊断', subtitle: '品牌在AI搜索里的可见性、引用和机会点总览。', group: 'audit', price: '3999元/品牌', entry: '获取总诊断', inputs: ['品牌名', '官网', '竞品'], outputs: ['诊断摘要', '竞品差距', '优先级清单'] },
  { id: 'yao-geo-page-audit', title: '页面体检', subtitle: '检查单页是否容易被AI抽取、引用和理解。', group: 'audit', price: '499元/页', entry: '检查页面', inputs: ['页面URL', '页面类型', '目标关键词'], outputs: ['结构评分', '缺口清单', '优化建议'] },
  { id: 'yao-geo-page-blueprint', title: '页面蓝图', subtitle: '把专题页直接拆成可执行的模块和字段。', group: 'asset', price: '3000元/页', entry: '生成蓝图', inputs: ['主题', '受众', '目标动作'], outputs: ['页面结构', '模块建议', 'Schema建议'] },
  { id: 'yao-geo-title-optimizer', title: '标题优化', subtitle: '批量给内容、专题和产品页出高命中标题。', group: 'content', price: '699元/批', entry: '优化标题', inputs: ['主题', '关键词', '标题数量'], outputs: ['标题候选', '风险标题', '推荐标题'] },
  { id: 'yao-geo-explainer-builder', title: '解释文生成', subtitle: '输出概念解释、FAQ和面向AI引用的正文。', group: 'content', price: '1200元/篇', entry: '生成解释文', inputs: ['概念', '受众', '语气'], outputs: ['正文', 'FAQ', '术语表'] },
  { id: 'yao-geo-comparison-builder', title: '对比页生成', subtitle: '把对比、选型和竞品页做成转化型内容。', group: 'content', price: '2500元/专题', entry: '生成对比页', inputs: ['品牌', '竞品', '对比维度'], outputs: ['对比结构', '对比表', 'FAQ'] },
  { id: 'yao-geo-ranking-article-builder', title: '榜单文章', subtitle: '生成TopN、评测和推荐类页面的内容框架。', group: 'content', price: '3000元/篇', entry: '生成榜单', inputs: ['榜单主题', '候选项', '筛选规则'], outputs: ['榜单框架', '评分方法', '发布建议'] },
  { id: 'yao-geo-content-refiner', title: '旧文升级', subtitle: '把已有文章改成更适合AI搜索的结构。', group: 'content', price: '800元/篇', entry: '改造旧文', inputs: ['原文标题', '改造目标', '关键词'], outputs: ['改写建议', '补强区块', 'FAQ'] },
  { id: 'yao-geo-article-friendly', title: '文章友好化', subtitle: '轻量把文章改得更容易被抽取和引用。', group: 'content', price: '399元/篇', entry: '快速优化', inputs: ['文章标题', '页面目标', '一句话摘要'], outputs: ['可引用性建议', '标题建议', '结构建议'] },
  { id: 'yao-geo-brand-graph', title: '品牌图谱', subtitle: '把品牌、产品、概念和竞品关系串起来。', group: 'asset', price: '6000元/品牌', entry: '搭建图谱', inputs: ['品牌名', '产品线', '竞品'], outputs: ['实体关系', '覆盖缺口', '证据链'] },
  { id: 'yao-geo-knowledge-base-builder', title: '知识库', subtitle: '把品牌知识沉淀成可复用的内容资产。', group: 'asset', price: '10000元起/项目', entry: '创建知识库', inputs: ['知识主题', '负责人', '来源'], outputs: ['知识结构', 'FAQ库', '来源台账'] },
  { id: 'yao-geo-intent-miner', title: '意图挖掘', subtitle: '把种子词扩展成问题集、意图簇和主题包。', group: 'content', price: '2000元/主题', entry: '挖掘意图', inputs: ['种子词', '行业', '竞品'], outputs: ['问题集', '意图簇', '监测词包'] },
  { id: 'yao-geo-tracking', title: '追踪体系', subtitle: '定义指标、采样和归因的追踪框架。', group: 'monitor', price: '8000元/项目', entry: '设计追踪', inputs: ['目标', '渠道', '指标'], outputs: ['指标体系', '数据口径', '埋点建议'] },
  { id: 'yao-geo-effect-monitor', title: '效果监测', subtitle: '订阅式查看提及、引用、排名和趋势。', group: 'monitor', price: '8000元/月起', entry: '开通监测', inputs: ['品牌', '关键词包', '平台'], outputs: ['月报', '趋势', '异常提醒'] },
  { id: 'yao-deepseek-crawler', title: 'DeepSeek采样', subtitle: '采集并汇总DeepSeek里的答案和引用。', group: 'monitor', price: '3000元/月/包', entry: '创建采样', inputs: ['品牌', '问题', '采样次数'], outputs: ['样本结果', '来源明细', '变化趋势'] },
  { id: 'yao-doubao-crawler', title: '豆包采样', subtitle: '采集豆包搜索里的结果、来源和波动。', group: 'monitor', price: '3000元/月/包', entry: '创建采样', inputs: ['品牌', '问题', '采样次数'], outputs: ['样本结果', '来源明细', '变化趋势'] },
  { id: 'yao-chatgpt-crawler', title: 'ChatGPT采样', subtitle: '抓取ChatGPT搜索答案并分析可见性。', group: 'monitor', price: '5000元/月/包', entry: '创建采样', inputs: ['品牌', '问题', '采样次数'], outputs: ['样本结果', '来源明细', '变化趋势'] },
  { id: 'yao-geoflow-template', title: 'GEOFlow模板', subtitle: '把站点结构映射成可落地的前台模板。', group: 'ops', price: '8000元/站', entry: '生成模板', inputs: ['站点', '结构', '页面数'], outputs: ['模板映射', '模块分配', '发布清单'] },
  { id: 'yao-geoflow-design', title: 'GEOFlow设计', subtitle: '给现有站点做主题和主页改版。', group: 'ops', price: '12000元/站起', entry: '改版设计', inputs: ['站点', '品牌', '目标风格'], outputs: ['设计方向', '页面结构', '组件建议'] },
  { id: 'yao-geoflow-cli', title: 'GEOFlow托管', subtitle: '把执行、上传、审核和发布接成服务。', group: 'ops', price: '15000元/月起', entry: '开始托管', inputs: ['账号', '流程', '发布节奏'], outputs: ['执行计划', '任务队列', '发布记录'] },
];
