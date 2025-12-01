// Basic interactions: animation observer, theme toggle, contact fallback & load JSON
document.addEventListener('DOMContentLoaded',()=>{
  // Intersection observer for fade-ups
  const obs = new IntersectionObserver((entries)=>{entries.forEach(e=>{if(e.isIntersecting) e.target.classList.add('show')})},{threshold:0.18});
  document.querySelectorAll('.fade-up, .card, .project').forEach(el=>obs.observe(el));

  // Theme toggle
  const btn = document.getElementById('themeToggle');
  if(btn){
    btn.addEventListener('click', ()=>{
      const current = document.documentElement.getAttribute('data-theme');
      if(current === 'light'){ document.documentElement.removeAttribute('data-theme'); btn.textContent='🌙' }
      else{ document.documentElement.setAttribute('data-theme','light'); btn.textContent='🌞' }
    });
  }

  // year
  const y = document.getElementById('year'); if(y) y.textContent = new Date().getFullYear();

  // fetch content.json and fill minimal content (if available)
  fetch('content.json').then(r=>r.json()).then(data=>{
    if(data.name) document.querySelectorAll('.name').forEach(n=>n.textContent = data.name)
    if(data.email){ const el = document.querySelector('a[href^="mailto:"]'); if(el) el.href = 'mailto:'+data.email }
  }).catch(()=>{});
});

function contactSubmit(){
  const n=document.getElementById('c-name').value.trim();
  const e=document.getElementById('c-email').value.trim();
  const m=document.getElementById('c-msg').value.trim();
  const notice=document.getElementById('notice');
  if(!n||!e||!m){notice.textContent='Please fill all fields.';return}
  // mailto fallback
  const subject=encodeURIComponent('Portfolio contact from '+n);
  const body=encodeURIComponent('Name: '+n+'\\nEmail: '+e+'\\n\\n'+m);
  window.location.href = `mailto:youremail@example.com?subject=${subject}&body=${body}`;
  if(notice) notice.textContent='Opening your email client...';
}
