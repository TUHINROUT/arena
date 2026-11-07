(() => {
  const $ = s => document.querySelector(s), $$ = s => [...document.querySelectorAll(s)];
  const menu=$('#menu'), burger=$('#burger');
  burger.onclick=()=>{menu.classList.toggle('open');burger.classList.toggle('on')};
  $$('#menu a').forEach(a=>a.onclick=()=>{menu.classList.remove('open');burger.classList.remove('on')});

  // courses
  const grid=$('#courseGrid'), tabs=$('#tabs'), sel=$('#courseSelect');
  const cats=['All',...new Set(COURSES.map(c=>c.cat))];
  tabs.innerHTML=cats.map((c,i)=>`<button type="button" class="${i?'':'active'}" data-c="${c}">${c}</button>`).join('');
  grid.innerHTML=COURSES.map(c=>`<article class="card cc" data-cat="${c.cat}"><span class="dur">⏱ ${c.d}</span><h3>${c.t}</h3><p>${c.p}</p><div class="tags">${c.tags.map(t=>`<span>${t}</span>`).join('')}</div><a href="${SITE}${c.u}" target="_blank" rel="noopener" class="btn btn--sm">VIEW COURSE DETAILS</a></article>`).join('');
  tabs.onclick=e=>{const b=e.target.closest('button');if(!b)return;
    $$('#tabs button').forEach(x=>x.classList.toggle('active',x===b));
    $$('#courseGrid .cc').forEach(c=>{const on=b.dataset.c==='All'||c.dataset.cat===b.dataset.c;c.hidden=!on;if(on){c.classList.remove('rv');c.classList.add('rv','in')}});};
  sel.innerHTML='<option value="">Select Course</option>'+SELECT_NAMES.map(n=>`<option>${n}</option>`).join('');

  // slider
  const sl=$('#slider'),dots=$('#dots');let cur=0,timer;
  sl.innerHTML=STORIES.map(s=>`<figure class="story"><div class="av">${s[0]}</div><blockquote>“${s[3]}”</blockquote><figcaption><b>${s[1]}</b><br>${s[2]}</figcaption></figure>`).join('');
  STORIES.forEach((_,i)=>{dots.insertAdjacentHTML('beforeend',`<button aria-label="Slide ${i+1}"></button>`);dots.lastChild.onclick=()=>go(i,true)});
  function go(i,m){cur=(i+STORIES.length)%STORIES.length;sl.style.setProperty('--i',cur);
    $$('#dots button').forEach((d,k)=>d.classList.toggle('on',k===cur));
    if(m){clearInterval(timer);timer=setInterval(()=>go(cur+1),5000)}}
  go(0);timer=setInterval(()=>go(cur+1),5000);

  // counters
  const io=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;io.unobserve(e.target);
    const el=e.target,t=+el.dataset.count;let n=0;
    const st=setInterval(()=>{n+=Math.max(1,Math.ceil(t/40));if(n>=t){n=t;clearInterval(st)}el.textContent=n+el.dataset.suffix},30)}),{threshold:.5});
  $$('[data-count]').forEach(el=>io.observe(el));

  // reveal
  const rv=new IntersectionObserver(es=>es.forEach(e=>e.isIntersecting&&(e.target.classList.add('in'),rv.unobserve(e.target))),{threshold:.1});
  $$('.card,.stats>div,.faq details,.shot,.mentor,.hire img').forEach(el=>{el.classList.add('rv');rv.observe(el)});

  // enquiry form -> WhatsApp
  const msg=$('#msg');
  $('#form').onsubmit=e=>{e.preventDefault();const f=new FormData(e.target);
    if(!f.get('name').trim()||!/^[+\d\s-]{8,15}$/.test(f.get('phone').trim())){msg.textContent='Please enter your name and a valid mobile number.';msg.className='msg err';return}
    const text=`Hello Arena Animation, I'm ${f.get('name')} (${f.get('phone')}${f.get('email')?', '+f.get('email'):''}). Interested in: ${f.get('course')||'your courses'}. ${f.get('message')||''}`;
    msg.textContent='Thank you! Our team will call you shortly.';msg.className='msg ok';
    window.open('https://wa.me/917440161616?text='+encodeURIComponent(text),'_blank');e.target.reset()};
  $('#sub').onsubmit=e=>{e.preventDefault();const v=new FormData(e.target).get('email');
    location.href='mailto:hr@arenamultimedia.co.in?subject=Subscribe%20me%20for%20updates&body='+encodeURIComponent('Please send updates to '+v)};

  const st=$('.sticky');
  addEventListener('scroll',()=>st.classList.toggle('show',scrollY>600&&!(innerHeight+scrollY>document.body.scrollHeight-900)),{passive:true});
})();
