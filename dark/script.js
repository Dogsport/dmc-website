(()=>{
 const body=document.body,menu=document.getElementById('mobile-menu'),menuBtn=document.querySelector('[data-menu]'),closeBtn=document.querySelector('[data-menu-close]');
 function openMenu(){menu.hidden=false;body.style.overflow='hidden';menuBtn?.setAttribute('aria-expanded','true')}
 function closeMenu(){menu.hidden=true;body.style.overflow='';menuBtn?.setAttribute('aria-expanded','false')}
 menuBtn?.addEventListener('click',()=>menu.hidden?openMenu():closeMenu());closeBtn?.addEventListener('click',closeMenu);
 const dlg=document.getElementById('search-dialog');document.querySelector('[data-search]')?.addEventListener('click',()=>dlg.showModal());document.querySelector('[data-search-close]')?.addEventListener('click',()=>dlg.close());
 document.addEventListener('keydown',e=>{if(e.key==='Escape'){closeMenu();if(dlg?.open)dlg.close()}});
 document.querySelectorAll('[data-readmore]').forEach(btn=>btn.addEventListener('click',()=>{const post=btn.closest('[data-post]');const open=post.classList.toggle('expanded');btn.textContent=open?'Weniger sehen':'Mehr sehen'}));
 document.querySelectorAll('[data-like]').forEach(btn=>btn.addEventListener('click',()=>{const post=btn.closest('[data-post]'),counter=post.querySelector('[data-like-count]');let n=parseInt(counter.textContent)||0;const active=btn.classList.toggle('active');btn.setAttribute('aria-pressed',String(active));counter.textContent=active?n+1:Math.max(0,n-1);btn.classList.toggle('active',active)}));
 document.querySelectorAll('[data-comment-toggle]').forEach(btn=>btn.addEventListener('click',()=>{const panel=btn.closest('[data-post]').querySelector('[data-comments-panel]');panel.hidden=!panel.hidden;if(!panel.hidden)panel.querySelector('input')?.focus()}));
 document.querySelectorAll('[data-comment-form]').forEach(form=>form.addEventListener('submit',e=>{e.preventDefault();const input=form.querySelector('input'),value=input.value.trim();if(!value)return;const post=form.closest('[data-post]'),panel=form.closest('[data-comments-panel]');const row=document.createElement('div');row.className='comment';row.innerHTML='<span></span><p><b>Du</b></p>';row.querySelector('p').append(document.createTextNode(value));panel.insertBefore(row,form);input.value='';const c=post.querySelector('[data-comment-count]');c.textContent=(parseInt(c.textContent)||0)+1;}));
 const slider=document.querySelector('[data-slider]');if(slider){const track=slider.querySelector('[data-track]'),items=[...track.children],status=slider.querySelector('[data-slide-status]');let index=0;function go(n){index=(n+items.length)%items.length;items[index].scrollIntoView({behavior:'smooth',block:'nearest',inline:'start'});status.textContent=`${index+1} / ${items.length}`};slider.querySelector('[data-prev]')?.addEventListener('click',()=>go(index-1));slider.querySelector('[data-next]')?.addEventListener('click',()=>go(index+1));track.addEventListener('scroll',()=>{const w=items[0].getBoundingClientRect().width+(parseFloat(getComputedStyle(track).gap)||0);index=Math.max(0,Math.min(items.length-1,Math.round(track.scrollLeft/w)));status.textContent=`${index+1} / ${items.length}`},{passive:true});}
})();


// V4.2: original Facebook media uses the real image URL from the supplied DMC feed HTML.
// If Facebook expires that temporary CDN URL, fall back gracefully instead of leaving a broken image.
document.querySelectorAll('img[data-fallback]').forEach((img) => {
  img.addEventListener('error', () => {
    const fallback = img.dataset.fallback;
    if (fallback && img.src.indexOf(fallback) === -1) img.src = fallback;
  }, { once: true });
});
