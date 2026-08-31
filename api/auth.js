const validKey = (request) => {
  const keys = JSON.parse(process.env.ADMIN_ACCESS_KEYS || '[]');
  return Array.isArray(keys) && keys.length > 0 && keys.length <= 4 && keys.includes(request.headers['x-admin-key']);
};
export default function handler(request, response) {
  if (request.method !== 'POST' || !validKey(request)) return response.status(401).json({ error: 'No autorizado' });
  return response.status(204).end();
}
