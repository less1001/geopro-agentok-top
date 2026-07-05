import Stripe from "stripe";

export interface Env {
  STRIPE_SECRET_KEY?: string;
  STRIPE_PRICE_ID?: string;
  SITE_URL?: string;
}

type PagesRequestContext = {
  request: Request;
  env: Env;
};

export const onRequestPost = async ({ request, env }: PagesRequestContext) => {
  const form = await request.formData();
  const email = String(form.get("email") ?? "");
  const plan = String(form.get("plan") ?? "subscription-pro");

  if (!env.STRIPE_SECRET_KEY) {
    return Response.json(
      {
        ok: false,
        message: "缺少STRIPE_SECRET_KEY。当前仅为测试模式骨架，尚未配置Stripe环境变量。"
      },
      { status: 400 }
    );
  }

  const stripe = new Stripe(env.STRIPE_SECRET_KEY, {
    apiVersion: "2025-08-27.basil"
  });

  const siteUrl = env.SITE_URL ?? "https://geopro.agentok.top";

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    customer_email: email || undefined,
    line_items: [
      {
        price: env.STRIPE_PRICE_ID,
        quantity: 1
      }
    ],
    success_url: `${siteUrl}/dashboard?checkout=success`,
    cancel_url: `${siteUrl}/pricing?checkout=cancel`,
    metadata: { plan }
  });

  return Response.redirect(session.url ?? `${siteUrl}/pricing`, 303);
};
