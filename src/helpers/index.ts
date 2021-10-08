type FetchOptions = RequestInit & {
  data?: any;
  token?: string;
};

export async function fetchJson<T>(
  url: RequestInfo,
  fetchOptions?: FetchOptions,
): Promise<T> {
  const headers = new Headers({ 'Content-Type': 'application/json' });
  let options: RequestInit = {
    method: 'GET',
    headers: undefined,
    credentials: process.env.REACT_APP_HTTP_CRED as RequestCredentials,
  };
  if (fetchOptions) {
    const { data, token, ...rest } = fetchOptions;
    options = { ...options, ...rest };
    if (data) {
      options.body = JSON.stringify(data);
    }
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
  }
  options.headers = headers;
  const response = await fetch(url, options);
  const data = await response.json();
  if (response.status >= 200 && response.status < 300) {
    return data;
  } else {
    throw new Error(data.message || response.statusText);
  }
}
