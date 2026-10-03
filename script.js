document.getElementById('yr').textContent=new Date().getFullYear();
['emailLink','phoneLink'].forEach(id=>{
  const el=document.getElementById(id);
  el.addEventListener('click',e=>{e.preventDefault();try{window.open(el.href,'_top')}catch(x){location.href=el.href}});
});
document.getElementById('theme').onclick=()=>{
  const r=document.documentElement,d=matchMedia('(prefers-color-scheme:dark)').matches;
  r.dataset.theme=(r.dataset.theme||(d?'dark':'light'))==='dark'?'light':'dark';
};

/* To get messages straight to your inbox without opening an email app:
   create a free form at formspree.io with your email, then paste its URL below. */
const FORM_ENDPOINT='';
const MAIL='shivamkumar02032002@gmail.com';
document.getElementById('cf').addEventListener('submit',async e=>{
  e.preventDefault();
  const f=e.target,er=document.getElementById('cerr'),b=document.getElementById('cbtn'),fd=new FormData(f);
  if(fd.get('website'))return;
  const d={name:(fd.get('name')||'').trim(),email:(fd.get('email')||'').trim(),topic:fd.get('topic'),message:(fd.get('message')||'').trim()};
  er.style.color='';
  if(!d.name||!d.message){er.textContent='Please enter your name and a message.';return}
  if(d.email&&!/^\S+@\S+\.\S+$/.test(d.email)){er.textContent='Enter a valid email address or leave it empty.';return}
  er.textContent='';
  const subject='[Portfolio] '+d.topic+' from '+d.name;
  const mail=()=>{const mu='mailto:'+MAIL+'?subject='+encodeURIComponent(subject)+'&body='+encodeURIComponent(d.message+'\n\nFrom: '+d.name+(d.email?' ('+d.email+')':''));try{window.open(mu,'_top')}catch(x){location.href=mu}er.style.color='var(--mute)';er.textContent='Your email app should open with the message ready. Press send there to deliver it.'};
  if(!FORM_ENDPOINT){mail();return}
  b.disabled=true;b.textContent='Sending...';
  try{
    const r=await fetch(FORM_ENDPOINT,{method:'POST',headers:{'Content-Type':'application/json',Accept:'application/json'},body:JSON.stringify({...d,_subject:subject})});
    if(!r.ok)throw new Error('failed');
    f.reset();er.style.color='var(--brand)';er.textContent='Thank you! Your message has been sent.';
  }catch(x){mail()}
  b.disabled=false;b.textContent='Send message';
});
