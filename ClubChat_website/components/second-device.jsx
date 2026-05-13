// Secondary device shot — cream panel matching dashboard

function SecondDevice({ activeFeature = 'summarize' }) {
  const features = {
    summarize: {
      title: 'Summarize thread',
      content: (
        <>
          <div style={{ fontSize: 10.5, letterSpacing: '0.1em', color: '#a36f1e', fontFamily: 'var(--mono-font)', marginBottom: 10, fontWeight: 600 }}>
            ✦ THREAD SUMMARY · 48 messages
          </div>
          <div style={{ fontSize: 13, lineHeight: 1.55, color: '#1a2420', fontFamily: 'var(--ui-font)', marginBottom: 12 }}>
            Board discussed the <strong>cart path policy</strong> for holes 14–18. Consensus: keep cart-path-only until May 1, reassess based on turf recovery. Marcus to send formal memo Friday.
          </div>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {['decision made', 'action · Marcus', 'deadline · May 1'].map(t => (
              <span key={t} style={{
                fontSize: 10, padding: '3px 7px', borderRadius: 3,
                background: 'rgba(201, 141, 42, 0.14)', color: '#a36f1e',
                fontFamily: 'var(--mono-font)', letterSpacing: '0.03em',
              }}>{t}</span>
            ))}
          </div>
        </>
      ),
    },
    concierge: {
      title: 'Member concierge',
      content: (
        <>
          <div style={{ fontSize: 13, color: 'rgba(26, 36, 32, 0.55)', fontFamily: 'var(--ui-font)', marginBottom: 6 }}>
            Eleanor asks Concierge:
          </div>
          <div style={{
            padding: '10px 12px', borderRadius: 8, background: 'rgba(26, 36, 32, 0.04)',
            fontSize: 12.5, color: '#1a2420', fontFamily: 'var(--ui-font)', marginBottom: 10,
          }}>
            "What's the dress code for Friday dinner, and can I bring my two guests?"
          </div>
          <div style={{ fontSize: 10.5, letterSpacing: '0.1em', color: '#a36f1e', fontFamily: 'var(--mono-font)', marginBottom: 6, fontWeight: 600 }}>
            ✦ CONCIERGE
          </div>
          <div style={{ fontSize: 12.5, lineHeight: 1.55, color: '#1a2420', fontFamily: 'var(--ui-font)' }}>
            Friday is <strong>Resort Casual</strong> — collared shirt, no denim after 6 PM. Your membership allows 3 guests/month; you have 2 remaining. I've drafted the reservation for 7 PM, party of 3.
          </div>
        </>
      ),
    },
    directory: {
      title: 'Member directory',
      content: (
        <>
          <div style={{
            padding: '8px 10px', borderRadius: 6, background: 'rgba(26, 36, 32, 0.05)',
            fontSize: 12, color: 'rgba(26, 36, 32, 0.7)', fontFamily: 'var(--mono-font)',
            marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8,
          }}>
            <span style={{ color: '#c98d2a' }}>⌘</span> find a 10-handicap player for Saturday morning
          </div>
          {[
            { name: 'James Okafor', detail: 'Index 9.2 · avail Sat AM', c: '#4a7ab8' },
            { name: 'Priya Shah', detail: 'Index 10.8 · avail Sat AM', c: '#d97757' },
            { name: 'Thomas Kwan', detail: 'Index 9.7 · tentative', c: '#3d8b5d' },
          ].map((m, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', gap: 10, padding: '8px 4px',
              borderBottom: i < 2 ? '1px solid rgba(26, 36, 32, 0.07)' : 'none',
            }}>
              <div style={{
                width: 26, height: 26, borderRadius: 5, background: m.c,
                fontSize: 11, color: '#fff', fontWeight: 700,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: 'var(--ui-font)',
              }}>{m.name[0]}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 12.5, color: '#1a2420', fontWeight: 500, fontFamily: 'var(--ui-font)' }}>{m.name}</div>
                <div style={{ fontSize: 10.5, color: 'rgba(26, 36, 32, 0.55)', fontFamily: 'var(--mono-font)' }}>{m.detail}</div>
              </div>
            </div>
          ))}
        </>
      ),
    },
    private: {
      title: 'Private by default',
      content: (
        <>
          <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
            <div style={{
              width: 28, height: 28, borderRadius: 6,
              background: 'rgba(61, 139, 93, 0.14)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#3d8b5d', fontSize: 14,
            }}>✓</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 12.5, color: '#1a2420', fontWeight: 600, fontFamily: 'var(--ui-font)' }}>
                Members-only, verified by club
              </div>
              <div style={{ fontSize: 11, color: 'rgba(26, 36, 32, 0.6)', fontFamily: 'var(--ui-font)', marginTop: 2 }}>
                No public signups. Invites tied to member ID.
              </div>
            </div>
          </div>
          {[
            ['End-to-end encrypted DMs', 'Signal protocol'],
            ['No data sold or trained on', 'SOC 2 Type II'],
            ['Data residency', 'US / EU regions'],
          ].map(([label, detail], i) => (
            <div key={i} style={{
              display: 'flex', justifyContent: 'space-between', padding: '7px 0',
              borderTop: '1px solid rgba(26, 36, 32, 0.07)',
              fontSize: 11.5, color: 'rgba(26, 36, 32, 0.78)', fontFamily: 'var(--ui-font)',
            }}>
              <span>{label}</span>
              <span style={{ fontFamily: 'var(--mono-font)', fontSize: 10, color: 'rgba(26, 36, 32, 0.45)' }}>{detail}</span>
            </div>
          ))}
        </>
      ),
    },
  };

  const f = features[activeFeature] || features.summarize;

  return (
    <div style={{
      width: 380, borderRadius: 10, overflow: 'hidden',
      background: '#fdfbf5',
      boxShadow: '0 30px 80px rgba(0,0,0,0.25), 0 0 0 1px rgba(26, 36, 32, 0.08)',
    }}>
      <div style={{
        height: 28, background: '#0f2420',
        display: 'flex', alignItems: 'center', padding: '0 10px', gap: 6,
      }}>
        <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#ff5f57' }} />
        <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#febc2e' }} />
        <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#28c840' }} />
        <div style={{ flex: 1, textAlign: 'center', fontSize: 10.5, color: 'rgba(240, 234, 216, 0.55)', fontFamily: 'var(--ui-font)' }}>
          {f.title}
        </div>
        <div style={{ width: 42 }} />
      </div>
      <div style={{ padding: 18, minHeight: 260 }}>
        {f.content}
      </div>
    </div>
  );
}

Object.assign(window, { SecondDevice });
