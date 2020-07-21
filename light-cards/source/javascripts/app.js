document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('pre code').forEach(block => hljs.highlightBlock(block));
  document.querySelectorAll('.highlight').forEach(block => hljs.highlightBlock(block));
  document.querySelectorAll('table').forEach(table => {
    if (table.parentElement.tagName.toLowerCase() !== 'figure') {
      table.classList.add('table');
    }
  });
  if (document.querySelectorAll('#search-enabled')) { loadData(); }
});

function loadData() {
  console.log('fetching search data...');
  fetch('/search.json').then(res => res.json()).then(data => _data = data);
}

let _data = null;

function search(e) {
  if (e.value.length < 3) { 
    document.getElementById('search-results').innerHTML = '';
    return; 
  }

  let query = e.value.toLowerCase();
  let results = _data.filter(d => d.title.toLowerCase().includes(query)
    || d.tags && d.tags.filter(t => t.toLowerCase().includes(query)).length >= 1
    || d.categories && d.categories.filter(c => c.toLowerCase().includes(query)).length >= 1
  );

  let list = '<div class="list-group">';
  results.forEach(r => list +=  
    `<a href="${r.url}" class="list-group-item list-group-item-action mt-2">
      <h5>${r.title}</h5>
      <p>Categories: <strong>${r.categories && r.categories.toString()}</strong></p>
      <p>Tags: <strong>${r.tags && r.tags.toString()}</strong></p>
    </a>`
  );
  list += '</div>';

  document.getElementById('search-results').innerHTML = list;
}