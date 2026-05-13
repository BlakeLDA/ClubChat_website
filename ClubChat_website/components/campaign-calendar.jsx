// ClubChat Campaign Calendar — week view of outgoing communications
// Cream canvas, forest sidebar, amber-gold accents matching dashboard

function CampaignSidebar() {
  const nav = [
    { label: 'Dashboard', active: false },
    { label: 'Club Intelligence', active: false, gold: true },
    { label: 'Campaigns', active: true },
    { label: 'The Roster', active: false },
    { label: 'Website', active: false },
    { label: 'Automations', active: false },
  ];
  return (
    <div style={{ width: 190, background: '#0f2420', padding: '14px 10px', overflow: 'hidden' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '0 6px 16px' }}>
        <img src="assets/clubchat-logo.svg" alt="ClubChat" style={{ width: 24, height: 24, display: 'block' }} />
        <div style={{ fontSize: 13, color: '#f0ead8', fontWeight: 600, fontFamily: 'var(--ui-font)' }}>ClubChat</div>
      </div>
      <div style={{
        margin: '0 4px 14px', padding: '8px 10px',
        background: 'rgba(201, 141, 42, 0.14)',
        border: '1px solid rgba(201, 141, 42, 0.28)',
        borderRadius: 5,
        fontSize: 10, fontFamily: 'var(--mono-font)', letterSpacing: '0.04em',
        color: '#e0a84b',
      }}>
        <div style={{ fontWeight: 700 }}>PEBBLE CREEK CC</div>
        <div style={{ opacity: 0.7, fontSize: 9, marginTop: 2 }}>Comms · Admin access</div>
      </div>
      {nav.map((n, i) => (
        <div key={i} style={{
          padding: '7px 10px', borderRadius: 5,
          fontSize: 12, fontFamily: 'var(--ui-font)',
          color: n.active ? '#f0ead8' : 'rgba(240, 234, 216, 0.65)',
          background: n.active ? 'rgba(201, 141, 42, 0.16)' : 'transparent',
          borderLeft: n.active ? '2px solid #c98d2a' : '2px solid transparent',
          fontWeight: n.active ? 600 : 400,
          display: 'flex', alignItems: 'center', gap: 8,
          marginBottom: 1,
        }}>
          <span style={{ width: 10, height: 10, borderRadius: 2, background: n.gold ? '#c98d2a' : 'rgba(240, 234, 216, 0.25)', flexShrink: 0 }} />
          {n.label}
        </div>
      ))}
    </div>
  );
}

function CampaignPill({ channel, title, time, status, col, row, span = 1 }) {
  const channelStyles = {
    email:   { bg: 'rgba(74, 122, 184, 0.14)', fg: '#2e5a94', dot: '#4a7ab8', label: 'EMAIL' },
    news:    { bg: 'rgba(201, 141, 42, 0.16)', fg: '#8a5e1a', dot: '#c98d2a', label: 'NEWSLETTER' },
    social:  { bg: 'rgba(61, 139, 93, 0.14)', fg: '#2a6843', dot: '#3d8b5d', label: 'SOCIAL' },
    sms:     { bg: 'rgba(217, 119, 87, 0.14)', fg: '#a44a28', dot: '#d97757', label: 'SMS' },
    site:    { bg: 'rgba(70, 80, 90, 0.12)', fg: '#3a4450', dot: '#5a6470', label: 'WEBSITE' },
  };
  const s = channelStyles[channel] || channelStyles.email;
  return (
    <div style={{
      gridColumn: `${col} / span ${span}`, gridRow: row,
      background: s.bg, borderRadius: 5, padding: '6px 8px',
      borderLeft: `2px solid ${s.dot}`,
      display: 'flex', flexDirection: 'column', gap: 2,
      fontFamily: 'var(--ui-font)', minHeight: 0,
      cursor: 'pointer',
    }}>
      <div style={{
        fontSize: 8, letterSpacing: '0.08em', color: s.fg, fontWeight: 700,
        fontFamily: 'var(--mono-font)', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      }}>
        <span>{s.label}</span>
        <span style={{ opacity: 0.55, fontWeight: 500 }}>{time}</span>
      </div>
      <div style={{
        fontSize: 11, color: '#1a2420', fontWeight: 600, lineHeight: 1.25,
        whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
      }}>{title}</div>
      {status && (
        <div style={{ fontSize: 9, color: s.fg, fontFamily: 'var(--mono-font)', opacity: 0.75, marginTop: 1 }}>
          {status}
        </div>
      )}
    </div>
  );
}

function CampaignCalendar({ width = 880, height = 560, showAiDraft = false, typedText = '' }) {
  const days = ['MON 14', 'TUE 15', 'WED 16', 'THU 17', 'FRI 18', 'SAT 19', 'SUN 20'];

  return (
    <div style={{
      width, height, borderRadius: 12, overflow: 'hidden',
      boxShadow: '0 40px 100px rgba(0,0,0,0.45), 0 0 0 1px rgba(0,0,0,0.1)',
      display: 'flex', flexDirection: 'column',
      background: '#fdfbf5',
    }}>
      {/* title bar */}
      <div style={{
        height: 34, background: '#0f2420', display: 'flex', alignItems: 'center',
      }}>
        <div style={{ display: 'flex', gap: 7, padding: '0 14px' }}>
          <div style={{ width: 11, height: 11, borderRadius: '50%', background: '#ff5f57' }} />
          <div style={{ width: 11, height: 11, borderRadius: '50%', background: '#febc2e' }} />
          <div style={{ width: 11, height: 11, borderRadius: '50%', background: '#28c840' }} />
        </div>
        <div style={{ flex: 1, textAlign: 'center', fontSize: 11.5, color: 'rgba(240, 234, 216, 0.6)', fontFamily: 'var(--ui-font)' }}>
          Campaigns · Week of April 14
        </div>
        <div style={{ width: 80 }} />
      </div>

      <div style={{ flex: 1, display: 'flex', minHeight: 0 }}>
        <CampaignSidebar />

        {/* main calendar */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#fdfbf5' }}>
          {/* header */}
          <div style={{
            padding: '14px 20px', borderBottom: '1px solid rgba(26, 36, 32, 0.08)',
            display: 'flex', alignItems: 'center', gap: 14, background: '#f5f0e6',
          }}>
            <div>
              <div style={{
                fontSize: 19, fontFamily: 'var(--serif-font)', color: '#1a2420', fontWeight: 500,
                letterSpacing: '-0.01em',
              }}>
                Your <em style={{ color: '#c98d2a', fontStyle: 'italic' }}>Campaigns</em>
              </div>
              <div style={{ fontSize: 10.5, color: 'rgba(26, 36, 32, 0.55)', fontFamily: 'var(--mono-font)', letterSpacing: '0.06em', marginTop: 2 }}>
                14 SCHEDULED · 3 DRAFTING · 1 IN REVIEW
              </div>
            </div>
            <div style={{ flex: 1 }} />
            <div style={{
              fontSize: 10.5, padding: '4px 8px', borderRadius: 4,
              background: 'rgba(26, 36, 32, 0.06)', color: 'rgba(26, 36, 32, 0.7)',
              fontFamily: 'var(--mono-font)',
            }}>Week</div>
            <button style={{
              padding: '6px 10px', borderRadius: 5, background: '#0f2420', color: '#f0ead8',
              border: 'none', fontSize: 11, fontFamily: 'var(--ui-font)', fontWeight: 600,
              display: 'flex', alignItems: 'center', gap: 5,
            }}>
              <span style={{ color: '#c98d2a' }}>✦</span> Draft with AI
            </button>
          </div>

          {/* day header row */}
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)',
            borderBottom: '1px solid rgba(26, 36, 32, 0.07)',
          }}>
            {days.map((d, i) => (
              <div key={i} style={{
                padding: '8px 10px', fontSize: 10, letterSpacing: '0.12em',
                color: i === 3 ? '#c98d2a' : 'rgba(26, 36, 32, 0.5)',
                fontFamily: 'var(--mono-font)', fontWeight: 600,
                borderLeft: i === 0 ? 'none' : '1px solid rgba(26, 36, 32, 0.05)',
                background: i === 3 ? 'rgba(201, 141, 42, 0.06)' : 'transparent',
              }}>{d}{i === 3 ? ' · TODAY' : ''}</div>
            ))}
          </div>

          {/* campaign grid */}
          <div style={{
            flex: 1, display: 'grid',
            gridTemplateColumns: 'repeat(7, 1fr)',
            gridTemplateRows: 'repeat(5, 1fr)',
            gap: 5, padding: 8,
            background: 'rgba(26, 36, 32, 0.02)',
          }}>
            <CampaignPill channel="news"   col={1} row={1} time="8:00 AM" title="Week Ahead — Apr 14" status="sent · 287 opens" />
            <CampaignPill channel="social" col={1} row={2} time="11:30 AM" title="Sunset on 18" status="pub · IG + FB" />
            <CampaignPill channel="email"  col={2} row={1} time="7:15 AM" title="Tee sheet opens Friday" status="sent · 42% open" />
            <CampaignPill channel="sms"    col={2} row={3} time="4:00 PM" title="Dining — 6 spots left" status="sent · 14 book" />
            <CampaignPill channel="email"  col={3} row={1} time="9:00 AM" title="Spring Invitational — FAQ" status="sent" />
            <CampaignPill channel="site"   col={3} row={2} time="—" title="Member portal banner" status="live" />
            <CampaignPill channel="social" col={3} row={4} time="5:30 PM" title="New chef feature" status="pub · 142 likes" />
            <CampaignPill channel="email"  col={4} row={1} time="7:00 AM" title="Course  — 4/17" status="drafting ✦" />
            <CampaignPill channel="news"   col={4} row={2} span={2} time="THU–FRI" title="Mother's Day brunch — full campaign" status="3 sends queued" />
            <CampaignPill channel="sms"    col={4} row={4} time="6:00 PM" title="Tonight's dress code" status="scheduled" />
            <CampaignPill channel="email"  col={5} row={1} time="8:00 AM" title="Invitational tee sheet LIVE" status="scheduled" />
            <CampaignPill channel="social" col={5} row={3} time="12:00 PM" title="Friday at Pebble" status="in review" />
            <CampaignPill channel="site"   col={6} row={1} time="—" title="Results page auto-gen" status="ready" />
            <CampaignPill channel="email"  col={6} row={2} time="7:00 PM" title="Invitational recap" status="auto-draft Sun" />
            <CampaignPill channel="news"   col={7} row={1} time="7:00 AM" title="Week Ahead — Apr 21" status="drafting ✦" />
            <CampaignPill channel="social" col={7} row={3} time="—" title="Leaderboard card" status="queued" />
          </div>

          {/* AI drafting bar at bottom */}
          <div style={{ padding: '10px 14px 14px', borderTop: '1px solid rgba(26, 36, 32, 0.07)', background: '#f5f0e6' }}>
            <div style={{
              background: '#fff',
              border: '1px solid rgba(201, 141, 42, 0.35)',
              borderRadius: 8, padding: '10px 12px',
              display: 'flex', alignItems: 'center', gap: 10,
            }}>
              <span style={{
                fontSize: 10, padding: '3px 6px', borderRadius: 3,
                background: '#c98d2a', color: '#fff', fontWeight: 700,
                fontFamily: 'var(--mono-font)', letterSpacing: '0.06em',
              }}>✦ DRAFT</span>
              <span style={{ fontSize: 12.5, color: '#1a2420', fontFamily: 'var(--ui-font)', flex: 1, whiteSpace: 'nowrap', overflow: 'hidden' }}>
                {typedText}
                <span style={{
                  display: 'inline-block', width: 1.5, height: 13, background: '#c98d2a',
                  marginLeft: 2, animation: 'blink 1s infinite', verticalAlign: 'middle',
                }} />
              </span>
              <div style={{
                fontSize: 9.5, padding: '3px 6px', borderRadius: 3,
                background: 'rgba(26, 36, 32, 0.06)', color: 'rgba(26, 36, 32, 0.6)',
                fontFamily: 'var(--mono-font)', letterSpacing: '0.04em',
              }}>⌘⏎ generate</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { CampaignCalendar });
