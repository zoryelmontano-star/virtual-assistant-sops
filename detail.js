(() => {
  const root = document.getElementById('detailContent');
  if (!root) return;
  const id = new URLSearchParams(location.search).get('id');
  const p = (window.PLAYBOOKS || []).find(x => x.id === id) || (window.PLAYBOOKS || [])[0];
  if (!p) {
    root.innerHTML = '<div class="empty-state">Playbook not found.</div>';
    return;
  }
  document.title = `${p.title} | Zoryel Montano`;
  const list = items => (items || []).map(item => `<li>${item}</li>`).join('');
  root.innerHTML = `
    <section class="detail-hero">
      <p class="eyebrow">${p.category} • PLAYBOOK ${p.number}</p>
      <h1>${p.title}</h1>
      <p>${p.summary}</p>
      <div class="detail-meta">${(p.tags || []).map(tag => `<span>${tag}</span>`).join('')}</div>
    </section>
    <div class="detail-grid">
      <div class="detail-main">
        <section><h2>Scenario</h2><p>${p.scenario}</p></section>
        <section><h2>Goal</h2><p>${p.goal}</p></section>
        <section><h2>Workflow</h2><ol class="workflow-list">${list(p.workflow)}</ol></section>
        <section><h2>Quality checks</h2><ul class="check-list">${list(p.qa)}</ul></section>
        <section><h2>Metrics to watch</h2><ul class="check-list">${list(p.metrics)}</ul></section>
        <section><h2>Automation opportunities</h2><ul class="check-list">${list(p.automation)}</ul></section>
        <div class="note-box">This is a sample portfolio playbook. It demonstrates process design and documentation structure without using confidential client materials.</div>
      </div>
      <aside class="detail-side">
        <div class="side-card">
          <h3>Playbook snapshot</h3>
          <dl>
            <dt>Area</dt><dd>${p.category}</dd>
            <dt>Typical tools</dt><dd>${p.tools}</dd>
            <dt>Format</dt><dd>Trigger → workflow → QA → metrics → automation</dd>
            <dt>Use case</dt><dd>Training, delegation, consistency, and process improvement</dd>
          </dl>
          <a class="button primary" href="index.html#library">Browse all playbooks</a>
        </div>
      </aside>
    </div>
  `;
})();
