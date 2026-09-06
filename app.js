(() => {
  const LETTERS=['A','B','C','D','E','F'];
  const $=id=>document.getElementById(id);
  const stateKey='maestroAlbanilQuizV1';
  let state=JSON.parse(localStorage.getItem(stateKey)||'{}');
  let current=null, validated=false;
  const bank=(window.QUESTION_BANK||[]).filter(q=>q&&q.question&&Array.isArray(q.options)&&q.options.length>=2&&Number.isInteger(q.correct)&&q.correct>=0&&q.correct<q.options.length);
  const uniq=a=>[...new Set(a.filter(Boolean))].sort((a,b)=>a.localeCompare(b,'es'));
  function save(){localStorage.setItem(stateKey,JSON.stringify(state));}
  function filterBank(){return bank.filter(q=>(!state.exam||q.exam===state.exam)&&(!state.category||q.category===state.category));}
  function fillSelect(el, values, allText, selected){el.innerHTML=''; const o=document.createElement('option');o.value='';o.textContent=allText;el.appendChild(o);values.forEach(v=>{const x=document.createElement('option');x.value=v;x.textContent=v;if(v===selected)x.selected=true;el.appendChild(x)});}
  function setup(){
    // Cada apertura de la página inicia una nueva ronda aleatoria.
    // Se conservan las estadísticas, pero se reinicia la lista de preguntas ya vistas.
    state={exam:state.exam||'',category:state.category||'',seen:[],stats:state.stats||{done:0,hits:0,misses:0}};
    fillSelect($('exam'),uniq(bank.map(q=>q.exam)),'Todos los exámenes',state.exam);
    fillSelect($('category'),uniq(bank.map(q=>q.category)),'Todas las categorías',state.category);
    $('exam').onchange=e=>{state.exam=e.target.value;resetRound();render();};
    $('category').onchange=e=>{state.category=e.target.value;resetRound();render();};
    $('restart').onclick=()=>{if(confirm('¿Reiniciar la ronda y las estadísticas?')){state.seen=[];state.stats={done:0,hits:0,misses:0};save();render();}};
    $('validate').onclick=validate;$('next').onclick=next;renderStats();next();
  }
  function resetRound(){state.seen=[];save();}
  function renderStats(){const s=state.stats,total=s.done||0;$('done').textContent=total;$('hits').textContent=s.hits||0;$('misses').textContent=s.misses||0;$('rate').textContent=total?Math.round((s.hits/total)*100)+'%':'0%';$('remaining').textContent=Math.max(0,filterBank().filter(q=>!state.seen.includes(q.id)).length);}
  function next(){
    const pool=filterBank(); if(!pool.length){$('question').textContent='No hay preguntas disponibles para este filtro.';return;}
    let available=pool.filter(q=>!state.seen.includes(q.id));
    if(!available.length){state.seen=[];save();available=[...pool];}
    current=available[Math.floor(Math.random()*available.length)];state.seen.push(current.id);save();validated=false;
    $('examName').textContent=current.exam||'';$('qnum').textContent='Pregunta '+(current.number??'');$('question').textContent=current.question;
    $('answers').innerHTML='';current.options.forEach((opt,i)=>{const label=document.createElement('label');label.className='option';label.innerHTML=`<input type="radio" name="answer" value="${i}"><span><strong>${LETTERS[i]||i+1}.</strong> ${escapeHtml(opt)}</span>`;$('answers').appendChild(label);});
    $('feedback').className='feedback hidden';$('feedback').textContent='';$('validate').disabled=false;$('validate').classList.remove('hidden');$('next').classList.add('hidden');renderStats();
  }
  function validate(e){e.preventDefault();if(validated)return;const checked=document.querySelector('input[name=answer]:checked');if(!checked){$('feedback').textContent='Selecciona una respuesta antes de validar.';$('feedback').className='feedback bad';return;}validated=true;const choice=Number(checked.value),ok=choice===current.correct;state.stats.done++;if(ok)state.stats.hits++;else state.stats.misses++;save();
    document.querySelectorAll('.option').forEach((el,i)=>{const input=el.querySelector('input');input.disabled=true;if(i===current.correct)el.classList.add('correct');if(i===choice&&!ok)el.classList.add('wrong');});
    const correct=`${LETTERS[current.correct]||current.correct+1}. ${current.options[current.correct]}`;
    $('feedback').textContent=ok?'✅ Correcta. ¡Bien hecho!':'❌ Incorrecta. La respuesta correcta es: '+correct;$('feedback').className='feedback '+(ok?'ok':'bad');$('validate').classList.add('hidden');$('next').classList.remove('hidden');renderStats();
  }
  function escapeHtml(s){return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]));}
  if('serviceWorker' in navigator)window.addEventListener('load',()=>navigator.serviceWorker.register('./sw.js').catch(()=>{}));
  setup();
})();