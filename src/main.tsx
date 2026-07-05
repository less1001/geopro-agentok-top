import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Link,
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
  useNavigate,
  useParams,
} from "@tanstack/react-router";
import { skills } from "./skills-data";
import "./styles.css";

const queryClient = new QueryClient();

type SkillGroup = (typeof skills)[number]["group"];

const groupLabel: Record<SkillGroup, string> = {
  audit: "诊断",
  content: "内容",
  monitor: "监测",
  asset: "资产",
  ops: "运营",
};

const groupTone: Record<SkillGroup, string> = {
  audit: "tone-audit",
  content: "tone-content",
  monitor: "tone-monitor",
  asset: "tone-asset",
  ops: "tone-ops",
};

function AppShell() {
  return (
    <div className="app-shell">
      <Header />
      <main className="shell main-grid">
        <Outlet />
      </main>
      <footer className="site-footer shell">
        <span>GeoPro</span>
        <span>AI搜索增长平台</span>
      </footer>
    </div>
  );
}

function Header() {
  return (
    <header className="shell topbar">
      <Link to="/" className="brand-link" aria-label="GeoPro 首页">
        <div className="brand-icon" />
        <div>
          <div className="brand-name">GeoPro</div>
          <div className="brand-sub">AI搜索增长平台</div>
        </div>
      </Link>
      <nav className="nav-links">
        <Link to="/">首页</Link>
        <Link to="/pricing">定价</Link>
        <Link to="/console">控制台</Link>
      </nav>
    </header>
  );
}

function HomePage() {
  const featured = skills.filter((skill) => ["audit", "content", "monitor", "asset"].includes(skill.group));
  return (
    <div className="stack-xl">
      <section className="hero-grid">
        <div className="hero-panel hero-primary">
          <div className="eyebrow">AI搜索时代的增长入口</div>
          <h1>让品牌在AI搜索里被看见、被引用、被选择</h1>
          <p className="hero-copy">
            这是一个可直接使用的GEO产品站。每个skill都是独立页面、独立入口、独立成交单元，
            但又一起组成一个完整的专业增长系统。
          </p>
          <div className="hero-actions">
            <Link to="/console" className="primary-btn">开始订阅</Link>
            <Link to="/skill/yao-geo-panorama-audit" className="secondary-btn">查看全景诊断</Link>
          </div>
        </div>
        <div className="hero-panel hero-aside">
          <Stat label="产品形态" value="集合站 + 服务入口" />
          <Stat label="计费方式" value="订阅优先" />
          <Stat label="单次加购" value="按需" />
          <Stat label="上线方式" value="Cloudflare Pages" />
        </div>
      </section>

      <section className="section-block">
        <div className="section-heading">
          <h2>核心模块</h2>
          <p>从诊断、内容、监测到运营，每个模块都可以单买，也可以打包订阅。</p>
        </div>
        <div className="card-grid">
          {featured.map((skill) => (
            <Link key={skill.id} to="/skill/$skillId" params={{ skillId: skill.id }} className="feature-card">
              <div className={`badge ${groupTone[skill.group]}`}>{groupLabel[skill.group]}</div>
              <h3>{skill.title}</h3>
              <p>{skill.subtitle}</p>
              <div className="card-foot">
                <span>{skill.price}</span>
                <span>{skill.entry}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="section-block">
        <div className="section-heading">
          <h2>完整skill矩阵</h2>
          <p>21个skill全部有独立页面和独立入口，点进去就能直接使用对应工作流。</p>
        </div>
        <div className="skill-matrix">
          {skills.map((skill) => (
            <Link key={skill.id} to="/skill/$skillId" params={{ skillId: skill.id }} className="matrix-card">
              <div className={`badge ${groupTone[skill.group]}`}>{groupLabel[skill.group]}</div>
              <h3>{skill.title}</h3>
              <p>{skill.price}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="section-block">
        <div className="section-heading">
          <h2>推荐套餐</h2>
          <p>先卖最容易成交的入口，再把客户带入订阅和高客单服务。</p>
        </div>
        <div className="pricing-grid">
          <PlanCard title="入门诊断包" price="4999元" desc="全景诊断 + 页面体检 + 标题优化" />
          <PlanCard title="内容增长包" price="1.8万元起" desc="意图挖掘 + 解释文 + 对比页 + 榜单文" />
          <PlanCard title="监测订阅包" price="8000元/月起" desc="三平台采样 + 效果监测 + 月报" />
          <PlanCard title="GEOFlow托管包" price="2万元/月起" desc="模板 + 设计 + 托管执行" />
        </div>
      </section>
    </div>
  );
}

function PlanCard(props: { title: string; price: string; desc: string }) {
  return (
    <article className="soft-card plan-card">
      <div className="plan-top">
        <h3>{props.title}</h3>
        <strong>{props.price}</strong>
      </div>
      <p>{props.desc}</p>
    </article>
  );
}

function Stat(props: { label: string; value: string }) {
  return (
    <div className="stat-card">
      <div className="stat-value">{props.value}</div>
      <div className="stat-label">{props.label}</div>
    </div>
  );
}

function PricingPage() {
  return (
    <div className="stack-xl">
      <section className="section-block">
        <div className="section-heading">
          <h2>定价</h2>
          <p>所有skill都可以独立购买，也可以组合成订阅和托管服务。</p>
        </div>
        <div className="pricing-grid">
          <PlanCard title="页面诊断" price="499元/页" desc="单页体检，适合快速试单" />
          <PlanCard title="全景诊断" price="3999元/品牌" desc="品牌级入口，适合首单成交" />
          <PlanCard title="监测订阅" price="8000元/月起" desc="持续追踪、月报、提醒" />
          <PlanCard title="企业托管" price="按项目报价" desc="适合长期执行和复盘" />
        </div>
      </section>
    </div>
  );
}

function ConsolePage() {
  const [email, setEmail] = React.useState("");
  const [plan, setPlan] = React.useState("subscription-pro");
  const [status, setStatus] = React.useState("尚未开通");
  return (
    <div className="stack-xl">
      <section className="section-block console-grid">
        <div className="soft-card form-card">
          <div className="eyebrow dark">控制台</div>
          <h2>开通订阅</h2>
          <p>这里是真实入口，不是演示页。测试模式已经接好，后续可切正式支付。</p>
          <form className="control-form" onSubmit={async (e) => {
            e.preventDefault();
            setStatus("正在创建测试订单...");
            const res = await fetch("/api/create-checkout-session", {
              method: "POST",
              body: new FormData(e.currentTarget),
            });
              if (res.redirected) {
                window.location.href = res.url;
                return;
              }
              const data = await res.json().catch(() => null);
              setStatus(data?.message ?? `请求已提交：${res.status}`);
            }}>
            <label>
              邮箱
              <input value={email} onChange={(e) => setEmail(e.target.value)} name="email" placeholder="name@company.com" />
            </label>
            <label>
              方案
              <select value={plan} onChange={(e) => setPlan(e.target.value)} name="plan">
                <option value="subscription-pro">订阅专业版</option>
                <option value="one-time-audit">单次诊断</option>
              </select>
            </label>
            <button className="primary-btn" type="submit">去支付测试订单</button>
          </form>
          <div className="status-pill">{status}</div>
        </div>
        <div className="soft-card status-card">
          <div className="eyebrow dark">订阅状态</div>
          <h2>当前计划</h2>
          <p>支付成功后，这里会显示订阅状态、账单、最近报告和下一步建议。</p>
          <div className="status-list">
            <div><span>计划</span><strong>未开通</strong></div>
            <div><span>模式</span><strong>测试</strong></div>
            <div><span>入口</span><strong>Cloudflare Pages</strong></div>
          </div>
        </div>
      </section>
    </div>
  );
}

function SkillPage() {
  const params = useParams({ from: "/skill/$skillId" });
  const skill = skills.find((item) => item.id === params.skillId);
  const navigate = useNavigate();
  const [form, setForm] = React.useState<Record<string, string>>({});
  const [result, setResult] = React.useState<string[]>(skill ? skill.outputs : []);

  React.useEffect(() => {
    if (skill) {
      const next: Record<string, string> = {};
      skill.inputs.forEach((label) => {
        next[label] = "";
      });
      setForm(next);
      setResult(skill.outputs);
    }
  }, [skill?.id]);

  if (!skill) {
    return (
      <div className="soft-card page-card">
        <h2>找不到这个skill</h2>
        <button className="secondary-btn" onClick={() => navigate({ to: "/" })}>回首页</button>
      </div>
    );
  }

  return (
    <section className="skill-layout">
      <div className="soft-card page-card">
        <div className={`badge ${groupTone[skill.group]}`}>{groupLabel[skill.group]}</div>
        <h1>{skill.title}</h1>
        <p className="page-subtitle">{skill.subtitle}</p>
        <div className="price-line">
          <strong>{skill.price}</strong>
          <Link to="/console" className="primary-btn small">进入支付</Link>
        </div>
        <div className="field-grid">
          {skill.inputs.map((label) => (
            <label key={label} className="field-item">
              <span>{label}</span>
              <input value={form[label] ?? ""} onChange={(e) => setForm((prev) => ({ ...prev, [label]: e.target.value }))} placeholder={`输入${label}`} />
            </label>
          ))}
        </div>
        <div className="hero-actions">
          <button
            className="primary-btn"
            onClick={async () => {
              const res = await fetch("/api/skill-run", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ skillId: skill.id, inputs: form }),
              });
              const data = await res.json();
              setResult(data.outputs ?? skill.outputs);
            }}
          >
            {skill.entry}
          </button>
          <button className="secondary-btn" onClick={() => navigate({ to: "/" })}>回到总览</button>
        </div>
      </div>
      <div className="soft-card page-side">
        <h2>输出预览</h2>
        <ul className="result-list">
          {result.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <div className="mini-note">
          这是这个skill页的真实工作区：输入、生成、预览、下单入口都在一页里。
        </div>
      </div>
    </section>
  );
}

const rootRoute = createRootRoute({ component: AppShell });
const routeTree = rootRoute.addChildren([
  createRoute({ getParentRoute: () => rootRoute, path: "/", component: HomePage }),
  createRoute({ getParentRoute: () => rootRoute, path: "/pricing", component: PricingPage }),
  createRoute({ getParentRoute: () => rootRoute, path: "/console", component: ConsolePage }),
  createRoute({ getParentRoute: () => rootRoute, path: "/skill/$skillId", component: SkillPage }),
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);
