import { upload } from 'https://esm.sh/@vercel/blob@1.0.0/client';

const login = document.querySelector('#login');
const dashboard = document.querySelector('#dashboard');
const error = document.querySelector('#login-error');
const items = document.querySelector('#items');
const count = document.querySelector('#count');
const template = document.querySelector('#item-template');
let key = sessionStorage.getItem('concreto-admin-key') || '';
let content = { resources: [], videos: [], offers: [] };
let editing = null;
const headers = () => ({ 'Content-Type': 'application/json', 'x-admin-key': key });
const number = new Intl.NumberFormat('es-BO');
const renderAnalyticsList = (selector, rows, field) => {
  const list = document.querySelector(selector);
  list.innerHTML = rows.length ? rows.map(row => `<li><span>${String(row[field] || 'Sin datos')}</span><strong>${number.format(row.visitors || row.pageviews || 0)}</strong></li>`).join('') : '<li><span>Aún no hay datos</span></li>';
};
async function loadAnalytics() {
  const refresh = document.querySelector('#refresh-analytics');
  const errorBox = document.querySelector('#analytics-error');
  const view = document.querySelector('#analytics-content');
  refresh.disabled = true; refresh.textContent = 'Cargando…'; errorBox.textContent = '';
  try {
    const response = await fetch('/api/analytics', { headers: headers(), cache: 'no-store' });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error);
    document.querySelector('#metric-views').textContent = number.format(data.total.pageviews || 0);
    document.querySelector('#metric-visitors').textContent = number.format(data.total.visitors || 0);
    document.querySelector('#analytics-period').textContent = data.period;
    renderAnalyticsList('#analytics-pages', data.pages, 'requestPath');
    renderAnalyticsList('#analytics-countries', data.countries, 'country');
    renderAnalyticsList('#analytics-devices', data.devices, 'deviceType');
    view.hidden = false;
  } catch (error) { errorBox.textContent = error.message || 'No se pudieron cargar las estadísticas.'; view.hidden = true; }
  finally { refresh.disabled = false; refresh.textContent = 'Actualizar'; }
}
const showTab = (name) => {
  document.querySelectorAll('.tabs button').forEach(button => button.classList.toggle('active', button.dataset.tab === name));
  document.querySelectorAll('.form-panel').forEach(panel => panel.hidden = panel.id !== `${name}-form`);
  if (name === 'analytics') loadAnalytics();
};
const resetEditor = (kind) => {
  editing = null;
  const form = document.querySelector(`form[data-kind="${kind}"]`);
  form.reset();
  form.querySelector('button[type="submit"], button:not(.quiet)').textContent = kind === 'resources' ? 'Publicar recurso' : kind === 'videos' ? 'Publicar vídeo' : 'Publicar oferta';
  form.querySelector('.cancel-edit').hidden = true;
};
const openEditor = (kind, index) => {
  const item = content[kind][index];
  editing = { kind, index };
  showTab(kind);
  const form = document.querySelector(`form[data-kind="${kind}"]`);
  form.elements.title.value = item.title || '';
  form.elements.description.value = item.description || '';
  if (form.elements.category) form.elements.category.value = item.category || '';
  if (form.elements.button) form.elements.button.value = item.button || '';
  form.elements.url.value = item.url || '';
  form.querySelector('button[type="submit"], button:not(.quiet)').textContent = 'Guardar cambios';
  form.querySelector('.cancel-edit').hidden = false;
  form.scrollIntoView({ behavior: 'smooth', block: 'start' });
};
const render = () => {
  items.innerHTML = '';
  const entries = Object.entries(content).flatMap(([kind, values]) => values.map((item, index) => ({ kind, item, index })));
  count.textContent = `${entries.length} ${entries.length === 1 ? 'elemento' : 'elementos'}`;
  if (!entries.length) items.innerHTML = '<p class="hint">Aún no hay contenido agregado desde este panel.</p>';
  entries.forEach(({ kind, item, index }) => {
    const node = template.content.cloneNode(true);
    node.querySelector('.tag').textContent = kind === 'resources' ? 'RECURSO' : kind === 'videos' ? 'VÍDEO' : 'OFERTA';
    node.querySelector('h3').textContent = item.title;
    node.querySelector('p').textContent = item.description;
    const link = node.querySelector('.item-link');
    if (item.url) link.href = item.url; else link.hidden = true;
    node.querySelector('.edit').addEventListener('click', () => openEditor(kind, index));
    node.querySelector('.delete').addEventListener('click', async () => {
      if (!window.confirm(`¿Eliminar “${item.title}”? Esta acción no se puede deshacer.`)) return;
      content[kind].splice(index, 1); await save();
    });
    items.append(node);
  });
};
const save = async () => {
  const response = await fetch('/api/content', { method: 'PUT', headers: headers(), body: JSON.stringify(content) });
  if (!response.ok) return alert('No se pudo guardar. Revisa la conexión y la clave.');
  render();
};
const start = async () => {
  const response = await fetch('/api/content', { cache: 'no-store' });
  if (!response.ok) throw new Error();
  content = await response.json();
  login.hidden = true; dashboard.hidden = false; render();
};
document.querySelector('#login-form').addEventListener('submit', async (event) => {
  event.preventDefault(); key = document.querySelector('#access-key').value.trim();
  const response = await fetch('/api/auth', { method: 'POST', headers: headers() });
  if (!response.ok) { error.textContent = 'Clave incorrecta o el panel aún no fue configurado.'; return; }
  sessionStorage.setItem('concreto-admin-key', key); await start();
});
document.querySelector('#logout').addEventListener('click', () => { sessionStorage.removeItem('concreto-admin-key'); location.reload(); });
document.querySelectorAll('.tabs button').forEach(button => button.addEventListener('click', () => showTab(button.dataset.tab)));
document.querySelector('#refresh-analytics').addEventListener('click', loadAnalytics);
document.querySelectorAll('.cancel-edit').forEach(button => button.addEventListener('click', () => resetEditor(button.closest('form').dataset.kind)));
document.querySelectorAll('.form-panel form').forEach(form => form.addEventListener('submit', async (event) => {
  event.preventDefault(); const button = form.querySelector('button'); button.disabled = true; button.textContent = 'Publicando…';
  try {
    const data = new FormData(form); const kind = form.dataset.kind; const file = data.get('file'); let fileUrl = '';
    if (file && file.size) { const blob = await upload(`concreto/${Date.now()}-${file.name}`, file, { access: 'public', handleUploadUrl: '/api/upload', clientPayload: key }); fileUrl = blob.url; }
    const externalUrl = String(data.get('url') || '').trim();
    const uploadedVideo = kind === 'videos' && file && file.size && file.type.startsWith('video/');
    const url = uploadedVideo ? fileUrl : (externalUrl || (editing?.kind === kind ? content[kind][editing.index].url : ''));
    if ((kind === 'resources' || kind === 'videos') && !url) throw new Error('Selecciona un archivo o pega un enlace.');
    const item = { title: String(data.get('title')).trim(), description: String(data.get('description')).trim(), category: String(data.get('category') || '').trim(), button: String(data.get('button') || '').trim(), url, thumbnail: kind === 'videos' && !uploadedVideo ? (fileUrl || (editing?.kind === kind ? content[kind][editing.index].thumbnail : '')) : '', kind: kind === 'resources' ? (fileUrl ? 'PDF' : 'LINK') : '', published: true };
    if (editing?.kind === kind) content[kind][editing.index] = item; else content[kind].unshift(item);
    await save(); resetEditor(kind);
  } catch (reason) { alert(reason.message || 'No se pudo publicar el contenido.'); }
  finally { button.disabled = false; button.textContent = kind === 'resources' ? 'Publicar recurso' : kind === 'videos' ? 'Publicar vídeo' : 'Publicar oferta'; }
}));
if (key) start().catch(() => { sessionStorage.removeItem('concreto-admin-key'); key = ''; });
