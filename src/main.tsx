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
      <Sidebar />
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}

function Sidebar() {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <Link to="/" className="brand-link" aria-label="GeoPro 首页">
          <div className="brand-icon" />
          <div className="brand-name">GeoPro</div>
        </Link>
      </div>

      <nav className="sidebar-nav">
        <div className="nav-group">
          <div className="nav-group-title">系统功能</div>
          <Link to="/" className={`nav-item ${currentPath === "/" ? "active" : ""}`}>
            <span className="icon">📊</span> 平台数据
          </Link>
          <Link to="/console" className={`nav-item ${currentPath === "/console" ? "active" : ""}`}>
            <span className="icon">⚙️</span> 账户概览
          </Link>
          <Link to="/pricing" className={`nav-item ${currentPath === "/pricing" ? "active" : ""}`}>
            <span className="icon">💎</span> 订阅服务
          </Link>
        </div>

        {Object.entries(groupLabel).map(([group, label]) => (
          <div key={group} className="nav-group">
            <div className="nav-group-title">{label}分析</div>
            {skills
              .filter((s) => s.group === group)
              .map((skill) => {
                const isActive = currentPath === `/skill/${skill.id}`;
                return (
                  <Link
                    key={skill.id}
                    to="/skill/$skillId"
                    params={{ skillId: skill.id }}
                    className={`nav-item ${isActive ? "active" : ""}`}
                  >
                    {skill.title}
                  </Link>
                );
              })}
          </div>
        ))}
      </nav>
      
      <div className="sidebar-footer">
        <div className="user-profile">
          <div className="avatar" />
          <span className="user-name">未登录账户</span>
          <span className="user-badge">基础版</span>
        </div>
      </div>
    </aside>
  );
}

function HomePage() {
  const auditSkills = skills.filter(s => s.group === 'audit');
  const monitorSkills = skills.filter(s => s.group === 'monitor');

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>平台数据</h1>
        <div className="header-actions">
          <button className="secondary-btn small">推送到看板</button>
          <button className="secondary-btn small">统计口径</button>
        </div>
      </div>

      {/* Mock Dashboard Widgets */}
      <div className="dashboard-widgets">
        <div className="widget-card">
          <div className="widget-title">
            今日实时数据 <span className="time-badge">更新时间 2026/07/06 23:00</span>
          </div>
          <div className="widget-stats">
            <div className="stat-item">
              <span className="stat-label">访问人数</span>
              <div className="stat-val"><strong>135</strong> 人</div>
              <div className="stat-trends">
                较昨日 <span className="trend up">+213.95%</span>
                7日前 <span className="trend up">+121.31%</span>
              </div>
            </div>
            <div className="stat-item">
              <span className="stat-label">打开次数</span>
              <div className="stat-val"><strong>401</strong> 次</div>
              <div className="stat-trends">
                较昨日 <span className="trend up">+236.97%</span>
                7日前 <span className="trend up">+126.55%</span>
              </div>
            </div>
            <div className="stat-item">
              <span className="stat-label">访问页面数</span>
              <div className="stat-val"><strong>703</strong> 个</div>
              <div className="stat-trends">
                较昨日 <span className="trend up">+282.06%</span>
                7日前 <span className="trend up">+164.28%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="dashboard-row">
        <section className="section-block">
          <div className="section-heading left">
            <h2>诊断提醒</h2>
            <p>基于昨日数据，智能诊断经营与性能状况</p>
          </div>
          <div className="skill-grid">
            {auditSkills.map((skill) => (
              <Link key={skill.id} to="/skill/$skillId" params={{ skillId: skill.id }} className="skill-card">
                <div className="badge">{groupLabel[skill.group]}</div>
                <h3>{skill.title}</h3>
                <p>{skill.subtitle}</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="section-block">
          <div className="section-heading left">
            <h2>监测任务</h2>
            <p>正在持续追踪的关键数据</p>
          </div>
          <div className="skill-grid">
            {monitorSkills.map((skill) => (
              <Link key={skill.id} to="/skill/$skillId" params={{ skillId: skill.id }} className="skill-card">
                <div className="badge">{groupLabel[skill.group]}</div>
                <h3>{skill.title}</h3>
                <p>{skill.subtitle}</p>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

function PricingPage() {
  return (
    <div className="page-container">
      <div className="page-header">
        <h1>订阅方案</h1>
      </div>
      <section className="section-block">
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
    <div className="page-container">
      <div className="page-header">
        <h1>账户概览</h1>
      </div>
      <div className="console-grid">
        <div className="console-card">
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
          <h2>当前状态</h2>
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
      setResult(null); 
    }
  }, [skill?.id]);

  if (!skill) {
    return (
      <div className="page-container">
        <h2>找不到此工具模块</h2>
        <button className="secondary-btn" onClick={() => navigate({ to: "/" })}>返回平台数据</button>
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
      setTimeout(() => {
        setResult(data?.outputs ?? skill.outputs);
        setIsProcessing(false);
      }, 800);
    } catch (err) {
      setTimeout(() => {
        setResult(skill.outputs); 
        setIsProcessing(false);
      }, 800);
    }
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>{skill.title}</h1>
        <div className="header-actions">
          <span className="badge">{groupLabel[skill.group]}</span>
        </div>
      </div>
      <p style={{ marginTop: '-12px', marginBottom: '24px', color: 'var(--muted)' }}>{skill.subtitle}</p>

      <div className="workspace-layout">
        <aside className="workspace-sidebar">
          <div className="workspace-form">
            <h3 style={{ marginTop: 0, marginBottom: '12px', fontSize: '16px' }}>参数配置</h3>
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
              {isProcessing ? "执行中..." : skill.entry}
            </button>
          </div>
        </aside>

        <section className="workspace-canvas">
          <div className="canvas-header">
            <h2>执行结果</h2>
            <p>输出的数据、报告或资源将在此展示。</p>
          </div>
          
          <div className="result-content">
            {isProcessing && (
              <div style={{ color: "var(--muted)" }}>系统正在执行分析，请稍候...</div>
            )}
            {!isProcessing && !result && (
              <div style={{ color: "var(--line)" }}>在左侧配置参数并运行即可查看结果。</div>
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

