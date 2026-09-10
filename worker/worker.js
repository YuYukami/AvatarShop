/* ============================================================
   RimoStudio 折扣代碼 Worker（Cloudflare Workers + KV）
   需求綁定：
   - KV Namespace 綁定名稱： CODES
   - 環境變數(密碼)：        ADMIN_PASSWORD
   後台頁面： 直接開這個 Worker 的網址（根目錄）
   ============================================================ */

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

function json(obj, status = 200) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8', ...CORS },
  });
}

function randomCode(len = 8) {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // 去掉易混淆 0O1I
  const arr = new Uint32Array(len);
  crypto.getRandomValues(arr);
  let s = '';
  for (let i = 0; i < len; i++) s += chars[arr[i] % chars.length];
  return s;
}

function authed(request, env) {
  const h = request.headers.get('Authorization') || '';
  const token = h.replace(/^Bearer\s+/i, '');
  return env.ADMIN_PASSWORD && token === env.ADMIN_PASSWORD;
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const path = url.pathname;

    if (request.method === 'OPTIONS') return new Response(null, { headers: CORS });

    /* 公開：驗證折扣代碼（試算頁呼叫） */
    if (path === '/api/validate' && request.method === 'POST') {
      const body = await request.json().catch(() => ({}));
      const code = (body.code || '').trim().toUpperCase();
      if (!code) return json({ ok: false });
      const raw = await env.CODES.get('code:' + code);
      if (!raw) return json({ ok: false });
      const d = JSON.parse(raw);
      if (!d.enabled) return json({ ok: false });
      return json({ ok: true, code, type: d.type, value: d.value, label: d.label || '' });
    }

    /* 管理 API（需密碼） */
    if (path.startsWith('/api/admin/')) {
      if (!authed(request, env)) return json({ ok: false, error: 'unauthorized' }, 401);

      if (path === '/api/admin/list') {
        const list = await env.CODES.list({ prefix: 'code:' });
        const items = [];
        for (const k of list.keys) {
          const raw = await env.CODES.get(k.name);
          if (raw) items.push({ code: k.name.slice(5), ...JSON.parse(raw) });
        }
        items.sort((a, b) => (b.created || 0) - (a.created || 0));
        return json({ ok: true, items });
      }

      if (path === '/api/admin/create' && request.method === 'POST') {
        const body = await request.json().catch(() => ({}));
        let code = (body.code || '').trim().toUpperCase();
        if (!code) code = randomCode(8);
        const type = body.type === 'amount' ? 'amount' : 'percent';
        let value = Number(body.value) || 0;
        value = type === 'percent' ? Math.max(1, Math.min(100, value)) : Math.max(1, value);
        const data = {
          type, value,
          label: (body.label || '').slice(0, 40),
          enabled: true,
          created: Date.now(),
        };
        await env.CODES.put('code:' + code, JSON.stringify(data));
        return json({ ok: true, code, ...data });
      }

      if (path === '/api/admin/toggle' && request.method === 'POST') {
        const body = await request.json().catch(() => ({}));
        const key = 'code:' + (body.code || '').toUpperCase();
        const raw = await env.CODES.get(key);
        if (!raw) return json({ ok: false });
        const d = JSON.parse(raw);
        d.enabled = !!body.enabled;
        await env.CODES.put(key, JSON.stringify(d));
        return json({ ok: true });
      }

      if (path === '/api/admin/delete' && request.method === 'POST') {
        const body = await request.json().catch(() => ({}));
        await env.CODES.delete('code:' + (body.code || '').toUpperCase());
        return json({ ok: true });
      }

      return json({ ok: false, error: 'not found' }, 404);
    }

    /* 後台頁面 */
    if (path === '/' || path === '/admin') {
      return new Response(ADMIN_HTML, {
        headers: { 'Content-Type': 'text/html; charset=utf-8' },
      });
    }

    return new Response('Not found', { status: 404 });
  },
};

const ADMIN_HTML = `<!doctype html>
<html lang="zh-Hant"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>折扣代碼後台｜RimoStudio</title>
<style>
:root{--bg:#0f0d17;--panel:#1a1726;--line:#312a45;--text:#ece9f5;--muted:#9b93b5;--accent:#a78bfa;--accent2:#f0abfc;--ok:#4ade80;--err:#fca5a5}
*{box-sizing:border-box;margin:0;padding:0;font-family:"Segoe UI","Noto Sans TC",sans-serif}
body{background:var(--bg);color:var(--text);padding:24px;max-width:820px;margin:0 auto}
h1{font-size:26px;background:linear-gradient(90deg,var(--accent),var(--accent2));-webkit-background-clip:text;background-clip:text;color:transparent;margin-bottom:16px}
h3{margin-bottom:8px}
.card{background:var(--panel);border:1px solid var(--line);border-radius:14px;padding:20px;margin-bottom:18px}
label{display:block;font-size:14px;color:var(--muted);margin:10px 0 4px}
input,select{width:100%;padding:10px 12px;border-radius:10px;border:1px solid var(--line);background:#221d33;color:var(--text);font-size:15px}
.row{display:flex;gap:12px;flex-wrap:wrap}.row>div{flex:1;min-width:130px}
button{background:linear-gradient(90deg,var(--accent),var(--accent2));color:#1a1726;font-weight:700;border:none;border-radius:10px;padding:11px 18px;cursor:pointer;font-size:15px}
button.ghost{background:transparent;border:1px solid var(--line);color:var(--text);font-weight:600}
button.danger{background:transparent;border:1px solid var(--err);color:var(--err);font-weight:600}
button.small{padding:6px 12px;font-size:13px}
table{width:100%;border-collapse:collapse;margin-top:6px}
th,td{text-align:left;padding:10px 8px;border-bottom:1px solid var(--line);font-size:14px}
th{color:var(--muted);font-weight:600}
.code{font-family:monospace;font-size:16px;font-weight:700;color:var(--accent2);cursor:pointer}
.msg{font-size:14px;margin-top:10px}.msg.ok{color:var(--ok)}.msg.err{color:var(--err)}
.badge{font-size:12px;padding:2px 8px;border-radius:999px;border:1px solid var(--line)}
.on{color:var(--ok);border-color:var(--ok)}.off{color:var(--muted)}
#app{display:none}
</style></head><body>
<h1>&#10022; 折扣代碼後台</h1>

<div id="login" class="card">
  <label>管理密碼</label>
  <input type="password" id="pw" placeholder="輸入後台密碼">
  <div style="margin-top:12px"><button id="loginBtn">登入</button></div>
  <div class="msg err" id="loginMsg"></div>
</div>

<div id="app">
  <div class="card">
    <h3>產生新代碼</h3>
    <div class="row">
      <div><label>折扣類型</label>
        <select id="type"><option value="percent">百分比 %</option><option value="amount">折抵金額 $</option></select></div>
      <div><label>數值</label><input type="number" id="value" placeholder="例如 10"></div>
    </div>
    <div class="row">
      <div><label>標籤（選填，備註用）</label><input type="text" id="label" placeholder="例如 老客回饋"></div>
      <div><label>自訂代碼（選填，空白=隨機）</label><input type="text" id="custom" placeholder="留空自動隨機"></div>
    </div>
    <div style="margin-top:14px"><button id="createBtn">產生代碼</button></div>
    <div class="msg" id="createMsg"></div>
  </div>

  <div class="card">
    <h3>現有代碼<span style="font-size:13px;color:var(--muted)">（點代碼可複製）</span></h3>
    <div id="list">載入中…</div>
  </div>
</div>

<script>
var PW='';
function api(path,body){
  return fetch(path,{method:body?'POST':'GET',headers:{'Content-Type':'application/json','Authorization':'Bearer '+PW},body:body?JSON.stringify(body):undefined}).then(function(r){return r.json();});
}
document.getElementById('loginBtn').onclick=function(){
  PW=document.getElementById('pw').value;
  api('/api/admin/list').then(function(d){
    if(d&&d.ok){document.getElementById('login').style.display='none';document.getElementById('app').style.display='block';render(d.items);}
    else{document.getElementById('loginMsg').textContent='密碼錯誤';}
  }).catch(function(){document.getElementById('loginMsg').textContent='連線失敗';});
};
document.getElementById('pw').addEventListener('keydown',function(e){if(e.key==='Enter')document.getElementById('loginBtn').click();});
document.getElementById('createBtn').onclick=function(){
  var body={type:document.getElementById('type').value,value:document.getElementById('value').value,label:document.getElementById('label').value,code:document.getElementById('custom').value};
  api('/api/admin/create',body).then(function(d){
    var m=document.getElementById('createMsg');
    if(d&&d.ok){m.className='msg ok';m.textContent='\\u2713 已產生代碼：'+d.code;document.getElementById('value').value='';document.getElementById('label').value='';document.getElementById('custom').value='';refresh();}
    else{m.className='msg err';m.textContent='\\u2717 產生失敗';}
  });
};
function refresh(){api('/api/admin/list').then(function(d){if(d&&d.ok)render(d.items);});}
function render(items){
  var el=document.getElementById('list');
  if(!items.length){el.innerHTML='<p style="color:var(--muted)">尚無代碼</p>';return;}
  var h='<table><tr><th>代碼</th><th>折扣</th><th>標籤</th><th>狀態</th><th></th></tr>';
  items.forEach(function(it){
    var disc=it.type==='percent'?(it.value+'%'):('$'+it.value);
    h+='<tr><td><span class="code" data-copy="'+it.code+'">'+it.code+'</span></td><td>'+disc+'</td><td>'+(it.label||'-')+'</td>'
      +'<td><span class="badge '+(it.enabled?'on':'off')+'">'+(it.enabled?'啟用':'停用')+'</span></td>'
      +'<td style="white-space:nowrap"><button class="ghost small" data-act="toggle" data-code="'+it.code+'" data-en="'+(it.enabled?'0':'1')+'">'+(it.enabled?'停用':'啟用')+'</button> '
      +'<button class="danger small" data-act="del" data-code="'+it.code+'">刪除</button></td></tr>';
  });
  el.innerHTML=h+'</table>';
}
document.getElementById('list').addEventListener('click',function(e){
  var c=e.target.closest('[data-copy]');
  if(c){navigator.clipboard&&navigator.clipboard.writeText(c.getAttribute('data-copy'));c.textContent='已複製!';setTimeout(refresh,700);return;}
  var b=e.target.closest('button');if(!b)return;
  var code=b.getAttribute('data-code'),act=b.getAttribute('data-act');
  if(act==='toggle')api('/api/admin/toggle',{code:code,enabled:b.getAttribute('data-en')==='1'}).then(refresh);
  if(act==='del'){if(confirm('確定刪除 '+code+'？'))api('/api/admin/delete',{code:code}).then(refresh);}
});
</script>
</body></html>`;
