(() => {
  const playbooks = window.PLAYBOOKS || [];
  const grid = document.getElementById('playbookGrid');
  const filters = document.getElementById('filters');
  const search = document.getElementById('searchInput');
  const empty = document.getElementById('emptyState');
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
  if (!grid || !filters) return;

  const categories = ['All', ...new Set(playbooks.map(p => p.category))];
  let active = 'All';
  let query = '';

  function slugClass(category) {
    return String(category || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  }

  function renderFilters() {
    filters.innerHTML = categories.map(category => `
      <button class="filter-btn ${category === active ? 'active' : ''}" data-filter="${category}">${category}</button>
    `).join('');
    filters.querySelectorAll('button').forEach(button => {
      button.addEventListener('click', () => {
        active = button.dataset.filter;
        renderFilters();
        renderCards();
      });
    });
  }

  function matches(playbook) {
    const categoryMatch = active === 'All' || playbook.category === active;
    const haystack = [playbook.title, playbook.summary, playbook.category, ...(playbook.tags || []), playbook.tools].join(' ').toLowerCase();
    return categoryMatch && haystack.includes(query.toLowerCase());
  }

  function renderCards() {
    const results = playbooks.filter(matches);
    grid.innerHTML = results.map(p => `
      <a class="playbook-card ${slugClass(p.category)}" href="playbook.html?id=${encodeURIComponent(p.id)}">
        <div class="card-top">
          <span class="category-pill">${p.category}</span>
          <span class="card-number">${p.number}</span>
        </div>
        <h3>${p.title}</h3>
        <p>${p.summary}</p>
        <div class="card-tags">${(p.tags || []).map(tag => `<span>${tag}</span>`).join('')}</div>
        <div class="card-link"><span>View playbook</span><span>↗</span></div>
      </a>
    `).join('');
    empty?.classList.toggle('hidden', results.length > 0);
  }

  search?.addEventListener('input', e => {
    query = e.target.value.trim();
    renderCards();
  });

  renderFilters();
  renderCards();
})();
