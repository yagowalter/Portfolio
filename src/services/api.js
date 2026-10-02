const apiBaseUrl = import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, "");
const contactApiUrl =
  "https://vfb8tr04ke.execute-api.us-east-1.amazonaws.com/contact";

async function request(url, options) {
  const response = await fetch(url, options);
  const data = await response.json().catch(() => null);
  if (!response.ok) {
    throw new Error(
      data?.message ||
        data?.error ||
        "Não foi possível concluir a solicitação.",
    );
  }
  return data;
}

export function isProjectsApiConfigured() {
  return Boolean(apiBaseUrl);
}

export function getProjects() {
  if (!apiBaseUrl) return Promise.resolve(null);
  return request(`${apiBaseUrl}/projects`);
}

export function sendContactMessage(payload) {
  const url = apiBaseUrl ? `${apiBaseUrl}/contact` : contactApiUrl;
  return request(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...payload, source: "portfolio" }),
  });
}
