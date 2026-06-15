export function isAuthorized(request: Request): boolean {
  const apiKey = request.headers.get("x-api-key");
  return apiKey === process.env.NEXT_PUBLIC_API_SECRET;
}
