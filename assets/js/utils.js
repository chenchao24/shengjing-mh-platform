/* ================================================================
   UTILS.JS — Shared Utilities: Navigation · Params · Sidebar · Toast
   ================================================================ */
'use strict';
window.Utils = (function () {

  /* ── URL Helpers ── */
  function getParam(name) {
    return new URLSearchParams(location.search).get(name);
  }
  function navigate(url) { location.href = url; }
  function formatNum(n) { return Number(n).toLocaleString('zh-CN'); }
  function fmtDate(d) { return d; }

  /* ── Toast ── */
  let _toastZone = null;
  function toast(msg, ms = 2200) {
    if (!_toastZone) {
      _toastZone = document.createElement('div');
      _toastZone.className = 'toast-zone';
      document.body.appendChild(_toastZone);
    }
    const t = document.createElement('div');
    t.className = 'toast';
    t.textContent = msg;
    _toastZone.appendChild(t);
    setTimeout(() => t.remove(), ms);
  }

  /* ── Drawer ── */
  function openDrawer(ovId, drawId) {
    document.getElementById(ovId).classList.add('open');
    document.getElementById(drawId).classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeDrawer(ovId, drawId) {
    document.getElementById(ovId).classList.remove('open');
    document.getElementById(drawId).classList.remove('open');
    document.body.style.overflow = '';
  }

  /* ── Modal ── */
  function openModal(id) {
    document.getElementById(id).classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeModal(id) {
    document.getElementById(id).classList.remove('open');
    document.body.style.overflow = '';
  }

  /* ── Status Badge HTML ── */
  function statusBadge(s) {
    const map = {
      '已发布':'badge-ok','草稿':'badge-neu','已下架':'badge-warn',
      '已完成':'badge-ok','待就诊':'badge-cp','已取消':'badge-neu',
      '改期中':'badge-warn','接诊中':'badge-ok','暂停接诊':'badge-neu'
    };
    return `<span class="badge ${map[s]||'badge-neu'}">${s}</span>`;
  }

  /* ── Admin Sidebar Injection ── */
  const NAV = [
    { id:'dashboard',  ico:'📊', label:'运营总览',  href:'./dashboard.html' },
    { id:'articles',   ico:'📰', label:'文章管理',  href:'./articles.html' },
    { id:'categories', ico:'🏷', label:'分类标签',  href:'./categories.html', sub:true },
    { id:'doctors',    ico:'👨‍⚕️', label:'医生资源库', href:'./doctors.html' },
    { id:'schedule',   ico:'📅', label:'排班号源',  href:'./schedule.html', sub:true },
    { id:'orders',     ico:'📋', label:'预约订单',  href:'./orders.html', sub:true },
  ];

  function initAdminSidebar(active) {
    const sb = document.getElementById('adm-sb');
    if (!sb) return;
    const navHtml = NAV.map(n =>
      `<a class="sb-item${n.sub ? ' sub' : ''}${n.id === active ? ' on' : ''}" href="${n.href}">
        <span class="sb-ico">${n.ico}</span>${n.label}
      </a>`
    ).join('');
    sb.innerHTML = `
      <div class="sb-brand">
        <div class="sb-eye">心理专科联盟</div>
        <div class="sb-name">盛京心理后台</div>
      </div>
      <nav class="sb-nav">
        <div class="sb-sec-lbl">内容运营</div>
        ${navHtml.slice(0, NAV.findIndex(n=>n.id==='doctors')*1).split('</a>').slice(0,2).join('</a>')}
        </a>
        <div class="sb-sec-lbl">门诊预约</div>
        ${NAV.slice(3).map(n =>
          `<a class="sb-item${n.sub ? ' sub' : ''}${n.id === active ? ' on' : ''}" href="${n.href}">
            <span class="sb-ico">${n.ico}</span>${n.label}
          </a>`
        ).join('')}
      </nav>
      <div class="sb-foot">
        <div class="sb-user">
          <div class="sb-avatar">管</div>
          <div>
            <div class="sb-uname">超级管理员</div>
            <div class="sb-urole">admin@shengjing.com</div>
          </div>
        </div>
        <a class="btn btn-wh btn-sm" href="../index.html">← 返回首页</a>
      </div>`;

    // re-render cleanly
    const items = NAV.map(n =>
      `<a class="sb-item${n.sub?' sub':''}${n.id===active?' on':''}" href="${n.href}">
        <span class="sb-ico">${n.ico}</span>${n.label}</a>`
    );
    sb.innerHTML = `
      <div class="sb-brand">
        <div class="sb-eye">心理专科联盟管理平台</div>
        <div class="sb-name">盛京心理后台</div>
      </div>
      <nav class="sb-nav">
        <div class="sb-sec-lbl">内容运营</div>
        ${items[0]}${items[1]}${items[2]}
        <div class="sb-sec-lbl">门诊预约</div>
        ${items[3]}${items[4]}${items[5]}
      </nav>
      <div class="sb-foot">
        <div class="sb-user">
          <div class="sb-avatar">管</div>
          <div><div class="sb-uname">超级管理员</div><div class="sb-urole">admin@shengjing.com</div></div>
        </div>
        <a class="btn btn-wh btn-sm" style="margin-top:0" href="../index.html">← 返回首页</a>
      </div>`;

    // Mobile: inject sidebar overlay + topbar with hamburger toggle
    if (!document.getElementById('sb-overlay')) {
      const ov = document.createElement('div');
      ov.id = 'sb-overlay';
      ov.className = 'sb-overlay';
      ov.onclick = () => {
        document.getElementById('adm-sb').classList.remove('open');
        ov.classList.remove('open');
      };
      document.body.appendChild(ov);
    }
    const main = document.querySelector('.adm-main');
    if (main && !document.getElementById('adm-topbar')) {
      const activeItem = NAV.find(n => n.id === active);
      const bar = document.createElement('div');
      bar.id = 'adm-topbar';
      bar.className = 'adm-topbar';
      bar.innerHTML =
        '<button class="adm-burger" id="sb-burger">☰</button>' +
        '<div class="adm-topbar-title">' + (activeItem ? activeItem.label : '后台管理') + '</div>' +
        '<a class="btn btn-s btn-sm" href="../index.html" style="flex-shrink:0">← 首页</a>';
      main.insertBefore(bar, main.firstChild);
      document.getElementById('sb-burger').onclick = () => {
        const s = document.getElementById('adm-sb');
        const ov = document.getElementById('sb-overlay');
        const isOpen = s.classList.toggle('open');
        if (ov) ov.classList.toggle('open', isOpen);
      };
    }
  }

  /* ── Patient Nav Injection ── */
  const PT_NAV = [
    { id:'articles',    ico:'📰', label:'科普',   href:'./articles.html' },
    { id:'appointment', ico:'📅', label:'预约',   href:'./appointment.html' },
    { id:'doctors',     ico:'👨‍⚕️', label:'医生',   href:'./doctors.html' }
  ];
  function initPatientNav(active) {
    const container = document.getElementById('bt-nav');
    if (!container) return;
    container.innerHTML = PT_NAV.map(n =>
      `<a class="btn-nav-item${n.id===active?' on':''}" href="${n.href}">
        <span class="nv-ico">${n.ico}</span>${n.label}</a>`
    ).join('');
  }

  return { getParam, navigate, formatNum, toast, openDrawer, closeDrawer,
           openModal, closeModal, statusBadge, initAdminSidebar, initPatientNav };
})();
