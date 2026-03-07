import "server-only";
import { ApiClientError } from "@/lib/http/errors";

type FetchJsonOptions = RequestInit & {
  baseUrl?: string;
  path: string;
  query?: Record<string, string | number | boolean | undefined>;
};

const fetchJson = async <T>({
  baseUrl = "",
  path,
  query,
  headers,
  ...options
}: FetchJsonOptions): Promise<T> => {
  const url = new URL(path, baseUrl);

  if (query) {
    for (const [key, value] of Object.entries(query)) {
      if (value !== undefined) url.searchParams.set(key, value.toString());
    }
  }

  const res = await fetch(url.toString(), {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    cache: "no-store",
  });

  const contentType = res.headers.get("content-type") ?? "";
  const body = contentType.includes("application/json")
    ? await res.json()
    : await res.text();

  if (!res.ok) {
    throw new ApiClientError("Upstream API request failed", res.status, body);
  }

  return body as T;
};

export { fetchJson };
