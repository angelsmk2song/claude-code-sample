import { supabase } from './supabase-config.js';

const pageType = document.body.dataset.page;
const festivalTableBody = document.querySelector('[data-festival-tbody]');
const monthlyContainer = document.querySelector('[data-monthly-container]');
const regionContainer = document.querySelector('[data-region-container]');

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function getMonthGroup(monthText) {
  const match = monthText.match(/(\d{1,2})월/);
  return match ? `${match[1]}월` : '기타';
}

function getRegionGroup(regionText) {
  const match = regionText.match(/^(.*?(?:특별자치도|광역시|도|시|군))/);
  return match ? match[1].trim() : regionText;
}

function renderListView(data) {
  if (!festivalTableBody) return;

  if (!data || data.length === 0) {
    festivalTableBody.innerHTML = `
      <tr>
        <td colspan="4">등록된 축제 정보가 없습니다.</td>
      </tr>
    `;
    return;
  }

  festivalTableBody.innerHTML = data
    .map((festival) => `
      <tr>
        <td>${escapeHtml(festival.name)}</td>
        <td>${escapeHtml(festival.region)}</td>
        <td>${escapeHtml(festival.month)}</td>
        <td>${escapeHtml(festival.description)}</td>
      </tr>
    `)
    .join('');
}

function renderMonthlyView(data) {
  if (!monthlyContainer) return;

  if (!data || data.length === 0) {
    monthlyContainer.innerHTML = `<div class="group-card"><p>등록된 축제 정보가 없습니다.</p></div>`;
    return;
  }

  const groups = data.reduce((acc, festival) => {
    const month = getMonthGroup(festival.month);
    if (!acc[month]) acc[month] = [];
    acc[month].push(festival);
    return acc;
  }, {});

  monthlyContainer.innerHTML = Object.keys(groups)
    .sort((a, b) => {
      const ma = parseInt(a, 10);
      const mb = parseInt(b, 10);
      if (isNaN(ma) || isNaN(mb)) return a.localeCompare(b, 'ko');
      return ma - mb;
    })
    .map((month) => `
      <div class="group-card">
        <h2>${escapeHtml(month)}</h2>
        <ul class="festival-list">
          ${groups[month]
            .map(
              (festival) => `
                <li>
                  <strong>${escapeHtml(festival.name)}</strong>
                  <span>${escapeHtml(festival.month)} / ${escapeHtml(festival.region)}</span>
                </li>
              `
            )
            .join('')}
        </ul>
      </div>
    `)
    .join('');
}

function renderRegionView(data) {
  if (!regionContainer) return;

  if (!data || data.length === 0) {
    regionContainer.innerHTML = `<div class="group-card"><p>등록된 축제 정보가 없습니다.</p></div>`;
    return;
  }

  const groups = data.reduce((acc, festival) => {
    const region = getRegionGroup(festival.region);
    if (!acc[region]) acc[region] = [];
    acc[region].push(festival);
    return acc;
  }, {});

  regionContainer.innerHTML = Object.keys(groups)
    .sort((a, b) => a.localeCompare(b, 'ko'))
    .map((region) => `
      <div class="group-card">
        <h2>${escapeHtml(region)}</h2>
        <ul class="festival-list">
          ${groups[region]
            .map(
              (festival) => `
                <li>
                  <strong>${escapeHtml(festival.name)}</strong>
                  <span>${escapeHtml(festival.month)} / ${escapeHtml(festival.description)}</span>
                </li>
              `
            )
            .join('')}
        </ul>
      </div>
    `)
    .join('');
}

async function fetchFestivals() {
  const { data, error } = await supabase.from('festivals').select('*').order('id', { ascending: true });

  if (error) {
    console.error('Supabase error:', error);
    if (festivalTableBody) {
      festivalTableBody.innerHTML = `
        <tr>
          <td colspan="4">데이터를 불러오는 중 오류가 발생했습니다. 콘솔을 확인하세요.</td>
        </tr>
      `;
    }
    const errorHtml = `<div class="group-card"><p>데이터를 불러오는 중 오류가 발생했습니다. 콘솔을 확인하세요.</p></div>`;
    if (monthlyContainer) monthlyContainer.innerHTML = errorHtml;
    if (regionContainer) regionContainer.innerHTML = errorHtml;
    return [];
  }

  return data || [];
}

async function initPage() {
  const data = await fetchFestivals();

  if (pageType === 'monthly') {
    renderMonthlyView(data);
  } else if (pageType === 'region') {
    renderRegionView(data);
  } else {
    renderListView(data);
  }
}

initPage();
