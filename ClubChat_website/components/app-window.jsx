// ClubChat desktop app window mockup — cream + forest green palette matching dashboard

function AppTrafficLights() {
  return (
    <div style={{ display: 'flex', gap: 7, padding: '0 14px' }}>
      <div style={{ width: 11, height: 11, borderRadius: '50%', background: '#ff5f57' }} />
      <div style={{ width: 11, height: 11, borderRadius: '50%', background: '#febc2e' }} />
      <div style={{ width: 11, height: 11, borderRadius: '50%', background: '#28c840' }} />
    </div>
  );
}

function Channel({ name, active, unread, hash = true, dm = false, avatar }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 8,
      padding: '6px 10px', borderRadius: 5,
      background: active ? 'rgba(201, 141, 42, 0.16)' : 'transparent',
      color: active ? '#f0ead8' : 'rgba(240, 234, 216, 0.7)',
      fontSize: 12.5, fontFamily: 'var(--ui-font)',
      cursor: 'pointer',
      fontWeight: active ? 500 : 400,
      borderLeft: active ? '2px solid #c98d2a' : '2px solid transparent',
    }}>
      {dm ? (
        <div style={{
          width: 16, height: 16, borderRadius: '50%',
          background: avatar || '#c98d2a',
          fontSize: 9, color: '#0f2420', display: 'flex',
          alignItems: 'center', justifyContent: 'center', fontWeight: 700,
          fontFamily: 'var(--ui-font)',
        }}>{name[0]}</div>
      ) : hash && (
        <span style={{ color: 'rgba(240, 234, 216, 0.45)', fontSize: 13, width: 10 }}>#</span>
      )}
      <span style={{ flex: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{name}</span>
      {unread && (
        <div style={{
          minWidth: 16, height: 16, padding: '0 5px',
          background: '#c98d2a', borderRadius: 8,
          fontSize: 10, color: '#0f2420', fontWeight: 700,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>{unread}</div>
      )}
    </div>
  );
}

function SidebarGroup({ label, children }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <div style={{
        fontSize: 9.5, letterSpacing: '0.14em', textTransform: 'uppercase',
        color: 'rgba(240, 234, 216, 0.45)', padding: '0 10px 6px',
        fontFamily: 'var(--mono-font)', fontWeight: 500,
      }}>{label}</div>
      {children}
    </div>
  );
}

function Message({ name, color, time, children, ai, tag }) {
  return (
    <div style={{ display: 'flex', gap: 10, padding: '6px 18px' }}>
      <div style={{
        width: 32, height: 32, borderRadius: 6, flexShrink: 0,
        background: color,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: '#fff', fontWeight: 700, fontSize: 13,
        fontFamily: 'var(--ui-font)',
        position: 'relative',
      }}>
        {name[0]}
        {ai && (
          <div style={{
            position: 'absolute', bottom: -2, right: -2,
            width: 12, height: 12, borderRadius: '50%',
            background: '#fff', border: '1.5px solid #c98d2a',
            fontSize: 7, color: '#c98d2a', fontWeight: 700,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>✦</div>
        )}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 2, flexWrap: 'nowrap', whiteSpace: 'nowrap' }}>
          <span style={{ fontSize: 13, fontWeight: 600, color: '#1a2420', fontFamily: 'var(--ui-font)', whiteSpace: 'nowrap' }}>{name}</span>
          {tag && (
            <span style={{
              fontSize: 8.5, letterSpacing: '0.08em', textTransform: 'uppercase',
              padding: '1.5px 5px', borderRadius: 3,
              background: 'rgba(201, 141, 42, 0.14)', color: '#a36f1e',
              fontFamily: 'var(--mono-font)', fontWeight: 600,
            }}>{tag}</span>
          )}
          <span style={{ fontSize: 10.5, color: 'rgba(26, 36, 32, 0.42)', fontFamily: 'var(--mono-font)' }}>{time}</span>
        </div>
        <div style={{ fontSize: 13, lineHeight: 1.5, color: 'rgba(26, 36, 32, 0.82)', fontFamily: 'var(--ui-font)', whiteSpace: 'normal' }}>
          {children}
        </div>
      </div>
    </div>
  );
}

function AppWindow({ width = 880, height = 560, typedText = '', showAiReply = false, showAiCard = false }) {
  return (
    <div style={{
      width, height, borderRadius: 12, overflow: 'hidden',
      boxShadow: '0 40px 100px rgba(0,0,0,0.45), 0 0 0 1px rgba(0,0,0,0.1)',
      display: 'flex', flexDirection: 'column',
      background: '#fdfbf5',
    }}>
      {/* title bar */}
      <div style={{
        height: 36, background: '#0f2420',
        display: 'flex', alignItems: 'center',
      }}>
        <AppTrafficLights />
        <div style={{
          flex: 1, textAlign: 'center',
          fontSize: 11.5, color: 'rgba(240, 234, 216, 0.6)',
          fontFamily: 'var(--ui-font)',
        }}>
          Pebble Creek Golf & Country Club
        </div>
        <div style={{ width: 80 }} />
      </div>

      <div style={{ flex: 1, display: 'flex', minHeight: 0 }}>
        {/* sidebar — forest green, matches dashboard */}
        <div style={{
          width: 200, background: '#0f2420',
          padding: '12px 6px', overflow: 'hidden',
        }}>
          <div style={{
            padding: '0 10px 14px',
            display: 'flex', alignItems: 'center', gap: 8,
          }}>
            <div style={{
              width: 22, height: 22, borderRadius: 5,
              background: '#c98d2a',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 12, color: '#0f2420', fontWeight: 800,
              fontFamily: 'var(--serif-font)',
            }}>P</div>
            <div style={{
              fontSize: 12.5, color: '#f0ead8', fontWeight: 600,
              fontFamily: 'var(--ui-font)',
            }}>Pebble Creek</div>
          </div>

          {/* Role badge like dashboard */}
          <div style={{
            margin: '0 8px 14px', padding: '7px 9px',
            background: 'rgba(201, 141, 42, 0.14)',
            border: '1px solid rgba(201, 141, 42, 0.25)',
            borderRadius: 5,
            fontSize: 10, color: '#e0a84b',
            fontFamily: 'var(--mono-font)', letterSpacing: '0.04em',
          }}>
            <div style={{ fontWeight: 600 }}>BOARD MEMBER</div>
            <div style={{ opacity: 0.7, fontSize: 9, marginTop: 1 }}>Full access</div>
          </div>

          <SidebarGroup label="Clubhouse">
            <Channel name="announcements" unread={3} />
            <Channel name="general" active />
            <Channel name="pro-shop" />
            <Channel name="dining-events" />
          </SidebarGroup>

          <SidebarGroup label="Golf">
            <Channel name="tee-times" />
            <Channel name="tournaments" unread={12} />
            <Channel name="handicap-chat" />
          </SidebarGroup>

          <SidebarGroup label="Direct">
            <Channel name="Concierge AI" dm avatar="#c98d2a" />
            <Channel name="Marcus W." dm avatar="#d97757" />
            <Channel name="Priya S." dm avatar="#4a7ab8" />
          </SidebarGroup>
        </div>

        {/* main chat — cream */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#fdfbf5' }}>
          {/* channel header */}
          <div style={{
            height: 48, padding: '0 18px',
            borderBottom: '1px solid rgba(26, 36, 32, 0.08)',
            display: 'flex', alignItems: 'center', gap: 10,
            background: '#f5f0e6',
          }}>
            <span style={{ color: 'rgba(26, 36, 32, 0.4)', fontSize: 16, fontFamily: 'var(--ui-font)' }}>#</span>
            <span style={{ fontSize: 14, fontWeight: 600, color: '#1a2420', fontFamily: 'var(--ui-font)' }}>general</span>
            <span style={{ fontSize: 12, color: '#c98d2a', fontFamily: 'var(--serif-font)', fontStyle: 'italic', marginLeft: -2 }}>the clubhouse</span>
            <span style={{
              fontSize: 11, color: 'rgba(26, 36, 32, 0.5)',
              borderLeft: '1px solid rgba(26, 36, 32, 0.1)', paddingLeft: 10,
              fontFamily: 'var(--ui-font)', whiteSpace: 'nowrap',
            }}>
              284 members · members-only
            </span>
            <div style={{ flex: 1 }} />
            <div style={{
              fontSize: 10, padding: '3px 7px', borderRadius: 4,
              background: 'rgba(26, 36, 32, 0.06)', color: 'rgba(26, 36, 32, 0.6)',
              fontFamily: 'var(--mono-font)', letterSpacing: '0.06em',
            }}>⌘K</div>
          </div>

          {/* messages */}
          <div style={{ flex: 1, padding: '10px 0', overflow: 'hidden' }}>
            <div style={{
              padding: '10px 18px 4px', fontSize: 10,
              color: 'rgba(26, 36, 32, 0.38)',
              fontFamily: 'var(--mono-font)', letterSpacing: '0.08em',
              textAlign: 'center',
              marginBottom: 6,
            }}>— today —</div>

            <Message name="Eleanor Vance" color="#d97757" time="9:42 AM">
              Beautiful morning out there. Front nine was playing firm — anyone know if maintenance watered overnight?
            </Message>

            <Message name="James Okafor" color="#4a7ab8" time="9:44 AM">
              They aerated 7 and 11 yesterday. Greens committee posted an update.
            </Message>

            {showAiCard && (
              <div style={{ padding: '4px 18px 8px 60px' }}>
                <div style={{
                  border: '1px solid rgba(201, 141, 42, 0.3)',
                  background: '#fff9ec',
                  borderRadius: 8, padding: '10px 12px',
                  maxWidth: 440,
                }}>
                  <div style={{
                    fontSize: 9.5, letterSpacing: '0.1em', color: '#a36f1e',
                    fontFamily: 'var(--mono-font)', marginBottom: 6, fontWeight: 600,
                  }}>
                    ✦ CONCIERGE AI · PINNED SUMMARY
                  </div>
                  <div style={{ fontSize: 12, color: '#1a2420', lineHeight: 1.5, fontFamily: 'var(--ui-font)' }}>
                    <strong>Course conditions, 4/17:</strong> Holes 7 & 11 aerated Wed. Greens rolling ~10.5 on stimpmeter. Irrigation ran 3–5 AM. Cart path only on back nine until noon.
                  </div>
                </div>
              </div>
            )}

            <Message name="Marcus Whitfield" color="#3d8b5d" time="9:46 AM" tag="Board">
              Reminder: Spring Invitational tee sheet opens Friday at 8 AM sharp. Foursomes fill in under an hour last year.
            </Message>

            {showAiReply && (
              <Message name="Concierge" color="#c98d2a" time="9:47 AM" ai tag="AI">
                I've added the invitational to your calendar and set a reservation reminder for 7:55 AM Friday. Want me to pre-fill your foursome with last year's group?
              </Message>
            )}
          </div>

          {/* composer */}
          <div style={{ padding: '0 14px 14px' }}>
            <div style={{
              background: '#fff',
              border: '1px solid rgba(26, 36, 32, 0.12)',
              borderRadius: 8, padding: '9px 12px',
              display: 'flex', alignItems: 'center', gap: 10,
              minHeight: 36,
            }}>
              <span style={{ color: '#c98d2a', fontSize: 14, fontFamily: 'var(--mono-font)' }}>/</span>
              <span style={{
                fontSize: 12.5, color: '#1a2420', fontFamily: 'var(--ui-font)',
                flex: 1, whiteSpace: 'nowrap', overflow: 'hidden',
              }}>
                {typedText}
                <span style={{
                  display: 'inline-block', width: 1.5, height: 13,
                  background: '#c98d2a', marginLeft: 2,
                  animation: 'blink 1s infinite', verticalAlign: 'middle',
                }} />
              </span>
              <div style={{
                fontSize: 9.5, padding: '2.5px 6px', borderRadius: 3,
                background: 'rgba(26, 36, 32, 0.06)', color: 'rgba(26, 36, 32, 0.55)',
                fontFamily: 'var(--mono-font)', letterSpacing: '0.04em',
              }}>↵ send</div>
            </div>
          </div>
        </div>

        {/* right rail */}
        <div style={{
          width: 180, background: '#f5f0e6',
          borderLeft: '1px solid rgba(26, 36, 32, 0.08)',
          padding: '14px 12px',
        }}>
          <div style={{
            fontSize: 9.5, letterSpacing: '0.14em', textTransform: 'uppercase',
            color: 'rgba(26, 36, 32, 0.5)', marginBottom: 10,
            fontFamily: 'var(--mono-font)', fontWeight: 500,
          }}>On Course · 12</div>
          {['EV', 'JO', 'MW', 'PS', 'TK', 'AH'].map((initials, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', gap: 8, padding: '4px 0',
            }}>
              <div style={{
                width: 18, height: 18, borderRadius: '50%',
                background: ['#d97757', '#4a7ab8', '#3d8b5d', '#c98d2a', '#3d8b5d', '#d97757'][i],
                fontSize: 9, color: '#fff', fontWeight: 700,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: 'var(--ui-font)',
                position: 'relative',
              }}>
                {initials}
                <div style={{
                  position: 'absolute', bottom: -1, right: -1,
                  width: 6, height: 6, borderRadius: '50%',
                  background: '#3d8b5d', border: '1.5px solid #f5f0e6',
                }} />
              </div>
              <span style={{
                fontSize: 11, color: 'rgba(26, 36, 32, 0.72)',
                fontFamily: 'var(--ui-font)', whiteSpace: 'nowrap',
              }}>
                Hole {[4, 7, 12, 2, 16, 9][i]}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { AppWindow });
