export const onRequestGet = async () => {
  return Response.json({
    plan: "none",
    status: "未开通",
    mode: "test",
    updatedAt: new Date().toISOString()
  });
};
