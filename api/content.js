import { list, put } from '@vercel/blob';

const EMPTY = { resources: [], videos: [], offers: [] };
const validKey = (request) => {
  const keys = JSON.parse(process.env.ADMIN_ACCESS_KEYS || '[]');
  const key = request.headers['x-admin-key'];
  return Array.isArray(keys) && keys.length > 0 && keys.length <= 4 && keys.includes(key);
};
const readContent = async () => {
  const { blobs } = await list({ prefix: 'concreto/content.json', limit: 1 });
  if (!blobs[0]) return EMPTY;
  const response = await fetch(blobs[0].url, { cache: 'no-store' });
  return response.ok ? { ...EMPTY, ...(await response.json()) } : EMPTY;
};

export default async function handler(request, response) {
  try {
    if (request.method === 'GET') return response.status(200).json(await readContent());
    if (request.method !== 'PUT' || !validKey(request)) return response.status(401).json({ error: 'No autorizado' });
    const content = request.body;
    if (!content || !['resources', 'videos', 'offers'].every(key => Array.isArray(content[key]))) return response.status(400).json({ error: 'Contenido inválido' });
    await put('concreto/content.json', JSON.stringify(content), { access: 'public', addRandomSuffix: false, allowOverwrite: true, contentType: 'application/json', cacheControlMaxAge: 0 });
    return response.status(200).json(content);
  } catch (error) {
    return response.status(500).json({ error: 'No se pudo guardar el contenido. Revisa Vercel Blob.' });
  }
}
