import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider, createRouter, createRootRoute, createRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import "./styles.css";

const queryClient = new QueryClient();

const rootRoute = createRootRoute({
  component: () => (
    <div className="shell">
      <header className="topbar">
        <div className="brand">
          <div className="brand-mark" />
          <div>
            <div>GeoPro</div>
            <div style={{ color: "var(--muted)", fontSize: 13 }}>GEO SaaS化服务平台</div>
          </div>
        </div>
        <nav className="nav">
          <Link to="/">首页</Link>
          <Link to="/pricing">定价</Link>
          <Link to="/dashboard">控制台</Link>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
      <footer className="footer">Cloudflare Pages · TanStack · Stripe测试模式 · geopro.agentok.top</footer>
      <TanStackRouterDevtools />
    </div>
  )
});

function HomePage() {
  const products = [
    ["GEO全景诊断", "快速发现品牌在AI搜索中的可见性、证据链和内容缺口。"],
    ["内容增长包", "从意图挖掘到解释文、对比文、榜单文，一站式产出。"],
    ["监测订阅", "持续追踪提及、引用和排名变化，形成月报和提醒。"]
  ];

  const plans = [
    ["入门", "499元起", "页面诊断、标题优化、文章友好化。"],
    ["订阅", "8000元/月起", "监测、月报、优化建议与持续复盘。"],
    ["企业", "按项目报价", "品牌图谱、知识库、托管执行。"]
  ];

  return (
    <>
      <section className="hero">
        <div className="hero-card">
          <div className="eyebrow">AI搜索时代的增长入口</div>
          <h1 className="title">让品牌在GEO里被看见、被引用、被选择</h1>
          <p className="lead">
            这是一个面向AI搜索的SaaS化服务平台，提供诊断、内容、监测和运营托管。
            先从订阅开始，支持单次服务加购，适合做品牌增长和线索转化。
          </p>
          <div className="actions">
            <Link to="/pricing" className="btn btn-primary">查看订阅方案</Link>
            <Link to="/dashboard" className="btn btn-secondary">进入控制台</Link>
          </div>
        </div>
        <div className="hero-card stats">
          <Stat label="订阅优先" value="月费" />
          <Stat label="单次加购" value="按需" />
          <Stat label="上线形态" value="Pages" />
          <Stat label="支付方式" value="Stripe" />
        </div>
      </section>

      <Section title="核心能力">
        <div className="grid cards">
          {products.map(([title, desc]) => (
            <article className="card" key={title}>
              <div className="pill">{title}</div>
              <p className="muted">{desc}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section title="推荐套餐">
        <div className="pricing">
          {plans.map(([name, price, desc]) => (
            <article className="card" key={name}>
              <div className="price">
                <div>
                  <h3>{name}</h3>
                  <strong>{price}</strong>
                </div>
                <div className="pill">可单买</div>
              </div>
              <p className="muted">{desc}</p>
            </article>
          ))}
        </div>
      </Section>
    </>
  );
}

function PricingPage() {
  return (
    <Section title="定价">
      <div className="pricing">
        <article className="card">
          <div className="pill">单次产品</div>
          <h3>页面诊断</h3>
          <strong>499元/页</strong>
          <p className="muted">适合单页优化前体检，快速成交。</p>
        </article>
        <article className="card">
          <div className="pill">订阅主力</div>
          <h3>AI搜索监测</h3>
          <strong>8000元/月起</strong>
          <p className="muted">适合持续追踪提及、引用和排名变化。</p>
        </article>
      </div>
    </Section>
  );
}

function DashboardPage() {
  return (
    <Section title="控制台">
      <div className="dashboard">
        <article className="card">
          <div className="pill">测试模式</div>
          <h3>开通订阅</h3>
          <p className="muted">先用Stripe测试模式跑通最小闭环，再切正式收款。</p>
          <form className="field" method="post" action="/api/create-checkout-session">
            <label htmlFor="email">邮箱</label>
            <input id="email" name="email" type="email" placeholder="name@company.com" />
            <label htmlFor="plan">方案</label>
            <input id="plan" name="plan" defaultValue="subscription-pro" />
            <button className="btn btn-primary" type="submit">去支付测试订单</button>
          </form>
        </article>
        <article className="card">
          <div className="pill">订阅状态</div>
          <h3>当前计划</h3>
          <p className="muted">未开通。支付成功后这里会展示订阅状态、账单和最近报告。</p>
          <div className="actions">
            <button className="btn btn-secondary" type="button">查看样例报告</button>
            <button className="btn btn-secondary" type="button">联系客服</button>
          </div>
        </article>
      </div>
    </Section>
  );
}

function Section(props: { title: string; children: React.ReactNode }) {
  return (
    <section className="section">
      <h2>{props.title}</h2>
      {props.children}
    </section>
  );
}

function Stat(props: { label: string; value: string }) {
  return (
    <div className="stat">
      <strong>{props.value}</strong>
      <div className="muted">{props.label}</div>
    </div>
  );
}

const routeTree = rootRoute.addChildren([
  createRoute({ getParentRoute: () => rootRoute, path: "/", component: HomePage }),
  createRoute({ getParentRoute: () => rootRoute, path: "/pricing", component: PricingPage }),
  createRoute({ getParentRoute: () => rootRoute, path: "/dashboard", component: DashboardPage })
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
