(function(){
  'use strict';
  /* ===== EDIT ME: hackathon start (9:00 AM Eastern is a guess) ===== */
  var HACKATHON_START = '2027-02-13T09:00:00-05:00';

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  var $ = function(s,r){return (r||document).querySelector(s)};
  var $$ = function(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s))};

  /* ---------- toast ---------- */
  var toast=$('#toast'), toastT;
  function say(msg){ toast.textContent=msg; toast.classList.add('show'); clearTimeout(toastT); toastT=setTimeout(function(){toast.classList.remove('show')},2600); }
  $$('a[data-soon]').forEach(function(a){ a.addEventListener('click',function(e){ e.preventDefault(); say(a.getAttribute('data-soon')); }); });

  /* ---------- theme reveal ---------- */
  var themeButton=$('#themeButton'), themeTitle=$('#themeTitle'), themeSubtitle=$('#themeSubtitle'), themeReveal=$('#themeReveal');
  themeButton.addEventListener('click',function(){
    themeTitle.hidden=false;
    themeSubtitle.hidden=false;
    themeReveal.classList.add('is-revealed');
    themeButton.setAttribute('aria-expanded','true');
    themeButton.hidden=true;
  });

  /* ---------- team carousel ---------- */
  var teamTrack=$('#teamTrack'), teamPrev=$('#teamPrev'), teamNext=$('#teamNext');
  function updateTeamControls(){
    teamPrev.disabled=teamTrack.scrollLeft<=2;
    teamNext.disabled=teamTrack.scrollLeft+teamTrack.clientWidth>=teamTrack.scrollWidth-2;
  }
  function moveTeamCarousel(direction){
    var card=$('.team-card',teamTrack), gap=parseFloat(getComputedStyle(teamTrack).gap)||0;
    teamTrack.scrollBy({left:direction*(card.getBoundingClientRect().width+gap),behavior:reduce.matches?'auto':'smooth'});
  }
  teamPrev.addEventListener('click',function(){moveTeamCarousel(-1)});
  teamNext.addEventListener('click',function(){moveTeamCarousel(1)});
  teamTrack.addEventListener('scroll',updateTeamControls,{passive:true});
  window.addEventListener('resize',updateTeamControls);
  updateTeamControls();

  /* ---------- countdown ---------- */
  var T = new Date(HACKATHON_START).getTime();
  var cd = {d:$('#cd-d'),h:$('#cd-h'),m:$('#cd-m'),s:$('#cd-s')};
  var last = {};
  function pad(n){return n<10?'0'+n:''+n}
  function setCd(k,v){ if(last[k]!==v){ cd[k].textContent=v; last[k]=v; if(k==='s' && !reduce.matches){ cd.s.classList.remove('tick'); void cd.s.offsetWidth; cd.s.classList.add('tick'); } } }
  function tickCd(){
    var ms=T-Date.now();
    if(ms<=0){
      $('#count').style.display='none'; $('#boarding').style.display='none';
      var done=$('#count-done'); done.style.display='block';
      done.textContent = (Date.now()<T+2*864e5) ? "We're airborne. Hackathon time!" : "Thanks for flying with us. See you next year!";
      return;
    }
    var s=Math.floor(ms/1000);
    setCd('d',String(Math.floor(s/86400))); setCd('h',pad(Math.floor(s%86400/3600))); setCd('m',pad(Math.floor(s%3600/60))); setCd('s',pad(s%60));
    setTimeout(tickCd, 1000 - (Date.now()%1000) + 5);
  }
  tickCd();

  /* ---------- nav ---------- */
  var burger=$('.burger'), links=$('#links');
  burger.addEventListener('click',function(){ var o=links.classList.toggle('open'); burger.setAttribute('aria-expanded',o); });
  $$('#links a').forEach(function(a){ a.addEventListener('click',function(){ links.classList.remove('open'); burger.setAttribute('aria-expanded','false'); }); });
  if('IntersectionObserver' in window){
    var navMap={}; $$('#links a').forEach(function(a){ navMap[a.getAttribute('href').slice(1)]=a; });
    var so=new IntersectionObserver(function(es){ es.forEach(function(e){ if(e.isIntersecting){ $$('#links a').forEach(function(a){a.classList.remove('active')}); var a=navMap[e.target.id]; if(a && !a.classList.contains('apply')) a.classList.add('active'); } }); },{rootMargin:'-45% 0px -50% 0px'});
    $$('main section[id]').forEach(function(s){so.observe(s)});
  }

  /* ---------- stat count-up ---------- */
  var stats=$$('[data-count]');
  function countUp(el){
    var end=+el.getAttribute('data-count'), suf=el.getAttribute('data-suffix')||'';
    if(reduce.matches){ el.textContent=end+suf; return; }
    var t0=performance.now(), dur=1300;
    (function f(t){ var p=Math.min(1,(t-t0)/dur), e=1-Math.pow(1-p,3); el.textContent=Math.round(end*e)+suf; if(p<1) requestAnimationFrame(f); })(t0);
  }
  if('IntersectionObserver' in window){
    var co=new IntersectionObserver(function(es){ es.forEach(function(e){ if(e.isIntersecting){ countUp(e.target); co.unobserve(e.target); } }); },{threshold:.6});
    stats.forEach(function(s){co.observe(s)});
  }

  /* ---------- FAQ accordion ---------- */
  $$('.faq button').forEach(function(b){
    b.addEventListener('click',function(){
      var item=b.closest('.faq'), open=!item.classList.contains('open');
      item.classList.toggle('open',open); b.setAttribute('aria-expanded',open);
    });
  });

  /* ---------- mascot bounce + music notes ---------- */
  function bounce(el, host){
    el.classList.remove('boing'); void el.offsetWidth; el.classList.add('boing');
    if(host && !reduce.matches){
      var n=document.createElement('i'); n.textContent=Math.random()<.5?'\u266A':'\u266B';
      n.style.setProperty('--dx',(Math.random()*90-45)+'px'); n.style.setProperty('--r',(Math.random()*50-25)+'deg');
      host.appendChild(n); setTimeout(function(){n.remove()},1400);
    }
  }
  var aboutEle=$('#aboutEle'), footEle=$('#footEle'), heroEle=$('#heroEle');
  aboutEle.addEventListener('click',function(){ bounce(aboutEle,$('.note',aboutEle.parentNode)); });
  footEle.addEventListener('click',function(){ bounce(footEle); });
  heroEle.addEventListener('click',function(){ bounce(heroEle.firstElementChild); });
  aboutEle.tabIndex=0; aboutEle.addEventListener('keydown',function(e){ if(e.key==='Enter'||e.key===' '){e.preventDefault(); bounce(aboutEle,$('.note',aboutEle.parentNode));} });

  /* ---------- the route ----------
     The elephant never walks over content: it rides a gently wavy line down the page margins
     (left or right of each section, beside its landmark) and only crosses the page
     through the empty gaps between sections. */
  var NS='http://www.w3.org/2000/svg';
  var svg=$('#route'), ele=$('#ele'), eleFlip=$('.ele-flip',ele), eleBob=$('.ele-bob',ele);
  var stopEls=$$('.stop'), hero=$('.hero');
  var baseP,travP,maskP,pinG, geo=null, oy=0, cur=0, tgt=0, facing=1, lastMv=1, raf=0, visited={};

  function el(n,a){ var e=document.createElementNS(NS,n); for(var k in a) e.setAttribute(k,a[k]); return e; }

  function build(){
    var bodyR=document.body.getBoundingClientRect();
    var ox=bodyR.left+window.scrollX; oy=bodyR.top+window.scrollY;
    var W=Math.round(bodyR.width), H=Math.round(document.body.offsetHeight);
    var desk=W>=1280;
    svg.setAttribute('width',W); svg.setAttribute('height',H); svg.setAttribute('viewBox','0 0 '+W+' '+H);
    svg.style.width=W+'px'; svg.style.height=H+'px';
    while(svg.firstChild) svg.removeChild(svg.firstChild);

    var hr=hero.getBoundingClientRect();
    var sx=hr.left+hr.width/2-ox, sy=hr.bottom+window.scrollY-oy+2;
    var eleH=ele.offsetWidth*255/340;
    var gutter=desk?46:(W<=760?52:84), inset=gutter+ele.offsetWidth/2;
    var secs=stopEls.map(function(s){
      var wr=s.closest('.wrap').getBoundingClientRect(), a=$('.art',s).getBoundingClientRect();
      var top=wr.top+window.scrollY-oy-6, bot=wr.bottom+window.scrollY-oy+eleH+12, pin=a.bottom+window.scrollY-oy-9;
      var leftX=inset, rightX=W-inset;
      return {el:s, x:s.classList.contains('left')?rightX:leftX, top:top, bot:Math.max(bot,pin+40), pin:pin};
    });

    var d='M'+sx+' '+sy, pen={x:sx,y:sy};
    /* S-curve with vertical tangents: used only in the gaps between sections */
    function cross(x,y){ var dy=y-pen.y; d+=' C'+pen.x+' '+(pen.y+dy*.5)+' '+x+' '+(y-dy*.5)+' '+x+' '+y; pen={x:x,y:y}; }
    /* wavy line down a margin, passing exactly through x at the landmark's pin */
    function ride(sec){
      var A=desk?20:5, P=desk?380:300, ramp=130, ys=[], y;
      for(y=sec.top;y<sec.bot;y+=24) ys.push(y);
      ys.push(sec.pin, sec.bot);
      ys.sort(function(p,q){return p-q}).filter(function(v,i,a){return !i||v-a[i-1]>1});
      ys=ys.filter(function(v,i,a){return !i||v-a[i-1]>1});
      var pts=ys.map(function(y){
        var env=Math.max(0,Math.min(1,(y-sec.top)/ramp,(sec.bot-y)/ramp));
        return {x:sec.x+A*env*Math.sin(2*Math.PI*(y-sec.pin)/P), y:y};
      });
      for(var i=0;i<pts.length-1;i++){
        var p0=pts[Math.max(0,i-1)], p1=pts[i], p2=pts[i+1], p3=pts[Math.min(pts.length-1,i+2)];
        d+=' C'+(p1.x+(p2.x-p0.x)/6)+' '+(p1.y+(p2.y-p0.y)/6)+' '+(p2.x-(p3.x-p1.x)/6)+' '+(p2.y-(p3.y-p1.y)/6)+' '+p2.x+' '+p2.y;
      }
      pen=pts[pts.length-1];
    }
    cross(secs[0].x, secs[0].top);
    secs.forEach(function(sec,i){
      ride(sec);
      var n=secs[i+1]; if(!n) return;
      cross(pen.x<W/2?W-inset:inset,(pen.y+n.top)/2);
      cross(n.x, n.top);
    });

    var defs=el('defs',{}), mask=el('mask',{id:'rm',maskUnits:'userSpaceOnUse',x:0,y:0,width:W,height:H});
    maskP=el('path',{d:d,fill:'none',stroke:'#fff','stroke-width':10});
    mask.appendChild(maskP); defs.appendChild(mask); svg.appendChild(defs);
    baseP=el('path',{d:d,class:'base'}); svg.appendChild(baseP);
    travP=el('path',{d:d,class:'trav',mask:'url(#rm)'}); svg.appendChild(travP);
    pinG=el('g',{}); svg.appendChild(pinG);

    var total=baseP.getTotalLength(), N=Math.ceil(total/6), L=new Array(N+1), Y=new Array(N+1);
    for(var k=0;k<=N;k++){ L[k]=total*k/N; Y[k]=baseP.getPointAtLength(L[k]).y; }
    function lenAtY(y){
      if(y<=Y[0]) return 0; if(y>=Y[N]) return total;
      var lo=0, hi=N; while(hi-lo>1){ var m=(lo+hi)>>1; if(Y[m]<=y) lo=m; else hi=m; }
      var t=(y-Y[lo])/((Y[hi]-Y[lo])||1); return L[lo]+t*(L[hi]-L[lo]);
    }
    var pins=secs.map(function(sec,i){
      var c=el('circle',{cx:sec.x,cy:sec.pin,r:9,class:'pin'+(visited[i]?' on':'')}); pinG.appendChild(c);
      if(visited[i]) sec.el.classList.add('visited');
      return {len:lenAtY(sec.pin), el:sec.el, pin:c};
    });

    maskP.style.strokeDasharray=total+' '+total;
    geo={pins:pins,total:total,lenAtY:lenAtY};
    tgt=targetLen(); cur=Math.min(cur,total); if(cur===0) cur=tgt;
    place(); frame();
  }

  function targetLen(){
    if(!geo) return 0;
    return geo.lenAtY(window.scrollY+window.innerHeight*.5-oy);
  }

  function place(){
    if(!geo) return;
    var P=baseP.getPointAtLength(cur), A=baseP.getPointAtLength(Math.max(0,cur-6)), B=baseP.getPointAtLength(Math.min(geo.total,cur+6));
    var tx=B.x-A.x;
    if(Math.abs(tx)>1) facing=(tx*lastMv>0)?1:-1;
    var w=ele.offsetWidth, h=w*255/340;
    ele.style.transform='translate('+(P.x-w/2)+'px,'+(P.y-h+7)+'px)';
    eleFlip.style.transform='scaleX('+facing+')';
    maskP.style.strokeDashoffset=(geo.total-cur);
    geo.pins.forEach(function(p,i){
      if(!visited[i] && cur>=p.len-12){
        visited[i]=true; p.el.classList.add('visited'); p.pin.classList.add('on');
        eleBob.classList.remove('hop'); void eleBob.offsetWidth; eleBob.classList.add('hop');
      }
    });
  }

  function frame(){
    raf=0;
    var diff=tgt-cur;
    if(reduce.matches || Math.abs(diff)<.4){ cur=tgt; }
    else { cur+=diff*.14; }
    place();
    if(Math.abs(tgt-cur)>.4){ ele.classList.add('walking'); raf=requestAnimationFrame(frame); }
    else { ele.classList.remove('walking'); }
  }
  eleBob.addEventListener('animationend',function(){ eleBob.classList.remove('hop'); });

  function onScroll(){
    var n=targetLen(); if(n!==tgt){ lastMv = n>tgt?1:-1; tgt=n; }
    if(!raf) raf=requestAnimationFrame(frame);
  }
  window.addEventListener('scroll',onScroll,{passive:true});

  var rb=0; function rebuild(){ cancelAnimationFrame(rb); rb=requestAnimationFrame(build); }
  window.addEventListener('resize',rebuild);
  window.addEventListener('load',rebuild);
  if(document.fonts && document.fonts.ready) document.fonts.ready.then(rebuild);
  if('ResizeObserver' in window) new ResizeObserver(rebuild).observe(document.body);
  build();
})();
