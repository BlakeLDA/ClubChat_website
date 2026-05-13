// Hero section — headline + animated app window + backdrop

function Hero({ tweaks }) {
  const [typedText, setTypedText] = React.useState('');
  const [showAiReply, setShowAiReply] = React.useState(false);
  const [showAiCard, setShowAiCard] = React.useState(false);
  const [cursorPos, setCursorPos] = React.useState({ x: 78, y: 82 });

  React.useEffect(() => {
    const target = 'Draft a warm, conversational reminder about Friday\u2019s tee sheet opening \u2014 members only.';
    let i = 0;
    let cancelled = false;

    const timeouts = [];
    timeouts.push(setTimeout(() => {
      const tick = () => {
        if (cancelled) return;
        if (i <= target.length) {
          setTypedText(target.slice(0, i));
          i++;
          timeouts.push(setTimeout(tick, 30 + Math.random() * 35));
        }
      };
      tick();
    }, 1000));

    const cursorPoints = [
      { x: 78, y: 88, t: 0 },
      { x: 48, y: 35, t: 500 },
      { x: 62, y: 50, t: 1100 },
      { x: 50, y: 92, t: 1700 },
    ];
    cursorPoints.forEach(p => {
      timeouts.push(setTimeout(() => setCursorPos({ x: p.x, y: p.y }), p.t));
    });

    return () => { cancelled = true; timeouts.forEach(clearTimeout); };
  }, []);

  return (
    <section style={{ position: 'relative', paddingBottom: 80 }}>
      {/* NAV */}
      <nav style={{
        maxWidth: 1200, margin: '0 auto', padding: '22px 40px',
        display: 'flex', alignItems: 'center', gap: 32,
        position: 'relative', zIndex: 5,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <img src="assets/clubchat-logo.svg" alt="ClubChat" style={{ width: 28, height: 28, display: 'block' }} />
          <div style={{
            fontFamily: 'var(--serif-font)', fontSize: 20,
            color: 'var(--fg)', fontWeight: 500, letterSpacing: '-0.01em',
          }}>ClubChat</div>
        </div>
        <div style={{ display: 'flex', gap: 26, flex: 1, justifyContent: 'center' }}>
          {['Product', 'Security', 'Customers', 'Pricing', 'Changelog'].map(l => (
            <span key={l} style={{
              fontSize: 13.5, color: 'var(--fg-dim)',
              fontFamily: 'var(--ui-font)', cursor: 'pointer',
            }}>{l}</span>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <span style={{
            fontSize: 13, color: 'var(--fg-dim)', fontFamily: 'var(--ui-font)',
            cursor: 'pointer',
          }}>Sign in</span>
          <button style={{
            padding: '9px 16px', borderRadius: 6,
            background: 'var(--fg)', color: 'var(--bg)', border: 'none',
            fontFamily: 'var(--ui-font)', fontSize: 13, fontWeight: 600,
            cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8,
          }}>
            Book a walkthrough
            <span style={{
              fontSize: 10, fontFamily: 'var(--mono-font)',
              padding: '1px 5px', borderRadius: 3,
              background: 'rgba(0,0,0,0.15)',
            }}>↗</span>
          </button>
        </div>
      </nav>

      {/* HEADLINE */}
      <div style={{
        maxWidth: 900, margin: '0 auto', padding: '60px 40px 40px',
        textAlign: 'center', position: 'relative', zIndex: 4,
      }}>
        <div style={{
          fontSize: 11, letterSpacing: '0.2em', color: 'var(--accent)',
          fontFamily: 'var(--mono-font)', marginBottom: 22, fontWeight: 500,
        }}>
          01 — AI-NATIVE COMMUNICATIONS FOR PRIVATE CLUBS
        </div>
        <h1 style={{
          fontFamily: 'var(--serif-font)', fontSize: 76, lineHeight: 1.02,
          color: 'var(--fg)', margin: 0, fontWeight: 600,
          letterSpacing: '-0.025em',
        }}>
          {tweaks.headlinePre || 'an AI that'}<br />
          <em style={{ color: 'var(--accent-warm)', fontStyle: 'italic', fontWeight: 700 }}>
            {tweaks.headlineItalic || 'knows your club.'}
          </em>
        </h1>
        <p style={{
          fontSize: 16, lineHeight: 1.6, color: 'var(--fg-dim)',
          fontFamily: 'var(--ui-font)', maxWidth: 560, margin: '30px auto 0',
        }}>
          Drafts every campaign — email, newsletter, social, SMS, and website — in your club’s voice, tuned to what each member actually cares about. Your team reclaims hours. Your members finally get communications that feel made for them.
        </p>

        <div style={{
          display: 'flex', gap: 12, justifyContent: 'center', marginTop: 36,
        }}>
          <button style={{
            padding: '13px 22px', borderRadius: 7,
            background: 'var(--fg)', color: 'var(--bg)', border: 'none',
            fontFamily: 'var(--ui-font)', fontSize: 14, fontWeight: 600,
            cursor: 'pointer',
          }}>
            Book a walkthrough
          </button>
          <button style={{
            padding: '13px 22px', borderRadius: 7,
            background: 'transparent', color: 'var(--fg)',
            border: '1px solid var(--border-strong)',
            fontFamily: 'var(--ui-font)', fontSize: 14, fontWeight: 500,
            cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8,
          }}>
            Watch 90-second tour
            <span style={{
              fontSize: 10, fontFamily: 'var(--mono-font)',
              color: 'var(--fg-dim)',
            }}>▸</span>
          </button>
        </div>

        <div style={{
          marginTop: 34, display: 'flex', gap: 18, justifyContent: 'center', alignItems: 'center',
          fontSize: 10.5, color: 'var(--fg-dim)', fontFamily: 'var(--mono-font)',
          letterSpacing: '0.1em',
        }}>
          <span>INTEGRATES WITH</span>
          <span style={{ opacity: 0.4 }}>·</span>
          <span style={{ fontFamily: 'var(--serif-font)', fontSize: 13, letterSpacing: '-0.01em', color: 'var(--fg)', fontStyle: 'italic' }}>Whoosh</span>
          <span style={{ fontFamily: 'var(--serif-font)', fontSize: 13, letterSpacing: '-0.01em', color: 'var(--fg)' }}>Jonas</span>
          <span style={{ fontFamily: 'var(--ui-font)', fontSize: 12, letterSpacing: '0.06em', color: 'var(--fg)', fontWeight: 600 }}>LIGHTSPEED</span>
          <span style={{ fontFamily: 'var(--serif-font)', fontSize: 13, letterSpacing: '-0.01em', color: 'var(--fg)' }}>Northstar</span>
        </div>
      </div>

      {/* DEVICE + BACKDROP */}
      <div style={{
        maxWidth: 1180, margin: '60px auto 0', padding: '0 40px',
        position: 'relative',
      }}>
        <div style={{
          position: 'relative',
          borderRadius: 14,
          overflow: 'hidden',
          height: 680,
          background: 'var(--backdrop)',
          boxShadow: '0 1px 0 rgba(255,255,255,0.06) inset',
        }}>
          {/* backdrop — stylized golf course / country club scene (no photo) */}
          <GolfBackdrop />

          <div style={{
            position: 'absolute', inset: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '0 40px',
          }}>
            <div style={{ position: 'relative', width: '100%', display: 'flex', justifyContent: 'center' }}>
              <AnimatedAssistant />
            </div>
          </div>
        </div>

        {/* caption under device */}
        <div style={{
          marginTop: 22, textAlign: 'center',
          fontSize: 11, color: 'var(--fg-dim)', fontFamily: 'var(--mono-font)',
          letterSpacing: '0.08em',
        }}>
          ↓ DESKTOP — THE CLUBCHAT AI ASSISTANT
        </div>
      </div>
    </section>
  );
}

// Stylized golf course backdrop — abstract layered shapes, no photo
function GolfBackdrop() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 1200 680" preserveAspectRatio="xMidYMid slice"
         style={{ position: 'absolute', inset: 0 }}>
      <defs>
        <linearGradient id="sky" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#d8c9a6"/>
          <stop offset="50%" stopColor="#c7a878"/>
          <stop offset="100%" stopColor="#a88a5a"/>
        </linearGradient>
        <linearGradient id="mountains" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#2d4438"/>
          <stop offset="100%" stopColor="#1a2d24"/>
        </linearGradient>
        <linearGradient id="mountains2" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#3f5548"/>
          <stop offset="100%" stopColor="#294036"/>
        </linearGradient>
        <linearGradient id="fairway" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#5a7244"/>
          <stop offset="100%" stopColor="#344528"/>
        </linearGradient>
        <linearGradient id="rough" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#4a5e36"/>
          <stop offset="100%" stopColor="#2a3a22"/>
        </linearGradient>
        <radialGradient id="sun" cx="0.75" cy="0.2" r="0.25">
          <stop offset="0%" stopColor="rgba(217, 180, 150, 0.35)"/>
          <stop offset="100%" stopColor="rgba(217, 180, 150, 0)"/>
        </radialGradient>
      </defs>

      {/* sky */}
      <rect width="1200" height="680" fill="url(#sky)"/>

      {/* sun glow */}
      <rect width="1200" height="680" fill="url(#sun)"/>

      {/* far mountains */}
      <path d="M0 340 L140 260 L260 300 L380 220 L520 280 L660 230 L820 290 L960 250 L1100 300 L1200 270 L1200 400 L0 400 Z" fill="url(#mountains2)" opacity="0.85"/>

      {/* near mountains */}
      <path d="M0 400 L120 340 L240 380 L380 310 L520 370 L640 330 L780 380 L920 340 L1080 390 L1200 360 L1200 460 L0 460 Z" fill="url(#mountains)"/>

      {/* treeline */}
      <path d="M0 450 L1200 450 L1200 490 L0 490 Z" fill="#1f2d1c"/>
      {Array.from({ length: 40 }).map((_, i) => (
        <circle key={i} cx={30 + i * 30} cy={450 - (i % 3) * 6 - 4} r={8 + (i % 4) * 3} fill="#1f2d1c"/>
      ))}

      {/* clubhouse silhouette */}
      <g transform="translate(820, 410)">
        <rect x="0" y="0" width="140" height="40" fill="#1a2820"/>
        <polygon points="0,0 70,-22 140,0" fill="#1a2820"/>
        <rect x="60" y="-14" width="20" height="14" fill="#1a2820"/>
        <rect x="10" y="10" width="6" height="10" fill="#e0c68a" opacity="0.7"/>
        <rect x="30" y="10" width="6" height="10" fill="#e0c68a" opacity="0.7"/>
        <rect x="104" y="10" width="6" height="10" fill="#e0c68a" opacity="0.7"/>
        <rect x="124" y="10" width="6" height="10" fill="#e0c68a" opacity="0.7"/>
      </g>

      {/* flagstick */}
      <g transform="translate(340, 470)">
        <line x1="0" y1="0" x2="0" y2="-40" stroke="#f0ead8" strokeWidth="1.5"/>
        <polygon points="0,-40 18,-35 0,-28" fill="#c98d2a"/>
      </g>

      {/* rough (mid ground) */}
      <path d="M0 490 L1200 490 L1200 540 L0 540 Z" fill="url(#rough)"/>

      {/* fairway curves */}
      <path d="M0 540 Q300 510 600 540 T1200 540 L1200 680 L0 680 Z" fill="url(#fairway)"/>

      {/* bunker */}
      <ellipse cx="900" cy="580" rx="70" ry="14" fill="#b8a880" opacity="0.7"/>
      <ellipse cx="240" cy="610" rx="50" ry="10" fill="#b8a880" opacity="0.6"/>

      {/* vignette */}
      <radialGradient id="vig" cx="0.5" cy="0.5" r="0.8">
        <stop offset="55%" stopColor="rgba(0,0,0,0)"/>
        <stop offset="100%" stopColor="rgba(15, 36, 32, 0.35)"/>
      </radialGradient>
      <rect width="1200" height="680" fill="url(#vig)"/>
    </svg>
  );
}

Object.assign(window, { Hero });
