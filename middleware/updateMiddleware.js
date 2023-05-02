export function checkApiKey(req, res, next) {
  const apiKey = req.headers["x-api-key"];
  if (apiKey !== "lila") {
    return res.status(401).json({ error: "Invalid API key" });
  }
  next();
}
