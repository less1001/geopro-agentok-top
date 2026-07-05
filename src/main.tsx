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
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { skills } from "./skills-data";
import "./styles.css";

gsap.registerPlugin(ScrollTrigger);

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

function useFadeInScope(ref: React.RefObject<HTMLDivElement | null>) {
  React.useLayoutEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray<HTMLElement>("[data-fade]");
      items.forEach((item) => {
        gsap.fromTo(
          item,
          { y: 26, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: "power2.out",
            scrollTrigger: {
              trigger: item,
              start: "top 82%",
            },
          },
        );
      });
    }, ref);
    return () => ctx.revert();
  }, [ref]);
}

function AppShell() {
  return (
    <div className="app-shell">
      <Header />
      <main className="shell main-grid overflow-x-hidden">
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
  const rootRef = React.useRef<HTMLDivElement | null>(null);
  useFadeInScope(rootRef);

  const featured = [
    skills.find((skill) => skill.id === "yao-geo-panorama-audit"),
    skills.find((skill) => skill.id === "yao-geo-title-optimizer"),
    skills.find((skill) => skill.id === "yao-geo-effect-monitor"),
    skills.find((skill) => skill.id === "yao-geoflow-template"),
  ].filter(Boolean) as typeof skills;

  const marquee = [...skills.slice(0, 7), ...skills.slice(7, 14), ...skills.slice(14)];

  return (
    <div ref={rootRef} className="page-stack">
      <section className="hero-shell" data-fade>
        <div className="hero-copy-shell">
          <div className="eyebrow">AI搜索时代的增长入口</div>
          <h1 className="hero-title">
            让品牌在AI搜索里
            <br />
            更容易被看见、引用、选择
          </h1>
          <p className="hero-copy">
            我们把GEO拆成了可直接成交的独立工具页。用户先看懂自己缺什么，再直接进入对应skill下单或执行，不需要先理解复杂概念。
          </p>
          <div className="hero-actions">
            <Link to="/console" className="primary-btn">开始订阅</Link>
            <Link to="/skill/yao-geo-panorama-audit" className="secondary-btn">看一个完整skill</Link>
          </div>
        </div>
        <aside className="hero-visual-shell">
          <div className="visual-card visual-hero">
            <div className="visual-kicker">集合站</div>
            <h2>一个入口，21个能力，按需成交</h2>
            <p>首页负责让人快速理解你卖什么，独立skill页负责把每一个能力做成可购买、可执行的工具。</p>
          </div>
          <div className="visual-row">
            <Stat label="计费" value="订阅优先" />
            <Stat label="补充" value="单次加购" />
          </div>
        </aside>
      </section>

      <section className="band" data-fade>
        <div className="band-track">
          {marquee.map((skill) => (
            <span key={skill.id}>{skill.title}</span>
          ))}
          {marquee.map((skill) => (
            <span key={`${skill.id}-dup`}>{skill.title}</span>
          ))}
        </div>
      </section>

      <section className="section-block section-split" data-fade>
        <div className="section-heading sticky-title">
          <h2>先卖最容易成交的能力</h2>
          <p>首页只保留最关键的入口，不把21个skill一次性压给用户。先让他看到结果，再进入更细的页面。</p>
        </div>
        <div className="feature-stack">
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

      <section className="section-block" data-fade>
        <div className="section-heading section-heading-tight">
          <h2>完整skill矩阵</h2>
          <p>这里是产品目录，不是陈列墙。每个卡片都能直接进自己的工作页。</p>
        </div>
        <div className="skill-matrix">
          {skills.map((skill, index) => (
            <Link
              key={skill.id}
              to="/skill/$skillId"
              params={{ skillId: skill.id }}
              className={`matrix-card ${index % 7 === 0 ? "matrix-card-wide" : ""} ${index % 11 === 0 ? "matrix-card-tall" : ""}`}
            >
              <div className={`badge ${groupTone[skill.group]}`}>{groupLabel[skill.group]}</div>
              <h3>{skill.title}</h3>
              <p>{skill.subtitle}</p>
              <span className="matrix-price">{skill.price}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="section-block cta-shell" data-fade>
        <div>
          <div className="eyebrow dark">Action</div>
          <h2>把试单、订阅和托管放在同一条成交路径里</h2>
          <p>先让用户从一个skill切进来，再把他带到更高客单的订阅和托管服务里。</p>
        </div>
        <Link to="/pricing" className="primary-btn cta-btn">查看定价</Link>
      </section>
    </div>
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
    <div className="page-stack">
      <section className="section-block" data-fade>
        <div className="section-heading">
          <h2>定价</h2>
          <p>先卖最容易成交的入口，再把客户带入订阅和高客单服务。</p>
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

function ConsolePage() {
  const [email, setEmail] = React.useState("");
  const [plan, setPlan] = React.useState("subscription-pro");
  const [status, setStatus] = React.useState("尚未开通");
  return (
    <div className="page-stack">
      <section className="section-block console-grid" data-fade>
        <div className="soft-card form-card">
          <div className="eyebrow dark">控制台</div>
          <h2>开通订阅</h2>
          <p>这里是真实入口，不是演示页。测试模式已经接好，后续可切正式支付。</p>
          <form
            className="control-form"
            onSubmit={async (e) => {
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
            }}
          >
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
        <div className="skill-hero">
          <div>
            <div className={`badge ${groupTone[skill.group]}`}>{groupLabel[skill.group]}</div>
            <h1>{skill.title}</h1>
            <p className="page-subtitle">{skill.subtitle}</p>
          </div>
          <div className="skill-price-card">
            <span>当前价格</span>
            <strong>{skill.price}</strong>
            <Link to="/console" className="secondary-btn small">进入支付</Link>
          </div>
        </div>
        <div className="field-grid">
          {skill.inputs.map((label) => (
            <label key={label} className="field-item">
              <span>{label}</span>
              <input
                value={form[label] ?? ""}
                onChange={(e) => setForm((prev) => ({ ...prev, [label]: e.target.value }))}
                placeholder={`输入${label}`}
              />
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
        <div className="eyebrow dark">输出预览</div>
        <h2>直接可交付的结果</h2>
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
  </React.StrictMode>,
);
