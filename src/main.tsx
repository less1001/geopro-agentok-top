import React, { useState } from "react";
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
  useLocation,
} from "@tanstack/react-router";
import { skills } from "./skills-data";
import "./styles.css";

const queryClient = new QueryClient();

// Removed GSAP dependency to make it snappier, cleaner, and less "demo" feeling.

type SkillGroup = (typeof skills)[number]["group"];

const groupLabel: Record<SkillGroup, string> = {
  audit: "诊断",
  content: "内容",
  monitor: "监测",
  asset: "资产",
  ops: "运营",
};

// Application Shell
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
  const location = useLocation();
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
        <Link to="/" className={location.pathname === "/" ? "active" : ""}>首页</Link>
        <Link to="/pricing" className={location.pathname === "/pricing" ? "active" : ""}>定价</Link>
        <Link to="/console" className={location.pathname === "/console" ? "active" : ""}>控制台</Link>
      </nav>
    </header>
  );
}

function HomePage() {
  const auditSkills = skills.filter(s => s.group === 'audit');
  const contentSkills = skills.filter(s => s.group === 'content');
  const otherSkills = skills.filter(s => s.group !== 'audit' && s.group !== 'content');

  return (
    <div className="page-stack">
      <section className="hero-centered">
        <h1 className="hero-title">
          让品牌在AI搜索里<br />更容易被看见
        </h1>
        <p className="hero-copy">
          GeoPro 将复杂的 Generative Engine Optimization 拆解为可直接执行的工具套件。
          <br />无需理解复杂概念，即刻开始优化您的品牌可见度。
        </p>
        <div className="hero-actions">
          <Link to="/console" className="primary-btn">开始订阅</Link>
          <Link to="/skill/yao-geo-panorama-audit" className="secondary-btn">体验全景诊断</Link>
        </div>
      </section>

      <section className="section-block">
        <div className="section-heading left">
          <div className="eyebrow">第一步：了解现状</div>
          <h2>诊断与洞察</h2>
          <p>在行动之前，精准评估品牌在主流 AI 搜索引擎中的表现和缺口。</p>
        </div>
        <div className="skill-grid">
          {auditSkills.map((skill) => (
            <Link key={skill.id} to="/skill/$skillId" params={{ skillId: skill.id }} className="skill-card">
              <div className="badge">{groupLabel[skill.group]}</div>
              <h3>{skill.title}</h3>
              <p>{skill.subtitle}</p>
              <div className="skill-price">{skill.price}</div>
            </Link>
          ))}
        </div>
      </section>

      <section className="section-block">
        <div className="section-heading left">
          <div className="eyebrow">第二步：优化资产</div>
          <h2>内容与生成</h2>
          <p>生成符合 AI 阅读习惯的高密度内容，提升被引用和推荐的概率。</p>
        </div>
        <div className="skill-grid">
          {contentSkills.map((skill) => (
            <Link key={skill.id} to="/skill/$skillId" params={{ skillId: skill.id }} className="skill-card">
              <div className="badge">{groupLabel[skill.group]}</div>
              <h3>{skill.title}</h3>
              <p>{skill.subtitle}</p>
              <div className="skill-price">{skill.price}</div>
            </Link>
          ))}
        </div>
      </section>

      <section className="section-block">
        <div className="section-heading left">
          <div className="eyebrow">第三步：长期运营</div>
          <h2>资产、监测与托管</h2>
          <p>建立长期的追踪体系与品牌知识库，确保持续的搜索增长。</p>
        </div>
        <div className="skill-grid">
          {otherSkills.map((skill) => (
            <Link key={skill.id} to="/skill/$skillId" params={{ skillId: skill.id }} className="skill-card">
              <div className="badge">{groupLabel[skill.group]}</div>
              <h3>{skill.title}</h3>
              <p>{skill.subtitle}</p>
              <div className="skill-price">{skill.price}</div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

function PricingPage() {
  return (
    <div className="page-stack">
      <section className="section-block">
        <div className="section-heading">
          <h2>订阅方案</h2>
          <p>选择适合您团队规模的服务计划，随时可以升级或取消。</p>
        </div>
        <div className="pricing-grid">
          <article className="soft-card plan-card">
            <div className="plan-top">
              <h3>单次诊断</h3>
              <strong>499元 / 页</strong>
            </div>
            <p>适合快速验证，单页全方位体检，生成结构评分与缺口清单。</p>
          </article>
          <article className="soft-card plan-card">
            <div className="plan-top">
              <h3>全景入口</h3>
              <strong>3999元 / 品牌</strong>
            </div>
            <p>包含品牌在 AI 搜索里的可见性、引用评估和机会点总览。</p>
          </article>
          <article className="soft-card plan-card">
            <div className="plan-top">
              <h3>持续监测</h3>
              <strong>8000元 / 月起</strong>
            </div>
            <p>订阅式的效果监测，提供月度报告、排名趋势追踪和异常波动提醒。</p>
          </article>
          <article className="soft-card plan-card">
            <div className="plan-top">
              <h3>企业托管</h3>
              <strong>按项目报价</strong>
            </div>
            <p>针对大型站点的全面托管，包括结构改造、内容执行、发布及后期复盘。</p>
          </article>
        </div>
      </section>
    </div>
  );
}

function ConsolePage() {
  const [email, setEmail] = useState("");
  const [plan, setPlan] = useState("subscription-pro");
  const [status, setStatus] = useState("账户尚未订阅计划");

  return (
    <div className="page-stack">
      <div className="console-grid">
        <div className="console-card">
          <div className="eyebrow">管理订阅</div>
          <h2>开通服务</h2>
          <p>输入企业邮箱以启动您的服务订阅流程。支付系统处于安全模式。</p>
          <form
            className="control-form"
            onSubmit={async (e) => {
              e.preventDefault();
              setStatus("正在处理请求...");
              try {
                const res = await fetch("/api/create-checkout-session", {
                  method: "POST",
                  body: new FormData(e.currentTarget),
                });
                if (res.redirected) {
                  window.location.href = res.url;
                  return;
                }
                const data = await res.json().catch(() => null);
                setStatus(data?.message ?? `处理完毕：状态 ${res.status}`);
              } catch (error) {
                setStatus("服务暂时无法连接，请稍后再试。");
              }
            }}
          >
            <div className="form-field">
              <label>企业邮箱</label>
              <input value={email} onChange={(e) => setEmail(e.target.value)} name="email" placeholder="name@company.com" required />
            </div>
            <div className="form-field">
              <label>选择方案</label>
              <select value={plan} onChange={(e) => setPlan(e.target.value)} name="plan">
                <option value="subscription-pro">持续监测 (8000元/月)</option>
                <option value="one-time-audit">全景入口 (3999元/次)</option>
              </select>
            </div>
            <button className="primary-btn" type="submit">前往安全支付</button>
          </form>
          <div className="status-pill">{status}</div>
        </div>
        
        <div className="console-card">
          <div className="eyebrow">当前状态</div>
          <h2>账户概览</h2>
          <div className="status-list">
            <div className="status-item"><span>当前计划</span><strong>基础未开通</strong></div>
            <div className="status-item"><span>计费周期</span><strong>--</strong></div>
            <div className="status-item"><span>运行环境</span><strong>生产环境</strong></div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SkillPage() {
  const params = useParams({ from: "/skill/$skillId" });
  const skill = skills.find((item) => item.id === params.skillId);
  const navigate = useNavigate();
  const [form, setForm] = useState<Record<string, string>>({});
  const [result, setResult] = useState<string[] | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  React.useEffect(() => {
    if (skill) {
      const next: Record<string, string> = {};
      skill.inputs.forEach((label) => {
        next[label] = "";
      });
      setForm(next);
      setResult(null); // Reset result when switching skills
    }
  }, [skill?.id]);

  if (!skill) {
    return (
      <div className="hero-centered">
        <h2>找不到此工具模块</h2>
        <button className="secondary-btn" onClick={() => navigate({ to: "/" })}>返回主页</button>
      </div>
    );
  }

  const handleRun = async () => {
    setIsProcessing(true);
    setResult(null);
    try {
      const res = await fetch("/api/skill-run", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ skillId: skill.id, inputs: form }),
      });
      const data = await res.json().catch(() => null);
      // Simulate slight delay for realistic processing feel if mock
      setTimeout(() => {
        setResult(data?.outputs ?? skill.outputs);
        setIsProcessing(false);
      }, 800);
    } catch (err) {
      setTimeout(() => {
        setResult(skill.outputs); // fallback to mock for UI dev
        setIsProcessing(false);
      }, 800);
    }
  };

  return (
    <div className="workspace-layout">
      {/* Sidebar: Configuration */}
      <aside className="workspace-sidebar">
        <div className="workspace-hero">
          <div className="badge">{groupLabel[skill.group]}</div>
          <h1>{skill.title}</h1>
          <p>{skill.subtitle}</p>
        </div>
        
        <div className="workspace-form">
          {skill.inputs.map((label) => (
            <div key={label} className="form-field">
              <label>{label}</label>
              <input
                value={form[label] ?? ""}
                onChange={(e) => setForm((prev) => ({ ...prev, [label]: e.target.value }))}
                placeholder={`请输入${label}`}
              />
            </div>
          ))}
          <button 
            className="primary-btn" 
            onClick={handleRun}
            disabled={isProcessing}
            style={{ marginTop: '12px' }}
          >
            {isProcessing ? "处理中..." : skill.entry}
          </button>
        </div>
      </aside>

      {/* Main Canvas: Execution / Output */}
      <section className="workspace-canvas">
        <div className="canvas-header">
          <h2>输出面板</h2>
          <p>运行结果或预览大纲将展示于此。</p>
        </div>
        
        <div className="result-content">
          {isProcessing && (
            <div style={{ color: "var(--muted)" }}>系统正在分析数据，请稍候...</div>
          )}
          {!isProcessing && !result && (
            <div style={{ color: "var(--line)" }}>在左侧配置参数并运行以查看结果。</div>
          )}
          {!isProcessing && result && (
            <ul>
              {result.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </div>
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
