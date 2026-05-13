// ClubChat AI Assistant — hero animation
// Story: at rest, the AI Assistant dashboard shows greeting + 4 starter cards.
// User types "What all can you help me with?" into the large bottom input.
// On send, the greeting fades and the AI streams in 7 capability cards in order.

const PROMPT_TEXT = "What all can you help me with?";
const INTRO_TEXT = "Absolutely \u2014 I can help with all of those. Here\u2019s the full menu:";

// The streamed response after the intro. Each item renders as a bulleted line:
// **Title:** body.  These get typed out continuously like a chat reply.
const BULLETS = [
  { title: 'Email & Text Campaigns',   body: 'Draft & distribute personalized communications to members.' },
  { title: 'Members & Engagement',     body: 'Track member activity, engagement levels, and who may need attention.' },
  { title: 'Events & Calendar',        body: 'Create and manage club events and registrations.' },
  { title: 'Leads & CRM',              body: 'Manage prospects, update lead statuses, and monitor your pipeline.' },
  { title: 'Forms & Submissions',      body: 'Build hosted forms for RSVPs, surveys, and more in seconds.' },
  { title: 'Social Media Drafting',    body: 'Create social post drafts and content ideas for review.' },
  { title: 'Newsletter Landing Pages', body: 'Turn newsletter PDFs into shareable hosted web pages.' },
];

// Cadence — characters per second for the streaming AI reply. Tuned to feel
// like a thoughtful chat reply, not instant.
const STREAM_CPS = 75;

// Build a per-char cumulative-ms typing timeline with human-feeling cadence.
function buildTyping(text, opts = {}) {
  const { base = 60, wobble = 18, spacePad = 35, punctPad = 200, beats = {} } = opts;
  const out = [0];
  let cum = 0;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    let delay = base + Math.sin(i * 1.9) * wobble + Math.sin(i * 0.7) * 10;
    if (ch === ' ') delay += spacePad;
    if (ch === ',' || ch === '.' || ch === '?' || ch === '!' || ch === '\u2014') delay += punctPad;
    if (beats[i]) delay += beats[i];
    cum += Math.max(20, delay);
    out.push(cum);
  }
  return out;
}

const PROMPT_TIMELINE = buildTyping(PROMPT_TEXT, { beats: { 8: 240 } });

function charsTypedAt(timeline, elapsed) {
  let n = 0;
  for (let i = 1; i < timeline.length; i++) {
    if (timeline[i] <= elapsed) n = i; else break;
  }
  return n;
}

// Total characters in the streamed reply (intro + bulleted list).
// Title + ": " + body for each bullet.
const REPLY_TOTAL_CHARS =
  INTRO_TEXT.length +
  BULLETS.reduce((sum, b) => sum + b.title.length + 2 + b.body.length, 0);
const REPLY_DUR = (REPLY_TOTAL_CHARS / STREAM_CPS) * 1000;

// Timeline (ms) — looping demo
const T = {
  rest:          0,
  cursorIn:      1200,
  inputFocus:    2000,
  typingStart:   2300,
  typingEnd:     5200,
  sendActive:    5700,
  send:          5800,
  thinkPause:    5800,   // brief thinking dots before AI reply
  introStart:    6500,   // AI starts typing intro line
  // intro typing runs from introStart for INTRO_DUR
  cap1:          6500 + INTRO_DUR + 350,
  cap2:          6500 + INTRO_DUR + 350 + 750,
  cap3:          6500 + INTRO_DUR + 350 + 1500,
  cap4:          6500 + INTRO_DUR + 350 + 2250,
  cap5:          6500 + INTRO_DUR + 350 + 3000,
  cap6:          6500 + INTRO_DUR + 350 + 3750,
  cap7:          6500 + INTRO_DUR + 350 + 4500,
  end:           6500 + INTRO_DUR + 350 + 4500 + 4200,
};

const LOOP_HOLD = 1600;

const CAPABILITIES = [
  { icon: 'mail',    title: 'Email & Text Campaigns',     body: 'Draft & distribute personalized communications to members.' },
  { icon: 'people',  title: 'Members & Engagement',       body: 'Track member activity, engagement levels, and who may need attention.' },
  { icon: 'cal',     title: 'Events & Calendar',          body: 'Create and manage club events and registrations.' },
  { icon: 'leads',   title: 'Leads & CRM',                body: 'Manage prospects, update lead statuses, and monitor your pipeline.' },
  { icon: 'form',    title: 'Forms & Submissions',        body: 'Build hosted forms for RSVPs, surveys, and more in seconds.' },
  { icon: 'share',   title: 'Social Media Drafting',      body: 'Create social post drafts and content ideas for review.' },
  { icon: 'page',    title: 'Newsletter Landing Pages',   body: 'Turn newsletter PDFs into shareable hosted web pages.' },
];

function AnimatedAssistant() {
  const [t, setT] = React.useState(0);
  const rafRef = React.useRef(null);
  const startRef = React.useRef(null);

  React.useEffect(() => {
    const startTimer = setTimeout(() => {
      startRef.current = performance.now();
      const tick = (now) => {
        const elapsed = now - startRef.current;
        if (elapsed < T.end) {
          setT(elapsed);
          rafRef.current = requestAnimationFrame(tick);
        } else if (elapsed < T.end + LOOP_HOLD) {
          setT(T.end);
          rafRef.current = requestAnimationFrame(tick);
        } else {
          startRef.current = now;
          setT(0);
          rafRef.current = requestAnimationFrame(tick);
        }
      };
      rafRef.current = requestAnimationFrame(tick);
    }, 1200);
    return () => {
      clearTimeout(startTimer);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const sent = t >= T.send;
  const showCursor =
    (t >= T.cursorIn && t < T.send + 200);

  return (
    <div style={{
      width: '100%', maxWidth: 1020, height: 600, display: 'flex',
      background: '#f5f0e6', borderRadius: 10, overflow: 'hidden',
      fontFamily: 'var(--ui-font)',
      boxShadow: '0 40px 90px rgba(0,0,0,0.3), 0 0 0 1px rgba(26, 36, 32, 0.1)',
      position: 'relative',
    }}>
      <AssistantSidebar t={t} />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
        <AssistantTopBar />

        {/* Stage A — greeting + starter cards (rests + then fades up on send) */}
        <div style={{
          position: 'absolute',
          top: 56, left: 0, right: 0, bottom: 110,
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          padding: '0 40px',
          opacity: sent ? 0 : 1,
          transform: sent ? 'translateY(-18px)' : 'translateY(0)',
          transition: 'opacity 500ms ease-out, transform 500ms ease-out',
          pointerEvents: 'none',
        }}>
          <GreetingView />
        </div>

        {/* Stage B — chat thread (user bubble + AI capability list) */}
        <div style={{
          position: 'absolute',
          top: 56, left: 0, right: 0, bottom: 110,
          padding: '14px 32px 0',
          overflow: 'hidden',
          opacity: sent ? 1 : 0,
          transform: sent ? 'translateY(0)' : 'translateY(14px)',
          transition: 'opacity 400ms ease-out 120ms, transform 400ms ease-out 120ms',
        }}>
          <style>{`.cc-thread::-webkit-scrollbar { display: none; }`}</style>
          <ChatThread t={t} />
        </div>

        {/* Bottom input bar — always visible */}
        <div style={{
          position: 'absolute', left: 0, right: 0, bottom: 0,
          padding: '14px 24px 22px',
        }}>
          <InputBar t={t} />
        </div>
      </div>

      <Cursor t={t} visible={showCursor} />
    </div>
  );
}

// --- Cursor ---------------------------------------------------------
function Cursor({ t, visible }) {
  let x = 92, y = 92;
  if (t < T.cursorIn) { x = 92; y = 92; }
  else if (t < T.sendActive) { x = 52; y = 90; }
  else { x = 94; y = 90; }

  return (
    <div style={{
      position: 'absolute', left: `${x}%`, top: `${y}%`,
      width: 18, height: 22,
      transform: 'translate(-4px, -2px)',
      transition: 'left 700ms cubic-bezier(0.4, 0, 0.2, 1), top 700ms cubic-bezier(0.4, 0, 0.2, 1), opacity 300ms',
      opacity: visible ? 1 : 0,
      pointerEvents: 'none',
      zIndex: 30,
      filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.25))',
    }}>
      <svg width="18" height="22" viewBox="0 0 18 22">
        <path d="M2 2L2 17L6 13L9 20L12 19L9 12L14 12L2 2Z"
              fill="#f5f0e6" stroke="#0f2420" strokeWidth="1"/>
      </svg>
    </div>
  );
}

// --- Sidebar --------------------------------------------------------
function AssistantSidebar({ t }) {
  const navItems = [
    { icon: 'home', label: 'Dashboard' },
    { icon: 'spark', label: 'AI Assistant', alwaysActive: true },
    { icon: 'globe', label: 'Website' },
    { icon: 'cal', label: 'Calendar' },
  ];
  const commItems = [
    { icon: 'mail', label: 'Email' },
    { icon: 'chat', label: 'Text Messages' },
    { icon: 'share', label: 'Social Media' },
    { icon: 'book', label: 'Newsletter Pages' },
  ];

  return (
    <aside style={{
      width: 220, background: '#0f2420', color: '#e8e6df',
      padding: '18px 0 14px', display: 'flex', flexDirection: 'column',
      flexShrink: 0,
    }}>
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '2px 18px 22px', gap: 10,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
          <img src="assets/clubchat-logo.svg" alt="ClubChat" style={{ width: 26, height: 26, display: 'block' }} />
          <div style={{
            fontFamily: 'var(--serif-font)', fontSize: 18.5,
            color: '#f0ead8', fontWeight: 600, letterSpacing: '-0.01em',
          }}>ClubChat</div>
        </div>
        <div style={{
          width: 22, height: 22, color: 'rgba(240, 234, 216, 0.4)',
          fontSize: 14, display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>‹</div>
      </div>

      <nav style={{ flex: 1, overflowY: 'auto' }}>
        {navItems.map((n, i) => (
          <NavRow key={i} icon={n.icon} label={n.label} active={n.alwaysActive} />
        ))}

        <GroupHeading label="COMMUNICATION" />
        {commItems.map((n, i) => (
          <NavRow key={i} icon={n.icon} label={n.label} indent />
        ))}

        <GroupHeading label="MEMBERSHIP" />
        <GroupHeading label="CONTENT" />
      </nav>
    </aside>
  );
}

function NavRow({ icon, label, active }) {
  return (
    <div style={{
      margin: '2px 8px', padding: '9px 10px',
      paddingLeft: active ? 9 : 11,
      display: 'flex', alignItems: 'center', gap: 11,
      borderRadius: 5,
      background: active ? '#1d3a32' : 'transparent',
      borderLeft: active ? '2px solid #5a8a6b' : '2px solid transparent',
      fontSize: 13,
      color: active ? '#f0ead8' : 'rgba(240, 234, 216, 0.78)',
      fontWeight: active ? 500 : 400,
    }}>
      <SidebarIcon name={icon} active={active} />
      <span>{label}</span>
    </div>
  );
}

function GroupHeading({ label }) {
  return (
    <div style={{
      padding: '16px 18px 8px',
      fontSize: 10, letterSpacing: '0.15em',
      color: 'rgba(240, 234, 216, 0.4)',
      fontFamily: 'var(--ui-font)', fontWeight: 600,
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    }}>
      {label} <span style={{ fontSize: 11 }}>›</span>
    </div>
  );
}

// --- Top bar --------------------------------------------------------
function AssistantTopBar() {
  return (
    <div style={{
      padding: '14px 28px', display: 'flex',
      justifyContent: 'space-between', alignItems: 'center',
      position: 'relative', zIndex: 5,
      height: 56,
    }}>
      <div style={{
        padding: '6px 14px', borderRadius: 999,
        background: 'rgba(201, 141, 42, 0.12)', color: '#a36f1e',
        fontSize: 10.5, letterSpacing: '0.14em',
        fontFamily: 'var(--mono-font)', fontWeight: 600,
        display: 'flex', alignItems: 'center', gap: 7,
      }}>
        <span style={{ fontSize: 11 }}>✦</span>
        AI ASSISTANT
      </div>
      <div style={{
        position: 'relative', width: 34, height: 34,
        background: '#1d3a32', borderRadius: 7,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: '#f0ead8',
      }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
        </svg>
        <span style={{
          position: 'absolute', top: -4, right: -4,
          width: 18, height: 18, borderRadius: '50%',
          background: '#0f2420', color: '#f0ead8',
          fontSize: 10, fontWeight: 600,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: 'var(--ui-font)',
        }}>17</span>
      </div>
    </div>
  );
}

// --- Greeting + starter cards (rest state) --------------------------
function GreetingView() {
  const cards = [
    { icon: 'mail', title: 'Email Marketing',
      body: 'Create branded, engaging email campaigns tailored to your members.' },
    { icon: 'doc', title: 'Social Content',
      body: 'Generate compelling social media posts and club announcements.' },
    { icon: 'cal', title: 'Event Planning',
      body: 'Plan and promote club events with AI-powered assistance.' },
    { icon: 'chart', title: 'Analytics & Insights',
      body: 'Get actionable, data-driven recommendations for growth.' },
  ];

  return (
    <>
      <h2 style={{
        fontFamily: 'var(--serif-font)', fontSize: 40, lineHeight: 1.1,
        color: '#1a2420', margin: 0, fontWeight: 600,
        letterSpacing: '-0.02em', textAlign: 'center',
      }}>
        Good morning, <em style={{ color: '#c98d2a', fontStyle: 'italic', fontWeight: 700 }}>Pebble Shores.</em>
      </h2>
      <p style={{
        fontSize: 14, color: 'rgba(26, 36, 32, 0.6)',
        margin: '10px 0 0', textAlign: 'center',
      }}>
        Your AI assistant for operations, communications, and event planning.
      </p>

      <div style={{
        display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14,
        marginTop: 32, maxWidth: 640, width: '100%',
      }}>
        {cards.map((c, i) => (
          <div key={i} style={{
            padding: '16px 18px', background: '#ffffff',
            border: '1px solid rgba(26, 36, 32, 0.08)',
            borderRadius: 10,
            display: 'flex', alignItems: 'center', gap: 14,
            boxShadow: '0 1px 2px rgba(26, 36, 32, 0.03)',
          }}>
            <div style={{
              width: 40, height: 40, borderRadius: 8, background: '#f5f0e6',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#1d3a32', flexShrink: 0,
            }}>
              <CardIcon name={c.icon} />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 13.5, color: '#1a2420', fontWeight: 600, marginBottom: 3 }}>
                {c.title}
              </div>
              <div style={{ fontSize: 11.5, color: 'rgba(26, 36, 32, 0.58)', lineHeight: 1.4 }}>
                {c.body}
              </div>
            </div>
            <div style={{ color: 'rgba(26, 36, 32, 0.3)', fontSize: 16, flexShrink: 0 }}>→</div>
          </div>
        ))}
      </div>

      <div style={{
        marginTop: 24, fontSize: 11, color: 'rgba(26, 36, 32, 0.4)',
        letterSpacing: '0.02em',
      }}>
        Type below to start chatting &nbsp;·&nbsp; drag & drop files to attach
      </div>
    </>
  );
}

// --- Chat thread (after send) --------------------------------------
function ChatThread({ t }) {
  const showThinking = t >= T.thinkPause && t < T.replyStart;
  // How many characters of the AI reply have streamed in so far.
  const streamed = t < T.replyStart
    ? 0
    : Math.min(REPLY_TOTAL_CHARS, Math.floor((t - T.replyStart) * STREAM_CPS / 1000));
  const stillStreaming = streamed > 0 && streamed < REPLY_TOTAL_CHARS;

  // Slice the streamed text into intro + per-bullet remaining chars.
  let remaining = streamed;
  const introVisible = Math.min(INTRO_TEXT.length, remaining);
  remaining -= introVisible;
  const introText = INTRO_TEXT.slice(0, introVisible);

  const bulletViews = BULLETS.map((b) => {
    const titleLen = b.title.length;
    const sepLen = 2; // ": "
    const bodyLen = b.body.length;
    const total = titleLen + sepLen + bodyLen;
    if (remaining <= 0) {
      return { started: false, title: '', sep: '', body: '' };
    }
    const titleChars = Math.min(titleLen, remaining);
    remaining -= titleChars;
    const sepChars = Math.min(sepLen, remaining);
    remaining -= sepChars;
    const bodyChars = Math.min(bodyLen, remaining);
    remaining -= bodyChars;
    return {
      started: true,
      title: b.title.slice(0, titleChars),
      sep: ': '.slice(0, sepChars),
      body: b.body.slice(0, bodyChars),
      complete: titleChars + sepChars + bodyChars === total,
    };
  });

  // Keep the latest content in view as it streams.
  const scrollRef = React.useRef(null);
  React.useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [streamed]);

  return (
    <div ref={scrollRef} className="cc-thread" style={{
      height: '100%', overflowY: 'auto', overflowX: 'hidden',
      display: 'flex', flexDirection: 'column',
      gap: 14, paddingBottom: 12,
      scrollbarWidth: 'none',
    }}>
      {/* User bubble (right) */}
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <div style={{
          background: '#1d3a32', color: '#f0ead8',
          padding: '10px 16px', borderRadius: '14px 14px 4px 14px',
          fontSize: 15, fontFamily: 'var(--ui-font)',
          letterSpacing: '-0.005em',
          maxWidth: '70%',
          boxShadow: '0 1px 2px rgba(15, 36, 32, 0.18)',
        }}>
          {PROMPT_TEXT}
        </div>
      </div>

      {/* AI message — single bubble that streams: intro + bulleted list */}
      <div style={{
        display: 'flex', alignItems: 'flex-start', gap: 12,
      }}>
        <div style={{
          width: 28, height: 28, borderRadius: '50%',
          background: '#1d3a32', color: '#c98d2a',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 14, flexShrink: 0, marginTop: 2,
        }}>✦</div>

        <div style={{
          flex: 1, minWidth: 0,
          color: '#1a2420',
          fontFamily: 'var(--ui-font)',
          fontSize: 14, lineHeight: 1.55,
          letterSpacing: '-0.003em',
        }}>
          {showThinking ? (
            <ThinkingDots />
          ) : (
            <React.Fragment>
              {/* Intro paragraph */}
              {introText && (
                <div style={{ marginBottom: introVisible >= INTRO_TEXT.length ? 10 : 0 }}>
                  {introText}
                  {introVisible < INTRO_TEXT.length && <StreamCaret />}
                </div>
              )}

              {/* Bulleted list — appears once intro is finished */}
              {introVisible >= INTRO_TEXT.length && (
                <ul style={{
                  margin: 0, padding: 0, listStyle: 'none',
                  display: 'flex', flexDirection: 'column', gap: 8,
                }}>
                  {bulletViews.map((v, i) =>
                    v.started ? (
                      <li key={i} style={{
                        display: 'flex', alignItems: 'flex-start', gap: 10,
                      }}>
                        <span style={{
                          width: 5, height: 5, borderRadius: '50%',
                          background: '#c98d2a',
                          marginTop: 9, flexShrink: 0,
                        }} />
                        <span>
                          <strong style={{ color: '#1a2420', fontWeight: 700 }}>{v.title}</strong>
                          {v.sep}
                          <span style={{ color: 'rgba(26, 36, 32, 0.78)' }}>{v.body}</span>
                          {/* caret on the actively-streaming bullet */}
                          {stillStreaming && !v.complete && <StreamCaret />}
                        </span>
                      </li>
                    ) : null
                  )}
                </ul>
              )}
            </React.Fragment>
          )}
        </div>
      </div>
    </div>
  );
}

function StreamCaret() {
  return (
    <span style={{
      display: 'inline-block', width: 2, height: 16,
      background: '#1a2420', marginLeft: 2,
      verticalAlign: '-2px',
      animation: 'cc-blink 900ms steps(2, end) infinite',
    }} />
  );
}

function ThinkingDots() {
  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: 4,
      padding: '4px 2px',
    }}>
      {[0, 1, 2].map(i => (
        <span key={i} style={{
          width: 6, height: 6, borderRadius: '50%',
          background: 'rgba(26, 36, 32, 0.45)',
          animation: `cc-dot 1100ms ease-in-out ${i * 160}ms infinite`,
        }} />
      ))}
      <style>{`
        @keyframes cc-dot {
          0%, 80%, 100% { transform: translateY(0); opacity: 0.45; }
          40%           { transform: translateY(-3px); opacity: 1; }
        }
      `}</style>
    </div>
  );
}

function CapabilityRow({ cap, visible, justArrived }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'flex-start', gap: 11,
      padding: '7px 11px',
      background: '#ffffff',
      border: justArrived
        ? '1px solid rgba(201, 141, 42, 0.5)'
        : '1px solid rgba(26, 36, 32, 0.08)',
      borderRadius: 8,
      boxShadow: justArrived
        ? '0 4px 12px rgba(201, 141, 42, 0.12)'
        : '0 1px 2px rgba(26, 36, 32, 0.03)',
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : 'translateY(6px)',
      transition: 'opacity 320ms ease-out, transform 320ms ease-out, border-color 600ms, box-shadow 600ms',
    }}>
      <div style={{
        width: 26, height: 26, borderRadius: 6,
        background: '#f5f0e6',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: '#1d3a32', flexShrink: 0, marginTop: 1,
      }}>
        <CapIcon name={cap.icon} />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          fontSize: 13, color: '#1a2420', fontWeight: 600,
          letterSpacing: '-0.005em', marginBottom: 1,
        }}>
          {cap.title}
        </div>
        <div style={{
          fontSize: 11.5, color: 'rgba(26, 36, 32, 0.6)', lineHeight: 1.4,
        }}>
          {cap.body}
        </div>
      </div>
    </div>
  );
}

function CapIcon({ name }) {
  const common = { width: 16, height: 16, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.7, strokeLinecap: 'round', strokeLinejoin: 'round' };
  switch (name) {
    case 'mail': return <svg {...common}><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></svg>;
    case 'people': return <svg {...common}><circle cx="9" cy="8" r="3.5"/><path d="M3 20c0-3 2.7-5 6-5s6 2 6 5"/><circle cx="17" cy="9" r="2.5"/><path d="M15 15c2.5 0 6 1.4 6 4"/></svg>;
    case 'cal': return <svg {...common}><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/></svg>;
    case 'leads': return <svg {...common}><path d="M3 18l5-5 4 4 7-9"/><path d="M14 8h5v5"/></svg>;
    case 'form': return <svg {...common}><rect x="5" y="3" width="14" height="18" rx="2"/><path d="M9 8h6M9 12h6M9 16h4"/></svg>;
    case 'share': return <svg {...common}><circle cx="6" cy="12" r="2.5"/><circle cx="18" cy="6" r="2.5"/><circle cx="18" cy="18" r="2.5"/><path d="M8.5 10.5l7-3M8.5 13.5l7 3"/></svg>;
    case 'page': return <svg {...common}><path d="M6 3h9l4 4v14H6z"/><path d="M15 3v5h4"/><path d="M9 13h6M9 17h4"/></svg>;
    default: return null;
  }
}

// --- Bottom input bar ----------------------------------------------
function InputBar({ t }) {
  const typedChars = Math.max(0, Math.min(
    PROMPT_TEXT.length,
    charsTypedAt(PROMPT_TIMELINE, t - T.typingStart)
  ));
  const typedText = t < T.typingStart ? '' : PROMPT_TEXT.slice(0, typedChars);
  const showCaret = t >= T.inputFocus && t < T.send;
  // After send, the input clears and goes back to placeholder.
  const afterSend = t >= T.send;
  const focused = t >= T.inputFocus && t < T.send;
  const sendActive = t >= T.sendActive && t < T.send;

  const displayText = afterSend ? '' : typedText;

  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 10,
      padding: '0 18px',
      height: 64,
      borderRadius: 12,
      background: '#ffffff',
      border: focused
        ? '1.5px solid rgba(201, 141, 42, 0.5)'
        : '1px solid rgba(26, 36, 32, 0.12)',
      boxShadow: focused
        ? '0 0 0 4px rgba(201, 141, 42, 0.10), 0 1px 2px rgba(26, 36, 32, 0.04)'
        : '0 1px 2px rgba(26, 36, 32, 0.03)',
      transition: 'border-color 220ms, box-shadow 220ms',
    }}>
      {/* attach */}
      <button style={{
        width: 28, height: 28, borderRadius: 6,
        background: 'transparent', border: 'none',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: 'rgba(26, 36, 32, 0.55)', cursor: 'pointer', flexShrink: 0,
      }}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 11.5l-9 9a5 5 0 0 1-7-7l9-9a3.5 3.5 0 0 1 5 5l-9 9a2 2 0 0 1-3-3l8-8"/>
        </svg>
      </button>

      {/* text */}
      <div style={{
        flex: 1, minWidth: 0,
        fontSize: 17, color: '#1a2420',
        fontFamily: 'var(--ui-font)',
        letterSpacing: '-0.005em',
        lineHeight: 1.3,
        whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
      }}>
        {displayText ? (
          <React.Fragment>
            {displayText}
            {showCaret && (
              <span style={{
                display: 'inline-block', width: 2, height: 20,
                background: '#1a2420', marginLeft: 2,
                verticalAlign: '-3px',
                animation: 'cc-blink 1100ms steps(2, end) infinite',
              }} />
            )}
          </React.Fragment>
        ) : (
          <span style={{ color: 'rgba(26, 36, 32, 0.38)' }}>
            Ask anything — create an email, plan an event, analyse engagement…
          </span>
        )}
      </div>

      {/* send */}
      <button style={{
        width: 38, height: 38, borderRadius: 9,
        background: displayText ? '#1d3a32' : 'rgba(26, 36, 32, 0.08)',
        border: 'none',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: displayText ? '#f0ead8' : 'rgba(26, 36, 32, 0.35)',
        cursor: 'pointer', flexShrink: 0,
        transform: sendActive ? 'scale(0.93)' : 'scale(1)',
        transition: 'transform 160ms, background 220ms, color 220ms',
        boxShadow: displayText ? '0 4px 10px rgba(29, 58, 50, 0.18)' : 'none',
      }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 2L11 13"/>
          <path d="M22 2L15 22l-4-9-9-4 20-7z"/>
        </svg>
      </button>

      <style>{`@keyframes cc-blink { 0%,49%{opacity:1;} 50%,100%{opacity:0;} }`}</style>
    </div>
  );
}

Object.assign(window, { AnimatedAssistant });
