import { useState, useMemo, useEffect } from "react";
import {
  BarChart, Bar, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer, AreaChart, Area
} from "recharts";

const TENANTS = [
  { id:1, tid:"26, 25", name:"Pacific States", status:"ACCNT MGMT TAKEOVER", pur:0, ship:1, conf:1, l4w:0, pct:0 },
  { id:2, tid:"1715", name:"Agriland", status:"PID SIGNED OFF", pur:170, ship:1, conf:0, l4w:0, pct:0 },
  { id:3, tid:"33", name:"Coleman Oil Company", status:"ACCNT MGMT TAKEOVER", pur:57, ship:42, conf:26, l4w:4, pct:10 },
  { id:4, tid:"544", name:"Sprague", status:"WAITING ON OPEN ITEMS", pur:45, ship:45, conf:36, l4w:23, pct:51 },
  { id:5, tid:"474", name:"Foster Fuels", status:"WAITING ON OPEN ITEMS", pur:45, ship:45, conf:28, l4w:18, pct:40 },
  { id:6, tid:"583", name:"Blu Petro", status:"100% USERS ROLLOUT", pur:33, ship:33, conf:33, l4w:23, pct:70 },
  { id:7, tid:"691", name:"HuntnSons", status:"50% USERS ROLLOUT", pur:30, ship:30, conf:0, l4w:0, pct:0 },
  { id:8, tid:"586", name:"Heritage Oil", status:"50% USERS ROLLOUT", pur:29, ship:29, conf:3, l4w:0, pct:0 },
  { id:9, tid:"600", name:"Tri Star Energy", status:"ACCNT MGMT TAKEOVER", pur:20, ship:12, conf:7, l4w:2, pct:17 },
  { id:10, tid:"76", name:"Arnold Oil Companies", status:"ACCNT MGMT TAKEOVER", pur:20, ship:9, conf:6, l4w:0, pct:0 },
  { id:11, tid:"601", name:"Delta 360", status:"UAT STARTED", pur:20, ship:20, conf:0, l4w:0, pct:0 },
  { id:12, tid:"393", name:"Onsite Fuels", status:"ACCNT MGMT TAKEOVER", pur:17, ship:15, conf:12, l4w:3, pct:20 },
  { id:13, tid:"1786", name:"Brown Oil", status:"30% USERS ROLLOUT", pur:17, ship:17, conf:0, l4w:0, pct:0 },
  { id:14, tid:"693, 1612", name:"Hutchens", status:"50% USERS ROLLOUT", pur:15, ship:15, conf:6, l4w:1, pct:7 },
  { id:15, tid:"1632", name:"Eli Roberts & Sons", status:"100% USERS ROLLOUT", pur:12, ship:12, conf:5, l4w:4, pct:33 },
  { id:16, tid:"716", name:"Mobile Fuel Services", status:"WAITING ON OPEN ITEMS", pur:10, ship:12, conf:11, l4w:4, pct:33 },
  { id:17, tid:"2", name:"Tyree Oil", status:"ACCNT MGMT TAKEOVER", pur:9, ship:9, conf:8, l4w:1, pct:11 },
  { id:18, tid:"1832", name:"Gaines Oil", status:"PID IN-PROGRESS", pur:8, ship:8, conf:0, l4w:0, pct:0 },
  { id:19, tid:"686", name:"Paul Murray", status:"50% USERS ROLLOUT", pur:6, ship:6, conf:3, l4w:0, pct:0 },
  { id:20, tid:"30", name:"Robco Fuels", status:"ACCNT MGMT TAKEOVER", pur:5, ship:5, conf:3, l4w:3, pct:60 },
  { id:21, tid:"617", name:"Cooper Oil", status:"COMPLETED", pur:5, ship:5, conf:2, l4w:0, pct:0 },
  { id:22, tid:"21", name:"Fleet Fuels", status:"ACCNT MGMT TAKEOVER", pur:5, ship:2, conf:4, l4w:1, pct:50 },
  { id:23, tid:"1830", name:"Prime Fuel Solution", status:"CLOSED WON", pur:5, ship:0, conf:0, l4w:0, pct:0 },
  { id:24, tid:"1197", name:"Gen Oil", status:"100% USERS ROLLOUT", pur:4, ship:4, conf:3, l4w:3, pct:75 },
  { id:25, tid:"1405", name:"Bunjix Energy", status:"PID IN-PROGRESS", pur:4, ship:0, conf:0, l4w:0, pct:0 },
  { id:26, tid:"1701", name:"FuelMan Energy", status:"50% USERS ROLLOUT", pur:3, ship:3, conf:0, l4w:0, pct:0 },
  { id:27, tid:"1793", name:"South Eastern Fuels", status:"PID IN-PROGRESS", pur:3, ship:3, conf:0, l4w:0, pct:0 },
  { id:28, tid:"595", name:"Fuel Source", status:"ACCNT MGMT TAKEOVER", pur:2, ship:2, conf:2, l4w:0, pct:0 },
  { id:29, tid:"508", name:"United SW Fuel", status:"ACCNT MGMT TAKEOVER", pur:2, ship:2, conf:3, l4w:0, pct:0 },
  { id:30, tid:"581", name:"Dogpatch Biofuels", status:"ACCNT MGMT TAKEOVER", pur:1, ship:1, conf:1, l4w:1, pct:100 },
  { id:31, tid:"1581", name:"Patriot Fuels", status:"PID IN-PROGRESS", pur:1, ship:1, conf:1, l4w:1, pct:100 },
  { id:32, tid:"1595", name:"Gassy", status:"100% USERS ROLLOUT", pur:1, ship:1, conf:1, l4w:0, pct:0 },
  { id:33, tid:"3", name:"California Fuels", status:"ACCNT MGMT TAKEOVER", pur:0, ship:2, conf:0, l4w:26, pct:1300 },
  { id:34, tid:"Multiple", name:"3L", status:"ACCNT MGMT TAKEOVER", pur:0, ship:0, conf:0, l4w:0, pct:0 },
  { id:35, tid:"606", name:"ABS", status:"COMPLETED", pur:0, ship:0, conf:0, l4w:0, pct:0 },
  { id:36, tid:"1390", name:"Buffalo Bio Diesel", status:"UAT STARTED", pur:0, ship:0, conf:0, l4w:0, pct:0 },
  { id:37, tid:"1179", name:"Elan Fuels", status:"UAT STARTED", pur:0, ship:0, conf:0, l4w:0, pct:0 },
  { id:38, tid:"1194", name:"Fronk Oil", status:"PID SIGNED OFF", pur:0, ship:0, conf:0, l4w:0, pct:0 },
  { id:39, tid:"1617", name:"Handaband", status:"100% USERS ROLLOUT", pur:0, ship:0, conf:0, l4w:0, pct:0 },
  { id:40, tid:"1386", name:"Horizon Resources", status:"30% USERS ROLLOUT", pur:0, ship:0, conf:0, l4w:0, pct:0 },
  { id:41, tid:"762", name:"Lonewolf Petroleum", status:"50% USERS ROLLOUT", pur:0, ship:0, conf:0, l4w:0, pct:0 },
  { id:42, tid:"605", name:"Lucky's Energy", status:"WAITING ON OPEN ITEMS", pur:0, ship:0, conf:0, l4w:0, pct:0 },
  { id:43, tid:"5", name:"McNeece Bros Oil", status:"ACCNT MGMT TAKEOVER", pur:0, ship:0, conf:0, l4w:0, pct:0 },
  { id:44, tid:"787", name:"Mescalero", status:"100% USERS ROLLOUT", pur:0, ship:0, conf:0, l4w:0, pct:0 },
  { id:45, tid:"20", name:"Moffitt Services", status:"ACCNT MGMT TAKEOVER", pur:0, ship:4, conf:7, l4w:0, pct:0 },
  { id:46, tid:"23", name:"Monument Oil", status:"ACCNT MGMT TAKEOVER", pur:0, ship:0, conf:0, l4w:0, pct:0 },
  { id:47, tid:"587", name:"MTI", status:"UAT STARTED", pur:0, ship:0, conf:0, l4w:0, pct:0 },
  { id:48, tid:"825", name:"Ricochet Fuel Dist.", status:"100% USERS ROLLOUT", pur:0, ship:0, conf:0, l4w:0, pct:0 },
  { id:49, tid:"537", name:"Rock Canyon", status:"ACCNT MGMT TAKEOVER", pur:0, ship:0, conf:0, l4w:0, pct:0 },
  { id:50, tid:"31", name:"Seminole Butane", status:"ACCNT MGMT TAKEOVER", pur:0, ship:0, conf:0, l4w:0, pct:0 },
  { id:51, tid:"1713", name:"Valley Pacific Petro.", status:"UAT STARTED", pur:0, ship:0, conf:0, l4w:0, pct:0 },
  { id:52, tid:"1590", name:"Wallis Oil Co", status:"UAT STARTED", pur:0, ship:0, conf:0, l4w:0, pct:0 },
  { id:53, tid:"473", name:"Whitener Enterprises", status:"WAITING ON OPEN ITEMS", pur:0, ship:0, conf:0, l4w:0, pct:0 },
  { id:54, tid:"1788", name:"Westico Energy", status:"PID IN-PROGRESS", pur:0, ship:0, conf:0, l4w:0, pct:0 },
  { id:55, tid:"1791", name:"Maverick Fuels", status:"PID SIGNED OFF", pur:0, ship:0, conf:0, l4w:0, pct:0 },
  { id:56, tid:"1792", name:"Sommers Oil Company", status:"PID IN-PROGRESS", pur:0, ship:0, conf:0, l4w:0, pct:0 },
  { id:57, tid:"1795", name:"B&B Oil Company", status:"PID SIGNED OFF", pur:0, ship:0, conf:0, l4w:0, pct:0 },
  { id:58, tid:"1796", name:"Jones Petroleum Services", status:"PID SIGNED OFF", pur:0, ship:0, conf:0, l4w:0, pct:0 },
];

const WEEKLY_TOTALS = [109,112,111,92,107,105,104,105,106,106,109,110,104,98,95,103,99,103,99,102,106,103,103,102,97,103,101,100,103,94,96,93,96,94,88,89,91,86,89,84,91,90,92,91,86,88,88,81,84,80,85,85,88,89,89,88,83,82,84,80,85,87,84,84,86,76,69,69,58,62,61,62,57,55,54,48,42,45,42,43,43,40,38,38,35];
const WEEK_LABELS = ["3/23","3/16","3/9","3/2","2/23","2/16","2/9","2/2","1/26","1/19","1/12","1/5","12/29","12/22","12/15","12/8","12/1","11/24","11/17","11/10","11/3","10/27","10/20","10/13","10/6","9/29","9/22","9/15","9/8","9/1","8/25","8/18","8/11","8/4","7/28","7/21","7/14","7/7","6/30","6/23","6/16","6/9","6/2","5/26","5/19","5/12","5/5","4/28","4/21","4/14","4/7","3/31","3/24","3/17","3/10","3/3","2/24","2/17","2/10","2/3","1/27","1/20","1/13","1/6","12/30","12/23","12/16","12/9","12/2","11/25","11/18","11/11","11/4","10/28","10/21","10/14","10/7","9/30","9/23","9/16","9/9","9/2","8/26","8/19","8/12"];

// Totals computed dynamically from per-tenant data
const TOTAL_PURCHASED = TENANTS.reduce((sum, t) => sum + t.pur, 0);
const TOTAL_SHIPPED = TENANTS.reduce((sum, t) => sum + t.ship, 0);
const TOTAL_CONFIGURED = TENANTS.reduce((sum, t) => sum + t.conf, 0);
const TOTAL_L4W = TENANTS.reduce((sum, t) => sum + t.l4w, 0);
const AVG_USAGE = (() => {
  const valid = TENANTS.filter(t => t.pct > 0 && t.pct <= 100);
  return valid.length ? Math.round(valid.reduce((s, t) => s + t.pct, 0) / valid.length) : 0;
})();

function formatNum(n) {
  if (n === null || n === undefined) return "—";
  return n.toLocaleString();
}

function MetricCard({ label, value, sub, icon, accent }) {
  return (
    <div style={{
      background: "linear-gradient(135deg, #1c1917, #292524)",
      border: "1px solid #44403c",
      borderRadius: 14,
      padding: "18px 20px",
      display: "flex",
      flexDirection: "column",
      gap: 4,
      position: "relative",
      overflow: "hidden",
    }}>
      <div style={{
        position: "absolute", top: -10, right: -6,
        fontSize: 50, opacity: 0.07, color: accent || "#f97316"
      }}>{icon}</div>
      <span style={{
        color: "#a8a29e", fontSize: 11, fontWeight: 600,
        letterSpacing: 1.2, textTransform: "uppercase", fontFamily: "monospace"
      }}>{label}</span>
      <span style={{
        color: "#fafaf9", fontSize: 30, fontWeight: 800, lineHeight: 1
      }}>{value}</span>
      {sub && <span style={{ color: "#78716c", fontSize: 11 }}>{sub}</span>}
    </div>
  );
}

function FilterPill({ label, active, onClick }) {
  return (
    <button onClick={onClick} style={{
      padding: "5px 14px", borderRadius: 20,
      border: active ? "1.5px solid #f97316" : "1px solid #44403c",
      background: active ? "rgba(249,115,22,0.15)" : "transparent",
      color: active ? "#fb923c" : "#a8a29e",
      fontSize: 11, fontWeight: 600, cursor: "pointer",
      fontFamily: "monospace", whiteSpace: "nowrap",
    }}>{label}</button>
  );
}

function SectionHeader({ children, badge }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
      <div style={{
        width: 4, height: 20, borderRadius: 2,
        background: "linear-gradient(180deg, #f97316, #ea580c)"
      }} />
      <h2 style={{ color: "#fafaf9", fontSize: 16, fontWeight: 700, margin: 0 }}>{children}</h2>
      {badge && (
        <span style={{
          background: "rgba(249,115,22,0.15)", color: "#fb923c",
          fontSize: 10, fontWeight: 700, padding: "2px 8px",
          borderRadius: 10, fontFamily: "monospace"
        }}>{badge}</span>
      )}
    </div>
  );
}

function Panel({ children, style: extraStyle }) {
  return (
    <div style={{
      background: "#1c1917", border: "1px solid #292524",
      borderRadius: 14, padding: 18, ...extraStyle
    }}>{children}</div>
  );
}

function ChartTooltip({ active, payload, label }) {
  if (!active || !payload || payload.length === 0) return null;
  return (
    <div style={{
      background: "#292524", border: "1px solid #44403c",
      borderRadius: 8, padding: "8px 12px",
      boxShadow: "0 8px 24px rgba(0,0,0,0.5)"
    }}>
      <p style={{ color: "#a8a29e", fontSize: 10, margin: "0 0 4px", fontFamily: "monospace" }}>{label}</p>
      {payload.map((p, i) => (
        <p key={i} style={{
          color: p.color || p.fill, fontSize: 12,
          margin: "2px 0", fontWeight: 600
        }}>{p.name}: {formatNum(p.value)}</p>
      ))}
    </div>
  );
}

export default function PandaboxDashboard() {
  const [tab, setTab] = useState("overview");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortColumn, setSortColumn] = useState("pur");
  const [sortDirection, setSortDirection] = useState("desc");
  const [trendRange, setTrendRange] = useState("3m");
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const filtered = useMemo(() => {
    let data = TENANTS;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      data = data.filter(t =>
        t.name.toLowerCase().includes(q) || t.tid.toLowerCase().includes(q)
      );
    }
    return data;
  }, [searchQuery]);

  const sorted = useMemo(() => {
    return [...filtered].sort((a, b) => {
      const av = a[sortColumn];
      const bv = b[sortColumn];
      if (typeof av === "number") {
        return sortDirection === "asc" ? av - bv : bv - av;
      }
      return sortDirection === "asc"
        ? String(av).localeCompare(String(bv))
        : String(bv).localeCompare(String(av));
    });
  }, [filtered, sortColumn, sortDirection]);

  const activeTenants = useMemo(() => filtered.filter(t => t.l4w > 0), [filtered]);

  const avgUsage = useMemo(() => {
    const valid = filtered.filter(t => t.pct > 0 && t.pct <= 100);
    if (valid.length === 0) return 0;
    return Math.round(valid.reduce((sum, t) => sum + t.pct, 0) / valid.length);
  }, [filtered]);

  const topByPurchased = useMemo(() => {
    return filtered.filter(t => t.pur > 0).sort((a, b) => b.pur - a.pur);
  }, [filtered]);

  const trendData = useMemo(() => {
    let sliceLen = WEEKLY_TOTALS.length;
    if (trendRange === "3m") sliceLen = 13;
    else if (trendRange === "6m") sliceLen = 26;
    else if (trendRange === "1y") sliceLen = 52;

    const result = [];
    const len = Math.min(sliceLen, WEEKLY_TOTALS.length);
    for (let i = len - 1; i >= 0; i--) {
      result.push({
        date: WEEK_LABELS[i] || ("W" + i),
        usage: WEEKLY_TOTALS[i],
      });
    }
    return result;
  }, [trendRange]);

  const underutilized = useMemo(() => {
    return filtered
      .filter(t => t.conf > 0 && t.pct <= 20 && t.pct < 200)
      .sort((a, b) => a.pct - b.pct);
  }, [filtered]);

  const usageChartData = useMemo(() => {
    return filtered
      .filter(t => t.l4w > 0)
      .sort((a, b) => b.l4w - a.l4w)
      .map(t => ({
        name: t.name.length > 14 ? t.name.slice(0, 13) + "…" : t.name,
        l4w: t.l4w,
        pctUsed: Math.min(t.pct, 100),
      }));
  }, [filtered]);

  function handleSort(col) {
    if (sortColumn === col) {
      setSortDirection(d => d === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(col);
      setSortDirection("desc");
    }
  }

  function renderTabButton(key, label) {
    const isActive = tab === key;
    return (
      <button
        key={key}
        onClick={() => setTab(key)}
        style={{
          padding: "9px 20px", borderRadius: 10, border: "none",
          cursor: "pointer", fontSize: 12, fontWeight: 700,
          background: isActive ? "linear-gradient(135deg, #f97316, #ea580c)" : "transparent",
          color: isActive ? "#fff" : "#a8a29e",
          transition: "all 0.2s",
        }}
      >{label}</button>
    );
  }

  function renderTH(col, label) {
    const isActive = sortColumn === col;
    return (
      <th
        key={col}
        onClick={() => handleSort(col)}
        style={{
          padding: "8px 12px", textAlign: "left", fontSize: 10,
          fontWeight: 700, color: isActive ? "#fb923c" : "#78716c",
          cursor: "pointer", textTransform: "uppercase",
          letterSpacing: 0.8, borderBottom: "1px solid #292524",
          fontFamily: "monospace", userSelect: "none", whiteSpace: "nowrap",
        }}
      >
        {label} {isActive ? (sortDirection === "asc" ? "↑" : "↓") : ""}
      </th>
    );
  }

  const cellStyle = {
    padding: "8px 12px", fontSize: 12,
    borderBottom: "1px solid #1c1917",
    color: "#d6d3d1", fontFamily: "monospace",
  };

  return (
    <div style={{
      background: "#0c0a09", minHeight: "100vh",
      color: "#fafaf9", fontFamily: "'Segoe UI', system-ui, sans-serif",
    }}>
      {/* ───── HEADER ───── */}
      <header style={{
        background: "linear-gradient(135deg, #1c1917, #0c0a09)",
        borderBottom: "1px solid #292524",
        padding: "14px 24px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        position: "sticky", top: 0, zIndex: 100,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{
            width: 36, height: 36, borderRadius: 10,
            background: "linear-gradient(135deg, #f97316, #ea580c)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 18, fontWeight: 800, color: "#fff",
          }}>P</div>
          <div>
            <h1 style={{ margin: 0, fontSize: 18, fontWeight: 800, letterSpacing: -0.5 }}>
              Pandabox <span style={{ color: "#f97316" }}>HQ</span>
            </h1>
            <p style={{ margin: 0, fontSize: 10, color: "#78716c", fontFamily: "monospace" }}>
              Hardware Usage Dashboard
            </p>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <div style={{
            width: 7, height: 7, borderRadius: "50%",
            background: "#22c55e",
          }} />
          <span style={{ fontSize: 10, color: "#a8a29e", fontFamily: "monospace" }}>
            Last sync: {currentTime.toLocaleString("en-US", { month: "short", day: "numeric", year: "numeric", hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: true })}
          </span>
        </div>
      </header>

      <div style={{ padding: "16px 24px", maxWidth: 1440, margin: "0 auto" }}>
        {/* ───── TABS ───── */}
        <div style={{
          display: "flex", gap: 4, marginBottom: 16,
          background: "#1c1917", borderRadius: 12, padding: 4, width: "fit-content",
        }}>
          {renderTabButton("overview", "Overview")}
          {renderTabButton("table", "Data Table")}
          {renderTabButton("insights", "Advanced Insights")}
          {renderTabButton("logistics", "Logistics")}
        </div>

        {/* ───── FILTERS ───── */}
        <div style={{
          display: "flex", flexWrap: "wrap", gap: 8,
          marginBottom: 16, alignItems: "center",
        }}>
          <input
            placeholder="Search customer or tenant ID…"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            style={{
              padding: "7px 14px", borderRadius: 10,
              border: "1px solid #44403c", background: "#1c1917",
              color: "#fafaf9", fontSize: 12, width: 220,
              outline: "none", fontFamily: "monospace",
            }}
          />
          <div style={{ width: 1, height: 24, background: "#292524" }} />
        </div>

        {/* ═══════════════ OVERVIEW TAB ═══════════════ */}
        {tab === "overview" && (
          <div>
            {/* KPI Cards */}
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(185px, 1fr))",
              gap: 12, marginBottom: 20,
            }}>
              <MetricCard icon="📦" label="Total Purchased" value={formatNum(TOTAL_PURCHASED)} sub={filtered.length + " tenants tracked"} />
              <MetricCard icon="🚚" label="Total Shipped" value={formatNum(TOTAL_SHIPPED)} sub={Math.round(TOTAL_SHIPPED / TOTAL_PURCHASED * 100) + "% of purchased"} accent="#fb923c" />
              <MetricCard icon="⚙️" label="Configured" value={formatNum(TOTAL_CONFIGURED)} sub={Math.round(TOTAL_CONFIGURED / TOTAL_SHIPPED * 100) + "% of shipped"} accent="#fdba74" />
              <MetricCard icon="📊" label="L4W Active" value={formatNum(TOTAL_L4W)} sub={activeTenants.length + " active tenants"} accent="#22c55e" />
              <MetricCard icon="📈" label="Avg Usage" value={avgUsage + "%"} sub="among active tenants" accent="#3b82f6" />
            </div>

            {/* Weekly Trend */}
            <Panel style={{ marginBottom: 16 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                <SectionHeader>Weekly Active Devices Trend</SectionHeader>
                <div style={{ display: "flex", gap: 4 }}>
                  {[["3m", "3 Mo"], ["6m", "6 Mo"], ["1y", "1 Yr"], ["all", "All"]].map(([key, lbl]) => (
                    <button
                      key={key}
                      onClick={() => setTrendRange(key)}
                      style={{
                        padding: "4px 10px", borderRadius: 6,
                        border: trendRange === key ? "1px solid #f97316" : "1px solid #44403c",
                        background: trendRange === key ? "rgba(249,115,22,0.12)" : "transparent",
                        color: trendRange === key ? "#fb923c" : "#78716c",
                        fontSize: 10, fontWeight: 600, cursor: "pointer", fontFamily: "monospace",
                      }}
                    >{lbl}</button>
                  ))}
                </div>
              </div>
              <ResponsiveContainer width="100%" height={240}>
                <AreaChart data={trendData}>
                  <defs>
                    <linearGradient id="orangeGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f97316" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#292524" />
                  <XAxis
                    dataKey="date"
                    tick={{ fill: "#78716c", fontSize: 9, fontFamily: "monospace" }}
                    interval={Math.max(0, Math.floor(trendData.length / 12))}
                  />
                  <YAxis tick={{ fill: "#78716c", fontSize: 9, fontFamily: "monospace" }} />
                  <Tooltip content={<ChartTooltip />} />
                  <Area
                    type="monotone" dataKey="usage" stroke="#f97316"
                    fill="url(#orangeGrad)" strokeWidth={2}
                    name="Active Devices" dot={false}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </Panel>

            {/* Purchased/Shipped/Configured Chart */}
            <Panel style={{ marginBottom: 16 }}>
              <SectionHeader badge={topByPurchased.length + " with orders"}>Purchased · Shipped · Configured</SectionHeader>
              <ResponsiveContainer width="100%" height={280}>
                <BarChart
                  data={topByPurchased.slice(0, 15).map(t => ({
                    name: t.name.length > 12 ? t.name.slice(0, 11) + "…" : t.name,
                    purchased: t.pur, shipped: t.ship, configured: t.conf,
                  }))}
                  layout="vertical" barGap={1} barSize={10}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#292524" horizontal={false} />
                  <XAxis type="number" tick={{ fill: "#78716c", fontSize: 9, fontFamily: "monospace" }} />
                  <YAxis dataKey="name" type="category" width={105} tick={{ fill: "#a8a29e", fontSize: 10, fontFamily: "monospace" }} />
                  <Tooltip content={<ChartTooltip />} />
                  <Legend wrapperStyle={{ fontSize: 10, fontFamily: "monospace" }} />
                  <Bar dataKey="purchased" fill="#f97316" radius={[0, 3, 3, 0]} name="Purchased" />
                  <Bar dataKey="shipped" fill="#fb923c" radius={[0, 3, 3, 0]} name="Shipped" />
                  <Bar dataKey="configured" fill="#fdba74" radius={[0, 3, 3, 0]} name="Configured" />
                </BarChart>
              </ResponsiveContainer>
            </Panel>

            {/* L4W Usage Chart */}
            {usageChartData.length > 0 && (
              <Panel>
                <SectionHeader badge={usageChartData.length + " active"}>Last 4 Weeks (L4W) Active Devices by Customer</SectionHeader>
                <ResponsiveContainer width="100%" height={Math.max(200, usageChartData.length * 28)}>
                  <BarChart data={usageChartData} layout="vertical" barSize={14}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#292524" horizontal={false} />
                    <XAxis type="number" tick={{ fill: "#78716c", fontSize: 9, fontFamily: "monospace" }} />
                    <YAxis dataKey="name" type="category" width={120} tick={{ fill: "#a8a29e", fontSize: 10, fontFamily: "monospace" }} />
                    <Tooltip content={<ChartTooltip />} />
                    <Bar dataKey="l4w" name="L4W Active" radius={[0, 6, 6, 0]}>
                      {usageChartData.map((entry, idx) => (
                        <Cell key={idx} fill={entry.l4w >= 10 ? "#22c55e" : entry.l4w >= 3 ? "#f97316" : "#ef4444"} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </Panel>
            )}
          </div>
        )}

        {/* ═══════════════ TABLE TAB ═══════════════ */}
        {tab === "table" && (
          <Panel>
            <SectionHeader badge={sorted.length + " tenants"}>Full Tenant Data</SectionHeader>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr>
                    {renderTH("name", "Customer")}
                    {renderTH("tid", "Tenant ID")}
                    {renderTH("pur", "Purchased")}
                    {renderTH("ship", "Shipped")}
                    {renderTH("conf", "Configured")}
                    {renderTH("l4w", "L4W")}
                    {renderTH("pct", "% Used")}
                  </tr>
                </thead>
                <tbody>
                  {sorted.map(row => (
                    <tr
                      key={row.id}
                      onMouseEnter={e => { e.currentTarget.style.background = "rgba(249,115,22,0.04)"; }}
                      onMouseLeave={e => { e.currentTarget.style.background = "transparent"; }}
                    >
                      <td style={{ ...cellStyle, color: "#fafaf9", fontWeight: 600 }}>{row.name}</td>
                      <td style={cellStyle}>{row.tid}</td>
                      <td style={cellStyle}>{formatNum(row.pur)}</td>
                      <td style={cellStyle}>{formatNum(row.ship)}</td>
                      <td style={cellStyle}>{formatNum(row.conf)}</td>
                      <td style={cellStyle}>{formatNum(row.l4w)}</td>
                      <td style={cellStyle}>
                        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                          <div style={{ width: 44, height: 5, borderRadius: 3, background: "#292524", overflow: "hidden" }}>
                            <div style={{
                              width: Math.min(row.pct, 100) + "%",
                              height: "100%", borderRadius: 3,
                              background: row.pct >= 60 ? "#22c55e" : row.pct >= 20 ? "#f97316" : "#ef4444",
                            }} />
                          </div>
                          <span style={{
                            color: row.pct >= 60 ? "#22c55e" : row.pct >= 20 ? "#f97316" : row.pct > 0 ? "#ef4444" : "#78716c",
                            fontWeight: 700, fontSize: 11,
                          }}>{row.pct}%</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Panel>
        )}

        {/* ═══════════════ INSIGHTS TAB ═══════════════ */}
        {tab === "insights" && (
          <div>
            {/* Underutilized */}
            <Panel style={{ marginBottom: 16 }}>
              <SectionHeader badge={underutilized.length + " flagged"}>
                Underutilized Tenants (Configured but ≤ 20% Used)
              </SectionHeader>
              {underutilized.length === 0 ? (
                <p style={{ color: "#78716c", fontFamily: "monospace", fontSize: 12 }}>
                  No underutilized tenants with current filters.
                </p>
              ) : (
                <div style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
                  gap: 10,
                }}>
                  {underutilized.map(row => (
                    <div key={row.id} style={{
                      background: "#292524", borderRadius: 10, padding: 14,
                      border: "1px solid #44403c",
                      borderLeft: "4px solid " + (row.pct === 0 ? "#ef4444" : "#eab308"),
                    }}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                        <span style={{ color: "#fafaf9", fontWeight: 700, fontSize: 13 }}>{row.name}</span>
                        <span style={{
                          color: row.pct === 0 ? "#ef4444" : "#eab308",
                          fontWeight: 800, fontSize: 16, fontFamily: "monospace",
                        }}>{row.pct}%</span>
                      </div>
                      <div style={{ fontSize: 10, color: "#a8a29e", fontFamily: "monospace", display: "flex", flexDirection: "column", gap: 2 }}>
                        <span>TID: {row.tid} · Config: {row.conf}</span>
                        <span>Purchased: {row.pur} · Shipped: {row.ship}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Panel>

            {/* Top Active */}
            <Panel style={{ marginBottom: 16 }}>
              <SectionHeader badge="By L4W">Top Active Tenants — Last 4 Weeks</SectionHeader>
              <ResponsiveContainer width="100%" height={280}>
                <BarChart
                  data={[...activeTenants].sort((a, b) => b.l4w - a.l4w).slice(0, 10).map(t => ({
                    name: t.name.length > 12 ? t.name.slice(0, 11) + "…" : t.name,
                    l4w: t.l4w, configured: t.conf,
                  }))}
                  barGap={3}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#292524" />
                  <XAxis dataKey="name" tick={{ fill: "#a8a29e", fontSize: 9, fontFamily: "monospace", angle: -20 }} height={45} />
                  <YAxis tick={{ fill: "#78716c", fontSize: 9, fontFamily: "monospace" }} />
                  <Tooltip content={<ChartTooltip />} />
                  <Legend wrapperStyle={{ fontSize: 10, fontFamily: "monospace" }} />
                  <Bar dataKey="l4w" fill="#f97316" radius={[4, 4, 0, 0]} name="L4W Active" />
                  <Bar dataKey="configured" fill="#fdba74" radius={[4, 4, 0, 0]} name="Configured" />
                </BarChart>
              </ResponsiveContainer>
            </Panel>
          </div>
        )}

        {/* ═══════════════ LOGISTICS TAB ═══════════════ */}
        {tab === "logistics" && (
          <div>
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(185px, 1fr))",
              gap: 12, marginBottom: 20,
            }}>
              <MetricCard icon="📦" label="Unshipped" value={formatNum(TOTAL_PURCHASED - TOTAL_SHIPPED)} sub={Math.round((TOTAL_PURCHASED - TOTAL_SHIPPED) / TOTAL_PURCHASED * 100) + "% of purchased"} />
              <MetricCard icon="🚛" label="Shipped Not Config'd" value={formatNum(TOTAL_SHIPPED - TOTAL_CONFIGURED)} sub={Math.round((TOTAL_SHIPPED - TOTAL_CONFIGURED) / TOTAL_SHIPPED * 100) + "% of shipped"} accent="#eab308" />
              <MetricCard icon="⚙️" label="Configured" value={formatNum(TOTAL_CONFIGURED)} sub={Math.round(TOTAL_CONFIGURED / TOTAL_PURCHASED * 100) + "% of total"} accent="#22c55e" />
              <MetricCard icon="📈" label="Ship Rate" value={Math.round(TOTAL_SHIPPED / TOTAL_PURCHASED * 100) + "%"} sub={TOTAL_SHIPPED + " of " + TOTAL_PURCHASED} accent="#3b82f6" />
              <MetricCard icon="💵" label="Avg Cost / Shipment" value="$200" sub="per shipment" accent="#a78bfa" />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 16 }}>
              {/* Pipeline Funnel */}
              <Panel>
                <SectionHeader>Inventory Pipeline</SectionHeader>
                <div style={{ display: "flex", flexDirection: "column", gap: 12, padding: "12px 0" }}>
                  {[
                    { label: "Total Purchased", val: TOTAL_PURCHASED, pctVal: 100, color: "#f97316" },
                    { label: "Shipped", val: TOTAL_SHIPPED, pctVal: Math.round(TOTAL_SHIPPED / TOTAL_PURCHASED * 100), color: "#fb923c" },
                    { label: "Configured", val: TOTAL_CONFIGURED, pctVal: Math.round(TOTAL_CONFIGURED / TOTAL_PURCHASED * 100), color: "#fdba74" },
                    { label: "L4W Active", val: TOTAL_L4W, pctVal: Math.round(TOTAL_L4W / TOTAL_PURCHASED * 100), color: "#22c55e" },
                  ].map((item, idx) => (
                    <div key={idx}>
                      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, marginBottom: 4 }}>
                        <span style={{ color: "#a8a29e", fontFamily: "monospace" }}>{item.label}</span>
                        <span style={{ color: item.color, fontWeight: 700, fontFamily: "monospace" }}>
                          {formatNum(item.val)} ({item.pctVal}%)
                        </span>
                      </div>
                      <div style={{ width: "100%", height: 10, background: "#292524", borderRadius: 5, overflow: "hidden" }}>
                        <div style={{
                          width: item.pctVal + "%", height: "100%",
                          background: item.color, borderRadius: 5,
                        }} />
                      </div>
                    </div>
                  ))}
                </div>
              </Panel>

              {/* Stock Cards */}
              <Panel>
                <SectionHeader>Stock Status — Pandabox (Black)</SectionHeader>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 10 }}>
                  {[
                    { label: "In Warehouse", val: TOTAL_PURCHASED - TOTAL_SHIPPED, color: "#f97316" },
                    { label: "Shipped/Pending", val: TOTAL_SHIPPED - TOTAL_CONFIGURED, color: "#eab308" },
                    { label: "Deployed", val: TOTAL_CONFIGURED, color: "#22c55e" },
                    { label: "Active L4W", val: TOTAL_L4W, color: "#3b82f6" },
                  ].map((item, idx) => (
                    <div key={idx} style={{
                      background: "#292524", borderRadius: 10, padding: 16,
                      textAlign: "center", borderTop: "3px solid " + item.color,
                    }}>
                      <div style={{ fontSize: 28, fontWeight: 800, color: item.color }}>
                        {formatNum(item.val)}
                      </div>
                      <div style={{ color: "#a8a29e", fontSize: 10, fontFamily: "monospace", marginTop: 2, fontWeight: 600 }}>
                        {item.label}
                      </div>
                    </div>
                  ))}
                </div>
              </Panel>
            </div>

            {/* Shipping Cost Analysis */}
            <Panel style={{ marginBottom: 16 }}>
              <SectionHeader badge="~$200 / shipment">Shipping Cost by Customer</SectionHeader>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  data={filtered.filter(t => t.ship > 0).sort((a, b) => b.ship - a.ship).slice(0, 12).map(t => ({
                    name: t.name.length > 12 ? t.name.slice(0, 11) + "…" : t.name,
                    cost: Math.round(t.ship * 200),
                    units: t.ship,
                  }))}
                  layout="vertical" barSize={14}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#292524" horizontal={false} />
                  <XAxis type="number" tick={{ fill: "#78716c", fontSize: 9, fontFamily: "monospace" }} tickFormatter={v => "$" + v.toLocaleString()} />
                  <YAxis dataKey="name" type="category" width={105} tick={{ fill: "#a8a29e", fontSize: 10, fontFamily: "monospace" }} />
                  <Tooltip content={<ChartTooltip />} />
                  <Bar dataKey="cost" name="Ship Cost ($)" radius={[0, 6, 6, 0]} fill="#a78bfa" />
                </BarChart>
              </ResponsiveContainer>
            </Panel>

            {/* Shipping Gap Chart */}
            <Panel>
              <SectionHeader>Shipping Gap — Purchased vs Shipped</SectionHeader>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  data={topByPurchased.slice(0, 12).map(t => ({
                    name: t.name.length > 12 ? t.name.slice(0, 11) + "…" : t.name,
                    purchased: t.pur, shipped: t.ship,
                  }))}
                  barGap={2}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#292524" />
                  <XAxis dataKey="name" tick={{ fill: "#a8a29e", fontSize: 9, fontFamily: "monospace", angle: -20 }} height={45} />
                  <YAxis tick={{ fill: "#78716c", fontSize: 9, fontFamily: "monospace" }} />
                  <Tooltip content={<ChartTooltip />} />
                  <Legend wrapperStyle={{ fontSize: 10, fontFamily: "monospace" }} />
                  <Bar dataKey="purchased" fill="#f97316" radius={[4, 4, 0, 0]} name="Purchased" />
                  <Bar dataKey="shipped" fill="#22c55e" radius={[4, 4, 0, 0]} name="Shipped" />
                </BarChart>
              </ResponsiveContainer>
            </Panel>
          </div>
        )}
      </div>

      {/* ───── FOOTER ───── */}
      <footer style={{ borderTop: "1px solid #292524", padding: "14px 24px", textAlign: "center", marginTop: 30 }}>
        <span style={{ color: "#44403c", fontSize: 10, fontFamily: "monospace" }}>
          Pandabox HQ · {TENANTS.length} tenants · Source: Google Sheets · {TOTAL_PURCHASED} units purchased
        </span>
      </footer>
    </div>
  );
}
