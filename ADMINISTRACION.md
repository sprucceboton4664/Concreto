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

## Estadísticas dentro del panel

Para activar la pestaña **Estadísticas** de `/admin.html`:

1. En Vercel abre tu proyecto, entra a **Analytics** y pulsa **Enable**.
2. Ve a tu avatar → **Account Settings** → **Tokens** → **Create Token**. Copia el token una sola vez.
3. En tu proyecto: **Settings → Environment Variables**, crea estas variables para *Production, Preview y Development*:

   - `VERCEL_ANALYTICS_TOKEN`: el token que acabas de crear.
   - `VERCEL_PROJECT_ID`: el identificador del proyecto que aparece en **Settings → General**.
   - `VERCEL_TEAM_ID`: solo si el proyecto pertenece a un equipo; también aparece en **Settings → General**. Si es tu cuenta personal, no la crees.

4. Haz un nuevo despliegue. Entra en `/admin.html` y abre la pestaña **Estadísticas**.

El token nunca llega al navegador ni se muestra a quienes visitan la web. Sirve solo para que la función privada consulte la API de Analytics de Vercel.
