// Feature accordions + partners + testimonials + FAQ + footer

function FeatureAccordion({ tweaks }) {
  const [active, setActive] = React.useState(0);
  const items = [
  {
    num: '01', label: 'Email & Texting',
    body: 'Member-facing email and SMS, drafted in your club’s voice and sent through your existing systems. Tournament reminders, dining announcements, course updates, guest-policy clarifications — composed, segmented, and ready to send in minutes.',
    visual: 'email'
  },
  {
    num: '02', label: 'Newsletter Microsite',
    body: 'Every newsletter gets its own permanent web page — beautifully laid out, fully branded, and linkable. Members who missed the email can still find Tuesday’s event recap or last month’s board update on a microsite that lives at your club’s domain.',
    visual: 'newsletter'
  },
  {
    num: '03', label: 'Social Media',
    body: 'Tell ClubChat what you need — a flyer, an Instagram post, a story, a save-the-date — and it composes on-brand artwork in your club’s typography, color, and tone, pulling event details straight from your calendar.',
    visual: 'design'
  },
  {
    num: '04', label: 'Leads / CRM',
    body: 'A Kanban-style pipeline for prospective members and event inquiries. Drag leads from New → Reached Out → Toured → Applied as you nurture them — with every touchpoint, note, and follow-up captured against the record.',
    visual: 'crm'
  },
  {
    num: '05', label: 'Forms / Survey Builder',
    body: 'Spin up RSVP forms, member surveys, guest registrations, and event sign-ups — without leaving ClubChat. Responses flow straight into the CRM and the AI summarizes themes, sentiment, and standout quotes for the board packet.',
    visual: 'forms'
  },
  {
    num: '06', label: 'Club Intelligence',
    body: 'An AI that reads every email, newsletter, event recap, and operational document you feed it, builds a model of your club’s voice and rhythms, and carries that context into every draft, reply, and member-facing interaction.',
    visual: 'intelligence'
  },
  {
    num: '07', label: 'Coming Next',
    body: 'A live roadmap of what the team is building next — lifecycle automations, deeper PMS integrations, member portals, board-meeting summaries. Vote on priorities, follow shipping notes, and see what lands on your dashboard before it goes live.',
    visual: 'coming'
  }];


  return (
    <div style={{
      display: 'grid', gridTemplateColumns: '0.85fr 1.15fr', gap: 56,
      alignItems: 'center', maxWidth: 1200, margin: '0 auto',
      padding: '120px 40px'
    }}>
      <div>
        <div style={{
          fontSize: 11, letterSpacing: '0.18em', color: 'var(--accent)',
          fontFamily: 'var(--mono-font)', marginBottom: 14, fontWeight: 500
        }}>02 — WHAT CLUBCHAT DOES</div>

        <h2 style={{
          fontFamily: 'var(--serif-font)', fontSize: 48, lineHeight: 1.05,
          color: 'var(--fg)', margin: 0, marginBottom: 36, fontWeight: 600,
          letterSpacing: '-0.02em'
        }}>
          Built for how private clubs actually communicate.
        </h2>

        <div style={{ borderTop: '1px solid var(--border)' }}>
          {items.map((it, i) =>
          <div key={i} style={{ borderBottom: '1px solid var(--border)' }}>
              <button onClick={() => setActive(active === i ? -1 : i)} style={{
              width: '100%', padding: '18px 4px', background: 'none', border: 'none',
              display: 'flex', alignItems: 'center', gap: 16, cursor: 'pointer',
              textAlign: 'left'
            }}>
                <span style={{
                fontSize: 10.5, color: 'var(--fg-dim)', fontFamily: 'var(--mono-font)',
                width: 30, letterSpacing: '0.06em'
              }}>{it.num}</span>
                <span style={{
                flex: 1, fontSize: 20, color: 'var(--fg)', fontWeight: 500,
                fontFamily: 'var(--serif-font)', letterSpacing: '-0.01em'
              }}>{it.label}</span>
                <span style={{
                fontSize: 18, color: 'var(--fg-dim)',
                transform: active === i ? 'rotate(45deg)' : 'none',
                transition: 'transform 0.2s', fontFamily: 'var(--ui-font)'
              }}>+</span>
              </button>
              <div style={{
              maxHeight: active === i ? 220 : 0, overflow: 'hidden',
              transition: 'max-height 0.3s ease'
            }}>
                <div style={{
                padding: '0 46px 20px', fontSize: 14.5, lineHeight: 1.65,
                color: 'var(--fg-dim)', fontFamily: 'var(--ui-font)'
              }}>
                  {it.body}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <FeatureVisual variant={items[active]?.visual || 'design'} />
      </div>
    </div>);

}

function FeatureVisual({ variant }) {
  const isDesign = variant === 'design';
  const isCrm = variant === 'crm';
  const isEmail = variant === 'email';
  const isWide = isDesign || isCrm || isEmail;
  // Laptop-ish proportions for the interactive demos
  const w = isWide ? 620 : 400;
  const innerH = isWide ? 380 : 300;
  const label =
    isEmail ? 'CLUBCHAT — EMAIL & TEXTING' :
    isDesign ? 'CLUBCHAT — SOCIAL MEDIA' :
    isCrm ? 'CLUBCHAT — LEADS / CRM' :
    variant === 'newsletter' ? 'CLUBCHAT — NEWSLETTER MICROSITE' :
    variant === 'forms' ? 'CLUBCHAT — FORMS / SURVEYS' :
    variant === 'intelligence' ? 'CLUBCHAT — CLUB INTELLIGENCE' :
    variant === 'coming' ? 'CLUBCHAT — ROADMAP' :
    variant.toUpperCase();
  return (
    <div style={{
      width: w, borderRadius: 10, overflow: 'hidden', background: '#0f2420',
      boxShadow: '0 30px 80px rgba(0,0,0,0.3), 0 0 0 1px rgba(240, 234, 216, 0.08)'
    }}>
      <div style={{
        height: 28, display: 'flex', alignItems: 'center', padding: '0 10px', gap: 6,
        borderBottom: '1px solid rgba(240, 234, 216, 0.06)', color: "rgb(240, 185, 10)"
      }}>
        <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#ff5f57' }} />
        <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#febc2e' }} />
        <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#28c840' }} />
        <div style={{ flex: 1, textAlign: 'center', fontSize: 10, color: 'rgba(240, 234, 216, 0.5)', fontFamily: 'var(--mono-font)', letterSpacing: '0.06em' }}>
          {label}
        </div>
        <div style={{ width: 42 }} />
      </div>
      {isEmail ? (
        <div style={{ position: 'relative', height: innerH }}>
          <EmailMarketingDemo />
        </div>
      ) : isDesign ? (
        <div style={{ position: 'relative', height: innerH }}>
          <DesignDemo />
        </div>
      ) : isCrm ? (
        <div style={{ position: 'relative', height: innerH }}>
          <LeadCrmDemo />
        </div>
      ) : (
        <div style={{ padding: 18, minHeight: 300, color: '#f0ead8', fontFamily: 'var(--ui-font)' }}>
          {variant === 'newsletter' && <NewsletterVisual />}
          {variant === 'forms' && <FormsVisual />}
          {variant === 'intelligence' && <IntelligenceVisual />}
          {variant === 'coming' && <ComingNextVisual />}
        </div>
      )}
    </div>);

}

// Scaled-down copy of the hero's email animation, sized for the
// 620 × 380 feature visual frame.
function EmailMarketingDemo() {
  // AnimatedAssistant renders at a fixed 1020 × 600. Scale to fit the
  // 620 × 380 inner frame; the smaller dimension wins so nothing clips.
  const SCALE = 620 / 1020; // ≈ 0.608, gives 1020 × 600 → 620 × 365
  return (
    <div style={{
      position: 'absolute', inset: 0,
      background: '#f5f0e6',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      overflow: 'hidden',
    }}>
      <div style={{
        width: 1020, height: 600,
        transform: `scale(${SCALE})`,
        transformOrigin: 'center center',
        flexShrink: 0,
      }}>
        <AnimatedAssistant />
      </div>
    </div>);

}

function NewsletterVisual() {
  return (
    <>
      <div style={{ fontSize: 10.5, letterSpacing: '0.1em', color: '#e0a84b', fontFamily: 'var(--mono-font)', marginBottom: 10, fontWeight: 600 }}>
        ✦ PUBLISHED · pebbleshores.club/notes/06-may
      </div>
      <div style={{
        borderRadius: 6, background: 'rgba(240, 234, 216, 0.04)',
        border: '1px solid rgba(240, 234, 216, 0.08)',
        overflow: 'hidden',
      }}>
        <div style={{
          padding: '14px 14px 10px',
          borderBottom: '1px solid rgba(240, 234, 216, 0.06)',
        }}>
          <div style={{
            fontFamily: 'var(--serif-font)', fontSize: 15, color: '#f0ead8',
            fontWeight: 600, letterSpacing: '-0.01em',
          }}>
            <em style={{ color: '#e0a84b', fontStyle: 'italic' }}>The Week Ahead</em> at Pebble Shores
          </div>
          <div style={{
            fontSize: 9.5, color: 'rgba(240, 234, 216, 0.5)',
            fontFamily: 'var(--mono-font)', letterSpacing: '0.08em', marginTop: 4,
          }}>06 MAY · ISSUE 142 · 8 MIN READ</div>
        </div>
        <div style={{ padding: '10px 14px', fontSize: 11.5, lineHeight: 1.5, opacity: 0.78 }}>
          The greens team finished aeration on 7 and 11. The course is back to full play this weekend, with three things worth your calendar.
        </div>
      </div>
      <div style={{
        display: 'flex', gap: 14, marginTop: 12,
        fontSize: 10, color: 'rgba(240, 234, 216, 0.55)',
        fontFamily: 'var(--mono-font)', letterSpacing: '0.06em',
      }}>
        <span>↗ 412 OPENS</span>
        <span>· 38 SHARES</span>
        <span>· LIVE ON CLUB DOMAIN</span>
      </div>
    </>);

}

function IntelligenceVisual() {
  const cards = [
  {
    title: 'Learns Your Members',
    body: 'Every roster update, event RSVP, and guest history feeds the model.'
  },
  {
    title: 'Learns Your Voice',
    body: 'Ingests your handbook, past newsletters, and staff-written emails to match how your club actually sounds.'
  },
  {
    title: 'Gets Smarter Over Time',
    body: 'Every campaign sent and every member reply tunes the next one.'
  }];

  return (
    <>
      <div style={{ fontSize: 10.5, letterSpacing: '0.1em', color: '#e0a84b', fontFamily: 'var(--mono-font)', marginBottom: 14, fontWeight: 600 }}>
        ✦ CLUB INTELLIGENCE · THREE LAYERS
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {cards.map((c, i) =>
        <div key={i} style={{
          padding: '12px 14px', borderRadius: 6,
          background: 'rgba(240, 234, 216, 0.04)',
          border: '1px solid rgba(240, 234, 216, 0.08)'
        }}>
            <div style={{
            fontSize: 13, color: '#f0ead8', fontFamily: 'var(--serif-font)',
            fontWeight: 500, marginBottom: 5, letterSpacing: '-0.01em'
          }}>{c.title}</div>
            <div style={{ fontSize: 11.5, lineHeight: 1.5, opacity: 0.72 }}>
              {c.body}
            </div>
          </div>
        )}
      </div>
    </>);

}

function FormsVisual() {
  return (
    <>
      <div style={{ fontSize: 10.5, letterSpacing: '0.1em', color: '#e0a84b', fontFamily: 'var(--mono-font)', marginBottom: 10, fontWeight: 600 }}>
        ✦ MEMBER-GUEST RSVP · 87 RESPONSES
      </div>
      <div style={{
        padding: '12px 14px', borderRadius: 6,
        background: 'rgba(240, 234, 216, 0.04)',
        border: '1px solid rgba(240, 234, 216, 0.08)',
      }}>
        <div style={{
          fontFamily: 'var(--serif-font)', fontSize: 13, color: '#f0ead8',
          fontWeight: 600, letterSpacing: '-0.01em', marginBottom: 10,
        }}>Will you join us Saturday?</div>
        {[
          { label: 'Yes, with a guest', pct: 62 },
          { label: 'Yes, solo', pct: 24 },
          { label: 'Unable to attend', pct: 14 },
        ].map((row, i) => (
          <div key={i} style={{ marginBottom: i === 2 ? 0 : 9 }}>
            <div style={{
              display: 'flex', justifyContent: 'space-between', marginBottom: 4,
              fontSize: 11, color: '#f0ead8',
            }}>
              <span>{row.label}</span>
              <span style={{ fontFamily: 'var(--mono-font)', opacity: 0.6 }}>{row.pct}%</span>
            </div>
            <div style={{
              height: 4, borderRadius: 2,
              background: 'rgba(240, 234, 216, 0.08)', overflow: 'hidden',
            }}>
              <div style={{
                width: `${row.pct}%`, height: '100%',
                background: i === 0 ? '#5ab37c' : i === 1 ? '#e0a84b' : 'rgba(240, 234, 216, 0.3)',
              }} />
            </div>
          </div>
        ))}
      </div>
      <div style={{
        marginTop: 12, padding: '8px 12px', borderRadius: 6,
        background: 'rgba(224, 168, 75, 0.10)',
        border: '1px solid rgba(224, 168, 75, 0.22)',
        fontSize: 10.5, color: '#e0a84b',
        fontFamily: 'var(--ui-font)', lineHeight: 1.45,
      }}>
        <span style={{
          fontFamily: 'var(--mono-font)', letterSpacing: '0.1em',
          fontSize: 9, fontWeight: 700, marginRight: 6,
        }}>AI SUMMARY ·</span>
        Strong turnout. 12 guests new to the club — flag for membership follow-up.
      </div>
    </>);

}

function ComingNextVisual() {
  const items = [
    { tag: 'SHIPPING THIS MONTH', label: 'Lifecycle automations', meta: 'Birthdays · Renewals · Post-event' },
    { tag: 'IN BUILD', label: 'Whoosh deep sync — billing & guests', meta: 'Q3 · beta with 4 clubs' },
    { tag: 'IN BUILD', label: 'Member-facing club portal', meta: 'Q3' },
    { tag: 'RESEARCHING', label: 'Board-meeting summaries', meta: 'Vote to prioritize ↗' },
  ];
  return (
    <>
      <div style={{ fontSize: 10.5, letterSpacing: '0.1em', color: '#e0a84b', fontFamily: 'var(--mono-font)', marginBottom: 14, fontWeight: 600 }}>
        ✦ ROADMAP · LIVE
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {items.map((it, i) => (
          <div key={i} style={{
            padding: '10px 12px', borderRadius: 6,
            background: 'rgba(240, 234, 216, 0.04)',
            border: '1px solid rgba(240, 234, 216, 0.08)',
          }}>
            <div style={{
              fontSize: 8.5, letterSpacing: '0.14em',
              color: it.tag === 'SHIPPING THIS MONTH' ? '#5ab37c'
                  : it.tag === 'IN BUILD' ? '#e0a84b'
                  : 'rgba(240, 234, 216, 0.5)',
              fontFamily: 'var(--mono-font)', fontWeight: 700, marginBottom: 4,
            }}>{it.tag}</div>
            <div style={{
              fontSize: 12.5, color: '#f0ead8',
              fontFamily: 'var(--serif-font)', fontWeight: 500,
              letterSpacing: '-0.01em', marginBottom: 2,
            }}>{it.label}</div>
            <div style={{ fontSize: 10.5, opacity: 0.6 }}>{it.meta}</div>
          </div>
        ))}
      </div>
    </>);

}

function Sponsors() {
  const partners = [
  { name: 'Whoosh Golf', style: 'serif' },
  { name: 'PGA OF AMERICA', style: 'caps' },
  { name: 'Fore Athletes', style: 'serif-italic' },
  { name: 'CARA', style: 'caps' },
  { name: 'Jonas Club', style: 'serif' },
  { name: 'LIGHTSPEED', style: 'caps' }];

  return (
    <div style={{
      maxWidth: 1100, margin: '0 auto', padding: '80px 40px',
      borderTop: '1px solid var(--border)',
      borderBottom: '1px solid var(--border)'
    }}>
      <div style={{ textAlign: 'center', marginBottom: 40 }}>
        <div style={{
          fontSize: 11, letterSpacing: '0.18em', color: 'var(--fg-dim)',
          fontFamily: 'var(--mono-font)', fontWeight: 500
        }}>
          PARTNERS — BUILT WITH THE PRIVATE CLUB INDUSTRY
        </div>
      </div>
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 30,
        alignItems: 'center'
      }}>
        {partners.map((l, i) =>
        <div key={i} style={{
          textAlign: 'center',
          fontSize: l.style === 'caps' ? 13 : 18,
          letterSpacing: l.style === 'caps' ? '0.18em' : '-0.01em',
          fontFamily: l.style.startsWith('serif') ? 'var(--serif-font)' : 'var(--ui-font)',
          fontStyle: l.style === 'serif-italic' ? 'italic' : 'normal',
          fontWeight: l.style === 'caps' ? 600 : 400,
          color: 'var(--fg-dim)', opacity: 0.75
        }}>{l.name}</div>
        )}
      </div>
      <div style={{
        textAlign: 'center', marginTop: 30, fontSize: 12,
        color: 'var(--fg-dim)', fontFamily: 'var(--serif-font)', fontStyle: 'italic'
      }}>
        Deployed at private clubs from Dallas to the Hamptons.
      </div>
    </div>);

}

function Testimonials() {
  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: '120px 40px' }}>
      <div style={{ textAlign: 'center', marginBottom: 60 }}>
        <div style={{
          fontSize: 11, letterSpacing: '0.18em', color: 'var(--accent)',
          fontFamily: 'var(--mono-font)', marginBottom: 14, fontWeight: 500
        }}>04 — FROM THE CLUBHOUSE</div>
        <h2 style={{
          fontFamily: 'var(--serif-font)', fontSize: 44, lineHeight: 1.1,
          color: 'var(--fg)', margin: 0, fontWeight: 600, letterSpacing: '-0.02em'
        }}>
          What general managers<br />
          <em style={{ color: 'var(--accent-warm)', fontStyle: 'italic' }}>are telling us.</em>
        </h2>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
        {[
        {
          tag: 'Time reclaimed',
          quote: 'Our weekly member newsletter used to take me most of Monday — roster filtering, copywriting, design, send. With ClubChat I review a draft in our voice, approve segments, and ship it before lunch. Four hours back, every week.',
          name: 'Eleanor Vance', role: 'Communications Director', club: 'Pebble Creek Golf & Country Club'
        },
        {
          tag: 'Members feel known',
          quote: 'A 14-handicap member told me last month the invitations she receives finally match how she actually plays — the clinics, the member-guest pairings, the Tuesday ladies’ group. She said, “It’s like the club finally remembers me.” That’s the product working exactly as pitched.',
          name: 'Marcus Whitfield', role: 'Director of Operations', club: 'The Oakmont Society'
        },
        {
          tag: 'Board confidence',
          quote: 'What sold the board was that ClubChat is club-specific, not a repurposed marketing tool. Our data stays ours, never pooled, never used to train anything outside our walls. White-label, fully deletable, and priced as a flat platform fee. Approved in one meeting.',
          name: 'Priya Shah', role: 'Board President', club: 'Briarwood Heritage Club'
        }].
        map((t, i) =>
        <div key={i} style={{
          padding: 28, background: 'var(--card)',
          border: '1px solid var(--border)', borderRadius: 10,
          display: 'flex', flexDirection: 'column'
        }}>
            <div style={{
            fontSize: 10, letterSpacing: '0.14em', color: 'var(--accent-warm)',
            fontFamily: 'var(--mono-font)', fontWeight: 600, marginBottom: 12,
            textTransform: 'uppercase'
          }}>✦ {t.tag}</div>
            <div style={{
            fontSize: 15, lineHeight: 1.55, color: 'var(--fg)',
            fontFamily: 'var(--ui-font)', marginBottom: 24, flex: 1
          }}>{t.quote}</div>
            <div style={{ borderTop: '1px solid var(--border)', paddingTop: 14 }}>
              <div style={{ fontSize: 13, color: 'var(--fg)', fontWeight: 600, fontFamily: 'var(--ui-font)' }}>{t.name}</div>
              <div style={{ fontSize: 11.5, color: 'var(--fg-dim)', fontFamily: 'var(--ui-font)', marginTop: 2 }}>
                {t.role} · {t.club}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>);

}

function FAQ() {
  const [open, setOpen] = React.useState(0);
  const items = [
  {
    q: 'How is ClubChat different from Mailchimp, Constant Contact, or hiring an agency?',
    a: 'PEBBLE CREEK CC'
  },
  {
    q: 'What data trains the Club Intelligence Engine?',
    a: 'Only data from your club: past emails, newsletters, social posts, event recaps, handbooks, and anything you upload. Your data is never pooled with other clubs, never used to train foundation models, and is fully deletable on request.'
  },
  {
    q: 'Which member management systems do you integrate with?',
    a: 'Whoosh, Jonas, Lightspeed, and Northstar are live today, with bi-directional sync for members, tee times, billing, and guest history. New integrations are added on customer request.'
  },
  {
    q: 'What does implementation look like?',
    a: 'Less than a week. Integration setup, voice calibration, template build, and staff training — all completed in under seven days from signed agreement. Most clubs send their first ClubChat-drafted campaign within the first week.'
  },
  {
    q: 'How is pricing structured?',
    a: 'A flat monthly platform fee based on club size and channel scope — no per-member pricing, no per-send pricing, no surprise overages. We’ll walk through specifics on the demo call.'
  }];


  return (
    <div style={{ maxWidth: 820, margin: '0 auto', padding: '120px 40px' }}>
      <div style={{ textAlign: 'center', marginBottom: 60 }}>
        <div style={{
          fontSize: 11, letterSpacing: '0.18em', color: 'var(--accent)',
          fontFamily: 'var(--mono-font)', marginBottom: 14, fontWeight: 500
        }}>05 — QUESTIONS</div>
        <h2 style={{
          fontFamily: 'var(--serif-font)', fontSize: 44, lineHeight: 1.1,
          color: 'var(--fg)', margin: 0, fontWeight: 600, letterSpacing: '-0.02em'
        }}>
          Things boards<br />
          <em style={{ color: 'var(--accent-warm)', fontStyle: 'italic' }}>usually ask.</em>
        </h2>
      </div>

      <div style={{ borderTop: '1px solid var(--border)' }}>
        {items.map((item, i) =>
        <div key={i} style={{ borderBottom: '1px solid var(--border)' }}>
            <button onClick={() => setOpen(open === i ? -1 : i)} style={{
            width: '100%', padding: '22px 0', background: 'none', border: 'none',
            display: 'flex', alignItems: 'center', gap: 20, cursor: 'pointer',
            textAlign: 'left'
          }}>
              <span style={{ fontSize: 11, color: 'var(--fg-dim)', fontFamily: 'var(--mono-font)', width: 24 }}>0{i + 1}</span>
              <span style={{ flex: 1, fontSize: 17, color: 'var(--fg)', fontFamily: 'var(--ui-font)', fontWeight: 500 }}>{item.q}</span>
              <span style={{
              fontSize: 18, color: 'var(--fg-dim)',
              transform: open === i ? 'rotate(45deg)' : 'none',
              transition: 'transform 0.2s', fontFamily: 'var(--ui-font)'
            }}>+</span>
            </button>
            <div style={{
            maxHeight: open === i ? 260 : 0, overflow: 'hidden',
            transition: 'max-height 0.3s ease'
          }}>
              <div style={{
              padding: '0 44px 22px', fontSize: 14.5, lineHeight: 1.65,
              color: 'var(--fg-dim)', fontFamily: 'var(--ui-font)'
            }}>{item.a}</div>
            </div>
          </div>
        )}
      </div>
    </div>);

}

function Footer() {
  return (
    <footer style={{
      background: 'var(--footer-bg)', color: 'var(--footer-fg)',
      padding: '80px 40px 40px'
    }}>
      <div style={{
        maxWidth: 1100, margin: '0 auto',
        display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 60
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
            <img src="assets/clubchat-logo.svg" alt="ClubChat" style={{ width: 30, height: 30, display: 'block' }} />
            <div style={{
              fontFamily: 'var(--serif-font)', fontSize: 22,
              color: 'var(--footer-fg)', fontWeight: 500
            }}>ClubChat</div>
          </div>
          <p style={{
            fontSize: 13.5, lineHeight: 1.6, color: 'var(--footer-dim)',
            fontFamily: 'var(--ui-font)', maxWidth: 340, margin: 0
          }}>
            AI-native communications for private clubs.<br />
            Built under <span style={{ fontFamily: 'var(--serif-font)', fontStyle: 'italic', color: '#e0a84b' }}>Long Drive Agency</span> in McKinney, Texas.
          </p>
          <div style={{
            marginTop: 24, display: 'flex', alignItems: 'center', gap: 10,
            fontSize: 10.5, color: 'var(--footer-dim)', fontFamily: 'var(--mono-font)',
            letterSpacing: '0.06em'
          }}>
            <span style={{
              width: 7, height: 7, borderRadius: '50%', background: '#5ab37c',
              boxShadow: '0 0 8px #5ab37c'
            }} />
            ALL SYSTEMS OPERATIONAL
          </div>
        </div>

        {[
        { title: 'Product', links: ['Features', 'Security', 'Club Intelligence', 'Integrations', 'Changelog'] },
        { title: 'Company', links: ['About', 'Customers', 'Careers', 'Press', 'Contact'] },
        { title: 'Resources', links: ['Docs', 'API', 'Implementation guide', 'Board toolkit', 'Status'] }].
        map((col, i) =>
        <div key={i}>
            <div style={{
            fontSize: 10.5, letterSpacing: '0.14em', color: 'var(--footer-dim)',
            fontFamily: 'var(--mono-font)', marginBottom: 16, fontWeight: 600,
            textTransform: 'uppercase'
          }}>{col.title}</div>
            {col.links.map((l, j) =>
          <div key={j} style={{
            fontSize: 13, color: 'var(--footer-fg)', fontFamily: 'var(--ui-font)',
            padding: '5px 0', cursor: 'pointer', opacity: 0.85
          }}>{l}</div>
          )}
          </div>
        )}
      </div>

      <div style={{
        maxWidth: 1100, margin: '60px auto 0', paddingTop: 28,
        borderTop: '1px solid rgba(240, 234, 216, 0.08)',
        display: 'flex', justifyContent: 'space-between',
        fontSize: 11.5, color: 'var(--footer-dim)', fontFamily: 'var(--mono-font)',
        letterSpacing: '0.04em'
      }}>
        <div>© 2026 CLUBCHAT — A LONG DRIVE AGENCY COMPANY</div>
        <div style={{ display: 'flex', gap: 24 }}>
          <span>PRIVACY</span>
          <span>TERMS</span>
          <span>SECURITY</span>
        </div>
      </div>
    </footer>);

}

// Alias for old name used in landing
const FeatureTabs = FeatureAccordion;

function ComparisonTable() {
  const pains = [
  'Your weekly newsletter takes half a day to write, design, and send',
  'Event promotions go out too late to fill seats',
  'Members get generic blasts while missing the announcements that actually matter to them',
  'Your best member data sits locked in Jonas, Lightspeed, or Northstar with no way to act on it'];

  const gains = [
  'AI drafts a full week of campaigns in under ten minutes — in your club’s voice',
  'Lifecycle automations fire at the right time, every time — birthdays, renewals, event reminders, post-event follow-ups',
  'Every message is targeted to what each member actually cares about',
  'One-click sync with Whoosh, Jonas, Lightspeed, and Northstar — your member data finally working for you'];


  const Card = ({ title, items, chipBg, chipFg, bulletColor, icon }) =>
  <div style={{
    padding: 36, background: 'var(--bg)',
    border: '1px solid var(--border)', borderRadius: 14,
    boxShadow: '0 8px 30px rgba(26, 36, 32, 0.05)',
    flex: 1, minWidth: 0
  }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 26 }}>
        <div style={{
        width: 38, height: 38, borderRadius: '50%',
        background: chipBg, color: chipFg,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 20, fontWeight: 700, fontFamily: 'var(--ui-font)',
        flexShrink: 0
      }}>{icon}</div>
        <h3 style={{
        fontFamily: 'var(--serif-font)', fontSize: 26, margin: 0,
        color: 'var(--fg)', fontWeight: 500, letterSpacing: '-0.015em'
      }}>{title}</h3>
      </div>
      <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
        {items.map((t, i) =>
      <li key={i} style={{
        display: 'flex', alignItems: 'flex-start', gap: 14,
        padding: '14px 0',
        borderTop: i > 0 ? '1px solid var(--border)' : 'none',
        fontSize: 14.5, lineHeight: 1.55, color: 'var(--fg)',
        fontFamily: 'var(--ui-font)'
      }}>
            <span style={{
          width: 7, height: 7, borderRadius: '50%', background: bulletColor,
          marginTop: 8, flexShrink: 0
        }} />
            <span>{t}</span>
          </li>
      )}
      </ul>
    </div>;


  return (
    <div style={{ background: 'var(--bg-2)', padding: '10px 0' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '110px 40px' }}>
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <div style={{
            fontSize: 11, letterSpacing: '0.18em', color: 'var(--accent)',
            fontFamily: 'var(--mono-font)', marginBottom: 14, fontWeight: 500
          }}>03 — HOW WE’RE DIFFERENT</div>
          <h2 style={{
            fontFamily: 'var(--serif-font)', fontSize: 48, lineHeight: 1.05,
            color: 'var(--fg)', margin: 0, fontWeight: 600, letterSpacing: '-0.02em'
          }}>
            This isn’t Mailchimp<br />
            <em style={{ color: 'var(--accent-warm)', fontStyle: 'italic' }}>with a golf logo.</em>
          </h2>
          <p style={{
            fontSize: 15, lineHeight: 1.6, color: 'var(--fg-dim)',
            fontFamily: 'var(--ui-font)', maxWidth: 620, margin: '22px auto 0'
          }}>
            Private clubs deserve better than generic email tools built for any small business. ClubChat is built specifically for the way clubs actually work — and it gives your team their time back in the process.
          </p>
        </div>

        <div style={{ display: 'flex', gap: 28, alignItems: 'stretch' }}>
          <Card
            title="Sound Familiar?"
            items={pains}
            chipBg="#F5E0DC"
            chipFg="#a04747"
            bulletColor="#c37878"
            icon="−" />
          
          <Card
            title="What Changes"
            items={gains}
            chipBg="#DCEDE2"
            chipFg="#1d3a32"
            bulletColor="#5a8a6b"
            icon="✓" />
          
        </div>

        <div style={{
          textAlign: 'center', marginTop: 36,
          fontSize: 14, color: 'var(--accent)', fontFamily: 'var(--serif-font)',
          fontStyle: 'italic', letterSpacing: '-0.005em'
        }}>
          And it gets sharper the longer it’s deployed.
        </div>
      </div>
    </div>);

}

function FinalCTA() {
  return (
    <div style={{
      position: 'relative', overflow: 'hidden',
      background: '#0f2420',
      padding: '110px 40px'
    }}>
      <FinalCTABackdrop />
      <div style={{
        position: 'relative', zIndex: 2,
        maxWidth: 780, margin: '0 auto', textAlign: 'center',
        color: '#f0ead8'
      }}>
        <div style={{
          fontSize: 11, letterSpacing: '0.2em', color: '#e0a84b',
          fontFamily: 'var(--mono-font)', marginBottom: 22, fontWeight: 500
        }}>
          ✦ READY WHEN YOU ARE
        </div>
        <h2 style={{
          fontFamily: 'var(--serif-font)', fontSize: 58, lineHeight: 1.05,
          margin: 0, fontWeight: 700, letterSpacing: '-0.025em'
        }}>
          Stop managing communications.<br />
          <em style={{ color: '#e0a84b', fontStyle: 'italic' }}>Start leading your club.</em>
        </h2>
        <p style={{
          fontSize: 16, lineHeight: 1.6, color: 'rgba(240, 234, 216, 0.72)',
          fontFamily: 'var(--ui-font)', maxWidth: 580, margin: '28px auto 0'
        }}>
          Your comms team is spending six or more hours a week on work ClubChat can do in minutes. Your members are waiting for communications that actually feel made for them. Both problems, one platform.
        </p>

        <div style={{
          display: 'flex', gap: 20, justifyContent: 'center', alignItems: 'center',
          marginTop: 40, flexWrap: 'wrap'
        }}>
          <button style={{
            padding: '14px 24px', borderRadius: 7,
            background: '#f0ead8', color: '#0f2420', border: 'none',
            fontFamily: 'var(--ui-font)', fontSize: 14, fontWeight: 600,
            cursor: 'pointer'
          }}>
            Book a walkthrough
          </button>
          <span style={{
            fontSize: 13.5, color: '#e0a84b',
            fontFamily: 'var(--ui-font)', cursor: 'pointer',
            borderBottom: '1px solid rgba(224, 168, 75, 0.5)',
            paddingBottom: 2
          }}>
            Or see it running at a live club →
          </span>
        </div>
      </div>
    </div>);

}

function FinalCTABackdrop() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 1400 500" preserveAspectRatio="xMidYMid slice"
    style={{ position: 'absolute', inset: 0, opacity: 0.35 }}>
      <defs>
        <linearGradient id="twilight" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#1d3a32" />
          <stop offset="60%" stopColor="#0f2420" />
          <stop offset="100%" stopColor="#081614" />
        </linearGradient>
        <radialGradient id="moonglow" cx="0.8" cy="0.2" r="0.3">
          <stop offset="0%" stopColor="rgba(224, 168, 75, 0.25)" />
          <stop offset="100%" stopColor="rgba(224, 168, 75, 0)" />
        </radialGradient>
      </defs>
      <rect width="1400" height="500" fill="url(#twilight)" />
      <rect width="1400" height="500" fill="url(#moonglow)" />
      {/* distant hills */}
      <path d="M0 280 L200 240 L380 270 L560 230 L760 260 L960 220 L1180 250 L1400 230 L1400 340 L0 340 Z" fill="#1a2d24" opacity="0.7" />
      {/* near hills */}
      <path d="M0 340 L180 300 L380 330 L580 280 L800 320 L1040 290 L1260 320 L1400 300 L1400 420 L0 420 Z" fill="#132821" />
      {/* fairway */}
      <path d="M0 420 Q350 390 700 420 T1400 420 L1400 500 L0 500 Z" fill="#1d3a32" />
      {/* flag */}
      <g transform="translate(980, 400)">
        <line x1="0" y1="0" x2="0" y2="-34" stroke="#e0a84b" strokeWidth="1.2" opacity="0.7" />
        <polygon points="0,-34 14,-30 0,-24" fill="#e0a84b" opacity="0.8" />
      </g>
    </svg>);

}

Object.assign(window, { FeatureTabs, FeatureAccordion, Sponsors, Testimonials, FAQ, Footer, ComparisonTable, FinalCTA });