// ClubChat AI Assistant dashboard mockup — hero product visual
// Matches the real product: forest-green sidebar, cream canvas, serif+italic greeting, 4 suggestion cards

function AIAssistant() {
  const navItems = [
    { icon: 'home', label: 'Dashboard', group: 'top' },
    { icon: 'spark', label: 'AI Assistant', group: 'top', active: true },
    { icon: 'globe', label: 'Website', group: 'top' },
    { icon: 'cal', label: 'Calendar', group: 'top' },
    { label: 'COMMUNICATION', group: 'heading', expandable: true },
    { icon: 'mail', label: 'Email', group: 'sub' },
    { icon: 'chat', label: 'Text Messages', group: 'sub' },
    { icon: 'share', label: 'Social Media', group: 'sub' },
    { icon: 'book', label: 'Newsletter Pages', group: 'sub' },
    { label: 'MEMBERSHIP', group: 'heading', expandable: true },
    { label: 'CONTENT', group: 'heading', expandable: true },
  ];

  const cards = [
    {
      icon: 'mail',
      title: 'Email Marketing',
      body: 'Create branded, engaging email campaigns tailored to your members.',
    },
    {
      icon: 'doc',
      title: 'Social Content',
      body: 'Generate compelling social media posts and club announcements.',
    },
    {
      icon: 'cal',
      title: 'Event Planning',
      body: 'Plan and promote club events with AI-powered assistance.',
    },
    {
      icon: 'chart',
      title: 'Analytics & Insights',
      body: 'Get actionable, data-driven recommendations for growth.',
    },
  ];

  return (
    <div style={{
      width: '100%', maxWidth: 1020, height: 600, display: 'flex',
      background: '#f5f0e6', borderRadius: 10, overflow: 'hidden',
      fontFamily: 'var(--ui-font)',
      boxShadow: '0 40px 90px rgba(0,0,0,0.3), 0 0 0 1px rgba(26, 36, 32, 0.1)',
    }}>
      {/* Sidebar */}
      <aside style={{
        width: 220, background: '#0f2420', color: '#e8e6df',
        padding: '18px 0 14px', display: 'flex', flexDirection: 'column',
        flexShrink: 0,
      }}>
        {/* Logo row */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '2px 18px 22px', gap: 10,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
            <img src="assets/clubchat-logo.svg" alt="ClubChat" style={{ width: 26, height: 26, display: 'block' }} />
            <div style={{
              fontFamily: 'var(--serif-font)', fontSize: 18.5,
              color: '#f0ead8', fontWeight: 500, letterSpacing: '-0.01em',
            }}>ClubChat</div>
          </div>
          <div style={{
            width: 22, height: 22, borderRadius: 4,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'rgba(240, 234, 216, 0.4)', fontSize: 14, cursor: 'pointer',
          }}>‹</div>
        </div>

        <nav style={{ flex: 1, overflowY: 'auto' }}>
          {navItems.map((n, i) => {
            if (n.group === 'heading') {
              return (
                <div key={i} style={{
                  padding: '16px 18px 8px',
                  fontSize: 10, letterSpacing: '0.15em',
                  color: 'rgba(240, 234, 216, 0.4)',
                  fontFamily: 'var(--ui-font)', fontWeight: 600,
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                }}>
                  {n.label}
                  <span style={{ fontSize: 11 }}>›</span>
                </div>
              );
            }
            return (
              <div key={i} style={{
                margin: '2px 8px', padding: '9px 10px',
                display: 'flex', alignItems: 'center', gap: 11,
                borderRadius: 5,
                background: n.active ? '#1d3a32' : 'transparent',
                borderLeft: n.active ? '2px solid #5a8a6b' : '2px solid transparent',
                paddingLeft: n.active ? 9 : 11,
                fontSize: 13,
                color: n.active ? '#f0ead8' : 'rgba(240, 234, 216, 0.78)',
                fontWeight: n.active ? 500 : 400,
                cursor: 'pointer',
              }}>
                <SidebarIcon name={n.icon} active={n.active} />
                <span>{n.label}</span>
              </div>
            );
          })}
        </nav>

        {/* Bottom */}
        <div style={{ padding: '8px 8px 4px', borderTop: '1px solid rgba(240, 234, 216, 0.08)' }}>
          {[
            { icon: 'gear', label: 'Settings' },
            { icon: 'out', label: 'Sign Out' },
          ].map((n, i) => (
            <div key={i} style={{
              margin: '2px 0', padding: '9px 10px',
              display: 'flex', alignItems: 'center', gap: 11,
              borderRadius: 5, fontSize: 13,
              color: 'rgba(240, 234, 216, 0.75)', cursor: 'pointer',
            }}>
              <SidebarIcon name={n.icon} />
              <span>{n.label}</span>
            </div>
          ))}
        </div>
      </aside>

      {/* Main */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', position: 'relative' }}>
        {/* Top bar */}
        <div style={{
          padding: '18px 28px', display: 'flex',
          justifyContent: 'space-between', alignItems: 'center',
        }}>
          <div style={{
            padding: '6px 14px', borderRadius: 999,
            background: 'rgba(201, 141, 42, 0.12)',
            color: '#a36f1e',
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
            }}>24</span>
          </div>
        </div>

        {/* Greeting + cards */}
        <div style={{
          flex: 1, display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          padding: '20px 40px 0',
        }}>
          <h2 style={{
            fontFamily: 'var(--serif-font)', fontSize: 40, lineHeight: 1.1,
            color: '#1a2420', margin: 0, fontWeight: 600,
            letterSpacing: '-0.02em', textAlign: 'center',
          }}>
            Good morning, <em style={{ color: '#c98d2a', fontStyle: 'italic', fontWeight: 700 }}>Pebble Shores.</em>
          </h2>
          <p style={{
            fontSize: 14, color: 'rgba(26, 36, 32, 0.6)',
            fontFamily: 'var(--ui-font)', margin: '10px 0 0',
            textAlign: 'center',
          }}>
            Your AI assistant for operations, communications, and event planning.
          </p>

          <div style={{
            display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14,
            marginTop: 34, maxWidth: 640, width: '100%',
          }}>
            {cards.map((c, i) => (
              <div key={i} style={{
                padding: '16px 18px', background: '#ffffff',
                border: '1px solid rgba(26, 36, 32, 0.08)',
                borderRadius: 10,
                display: 'flex', alignItems: 'center', gap: 14,
                cursor: 'pointer',
                boxShadow: '0 1px 2px rgba(26, 36, 32, 0.03)',
              }}>
                <div style={{
                  width: 40, height: 40, borderRadius: 8,
                  background: '#f5f0e6',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#1d3a32', flexShrink: 0,
                }}>
                  <CardIcon name={c.icon} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{
                    fontSize: 13.5, color: '#1a2420', fontWeight: 600,
                    fontFamily: 'var(--ui-font)', marginBottom: 3,
                    letterSpacing: '-0.005em',
                  }}>{c.title}</div>
                  <div style={{
                    fontSize: 11.5, color: 'rgba(26, 36, 32, 0.58)',
                    fontFamily: 'var(--ui-font)', lineHeight: 1.4,
                  }}>{c.body}</div>
                </div>
                <div style={{ color: 'rgba(26, 36, 32, 0.3)', fontSize: 16, flexShrink: 0 }}>→</div>
              </div>
            ))}
          </div>

          <div style={{
            marginTop: 32, fontSize: 11, color: 'rgba(26, 36, 32, 0.4)',
            fontFamily: 'var(--ui-font)', letterSpacing: '0.02em',
          }}>
            Type below to start chatting &nbsp;·&nbsp; drag & drop files to attach
          </div>
        </div>

        {/* Composer */}
        <div style={{
          padding: '18px 40px 22px',
          borderTop: '1px solid rgba(26, 36, 32, 0.06)',
          background: 'rgba(255, 255, 255, 0.5)',
        }}>
          <div style={{
            maxWidth: 680, margin: '0 auto',
            display: 'flex', alignItems: 'center', gap: 10,
            padding: '10px 14px', background: '#ffffff',
            border: '1px solid rgba(26, 36, 32, 0.12)',
            borderRadius: 999,
            boxShadow: '0 2px 10px rgba(26, 36, 32, 0.04)',
          }}>
            <span style={{ color: 'rgba(26, 36, 32, 0.45)', fontSize: 15 }}>📎</span>
            <input
              readOnly
              value="Ask anything — create an email, plan an event, analyse engagement…"
              style={{
                flex: 1, border: 'none', outline: 'none', background: 'transparent',
                fontSize: 13.5, color: 'rgba(26, 36, 32, 0.5)',
                fontFamily: 'var(--ui-font)',
              }}
            />
            <div style={{
              width: 28, height: 28, borderRadius: '50%',
              background: '#1d3a32', color: '#f0ead8',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 13,
            }}>↗</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SidebarIcon({ name, active }) {
  const stroke = active ? '#f0ead8' : 'rgba(240, 234, 216, 0.75)';
  const common = { width: 15, height: 15, viewBox: '0 0 24 24', fill: 'none', stroke, strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round' };
  switch (name) {
    case 'home': return <svg {...common}><path d="M3 12l9-9 9 9"/><path d="M5 10v10h14V10"/></svg>;
    case 'spark': return <svg {...common}><path d="M12 3l1.8 4.2L18 9l-4.2 1.8L12 15l-1.8-4.2L6 9l4.2-1.8z"/><path d="M19 15l.9 2.1L22 18l-2.1.9L19 21l-.9-2.1L16 18l2.1-.9z"/></svg>;
    case 'globe': return <svg {...common}><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 3 4 6 4 9s-1.5 6-4 9c-2.5-3-4-6-4-9s1.5-6 4-9z"/></svg>;
    case 'cal': return <svg {...common}><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/></svg>;
    case 'mail': return <svg {...common}><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></svg>;
    case 'chat': return <svg {...common}><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>;
    case 'share': return <svg {...common}><circle cx="6" cy="12" r="3"/><circle cx="18" cy="6" r="3"/><circle cx="18" cy="18" r="3"/><path d="M8.5 10.5l7-3M8.5 13.5l7 3"/></svg>;
    case 'book': return <svg {...common}><path d="M4 4h12a3 3 0 0 1 3 3v13H7a3 3 0 0 1-3-3V4z"/><path d="M4 17h15"/></svg>;
    case 'gear': return <svg {...common}><circle cx="12" cy="12" r="3"/><path d="M19 12a7 7 0 0 0-.1-1.2l2-1.5-2-3.5-2.4 1a7 7 0 0 0-2-1.2L14 3h-4l-.5 2.6a7 7 0 0 0-2 1.2l-2.4-1-2 3.5 2 1.5A7 7 0 0 0 5 12c0 .4 0 .8.1 1.2l-2 1.5 2 3.5 2.4-1a7 7 0 0 0 2 1.2L10 21h4l.5-2.6a7 7 0 0 0 2-1.2l2.4 1 2-3.5-2-1.5c.1-.4.1-.8.1-1.2z"/></svg>;
    case 'out': return <svg {...common}><path d="M10 17l-5-5 5-5M5 12h13M13 4h5v16h-5"/></svg>;
    default: return <svg {...common}><circle cx="12" cy="12" r="2"/></svg>;
  }
}

function CardIcon({ name }) {
  const common = { width: 18, height: 18, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.6, strokeLinecap: 'round', strokeLinejoin: 'round' };
  switch (name) {
    case 'mail': return <svg {...common}><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></svg>;
    case 'doc': return <svg {...common}><path d="M6 3h9l4 4v14H6z"/><path d="M15 3v5h4M9 13h6M9 17h6"/></svg>;
    case 'cal': return <svg {...common}><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/></svg>;
    case 'chart': return <svg {...common}><path d="M4 19l6-7 4 4 6-8"/><path d="M14 8h6v6"/></svg>;
    default: return null;
  }
}

Object.assign(window, { AIAssistant });
