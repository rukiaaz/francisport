import { useState, useEffect, useRef, useCallback } from 'react'

/* ── DATA ── */
const PROJECTS = [
  { name:"Devkit - CSS Companion Website", url:"https://devkit-pi.vercel.app/", date:"2024", role:"Full Stack Dev", tag:"Next.js - HTML - CSS - JS", thumb:"assets/devkit.png" },
  { name:"CodeSnap - Formatter", url:"https://codesnap-one.vercel.app/", date:"2024", role:"Frontend Dev", tag:"HTML - CSS - JS", thumb:"assets/codesnap.png" },
  { name:"TypeScale - Calculator", url:"https://typescale-six.vercel.app/", date:"2024", role:"Full Stack Dev", tag:"HTML - CSS - JS", thumb:"assets/typescale.png" },
  { name:"Flexlab - CSS Playground", url:"https://flexlab-nine.vercel.app/", date:"2023", role:"Full Stack Dev", tag:"HTML - CSS - JS", thumb:"assets/flexlab.png" },
  { name:"UnitShift - Converter", url:"https://unitshift.vercel.app/", date:"2023", role:"Frontend Dev", tag:"HTML - CSS - JS", thumb:"assets/unitshift.png" },
  { name:"CharCheck - Character Analyzer", url:"https://charcheck.vercel.app/", date:"2023", role:"Full Stack Dev", tag:"HTML - CSS - JS", thumb:"assets/charcheck.png" },
  { name:"StudyOS - IT Student Hub", url:"https://studyos-three.vercel.app/", date:"2023", role:"Full Stack Dev", tag:"HTML - CSS - JS", thumb:"assets/studyos.png" },
  { name:"AlgoLens - Visualizer", url:"https://algolens-black.vercel.app/", date:"2023", role:"Full Stack Dev", tag:"HTML - CSS - JS", thumb:"assets/algolens.png" },
  { name:"ProdOS - IT Productivity Suite", url:"https://prodos-nine.vercel.app/", date:"2023", role:"Full Stack Dev", tag:"HTML - CSS - JS", thumb:"assets/prodos.png" },
  { name:"Thriftly - E Commerce Website", url:"https://thriftly.dcism.org/", date:"2025", role:"Full Stack Dev", tag:"HTML - CSS - JS - PHP - MYSQL", thumb:"assets/thriftly.png" },
]

const SKILLS = [
  {name:"React / Next.js",pct:92},{name:"TypeScript",pct:85},
  {name:"Tailwind CSS",pct:90},{name:"Node.js",pct:78},
  {name:"Figma / UI",pct:88},{name:"GSAP / Motion",pct:80},
  {name:"REST / OpenAI APIs",pct:84},{name:"MongoDB / SQL",pct:73},
]

const TIMELINE = [
  {date:"2026 — Present",role:"Founder",company:"Aresei — IT Startup, Cebu PH",desc:"Founded Aresei, a student-run IT company at the University of San Carlos. Building real digital solutions including web apps, mobile development, and IT consulting for clients while still studying."},
  {date:"2026 — Present",role:"Frontend Developer",company:"Freelance / Remote",desc:"Building bespoke web experiences for clients across PH and internationally. Specializing in React, Next.js, animations, and design systems."},
  {date:"2025 — 2026",role:"Full Stack Developer",company:"Personal Projects",desc:"Built AI-powered apps, e-commerce platforms, and data analytics tools using the MERN stack, Next.js 13, OpenAI APIs, and Stripe."},
  {date:"2024 — 2026",role:"Web Developer",company:"Learning & Freelance, PH",desc:"Developed interactive frontends and RESTful backends. Focused on responsive design, performance optimization, and clean UI/UX."},
]

const TESTIMONIALS = [
  {quote:"Francis delivered beyond our expectations. The animations and attention to detail set our site apart from every competitor.",author:"Mary Elaine Bagol",role:"Owner, BDRL LAW"},
  {quote:"Working with Francis was seamless. He understood the brief immediately and produced something truly stunning.",author:"Neal Veloso",role:"Developer of Aresei"},
  {quote:"The best frontend developer I've worked with. Fast, precise, and genuinely passionate about the craft.",author:"Benjiro Bahinting",role:"Product Manager"},
]

const FAQS = [
  {q:"What stack do you specialize in?",a:"I specialize in the MERN stack (MongoDB, Express, React, Node.js) and Next.js for full-stack apps. For UI I use Tailwind CSS and GSAP/Framer Motion for animations."},
  {q:"Have you worked with AI APIs?",a:"Yes — I've built projects using OpenAI's GPT-4 and DALL-E APIs, including an AI Article Summarizer and a MERN AI Image Generator app."},
  {q:"Available for freelance work?",a:"Yes! I'm open to interesting projects. Feel free to reach out via email or any of my socials below."},
  {q:"What's your design philosophy?",a:"Great design is invisible. Every interaction should feel natural and intentional — never forced. I aim for experiences that feel effortless."},
  {q:"What is Aresei?",a:"Aresei is an IT startup I founded as a 2nd year IT student at the University of San Carlos, Cebu. We offer web development, mobile apps, cybersecurity basics, and IT consulting at student-friendly rates. Visit aresei.store to learn more."},
]

const THEMES = {
  dark:  {"--bg":"#080808","--fg":"#e8e8e4","--dim":"#4a4a4a","--border":"#1e1e1e"},
  light: {"--bg":"#f0f0ec","--fg":"#080808","--dim":"#aaaaaa","--border":"#dddddd"},
  mono:  {"--bg":"#0c0c0c","--fg":"#39ff9a","--dim":"#1a5c40","--border":"#0f2d20"},
}

const NAV_LINKS = ["home","about","projects","skills","timeline","testimonials","contact","faq"]

/* ── FOG BACKGROUND ── */
function useFog() {
  useEffect(() => {
    const C = document.getElementById("fog"), ctx = C.getContext("2d")
    let W, H, raf, frame=0, t=0, mx=.5, my=.5, tmx=.5, tmy=.5, sy=0, syt=0
    const resize = () => { W=C.width=window.innerWidth; H=C.height=window.innerHeight }
    resize()
    window.addEventListener("resize", resize)
    window.addEventListener("mousemove", e => { tmx=e.clientX/W; tmy=e.clientY/H })
    window.addEventListener("scroll", () => { sy=window.scrollY })
    const B = Array.from({length:6}, (_,i) => ({
      phase:(i/6)*Math.PI*2, spd:.055+i*.007, cx:.15+(i/5)*.7, cy:.1+(i/5)*.8,
      orx:.22+(i%3)*.06, ory:.18+(i%2)*.1, size:.30+(i%3)*.09, alpha:.048+(i%3)*.011
    }))
    const P = Array.from({length:55}, () => ({
      x:Math.random()*1920, y:Math.random()*1080,
      vx:(Math.random()-.5)*.18, vy:(Math.random()-.5)*.14,
      r:Math.random()*1.4+.3, a:Math.random()*.18+.04,
    }))
    const draw = () => {
      raf = requestAnimationFrame(draw)
      if (++frame%2 !== 0) return
      mx += (tmx-mx)*.035; my += (tmy-my)*.035; syt += (sy-syt)*.06
      ctx.clearRect(0,0,W,H)
      for (const b of B) {
        const bx = (b.cx+Math.sin(t*b.spd+b.phase)*b.orx)*W
        const by = (b.cy+Math.cos(t*b.spd*.8+b.phase)*b.ory)*H - syt*.05
        const br = W*b.size*(1+.06*Math.sin(t*.25+b.phase))
        const g = ctx.createRadialGradient(bx,by,0,bx,by,br)
        g.addColorStop(0,`rgba(210,210,200,${b.alpha})`)
        g.addColorStop(.5,`rgba(200,200,190,${b.alpha*.3})`)
        g.addColorStop(1,"rgba(0,0,0,0)")
        ctx.fillStyle=g; ctx.fillRect(0,0,W,H)
      }
      for (const p of P) {
        p.x+=p.vx; p.y+=p.vy
        if(p.x<0) p.x=W; if(p.x>W) p.x=0
        if(p.y<0) p.y=H; if(p.y>H) p.y=0
        const dx=mx*W-p.x, dy=my*H-p.y, d=Math.sqrt(dx*dx+dy*dy)
        if(d<180){p.vx+=dx/d*.008; p.vy+=dy/d*.008}
        p.vx*=.99; p.vy*=.99
        ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2)
        ctx.fillStyle=`rgba(220,220,210,${p.a})`; ctx.fill()
      }
      const gx=mx*W, gy=my*H
      const g1 = ctx.createRadialGradient(gx,gy,0,gx,gy,W*.26)
      g1.addColorStop(0,"rgba(230,230,220,0.09)"); g1.addColorStop(.5,"rgba(210,210,200,0.03)"); g1.addColorStop(1,"rgba(0,0,0,0)")
      ctx.fillStyle=g1; ctx.fillRect(0,0,W,H)
      const g2 = ctx.createRadialGradient(gx,gy,0,gx,gy,W*.06)
      g2.addColorStop(0,"rgba(240,240,230,0.11)"); g2.addColorStop(1,"rgba(0,0,0,0)")
      ctx.fillStyle=g2; ctx.fillRect(0,0,W,H)
      const v = ctx.createRadialGradient(W/2,H/2,H*.2,W/2,H/2,H*.85)
      v.addColorStop(0,"rgba(0,0,0,0)"); v.addColorStop(1,"rgba(0,0,0,0.72)")
      ctx.fillStyle=v; ctx.fillRect(0,0,W,H)
      t += .014
    }
    draw()
    return () => { cancelAnimationFrame(raf) }
  }, [])
}

/* ── SCROLL PROGRESS ── */
function useScrollProgress() {
  useEffect(() => {
    const bar = document.getElementById("prog")
    const fn = () => { const h=document.documentElement.scrollHeight-window.innerHeight; bar.style.width=(h>0?(window.scrollY/h)*100:0)+"%" }
    window.addEventListener("scroll", fn)
    return () => window.removeEventListener("scroll", fn)
  }, [])
}

/* ── BACK TO TOP ── */
function useBackToTop() {
  useEffect(() => {
    const btn = document.getElementById("btt")
    const fn = () => btn.classList.toggle("show", window.scrollY>400)
    window.addEventListener("scroll", fn)
    btn.addEventListener("click", () => window.scrollTo({top:0,behavior:"smooth"}))
    return () => window.removeEventListener("scroll", fn)
  }, [])
}

/* ── REVEAL ON SCROLL ── */
function useReveal(ref, delay=0) {
  useEffect(() => {
    if (!ref.current) return
    ref.current.style.transitionDelay = delay+"s"
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { ref.current.classList.add("vis"); obs.disconnect() }
    }, {threshold:.08})
    obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])
}

/* ── REV WRAPPER ── */
function Rev({tag:Tag="div", className="", delay=0, children, ...p}) {
  const r = useRef(null); useReveal(r, delay)
  return <Tag ref={r} className={`reveal ${className}`} {...p}>{children}</Tag>
}

/* ── TYPEWRITER ── */
function Typewriter({texts, delay=2100}) {
  const [display, setDisplay] = useState("")
  const [ti, setTi] = useState(0)
  const [ci, setCi] = useState(0)
  const [deleting, setDeleting] = useState(false)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setStarted(true), delay)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    const t = setTimeout(() => {
      const cur = texts[ti]
      if (!deleting) {
        setDisplay(cur.slice(0, ci+1))
        if (ci+1 === cur.length) setTimeout(() => setDeleting(true), 1800)
        else setCi(c => c+1)
      } else {
        setDisplay(cur.slice(0, ci-1))
        if (ci-1 === 0) { setDeleting(false); setTi(t => (t+1)%texts.length) }
        else setCi(c => c-1)
      }
    }, deleting ? 45 : 75)
    return () => clearTimeout(t)
  }, [display, deleting, ti, ci])

  if (!started) return <span>Designer &amp; Developer</span>
  return <span>{display}<span style={{borderRight:"1px solid var(--dim)",marginLeft:"1px",animation:"blink 1s step-end infinite"}}></span></span>
}

/* ── CURSOR ── */
function Cursor() {
  const cr = useRef(null), rr = useRef(null)
  useEffect(() => {
    let cx=0, cy=0, rx=0, ry=0, raf
    const onM = e => { cx=e.clientX; cy=e.clientY; cr.current.style.left=cx+"px"; cr.current.style.top=cy+"px" }
    window.addEventListener("mousemove", onM)
    const loop = () => { raf=requestAnimationFrame(loop); rx+=(cx-rx)*.11; ry+=(cy-ry)*.11; rr.current.style.left=rx+"px"; rr.current.style.top=ry+"px" }
    loop()
    const ov = () => { cr.current.classList.add("h"); rr.current.classList.add("h") }
    const ou = () => { cr.current.classList.remove("h"); rr.current.classList.remove("h") }
    const bindHover = () => document.querySelectorAll("a,button,.fq,.testi-btn,.copy-btn,.aresei-btn").forEach(el => {
      el.addEventListener("mouseenter", ov); el.addEventListener("mouseleave", ou)
    })
    bindHover()
    const mo = new MutationObserver(bindHover)
    mo.observe(document.body, {childList:true, subtree:true})
    const oc = e => {
      cr.current.classList.add("ck"); setTimeout(() => cr.current.classList.remove("ck"), 200)
      const d = document.createElement("div"); d.className="rip"
      d.style.cssText=`width:80px;height:80px;left:${e.clientX}px;top:${e.clientY}px`
      document.body.appendChild(d); setTimeout(() => d.remove(), 650)
    }
    window.addEventListener("click", oc)
    return () => { cancelAnimationFrame(raf); window.removeEventListener("mousemove",onM); window.removeEventListener("click",oc); mo.disconnect() }
  }, [])
  return <><div ref={cr} className="cur"/><div ref={rr} className="cur-ring"/></>
}

/* ── SPLASH ── */
function Splash({onDone}) {
  const [hide, setHide] = useState(false)
  useEffect(() => {
    const t = setTimeout(() => { setHide(true); setTimeout(onDone, 900) }, 2100)
    return () => clearTimeout(t)
  }, [])
  return (
    <div id="splash" className={hide ? "hide" : ""}>
      <div style={{textAlign:"center"}}>
        <div className="sp-name"><span>Francis Niel Tamayo</span></div>
        <div className="sp-bar"/>
        <div className="sp-sub">DESIGNER &amp; DEVELOPER</div>
      </div>
    </div>
  )
}

/* ── COUNTER ── */
function Counter({target}) {
  const [v, setV] = useState(0); const r = useRef(null)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return; obs.disconnect()
      let s=0; const step = () => { s+=Math.ceil((target-s)/8); setV(s>=target?target:s); if(s<target) requestAnimationFrame(step) }
      requestAnimationFrame(step)
    }, {threshold:.5})
    obs.observe(r.current); return () => obs.disconnect()
  }, [target])
  return <span ref={r}>{v}</span>
}

/* ── PROJECT ITEM with magnetic + preview ── */
function MagItem({p, delay}) {
  const ref=useRef(null), lref=useRef(null), rref=useRef(null)
  useReveal(rref, delay)
  useEffect(() => {
    const el=ref.current, link=lref.current; if(!el||!link) return
    const card=document.getElementById("prev-card")
    const img=document.getElementById("prev-img")
    const lbl=document.getElementById("prev-label")
    const onM = e => {
      const r = el.getBoundingClientRect()
      link.style.transform = `translate(${(e.clientX-(r.left+r.width/2))*.09}px,${(e.clientY-(r.top+r.height/2))*.13}px)`
      let px=e.clientX+28, py=e.clientY-70
      if (px+240>window.innerWidth) px=e.clientX-260
      card.style.left=px+"px"; card.style.top=py+"px"
    }
    const onE = () => { img.src=p.thumb; lbl.textContent=p.name; card.classList.add("show") }
    const onL = () => { link.style.transform=""; card.classList.remove("show") }
    el.addEventListener("mousemove",onM); el.addEventListener("mouseenter",onE); el.addEventListener("mouseleave",onL)
    return () => { el.removeEventListener("mousemove",onM); el.removeEventListener("mouseenter",onE); el.removeEventListener("mouseleave",onL) }
  }, [])
  return (
    <div ref={rref} className="reveal">
      <li ref={ref} className="pi">
        <a ref={lref} href={p.url} target="_blank" rel="noreferrer" className="plink" style={{transition:"transform .35s cubic-bezier(.34,1.56,.64,1)"}}>
          <span className="pname">{p.name}</span>
          <span className="ptag">{p.tag}</span>
          <span className="pmeta">{p.date}</span>
          <span className="parr">↗</span>
        </a>
      </li>
    </div>
  )
}

/* ── SKILL BAR ── */
function SkillBar({name, pct, delay}) {
  const fr = useRef(null)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return; obs.disconnect()
      if (fr.current) { fr.current.style.transitionDelay=delay+"s"; fr.current.classList.add("go") }
    }, {threshold:.3})
    if (fr.current) obs.observe(fr.current)
    return () => obs.disconnect()
  }, [])
  return (
    <div className="skill-row">
      <div className="skill-top"><span>{name}</span><span className="skill-pct">{pct}%</span></div>
      <div className="skill-track"><div ref={fr} className="skill-fill" style={{"--w":pct+"%"}}/></div>
    </div>
  )
}

/* ── TESTIMONIALS ── */
function Testimonials() {
  const [idx, setIdx] = useState(0)
  return (
    <Rev>
      <div className="testi-wrap">
        <div className="testi-track" style={{transform:`translateX(-${idx*100}%)`}}>
          {TESTIMONIALS.map((t,i) => (
            <div key={i} className="testi-slide">
              <div className="testi-quote">"{t.quote}"</div>
              <div className="testi-author"><strong>{t.author}</strong>{t.role}</div>
            </div>
          ))}
        </div>
        <div className="testi-nav">
          <button className="testi-btn" onClick={()=>setIdx(i=>(i-1+TESTIMONIALS.length)%TESTIMONIALS.length)}>←</button>
          <button className="testi-btn" onClick={()=>setIdx(i=>(i+1)%TESTIMONIALS.length)}>→</button>
          <div className="tdots">{TESTIMONIALS.map((_,i)=><div key={i} className={`tdot${i===idx?" on":""}`}/>)}</div>
        </div>
      </div>
    </Rev>
  )
}

/* ── PAGE WIPE NAVIGATION ── */
const goTo = (id, e) => {
  e && e.preventDefault()
  const wipe = document.getElementById("wipe")
  wipe.className = "in"
  setTimeout(() => {
    document.getElementById(id)?.scrollIntoView({behavior:"instant"})
    wipe.className = "out"
    setTimeout(() => { wipe.className = "" }, 450)
  }, 450)
}

/* ── COPY EMAIL ── */
function CopyEmail() {
  const [copied, setCopied] = useState(false)
  const copy = () => {
    navigator.clipboard.writeText("francistamayo55@gmail.com").then(() => {
      setCopied(true); setTimeout(() => setCopied(false), 2000)
    })
  }
  return (
    <button className={`copy-btn${copied?" copied":""}`} onClick={copy}>
      {copied ? "✓ Copied!" : "Copy Email"}
    </button>
  )
}

/* ── APP ── */
export default function App() {
  const [ready, setReady] = useState(false)
  const [theme, setTheme] = useState("dark")
  const [active, setActive] = useState("home")
  const [mob, setMob] = useState(false)
  const [faq, setFaq] = useState(null)
  const heroRef = useRef(null)

  useFog(); useScrollProgress(); useBackToTop()

  // hero parallax
  useEffect(() => {
    if (!ready || !heroRef.current) return
    const fn = () => { if(heroRef.current) heroRef.current.style.transform=`translateY(${window.scrollY*.28}px)` }
    window.addEventListener("scroll", fn, {passive:true})
    return () => window.removeEventListener("scroll", fn)
  }, [ready])

  // theme switcher
  const applyTheme = useCallback(n => {
    const f = document.getElementById("tflash")
    f.classList.add("on")
    setTimeout(() => {
      Object.entries(THEMES[n]).forEach(([k,v]) => document.documentElement.style.setProperty(k,v))
      setTheme(n)
      setTimeout(() => f.classList.remove("on"), 150)
    }, 150)
  }, [])

  // apply dark theme on mount
  useEffect(() => {
    Object.entries(THEMES.dark).forEach(([k,v]) => document.documentElement.style.setProperty(k,v))
  }, [])

  // active section tracking
  useEffect(() => {
    if (!ready) return
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if(e.isIntersecting) setActive(e.target.id) })
    }, {threshold:.35})
    document.querySelectorAll("section[id]").forEach(s => obs.observe(s))
    return () => obs.disconnect()
  }, [ready])

  // inject blink keyframe
  useEffect(() => {
    const s = document.createElement("style")
    s.textContent = "@keyframes blink{0%,100%{opacity:1}50%{opacity:0}}"
    document.head.appendChild(s)
  }, [])

  if (!ready) return <Splash onDone={() => setReady(true)}/>

  return (
    <div className="wrap">
      <Cursor/>

      {/* HEADER */}
      <header>
        <div className="logo-wrap">
          <a href="#home" className="logo" onClick={e=>goTo("home",e)}>Francis Niel Tamayo</a>
          <div className="badge"><span className="badge-dot"/><span>Open to Work</span></div>
        </div>
        <div style={{display:"flex",alignItems:"center",gap:"20px"}}>
          <div className="themes">
            {["dark","light","mono"].map(t=>(
              <button key={t} className={theme===t?"on":""} onClick={()=>applyTheme(t)}>
                {t.charAt(0).toUpperCase()+t.slice(1)}
              </button>
            ))}
          </div>
          <button className={`hbg${mob?" open":""}`} onClick={()=>setMob(o=>!o)}>
            <span/><span/><span/>
          </button>
        </div>
      </header>

      {/* SIDE NAV */}
      <nav className="side">
        {NAV_LINKS.map(id=>(
          <a key={id} href={`#${id}`} className={active===id?"on":""} onClick={e=>goTo(id,e)}>
            <span className="dot"/>{id.charAt(0).toUpperCase()+id.slice(1)}
          </a>
        ))}
      </nav>

      {/* MOBILE MENU */}
      <div className={`mobmenu${mob?" open":""}`}>
        {NAV_LINKS.map(id=>(
          <a key={id} href={`#${id}`} onClick={e=>{goTo(id,e);setMob(false)}}>
            {id.charAt(0).toUpperCase()+id.slice(1)}
          </a>
        ))}
      </div>

      <main>
        {/* HOME */}
        <section id="home">
          <div ref={heroRef}>
            <p className="h-sub">
              <Typewriter texts={["Designer & Developer","Full Stack Engineer","React Specialist","Founder of Aresei ✦","Open to Work ✦"]}/>
            </p>
            <h1 className="h-title">
              <span className="ln"><span>Francis</span></span>
              <span className="ln"><span>Niel</span></span>
              <span className="ln"><span>Tamayo</span></span>
            </h1>
            <p className="h-desc">
              Based in the <em>Philippines.</em><br/>
              I craft <em>expressive web experiences</em><br/>
              at the intersection of design and code.<br/>
              Founder of <em>Aresei</em> — IT startup, Cebu.
            </p>
            <div className="stats">
              <div><div className="stat-num"><Counter target={9}/>+</div><div className="stat-label">Personal Projects</div></div>
              <div><div className="stat-num"><Counter target={1}/>+</div><div className="stat-label">Years Exp</div></div>
              <div><div className="stat-num"><Counter target={100}/>%</div><div className="stat-label">Passion</div></div>
            </div>
          </div>
          <div className="scroll-hint">Scroll</div>
        </section>

        {/* ABOUT */}
        <section id="about" className="sep">
          <Rev className="sh"><span className="st">About</span><div className="sl"/></Rev>
          <div className="about-grid">
            <Rev className="avatar-wrap" delay={.05}>
              <div className="avatar">
                <img src="assets/francis.jpg" alt="Francis Niel Tamayo" onError={e=>{e.target.style.display='none'}}/>
              </div>
            </Rev>
            <Rev className="about-content" delay={.1}>
              <h3>Who I Am</h3>
              <p>I'm Francis Niel Tamayo, a Full Stack Developer and UI/UX enthusiast based in the Philippines. I specialize in building modern web applications using React, Next.js, and the MERN stack.</p>
              <p>I'm also the <em>Founder of Aresei</em> — a student-founded IT company built by 2nd year Information Technology students at the University of San Carlos, Cebu. We deliver real digital solutions including web development, mobile apps, and IT consulting while still in school.</p>
              <p>I've built everything from AI-powered apps and e-commerce platforms to data analytics tools. I care deeply about clean code, fluid animations, and user-first design.</p>
              <p style={{color:"var(--dim)"}}>Currently available for freelance projects and full-time opportunities.</p>
              <a href="https://aresei.store" target="_blank" rel="noreferrer" className="aresei-btn">
                <span className="aresei-btn-dot"/>Visit Aresei — My IT Startup ↗
              </a>
            </Rev>
          </div>
        </section>

        {/* PROJECTS */}
        <section id="projects" className="sep">
          <Rev className="sh"><span className="st">Projects</span><div className="sl"/></Rev>
          <ul className="pl">{PROJECTS.map((p,i)=><MagItem key={i} p={p} delay={i*.04}/>)}</ul>
        </section>

        {/* SKILLS */}
        <section id="skills" className="sep">
          <Rev className="sh"><span className="st">Skills</span><div className="sl"/></Rev>
          <div className="skills-grid">{SKILLS.map((s,i)=><SkillBar key={i} name={s.name} pct={s.pct} delay={i*.07}/>)}</div>
        </section>

        {/* TIMELINE */}
        <section id="timeline" className="sep">
          <Rev className="sh"><span className="st">Experience</span><div className="sl"/></Rev>
          <div className="timeline">
            {TIMELINE.map((tl,i)=>(
              <Rev key={i} className="tl-item" delay={i*.12}>
                <div className="tl-dot"/>
                <div className="tl-date">{tl.date}</div>
                <div className="tl-role">{tl.role}</div>
                <div className="tl-co">{tl.company}</div>
                <div className="tl-desc">{tl.desc}</div>
              </Rev>
            ))}
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section id="testimonials" className="sep">
          <Rev className="sh"><span className="st">Testimonials</span><div className="sl"/></Rev>
          <Testimonials/>
        </section>

        {/* FAQ */}
        <section id="faq" className="sep">
          <Rev className="sh"><span className="st">FAQ</span><div className="sl"/></Rev>
          <ul className="flist">
            {FAQS.map((f,i)=>(
              <li key={i} className={`fi${faq===i?" open":""}`}>
                <div className="fq" onClick={()=>setFaq(faq===i?null:i)}>{f.q}<span className="ftog">+</span></div>
                <div className="fans">{f.a}</div>
              </li>
            ))}
          </ul>
        </section>

        {/* CONTACT */}
        <section id="contact" className="sep">
          <Rev className="sh"><span className="st">Contact</span><div className="sl"/></Rev>
          <Rev className="soc" delay={.1}>
            <a href="https://francisnieltamayoo.vercel.app" target="_blank" rel="noreferrer" className="slink">Portfolio ↗</a>
            <a href="https://github.com/rukiaaz" target="_blank" rel="noreferrer" className="slink">GitHub ↗</a>
            <a href="https://linkedin.com/in/francisnieltamayo" target="_blank" rel="noreferrer" className="slink">LinkedIn ↗</a>
            <CopyEmail/>
          </Rev>
          <Rev delay={.2}>
            <a href="https://aresei.store" target="_blank" rel="noreferrer" className="aresei-btn" style={{marginTop:"40px"}}>
              <span className="aresei-btn-dot"/>Visit Aresei — My IT Startup ↗
            </a>
          </Rev>
        </section>

        <footer>
          <span>© Francis Niel Tamayo</span>
          <span style={{fontSize:"9px",letterSpacing:".18em"}}>DESIGNER &amp; DEVELOPER — FOUNDER OF ARESEI — PH</span>
        </footer>
      </main>
    </div>
  )
}
