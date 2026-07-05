import { skills } from '../../src/skills-data';

type Body = { skillId?: string; inputs?: Record<string, string> };

function pickOutputs(skillId: string, inputs: Record<string, string>) {
  const skill = skills.find((item) => item.id === skillId);
  if (!skill) return ['找不到这个skill', '请回到首页重新选择'];

  const values = Object.values(inputs).filter(Boolean);
  const summary = values.length ? values.join(' · ') : skill.title;

  switch (skill.group) {
    case 'audit':
      return [
        `诊断对象：${summary}`,
        '先看可见性、结构和证据链，再看转化动作。',
        '优先修复：标题、H1、FAQ、Schema、内部链接。'
      ];
    case 'content':
      return [
        `内容主题：${summary}`,
        '生成一版可直接发布的正文框架，再补FAQ和引用位。',
        '建议同时准备一个短版摘要和一个转化CTA。'
      ];
    case 'monitor':
      return [
        `监测主题：${summary}`,
        '建立问题词包、平台采样和月报节奏。',
        '关注提及、引用、排名和异常波动。'
      ];
    case 'asset':
      return [
        `资产主题：${summary}`,
        '先补知识结构，再落页面模块和实体关系。',
        '把内容资产和产品页统一成一套术语。'
      ];
    case 'ops':
      return [
        `运营对象：${summary}`,
        '把页面、模板、发布和审核步骤拆成可执行队列。',
        '适合做交付、托管和复用。'
      ];
  }
}

export const onRequestPost = async ({ request }: { request: Request }) => {
  const body = (await request.json().catch(() => ({}))) as Body;
  const outputs = pickOutputs(body.skillId ?? '', body.inputs ?? {});
  return Response.json({ ok: true, outputs });
};
