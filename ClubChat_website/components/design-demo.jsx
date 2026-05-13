// Animated "Design" feature demo for section 02.
// Story: user types a brief → AI thinks (lottie-style) → flyer reveals,
// rests on screen, then slides left as two social graphics slide in side-by-side. Loops.

const DESIGN_PROMPT = "Create a flyer and 2 social graphics to help us promote upcoming golf events on the calendar.";

// Human-feeling cadence (variable speed + small pauses)
const DESIGN_TYPING = (() => {
  const out = [0];
  let cum = 0;
  for (let i = 0; i < DESIGN_PROMPT.length; i++) {
    const ch = DESIGN_PROMPT[i];
    let delay = 50 + Math.sin(i * 1.9) * 16 + Math.sin(i * 0.7) * 9;
    if (ch === ' ') delay += 30;
    if (ch === ',' || ch === '.') delay += 200;
    // a couple of natural "thinking" beats
    if (i === 22) delay += 260;  // after "Create a flyer and 2 "
    if (i === 38) delay += 220;  // after "social graphics "
    if (i === 60) delay += 200;  // after "promote upcoming"
    cum += Math.max(20, delay);
    out.push(cum);
  }
  return out;
})();

function dCharsAt(elapsed) {
  let n = 0;
  for (let i = 1; i < DESIGN_TYPING.length; i++) {
    if (DESIGN_TYPING[i] <= elapsed) n = i; else break;
  }
  return n;
}

// Timeline (ms) — looping demo
const DT = {
  rest:         0,
  typingStart:  1300,
  typingEnd:    7600,
  generate:     8100,
  thinkingEnd:  13800,
  flyerReveal:  13800,
  flyerHoldEnd: 17300,   // flyer rests on screen for 3.5s
  slideEnd:     18400,   // 1.1s slide-left / slide-in
  socialHoldEnd: 21300,  // 2.9s rest on socials
  end:          21500,
};
const DT_LOOP_HOLD = 1200;

function DesignDemo() {
  const [t, setT] = React.useState(0);
  const rafRef = React.useRef(null);
  const startRef = React.useRef(null);

  React.useEffect(() => {
    startRef.current = performance.now();
    const tick = (now) => {
      const elapsed = now - startRef.current;
      if (elapsed < DT.end) {
        setT(elapsed);
      } else if (elapsed < DT.end + DT_LOOP_HOLD) {
        setT(DT.end);
      } else {
        startRef.current = now;
        setT(0);
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const typedChars = Math.max(0, Math.min(DESIGN_PROMPT.length, dCharsAt(t - DT.typingStart)));
  const typedText = DESIGN_PROMPT.slice(0, typedChars);
  const showCaret = t >= DT.typingStart && t < DT.generate;
  const isThinking = t >= DT.generate && t < DT.thinkingEnd;
  const showBrief = t < DT.generate;
  const showAssets = t >= DT.flyerReveal;
  const generateActive = t >= DT.generate && t < DT.generate + 220;

  return (
    <div style={{
      position: 'absolute', inset: 0,
      background: '#f5f0e6',
      overflow: 'hidden',
      fontFamily: 'var(--ui-font)',
    }}>
      {showBrief && (
        <BriefStage
          t={t}
          typedText={typedText}
          showCaret={showCaret}
          generateActive={generateActive}
        />
      )}
      {isThinking && <DesignThinking t={t} />}
      {showAssets && <AssetsReveal t={t} />}

      <style>{`
        @keyframes dd-blink {
          0%, 49% { opacity: 1; }
          50%, 100% { opacity: 0; }
        }
        @keyframes dd-spark {
          0%, 100% { transform: scale(1) rotate(0deg); opacity: 0.9; }
          50%      { transform: scale(1.25) rotate(180deg); opacity: 1; }
        }
        @keyframes dd-status-in {
          from { opacity: 0; transform: translateY(3px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

function BriefStage({ t, typedText, showCaret, generateActive }) {
  const beforeTyping = t < DT.typingStart;
  return (
    <div style={{
      position: 'absolute', inset: 0,
      padding: '18px 22px',
      display: 'grid', gridTemplateColumns: '0.95fr 1.05fr', gap: 22,
      opacity: t >= DT.generate ? 0 : 1,
      transition: 'opacity 280ms ease-out',
    }}>
      {/* Left column — header + format chips */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <div>
          <div style={{
            fontFamily: 'var(--serif-font)', fontSize: 22, fontWeight: 600,
            color: '#1d3a32', letterSpacing: '-0.015em', marginBottom: 3,
          }}>Design Brief</div>
          <div style={{
            fontSize: 11.5, color: 'rgba(26,36,32,0.55)', lineHeight: 1.4,
          }}>
            Tell ClubChat what you need and what format to deliver.
          </div>
        </div>
        <div>
          <div style={{
            fontSize: 9.5, letterSpacing: '0.16em', color: 'rgba(26,36,32,0.5)',
            fontFamily: 'var(--mono-font)', fontWeight: 600, marginBottom: 7,
          }}>FORMAT</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 6 }}>
            {[
              { label: 'Instagram Post', active: true },
              { label: 'Story / Reel', active: true },
              { label: 'Facebook Post' },
              { label: 'Email Header' },
              { label: 'Flyer / Print', active: true },
              { label: 'Save the Date' },
            ].map((fmt, i) => <FormatChip key={i} {...fmt} />)}
          </div>
        </div>
      </div>

      {/* Right column — prompt + button */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, minHeight: 0 }}>
        <div style={{
          fontSize: 9.5, letterSpacing: '0.16em', color: 'rgba(26,36,32,0.5)',
          fontFamily: 'var(--mono-font)', fontWeight: 600,
        }}>PROMPT</div>
        <div style={{
          flex: 1, padding: '12px 14px', borderRadius: 8,
          background: '#ffffff',
          border: '1px solid rgba(26,36,32,0.1)',
          boxShadow: showCaret
            ? '0 0 0 2px rgba(201,141,42,0.18), 0 2px 6px rgba(26,36,32,0.04)'
            : '0 1px 2px rgba(26,36,32,0.03)',
          fontSize: 13, lineHeight: 1.55,
          color: '#1a2420',
          transition: 'box-shadow 200ms',
          minHeight: 0,
        }}>
          {beforeTyping ? (
            <span style={{ color: 'rgba(26,36,32,0.35)' }}>
              Describe the image you want to create…
            </span>
          ) : (
            <React.Fragment>
              {typedText}
              {showCaret && (
                <span style={{
                  display: 'inline-block', width: 2, height: 15,
                  background: '#1a2420', marginLeft: 2,
                  verticalAlign: '-2px',
                  animation: 'dd-blink 1100ms steps(2, end) infinite',
                }} />
              )}
            </React.Fragment>
          )}
        </div>
        <button style={{
          padding: '10px 0', borderRadius: 8,
          background: generateActive ? '#c98d2a' : '#1d3a32',
          color: '#f0ead8', border: 'none',
          fontSize: 11, fontFamily: 'var(--mono-font)',
          letterSpacing: '0.12em', fontWeight: 700,
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          transform: generateActive ? 'scale(0.97)' : 'scale(1)',
          transition: 'transform 180ms, background 180ms',
          boxShadow: '0 4px 12px rgba(29,58,50,0.18)',
          cursor: 'pointer',
        }}>
          <span style={{ fontSize: 12 }}>✦</span>
          GENERATE
        </button>
      </div>
    </div>
  );
}

function FormatChip({ label, active }) {
  return (
    <div style={{
      padding: '10px 8px 9px',
      background: active ? 'rgba(201,141,42,0.12)' : '#ffffff',
      border: active
        ? '1.5px solid rgba(201,141,42,0.75)'
        : '1px solid rgba(26,36,32,0.1)',
      borderRadius: 8,
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      gap: 6,
    }}>
      <div style={{
        width: 20, height: 20, borderRadius: 4,
        background: active ? '#c98d2a' : 'rgba(93, 121, 105, 0.7)',
      }} />
      <div style={{
        fontSize: 10, color: active ? '#8a5e1a' : 'rgba(26,36,32,0.7)',
        fontWeight: active ? 600 : 500,
        letterSpacing: '-0.005em',
        textAlign: 'center',
      }}>{label}</div>
    </div>
  );
}

function DesignThinking({ t }) {
  const dur = DT.thinkingEnd - DT.generate;
  const p = Math.max(0, Math.min(1, (t - DT.generate) / dur));

  const stages = [
    { at: 0.00, label: 'READING BRAND GUIDELINES…' },
    { at: 0.20, label: 'PULLING EVENTS FROM CALENDAR…' },
    { at: 0.44, label: 'COMPOSING FLYER LAYOUT…' },
    { at: 0.68, label: 'ADAPTING FOR SOCIAL FORMATS…' },
  ];
  let activeStage = stages[0];
  for (const s of stages) if (p >= s.at) activeStage = s;

  // Visual: a flyer being laid out — header, hero image, several event rows
  const blockEnd = 0.92;
  const blockWindow = 0.20;
  const blockProgress = (i, n = 7) => {
    const startAt = (i / n) * (blockEnd - blockWindow);
    return Math.max(0, Math.min(1, (p - startAt) / blockWindow));
  };

  return (
    <div style={{
      position: 'absolute', inset: 0,
      background: 'rgba(245, 240, 230, 0.97)',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      gap: 22, padding: 24,
      zIndex: 5,
    }}>
      {/* Flyer canvas being built */}
      <div style={{
        width: 180, height: 244,
        background: '#fcfaf4',
        borderRadius: 8,
        border: '1px solid rgba(26,36,32,0.08)',
        boxShadow: '0 10px 26px rgba(26,36,32,0.08)',
        padding: '12px 14px',
        display: 'flex', flexDirection: 'column', gap: 6,
        position: 'relative',
      }}>
        {/* Logo + masthead line */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <div style={{
            width: 14, height: 14, borderRadius: '50%',
            background: '#1d3a32',
            opacity: blockProgress(0),
            transform: `scale(${0.6 + blockProgress(0) * 0.4})`,
            transition: 'all 240ms',
            flexShrink: 0,
          }} />
          <div style={{
            height: 6, borderRadius: 2,
            background: '#1d3a32',
            width: `${blockProgress(0) * 70}%`,
            opacity: blockProgress(0) * 0.9,
            transition: 'width 240ms ease-out',
          }} />
        </div>
        {/* Title */}
        <div style={{
          height: 16, borderRadius: 2,
          background: '#1d3a32',
          width: `${blockProgress(1) * 95}%`,
          opacity: blockProgress(1) * 0.95,
          transition: 'width 280ms ease-out',
          marginTop: 4,
        }} />
        {/* Hero image placeholder */}
        <div style={{
          height: 78, borderRadius: 4,
          background: 'linear-gradient(135deg, #4a7a6a 0%, #1d3a32 60%, #c98d2a 100%)',
          opacity: blockProgress(2),
          transform: `scale(${0.96 + blockProgress(2) * 0.04})`,
          transformOrigin: 'top left',
          transition: 'opacity 340ms, transform 340ms',
          marginTop: 4,
        }} />
        {/* Event rows */}
        {[3, 4, 5, 6].map((i) => (
          <div key={i} style={{ display: 'flex', gap: 7, alignItems: 'center', marginTop: 2 }}>
            <div style={{
              width: 12, height: 12, borderRadius: '50%',
              background: '#1d3a32', color: '#f0ead8',
              fontSize: 7, fontWeight: 700,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              opacity: blockProgress(i) * 0.95,
              transform: `scale(${0.7 + blockProgress(i) * 0.3})`,
              transition: 'all 240ms',
              flexShrink: 0,
            }}>{i - 2}</div>
            <div style={{ flex: 1 }}>
              <div style={{
                height: 4, borderRadius: 2,
                background: '#c98d2a',
                width: `${blockProgress(i) * (i === 3 ? 30 : i === 4 ? 35 : i === 5 ? 28 : 32)}%`,
                opacity: blockProgress(i) * 0.9,
                transition: 'width 260ms ease-out',
                marginBottom: 3,
              }} />
              <div style={{
                height: 4, borderRadius: 2,
                background: 'rgba(26,36,32,0.2)',
                width: `${blockProgress(i) * (i === 3 ? 85 : i === 4 ? 72 : i === 5 ? 90 : 78)}%`,
                transition: 'width 260ms ease-out',
              }} />
            </div>
          </div>
        ))}
      </div>

      {/* Status pill */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 9,
        padding: '8px 16px', borderRadius: 999,
        background: '#1d3a32',
        boxShadow: '0 6px 16px rgba(29, 58, 50, 0.25)',
      }}>
        <span style={{
          display: 'inline-block', fontSize: 13, color: '#c98d2a',
          animation: 'dd-spark 1400ms ease-in-out infinite',
          transformOrigin: 'center',
        }}>✦</span>
        <span key={activeStage.label} style={{
          fontSize: 9.5, letterSpacing: '0.14em',
          color: '#f0ead8', fontFamily: 'var(--mono-font)', fontWeight: 600,
          animation: 'dd-status-in 320ms ease-out',
        }}>
          {activeStage.label}
        </span>
      </div>
    </div>
  );
}

// Eased 0..1 for the slide-out / slide-in transition
function easeInOut(p) {
  return p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;
}

function AssetsReveal({ t }) {
  // Phase progress
  const slideDur = DT.slideEnd - DT.flyerHoldEnd;
  const slideRaw = (t - DT.flyerHoldEnd) / slideDur;
  const slideP = easeInOut(Math.max(0, Math.min(1, slideRaw)));

  // Flyer reveal (fade + lift) for first 600ms of the reveal phase
  const enterRaw = (t - DT.flyerReveal) / 600;
  const enterP = Math.max(0, Math.min(1, enterRaw));

  // Flyer translates from 0 → -120% on slide phase
  const flyerX = -slideP * 120;
  // Socials translate from +110% → 0
  const socialsX = (1 - slideP) * 110;

  return (
    <div style={{
      position: 'absolute', inset: 0,
      padding: 18,
      background: '#f5f0e6',
      overflow: 'hidden',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <div style={{
        position: 'relative',
        width: '100%', height: '100%',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        {/* FLYER */}
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: `translate(calc(-50% + ${flyerX}%), -50%) translateY(${(1 - enterP) * 14}px)`,
          opacity: enterP,
          transition: 'opacity 360ms ease-out',
          willChange: 'transform, opacity',
        }}>
          <AssetCard
            src="assets/flyer-golf-events.png"
            label="FLYER · LETTER"
            height={258}
            aspect={8.5 / 11}
          />
        </div>

        {/* SOCIAL PAIR — matched height for even visual rhythm */}
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: `translate(calc(-50% + ${socialsX}%), -50%)`,
          display: 'flex', gap: 22,
          alignItems: 'flex-start',
          opacity: slideP > 0 ? 1 : 0,
          willChange: 'transform',
        }}>
          <AssetCard
            src="assets/social-square.png"
            label="IG POST · 1:1"
            height={224}
            aspect={1}
            delay={0}
            slideP={slideP}
          />
          <AssetCard
            src="assets/social-story.png"
            label="STORY · 4:5"
            height={224}
            aspect={1122 / 1402}
            delay={1}
            slideP={slideP}
          />
        </div>
      </div>
    </div>
  );
}

function AssetCard({ src, label, width, height, aspect, delay = 0, slideP }) {
  // Small staggered pop-in once the card is on stage
  const pop = slideP === undefined ? 1 :
    Math.max(0, Math.min(1, (slideP - 0.45 - delay * 0.12) / 0.35));
  // Either dimension can be supplied; the other is derived from aspect.
  const h = height !== undefined ? height : width / aspect;
  const w = width !== undefined ? width : height * aspect;

  return (
    <div style={{
      display: 'flex', flexDirection: 'column', gap: 7,
      transform: `translateY(${(1 - pop) * 8}px)`,
      opacity: slideP === undefined ? 1 : (0.5 + pop * 0.5),
      transition: 'opacity 200ms, transform 200ms',
    }}>
      <div style={{
        width: w, height: h,
        background: '#fff',
        borderRadius: 6,
        overflow: 'hidden',
        boxShadow: '0 12px 28px rgba(26,36,32,0.18), 0 0 0 1px rgba(26,36,32,0.08)',
      }}>
        <img
          src={src}
          alt=""
          style={{
            display: 'block',
            width: '100%', height: '100%',
            objectFit: 'cover',
          }}
        />
      </div>
      <div style={{
        fontSize: 8.5, letterSpacing: '0.14em',
        color: 'rgba(26,36,32,0.55)',
        fontFamily: 'var(--mono-font)', fontWeight: 600,
        textAlign: 'center',
      }}>{label}</div>
    </div>
  );
}

Object.assign(window, { DesignDemo });
