# Panel de contenido CONCRETO

El panel está en `/admin.html`. Permite publicar recursos PDF/enlaces, vídeos y ofertas sin modificar los archivos de la web.

## Activación única en Vercel

1. En el proyecto de Vercel, abre **Storage** y crea un almacén **Blob**. Conéctalo a este proyecto: Vercel añadirá `BLOB_READ_WRITE_TOKEN` automáticamente.
2. En **Settings → Environment Variables**, crea `ADMIN_ACCESS_KEYS` con un arreglo JSON de entre una y cuatro claves largas. Ejemplo:

   ```json
   ["clave-larga-persona-1", "clave-larga-persona-2"]
   ```

3. Haz un nuevo despliegue. Comparte solamente la dirección `/admin.html` y una clave distinta con cada persona autorizada.

Los archivos se guardan en Vercel Blob y el contenido publicado se muestra automáticamente en la página principal. No subas claves a GitHub ni las pongas en el código.
