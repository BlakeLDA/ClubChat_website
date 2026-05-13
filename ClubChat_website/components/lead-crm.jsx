// Animated "Lead CRM" feature demo for section 02.
// Kanban with 4 columns. One featured lead auto-drags through each stage,
// then loops back to the start.

const LEAD_STAGES = [
  { id: 'new',     label: 'New Leads',    color: '#1a2420', count: 4 },
  { id: 'reached', label: 'Reached Out',  color: '#4a7a8c', count: 3 },
  { id: 'toured',  label: 'Toured',       color: '#c98d2a', count: 3 },
  { id: 'applied', label: 'Applied',      color: '#5d8a6b', count: 2 },
];

const LEAD_DATA = {
  new:     [
    { name: 'Sarah Chen',    email: 'sarah@chen.com' },
    { name: 'David Park',    email: 'david@park.com' },
    { name: 'Henry Ortiz',   email: 'henry@ortiz.com' },
  ],
  reached: [
    { name: 'Eleanor Vance', email: 'eleanor@pebble.club' },
    { name: 'James Holt',    email: 'james@holt.co' },
    { name: 'Olivia Reyes',  email: 'olivia@reyes.com' },
  ],
  toured:  [
    { name: 'Priya Shah',    email: 'priya@shah.com' },
    { name: 'Theo Bennett',  email: 'theo@bennett.co' },
  ],
  applied: [
    { name: 'Camden Jones',  email: 'camden@cj.com' },
    { name: 'Maya Lin',      email: 'maya@lin.com' },
  ],
};

// The featured lead — animates through every stage
const FEATURED = { name: 'Marcus Whitfield', email: 'marcus@oakmont.club' };

// Timeline (ms)
const CT = {
  rest:       0,
  m1Start:    1600,
  m1End:      3200,    // → Reached Out
  m2Start:    4500,
  m2End:      6100,    // → Toured
  m3Start:    7400,
  m3End:      9000,    // → Applied
  hold:       11500,
  end:        12500,
};
const CT_LOOP_HOLD = 1500;

// Layout constants (must match the render math below)
const C_WIDTH = 620;
const C_PAD = 16;
const C_GAP = 10;
const C_COL_W = (C_WIDTH - C_PAD * 2 - C_GAP * 3) / 4;     // ~139
const C_COL_X_CENTER = (i) => C_PAD + i * (C_COL_W + C_GAP) + C_COL_W / 2;
const C_HEADER_H = 44;   // title row
const C_SEARCH_H = 36;   // search bar incl margin
const C_COL_HEADER_H = 22;
const C_FIRST_CARD_Y = C_PAD + C_HEADER_H + C_SEARCH_H + 8 /*col padding-top*/ + C_COL_HEADER_H + 4 /*gap*/;

function LeadCrmDemo() {
  const [t, setT] = React.useState(0);
  const rafRef = React.useRef(null);
  const startRef = React.useRef(null);

  React.useEffect(() => {
    startRef.current = performance.now();
    const tick = (now) => {
      const elapsed = now - startRef.current;
      if (elapsed < CT.end) setT(elapsed);
      else if (elapsed < CT.end + CT_LOOP_HOLD) setT(CT.end);
      else { startRef.current = now; setT(0); }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  // Figure out which column the featured card is in / moving toward
  let fromCol = 0, toCol = 0, p = 0;
  if      (t < CT.m1Start) { fromCol = 0; toCol = 0; }
  else if (t < CT.m1End)   { fromCol = 0; toCol = 1; p = (t - CT.m1Start) / (CT.m1End - CT.m1Start); }
  else if (t < CT.m2Start) { fromCol = 1; toCol = 1; }
  else if (t < CT.m2End)   { fromCol = 1; toCol = 2; p = (t - CT.m2Start) / (CT.m2End - CT.m2Start); }
  else if (t < CT.m3Start) { fromCol = 2; toCol = 2; }
  else if (t < CT.m3End)   { fromCol = 2; toCol = 3; p = (t - CT.m3Start) / (CT.m3End - CT.m3Start); }
  else                     { fromCol = 3; toCol = 3; }

  const isMoving = fromCol !== toCol;
  const eased = p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;
  const x = C_COL_X_CENTER(fromCol) + (C_COL_X_CENTER(toCol) - C_COL_X_CENTER(fromCol)) * eased;
  // Lift arc — card rises slightly off the board during transit
  const lift = isMoving ? Math.sin(p * Math.PI) * 8 : 0;
  // Subtle tilt while in flight
  const tilt = isMoving ? Math.sin(p * Math.PI) * 2.5 : 0;
  const moveScale = isMoving ? 1.05 : 1;

  return (
    <div style={{
      position: 'absolute', inset: 0,
      background: '#f5f0e6',
      padding: C_PAD,
      overflow: 'hidden',
      fontFamily: 'var(--ui-font)',
    }}>
      {/* Header */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        marginBottom: 12,
      }}>
        <div>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 4,
            padding: '3px 8px', borderRadius: 999,
            background: 'rgba(201,141,42,0.12)',
            border: '1px solid rgba(201,141,42,0.3)',
            fontSize: 8.5, letterSpacing: '0.16em',
            color: '#8a5e1a', fontFamily: 'var(--mono-font)',
            fontWeight: 700, marginBottom: 4,
          }}>
            <span>✦</span> PIPELINE
          </div>
          <div style={{
            fontFamily: 'var(--serif-font)', fontSize: 20,
            fontWeight: 600, color: '#1a2420',
            letterSpacing: '-0.015em', lineHeight: 1,
          }}>
            Lead <em style={{ color: '#c98d2a', fontStyle: 'italic', fontWeight: 500 }}>Pipeline</em>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <div style={{
            width: 24, height: 24, borderRadius: 5,
            background: '#fff', border: '1px solid rgba(26,36,32,0.12)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'rgba(26,36,32,0.5)', fontSize: 11,
          }}>⚙</div>
          <button style={{
            background: '#1d3a32', color: '#f0ead8',
            border: 'none', padding: '5px 9px', borderRadius: 5,
            fontSize: 10.5, fontWeight: 600, cursor: 'pointer',
            display: 'inline-flex', alignItems: 'center', gap: 4,
          }}>
            <span style={{ fontSize: 12, lineHeight: 1 }}>+</span> Add Lead
          </button>
        </div>
      </div>

      {/* Search bar */}
      <div style={{
        padding: '7px 10px', background: '#fff',
        border: '1px solid rgba(26,36,32,0.1)',
        borderRadius: 6, marginBottom: 10,
        fontSize: 10, color: 'rgba(26,36,32,0.4)',
        display: 'flex', alignItems: 'center', gap: 6,
        height: 26, boxSizing: 'border-box',
      }}>
        <span style={{ fontSize: 10 }}>⌕</span>
        Search leads by name, email, or company…
      </div>

      {/* Columns */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: C_GAP,
      }}>
        {LEAD_STAGES.map((stage, ci) => (
          <Column
            key={stage.id}
            stage={stage}
            cards={LEAD_DATA[stage.id]}
            isTarget={isMoving && toCol === ci}
            featuredAtRest={!isMoving && fromCol === ci}
          />
        ))}
      </div>

      {/* Floating featured card during a move */}
      {isMoving && (
        <div style={{
          position: 'absolute',
          left: x - (C_COL_W - 4) / 2,
          top: C_FIRST_CARD_Y - lift,
          width: C_COL_W - 4,
          padding: '7px 8px',
          background: '#fff',
          borderRadius: 6,
          border: '1.5px solid rgba(201,141,42,0.85)',
          boxShadow: `0 ${6 + lift}px ${14 + lift * 1.5}px rgba(26,36,32,0.18), 0 0 0 4px rgba(201,141,42,0.08)`,
          transform: `scale(${moveScale}) rotate(${tilt}deg)`,
          transformOrigin: 'center',
          pointerEvents: 'none',
          zIndex: 10,
        }}>
          <CardContent name={FEATURED.name} email={FEATURED.email} highlight />
          {/* "Dragging" cursor hint */}
          <div style={{
            position: 'absolute', right: -3, top: -3,
            width: 14, height: 14, borderRadius: '50%',
            background: '#c98d2a',
            color: '#fff', fontSize: 8, fontWeight: 700,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
          }}>✦</div>
        </div>
      )}
    </div>
  );
}

function Column({ stage, cards, isTarget, featuredAtRest }) {
  return (
    <div style={{
      padding: '8px 5px 10px',
      borderRadius: 8,
      background: isTarget ? 'rgba(201,141,42,0.10)' : 'rgba(255,255,255,0.55)',
      border: isTarget
        ? '1.5px dashed rgba(201,141,42,0.55)'
        : '1px solid rgba(26,36,32,0.06)',
      transition: 'all 240ms ease-out',
      display: 'flex', flexDirection: 'column', gap: 5,
      minHeight: 245,
      minWidth: 0,
      overflow: 'hidden',
    }}>
      {/* Column header */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 5,
        padding: '0 3px 4px',
      }}>
        <div style={{
          width: 6, height: 6, borderRadius: '50%',
          background: stage.color, flexShrink: 0,
        }} />
        <div style={{
          fontSize: 10, fontWeight: 600,
          color: '#1a2420', letterSpacing: '-0.005em',
          flex: 1, whiteSpace: 'nowrap',
          overflow: 'hidden', textOverflow: 'ellipsis',
        }}>{stage.label}</div>
        <div style={{
          fontSize: 8.5, color: 'rgba(26,36,32,0.55)',
          fontFamily: 'var(--mono-font)', fontWeight: 600,
        }}>{stage.count}</div>
      </div>

      {/* Cards. Featured lead sits as first card while at rest in this column. */}
      {featuredAtRest && (
        <Card name={FEATURED.name} email={FEATURED.email} highlight />
      )}
      {cards.map((c, i) => (
        <Card key={i} name={c.name} email={c.email} />
      ))}
    </div>
  );
}

function Card({ name, email, highlight }) {
  return (
    <div style={{
      padding: '6px 8px',
      borderRadius: 5,
      background: '#fff',
      border: highlight
        ? '1.5px solid rgba(201,141,42,0.7)'
        : '1px solid rgba(26,36,32,0.08)',
      boxShadow: highlight
        ? '0 2px 5px rgba(26,36,32,0.06)'
        : '0 1px 1.5px rgba(26,36,32,0.02)',
      minWidth: 0, overflow: 'hidden',
    }}>
      <CardContent name={name} email={email} highlight={highlight} />
    </div>
  );
}

function CardContent({ name, email, highlight }) {
  return (
    <React.Fragment>
      <div style={{
        fontSize: 10.5, fontWeight: 600,
        color: '#1a2420', letterSpacing: '-0.005em',
        marginBottom: 2,
        whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
      }}>{name}</div>
      <div style={{
        fontSize: 8.5, color: highlight ? '#8a5e1a' : 'rgba(26,36,32,0.5)',
        fontFamily: 'var(--mono-font)', letterSpacing: '-0.005em',
        whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
        display: 'flex', alignItems: 'center', gap: 3,
      }}>
        <span style={{ fontSize: 8 }}>✉</span>
        {email}
      </div>
    </React.Fragment>
  );
}

Object.assign(window, { LeadCrmDemo });
