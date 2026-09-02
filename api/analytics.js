const validKey = (request) => {
  const keys = JSON.parse(process.env.ADMIN_ACCESS_KEYS || '[]');
  return Array.isArray(keys) && keys.includes(request.headers['x-admin-key']);
};

const query = async (path, params) => {
  const url = new URL(`https://api.vercel.com/v1/query/web-analytics/${path}`);
  Object.entries(params).forEach(([key, value]) => value && url.searchParams.set(key, value));
  const response = await fetch(url, { headers: { Authorization: `Bearer ${process.env.VERCEL_ANALYTICS_TOKEN}` } });
  if (!response.ok) throw new Error(`Vercel respondió ${response.status}`);
  return response.json();
};

export default async function handler(request, response) {
  if (request.method !== 'GET' || !validKey(request)) return response.status(401).json({ error: 'No autorizado' });
  if (!process.env.VERCEL_ANALYTICS_TOKEN || !process.env.VERCEL_PROJECT_ID) return response.status(503).json({ error: 'Falta configurar las estadísticas en Vercel.' });
  try {
    const today = new Date();
    const since = new Date(today); since.setDate(today.getDate() - 29);
    const format = (date) => date.toISOString().slice(0, 10);
    const scope = { projectId: process.env.VERCEL_PROJECT_ID, teamId: process.env.VERCEL_TEAM_ID };
    const base = { ...scope, since: format(since), until: format(today), limit: '5' };
    const [total, pages, countries, devices] = await Promise.all([
      query('visits/count', scope),
      query('visits/aggregate', { ...base, by: 'requestPath' }),
      query('visits/aggregate', { ...base, by: 'country' }),
      query('visits/aggregate', { ...base, by: 'deviceType' })
    ]);
    return response.status(200).json({ total: total.data || {}, pages: pages.data || [], countries: countries.data || [], devices: devices.data || [], period: 'Desglose: últimos 30 días' });
  } catch (error) {
    return response.status(502).json({ error: 'No se pudieron obtener los datos de Vercel. Revisa la configuración.' });
  }
}
