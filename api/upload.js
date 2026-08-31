import { handleUpload } from '@vercel/blob/client';

const validKey = (key) => {
  const keys = JSON.parse(process.env.ADMIN_ACCESS_KEYS || '[]');
  return Array.isArray(keys) && keys.length > 0 && keys.length <= 4 && keys.includes(key);
};
export default async function handler(request, response) {
  try {
    const result = await handleUpload({
      body: request.body,
      request,
      onBeforeGenerateToken: async (_pathname, clientPayload) => {
        if (!validKey(clientPayload)) throw new Error('No autorizado');
        return { allowedContentTypes: ['application/pdf', 'video/mp4', 'video/webm', 'image/jpeg', 'image/png', 'image/webp'], addRandomSuffix: true };
      },
      onUploadCompleted: async () => {}
    });
    return response.status(200).json(result);
  } catch (error) {
    return response.status(401).json({ error: 'No autorizado o archivo no permitido' });
  }
}
