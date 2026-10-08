import { useEffect, useRef, useState } from "react";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";

// ── 24KT Interiors project imagery ─────────────────────────
import img01 from "@/imports/interior-01.png";
import img02 from "@/imports/interior-02.png";
import img03 from "@/imports/interior-03.png";
import img04 from "@/imports/interior-04.png";
import img05 from "@/imports/interior-05.png";
import img06 from "@/imports/interior-06.png";
import img07 from "@/imports/interior-07.png";
import img08 from "@/imports/interior-08.png";
import img09 from "@/imports/interior-09.png";
import img10 from "@/imports/interior-10.png";
import img11 from "@/imports/interior-11.png";

function useReveal(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setOn(true); io.disconnect(); }
    }, { threshold });
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return { ref, on };
}

type RevealFrom = "bottom" | "left" | "right" | "scale";
function Reveal({ children, className = "", delay = 0, from = "bottom" as RevealFrom }: {
  children: React.ReactNode; className?: string; delay?: number; from?: RevealFrom;
}) {
  const { ref, on } = useReveal();
  const initial = from === "left" ? "translateX(-52px)" : from === "right" ? "translateX(52px)" : from === "scale" ? "scale(.9)" : "translateY(46px)";
  return <div ref={ref} className={className} style={{ opacity: on ? 1 : 0, transform: on ? "none" : initial, transition: `opacity .82s cubic-bezier(.22,1,.36,1) ${delay}s, transform .82s cubic-bezier(.22,1,.36,1) ${delay}s` }}>{children}</div>;
}

function Ball({ s, x, y, d, dur, o }: { s:number; x:number; y:number; d:number; dur:number; o:number }) {
  return <div style={{ position:"absolute", width:s, height:s, left:`${x}%`, top:`${y}%`, borderRadius:"50%", opacity:o, pointerEvents:"none", background:"radial-gradient(circle at 32% 30%, rgba(255,255,255,.96) 0%, rgba(225,211,166,.9) 18%, rgba(183,134,47,.78) 48%, rgba(111,83,34,.86) 78%, rgba(45,42,32,.96) 100%)", boxShadow:`0 ${s*.12}px ${s*.35}px rgba(111,83,34,.45), inset 0 -${s*.08}px ${s*.18}px rgba(0,0,0,.22), inset ${s*.06}px ${s*.06}px ${s*.18}px rgba(255,255,255,.68)`, animation:`ballDrift ${dur}s ease-in-out ${d}s infinite` }} />;
}

const BALLS = [
  {s:88,x:3,y:8,d:0,dur:8,o:.27},{s:42,x:87,y:4,d:1.5,dur:10,o:.31},{s:125,x:78,y:18,d:.4,dur:12,o:.17},{s:56,x:18,y:62,d:2.2,dur:9,o:.25},{s:32,x:52,y:82,d:3,dur:7,o:.33},{s:98,x:93,y:58,d:.8,dur:11,o:.19},{s:60,x:38,y:28,d:4.1,dur:9.5,o:.21},{s:22,x:67,y:52,d:.6,dur:8,o:.37},{s:74,x:9,y:84,d:2.8,dur:10,o:.23},{s:46,x:81,y:90,d:1.3,dur:8.5,o:.29},{s:28,x:55,y:14,d:3.6,dur:7,o:.35},{s:108,x:2,y:44,d:.2,dur:13,o:.13},
];

function Badge({ label }: { label:string }) {
  return <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-5 text-[10px] font-semibold tracking-[.22em] uppercase" style={{background:"linear-gradient(rgba(255,253,248,.85),rgba(255,253,248,.85)) padding-box, linear-gradient(135deg,#d8c08a,#b7862f,#d8c08a) border-box",border:"1px solid transparent",color:"#6f5322"}}><span style={{width:5,height:5,borderRadius:"50%",background:"#b7862f"}} />{label}<span style={{width:5,height:5,borderRadius:"50%",background:"#b7862f"}} /></div>;
}

function GCard({ children, className = "", gold = false, style: extraStyle = {} }: { children:React.ReactNode; className?:string; gold?:boolean; style?:React.CSSProperties }) {
  const border = gold ? "linear-gradient(135deg,#e8d08a,#c9a058,#f0dfa0,#c9a058)" : "linear-gradient(135deg,#d8c08a,rgba(183,134,47,.4),#d8c08a,rgba(183,134,47,.2))";
  return <div className={className} style={{background:`linear-gradient(rgba(255,255,255,.7),rgba(255,255,255,.7)) padding-box, ${border} border-box`,border:"1px solid transparent",backdropFilter:"blur(18px)",boxShadow:"0 8px 40px rgba(111,83,34,.09), 0 2px 8px rgba(111,83,34,.05)",...extraStyle}}>{children}</div>;
}

const GALLERY_PHOTOS = [img01,img02,img03,img04,img05,img06,img07,img08,img09,img10,img11];
const GALLERY_ALTS = [
  "Luxury bedroom interior design by 24KT Interiors Jaipur","Contemporary living room interior design","Luxury neutral bedroom design","Premium double-height living room","Elegant hotel-style lounge interior","Warm contemporary lounge interior","Modern bright living room","Luxury master bedroom interior","Contemporary grey and gold living room","Refined modern living space","Minimal luxury living room design"
];

const NAV = ["Home","Services","Projects","About","Process","Contact","FAQ"];

const SERVICES = [
  {icon:"⌂",title:"Residential Interiors",desc:"Complete home interiors for apartments, villas and independent homes — planned around your lifestyle, light and proportions."},
  {icon:"◈",title:"Luxury Living Spaces",desc:"Layered materials, statement lighting, custom furniture and refined palettes for sophisticated living rooms."},
  {icon:"▱",title:"Bedroom & Suite Design",desc:"Calm, premium bedrooms with bespoke wardrobes, feature walls, lighting and hotel-inspired comfort."},
  {icon:"▦",title:"Commercial Interiors",desc:"Elegant offices, studios, hospitality and retail spaces designed for brand identity, flow and functionality."},
  {icon:"✦",title:"Turnkey Interiors",desc:"A coordinated journey from concept and drawings through finishes, furniture, lighting and final styling."},
  {icon:"⌁",title:"Renovation & Styling",desc:"Smart transformations of existing spaces with upgraded layouts, finishes, lighting and curated decor."},
];

const PROCESS = [
  ["01","Discover","We understand your space, lifestyle, budget, preferences and functional requirements."],
  ["02","Concept","Moodboards, spatial direction, material language and a clear visual design story are developed."],
  ["03","Design","Detailed layouts, furniture planning, lighting ideas, finishes and 3D visual direction bring the concept to life."],
  ["04","Execute","We coordinate the design journey with practical detailing and a finish-focused approach."],
  ["05","Style","The final layer — furniture, decor, lighting balance and finishing touches that make the space feel complete."],
];

const FAQS = [
  ["Do you work on complete home interiors?","Yes. We can plan individual rooms or a complete residential interior journey, depending on the project scope."],
  ["Can you design only one room?","Absolutely. Living rooms, bedrooms, kitchens, offices and other individual spaces can be designed independently."],
  ["Do you provide 3D design concepts?","Yes. The design approach includes visual direction and 3D-oriented presentation so the intended look is easier to understand before execution."],
  ["Do you handle commercial projects?","Yes. We work across residential and selected commercial spaces with a focus on premium, functional design."],
  ["Can you help with materials and furniture?","Yes. Material palettes, finishes, lighting, furniture direction and styling can be coordinated as part of the project."],
  ["How do I start a project?","Share your location, approximate space, requirements and preferred timeline. We can then discuss the right design scope for your project."],
];

function Stars() { return <div className="flex gap-1 text-[#b7862f]">{Array.from({length:5}).map((_,i)=><span key={i}>★</span>)}</div>; }

export default function App() {
  const [scrolled,setScrolled]=useState(false);
  const [menuOpen,setMenuOpen]=useState(false);
  const [lightbox,setLightbox]=useState<number|null>(null);
  const [faq,setFaq]=useState<number|null>(null);
  const [sent,setSent]=useState(false);
  const [form,setForm]=useState({name:"",phone:"",space:"",budget:"",msg:""});

  useEffect(()=>{ const fn=()=>setScrolled(window.scrollY>30); window.addEventListener("scroll",fn); return()=>window.removeEventListener("scroll",fn); },[]);
  useEffect(()=>{ if(lightbox===null)return; const h=(e:KeyboardEvent)=>{if(e.key==="Escape")setLightbox(null);if(e.key==="ArrowLeft")setLightbox(p=>p===null?null:Math.max(0,p-1));if(e.key==="ArrowRight")setLightbox(p=>p===null?null:Math.min(GALLERY_PHOTOS.length-1,p+1));};document.addEventListener("keydown",h);return()=>document.removeEventListener("keydown",h);},[lightbox]);

  const submitForm=(e:React.FormEvent)=>{e.preventDefault();setSent(true);setTimeout(()=>setSent(false),4500);setForm({name:"",phone:"",space:"",budget:"",msg:""});};
  const WaIcon=()=> <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.025.507 3.934 1.397 5.61L0 24l6.545-1.376A11.942 11.942 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.045-1.393l-.361-.215-3.883.816.818-3.774-.235-.376A9.818 9.818 0 012.182 12C2.182 6.58 6.58 2.182 12 2.182S21.818 6.58 21.818 12 17.42 21.818 12 21.818z"/></svg>;

  return <div className="relative min-h-screen overflow-x-hidden" style={{fontFamily:"'Jost',sans-serif",background:"#fbf8f1"}}>
    <style>{`
      @keyframes ballDrift{0%{transform:translateY(0) rotateX(0) rotateY(0)}30%{transform:translateY(-22px) rotateX(18deg) rotateY(22deg)}65%{transform:translateY(-10px) rotateX(-12deg) rotateY(-16deg)}100%{transform:translateY(0) rotateX(0) rotateY(0)}}
      @keyframes blob1{0%,100%{transform:translate(0,0) scale(1)}40%{transform:translate(40px,-28px) scale(1.08)}70%{transform:translate(-18px,22px) scale(.94)}}
      @keyframes blob2{0%,100%{transform:translate(0,0) scale(1)}35%{transform:translate(-32px,18px) scale(1.06)}70%{transform:translate(22px,-14px) scale(.96)}}
      @keyframes blob3{0%,100%{transform:translate(0,0) scale(1)}45%{transform:translate(18px,30px) scale(1.1)}80%{transform:translate(-14px,-18px) scale(.93)}}
      @keyframes fadeUp{from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:none}}
      @keyframes marqueeRun{from{transform:translateX(0)}to{transform:translateX(-50%)}}
      @keyframes shimBtn{0%{background-position:-200% center}100%{background-position:200% center}}
      @keyframes spinSlow{from{transform:rotate(0)}to{transform:rotate(360deg)}}
      @keyframes heroPulse{0%,100%{box-shadow:0 0 60px rgba(183,134,47,.25),0 0 120px rgba(216,192,138,.12)}50%{box-shadow:0 0 90px rgba(183,134,47,.42),0 0 160px rgba(216,192,138,.2)}}
      .h1{animation:fadeUp .85s cubic-bezier(.22,1,.36,1) .1s both}.h2{animation:fadeUp .85s cubic-bezier(.22,1,.36,1) .3s both}.h3{animation:fadeUp .85s cubic-bezier(.22,1,.36,1) .48s both}.h4{animation:fadeUp .85s cubic-bezier(.22,1,.36,1) .62s both}.hImg{animation:fadeUp .85s cubic-bezier(.22,1,.36,1) .2s both}
      .btn-shim{background:linear-gradient(90deg,#6b5224,#9b742f,#c7a55a,#d8c08a,#c7a55a,#9b742f,#6b5224);background-size:200% auto;animation:shimBtn 4s linear infinite}
      .gal-item{transition:transform .4s cubic-bezier(.22,1,.36,1),box-shadow .4s ease;cursor:pointer}.gal-item:hover{transform:scale(1.035) translateY(-6px);box-shadow:0 22px 55px rgba(111,83,34,.18)}
      .svc-card{transition:transform .4s ease,box-shadow .4s ease}.svc-card:hover{transform:perspective(700px) rotateY(-5deg) rotateX(3deg) translateY(-8px);box-shadow:0 22px 50px rgba(111,83,34,.15)}
      .marquee-track{animation:marqueeRun 36s linear infinite}.marquee-track:hover{animation-play-state:paused}
      .process-card{transition:transform .4s ease}.process-card:hover{transform:perspective(700px) rotateX(3deg) translateY(-5px)}
      ::-webkit-scrollbar{width:5px}::-webkit-scrollbar-thumb{background:#d8c08a;border-radius:4px}::-webkit-scrollbar-track{background:#fbf8f1}
      @media(max-width:640px){.brand-title{font-size:1.12rem!important;letter-spacing:-.02em}.brand-sub{font-size:.42rem!important;letter-spacing:.12em!important}.hero-title{font-size:3.15rem!important;line-height:.98!important}.hero-card{height:390px!important}.hero-img{height:330px!important}.section-pad{padding-top:78px!important;padding-bottom:78px!important}}
    `}</style>

    <div className="fixed inset-0 overflow-hidden pointer-events-none" style={{zIndex:0}}>
      <div style={{position:"absolute",width:520,height:520,top:"-80px",right:"-60px",borderRadius:"50%",background:"radial-gradient(circle,rgba(216,192,138,.22) 0%,transparent 72%)",filter:"blur(55px)",animation:"blob1 14s ease-in-out infinite"}}/>
      <div style={{position:"absolute",width:600,height:600,bottom:"-100px",left:"-80px",borderRadius:"50%",background:"radial-gradient(circle,rgba(183,134,47,.14) 0%,transparent 70%)",filter:"blur(60px)",animation:"blob2 18s ease-in-out infinite"}}/>
      <div style={{position:"absolute",width:400,height:400,top:"45%",left:"42%",transform:"translate(-50%,-50%)",borderRadius:"50%",background:"radial-gradient(circle,rgba(239,231,214,.3) 0%,transparent 75%)",filter:"blur(48px)",animation:"blob3 12s ease-in-out infinite"}}/>
      {BALLS.map((b,i)=><Ball key={i}{...b}/>)}</div>

    {/* NAVBAR */}
    <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-500" style={{background:scrolled?"rgba(255,253,248,.9)":"rgba(255,253,248,.45)",backdropFilter:"blur(24px)",borderBottom:scrolled?"1px solid rgba(183,134,47,.1)":"none",boxShadow:scrolled?"0 4px 30px rgba(111,83,34,.07)":"none"}}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-[68px] sm:h-[76px]">
        <a href="#home" className="flex flex-col leading-none min-w-0"><span className="brand-title" style={{fontFamily:"'Great Vibes',cursive",fontSize:"1.72rem",color:"#6f5322",lineHeight:1}}>24KT Interiors</span><span className="brand-sub" style={{fontSize:".56rem",letterSpacing:".2em",color:"#6d675d",fontWeight:600,textTransform:"uppercase",lineHeight:1.9}}>Interior Designer · Jaipur</span></a>
        <div className="hidden lg:flex items-center gap-5 xl:gap-6">{NAV.map(l=><a key={l} href={`#${l.toLowerCase()}`} className="text-[12.5px] font-medium transition-colors hover:text-[#6f7c5d] relative group" style={{color:"#403c35",letterSpacing:".04em"}}>{l}<span className="absolute -bottom-0.5 left-0 w-0 h-px group-hover:w-full transition-all duration-300" style={{background:"#b7862f"}}/></a>)}<a href="tel:+919521786675" className="btn-shim ml-1 px-5 py-2.5 rounded-full text-white text-[12.5px] font-semibold hover:scale-105 transition-all" style={{boxShadow:"0 4px 18px rgba(183,134,47,.38)"}}>📞 Call Now</a></div>
        <button onClick={()=>setMenuOpen(m=>!m)} className="lg:hidden w-10 h-10 flex flex-col justify-center items-end gap-[5px]" aria-label="Menu">{[0,1,2].map(i=><span key={i} className="block w-6 h-0.5 rounded transition-all duration-300" style={{background:"#6f5322",transform:i===0&&menuOpen?"rotate(45deg) translate(5px,5px)":i===2&&menuOpen?"rotate(-45deg) translate(5px,-5px)":i===1&&menuOpen?"scaleX(0)":"none"}}/>)}</button>
      </div>
      {menuOpen&&<div className="lg:hidden px-4 pb-4"><div className="rounded-2xl p-3 flex flex-col gap-1" style={{background:"rgba(255,253,248,.97)",backdropFilter:"blur(20px)",border:"1px solid rgba(183,134,47,.16)",boxShadow:"0 12px 35px rgba(111,83,34,.1)"}}>{NAV.map(l=><a key={l} onClick={()=>setMenuOpen(false)} href={`#${l.toLowerCase()}`} className="px-4 py-3 rounded-xl text-sm font-medium" style={{color:"#403c35"}}>{l}</a>)}<a href="tel:+919521786675" className="btn-shim px-4 py-3 rounded-xl text-white text-sm font-semibold text-center">📞 09521786675</a></div></div>}
    </nav>

    {/* HERO */}
    <section id="home" className="relative min-h-screen flex items-center pt-24 pb-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 w-full grid lg:grid-cols-[1.02fr_.98fr] gap-10 lg:gap-16 items-center">
        <div className="relative z-10"><div className="h1 inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-semibold tracking-[.22em] uppercase mb-6" style={{background:"rgba(255,253,248,.7)",border:"1px solid rgba(183,134,47,.25)",color:"#6f5322"}}>✦ Luxury Interior Design · Jaipur ✦</div>
          <h1 className="hero-title h2 font-light tracking-[-.045em]" style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(4rem,7.3vw,7rem)",lineHeight:.92,color:"#292720"}}>Spaces that<br/><em style={{color:"#b7862f"}}>feel timeless.</em></h1>
          <p className="h3 max-w-xl mt-7 text-[15px] sm:text-[17px] leading-8" style={{color:"#6d675d"}}>24KT Interiors Designer Jaipur creates refined residential and commercial interiors where architecture, furniture, lighting and material come together as one elegant experience.</p>
          <div className="h4 mt-8 flex flex-wrap gap-3"><a href="#projects" className="btn-shim px-6 py-3.5 rounded-full text-white text-sm font-semibold shadow-lg">Explore Projects ↗</a><a href="#contact" className="px-6 py-3.5 rounded-full text-sm font-semibold" style={{color:"#6f5322",border:"1px solid rgba(183,134,47,.35)",background:"rgba(255,253,248,.55)"}}>Start a Design</a></div>
          <div className="h4 flex gap-8 mt-10"><div><div className="text-2xl font-semibold" style={{color:"#6f5322"}}>01</div><div className="text-[10px] tracking-[.18em] uppercase mt-1" style={{color:"#8c8578"}}>Design language</div></div><div><div className="text-2xl font-semibold" style={{color:"#6f5322"}}>360°</div><div className="text-[10px] tracking-[.18em] uppercase mt-1" style={{color:"#8c8578"}}>Interior vision</div></div><div><div className="text-2xl font-semibold" style={{color:"#6f5322"}}>Jaipur</div><div className="text-[10px] tracking-[.18em] uppercase mt-1" style={{color:"#8c8578"}}>Base studio</div></div></div>
        </div>
        <div className="hImg relative flex justify-center lg:justify-end"><div className="hero-card relative w-full max-w-[570px] h-[650px] sm:h-[690px] rounded-[42px] overflow-hidden" style={{boxShadow:"0 30px 100px rgba(111,83,34,.18)",border:"1px solid rgba(183,134,47,.25)",animation:"heroPulse 5s ease-in-out infinite"}}><ImageWithFallback src={img01} alt="24KT Interiors luxury bedroom" className="hero-img w-full h-full object-cover"/><div className="absolute inset-0" style={{background:"linear-gradient(180deg,rgba(20,18,14,.02) 35%,rgba(20,18,14,.55) 100%)"}}/><div className="absolute top-6 right-6 w-20 h-20 rounded-full border border-white/50 flex items-center justify-center" style={{animation:"spinSlow 20s linear infinite"}}><span className="text-[9px] tracking-[.2em] uppercase text-white">24KT</span></div><div className="absolute bottom-7 left-7 right-7"><div className="text-white text-[10px] tracking-[.24em] uppercase mb-2">Featured Direction</div><div className="text-white text-2xl sm:text-3xl" style={{fontFamily:"'Playfair Display',serif"}}>Quiet Luxury Bedroom</div></div></div></div>
      </div>
    </section>

    <div className="py-5 overflow-hidden" style={{borderTop:"1px solid rgba(183,134,47,.12)",borderBottom:"1px solid rgba(183,134,47,.12)",background:"rgba(255,253,248,.55)"}}><div className="marquee-track flex w-max gap-12 whitespace-nowrap">{["RESIDENTIAL INTERIORS","LUXURY LIVING","BEDROOMS & SUITES","COMMERCIAL SPACES","TURNKEY DESIGN","LIGHTING & MATERIALS","RESIDENTIAL INTERIORS","LUXURY LIVING","BEDROOMS & SUITES","COMMERCIAL SPACES"].map((x,i)=><span key={i} className="text-[10px] tracking-[.28em] font-semibold" style={{color:i%2?"#b7862f":"#7c7468"}}>✦ {x}</span>)}</div></div>

    {/* SERVICES */}
    <section id="services" className="section-pad py-28 relative"><div className="max-w-7xl mx-auto px-5 sm:px-8"><Reveal><div className="text-center"><Badge label="Design Services"/><h2 className="text-4xl sm:text-6xl font-light tracking-[-.04em]" style={{fontFamily:"'Playfair Display',serif",color:"#292720"}}>Designed for <em style={{color:"#b7862f"}}>the way you live.</em></h2><p className="max-w-2xl mx-auto mt-5 leading-7" style={{color:"#756f65"}}>From one statement room to a complete turnkey home, every project balances visual calm with practical everyday living.</p></div></Reveal>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mt-14">{SERVICES.map((s,i)=><Reveal key={s.title} delay={i*.06}><GCard className="svc-card rounded-[26px] p-7 h-full" gold={i===0}><div className="w-12 h-12 rounded-2xl flex items-center justify-center text-xl" style={{background:"rgba(183,134,47,.09)",color:"#9b742f",border:"1px solid rgba(183,134,47,.18)"}}>{s.icon}</div><div className="mt-7 text-[10px] tracking-[.22em] uppercase font-semibold" style={{color:"#b7862f"}}>0{i+1} · 24KT</div><h3 className="mt-2 text-xl" style={{fontFamily:"'Playfair Display',serif",color:"#332f27"}}>{s.title}</h3><p className="mt-3 text-sm leading-7" style={{color:"#756f65"}}>{s.desc}</p></GCard></Reveal>)}</div>
    </div></section>

    {/* PROJECTS */}
    <section id="projects" className="section-pad py-28 relative"><div className="max-w-7xl mx-auto px-5 sm:px-8"><Reveal><div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5"><div><Badge label="Selected Interiors"/><h2 className="text-4xl sm:text-6xl font-light tracking-[-.04em]" style={{fontFamily:"'Playfair Display',serif",color:"#292720"}}>Spaces with <em style={{color:"#b7862f"}}>presence.</em></h2></div><p className="max-w-md text-sm leading-7" style={{color:"#756f65"}}>A visual collection of warm neutrals, sculptural furniture, layered lighting and contemporary luxury — use the gallery to explore the design language.</p></div></Reveal>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-12">{GALLERY_PHOTOS.map((src,i)=><Reveal key={i} delay={Math.min(i*.035,.25)}><button onClick={()=>setLightbox(i)} className={`gal-item block w-full overflow-hidden rounded-[22px] text-left ${i===0||i===5?'lg:col-span-2':''}`} style={{height:i===0||i===5?390:285,background:"#eee6d7",border:"1px solid rgba(183,134,47,.12)"}}><ImageWithFallback src={src} alt={GALLERY_ALTS[i]} className="w-full h-full object-cover"/><div className="absolute"/></button></Reveal>)}</div>
    </div></section>

    {/* ABOUT */}
    <section id="about" className="py-28 relative" style={{background:"linear-gradient(135deg,#f3ecdf,#fbf8f1 55%,#eee5d3)"}}><div className="max-w-7xl mx-auto px-5 sm:px-8 grid lg:grid-cols-2 gap-14 items-center"><Reveal from="left"><div className="relative"><div className="rounded-[34px] overflow-hidden h-[560px]" style={{boxShadow:"0 28px 80px rgba(111,83,34,.16)"}}><ImageWithFallback src={img04} alt="24KT Interiors double-height living room" className="w-full h-full object-cover"/></div><div className="absolute -bottom-7 -right-3 sm:-right-8 rounded-3xl p-6 w-52" style={{background:"rgba(255,253,248,.92)",backdropFilter:"blur(20px)",border:"1px solid rgba(183,134,47,.2)",boxShadow:"0 18px 45px rgba(111,83,34,.12)"}}><div className="text-3xl" style={{fontFamily:"'Playfair Display',serif",color:"#b7862f"}}>24KT</div><div className="text-[10px] uppercase tracking-[.2em] mt-1" style={{color:"#756f65"}}>Interiors Designer</div></div></div></Reveal><Reveal from="right"><div><Badge label="Our Design Philosophy"/><h2 className="text-4xl sm:text-6xl font-light tracking-[-.04em]" style={{fontFamily:"'Playfair Display',serif",color:"#292720"}}>Luxury is in the <em style={{color:"#b7862f"}}>details.</em></h2><p className="mt-7 leading-8" style={{color:"#6f6a61"}}>24KT Interiors Designer Jaipur is built around a simple idea: a beautiful space should also feel effortless to use. We combine proportion, texture, warm neutrals, statement lighting and custom detailing to create interiors that remain elegant beyond a trend cycle.</p><div className="grid sm:grid-cols-2 gap-4 mt-8">{[["01","Timeless palette"],["02","Spatial clarity"],["03","Custom detailing"],["04","Layered lighting"]].map(([n,t])=><GCard key={n} className="rounded-2xl p-4 flex items-center gap-4"><span className="text-xs" style={{color:"#b7862f"}}>{n}</span><span className="text-sm font-medium" style={{color:"#403c35"}}>{t}</span></GCard>)}</div></div></Reveal></div></section>

    {/* PROCESS */}
    <section id="process" className="section-pad py-28"><div className="max-w-7xl mx-auto px-5 sm:px-8"><Reveal><div className="text-center"><Badge label="Our Process"/><h2 className="text-4xl sm:text-6xl font-light tracking-[-.04em]" style={{fontFamily:"'Playfair Display',serif",color:"#292720"}}>From first idea to <em style={{color:"#b7862f"}}>final detail.</em></h2></div></Reveal><div className="grid md:grid-cols-5 gap-4 mt-14">{PROCESS.map(([n,t,d],i)=><Reveal key={n} delay={i*.07}><GCard className="process-card rounded-[24px] p-6 h-full"><div className="text-3xl font-light" style={{fontFamily:"'Playfair Display',serif",color:"#b7862f"}}>{n}</div><h3 className="mt-6 text-lg" style={{color:"#332f27"}}>{t}</h3><p className="mt-3 text-sm leading-6" style={{color:"#756f65"}}>{d}</p></GCard></Reveal>)}</div></div></section>

    {/* DESIGN SHOWCASE */}
    <section className="py-24 relative overflow-hidden" style={{background:"#26231e"}}><div className="absolute -top-24 -right-24 w-80 h-80 rounded-full" style={{background:"radial-gradient(circle,rgba(216,192,138,.22),transparent 70%)",filter:"blur(10px)"}}/><div className="max-w-7xl mx-auto px-5 sm:px-8 relative z-10 grid lg:grid-cols-[.8fr_1.2fr] gap-12 items-center"><Reveal from="left"><div><Badge label="Material · Light · Form"/><h2 className="text-4xl sm:text-6xl font-light" style={{fontFamily:"'Playfair Display',serif",color:"#fffdf8"}}>A modern luxury language with a <em style={{color:"#d8c08a"}}>warm soul.</em></h2><p className="mt-6 leading-8 text-sm" style={{color:"rgba(255,253,248,.62)"}}>Natural textures, soft contrast, sculptural silhouettes and carefully controlled lighting create interiors that feel premium without becoming cold.</p><a href="#contact" className="inline-flex mt-8 px-6 py-3.5 rounded-full text-sm font-semibold" style={{background:"#d8c08a",color:"#292720"}}>Discuss your space ↗</a></div></Reveal><Reveal from="right"><div className="grid grid-cols-2 gap-4"><div className="rounded-[28px] overflow-hidden h-72 sm:h-96"><ImageWithFallback src={img08} alt="Luxury bedroom detail" className="w-full h-full object-cover"/></div><div className="rounded-[28px] overflow-hidden h-72 sm:h-96 mt-12"><ImageWithFallback src={img09} alt="Modern luxury living room" className="w-full h-full object-cover"/></div></div></Reveal></div></section>

    {/* FAQ */}
    <section id="faq" className="py-28"><div className="max-w-4xl mx-auto px-5 sm:px-8"><Reveal><div className="text-center"><Badge label="FAQ"/><h2 className="text-4xl sm:text-6xl font-light" style={{fontFamily:"'Playfair Display',serif",color:"#292720"}}>Before we <em style={{color:"#b7862f"}}>begin.</em></h2></div></Reveal><div className="mt-12 space-y-3">{FAQS.map(([q,a],i)=><Reveal key={q} delay={i*.04}><div className="rounded-2xl overflow-hidden" style={{border:"1px solid rgba(183,134,47,.16)",background:"rgba(255,253,248,.65)"}}><button className="w-full px-5 sm:px-7 py-5 text-left flex justify-between items-center gap-5" onClick={()=>setFaq(faq===i?null:i)}><span className="font-medium" style={{color:"#403c35"}}>{q}</span><span className="text-xl" style={{color:"#b7862f"}}>{faq===i?"−":"+"}</span></button>{faq===i&&<div className="px-5 sm:px-7 pb-5 text-sm leading-7" style={{color:"#756f65"}}>{a}</div>}</div></Reveal>)}</div></div></section>

    {/* CONTACT */}
    <section id="contact" className="py-28" style={{background:"linear-gradient(135deg,#efe6d6,#fbf8f1)"}}><div className="max-w-7xl mx-auto px-5 sm:px-8"><Reveal><div className="text-center"><Badge label="Start a Project"/><h2 className="text-4xl sm:text-6xl font-light" style={{fontFamily:"'Playfair Display',serif",color:"#292720"}}>Tell us about your <em style={{color:"#b7862f"}}>space.</em></h2><p className="max-w-xl mx-auto mt-5 text-sm leading-7" style={{color:"#756f65"}}>Share the basics and 24KT Interiors can help shape the right design direction for your Jaipur project.</p></div></Reveal><div className="grid lg:grid-cols-[.78fr_1.22fr] gap-8 mt-14"><Reveal from="left"><GCard className="rounded-[30px] p-7 sm:p-9 h-full" gold><div className="text-[10px] tracking-[.24em] uppercase font-semibold" style={{color:"#b7862f"}}>24KT Interiors Designer Jaipur</div><h3 className="mt-4 text-3xl" style={{fontFamily:"'Playfair Display',serif",color:"#332f27"}}>Let's create something exceptional.</h3><div className="mt-8 space-y-4">{[["📞","Call / WhatsApp","09521786675","tel:+919521786675"],["📍","Studio Address","4th Floor, Nursery Cir, Nemi Nagar Extension, Block A, Vaishali Nagar, Jaipur, Jaipur Nagar Nigam Area, Rajasthan 302021",""] , ["◎","Instagram","instagram.com","https://instagram.com"]].map(([i,t,b,h])=><div key={t} className="flex gap-4"><div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{background:"rgba(183,134,47,.1)",color:"#b7862f"}}>{i}</div><div><div className="text-[10px] tracking-[.18em] uppercase" style={{color:"#9b742f"}}>{t}</div>{h?<a href={h} target={h.startsWith("http")?"_blank":undefined} rel="noopener noreferrer" className="mt-1 block text-sm leading-6" style={{color:"#403c35"}}>{b}</a>:<div className="mt-1 text-sm leading-6" style={{color:"#403c35"}}>{b}</div>}</div></div>)}</div><div className="mt-9 pt-7" style={{borderTop:"1px solid rgba(183,134,47,.16)"}}><div className="text-[10px] uppercase tracking-[.2em]" style={{color:"#9b742f"}}>Design Scope</div><p className="mt-2 text-sm leading-7" style={{color:"#756f65"}}>Homes · Villas · Bedrooms · Living Rooms · Offices · Hospitality · Turnkey Interiors</p></div></GCard></Reveal>
        <Reveal from="right"><GCard className="rounded-[30px] p-7 sm:p-9" gold><form onSubmit={submitForm} className="space-y-5"><div className="grid sm:grid-cols-2 gap-5"><label className="block"><span className="text-[10px] tracking-[.18em] uppercase" style={{color:"#8b806e"}}>Your Name</span><input required value={form.name} onChange={e=>setForm({...form,name:e.target.value})} className="mt-2 w-full bg-transparent border-b py-3 outline-none" style={{borderColor:"rgba(183,134,47,.25)",color:"#403c35"}} placeholder="Name"/></label><label className="block"><span className="text-[10px] tracking-[.18em] uppercase" style={{color:"#8b806e"}}>Phone</span><input required value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} className="mt-2 w-full bg-transparent border-b py-3 outline-none" style={{borderColor:"rgba(183,134,47,.25)",color:"#403c35"}} placeholder="Phone number"/></label></div><div className="grid sm:grid-cols-2 gap-5"><label className="block"><span className="text-[10px] tracking-[.18em] uppercase" style={{color:"#8b806e"}}>Space Type</span><select value={form.space} onChange={e=>setForm({...form,space:e.target.value})} className="mt-2 w-full bg-transparent border-b py-3 outline-none" style={{borderColor:"rgba(183,134,47,.25)",color:"#403c35"}}><option value="">Select</option><option>Full Home</option><option>Living Room</option><option>Bedroom</option><option>Office</option><option>Commercial / Hospitality</option><option>Renovation</option></select></label><label className="block"><span className="text-[10px] tracking-[.18em] uppercase" style={{color:"#8b806e"}}>Approx. Budget</span><select value={form.budget} onChange={e=>setForm({...form,budget:e.target.value})} className="mt-2 w-full bg-transparent border-b py-3 outline-none" style={{borderColor:"rgba(183,134,47,.25)",color:"#403c35"}}><option value="">Select</option><option>Under ₹5 Lakh</option><option>₹5–10 Lakh</option><option>₹10–20 Lakh</option><option>₹20–40 Lakh</option><option>₹40 Lakh+</option></select></label></div><label className="block"><span className="text-[10px] tracking-[.18em] uppercase" style={{color:"#8b806e"}}>Project Brief</span><textarea value={form.msg} onChange={e=>setForm({...form,msg:e.target.value})} rows={4} className="mt-2 w-full bg-transparent border-b py-3 outline-none resize-none" style={{borderColor:"rgba(183,134,47,.25)",color:"#403c35"}} placeholder="Tell us about your space, location and what you want to create..."/></label><button type="submit" className="btn-shim w-full py-4 rounded-full text-white font-semibold">{sent?"✓ Enquiry captured — we'll be in touch":"Send Project Enquiry ↗"}</button></form></GCard></Reveal></div>
    </div></section>

    <section className="py-3" style={{background:"#fbf8f1"}}><div className="max-w-7xl mx-auto px-5 sm:px-8"><div className="rounded-[30px] overflow-hidden h-[330px] sm:h-[390px]" style={{border:"1px solid rgba(183,134,47,.15)",boxShadow:"0 20px 60px rgba(111,83,34,.1)"}}><iframe src="https://www.google.com/maps?q=4th%20Floor%2C%20Nursery%20Cir%2C%20Nemi%20Nagar%20Extension%2C%20Block%20A%2C%20Vaishali%20Nagar%2C%20Jaipur%2C%20Rajasthan%20302021&output=embed" className="w-full h-full border-0" loading="lazy" title="24KT Interiors Designer Jaipur location"/></div></div></section>

    <footer className="pt-20 pb-8" style={{background:"#24211d",color:"#fffdf8"}}><div className="max-w-7xl mx-auto px-5 sm:px-8 grid md:grid-cols-[1.3fr_.7fr_.7fr] gap-12"><div><div style={{fontFamily:"'Great Vibes',cursive",fontSize:"2.3rem",color:"#d8c08a"}}>24KT Interiors</div><p className="mt-4 max-w-md text-sm leading-7" style={{color:"rgba(216,192,138,.5)"}}>Luxury residential and commercial interior design in Jaipur — modern, warm and detail-driven.</p><div className="flex gap-3 mt-6"><a href="tel:+919521786675" className="px-4 py-2 rounded-full text-xs" style={{border:"1px solid rgba(216,192,138,.2)",color:"#d8c08a"}}>09521786675</a><a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="px-4 py-2 rounded-full text-xs" style={{border:"1px solid rgba(216,192,138,.2)",color:"#d8c08a"}}>Instagram</a></div></div><div><h4 className="text-[11px] font-bold uppercase tracking-widest mb-5" style={{color:"rgba(216,192,138,.65)"}}>Explore</h4><ul className="space-y-3">{NAV.map(l=><li key={l}><a href={`#${l.toLowerCase()}`} className="text-[13px]" style={{color:"rgba(216,192,138,.4)"}}>{l}</a></li>)}</ul></div><div><h4 className="text-[11px] font-bold uppercase tracking-widest mb-5" style={{color:"rgba(216,192,138,.65)"}}>Studio</h4><p className="text-[12px] leading-6" style={{color:"rgba(216,192,138,.4)"}}>4th Floor, Nursery Cir,<br/>Nemi Nagar Extension,<br/>Block A, Vaishali Nagar,<br/>Jaipur, Rajasthan 302021</p></div></div><div className="max-w-7xl mx-auto px-5 sm:px-8 mt-12 pt-6" style={{borderTop:"1px solid rgba(216,192,138,.1)"}}><p className="text-[11px]" style={{color:"rgba(216,192,138,.3)"}}>© 2026 24KT Interiors Designer Jaipur · All rights reserved.</p></div></footer>

    <a href="https://wa.me/919521786675?text=Hi%2024KT%20Interiors!%20I%20want%20to%20discuss%20an%20interior%20design%20project." target="_blank" rel="noopener noreferrer" className="fixed bottom-5 right-5 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform" style={{background:"#6f5322"}} aria-label="WhatsApp"><WaIcon/></a>

    {lightbox!==null&&<div className="fixed inset-0 z-[100] flex items-center justify-center p-4" style={{background:"rgba(24,21,17,.94)"}} onClick={()=>setLightbox(null)}><button className="absolute top-5 right-6 text-white text-3xl" onClick={()=>setLightbox(null)}>×</button><button className="absolute left-4 sm:left-8 text-white text-4xl" onClick={e=>{e.stopPropagation();setLightbox(p=>p===null?null:Math.max(0,p-1))}}>‹</button><div className="max-w-5xl w-full max-h-[88vh]" onClick={e=>e.stopPropagation()}><ImageWithFallback src={GALLERY_PHOTOS[lightbox]} alt={GALLERY_ALTS[lightbox]} className="w-full max-h-[80vh] object-contain rounded-2xl"/><div className="text-center text-white/60 text-xs mt-3">24KT Interiors · {lightbox+1} / {GALLERY_PHOTOS.length}</div></div><button className="absolute right-4 sm:right-8 text-white text-4xl" onClick={e=>{e.stopPropagation();setLightbox(p=>p===null?null:Math.min(GALLERY_PHOTOS.length-1,p+1))}}>›</button></div>}
  </div>;
}
