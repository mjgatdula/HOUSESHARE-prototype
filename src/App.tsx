import { useEffect, useState } from "react";
import {
  LayoutDashboard, Receipt, CreditCard, Users, BarChart2,
  Bell, Settings, Home, Zap, Droplets, Wifi, ShoppingBasket,
  Banknote, Upload, CheckCircle2, Clock, FilePlus, Shield,
  Eye, EyeOff, BellRing, ChevronRight, Building2, ArrowRight, Sparkles,
  CircleDollarSign, HandCoins, AlertCircle, XCircle, Mail, MessageCircle, LifeBuoy,
  Camera, ImagePlus, BadgeCheck, Moon, Sun, IdCard,
} from "lucide-react";
import gcashLogo from "./assets/payment-logos/gcash.svg";
import mayaLogo from "./assets/payment-logos/maya.svg";
import paypalLogo from "./assets/payment-logos/paypal.svg";
import bdoLogo from "./assets/payment-logos/bdo.svg";
import bpiLogo from "./assets/payment-logos/bpi.svg";
import landbankLogo from "./assets/payment-logos/landbank.svg";
import unionbankLogo from "./assets/payment-logos/unionbank.svg";
import metrobankLogo from "./assets/payment-logos/metrobank.svg";
import pnbLogo from "./assets/payment-logos/pnb.svg";
import gotymeLogo from "./assets/payment-logos/gotyme.svg";

// ── Payment Method Logos ───────────────────────────────────────────────────
function BrandLogo({ src, alt, fallback, size = 40, radius = 10, bg = "#fff", fallbackBg = C.primary, fallbackColor = "#fff" }: {
  src?: string;
  alt: string;
  fallback: string;
  size?: number;
  radius?: number;
  bg?: string;
  fallbackBg?: string;
  fallbackColor?: string;
}) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return (
      <div style={{ width: size, height: size, borderRadius: radius, background: fallbackBg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        <span style={{ color: fallbackColor, fontSize: Math.max(10, size * 0.24), fontWeight: 900, fontFamily: "Outfit, sans-serif", letterSpacing: -0.3 }}>{fallback}</span>
      </div>
    );
  }

  return (
    <div style={{ width: size, height: size, borderRadius: radius, background: bg, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", flexShrink: 0, boxShadow: "inset 0 0 0 1px rgba(15, 51, 44, 0.08)" }}>
      <img
        src={src}
        alt={alt}
        onError={() => setFailed(true)}
        style={{ width: "78%", height: "78%", objectFit: "contain", display: "block" }}
      />
    </div>
  );
}

function CashLogo({ size = 40 }: { size?: number }) {
  return (
    <div style={{ width: size, height: size, borderRadius: 10, background: "#F0FDF4", border: "1.5px solid #86EFAC", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <Banknote size={size * 0.52} color="#16A34A" strokeWidth={1.8} />
    </div>
  );
}

const getExpenseShare = (expense: ExpenseRecord, memberId: number, shareMap?: Record<number, number>) =>
  Math.round(((shareMap?.[memberId] ?? expense.myShare ?? 0) * 100)) / 100;

// ── Types ──────────────────────────────────────────────────────────────────
type Screen =
  | "welcome"
  | "login"
  | "register"
  | "dashboard"
  | "expenses"
  | "expense-detail"
  | "add-expense"
  | "payments"
  | "make-payment"
  | "link-account"
  | "payment-submitted"
  | "household"
  | "household-settings"
  | "member-detail"
  | "notifications"
  | "profile"
  | "security"
  | "notif-prefs"
  | "privacy"
  | "support-ticket"
  | "reports"
  | "verify-payments";

// ── Color tokens ───────────────────────────────────────────────────────────
const C = {
  bg: "#F3F7F1",
  card: "#FFFFFB",
  primary: "#28786B",
  primaryDeep: "#123C36",
  primaryLight: "#E4F2EC",
  accent: "#E8894F",
  accentLight: "#FFF0E4",
  text: "#17231F",
  muted: "#64746D",
  border: "#DCE7DE",
  paid: "#257A54",
  paidBg: "#E4F3EA",
  pending: "#B36A1C",
  pendingBg: "#FFF3D9",
  unpaid: "#BE4D42",
  unpaidBg: "#FCEAE6",
  overdue: "#8F242B",
  overdueBg: "#F8E6E8",
  rejected: "#69716E",
  rejectedBg: "#EEF1EE",
  sidebar: "#10251F",
  sidebarText: "#F8FFF9",
  shadow: "0 14px 34px rgba(18, 60, 54, 0.10)",
};

const LIGHT_COLORS = { ...C };
const DARK_COLORS = {
  ...C,
  bg: "#0E1613",
  card: "#15211D",
  primary: "#5CC7B2",
  primaryDeep: "#07110F",
  primaryLight: "#1D3A33",
  accent: "#F0A164",
  accentLight: "#3A2A1F",
  text: "#F3FBF7",
  muted: "#9DB0A8",
  border: "#2A3C35",
  paidBg: "#173529",
  pendingBg: "#3B2C15",
  unpaidBg: "#3B201D",
  overdueBg: "#3B1E23",
  rejectedBg: "#25302C",
  sidebar: "#07110F",
  sidebarText: "#F3FBF7",
  shadow: "0 16px 38px rgba(0, 0, 0, 0.24)",
};

const HIGGSFIELD_HERO_IMAGE = "https://d8j0ntlcm91z4.cloudfront.net/user_3JzVhZ42xt3xbIXbZZKbDylD838/hf_20260929_073231_c90b4166-6628-4db5-b899-929262e917f8.png";

// ── Shared helpers ─────────────────────────────────────────────────────────
const peso = (n: number) =>
  "₱" + n.toLocaleString("en-PH", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

type StatusKey = "Paid" | "Pending Verification" | "Unpaid" | "Overdue" | "Rejected";

const STATUS_MAP: Record<StatusKey, { bg: string; color: string; dot: string; Icon: typeof CheckCircle2 }> = {
  Paid: { bg: C.paidBg, color: C.paid, dot: "#3D9B6B", Icon: CheckCircle2 },
  "Pending Verification": { bg: C.pendingBg, color: C.pending, dot: "#C97D1A", Icon: Clock },
  Unpaid: { bg: C.unpaidBg, color: C.unpaid, dot: "#C94C4C", Icon: AlertCircle },
  Overdue: { bg: C.overdueBg, color: C.overdue, dot: "#9B2121", Icon: BellRing },
  Rejected: { bg: C.rejectedBg, color: C.rejected, dot: "#6B6B6B", Icon: XCircle },
};

function StatusBadge({ status }: { status?: StatusKey }) {
  const safeStatus = status && STATUS_MAP[status] ? status : "Unpaid";
  const s = STATUS_MAP[safeStatus];
  const Icon = s.Icon;
  return (
    <span
      className="status-badge"
      style={{
        background: s.bg,
        color: s.color,
        fontSize: 11,
        fontWeight: 600,
        padding: "3px 9px",
        borderRadius: 20,
        display: "inline-flex",
        alignItems: "center",
        gap: 4,
        letterSpacing: 0.2,
        fontFamily: "Outfit, sans-serif",
      }}
    >
      <Icon size={11} strokeWidth={2.3} />
      {safeStatus}
    </span>
  );
}

// ── Sample Data ────────────────────────────────────────────────────────────
// Each member's total share = ₱7,280 (Rent 5000 + Elec 1215 + Water 460 + Internet 375 + Supplies 230)
// Per-member payment story (static for non-Alex members):
//   Alex  — tenant account. Paid: Internet ₱375. Pending: Water ₱460. Owes: Rent+Elec+Supplies = ₱6,445
//   Jamie — main tenant/manager account. Paid: Rent ₱5,000 + Internet ₱375 = ₱5,375. Owes: Electricity+Water+Supplies = ₱1,905
//   Sam   — paid everything ₱7,280. Owes: ₱0
//   Taylor— paid: Internet ₱375. Owes: Rent ₱5,000 + Electricity ₱1,215 + Water ₱460 + Supplies ₱230 = ₱6,905
const MEMBERS = [
  { id: 1, name: "Alex Reyes",      nick: "Alex",   role: "Tenant",              avatar: "AR", color: "#28786B", paid: 375,  owed: 6445 },
  { id: 2, name: "Jamie Cruz",      nick: "Jamie",  role: "Main Tenant / Manager", avatar: "JC", color: "#5B7FA6", paid: 5375, owed: 1905 },
  { id: 3, name: "Sam Lim",         nick: "Sam",    role: "Tenant",      avatar: "SL", color: "#4CAF7D", paid: 7280, owed: 0    },
  { id: 4, name: "Taylor Bautista", nick: "Taylor", role: "Tenant",      avatar: "TB", color: "#9B6BB5", paid: 375,  owed: 6905 },
];

type Member = typeof MEMBERS[number];
type DemoMember = Member & { householdId?: string };
type AccountRecord = DemoMember & { email?: string; phone?: string; birthdate?: string };
type PendingReceipt = {
  expenseId: number;
  memberId: number;
  submittedAt: string;
  method: string;
};
type LinkedFundingSource = {
  id: string;
  bankId: string;
  label: string;
  holder: string;
  last4: string;
  fingerprint: string;
  source: string;
};
type AppNotification = {
  id: number;
  text: string;
  time: string;
  Icon: typeof Clock;
  today: boolean;
  memberId?: number | "all";
};
type JoinRequest = {
  id: number;
  memberId: number;
  householdId: string;
  inviteCode: string;
  status: "Pending" | "Accepted" | "Rejected";
  submittedAt: string;
  faceVerified: boolean;
  idUploaded: boolean;
};

type HouseholdRecord = {
  id: string;
  name: string;
  inviteCode: string;
  inviteLink: string;
  mainTenantId: number;
  expenseIds: number[];
  fixedBills: Array<{ label: string; value: string; Icon: typeof Home }>;
};

const memberEmail = (member: AccountRecord) => member.email ?? `${member.nick.toLowerCase()}@email.com`;
const isMainTenant = (member: DemoMember) => member.role.includes("Main Tenant");
const HOUSEHOLD_INVITE_CODE = "HS-SUNRISE-2026";
const HOUSEHOLD_INVITE_LINK = `https://houseshare.app/join/${HOUSEHOLD_INVITE_CODE}`;
const SUNRISE_HOUSEHOLD_ID = "sunrise";

const normalizeInvite = (value: string) => {
  const trimmed = value.trim();
  try {
    return decodeURIComponent(trimmed).toUpperCase();
  } catch {
    return trimmed.toUpperCase();
  }
};
const inviteMatches = (input: string, code: string) => {
  const normalizedInput = normalizeInvite(input);
  const normalizedCode = normalizeInvite(code);
  return normalizedInput === normalizedCode || normalizedInput.includes(normalizedCode) || normalizedInput.includes(`/JOIN/${normalizedCode}`);
};
const normalizePHPhone = (value: string) => {
  const digits = value.replace(/\D/g, "");
  if (digits.startsWith("63")) return digits;
  if (digits.startsWith("0")) return `63${digits.slice(1)}`;
  if (digits.startsWith("9")) return `63${digits}`;
  return digits;
};
const formatPHPhone = (value: string) => {
  const normalized = normalizePHPhone(value);
  return normalized.startsWith("63") ? `+${normalized}` : value;
};
const clampPHPhoneInput = (value: string) => {
  const startsWithPlus = value.trim().startsWith("+");
  let digits = value.replace(/\D/g, "");
  if (digits.startsWith("63")) digits = digits.slice(0, 12);
  else if (digits.startsWith("0")) digits = digits.slice(0, 11);
  else digits = digits.slice(0, 10);
  return startsWithPlus || digits.startsWith("63") ? `+${digits}` : digits;
};
const makeInviteCode = (name: string, memberId: number) => {
  const prefix = name.replace(/[^a-z0-9]/gi, "").slice(0, 4).toUpperCase() || "HOME";
  const entropy = Math.random().toString(36).slice(2, 8).toUpperCase();
  return `HS-${prefix}-${memberId}-${entropy}`;
};
const makeInviteLink = (code: string) => `https://houseshare.app/join/${code}`;
const memberHouseholdId = (member: DemoMember) => member.householdId ?? SUNRISE_HOUSEHOLD_ID;

const EXPENSES = [
  {
    id: 1,
    name: "September Rent",
    category: "Rent",
    total: 20000,
    myShare: 5000,
    due: "Sept 30, 2026",
    status: "Unpaid" as StatusKey,
    period: "September 2026",
    method: "Equal Split",
    Icon: Home,
  },
  {
    id: 2,
    name: "September Electricity",
    category: "Electricity",
    total: 4860,
    myShare: 1215,
    due: "Sept 15, 2026",
    status: "Unpaid" as StatusKey,
    period: "September 2026",
    method: "Occupancy-Based",
    Icon: Zap,
  },
  {
    id: 3,
    name: "September Water",
    category: "Water",
    total: 1840,
    myShare: 460,
    due: "Sept 20, 2026",
    status: "Pending Verification" as StatusKey,
    period: "September 2026",
    method: "Custom",
    Icon: Droplets,
  },
  {
    id: 4,
    name: "Internet",
    category: "Internet",
    total: 1500,
    myShare: 375,
    due: "Sept 18, 2026",
    status: "Paid" as StatusKey,
    period: "September 2026",
    method: "Equal Split",
    Icon: Wifi,
  },
  {
    id: 5,
    name: "Household Supplies",
    category: "Household Supplies",
    total: 920,
    myShare: 230,
    due: "Sept 10, 2026",
    status: "Overdue" as StatusKey,
    period: "September 2026",
    method: "Selected Members",
    Icon: ShoppingBasket,
  },
];

type ExpenseRecord = typeof EXPENSES[number];

const DEFAULT_HOUSEHOLDS: Record<string, HouseholdRecord> = {
  [SUNRISE_HOUSEHOLD_ID]: {
    id: SUNRISE_HOUSEHOLD_ID,
    name: "Sunrise Apartment",
    inviteCode: HOUSEHOLD_INVITE_CODE,
    inviteLink: HOUSEHOLD_INVITE_LINK,
    mainTenantId: 2,
    expenseIds: EXPENSES.map((expense) => expense.id),
    fixedBills: [
      { label: "Rent", value: "₱20,000.00", Icon: Home },
      { label: "Internet", value: "₱1,500.00", Icon: Wifi },
      { label: "Water", value: "₱1,840.00", Icon: Droplets },
      { label: "Electricity", value: "Variable monthly", Icon: Zap },
    ],
  },
};

const ACTIVITIES = [
  { id: 1, text: "Alex submitted payment proof", time: "2 hours ago", Icon: Upload, type: "payment" },
  { id: 2, text: "Jamie added the electricity bill", time: "Yesterday", Icon: FilePlus, type: "expense" },
  { id: 3, text: "Jamie verified Alex's partial payment", time: "2 days ago", Icon: CheckCircle2, type: "paid" },
  { id: 4, text: "Water bill is due in 3 days", time: "Today", Icon: Clock, type: "reminder" },
];

const NOTIFICATIONS: AppNotification[] = [
  { id: 1, text: "Your electricity payment is due tomorrow.", time: "Just now", Icon: Clock, today: true },
  { id: 2, text: "Alex's proof for September Water is waiting for Jamie's review.", time: "2h ago", Icon: Upload, today: true, memberId: 2 },
  { id: 3, text: "Your payment for Internet was accepted.", time: "Yesterday", Icon: CheckCircle2, today: false },
  { id: 4, text: "A new expense was added: Household Supplies.", time: "2 days ago", Icon: FilePlus, today: false },
  { id: 5, text: "Your proof for September Water is waiting for Jamie's review.", time: "2h ago", Icon: Upload, today: true, memberId: 1 },
];

// ── Avatar ─────────────────────────────────────────────────────────────────
function Avatar({ initials, color, size = 36 }: { initials: string; color: string; size?: number }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        background: color,
        color: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: size * 0.38,
        fontWeight: 700,
        fontFamily: "Outfit, sans-serif",
        flexShrink: 0,
      }}
    >
      {initials}
    </div>
  );
}

// ── Logo ───────────────────────────────────────────────────────────────────
function Logo({ size = 32, light = false }: { size?: number; light?: boolean }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
        <rect width="32" height="32" rx="8" fill={light ? C.sidebarText : C.primary} />
        <path d="M8 18 L16 10 L24 18" stroke={light ? C.primary : C.sidebarText} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="11" y="18" width="10" height="8" rx="1.5" fill={light ? C.primary : C.sidebarText} opacity="0.85" />
        <circle cx="23" cy="13" r="4.5" fill={light ? C.accent : C.accentLight} opacity="0.95" />
        <path d="M21.5 13 L22.5 14 L24.5 12" stroke={light ? C.sidebarText : C.primary} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span
        style={{
          fontFamily: "Outfit, sans-serif",
          fontWeight: 700,
          fontSize: size * 0.55,
          color: light ? C.sidebarText : C.text,
          letterSpacing: -0.3,
        }}
      >
        House<span style={{ color: light ? "rgba(248,255,249,0.62)" : C.primary }}>Share</span>
      </span>
    </div>
  );
}

function AccountMenu({
  currentMember,
  onNav,
  onLogout,
  layout = "avatar",
}: {
  currentMember: Member;
  onNav: (s: Screen) => void;
  onLogout: () => void;
  layout?: "avatar" | "sidebar";
}) {
  const [open, setOpen] = useState(false);
  const go = (screen: Screen) => {
    setOpen(false);
    onNav(screen);
    window.location.hash = screen;
  };

  return (
    <div style={{ position: "relative" }}>
      <button
        onClick={() => setOpen((v) => !v)}
        style={{
          background: layout === "sidebar" ? "transparent" : C.card,
          border: layout === "sidebar" ? "none" : `1px solid ${C.border}`,
          borderRadius: layout === "sidebar" ? 12 : 14,
          padding: layout === "sidebar" ? 0 : 4,
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: 10,
          width: layout === "sidebar" ? "100%" : "auto",
          textAlign: "left",
        }}
        aria-label="Open account menu"
      >
        <Avatar initials={currentMember.avatar} color={currentMember.color} size={layout === "sidebar" ? 32 : 38} />
        {layout === "sidebar" && (
          <div>
            <div style={{ fontSize: 12, fontWeight: 600, color: C.sidebarText, fontFamily: "Outfit, sans-serif" }}>{currentMember.name}</div>
            <div style={{ fontSize: 10, color: "rgba(248,255,249,0.56)" }}>{currentMember.role}</div>
          </div>
        )}
      </button>

      {open && (
        <div
          style={{
            position: "absolute",
            right: layout === "sidebar" ? "auto" : 0,
            left: layout === "sidebar" ? 0 : "auto",
            bottom: layout === "sidebar" ? 44 : "auto",
            top: layout === "sidebar" ? "auto" : 48,
            zIndex: 100,
            width: 220,
            background: C.card,
            border: `1px solid ${C.border}`,
            borderRadius: 14,
            boxShadow: "0 20px 48px rgba(13,51,46,0.20)",
            padding: 8,
          }}
        >
          <div style={{ padding: "8px 10px 10px", borderBottom: `1px solid ${C.border}`, marginBottom: 6 }}>
            <div style={{ fontFamily: "Outfit, sans-serif", fontSize: 13, fontWeight: 800, color: C.text }}>{currentMember.name}</div>
            <div style={{ fontSize: 11, color: C.muted }}>{memberEmail(currentMember)}</div>
          </div>
          {[
            { label: "View Profile", action: () => go("profile") },
            { label: "Switch Account", action: () => go("login") },
            { label: "Log Out", action: onLogout, danger: true },
          ].map((item) => (
            <button
              key={item.label}
              onClick={() => {
                setOpen(false);
                item.action();
              }}
              style={{
                width: "100%",
                border: "none",
                background: "transparent",
                color: item.danger ? C.unpaid : C.text,
                cursor: "pointer",
                padding: "10px",
                borderRadius: 10,
                fontFamily: "Outfit, sans-serif",
                fontSize: 13,
                fontWeight: 700,
                textAlign: "left",
              }}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function HiggsfieldScene({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`hf-scene ${compact ? "hf-scene-compact" : ""}`}>
      {HIGGSFIELD_HERO_IMAGE && (
        <img className="hf-generated-art" src={HIGGSFIELD_HERO_IMAGE} alt="" />
      )}
      <div className="hf-scene-grid" />
      <div className="hf-orbit hf-orbit-one" />
      <div className="hf-orbit hf-orbit-two" />
      <div className="hf-flow hf-flow-a" />
      <div className="hf-flow hf-flow-b" />
      <div className="hf-floating-card hf-card-main">
        <div className="hf-card-kicker">HOUSE BALANCE</div>
        <div className="hf-card-amount">₱10,625</div>
        <div className="hf-card-meter"><span /></div>
      </div>
      <div className="hf-floating-card hf-card-small hf-card-paid">
        <CheckCircle2 size={16} />
        <span>3 paid</span>
      </div>
      <div className="hf-floating-card hf-card-small hf-card-due">
        <Clock size={16} />
        <span>2 due</span>
      </div>
      <div className="hf-member-ring">
        {MEMBERS.map((member, index) => (
          <div key={member.id} className={`hf-member-node hf-member-${index + 1}`}>
            <Avatar initials={member.avatar} color={member.color} size={compact ? 26 : 32} />
          </div>
        ))}
      </div>
    </div>
  );
}

function ScreenPrelude({ label, title, value, icon: Icon }: {
  label: string;
  title: string;
  value?: string;
  icon: typeof Receipt;
}) {
  return (
    <div className="screen-prelude">
      <div className="screen-prelude-icon"><Icon size={18} /></div>
      <div>
        <div className="screen-prelude-label">{label}</div>
        <div className="screen-prelude-title">{title}</div>
      </div>
      {value && <div className="screen-prelude-value">{value}</div>}
    </div>
  );
}

function BillingCycleChart({ compact = false }: { compact?: boolean }) {
  const currentDay = 29;
  const billingDays = 30;
  const percent = Math.round((currentDay / billingDays) * 100);
  const daysLeft = billingDays - currentDay;

  return (
    <div
      className="billing-cycle-card"
      style={{
        background: C.card,
        border: `1px solid ${C.border}`,
        borderRadius: 16,
        padding: compact ? "16px" : "18px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 16,
        boxShadow: C.shadow,
        marginBottom: compact ? 0 : 22,
      }}
    >
      <div>
        <div style={{ fontSize: 11, fontWeight: 800, color: C.primary, fontFamily: "Outfit, sans-serif", letterSpacing: 0.4 }}>
          BILLING CYCLE
        </div>
        <div style={{ fontFamily: "Outfit, sans-serif", fontSize: compact ? 15 : 17, fontWeight: 800, color: C.text, marginTop: 4 }}>
          September payment window
        </div>
        <div style={{ fontSize: 12, color: C.muted, marginTop: 3 }}>
          {daysLeft} day left before next billing cycle
        </div>
      </div>
      <div
        style={{
          width: compact ? 74 : 88,
          height: compact ? 74 : 88,
          borderRadius: "50%",
          background: `conic-gradient(${C.primary} ${percent * 3.6}deg, ${C.primaryLight} 0deg)`,
          display: "grid",
          placeItems: "center",
          flexShrink: 0,
        }}
        aria-label={`${percent}% of the September billing cycle is complete`}
      >
        <div style={{ width: compact ? 54 : 64, height: compact ? 54 : 64, borderRadius: "50%", background: C.card, display: "grid", placeItems: "center", boxShadow: "inset 0 0 0 1px rgba(35, 117, 103, 0.08)" }}>
          <span style={{ fontFamily: "Outfit, sans-serif", fontSize: compact ? 17 : 20, fontWeight: 900, color: C.text }}>{percent}%</span>
        </div>
      </div>
    </div>
  );
}

// ── Bottom Nav ─────────────────────────────────────────────────────────────
const NAV_ITEMS = [
  { id: "dashboard", label: "Home", Icon: LayoutDashboard },
  { id: "expenses", label: "Expenses", Icon: Receipt },
  { id: "payments", label: "Payments", Icon: CreditCard },
  { id: "household", label: "Household", Icon: Users },
  { id: "notifications", label: "More", Icon: Bell },
];

function BottomNav({ active, onNav }: { active: string; onNav: (s: Screen) => void }) {
  return (
    <div
      className="bottom-nav"
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        background: "rgba(255,255,251,0.94)",
        borderTop: `1px solid ${C.border}`,
        boxShadow: "0 -10px 30px rgba(18,60,54,0.08)",
        backdropFilter: "blur(14px)",
        display: "flex",
        padding: "8px 0 20px",
        zIndex: 100,
      }}
    >
      {NAV_ITEMS.map((item) => {
        const isActive = active === item.id;
        return (
          <button
            className="nav-button"
            key={item.id}
            onClick={() => onNav(item.id as Screen)}
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 3,
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "6px 0",
            }}
          >
            <item.Icon size={20} color={isActive ? C.primary : C.muted} strokeWidth={isActive ? 2.2 : 1.8} />
            <span
              style={{
                fontSize: 10,
                fontWeight: isActive ? 600 : 400,
                color: isActive ? C.primary : C.muted,
                fontFamily: "Outfit, sans-serif",
              }}
            >
              {item.label}
            </span>
            {isActive && (
              <div
                style={{
                  width: 4,
                  height: 4,
                  borderRadius: "50%",
                  background: C.accent,
                  position: "absolute",
                  bottom: 16,
                }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}

// ── Desktop Sidebar ────────────────────────────────────────────────────────
const SIDEBAR_ITEMS = [
  { id: "dashboard", label: "Dashboard", Icon: LayoutDashboard },
  { id: "expenses", label: "Expenses", Icon: Receipt },
  { id: "payments", label: "Payments", Icon: CreditCard },
  { id: "household", label: "Household", Icon: Users },
  { id: "reports", label: "Reports", Icon: BarChart2 },
  { id: "notifications", label: "Notifications", Icon: Bell },
  { id: "profile", label: "Settings", Icon: Settings },
];

function DesktopSidebar({ active, onNav, currentMember, onLogout }: { active: string; onNav: (s: Screen) => void; currentMember: Member; onLogout: () => void }) {
  return (
    <div
      style={{
        width: 220,
        background: C.sidebar,
        height: "100vh",
        position: "fixed",
        left: 0,
        top: 0,
        display: "flex",
        flexDirection: "column",
        padding: "24px 0",
        zIndex: 50,
      }}
    >
      <div style={{ padding: "0 20px 28px" }}>
        <Logo size={28} light />
      </div>

      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 2, padding: "0 12px" }}>
        {SIDEBAR_ITEMS.map((item) => {
          const isActive = active === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNav(item.id as Screen)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "10px 12px",
                borderRadius: 8,
                background: isActive ? C.primary : "transparent",
                border: "none",
                cursor: "pointer",
                width: "100%",
                textAlign: "left",
              }}
            >
              <item.Icon size={16} color={isActive ? "#fff" : "rgba(248,255,249,0.72)"} strokeWidth={isActive ? 2.2 : 1.8} />
              <span
                style={{
                  fontSize: 13,
                  fontWeight: isActive ? 600 : 400,
                color: isActive ? "#fff" : "rgba(248,255,249,0.72)",
                  fontFamily: "Outfit, sans-serif",
                }}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>

      <div style={{ padding: "16px 20px", borderTop: "1px solid rgba(255,255,255,0.1)" }}>
        <AccountMenu currentMember={currentMember} onNav={onNav} onLogout={onLogout} layout="sidebar" />
      </div>
    </div>
  );
}

// ── Page Shell ─────────────────────────────────────────────────────────────
function MobileShell({
  children,
  activeNav,
  onNav,
  title,
  onBack,
  rightAction,
}: {
  children: React.ReactNode;
  activeNav: string;
  onNav: (s: Screen) => void;
  title?: string;
  onBack?: () => void;
  rightAction?: React.ReactNode;
}) {
  return (
    <div className="app-shell app-shell-redesign" style={{ background: `linear-gradient(180deg, ${C.bg} 0%, #EDF5EE 100%)`, minHeight: "100vh", paddingBottom: 90 }}>
      <div className="hf-global-grid" />
      <div className="ambient-ribbon ribbon-one" />
      <div className="ambient-ribbon ribbon-two" />
      {title && (
        <div
          className="mobile-titlebar household-hero panel-orbit"
          style={{
            position: "sticky",
            top: 0,
            zIndex: 10,
            padding: "18px 20px 14px",
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          {onBack && (
            <button
              onClick={onBack}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                fontSize: 20,
                color: C.text,
                padding: 0,
                lineHeight: 1,
              }}
            >
              ←
            </button>
          )}
          <h1
            style={{
              fontFamily: "Outfit, sans-serif",
              fontSize: 18,
              fontWeight: 700,
              color: C.text,
              margin: 0,
              flex: 1,
            }}
          >
            {title}
          </h1>
          {rightAction}
        </div>
      )}
      <div className="screen-body">{children}</div>
      <BottomNav active={activeNav} onNav={onNav} />
    </div>
  );
}

// ── Welcome Screen ─────────────────────────────────────────────────────────
function WelcomeScreen({ onNav }: { onNav: (s: Screen) => void }) {
  return (
    <div
      className="welcome-screen hf-welcome"
      style={{
        minHeight: "100vh",
        padding: "28px 22px 26px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div className="hf-global-grid" />
      <div className="ambient-ribbon ribbon-one" />
      <div className="ambient-ribbon ribbon-two" />

      <div className="welcome-topline">
        <div className="welcome-logo">
          <Logo size={38} light />
        </div>
        <div className="welcome-badge">
          <Sparkles size={14} />
          <span>Live household ledger</span>
        </div>
      </div>

      <HiggsfieldScene />

      <div className="welcome-copy">
        <div className="welcome-kicker">Built for shared homes</div>
        <h1>Split bills with cinematic clarity.</h1>
        <p>
          See who paid, what is due, and how every amount was calculated without losing the human feel of a real household.
        </p>
      </div>

      <div className="welcome-proof-grid">
        <div>
          <CircleDollarSign size={17} />
          <strong>₱29,120</strong>
          <span>tracked this month</span>
        </div>
        <div>
          <HandCoins size={17} />
          <strong>1 pending</strong>
          <span>Jamie review</span>
        </div>
      </div>

      <div className="welcome-actions">
        <a
          href="#login"
          className="primary-action"
          onPointerDown={() => onNav("login")}
          onClick={() => onNav("login")}
          style={{
            background: C.sidebarText,
            color: C.primary,
            border: "none",
            borderRadius: 14,
            padding: "16px 0",
            fontSize: 16,
            fontWeight: 700,
            fontFamily: "Outfit, sans-serif",
            cursor: "pointer",
            width: "100%",
            boxShadow: "0 16px 34px rgba(16,37,31,0.22)",
            textDecoration: "none",
          }}
        >
          Enter household <ArrowRight size={17} />
        </a>
        <a
          href="#register"
          className="secondary-action"
          onPointerDown={() => onNav("register")}
          onClick={() => onNav("register")}
          style={{
            background: "transparent",
            color: C.sidebarText,
            border: "2px solid rgba(248,255,249,0.38)",
            borderRadius: 14,
            padding: "15px 0",
            fontSize: 16,
            fontWeight: 600,
            fontFamily: "Outfit, sans-serif",
            cursor: "pointer",
            width: "100%",
            textDecoration: "none",
            display: "inline-flex",
            justifyContent: "center",
          }}
        >
          Create Account
        </a>
      </div>
    </div>
  );
}

// ── Login Screen ───────────────────────────────────────────────────────────
function LoginScreen({ onNav, currentMember, onLogin, members }: { onNav: (s: Screen) => void; currentMember: DemoMember; onLogin: (memberId: number) => void; members: DemoMember[] }) {
  const [email, setEmail] = useState(memberEmail(currentMember));
  const [password, setPassword] = useState("••••••••");

  useEffect(() => {
    setEmail(memberEmail(currentMember));
  }, [currentMember]);

  const selectedMember = members.find((m) => memberEmail(m) === email.trim().toLowerCase()) ?? currentMember;
  const loginAs = (member: DemoMember = selectedMember) => {
    onLogin(member.id);
    onNav("dashboard");
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "14px 16px",
    borderRadius: 12,
    border: `1.5px solid ${C.border}`,
    fontSize: 15,
    fontFamily: "Inter, sans-serif",
    background: C.card,
    color: C.text,
    outline: "none",
    boxSizing: "border-box",
  };

  return (
    <div className="auth-screen" style={{ minHeight: "100vh", background: C.bg, padding: "0 24px 32px", position: "relative", overflow: "hidden" }}>
      <div className="ambient-ribbon ribbon-one" />
      <div className="ambient-ribbon ribbon-two" />

      {/* Decorative background blobs */}
      <svg style={{ position: "absolute", top: -60, right: -60, opacity: 0.07, pointerEvents: "none" }} width="260" height="260" viewBox="0 0 260 260">
        <circle cx="130" cy="130" r="130" fill={C.primary} />
      </svg>
      <svg style={{ position: "absolute", bottom: 80, left: -70, opacity: 0.06, pointerEvents: "none" }} width="220" height="220" viewBox="0 0 220 220">
        <circle cx="110" cy="110" r="110" fill={C.primary} />
      </svg>
      <svg style={{ position: "absolute", bottom: 0, right: 20, opacity: 0.04, pointerEvents: "none" }} width="140" height="140" viewBox="0 0 140 140">
        <circle cx="70" cy="70" r="70" fill={C.text} />
      </svg>

      {/* Subtle dot grid */}
      <svg style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", opacity: 0.035, pointerEvents: "none" }} xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="dots" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1.5" fill={C.text} />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dots)" />
      </svg>

      <div className="auth-hero panel-orbit" style={{ background: `linear-gradient(145deg, ${C.primaryDeep} 0%, ${C.primary} 62%, ${C.accent} 140%)`, margin: "0 -24px 32px", padding: "48px 24px 32px", borderRadius: "0 0 28px 28px", display: "flex", flexDirection: "column", alignItems: "flex-start", position: "relative", overflow: "hidden", boxShadow: "0 18px 34px rgba(18,60,54,0.16)" }}>

        {/* Header inner decoration */}
        <svg style={{ position: "absolute", top: -30, right: -30, opacity: 0.12, pointerEvents: "none" }} width="160" height="160" viewBox="0 0 160 160">
          <path d="M0 80H160M80 0V160M20 20L140 140" stroke={C.sidebarText} strokeWidth="1.2" fill="none" />
        </svg>
        <svg style={{ position: "absolute", bottom: -20, right: 60, opacity: 0.08, pointerEvents: "none" }} width="90" height="90" viewBox="0 0 90 90">
          <path d="M0 45H90M45 0V90" stroke={C.sidebarText} strokeWidth="1.4" fill="none" />
        </svg>

        <Logo size={28} light />
        <h1 style={{ fontFamily: "Outfit, sans-serif", fontSize: 26, fontWeight: 700, color: C.sidebarText, marginTop: 20, marginBottom: 4 }}>
          Welcome back
        </h1>
        <p style={{ color: "rgba(248,255,249,0.76)", fontSize: 15, margin: 0 }}>Sign in to your household account.</p>
      </div>
      <div className="auth-form" style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        <div>
          <label style={{ fontSize: 12, fontWeight: 600, color: C.muted, display: "block", marginBottom: 6, fontFamily: "Outfit, sans-serif" }}>
            Email address
          </label>
          <input className="auth-input" style={inputStyle} value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label style={{ fontSize: 12, fontWeight: 600, color: C.muted, display: "block", marginBottom: 6, fontFamily: "Outfit, sans-serif" }}>
            Password
          </label>
          <input className="auth-input" style={inputStyle} type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <div style={{ textAlign: "right", marginTop: 6 }}>
            <button style={{ background: "none", border: "none", color: C.primary, fontSize: 13, fontWeight: 500, cursor: "pointer", padding: 0, fontFamily: "Inter, sans-serif" }}>
              Forgot password?
            </button>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
          {members.map((member) => (
            <a
              href="#dashboard"
              key={member.id}
              onPointerDown={() => loginAs(member)}
              onClick={() => loginAs(member)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "10px",
                borderRadius: 12,
                border: `1px solid ${member.id === selectedMember.id ? C.primary : C.border}`,
                background: member.id === selectedMember.id ? C.primaryLight : C.card,
                color: C.text,
                textDecoration: "none",
                cursor: "pointer",
              }}
            >
              <Avatar initials={member.avatar} color={member.color} size={28} />
              <div>
                <div style={{ fontFamily: "Outfit, sans-serif", fontSize: 12, fontWeight: 800 }}>{member.nick}</div>
                <div style={{ fontSize: 10, color: C.muted }}>{isMainTenant(member) ? "Manager" : "Tenant"}</div>
              </div>
            </a>
          ))}
        </div>

        <a
          href="#dashboard"
          className="primary-action"
          onPointerDown={() => loginAs()}
          onClick={() => loginAs()}
          style={{
            background: C.primary,
            color: "#fff",
            border: "none",
            borderRadius: 14,
            padding: "16px 0",
            fontSize: 16,
            fontWeight: 700,
            fontFamily: "Outfit, sans-serif",
            cursor: "pointer",
            marginTop: 8,
            textDecoration: "none",
            textAlign: "center",
          }}
        >
          Log In as {selectedMember.nick}
        </a>
      </div>

      <p style={{ textAlign: "center", marginTop: 28, color: C.muted, fontSize: 14 }}>
        No account yet?{" "}
        <button onPointerDown={() => onNav("register")} onClick={() => onNav("register")} style={{ background: "none", border: "none", color: C.primary, fontWeight: 600, cursor: "pointer", fontSize: 14, padding: 0 }}>
          Create Account
        </button>
      </p>
    </div>
  );
}

// ── Register Screen ────────────────────────────────────────────────────────
function RegisterScreen({ onNav, onRegister, nextMemberId, inviteCodes, accounts }: { onNav: (s: Screen) => void; onRegister: (member: AccountRecord, householdValue: string, role: "main" | "tenant", faceVerified: boolean, idUploaded: boolean) => void; nextMemberId: number; inviteCodes: string[]; accounts: AccountRecord[] }) {
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [role, setRole] = useState<"main" | "tenant">("tenant");
  const [household, setHousehold] = useState("");
  const [faceVerified, setFaceVerified] = useState(false);
  const [idUploaded, setIdUploaded] = useState(false);
  const [inviteError, setInviteError] = useState("");
  const [formError, setFormError] = useState("");
  const tenantInviteValid = role === "tenant" && household ? inviteCodes.some((code) => inviteMatches(household, code)) : false;
  const normalizedEmail = email.trim().toLowerCase();
  const normalizedPhone = normalizePHPhone(phone);
  const hasFullName = name.trim().split(/\s+/).length >= 2;
  const phoneValid = /^639\d{9}$/.test(normalizedPhone);
  const emailTaken = accounts.some((member) => memberEmail(member).toLowerCase() === normalizedEmail);
  const phoneTaken = Boolean(normalizedPhone) && accounts.some((member) => member.phone === normalizedPhone);
  const passwordValid = password.length >= 8;

  const inp = (val: string, set: (v: string) => void, placeholder: string, type = "text") => (
    <input
      className="auth-input"
      type={type}
      value={val}
      onChange={(e) => set(e.target.value)}
      placeholder={placeholder}
      style={{ width: "100%", padding: "13px 14px", borderRadius: 12, border: `1.5px solid ${C.border}`, fontSize: 14, background: C.bg, color: C.text, fontFamily: "Inter, sans-serif", boxSizing: "border-box", outline: "none" }}
    />
  );
  const PasswordField = () => (
    <div style={{ position: "relative" }}>
      <input
        className="auth-input"
        type={showConfirmPassword ? "text" : "password"}
        value={confirm}
        onChange={(e) => setConfirm(e.target.value)}
        placeholder="Confirm Password"
        style={{ width: "100%", padding: "13px 46px 13px 14px", borderRadius: 12, border: `1.5px solid ${C.border}`, fontSize: 14, background: C.bg, color: C.text, fontFamily: "Inter, sans-serif", boxSizing: "border-box", outline: "none" }}
      />
      <button
        type="button"
        onClick={() => setShowConfirmPassword((visible) => !visible)}
        aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
        style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", width: 30, height: 30, border: "none", background: "transparent", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: C.muted }}
      >
        {showConfirmPassword ? <EyeOff size={17} /> : <Eye size={17} />}
      </button>
    </div>
  );

  const completeRegistration = () => {
    if (!household || !name || !email) return;
    if (role === "tenant" && !tenantInviteValid) {
      setInviteError("Invitation declined. Tenants need a valid household invite link or code from the main tenant.");
      return;
    }
    setInviteError("");
    const names = name.trim().split(/\s+/);
    const first = names[0] ?? "New";
    const last = names.slice(1).join(" ") || "Tenant";
    onRegister({
      id: nextMemberId,
      name: `${first} ${last}`,
      nick: first,
      role: role === "main" ? "Main Tenant / Manager" : "Tenant",
      avatar: `${first[0] ?? "N"}${last[0] ?? "T"}`.toUpperCase(),
      color: "#6D8C7F",
      paid: 0,
      owed: 0,
      email: normalizedEmail,
      phone: normalizedPhone,
      birthdate,
    }, household, role, faceVerified, idUploaded);
    onNav("dashboard");
  };
  const continuePersonalDetails = () => {
    const nextError =
      !hasFullName ? "Enter first name and last name." :
      !normalizedEmail ? "Enter a valid email address." :
      emailTaken ? "That email is already used by another account." :
      !birthdate ? "Enter your birthdate." :
      !phoneValid ? "Enter a valid PH mobile number, e.g. +639171234567." :
      phoneTaken ? "That phone number is already used by another account." :
      !passwordValid ? "Password must be at least 8 characters." :
      password !== confirm ? "Passwords do not match." :
      "";
    setFormError(nextError);
    if (!nextError) setStep(2);
  };

  return (
    <div className="auth-screen register-screen" style={{ minHeight: "100vh", background: C.bg, display: "flex", flexDirection: "column", padding: "52px 28px 32px" }}>
      <div className="ambient-ribbon ribbon-one" />
      <button onClick={() => step === 1 ? onNav("welcome") : setStep(1)} style={{ background: "none", border: "none", color: C.muted, cursor: "pointer", fontSize: 13, textAlign: "left", marginBottom: 24, padding: 0, fontFamily: "Outfit, sans-serif", fontWeight: 600 }}>
        ← {step === 1 ? "Back" : "Previous"}
      </button>

      <div style={{ display: "flex", gap: 6, marginBottom: 28 }}>
        {[1, 2].map((s) => (
          <div className="progress-bar" key={s} style={{ flex: 1, height: 4, borderRadius: 4, background: s <= step ? C.primary : C.border, transition: "background 0.3s" }} />
        ))}
      </div>

      <h1 style={{ fontFamily: "Outfit, sans-serif", fontSize: 26, fontWeight: 800, color: C.text, marginBottom: 4 }}>
        {step === 1 ? "Create Account" : "Your Household"}
      </h1>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 28 }}>
        {step === 1 ? "Step 1 of 2 — Personal details" : "Step 2 of 2 — Household setup"}
      </p>

      {step === 1 && (
        <div className="auth-form" style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {inp(name, setName, "Full Name")}
          {inp(email, setEmail, "Email Address", "email")}
          {inp(birthdate, setBirthdate, "Birthdate", "date")}
          <input
            className="auth-input"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(clampPHPhoneInput(e.target.value))}
            placeholder="PH Mobile Number e.g. +639171234567"
            maxLength={13}
            style={{ width: "100%", padding: "13px 14px", borderRadius: 12, border: `1.5px solid ${C.border}`, fontSize: 14, background: C.bg, color: C.text, fontFamily: "Inter, sans-serif", boxSizing: "border-box", outline: "none" }}
          />
          {inp(password, setPassword, "Password", "password")}
          <PasswordField />
          <div style={{ fontSize: 11, color: C.muted, lineHeight: 1.45 }}>
            Phone format: +63 plus 10 mobile digits. Password minimum: 8 characters.
          </div>
          {formError && (
            <div style={{ background: C.unpaidBg, border: `1px solid ${C.unpaid}40`, color: C.unpaid, borderRadius: 12, padding: "10px 12px", fontSize: 12, lineHeight: 1.45 }}>
              {formError}
            </div>
          )}
          <button
            className="primary-action"
            onClick={continuePersonalDetails}
            style={{ marginTop: 8, background: C.primary, color: "#fff", border: "none", borderRadius: 14, padding: "15px 0", fontSize: 16, fontWeight: 700, fontFamily: "Outfit, sans-serif", cursor: "pointer", opacity: (name && email && birthdate && phone && password && confirm) ? 1 : 0.5 }}
          >
            Continue
          </button>
          <p style={{ textAlign: "center", color: C.muted, fontSize: 13 }}>
            Already have an account?{" "}
            <button onClick={() => onNav("login")} style={{ background: "none", border: "none", color: C.primary, fontWeight: 600, cursor: "pointer", fontSize: 13, padding: 0 }}>Log In</button>
          </p>
        </div>
      )}

      {step === 2 && (
        <div className="auth-form" style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div>
            <p style={{ fontSize: 13, color: C.muted, marginBottom: 8, fontWeight: 600 }}>Your Role</p>
            <div style={{ display: "flex", gap: 10 }}>
              {([["main", "Main Tenant", "Manage bills & verify payments"], ["tenant", "Tenant", "Pay your share of bills"]] as const).map(([val, label, sub]) => (
                <button className="choice-card" key={val} onClick={() => setRole(val)} style={{ flex: 1, padding: "12px 10px", borderRadius: 12, border: `2px solid ${role === val ? C.primary : C.border}`, background: role === val ? C.primaryLight : C.card, cursor: "pointer", textAlign: "left" }}>
                  <div style={{ fontFamily: "Outfit, sans-serif", fontSize: 13, fontWeight: 700, color: role === val ? C.primary : C.text }}>{label}</div>
                  <div style={{ fontSize: 11, color: C.muted, marginTop: 2 }}>{sub}</div>
                </button>
              ))}
            </div>
          </div>
          {role === "main"
            ? inp(household, setHousehold, "Household Name (e.g. Sunrise Apartment)")
            : inp(household, setHousehold, "Invite Link or Code e.g. HS-SUNRISE-2026")
          }
          <p style={{ fontSize: 12, color: C.muted }}>
            {role === "main" ? "You will create a new household and can invite members." : `Join link sample: ${HOUSEHOLD_INVITE_LINK}`}
          </p>
          {role === "tenant" && household && !tenantInviteValid && (
            <div style={{ background: C.pendingBg, border: `1px solid ${C.pending}40`, color: C.pending, borderRadius: 12, padding: "10px 12px", fontSize: 12, lineHeight: 1.45 }}>
              This invite does not match an existing household. The tenant account will be declined until the code is correct.
            </div>
          )}
          {inviteError && (
            <div style={{ background: C.unpaidBg, border: `1px solid ${C.unpaid}40`, color: C.unpaid, borderRadius: 12, padding: "10px 12px", fontSize: 12, lineHeight: 1.45 }}>
              {inviteError}
            </div>
          )}
          <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 14, padding: 14 }}>
            <div style={{ fontFamily: "Outfit, sans-serif", fontSize: 13, fontWeight: 800, color: C.text, marginBottom: 10 }}>Identity Verification</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              <button className="choice-card" onClick={() => setFaceVerified(true)} style={{ border: `1.5px solid ${faceVerified ? C.paid : C.border}`, background: faceVerified ? C.paidBg : C.card, borderRadius: 12, padding: 12, cursor: "pointer" }}>
                <Camera size={18} color={faceVerified ? C.paid : C.primary} />
                <div style={{ fontSize: 12, fontWeight: 800, color: C.text, marginTop: 6 }}>{faceVerified ? "Face captured" : "Face check"}</div>
              </button>
              <button className="choice-card" onClick={() => setIdUploaded(true)} style={{ border: `1.5px solid ${idUploaded ? C.paid : C.border}`, background: idUploaded ? C.paidBg : C.card, borderRadius: 12, padding: 12, cursor: "pointer" }}>
                <IdCard size={18} color={idUploaded ? C.paid : C.primary} />
                <div style={{ fontSize: 12, fontWeight: 800, color: C.text, marginTop: 6 }}>{idUploaded ? "ID uploaded" : "Upload ID"}</div>
              </button>
            </div>
            <p style={{ fontSize: 11, color: C.muted, margin: "10px 0 0" }}>Prototype only: main tenant gets notified and can review identity details.</p>
          </div>
          <button
            className="primary-action"
            onClick={completeRegistration}
            style={{ marginTop: 8, background: C.primary, color: "#fff", border: "none", borderRadius: 14, padding: "15px 0", fontSize: 16, fontWeight: 700, fontFamily: "Outfit, sans-serif", cursor: "pointer", opacity: household && (role === "main" || tenantInviteValid) ? 1 : 0.55 }}
          >
            Create Account
          </button>
        </div>
      )}
    </div>
  );
}

// ── Dashboard ──────────────────────────────────────────────────────────────
function DashboardScreen({
  onNav, expensesLive, myUnpaid, unpaidCount, pendingQueue, onSelectExpense, currentMember, household, onLogout,
}: {
  onNav: (s: Screen) => void;
  expensesLive: typeof EXPENSES;
  myUnpaid: number;
  unpaidCount: number;
  pendingQueue: number[];
  onSelectExpense: (id: number, dest?: Screen) => void;
  currentMember: DemoMember;
  household: HouseholdRecord;
  onLogout: () => void;
}) {
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";
  const upcoming = expensesLive.filter((e) => e.status !== "Paid").slice(0, 3);
  const nextDue = upcoming[0]?.due ?? "—";
  const manager = household.mainTenantId === currentMember.id;

  return (
    <MobileShell activeNav="dashboard" onNav={onNav}>
      <div style={{ padding: "20px 20px 0" }}>
        <div className="dashboard-showcase">
          <div>
            <div className="screen-prelude-label">{household.name}</div>
            <h2>{manager ? "Manager view for household money." : "Household money, live and beautifully clear."}</h2>
            <p>{manager ? `${pendingQueue.length} payment needs your review.` : unpaidCount === 0 ? "Everyone is settled." : `${unpaidCount} bills need attention before ${nextDue}.`}</p>
          </div>
          <HiggsfieldScene compact />
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
          <div>
            <p style={{ color: C.muted, fontSize: 13, margin: 0, fontFamily: "Outfit, sans-serif" }}>{greeting},</p>
            <h1 style={{ fontFamily: "Outfit, sans-serif", fontSize: 22, fontWeight: 800, color: C.text, margin: "2px 0 0" }}>
              {currentMember.nick}
            </h1>
            <p style={{ color: C.muted, fontSize: 12, margin: "3px 0 0" }}>{currentMember.role}</p>
          </div>
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <button
            onClick={() => onNav("notifications")}
            style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, width: 38, height: 38, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", position: "relative" }}
          >
            <Bell size={18} color={C.text} strokeWidth={1.8} />
              {pendingQueue.length > 0 && <span style={{ position: "absolute", top: 6, right: 6, width: 8, height: 8, background: C.primary, borderRadius: "50%", border: "2px solid white" }} />}
          </button>
            <AccountMenu currentMember={currentMember} onNav={onNav} onLogout={onLogout} />
          </div>
        </div>

        {/* Balance Card */}
        <div className="balance-card" style={{ background: `linear-gradient(135deg, ${C.primaryDeep} 0%, ${C.primary} 58%, ${C.accent} 145%)`, borderRadius: 20, padding: "24px 20px", marginBottom: 24, position: "relative", overflow: "hidden", boxShadow: "0 18px 38px rgba(18,60,54,0.22)" }}>
          <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.16, pointerEvents: "none" }} xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="balanceLines" x="0" y="0" width="36" height="36" patternUnits="userSpaceOnUse">
                <path d="M0 18H36M18 0V36" stroke="#fff" strokeWidth="0.8" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#balanceLines)" />
          </svg>
          <div className="echo-wave" />
          <div className="balance-callout callout-top">AUTO SPLIT</div>
          <div className="balance-callout callout-bottom">{unpaidCount} DUE</div>
          <p style={{ color: "rgba(255,255,255,0.75)", fontSize: 12, fontWeight: 600, letterSpacing: 0.5, fontFamily: "Outfit, sans-serif", margin: 0 }}>
            YOUR OUTSTANDING BALANCE
          </p>
          <div style={{ fontFamily: "Outfit, sans-serif", fontSize: 38, fontWeight: 800, color: "#fff", margin: "8px 0 4px", letterSpacing: -1 }}>
            {myUnpaid === 0 ? "₱0.00" : peso(myUnpaid)}
          </div>
          <p style={{ color: "rgba(255,255,255,0.8)", fontSize: 13, margin: "0 0 16px" }}>
            {unpaidCount === 0 ? "All caught up! No unpaid expenses" : `${unpaidCount} unpaid expense${unpaidCount > 1 ? "s" : ""} · Next due ${nextDue}`}
          </p>
          <button
            onClick={() => onNav("expenses")}
            style={{ background: "rgba(255,255,255,0.18)", border: "1px solid rgba(255,255,255,0.32)", borderRadius: 10, padding: "8px 16px", color: "#fff", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "Outfit, sans-serif", backdropFilter: "blur(8px)" }}
          >
            View Amount Breakdown →
          </button>
        </div>

        <BillingCycleChart />

        {/* Upcoming Expenses */}
        <div style={{ marginBottom: 24 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
            <h2 style={{ fontFamily: "Outfit, sans-serif", fontSize: 16, fontWeight: 700, color: C.text, margin: 0 }}>Upcoming Expenses</h2>
            <button onClick={() => onNav("expenses")} style={{ background: "none", border: "none", color: C.primary, fontSize: 13, fontWeight: 600, cursor: "pointer", padding: 0, fontFamily: "Outfit, sans-serif" }}>See all</button>
          </div>
          {upcoming.length === 0 ? (
            <div style={{ background: C.paidBg, borderRadius: 14, padding: "20px", textAlign: "center" }}>
              <CheckCircle2 size={28} color={C.paid} style={{ marginBottom: 8 }} />
              <div style={{ fontFamily: "Outfit, sans-serif", fontSize: 14, fontWeight: 600, color: C.paid }}>All expenses paid!</div>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {upcoming.map((exp) => (
                <div
                  key={exp.id}
                  onClick={() => onSelectExpense(exp.id, "expense-detail")}
                  className="expense-card"
                  style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 14, padding: "14px 16px", display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer", boxShadow: C.shadow }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{ width: 40, height: 40, borderRadius: 10, background: C.primaryLight, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <exp.Icon size={18} color={C.primary} strokeWidth={1.8} />
                    </div>
                    <div>
                      <div style={{ fontFamily: "Outfit, sans-serif", fontSize: 14, fontWeight: 600, color: C.text }}>{exp.name}</div>
                      <div style={{ fontSize: 12, color: C.muted }}>Due {exp.due}</div>
                    </div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontFamily: "Outfit, sans-serif", fontSize: 15, fontWeight: 700, color: C.text }}>{peso(exp.myShare)}</div>
                    <StatusBadge status={exp.status} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Household Activity */}
        <div style={{ marginBottom: 12 }}>
          <h2 style={{ fontFamily: "Outfit, sans-serif", fontSize: 16, fontWeight: 700, color: C.text, marginBottom: 12 }}>
            Household Activity
          </h2>
          <div
            className="activity-card"
            style={{
              background: C.card,
              border: `1px solid ${C.border}`,
              borderRadius: 14,
              overflow: "hidden",
              boxShadow: C.shadow,
            }}
          >
            {ACTIVITIES.map((act, i) => (
              <div
                key={act.id}
                className="activity-row"
                style={{
                  padding: "13px 16px",
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  borderBottom: i < ACTIVITIES.length - 1 ? `1px solid ${C.border}` : "none",
                }}
              >
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: "50%",
                    background: C.primaryLight,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <act.Icon size={14} color={C.primary} strokeWidth={2} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, color: C.text, fontWeight: 500 }}>{act.text}</div>
                  <div style={{ fontSize: 11, color: C.muted, marginTop: 2 }}>{act.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Add Expense FAB */}
        {manager && (
          <button
            className="fab-button"
            onClick={() => onNav("add-expense")}
            style={{
              position: "fixed",
              bottom: 90,
              right: 20,
              background: C.accent,
              color: "#fff",
              border: "none",
              borderRadius: "50%",
              width: 56,
              height: 56,
              fontSize: 26,
              cursor: "pointer",
              boxShadow: "0 14px 28px rgba(232,137,79,0.34)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            +
          </button>
        )}
      </div>
    </MobileShell>
  );
}

// ── Expenses Screen ────────────────────────────────────────────────────────
function ExpensesScreen({ onNav, expensesLive, onSelectExpense, currentMember }: {
  onNav: (s: Screen) => void;
  expensesLive: typeof EXPENSES;
  onSelectExpense: (id: number, dest?: Screen) => void;
  currentMember: Member;
}) {
  const [filter, setFilter] = useState("All");
  const filters = ["All", "Unpaid", "Paid", "Pending", "Overdue"];
  const manager = isMainTenant(currentMember);

  const filtered =
    filter === "All"
      ? expensesLive
      : expensesLive.filter((e) => {
          if (filter === "Pending") return e.status === "Pending Verification";
          return e.status === filter;
        });

  const myUnpaid = expensesLive.filter((e) => e.status === "Unpaid" || e.status === "Overdue").reduce((s, e) => s + e.myShare, 0);
  const myPaid = expensesLive.filter((e) => e.status === "Paid").reduce((s, e) => s + e.myShare, 0);

  return (
    <MobileShell
      activeNav="expenses"
      onNav={onNav}
      title="Expenses"
      rightAction={
        manager ? (
          <button
            onClick={() => onNav("add-expense")}
            style={{
              background: C.primary,
              color: "#fff",
              border: "none",
              borderRadius: 10,
              padding: "7px 14px",
              fontSize: 13,
              fontWeight: 600,
              cursor: "pointer",
              fontFamily: "Outfit, sans-serif",
            }}
          >
            + Add
          </button>
        ) : null
      }
    >
      <div style={{ padding: "16px 20px 0" }}>
        <ScreenPrelude label="Expense Control" title="Track every shared bill" value={peso(myUnpaid)} icon={Receipt} />
        {/* Summary row */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 10,
            marginBottom: 16,
          }}
        >
          <div className="metric-card warning-card" style={{ background: C.unpaidBg, borderRadius: 12, padding: "12px 14px" }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: C.unpaid, fontFamily: "Outfit, sans-serif" }}>TOTAL OWED</div>
            <div style={{ fontFamily: "Outfit, sans-serif", fontSize: 20, fontWeight: 800, color: C.text }}>{peso(myUnpaid)}</div>
          </div>
          <div className="metric-card success-card" style={{ background: C.paidBg, borderRadius: 12, padding: "12px 14px" }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: C.paid, fontFamily: "Outfit, sans-serif" }}>TOTAL PAID</div>
            <div style={{ fontFamily: "Outfit, sans-serif", fontSize: 20, fontWeight: 800, color: C.text }}>{peso(myPaid)}</div>
          </div>
        </div>

        {/* Filters */}
        <div style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 4, marginBottom: 14 }}>
          {filters.map((f) => (
            <button
              className="filter-pill"
              key={f}
              onClick={() => setFilter(f)}
              style={{
                background: filter === f ? C.primary : C.card,
                color: filter === f ? "#fff" : C.muted,
                border: `1px solid ${filter === f ? C.primary : C.border}`,
                borderRadius: 20,
                padding: "6px 14px",
                fontSize: 13,
                fontWeight: 600,
                cursor: "pointer",
                whiteSpace: "nowrap",
                fontFamily: "Outfit, sans-serif",
              }}
            >
              {f}
            </button>
          ))}
        </div>

        {/* List */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {filtered.length === 0 ? (
            <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 16, padding: "24px 18px", textAlign: "center" }}>
              <Receipt size={30} color={C.primary} strokeWidth={1.7} style={{ marginBottom: 8 }} />
              <div style={{ fontFamily: "Outfit, sans-serif", fontSize: 15, fontWeight: 900, color: C.text }}>No expenses yet</div>
              <div style={{ fontSize: 12, color: C.muted, marginTop: 4 }}>
                The main tenant can add rent, internet, water, electricity, or custom bills here.
              </div>
            </div>
          ) : filtered.map((exp) => (
            <div
              key={exp.id}
              onClick={() => onSelectExpense(exp.id, "expense-detail")}
              className="expense-card"
              style={{
                background: C.card,
                border: `1px solid ${C.border}`,
                borderRadius: 14,
                padding: "14px 16px",
                cursor: "pointer",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div
                    style={{
                      width: 38,
                      height: 38,
                      borderRadius: 10,
                      background: C.primaryLight,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <exp.Icon size={17} color={C.primary} strokeWidth={1.8} />
                  </div>
                  <div>
                    <div style={{ fontFamily: "Outfit, sans-serif", fontSize: 14, fontWeight: 700, color: C.text }}>{exp.name}</div>
                    <div style={{ fontSize: 11, color: C.muted }}>{exp.period}</div>
                  </div>
                </div>
                <StatusBadge status={exp.status} />
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: 12,
                  paddingTop: 10,
                  borderTop: `1px solid ${C.border}`,
                }}
              >
                <div>
                  <div style={{ fontSize: 11, color: C.muted }}>Total</div>
                  <div style={{ fontFamily: "Outfit, sans-serif", fontSize: 13, fontWeight: 600, color: C.text }}>{peso(exp.total)}</div>
                </div>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 11, color: C.muted }}>Your share</div>
                  <div style={{ fontFamily: "Outfit, sans-serif", fontSize: 13, fontWeight: 700, color: C.primary }}>{peso(exp.myShare)}</div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: 11, color: C.muted }}>Due</div>
                  <div style={{ fontFamily: "Outfit, sans-serif", fontSize: 13, fontWeight: 600, color: C.text }}>{exp.due}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </MobileShell>
  );
}

// ── Expense Detail ─────────────────────────────────────────────────────────
function ExpenseDetailScreen({ onNav, expense, onPay, currentMember, members, memberStatuses = {}, expenseShares = {} }: {
  onNav: (s: Screen) => void;
  expense: typeof EXPENSES[0];
  onPay: () => void;
  currentMember: DemoMember;
  members: DemoMember[];
  memberStatuses?: Record<number, Record<number, StatusKey>>;
  expenseShares?: Record<number, Record<number, number>>;
}) {
  const [showCalc, setShowCalc] = useState(false);
  const exp = expense;

  const memberShares = members.map((member) => ({
    member,
    status: memberStatuses?.[member.id]?.[exp.id] ?? "Unpaid" as StatusKey,
    share: getExpenseShare(exp, member.id, expenseShares[exp.id]),
  }));

  return (
    <MobileShell
      activeNav="expenses"
      onNav={onNav}
      title={exp.name}
      onBack={() => onNav("expenses")}
    >
      <div style={{ padding: "16px 20px 0" }}>
        {/* Header card */}
        <div
          style={{
            background: C.card,
            border: `1px solid ${C.border}`,
            borderRadius: 16,
            padding: "20px",
            marginBottom: 14,
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
            <div>
              <div style={{ fontSize: 11, color: C.muted, fontWeight: 600, fontFamily: "Outfit, sans-serif" }}>TOTAL EXPENSE</div>
              <div style={{ fontFamily: "Outfit, sans-serif", fontSize: 28, fontWeight: 800, color: C.text }}>{peso(exp.total)}</div>
            </div>
            <StatusBadge status={exp.status} />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            {[
              { label: "Your Share", value: peso(exp.myShare), highlight: true },
              { label: "Due Date", value: exp.due },
              { label: "Period", value: exp.period },
              { label: "Sharing Method", value: exp.method },
            ].map((item) => (
              <div key={item.label} style={{ background: C.bg, borderRadius: 10, padding: "10px 12px" }}>
                <div style={{ fontSize: 10, fontWeight: 600, color: C.muted, fontFamily: "Outfit, sans-serif" }}>{item.label}</div>
                <div
                  style={{
                    fontFamily: "Outfit, sans-serif",
                    fontSize: 14,
                    fontWeight: 700,
                    color: item.highlight ? C.primary : C.text,
                    marginTop: 2,
                  }}
                >
                  {item.value}
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => setShowCalc(!showCalc)}
            style={{
              marginTop: 14,
              background: C.primaryLight,
              border: "none",
              borderRadius: 10,
              padding: "10px 14px",
              color: C.primary,
              fontSize: 13,
              fontWeight: 600,
              cursor: "pointer",
              width: "100%",
              fontFamily: "Outfit, sans-serif",
            }}
          >
            How was my amount calculated? {showCalc ? "▲" : "▼"}
          </button>

          {showCalc && (
            <div
              style={{
                marginTop: 10,
                background: C.primaryLight,
                borderRadius: 10,
                padding: "14px",
                fontSize: 13,
                color: C.text,
                lineHeight: 1.7,
              }}
            >
              <strong style={{ fontFamily: "Outfit, sans-serif" }}>Calculation Breakdown</strong>
              <div style={{ marginTop: 8, display: "flex", flexDirection: "column", gap: 4 }}>
                <div>Original Bill: <strong>{peso(exp.total)}</strong></div>
                <div>Sharing Rule: <strong>{exp.method}</strong></div>
                <div>Members included: <strong>{members.map((member) => member.nick).join(", ") || currentMember.nick}</strong></div>
                {exp.method === "Occupancy-Based" ? (
                  <div>Away days reduce a member's presence weight, then the bill is split by present days.</div>
                ) : (
                  <div>The bill is split using the selected household sharing method.</div>
                )}
                <div style={{ marginTop: 4, borderTop: `1px solid ${C.border}`, paddingTop: 8, fontWeight: 700, color: C.primary }}>
                  Your share = <strong>{peso(exp.myShare)}</strong>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Member breakdown */}
        <div style={{ marginBottom: 14 }}>
          <h3 style={{ fontFamily: "Outfit, sans-serif", fontSize: 15, fontWeight: 700, color: C.text, marginBottom: 10 }}>
            Member Breakdown
          </h3>
          <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 14, overflow: "hidden" }}>
            {memberShares.map(({ member, status, share }, i) => (
              <div
                key={member.id}
                style={{
                  padding: "12px 16px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  borderBottom: i < memberShares.length - 1 ? `1px solid ${C.border}` : "none",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <Avatar initials={member.avatar} color={member.color} size={32} />
                  <div>
                    <div style={{ fontFamily: "Outfit, sans-serif", fontSize: 13, fontWeight: 600, color: C.text }}>
                      {member.nick}
                      {member.id === currentMember.id && " (You)"}
                    </div>
                    <div style={{ fontSize: 11, color: C.muted }}>{member.role}</div>
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontFamily: "Outfit, sans-serif", fontSize: 14, fontWeight: 700, color: C.text }}>
                    {peso(share)}
                  </div>
                  <StatusBadge status={status} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pay button — only show when unpaid/overdue */}
        {(exp.status === "Unpaid" || exp.status === "Overdue") && (
        <button
          onClick={onPay}
          style={{
            background: C.primary,
            color: "#fff",
            border: "none",
            borderRadius: 14,
            padding: "16px 0",
            fontSize: 16,
            fontWeight: 700,
            fontFamily: "Outfit, sans-serif",
            cursor: "pointer",
            width: "100%",
            marginBottom: 10,
          }}
        >
          Pay {peso(exp.myShare)}
        </button>
        )}
      </div>
    </MobileShell>
  );
}

// ── Add Expense ────────────────────────────────────────────────────────────
function AddExpenseScreen({ onNav, currentMember, members, household, onAddExpense }: { onNav: (s: Screen) => void; currentMember: DemoMember; members: DemoMember[]; household: HouseholdRecord; onAddExpense: (expense: { name: string; category: string; total: number; due: string; method: string; Icon: typeof Home; shares: Record<number, number> }) => void }) {
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Electricity");
  const [amount, setAmount] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [method, setMethod] = useState("Equal Split");
  const [awayDays, setAwayDays] = useState<Record<number, number[]>>({});
  const categories = ["Rent", "Electricity", "Water", "Internet", "Groceries", "Household Supplies", "Other"];
  const methods = ["Equal Split", "Custom Amount", "Percentage", "Selected Members", "Occupancy-Based"];
  const manager = household.mainTenantId === currentMember.id;
  const expenseIcon =
    category === "Rent" ? Home :
    category === "Electricity" ? Zap :
    category === "Water" ? Droplets :
    category === "Internet" ? Wifi :
    category === "Groceries" || category === "Household Supplies" ? ShoppingBasket :
    Receipt;
  const parsedAmount = Number(amount) || 0;
  const displayDue = dueDate
    ? new Date(`${dueDate}T00:00:00`).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
    : "Set due date";
  const hasAwayDays = Object.values(awayDays).some((days) => days.length > 0);
  const effectiveMethod = hasAwayDays ? "Occupancy-Based" : method;
  const equalShare = members.length > 0 ? parsedAmount / members.length : parsedAmount;
  const computedShares = members.reduce<Record<number, number>>((acc, member) => {
    if (effectiveMethod !== "Occupancy-Based") {
      acc[member.id] = Math.round(equalShare * 100) / 100;
      return acc;
    }
    const weights = members.map((m) => Math.max(30 - (awayDays[m.id]?.length ?? 0), 0));
    const totalWeight = weights.reduce((sum, weight) => sum + weight, 0) || members.length || 1;
    const memberWeight = Math.max(30 - (awayDays[member.id]?.length ?? 0), 0);
    acc[member.id] = Math.round((parsedAmount * (memberWeight / totalWeight)) * 100) / 100;
    return acc;
  }, {});
  const toggleAwayDay = (memberId: number, day: number) => {
    setAwayDays((prev) => {
      const current = prev[memberId] ?? [];
      const next = current.includes(day) ? current.filter((d) => d !== day) : [...current, day].sort((a, b) => a - b);
      return { ...prev, [memberId]: next };
    });
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "13px 14px",
    borderRadius: 12,
    border: `1.5px solid ${C.border}`,
    fontSize: 15,
    fontFamily: "Inter, sans-serif",
    background: C.card,
    color: C.text,
    outline: "none",
    boxSizing: "border-box",
  };

  if (!manager) {
    return (
      <MobileShell activeNav="expenses" onNav={onNav} title="Add Expense" onBack={() => onNav("expenses")}>
        <div style={{ padding: "28px 20px 0" }}>
          <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 18, padding: "28px 20px", textAlign: "center", boxShadow: C.shadow }}>
            <div style={{ width: 58, height: 58, borderRadius: 18, background: C.pendingBg, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 14px" }}>
              <Shield size={28} color={C.pending} strokeWidth={1.7} />
            </div>
            <h2 style={{ fontFamily: "Outfit, sans-serif", fontSize: 20, fontWeight: 800, color: C.text, margin: "0 0 8px" }}>
              Main Tenant Only
            </h2>
            <p style={{ fontSize: 13, lineHeight: 1.55, color: C.muted, margin: "0 auto 18px", maxWidth: 300 }}>
              Only the main tenant can add expenses, calculate shares, and assign household bills.
            </p>
            <button
              onClick={() => onNav("expenses")}
              style={{ background: C.primary, color: "#fff", border: "none", borderRadius: 14, padding: "13px 24px", fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "Outfit, sans-serif" }}
            >
              Back to Expenses
            </button>
          </div>
        </div>
      </MobileShell>
    );
  }

  return (
    <MobileShell
      activeNav="expenses"
      onNav={onNav}
      title={`Add Expense`}
      onBack={() => (step > 1 ? setStep(step - 1) : onNav("expenses"))}
    >
      {/* Step indicator */}
      <div style={{ padding: "12px 20px 0" }}>
        <div style={{ display: "flex", gap: 6, marginBottom: 20 }}>
          {[1, 2, 3, 4].map((s) => (
            <div
              key={s}
              style={{
                flex: 1,
                height: 4,
                borderRadius: 2,
                background: s <= step ? C.primary : C.border,
              }}
            />
          ))}
        </div>
        <p style={{ fontSize: 11, fontWeight: 600, color: C.muted, fontFamily: "Outfit, sans-serif", marginBottom: 16 }}>
          STEP {step} OF 4 — {["EXPENSE INFO", "COST SHARING", "OCCUPANCY DAYS", "REVIEW"][step - 1]}
        </p>

        {step === 1 && (
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div>
              <label style={{ fontSize: 12, fontWeight: 600, color: C.muted, display: "block", marginBottom: 6, fontFamily: "Outfit, sans-serif" }}>
                Expense Name
              </label>
              <input className="auth-input" style={inputStyle} value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. September Electricity" />
            </div>
            <div>
              <label style={{ fontSize: 12, fontWeight: 600, color: C.muted, display: "block", marginBottom: 6, fontFamily: "Outfit, sans-serif" }}>
                Category
              </label>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {categories.map((c) => (
                  <button
                    className="filter-pill"
                    key={c}
                    onClick={() => setCategory(c)}
                    style={{
                      padding: "7px 12px",
                      borderRadius: 20,
                      border: `1.5px solid ${category === c ? C.primary : C.border}`,
                      background: category === c ? C.primaryLight : C.card,
                      color: category === c ? C.primary : C.muted,
                      fontSize: 13,
                      fontWeight: 600,
                      cursor: "pointer",
                      fontFamily: "Outfit, sans-serif",
                    }}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label style={{ fontSize: 12, fontWeight: 600, color: C.muted, display: "block", marginBottom: 6, fontFamily: "Outfit, sans-serif" }}>
                Total Amount (₱)
              </label>
              <input className="auth-input" style={inputStyle} value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="0.00" type="number" />
            </div>
            <div>
              <label style={{ fontSize: 12, fontWeight: 600, color: C.muted, display: "block", marginBottom: 6, fontFamily: "Outfit, sans-serif" }}>
                Due Date
              </label>
              <input className="auth-input" style={inputStyle} type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
            </div>
          </div>
        )}

        {step === 2 && (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <p style={{ color: C.muted, fontSize: 13, marginBottom: 4 }}>
              Choose how the cost will be split among household members.
            </p>
            {methods.map((m) => (
              <button
                className="choice-card"
                key={m}
                onClick={() => setMethod(m)}
                style={{
                  padding: "14px 16px",
                  borderRadius: 12,
                  border: `1.5px solid ${method === m ? C.primary : C.border}`,
                  background: method === m ? C.primaryLight : C.card,
                  cursor: "pointer",
                  textAlign: "left",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div>
                  <div style={{ fontFamily: "Outfit, sans-serif", fontSize: 14, fontWeight: 700, color: C.text }}>{m}</div>
                  <div style={{ fontSize: 12, color: C.muted, marginTop: 2 }}>
                    {m === "Equal Split" && "Total divided equally among all members"}
                    {m === "Custom Amount" && "Manually specify each member's amount"}
                    {m === "Percentage" && "Each member pays a set percentage"}
                    {m === "Selected Members" && "Only selected members share this expense"}
                    {m === "Occupancy-Based" && "Split based on days present in the household"}
                  </div>
                </div>
                {method === m && <span style={{ color: C.primary, fontSize: 18 }}>✓</span>}
              </button>
            ))}
          </div>
        )}

        {step === 3 && (
          <div>
            <p style={{ color: C.muted, fontSize: 13, marginBottom: 16 }}>
              Mark days when each member was away. Selecting any away day automatically uses Occupancy-Based calculation.
            </p>
            {members.length === 0 ? (
              <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 14, padding: 18, color: C.muted, fontSize: 13 }}>
                No approved members yet. Only accepted tenants are included in occupancy days.
              </div>
            ) : members.map((m) => (
              <div
                key={m.id}
                style={{
                  background: C.card,
                  border: `1px solid ${C.border}`,
                  borderRadius: 14,
                  padding: "14px 16px",
                  marginBottom: 10,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                  <Avatar initials={m.avatar} color={m.color} size={32} />
                  <div style={{ fontFamily: "Outfit, sans-serif", fontSize: 14, fontWeight: 600, color: C.text }}>
                    {m.nick}
                  </div>
                </div>
                <div style={{ fontSize: 12, color: C.muted }}>
                  Away days:{" "}
                  <strong style={{ color: (awayDays[m.id]?.length ?? 0) > 0 ? C.primary : C.text }}>
                    {awayDays[m.id]?.length ?? 0} day{(awayDays[m.id]?.length ?? 0) === 1 ? "" : "s"}
                  </strong>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 3, marginTop: 8 }}>
                  {Array.from({ length: 30 }, (_, i) => {
                    const day = i + 1;
                    const isAway = (awayDays[m.id] ?? []).includes(day);
                    return (
                      <button
                        key={i}
                        type="button"
                        onClick={() => toggleAwayDay(m.id, day)}
                        style={{
                          aspectRatio: "1",
                          borderRadius: 4,
                          background: isAway ? C.unpaidBg : C.bg,
                          border: `1px solid ${isAway ? C.unpaid : C.border}`,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: 9,
                          color: isAway ? C.unpaid : C.muted,
                          fontWeight: isAway ? 700 : 400,
                          cursor: "pointer",
                          padding: 0,
                        }}
                      >
                        {day}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}

        {step === 4 && (
          <div>
            <div
              style={{
                background: C.card,
                border: `1px solid ${C.border}`,
                borderRadius: 16,
                padding: "18px",
                marginBottom: 14,
              }}
            >
              <h3 style={{ fontFamily: "Outfit, sans-serif", fontSize: 15, fontWeight: 700, color: C.text, marginBottom: 14 }}>
                Review Expense
              </h3>
              {[
                { label: "Expense Name", value: name || "September Electricity" },
                { label: "Category", value: category },
                { label: "Total Amount", value: peso(parsedAmount) },
                { label: "Sharing Method", value: effectiveMethod },
                { label: "Due Date", value: displayDue },
                { label: "Members", value: members.map((m) => m.nick).join(", ") || currentMember.nick },
              ].map((r) => (
                <div
                  key={r.label}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "8px 0",
                    borderBottom: `1px solid ${C.border}`,
                  }}
                >
                  <span style={{ fontSize: 13, color: C.muted }}>{r.label}</span>
                  <span style={{ fontSize: 13, fontWeight: 600, color: C.text }}>{r.value}</span>
                </div>
              ))}
            </div>

            <div
              style={{
                background: C.card,
                border: `1px solid ${C.border}`,
                borderRadius: 16,
                padding: "18px",
                marginBottom: 16,
              }}
            >
              <h3 style={{ fontFamily: "Outfit, sans-serif", fontSize: 15, fontWeight: 700, color: C.text, marginBottom: 12 }}>
                Calculated Shares
              </h3>
              {members.map((m) => (
                <div
                  key={m.id}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "8px 0",
                    borderBottom: `1px solid ${C.border}`,
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <Avatar initials={m.avatar} color={m.color} size={26} />
                    <span style={{ fontSize: 13, color: C.text }}>{m.nick}</span>
                    {method === "Occupancy-Based" && (
                      <span style={{ fontSize: 11, color: C.muted }}>
                        {30 - (awayDays[m.id]?.length ?? 0)} days present
                      </span>
                    )}
                  </div>
                  <span style={{ fontFamily: "Outfit, sans-serif", fontSize: 14, fontWeight: 700, color: C.text }}>
                    {peso(computedShares[m.id] ?? 0)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        <button
          onClick={() => {
            if (step < 4) setStep(step + 1);
            else {
              onAddExpense({
                name: name || `${category} Bill`,
                category,
                total: parsedAmount,
                due: displayDue,
                method: effectiveMethod,
                Icon: expenseIcon,
                shares: computedShares,
              });
              onNav("expenses");
            }
          }}
          style={{
            background: C.primary,
            color: "#fff",
            border: "none",
            borderRadius: 14,
            padding: "16px 0",
            fontSize: 16,
            fontWeight: 700,
            fontFamily: "Outfit, sans-serif",
            cursor: "pointer",
            width: "100%",
            marginTop: 20,
            marginBottom: 12,
          }}
        >
          {step < 4 ? "Continue →" : "✓ Confirm Expense"}
        </button>
      </div>
    </MobileShell>
  );
}

// ── Payments Screen ────────────────────────────────────────────────────────
function PaymentsScreen({ onNav, pendingQueue, pendingExpenses, expensesLive, myPaid, myPending, myUnpaid, onSelectExpense, onPay, currentMember }: {
  onNav: (s: Screen) => void;
  pendingQueue: number[];
  pendingExpenses: Array<typeof EXPENSES[number] & { submittedBy?: number; submittedAt?: string; paymentMethod?: string }>;
  expensesLive: typeof EXPENSES;
  myPaid: number;
  myPending: number;
  myUnpaid: number;
  onSelectExpense: (id: number, dest?: Screen) => void;
  onPay: (id: number) => void;
  currentMember: Member;
}) {
  // Payment history = expenses where Alex has submitted proof or paid
  const history = expensesLive.filter((e) =>
    e.status === "Paid" || e.status === "Pending Verification" || e.status === "Rejected"
  );
  const unpaidExpenses = expensesLive.filter((e) => e.status === "Unpaid" || e.status === "Overdue");
  const manager = isMainTenant(currentMember);

  return (
    <MobileShell activeNav="payments" onNav={onNav} title="Payments">
      <div style={{ padding: "16px 20px 0" }}>
        <ScreenPrelude label="Payment Flow" title={manager ? "Review tenant payments" : "Pay, upload, verify"} value={peso(myPending)} icon={CreditCard} />
        {/* Summary */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 20 }}>
          {[
            { label: "TOTAL PAID", value: peso(myPaid), color: C.paid, bg: C.paidBg },
            { label: "PENDING", value: peso(myPending), color: C.pending, bg: C.pendingBg },
            { label: "OUTSTANDING", value: peso(myUnpaid), color: C.unpaid, bg: C.unpaidBg },
          ].map((item) => (
            <div className="metric-card" key={item.label} style={{ background: item.bg, borderRadius: 12, padding: "12px 10px" }}>
              <div style={{ fontSize: 9, fontWeight: 700, color: item.color, fontFamily: "Outfit, sans-serif", letterSpacing: 0.3 }}>{item.label}</div>
              <div style={{ fontFamily: "Outfit, sans-serif", fontSize: 15, fontWeight: 800, color: C.text, marginTop: 4 }}>{item.value}</div>
            </div>
          ))}
        </div>

        {/* Verification queue - actionable only for the main tenant */}
        {pendingQueue.length > 0 ? (
          manager ? (
            <a
              href="#verify-payments"
              className="notice-card"
              onPointerDown={() => onNav("verify-payments")}
              onClick={() => onNav("verify-payments")}
              style={{
                background: C.pendingBg,
                border: `1px solid ${C.pending}40`,
                borderRadius: 14,
                padding: "14px 16px",
                marginBottom: 16,
                cursor: "pointer",
                display: "block",
                textDecoration: "none",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <div style={{ fontFamily: "Outfit, sans-serif", fontSize: 13, fontWeight: 700, color: C.pending }}>
                    {pendingQueue.length} Payment{pendingQueue.length > 1 ? "s" : ""} Ready for Your Review
                  </div>
                  <div style={{ fontSize: 12, color: C.muted, marginTop: 2 }}>
                    {pendingExpenses.map((e) => e.name).join(", ")} needs approval from the main tenant account
                  </div>
                </div>
                <ChevronRight size={16} color={C.pending} />
              </div>
            </a>
          ) : (
            <div
              className="notice-card"
              style={{
                background: C.pendingBg,
                border: `1px solid ${C.pending}40`,
                borderRadius: 14,
                padding: "14px 16px",
                marginBottom: 16,
                display: "flex",
                alignItems: "center",
                gap: 10,
              }}
              aria-live="polite"
            >
              <Clock size={18} color={C.pending} />
              <div>
                <div style={{ fontFamily: "Outfit, sans-serif", fontSize: 13, fontWeight: 700, color: C.pending }}>
                  {pendingQueue.length} Payment{pendingQueue.length > 1 ? "s" : ""} Awaiting Jamie's Review
                </div>
                <div style={{ fontSize: 12, color: C.muted, marginTop: 2 }}>
                  {pendingExpenses.map((e) => e.name).join(", ")} is pending main tenant approval
                </div>
              </div>
            </div>
          )
        ) : (
          <div className="notice-card" style={{ background: C.paidBg, border: `1px solid ${C.paid}40`, borderRadius: 14, padding: "14px 16px", marginBottom: 16, display: "flex", alignItems: "center", gap: 10 }}>
            <CheckCircle2 size={18} color={C.paid} />
            <div style={{ fontFamily: "Outfit, sans-serif", fontSize: 13, fontWeight: 700, color: C.paid }}>No payments pending verification</div>
          </div>
        )}

        {/* Unpaid expenses — pay from here */}
        {unpaidExpenses.length > 0 && (
          <>
            <h3 style={{ fontFamily: "Outfit, sans-serif", fontSize: 15, fontWeight: 700, color: C.text, marginBottom: 10 }}>Pay Now</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 16 }}>
              {unpaidExpenses.map((exp) => (
                <div className="expense-card payment-row" key={exp.id} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 14, padding: "14px 16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <div style={{ fontFamily: "Outfit, sans-serif", fontSize: 14, fontWeight: 600, color: C.text }}>{exp.name}</div>
                    <div style={{ fontSize: 12, color: C.muted }}>Due {exp.due}</div>
                    <div style={{ marginTop: 4 }}><StatusBadge status={exp.status} /></div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontFamily: "Outfit, sans-serif", fontSize: 15, fontWeight: 800, color: C.text, marginBottom: 6 }}>{peso(exp.myShare)}</div>
                    <button
                      onClick={() => onPay(exp.id)}
                      style={{ background: C.primary, color: "#fff", border: "none", borderRadius: 10, padding: "7px 14px", fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "Outfit, sans-serif" }}
                    >
                      Pay
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Payment history */}
        {history.length > 0 && (
          <>
            <h3 style={{ fontFamily: "Outfit, sans-serif", fontSize: 15, fontWeight: 700, color: C.text, marginBottom: 10 }}>Payment History</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {history.map((exp) => (
                <div className="expense-card payment-row" key={exp.id} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 14, padding: "14px 16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <div style={{ fontFamily: "Outfit, sans-serif", fontSize: 14, fontWeight: 600, color: C.text }}>{exp.name}</div>
                    <div style={{ fontSize: 12, color: C.muted }}>{exp.period}</div>
                    <div style={{ marginTop: 6 }}><StatusBadge status={exp.status} /></div>
                  </div>
                  <div style={{ fontFamily: "Outfit, sans-serif", fontSize: 16, fontWeight: 800, color: C.text }}>{peso(exp.myShare)}</div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </MobileShell>
  );
}

// ── Make Payment ───────────────────────────────────────────────────────────
const PAYMENT_METHODS = [
  { id: "GCash", label: "GCash", logoUrl: gcashLogo, fallback: "GC", fallbackBg: "#0A46E4", needsProof: true },
  { id: "Maya", label: "Maya", logoUrl: mayaLogo, fallback: "maya", fallbackBg: "#00B14F", needsProof: true },
  { id: "PayPal", label: "PayPal", logoUrl: paypalLogo, fallback: "PP", fallbackBg: "#003087", needsProof: true },
  { id: "Cash", label: "Cash", Logo: () => <CashLogo size={36} />, needsProof: false },
];

const BANK_METHODS = [
  { id: "BDO", label: "BDO Unibank", logoUrl: bdoLogo, fallback: "BDO", bg: "#004EA8", text: "#fff" },
  { id: "BPI", label: "Bank of the Philippine Islands", logoUrl: bpiLogo, fallback: "BPI", bg: "#C90019", text: "#fff" },
  { id: "Landbank", label: "Land Bank of the Philippines", logoUrl: landbankLogo, fallback: "LBP", bg: "#007A3D", text: "#fff" },
  { id: "UnionBank", label: "UnionBank", logoUrl: unionbankLogo, fallback: "UB", bg: "#E87722", text: "#fff" },
  { id: "Metrobank", label: "Metrobank", logoUrl: metrobankLogo, fallback: "MB", bg: "#003A8C", text: "#fff" },
  { id: "PNB", label: "Philippine National Bank", logoUrl: pnbLogo, fallback: "PNB", bg: "#003A8C", text: "#FFD34D" },
  { id: "GoTyme", label: "GoTyme Bank", logoUrl: gotymeLogo, fallback: "GT", bg: "#00D1C1", text: "#061C24" },
];

function MakePaymentScreen({ onNav, expense, onSubmit, linkedSources, onLinkSource, mode = "payment" }: {
  onNav: (s: Screen) => void;
  expense: typeof EXPENSES[0];
  onSubmit: (method: string) => void;
  linkedSources: LinkedFundingSource[];
  onLinkSource: (source: LinkedFundingSource) => void;
  mode?: "payment" | "link-only";
}) {
  const [method, setMethod] = useState("GCash");
  const [proofPreview, setProofPreview] = useState(false);
  const [showBanks, setShowBanks] = useState(false);
  const [bankHolder, setBankHolder] = useState("");
  const [bankNumber, setBankNumber] = useState("");
  const [bankLinkStatus, setBankLinkStatus] = useState<"idle" | "linked" | "declined" | "duplicate">("idle");
  const [selectedSourceId, setSelectedSourceId] = useState("");
  const [pendingLinkSource, setPendingLinkSource] = useState<LinkedFundingSource | null>(null);
  const [linkSheetStep, setLinkSheetStep] = useState<"closed" | "confirm" | "redirect" | "success">("closed");
  const exp = expense;

  const isCash = method === "Cash";
  const isBank = BANK_METHODS.some((b) => b.id === method);
  const selectedBank = BANK_METHODS.find((b) => b.id === method);
  const selectedLinkedSource = linkedSources.find((source) => source.id === selectedSourceId);
  const linkedForSelectedBank = selectedBank ? linkedSources.filter((source) => source.bankId === selectedBank.id) : [];
  const needsProof = !isCash;
  const canSubmit = !isBank || Boolean(selectedLinkedSource) || bankLinkStatus === "linked";
  const linkOnly = mode === "link-only";

  const formatAccountNumber = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 16);
    return digits.replace(/(\d{4})(?=\d)/g, "$1 ");
  };

  const fingerprintAccount = (bankId: string, digits: string) => {
    let hash = 0;
    for (const char of `${bankId}:${digits}`) {
      hash = (hash * 31 + char.charCodeAt(0)) >>> 0;
    }
    return hash.toString(16);
  };

  const selectMethod = (id: string) => {
    setMethod(id);
    setShowBanks(false);
    setBankLinkStatus("idle");
    setBankHolder("");
    setBankNumber("");
    setSelectedSourceId("");
    setPendingLinkSource(null);
    setLinkSheetStep("closed");
  };

  const verifyBankLink = () => {
    if (!selectedBank) return;
    const digits = bankNumber.replace(/\D/g, "");
    const fingerprint = fingerprintAccount(selectedBank.id, digits);
    const isDuplicate = linkedSources.some((source) => source.bankId === selectedBank.id && source.fingerprint === fingerprint);
    const accepted = bankHolder.trim().length >= 3 && digits.length === 16 && !digits.endsWith("0000");

    if (isDuplicate) {
      setBankLinkStatus("duplicate");
      setSelectedSourceId("");
      return;
    }

    if (!accepted) {
      setBankLinkStatus("declined");
      setSelectedSourceId("");
      return;
    }

    const source = {
      id: `${selectedBank.id}-${digits.slice(-4)}-${Date.now()}`,
      bankId: selectedBank.id,
      label: selectedBank.label,
      holder: bankHolder.trim(),
      last4: digits.slice(-4),
      fingerprint,
      source: "Secure platform link prototype",
    };
    setPendingLinkSource(source);
    setLinkSheetStep("confirm");
  };

  const approvePlatformLink = () => {
    setLinkSheetStep("success");
  };

  const finishPlatformLink = () => {
    if (!pendingLinkSource) return;
    onLinkSource(pendingLinkSource);
    setSelectedSourceId(pendingLinkSource.id);
    setBankLinkStatus("linked");
    setBankHolder("");
    setBankNumber("");
    setPendingLinkSource(null);
    setLinkSheetStep("closed");
    if (linkOnly) onNav("profile");
  };

  const closeLinkSheet = () => {
    setPendingLinkSource(null);
    setLinkSheetStep("closed");
  };

  const submit = () => {
    if (isBank && !selectedLinkedSource) {
      verifyBankLink();
      return;
    }
    const source = selectedLinkedSource;
    onSubmit(source ? `${source.label} ending ${source.last4}` : method);
  };

  return (
    <MobileShell
      activeNav={linkOnly ? "notifications" : "payments"}
      onNav={onNav}
      title={linkOnly ? "Link Account" : "Make Payment"}
      onBack={() => onNav(linkOnly ? "profile" : "payments")}
    >
      <div style={{ padding: "16px 20px 0" }}>
        {linkOnly ? (
          <ScreenPrelude label="Billing Setup" title="Link a payment account" value={`${linkedSources.length} linked`} icon={CreditCard} />
        ) : (
          <div className="payment-hero panel-orbit" style={{ background: C.primaryLight, borderRadius: 16, padding: "18px", marginBottom: 16 }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: C.muted, fontFamily: "Outfit, sans-serif" }}>YOU NEED TO PAY</div>
            <div style={{ fontFamily: "Outfit, sans-serif", fontSize: 32, fontWeight: 800, color: C.primary, margin: "6px 0 4px" }}>
              {peso(exp.myShare)}
            </div>
            <div style={{ fontSize: 13, color: C.text, fontWeight: 500 }}>{exp.name} · Due {exp.due}</div>
          </div>
        )}

        {/* E-wallets */}
        {!linkOnly && <div style={{ marginBottom: 14 }}>
          <label style={{ fontSize: 11, fontWeight: 700, color: C.muted, display: "block", marginBottom: 10, fontFamily: "Outfit, sans-serif", letterSpacing: 0.4 }}>
            E-WALLETS
          </label>
          <div style={{ display: "flex", gap: 10 }}>
            {PAYMENT_METHODS.map(({ id, label, Logo, logoUrl, fallback, fallbackBg }) => {
              const active = method === id;
              return (
                <button
                  className="choice-card"
                  key={id}
                  onClick={() => selectMethod(id)}
                  style={{
                    flex: 1,
                    padding: "12px 6px 10px",
                    borderRadius: 14,
                    border: `2px solid ${active ? C.primary : C.border}`,
                    background: active ? C.primaryLight : C.card,
                    cursor: "pointer",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 6,
                    transition: "border-color 0.15s",
                  }}
                >
                  {Logo ? (
                    <Logo />
                  ) : (
                    <BrandLogo
                      src={logoUrl}
                      alt={`${label} logo`}
                      fallback={fallback}
                      fallbackBg={fallbackBg}
                      size={36}
                    />
                  )}
                  <span style={{ fontFamily: "Outfit, sans-serif", fontSize: 11, fontWeight: 700, color: active ? C.primary : C.muted }}>
                    {label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>}

        {/* Bank Transfer */}
        <div style={{ marginBottom: 16 }}>
          <label style={{ fontSize: 11, fontWeight: 700, color: C.muted, display: "block", marginBottom: 10, fontFamily: "Outfit, sans-serif", letterSpacing: 0.4 }}>
            BANK TRANSFER
          </label>
          <div
            className="choice-card"
            onClick={() => setShowBanks(!showBanks)}
            style={{
              background: isBank ? C.primaryLight : C.card,
              border: `2px solid ${isBank ? C.primary : C.border}`,
              borderRadius: 14,
              padding: "13px 16px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              cursor: "pointer",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              {selectedBank ? (
                <BrandLogo
                  src={selectedBank.logoUrl}
                  alt={`${selectedBank.label} logo`}
                  fallback={selectedBank.fallback}
                  fallbackBg={selectedBank.bg}
                  fallbackColor={selectedBank.text}
                  size={36}
                />
              ) : (
                <div style={{ width: 36, height: 36, borderRadius: 10, background: C.border, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Building2 size={18} color={C.muted} strokeWidth={1.8} />
                </div>
              )}
              <div>
                <div style={{ fontFamily: "Outfit, sans-serif", fontSize: 13, fontWeight: 700, color: isBank ? C.primary : C.text }}>
                  {selectedBank ? selectedBank.label : "Select Bank"}
                </div>
                <div style={{ fontSize: 11, color: C.muted }}>BDO, BPI, Landbank, UnionBank +more</div>
              </div>
            </div>
            <ChevronRight size={16} color={C.muted} style={{ transform: showBanks ? "rotate(90deg)" : "none", transition: "transform 0.2s" }} />
          </div>

          {showBanks && (
            <div className="expense-card" style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 14, marginTop: 8, overflow: "hidden" }}>
              {BANK_METHODS.map((bank, i) => (
                <div
                  className="activity-row"
                  key={bank.id}
                  onClick={() => selectMethod(bank.id)}
                  style={{
                    padding: "12px 16px",
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    cursor: "pointer",
                    background: method === bank.id ? C.primaryLight : "transparent",
                    borderBottom: i < BANK_METHODS.length - 1 ? `1px solid ${C.border}` : "none",
                  }}
                >
                  <BrandLogo
                    src={bank.logoUrl}
                    alt={`${bank.label} logo`}
                    fallback={bank.fallback}
                    fallbackBg={bank.bg}
                    fallbackColor={bank.text}
                    size={36}
                  />
                  <span style={{ fontFamily: "Outfit, sans-serif", fontSize: 13, fontWeight: 600, color: C.text }}>{bank.label}</span>
                  {method === bank.id && <CheckCircle2 size={16} color={C.primary} style={{ marginLeft: "auto" }} />}
                </div>
              ))}
            </div>
          )}

          {selectedBank && linkedForSelectedBank.length > 0 && (
            <div style={{ marginTop: 10 }}>
              <div style={{ fontSize: 11, fontWeight: 800, color: C.muted, fontFamily: "Outfit, sans-serif", letterSpacing: 0.4, marginBottom: 8 }}>
                LINKED ACCOUNTS
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {linkedForSelectedBank.map((source) => {
                  const active = selectedSourceId === source.id;
                  return (
                    <button
                      key={source.id}
                      onClick={() => {
                        setSelectedSourceId(source.id);
                        setBankLinkStatus("idle");
                        setBankHolder("");
                        setBankNumber("");
                      }}
                      className="choice-card"
                      style={{
                        background: active ? C.primaryLight : C.card,
                        border: `1.5px solid ${active ? C.primary : C.border}`,
                        borderRadius: 14,
                        padding: "12px 14px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        cursor: "pointer",
                        textAlign: "left",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <BrandLogo
                          src={selectedBank.logoUrl}
                          alt={`${source.label} logo`}
                          fallback={selectedBank.fallback}
                          fallbackBg={selectedBank.bg}
                          fallbackColor={selectedBank.text}
                          size={34}
                        />
                        <div>
                          <div style={{ fontFamily: "Outfit, sans-serif", fontSize: 13, fontWeight: 800, color: active ? C.primary : C.text }}>
                            {source.label} •••• {source.last4}
                          </div>
                          <div style={{ fontSize: 11, color: C.muted }}>{source.holder}</div>
                        </div>
                      </div>
                      {active && <CheckCircle2 size={18} color={C.primary} />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {selectedBank && (
            <div
              className="expense-card"
              style={{
                background: C.card,
                border: `1px solid ${bankLinkStatus === "declined" ? C.unpaid : bankLinkStatus === "linked" ? C.paid : C.border}`,
                borderRadius: 16,
                padding: 16,
                marginTop: 10,
                boxShadow: C.shadow,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, marginBottom: 14 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <BrandLogo
                    src={selectedBank.logoUrl}
                    alt={`${selectedBank.label} logo`}
                    fallback={selectedBank.fallback}
                    fallbackBg={selectedBank.bg}
                    fallbackColor={selectedBank.text}
                    size={38}
                  />
                  <div>
                    <div style={{ fontFamily: "Outfit, sans-serif", fontSize: 14, fontWeight: 800, color: C.text }}>
                      {linkedForSelectedBank.length > 0 ? `Add another ${selectedBank.label} account` : `Link ${selectedBank.label}`}
                    </div>
                    <div style={{ fontSize: 11, color: C.muted }}>Verify funding source before payment</div>
                  </div>
                </div>
                {bankLinkStatus === "linked" && (
                  <span style={{ fontSize: 11, fontWeight: 800, color: C.paid, background: C.paidBg, borderRadius: 999, padding: "5px 9px" }}>
                    Linked
                  </span>
                )}
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <div>
                  <label style={{ fontSize: 11, fontWeight: 700, color: C.muted, display: "block", marginBottom: 6, fontFamily: "Outfit, sans-serif" }}>
                    ACCOUNT HOLDER
                  </label>
                  <input
                    className="auth-input"
                    value={bankHolder}
                    onChange={(e) => { setBankHolder(e.target.value); setBankLinkStatus("idle"); }}
                    placeholder="Name on account"
                    autoComplete="cc-name"
                    style={{ fontSize: 14 }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: 11, fontWeight: 700, color: C.muted, display: "block", marginBottom: 6, fontFamily: "Outfit, sans-serif" }}>
                    BANK ACCOUNT NUMBER
                  </label>
                  <input
                    className="auth-input"
                    value={bankNumber}
                    onChange={(e) => {
                      setBankNumber(formatAccountNumber(e.target.value));
                      setBankLinkStatus("idle");
                    }}
                    inputMode="numeric"
                    autoComplete="cc-number"
                    placeholder="XXXX XXXX XXXX XXXX"
                    style={{ fontSize: 14, letterSpacing: 0.4 }}
                  />
                </div>

                {bankLinkStatus === "linked" && selectedLinkedSource && (
                  <div style={{ background: C.paidBg, border: `1px solid ${C.paid}40`, borderRadius: 12, padding: "10px 12px", color: C.paid }}>
                    <div style={{ fontFamily: "Outfit, sans-serif", fontSize: 13, fontWeight: 800 }}>
                      {selectedLinkedSource.label} linked
                    </div>
                    <div style={{ fontSize: 12, marginTop: 2 }}>
                      {selectedLinkedSource.holder} · •••• {selectedLinkedSource.last4} · {selectedLinkedSource.source}
                    </div>
                  </div>
                )}

                {bankLinkStatus === "declined" && (
                  <div style={{ background: C.unpaidBg, border: `1px solid ${C.unpaid}40`, borderRadius: 12, padding: "10px 12px", color: C.unpaid }}>
                    <div style={{ fontFamily: "Outfit, sans-serif", fontSize: 13, fontWeight: 800 }}>Card declined</div>
                    <div style={{ fontSize: 12, marginTop: 2 }}>
                      Enter the account holder and a valid 16-digit bank account number.
                    </div>
                  </div>
                )}

                {bankLinkStatus === "duplicate" && (
                  <div style={{ background: C.unpaidBg, border: `1px solid ${C.unpaid}40`, borderRadius: 12, padding: "10px 12px", color: C.unpaid }}>
                    <div style={{ fontFamily: "Outfit, sans-serif", fontSize: 13, fontWeight: 800 }}>Duplicate account</div>
                    <div style={{ fontSize: 12, marginTop: 2 }}>
                      This bank account number is already linked for {selectedBank.label}. Choose it from Linked Accounts or enter a different number.
                    </div>
                  </div>
                )}

                <button
                  onClick={verifyBankLink}
                  style={{
                    background: bankLinkStatus === "linked" ? C.paidBg : C.primary,
                    color: bankLinkStatus === "linked" ? C.paid : "#fff",
                    border: bankLinkStatus === "linked" ? `1.5px solid ${C.paid}60` : "none",
                    borderRadius: 12,
                    padding: "12px 0",
                    fontSize: 14,
                    fontWeight: 800,
                    cursor: "pointer",
                    fontFamily: "Outfit, sans-serif",
                  }}
                >
                  {bankLinkStatus === "linked" ? "Update Linked Account" : "Verify & Link Bank"}
                </button>
              </div>
            </div>
          )}
        </div>

        {!linkOnly && needsProof && (
          <div style={{ marginBottom: 16 }}>
            <label style={{ fontSize: 11, fontWeight: 700, color: C.muted, display: "block", marginBottom: 10, fontFamily: "Outfit, sans-serif", letterSpacing: 0.4 }}>
              UPLOAD PAYMENT PROOF
            </label>
            <div
              className="upload-card"
              onClick={() => setProofPreview(!proofPreview)}
              style={{
                background: proofPreview ? C.paidBg : C.card,
                border: `2px dashed ${proofPreview ? C.paid : C.border}`,
                borderRadius: 14,
                padding: "24px",
                textAlign: "center",
                cursor: "pointer",
              }}
            >
              {proofPreview ? (
                <div>
                  <div style={{ display: "flex", justifyContent: "center", marginBottom: 8 }}>
                    <CheckCircle2 size={32} color={C.paid} />
                  </div>
                  <div style={{ fontFamily: "Outfit, sans-serif", fontSize: 14, fontWeight: 600, color: C.paid }}>
                    {method.toLowerCase()}_receipt_sept.jpg
                  </div>
                  <div style={{ fontSize: 12, color: C.muted, marginTop: 4 }}>Tap to change</div>
                </div>
              ) : (
                <div>
                  <div style={{ display: "flex", justifyContent: "center", marginBottom: 8 }}>
                    <Upload size={28} color={C.muted} strokeWidth={1.5} />
                  </div>
                  <div style={{ fontFamily: "Outfit, sans-serif", fontSize: 14, fontWeight: 600, color: C.text }}>
                    Upload Payment Proof
                  </div>
                  <div style={{ fontSize: 12, color: C.muted, marginTop: 4 }}>Take Photo · Upload Image · Choose File</div>
                </div>
              )}
            </div>
          </div>
        )}

        {!linkOnly && <button
          onClick={submit}
          style={{
            background: canSubmit ? C.primary : C.muted,
            color: "#fff",
            border: "none",
            borderRadius: 14,
            padding: "16px 0",
            fontSize: 16,
            fontWeight: 700,
            fontFamily: "Outfit, sans-serif",
            cursor: "pointer",
            width: "100%",
            marginBottom: 10,
            opacity: canSubmit ? 1 : 0.75,
          }}
        >
          {isBank && !canSubmit ? "Verify Bank First" : "Submit Payment"}
        </button>}
        {!linkOnly && <p style={{ textAlign: "center", fontSize: 12, color: C.muted }}>
          {isBank && selectedLinkedSource
            ? `Payment source selected: ${selectedLinkedSource.label} ending ${selectedLinkedSource.last4}.`
            : "Your payment will be reviewed by Jamie, the main tenant."}
        </p>}
      </div>

      {pendingLinkSource && selectedBank && linkSheetStep !== "closed" && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(8, 24, 20, 0.34)",
            zIndex: 300,
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "center",
            padding: 16,
          }}
          onClick={closeLinkSheet}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: "100%",
              maxWidth: 392,
              background: C.card,
              border: `1px solid ${C.border}`,
              borderRadius: "22px 22px 18px 18px",
              padding: "18px",
              boxShadow: "0 28px 80px rgba(8, 24, 20, 0.28)",
            }}
          >
            <div style={{ width: 44, height: 4, borderRadius: 999, background: C.border, margin: "0 auto 16px" }} />
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
              <BrandLogo
                src={selectedBank.logoUrl}
                alt={`${selectedBank.label} logo`}
                fallback={selectedBank.fallback}
                fallbackBg={selectedBank.bg}
                fallbackColor={selectedBank.text}
                size={46}
                radius={14}
              />
              <div>
                <div style={{ fontFamily: "Outfit, sans-serif", fontSize: 18, fontWeight: 900, color: C.text }}>
                  {linkSheetStep === "success" ? "Linked successfully" : `Link ${selectedBank.label}`}
                </div>
                <div style={{ fontSize: 12, color: C.muted, marginTop: 2 }}>
                  {pendingLinkSource.holder} · •••• {pendingLinkSource.last4}
                </div>
              </div>
            </div>

            {linkSheetStep === "confirm" && (
              <>
                <div style={{ background: C.primaryLight, borderRadius: 14, padding: "13px 14px", color: C.text, fontSize: 13, lineHeight: 1.55, marginBottom: 14 }}>
                  You will be redirected to {selectedBank.label}'s secure platform to authorize this account. This is a prototype handoff, so no real bank login happens.
                </div>
                <button
                  onClick={() => setLinkSheetStep("redirect")}
                  style={{ width: "100%", border: "none", borderRadius: 14, background: C.primary, color: "#fff", padding: "14px 0", fontFamily: "Outfit, sans-serif", fontSize: 15, fontWeight: 800, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}
                >
                  Continue to {selectedBank.label}
                  <ArrowRight size={17} />
                </button>
              </>
            )}

            {linkSheetStep === "redirect" && (
              <>
                <div style={{ border: `1px solid ${C.border}`, borderRadius: 14, padding: "16px", textAlign: "center", marginBottom: 14 }}>
                  <div style={{ fontSize: 11, fontWeight: 800, color: C.muted, letterSpacing: 0.4, fontFamily: "Outfit, sans-serif" }}>SECURE PLATFORM</div>
                  <div style={{ fontFamily: "Outfit, sans-serif", fontSize: 16, fontWeight: 900, color: C.text, marginTop: 6 }}>{selectedBank.label}</div>
                  <div style={{ fontSize: 12, color: C.muted, marginTop: 4 }}>Review and authorize linking for HouseShare.</div>
                </div>
                <button
                  onClick={approvePlatformLink}
                  style={{ width: "100%", border: "none", borderRadius: 14, background: C.primary, color: "#fff", padding: "14px 0", fontFamily: "Outfit, sans-serif", fontSize: 15, fontWeight: 800, cursor: "pointer" }}
                >
                  Authorize Link
                </button>
              </>
            )}

            {linkSheetStep === "success" && (
              <>
                <div style={{ background: C.paidBg, border: `1px solid ${C.paid}40`, borderRadius: 14, padding: "16px", textAlign: "center", marginBottom: 14 }}>
                  <CheckCircle2 size={34} color={C.paid} />
                  <div style={{ fontFamily: "Outfit, sans-serif", fontSize: 14, fontWeight: 900, color: C.paid, marginTop: 8 }}>{selectedBank.label} account linked</div>
                  <div style={{ fontSize: 12, color: C.muted, marginTop: 4 }}>You can now use this account for payment.</div>
                </div>
                <button
                  onClick={finishPlatformLink}
                  style={{ width: "100%", border: "none", borderRadius: 14, background: C.primary, color: "#fff", padding: "14px 0", fontFamily: "Outfit, sans-serif", fontSize: 15, fontWeight: 800, cursor: "pointer" }}
                >
                  Done
                </button>
              </>
            )}

            <button
              onClick={closeLinkSheet}
              style={{ width: "100%", border: "none", background: "transparent", color: C.muted, padding: "12px 0 2px", fontFamily: "Outfit, sans-serif", fontSize: 13, fontWeight: 700, cursor: "pointer" }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </MobileShell>
  );
}

// ── Payment Submitted ──────────────────────────────────────────────────────
function PaymentSubmittedScreen({ onNav, expense, currentMember }: { onNav: (s: Screen) => void; expense: typeof EXPENSES[0]; currentMember: Member }) {
  const manager = isMainTenant(currentMember);

  return (
    <div style={{ minHeight: "100vh", background: C.bg, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 32, textAlign: "center" }}>
      <div style={{ width: 80, height: 80, borderRadius: "50%", background: C.pendingBg, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 24 }}>
        <Clock size={36} color={C.pending} strokeWidth={1.5} />
      </div>
      <h2 style={{ fontFamily: "Outfit, sans-serif", fontSize: 22, fontWeight: 800, color: C.text, marginBottom: 8 }}>
        Payment Proof Submitted
      </h2>
      <StatusBadge status="Pending Verification" />
      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 16, padding: "20px", marginTop: 24, width: "100%", maxWidth: 320, textAlign: "left" }}>
        {[
          { label: "Amount", value: peso(expense.myShare) },
          { label: "Expense", value: expense.name },
          { label: "Date Submitted", value: "September 9, 2026" },
          { label: "Payment Method", value: "GCash" },
          { label: "Status", value: "Awaiting verification" },
        ].map((r) => (
          <div
            key={r.label}
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "8px 0",
              borderBottom: `1px solid ${C.border}`,
            }}
          >
            <span style={{ fontSize: 13, color: C.muted }}>{r.label}</span>
            <span style={{ fontSize: 13, fontWeight: 600, color: C.text }}>{r.value}</span>
          </div>
        ))}
      </div>
      <p style={{ color: C.muted, fontSize: 13, marginTop: 16, maxWidth: 280 }}>
        {manager
          ? "This receipt is ready for main tenant verification."
          : "Jamie will verify your payment. You'll receive a notification once it's confirmed."}
      </p>
      {manager && (
        <button
          onClick={() => onNav("verify-payments")}
          style={{
            background: C.pendingBg,
            color: C.pending,
            border: `1.5px solid ${C.pending}40`,
            borderRadius: 14,
            padding: "14px 32px",
            fontSize: 14,
            fontWeight: 700,
            fontFamily: "Outfit, sans-serif",
            cursor: "pointer",
            marginTop: 10,
            width: "100%",
            maxWidth: 320,
          }}
        >
          Open Verification View
        </button>
      )}
      <button
        onClick={() => onNav("dashboard")}
        style={{
          background: C.primary,
          color: "#fff",
          border: "none",
          borderRadius: 14,
          padding: "15px 32px",
          fontSize: 15,
          fontWeight: 700,
          fontFamily: "Outfit, sans-serif",
          cursor: "pointer",
          marginTop: 24,
        }}
      >
        Back to Dashboard
      </button>
    </div>
  );
}

// ── Verify Payments ────────────────────────────────────────────────────────
function VerifyPaymentsScreen({ onNav, pendingExpenses, onAccept, onReject, currentMember, members }: {
  onNav: (s: Screen) => void;
  pendingExpenses: Array<typeof EXPENSES[number] & { submittedBy?: number; submittedAt?: string; paymentMethod?: string }>;
  onAccept: (id: number) => void;
  onReject: (id: number) => void;
  currentMember: DemoMember;
  members: DemoMember[];
}) {
  const [rejectedId, setRejectedId] = useState<number | null>(null);
  const [reason, setReason] = useState("");
  const manager = isMainTenant(currentMember);

  if (!manager) {
    return (
      <MobileShell activeNav="payments" onNav={onNav} title="Verify Payments" onBack={() => onNav("payments")}>
        <div style={{ padding: "28px 20px 0" }}>
          <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 18, padding: "28px 20px", textAlign: "center", boxShadow: "0 20px 50px rgba(20, 54, 45, 0.08)" }}>
            <div style={{ width: 58, height: 58, borderRadius: 18, background: C.pendingBg, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 14px" }}>
              <Shield size={28} color={C.pending} strokeWidth={1.7} />
            </div>
            <h2 style={{ fontFamily: "Outfit, sans-serif", fontSize: 20, fontWeight: 800, color: C.text, margin: "0 0 8px" }}>
              Main Tenant Only
            </h2>
            <p style={{ fontSize: 13, lineHeight: 1.55, color: C.muted, margin: "0 auto 18px", maxWidth: 300 }}>
              Only the main tenant can accept or reject payment receipts and household requests.
            </p>
            <button
              onClick={() => onNav("payments")}
              style={{
                background: C.primary,
                color: "#fff",
                border: "none",
                borderRadius: 14,
                padding: "13px 24px",
                fontSize: 14,
                fontWeight: 700,
                cursor: "pointer",
                fontFamily: "Outfit, sans-serif",
              }}
            >
              Back to Payments
            </button>
          </div>
        </div>
      </MobileShell>
    );
  }

  return (
    <MobileShell activeNav="payments" onNav={onNav} title="Verify Payments" onBack={() => onNav("payments")}>
      <div style={{ padding: "16px 20px 0" }}>
        <p style={{ fontSize: 13, color: C.muted, marginBottom: 14 }}>
          Review payment proof submitted by household members.
        </p>

        {pendingExpenses.length === 0 ? (
          <div style={{ background: C.paidBg, borderRadius: 16, padding: "32px", textAlign: "center" }}>
            <CheckCircle2 size={40} color={C.paid} style={{ marginBottom: 12 }} />
            <div style={{ fontFamily: "Outfit, sans-serif", fontSize: 15, fontWeight: 700, color: C.paid }}>
              All payments have been verified
            </div>
          </div>
        ) : (
          pendingExpenses.map((exp) => {
            const submitterMember = members.find((member) => member.id === exp.submittedBy) ?? members[0] ?? currentMember;
            const submitter = { name: submitterMember.name, initials: submitterMember.avatar, color: submitterMember.color };
            const isRejecting = rejectedId === exp.id;
            return (
              <div key={exp.id} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 16, padding: "18px", marginBottom: 14 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                    <Avatar initials={submitter.initials} color={submitter.color} size={40} />
                  <div>
                    <div style={{ fontFamily: "Outfit, sans-serif", fontSize: 15, fontWeight: 700, color: C.text }}>{submitter.name}</div>
                    <div style={{ fontSize: 12, color: C.muted }}>Submitted {exp.submittedAt ?? "Sept. 9, 2026"} · {exp.paymentMethod ?? "GCash"}</div>
                  </div>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 14, paddingBottom: 14, borderBottom: `1px solid ${C.border}` }}>
                  <div>
                    <div style={{ fontSize: 11, color: C.muted }}>Expense</div>
                    <div style={{ fontFamily: "Outfit, sans-serif", fontSize: 13, fontWeight: 600, color: C.text }}>{exp.name}</div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: 11, color: C.muted }}>Amount</div>
                    <div style={{ fontFamily: "Outfit, sans-serif", fontSize: 18, fontWeight: 800, color: C.text }}>{peso(exp.myShare)}</div>
                  </div>
                </div>
                <div style={{ background: C.bg, borderRadius: 10, height: 120, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 14, border: `1px solid ${C.border}`, flexDirection: "column", gap: 6 }}>
                  <Receipt size={36} color={C.muted} strokeWidth={1.5} />
                  <span style={{ fontSize: 12, color: C.muted }}>gcash_receipt_{exp.name.toLowerCase().replace(/ /g, "_")}.jpg</span>
                </div>

                {isRejecting && (
                  <div style={{ marginBottom: 12 }}>
                    <label style={{ fontSize: 12, fontWeight: 600, color: C.muted, display: "block", marginBottom: 6, fontFamily: "Outfit, sans-serif" }}>REASON FOR REJECTION</label>
                    <textarea
                      value={reason}
                      onChange={(e) => setReason(e.target.value)}
                      placeholder="Please upload a clearer payment receipt..."
                      style={{ width: "100%", padding: "12px 14px", borderRadius: 10, border: `1.5px solid ${C.unpaid}`, fontSize: 13, fontFamily: "Inter, sans-serif", background: C.unpaidBg, color: C.text, resize: "none", height: 80, boxSizing: "border-box", outline: "none" }}
                    />
                  </div>
                )}

                <div style={{ display: "flex", gap: 10 }}>
                  <button
                    onClick={() => { onAccept(exp.id); onNav("payments"); }}
                    style={{ flex: 1, background: C.paidBg, color: C.paid, border: `1.5px solid ${C.paid}`, borderRadius: 12, padding: "13px 0", fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "Outfit, sans-serif" }}
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => setRejectedId(isRejecting ? null : exp.id)}
                    style={{ flex: 1, background: C.unpaidBg, color: C.unpaid, border: `1.5px solid ${C.unpaid}`, borderRadius: 12, padding: "13px 0", fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "Outfit, sans-serif" }}
                  >
                    Reject
                  </button>
                </div>
                {isRejecting && (
                  <button
                    onClick={() => { onReject(exp.id); onNav("payments"); }}
                    style={{ marginTop: 10, background: C.unpaid, color: "#fff", border: "none", borderRadius: 12, padding: "13px 0", fontSize: 14, fontWeight: 700, cursor: "pointer", width: "100%", fontFamily: "Outfit, sans-serif" }}
                  >
                    Send Rejection
                  </button>
                )}
              </div>
            );
          })
        )}
      </div>
    </MobileShell>
  );
}

// ── Household Screen ───────────────────────────────────────────────────────
function HouseholdScreen({ onNav, onSelectMember, currentMember, members, accounts, household, expensesLive, expenseShares = {}, memberStatuses = {}, joinRequests, onAcceptJoin, onRejectJoin }: { onNav: (s: Screen) => void; onSelectMember: (id: number) => void; currentMember: DemoMember; members: DemoMember[]; accounts: DemoMember[]; household: HouseholdRecord; expensesLive: typeof EXPENSES; expenseShares?: Record<number, Record<number, number>>; memberStatuses?: Record<number, Record<number, StatusKey>>; joinRequests: JoinRequest[]; onAcceptJoin: (requestId: number) => void; onRejectJoin: (requestId: number) => void }) {
  const manager = household.mainTenantId === currentMember.id;
  const pendingRequests = joinRequests.filter((request) => request.householdId === household.id && request.status === "Pending");
  const totalExpenses = expensesLive.reduce((sum, expense) => sum + expense.total, 0);
  const memberShare = (memberId: number, expense: typeof EXPENSES[number]) => getExpenseShare(expense, memberId, expenseShares[expense.id]);
  const memberOwed = (memberId: number) =>
    expensesLive
      .filter((expense) => (memberStatuses?.[memberId]?.[expense.id] ?? expense.status ?? "Unpaid") !== "Paid")
      .reduce((sum, expense) => sum + memberShare(memberId, expense), 0);
  const collected = members.reduce((sum, member) => (
    sum + expensesLive
      .filter((expense) => (memberStatuses?.[member.id]?.[expense.id] ?? expense.status ?? "Unpaid") === "Paid")
      .reduce((paidSum, expense) => paidSum + memberShare(member.id, expense), 0)
  ), 0);
  const outstanding = Math.max(totalExpenses - collected, 0);
  return (
    <MobileShell activeNav="household" onNav={onNav} title="Household">
      <div style={{ padding: "16px 20px 0" }}>
        <ScreenPrelude label="Shared Home" title={household.name} value={`${members.length} member${members.length === 1 ? "" : "s"}`} icon={Users} />
        {/* Household card */}
        <div
          style={{
            background: C.sidebar,
            borderRadius: 16,
            padding: "20px",
            marginBottom: 16,
            position: "relative",
            overflow: "hidden",
          }}
        >
          <svg style={{ position: "absolute", top: 0, right: 0, width: 160, height: 160, opacity: 0.16, pointerEvents: "none" }} viewBox="0 0 160 160">
            <path d="M0 30H160M0 75H160M0 120H160M40 0V160M100 0V160" stroke={C.sidebarText} strokeWidth="1" />
          </svg>
          <div style={{ fontSize: 11, fontWeight: 600, color: "rgba(248,255,249,0.66)", fontFamily: "Outfit, sans-serif", marginBottom: 4 }}>
            HOUSEHOLD
          </div>
          <div style={{ fontFamily: "Outfit, sans-serif", fontSize: 22, fontWeight: 800, color: C.sidebarText, marginBottom: 4 }}>
            {household.name}
          </div>
          <div style={{ fontSize: 13, color: "rgba(248,255,249,0.66)" }}>{members.length} members · Est. March 2025</div>
          <div style={{ display: "flex", gap: -6, marginTop: 12 }}>
            {members.map((m, i) => (
              <div key={m.id} style={{ marginLeft: i > 0 ? -8 : 0, border: `2px solid ${C.sidebar}`, borderRadius: "50%" }}>
                <Avatar initials={m.avatar} color={m.color} size={28} />
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 16, padding: 16, marginBottom: 16 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
            <div>
              <div style={{ fontSize: 11, fontWeight: 800, color: C.primary, fontFamily: "Outfit, sans-serif", letterSpacing: 0.4 }}>INVITATION CODE</div>
              <div style={{ fontFamily: "Outfit, sans-serif", fontSize: 17, fontWeight: 900, color: C.text, marginTop: 3 }}>{household.inviteCode}</div>
              <div style={{ fontSize: 11, color: C.muted, marginTop: 2 }}>{household.inviteLink}</div>
            </div>
            <StatusBadge status="Paid" />
          </div>
        </div>

        {manager && pendingRequests.length > 0 && (
          <div style={{ background: C.pendingBg, border: `1px solid ${C.pending}40`, borderRadius: 16, padding: 16, marginBottom: 16 }}>
            <h3 style={{ fontFamily: "Outfit, sans-serif", fontSize: 15, fontWeight: 900, color: C.pending, margin: "0 0 10px" }}>Join Requests</h3>
            {pendingRequests.map((request) => {
              const newbie = accounts.find((m) => m.id === request.memberId) ?? members[0];
              return (
                <div key={request.id} style={{ background: C.card, borderRadius: 14, padding: 14, marginTop: 10 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                    <Avatar initials={newbie.avatar} color={newbie.color} size={38} />
                    <div>
                      <div style={{ fontFamily: "Outfit, sans-serif", fontSize: 14, fontWeight: 900, color: C.text }}>{newbie.name}</div>
                      <div style={{ fontSize: 11, color: C.muted }}>Invite {request.inviteCode} · {request.submittedAt}</div>
                    </div>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 10 }}>
                    <StatusBadge status={request.faceVerified ? "Paid" : "Pending Verification"} />
                    <StatusBadge status={request.idUploaded ? "Paid" : "Pending Verification"} />
                  </div>
                  <div style={{ display: "flex", gap: 8 }}>
                    <button onClick={() => onAcceptJoin(request.id)} style={{ flex: 1, border: `1.5px solid ${C.paid}`, background: C.paidBg, color: C.paid, borderRadius: 12, padding: "11px 0", fontWeight: 900, cursor: "pointer" }}>Accept</button>
                    <button onClick={() => onRejectJoin(request.id)} style={{ flex: 1, border: `1.5px solid ${C.unpaid}`, background: C.unpaidBg, color: C.unpaid, borderRadius: 12, padding: "11px 0", fontWeight: 900, cursor: "pointer" }}>Reject</button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 16 }}>
          {[
            { label: "Total Expenses", value: peso(totalExpenses), Icon: Receipt },
            { label: "Collected", value: peso(collected), Icon: CheckCircle2 },
            { label: "Outstanding", value: peso(outstanding), Icon: Clock },
            { label: "Members", value: `${members.length} Tenant${members.length === 1 ? "" : "s"}`, Icon: Users },
          ].map((s) => (
            <div className="metric-card" key={s.label} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 12, padding: "14px" }}>
              <div style={{ marginBottom: 6 }}><s.Icon size={18} color={C.primary} strokeWidth={1.8} /></div>
              <div style={{ fontFamily: "Outfit, sans-serif", fontSize: 16, fontWeight: 800, color: C.text }}>{s.value}</div>
              <div style={{ fontSize: 11, color: C.muted }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Members */}
        <h3 style={{ fontFamily: "Outfit, sans-serif", fontSize: 15, fontWeight: 700, color: C.text, marginBottom: 10 }}>
          Members
        </h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 16 }}>
          {members.map((m) => (
            <div
              className="member-card"
              key={m.id}
              onClick={() => { onSelectMember(m.id); onNav("member-detail"); }}
              style={{
                background: C.card,
                border: `1px solid ${C.border}`,
                borderRadius: 14,
                padding: "14px 16px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                cursor: "pointer",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <Avatar initials={m.avatar} color={m.color} size={42} />
                <div>
                  <div style={{ fontFamily: "Outfit, sans-serif", fontSize: 14, fontWeight: 700, color: C.text }}>
                    {m.name}
                    {m.id === currentMember.id && <span style={{ fontSize: 11, color: C.primary, fontWeight: 600 }}> (You)</span>}
                  </div>
                  <div style={{ fontSize: 12, color: C.muted }}>{m.nick} · {m.role}</div>
                </div>
              </div>
              <div style={{ textAlign: "right" }}>
                {(() => {
                  const owed = memberOwed(m.id);
                  return owed > 0 ? (
                    <div>
                      <div style={{ fontFamily: "Outfit, sans-serif", fontSize: 13, fontWeight: 700, color: C.unpaid }}>Owes {peso(owed)}</div>
                      <StatusBadge status="Unpaid" />
                    </div>
                  ) : (
                    <StatusBadge status="Paid" />
                  );
                })()}
              </div>
            </div>
          ))}
        </div>

        {/* Settings button */}
        <button
          className="expense-card"
          onClick={() => onNav("household-settings")}
          style={{
            background: C.card,
            border: `1px solid ${C.border}`,
            borderRadius: 14,
            padding: "14px 16px",
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            cursor: "pointer",
            marginBottom: 10,
          }}
        >
          <span style={{ fontFamily: "Outfit, sans-serif", fontSize: 14, fontWeight: 600, color: C.text, display: "flex", alignItems: "center", gap: 8 }}><Settings size={16} color={C.muted} strokeWidth={1.8} /> Household Settings</span>
          <span style={{ color: C.muted }}>→</span>
        </button>
      </div>
    </MobileShell>
  );
}

// ── Member Detail ──────────────────────────────────────────────────────────
// Per-member expense statuses (static story for non-Alex members)
const MEMBER_EXPENSE_STATUSES: Record<number, Record<number, StatusKey>> = {
  1: { 1: "Unpaid", 2: "Unpaid", 3: "Pending Verification", 4: "Paid", 5: "Overdue" }, // Alex
  2: { 1: "Paid",   2: "Unpaid", 3: "Unpaid",               4: "Paid", 5: "Unpaid"  }, // Jamie
  3: { 1: "Paid",   2: "Paid",   3: "Paid",                 4: "Paid", 5: "Paid"   }, // Sam
  4: { 1: "Unpaid", 2: "Unpaid", 3: "Unpaid",               4: "Paid", 5: "Unpaid" }, // Taylor
};

function MemberDetailScreen({ onNav, memberId, members, household, expensesLive, memberStatuses = {}, expenseShares = {} }: { onNav: (s: Screen) => void; memberId: number; members: DemoMember[]; household: HouseholdRecord; expensesLive: typeof EXPENSES; memberStatuses?: Record<number, Record<number, StatusKey>>; expenseShares?: Record<number, Record<number, number>> }) {
  const m = members.find((mb) => mb.id === memberId) ?? members[0];
  if (!m) {
    return (
      <MobileShell activeNav="household" onNav={onNav} title="Member" onBack={() => onNav("household")}>
        <div style={{ padding: "24px 20px" }}>
          <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 16, padding: 24, textAlign: "center", color: C.muted }}>
            No member details yet.
          </div>
        </div>
      </MobileShell>
    );
  }
  const dynamicPaid = expensesLive
    .filter((exp) => (memberStatuses?.[m.id]?.[exp.id] ?? exp.status ?? "Unpaid") === "Paid")
    .reduce((sum, exp) => sum + getExpenseShare(exp, m.id, expenseShares[exp.id]), 0);
  const dynamicOwed = expensesLive
    .filter((exp) => (memberStatuses?.[m.id]?.[exp.id] ?? exp.status ?? "Unpaid") !== "Paid")
    .reduce((sum, exp) => sum + getExpenseShare(exp, m.id, expenseShares[exp.id]), 0);
  return (
    <MobileShell
      activeNav="household"
      onNav={onNav}
      title={m.nick}
      onBack={() => onNav("household")}
    >
      <div style={{ padding: "16px 20px 0" }}>
        <div style={{ textAlign: "center", marginBottom: 20 }}>
          <Avatar initials={m.avatar} color={m.color} size={72} />
          <h2 style={{ fontFamily: "Outfit, sans-serif", fontSize: 20, fontWeight: 800, color: C.text, margin: "12px 0 2px" }}>
            {m.name}
          </h2>
          <p style={{ color: C.muted, fontSize: 14 }}>{m.role} · {household.name}</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 16 }}>
          {[
            { label: "Total Paid", value: peso(dynamicPaid), color: C.paid, bg: C.paidBg },
            { label: "Currently Owes", value: peso(dynamicOwed), color: dynamicOwed > 0 ? C.unpaid : C.paid, bg: dynamicOwed > 0 ? C.unpaidBg : C.paidBg },
          ].map((s) => (
            <div className="metric-card" key={s.label} style={{ background: s.bg, borderRadius: 12, padding: "14px" }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: s.color, fontFamily: "Outfit, sans-serif" }}>
                {s.label.toUpperCase()}
              </div>
              <div style={{ fontFamily: "Outfit, sans-serif", fontSize: 20, fontWeight: 800, color: C.text, marginTop: 4 }}>
                {s.value}
              </div>
            </div>
          ))}
        </div>

        <h3 style={{ fontFamily: "Outfit, sans-serif", fontSize: 15, fontWeight: 700, color: C.text, marginBottom: 10 }}>
          Assigned Expenses
        </h3>
        <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 14, overflow: "hidden", marginBottom: 16 }}>
          {expensesLive.length === 0 ? (
            <div style={{ padding: "16px", color: C.muted, fontSize: 13 }}>No assigned expenses yet.</div>
          ) : expensesLive.map((exp, i) => {
            const memberStatus = memberStatuses?.[m.id]?.[exp.id] ?? "Unpaid";
            return (
              <div
                key={exp.id}
                style={{
                  padding: "12px 16px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  borderBottom: i < expensesLive.length - 1 ? `1px solid ${C.border}` : "none",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <exp.Icon size={14} color={C.muted} strokeWidth={1.8} />
                  <span style={{ fontSize: 13, color: C.text }}>{exp.name}</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontFamily: "Outfit, sans-serif", fontSize: 13, fontWeight: 700 }}>{peso(getExpenseShare(exp, m.id, expenseShares[exp.id]))}</span>
                  <StatusBadge status={memberStatus} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </MobileShell>
  );
}

// ── Notifications Screen ───────────────────────────────────────────────────
function NotificationsScreen({ onNav, notifications, currentMember, household, accounts, joinRequests, onAcceptJoin, onRejectJoin }: { onNav: (s: Screen) => void; notifications: AppNotification[]; currentMember: DemoMember; household: HouseholdRecord; accounts: AccountRecord[]; joinRequests: JoinRequest[]; onAcceptJoin: (requestId: number) => void; onRejectJoin: (requestId: number) => void }) {
  const visibleNotifications = notifications.filter((n) => n.memberId === undefined || n.memberId === "all" || n.memberId === currentMember.id);
  const today = visibleNotifications.filter((n) => n.today);
  const earlier = visibleNotifications.filter((n) => !n.today);
  const pendingJoinRequests = household.mainTenantId === currentMember.id
    ? joinRequests.filter((request) => request.householdId === household.id && request.status === "Pending")
    : [];

  const NotifItem = ({ n }: { n: AppNotification }) => (
    <div
      style={{
        padding: "14px 16px",
        display: "flex",
        gap: 12,
        alignItems: "flex-start",
        borderBottom: `1px solid ${C.border}`,
      }}
    >
      <div
        style={{
          width: 36,
          height: 36,
          borderRadius: "50%",
          background: C.primaryLight,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <n.Icon size={15} color={C.primary} strokeWidth={2} />
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 13, color: C.text, lineHeight: 1.5 }}>{n.text}</div>
        <div style={{ fontSize: 11, color: C.muted, marginTop: 3 }}>{n.time}</div>
      </div>
    </div>
  );

  return (
    <MobileShell activeNav="notifications" onNav={onNav} title="Notifications">
      <div style={{ padding: "4px 0 0" }}>
        {pendingJoinRequests.length > 0 && (
          <>
            <div style={{ padding: "12px 20px 4px" }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: C.pending, fontFamily: "Outfit, sans-serif", letterSpacing: 0.5 }}>ACTION REQUIRED</div>
            </div>
            <div style={{ padding: "0 20px 12px", display: "flex", flexDirection: "column", gap: 10 }}>
              {pendingJoinRequests.map((request) => {
                const newbie = accounts.find((member) => member.id === request.memberId);
                if (!newbie) return null;
                return (
                  <div key={request.id} style={{ background: C.pendingBg, border: `1px solid ${C.pending}40`, borderRadius: 16, padding: 14 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                      <Avatar initials={newbie.avatar} color={newbie.color} size={38} />
                      <div>
                        <div style={{ fontFamily: "Outfit, sans-serif", fontSize: 14, fontWeight: 900, color: C.text }}>{newbie.name}</div>
                        <div style={{ fontSize: 11, color: C.muted }}>{newbie.email ?? memberEmail(newbie)} · {formatPHPhone(newbie.phone ?? "")}</div>
                      </div>
                    </div>
                    <div style={{ fontSize: 12, color: C.muted, marginBottom: 10 }}>
                      Wants to join {household.name}. Face check: {request.faceVerified ? "captured" : "missing"} · ID: {request.idUploaded ? "uploaded" : "missing"}.
                    </div>
                    <div style={{ display: "flex", gap: 8 }}>
                      <button onClick={() => onAcceptJoin(request.id)} style={{ flex: 1, border: `1.5px solid ${C.paid}`, background: C.paidBg, color: C.paid, borderRadius: 12, padding: "11px 0", fontWeight: 900, cursor: "pointer" }}>Accept</button>
                      <button onClick={() => onRejectJoin(request.id)} style={{ flex: 1, border: `1.5px solid ${C.unpaid}`, background: C.unpaidBg, color: C.unpaid, borderRadius: 12, padding: "11px 0", fontWeight: 900, cursor: "pointer" }}>Reject</button>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
        <div style={{ padding: "8px 20px 4px" }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: C.muted, fontFamily: "Outfit, sans-serif", letterSpacing: 0.5 }}>TODAY</div>
        </div>
        <div style={{ background: C.card, borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}` }}>
          {today.length > 0 ? today.map((n) => <NotifItem key={n.id} n={n} />) : (
            <div style={{ padding: "18px 20px", fontSize: 13, color: C.muted }}>No notifications today.</div>
          )}
        </div>

        <div style={{ padding: "16px 20px 4px" }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: C.muted, fontFamily: "Outfit, sans-serif", letterSpacing: 0.5 }}>EARLIER</div>
        </div>
        <div style={{ background: C.card, borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}` }}>
          {earlier.length > 0 ? earlier.map((n) => <NotifItem key={n.id} n={n} />) : (
            <div style={{ padding: "18px 20px", fontSize: 13, color: C.muted }}>No earlier notifications.</div>
          )}
        </div>

        <div style={{ padding: "20px 20px 0" }}>
          <button
            onClick={() => onNav("profile")}
            style={{
              background: C.card,
              border: `1px solid ${C.border}`,
              borderRadius: 14,
              padding: "14px 16px",
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              cursor: "pointer",
              marginBottom: 10,
            }}
          >
            <span style={{ fontFamily: "Outfit, sans-serif", fontSize: 14, fontWeight: 600, color: C.text, display: "flex", alignItems: "center", gap: 8 }}><Users size={16} color={C.muted} strokeWidth={1.8} /> Profile & Settings</span>
            <span style={{ color: C.muted }}>→</span>
          </button>
          <button
            onClick={() => onNav("reports")}
            style={{
              background: C.card,
              border: `1px solid ${C.border}`,
              borderRadius: 14,
              padding: "14px 16px",
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              cursor: "pointer",
            }}
          >
            <span style={{ fontFamily: "Outfit, sans-serif", fontSize: 14, fontWeight: 600, color: C.text, display: "flex", alignItems: "center", gap: 8 }}><BarChart2 size={16} color={C.muted} strokeWidth={1.8} /> Household Reports</span>
            <span style={{ color: C.muted }}>→</span>
          </button>
        </div>
      </div>
    </MobileShell>
  );
}

// ── Reports Screen ─────────────────────────────────────────────────────────
function ReportsScreen({ onNav, household, expensesLive, members, memberStatuses = {}, expenseShares = {} }: { onNav: (s: Screen) => void; household: HouseholdRecord; expensesLive: typeof EXPENSES; members: DemoMember[]; memberStatuses?: Record<number, Record<number, StatusKey>>; expenseShares?: Record<number, Record<number, number>> }) {
  const total = expensesLive.reduce((sum, expense) => sum + expense.total, 0);
  const categoryTotals = expensesLive.reduce<Record<string, number>>((acc, expense) => {
    acc[expense.category] = (acc[expense.category] ?? 0) + expense.total;
    return acc;
  }, {});
  const categoryColors = [C.primary, "#5B7FA6", "#4CAF7D", "#9B6BB5", "#C97D1A", C.accent];
  const categories = Object.entries(categoryTotals).map(([name, amount], index) => ({
    name,
    amount,
    pct: total > 0 ? Math.round((amount / total) * 100) : 0,
    color: categoryColors[index % categoryColors.length],
  }));
  const memberRows = members.map((member) => {
    const paid = expensesLive
      .filter((expense) => (memberStatuses?.[member.id]?.[expense.id] ?? expense.status ?? "Unpaid") === "Paid")
      .reduce((sum, expense) => sum + getExpenseShare(expense, member.id, expenseShares[expense.id]), 0);
    const assigned = expensesLive.reduce((sum, expense) => sum + getExpenseShare(expense, member.id, expenseShares[expense.id]), 0);
    return { ...member, paid, assigned };
  });
  const collected = memberRows.reduce((sum, member) => sum + member.paid, 0);
  const unpaid = Math.max(total - collected, 0);

  return (
    <MobileShell
      activeNav="reports"
      onNav={onNav}
      title="Reports"
      onBack={() => onNav("dashboard")}
    >
      <div style={{ padding: "16px 20px 0" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <h3 style={{ fontFamily: "Outfit, sans-serif", fontSize: 16, fontWeight: 700, color: C.text, margin: 0 }}>{household.name}</h3>
          <select
            style={{
              border: `1px solid ${C.border}`,
              borderRadius: 8,
              padding: "6px 10px",
              fontSize: 13,
              background: C.card,
              color: C.text,
              cursor: "pointer",
            }}
          >
            <option>September 2026</option>
            <option>August 2026</option>
          </select>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 16 }}>
          {[
            { label: "Total", value: peso(total), color: C.text },
            { label: "Collected", value: peso(collected), color: C.paid },
            { label: "Unpaid", value: peso(unpaid), color: C.unpaid },
          ].map((s) => (
            <div key={s.label} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 12, padding: "12px 10px" }}>
              <div style={{ fontSize: 9, fontWeight: 700, color: C.muted, fontFamily: "Outfit, sans-serif" }}>{s.label.toUpperCase()}</div>
              <div style={{ fontFamily: "Outfit, sans-serif", fontSize: 15, fontWeight: 800, color: s.color, marginTop: 4 }}>{s.value}</div>
            </div>
          ))}
        </div>

        <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 16, padding: "18px", marginBottom: 14 }}>
          <h4 style={{ fontFamily: "Outfit, sans-serif", fontSize: 14, fontWeight: 700, color: C.text, marginBottom: 14 }}>
            Expenses by Category
          </h4>
          {categories.length === 0 ? (
            <div style={{ fontSize: 13, color: C.muted }}>No household expenses yet.</div>
          ) : categories.map((cat) => (
            <div key={cat.name} style={{ marginBottom: 12 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                <span style={{ fontSize: 13, color: C.text, fontWeight: 500 }}>{cat.name}</span>
                <span style={{ fontFamily: "Outfit, sans-serif", fontSize: 13, fontWeight: 700, color: C.text }}>{peso(cat.amount)}</span>
              </div>
              <div style={{ background: C.border, borderRadius: 4, height: 6 }}>
                <div style={{ width: `${cat.pct}%`, background: cat.color, borderRadius: 4, height: "100%" }} />
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 16, padding: "18px", marginBottom: 14 }}>
          <h4 style={{ fontFamily: "Outfit, sans-serif", fontSize: 14, fontWeight: 700, color: C.text, marginBottom: 14 }}>
            Member Contributions
          </h4>
          {memberRows.length === 0 ? (
            <div style={{ fontSize: 13, color: C.muted }}>No approved household members yet.</div>
          ) : memberRows.map((m, i) => (
            <div key={m.id} style={{ marginBottom: i < memberRows.length - 1 ? 14 : 0 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                <span style={{ fontSize: 13, color: C.text, fontWeight: 500 }}>{m.nick}</span>
                <span style={{ fontSize: 12, color: C.muted }}>
                  {peso(m.paid)} / {peso(m.assigned)}
                </span>
              </div>
              <div style={{ background: C.border, borderRadius: 4, height: 8, position: "relative" }}>
                <div
                  style={{
                    width: `${m.assigned > 0 ? (m.paid / m.assigned) * 100 : 0}%`,
                    background: m.color || C.primary,
                    borderRadius: 4,
                    height: "100%",
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </MobileShell>
  );
}

// ── Profile Screen ─────────────────────────────────────────────────────────
// ── Security Screen ────────────────────────────────────────────────────────
function SecurityScreen({ onNav }: { onNav: (s: Screen) => void }) {
  const [biometric, setBiometric] = useState(true);
  const [twoFactor, setTwoFactor] = useState(false);
  const [sessionTimeout, setSessionTimeout] = useState("15 minutes");

  const Toggle = ({ on, onToggle }: { on: boolean; onToggle: () => void }) => (
    <div onClick={onToggle} style={{ width: 44, height: 24, borderRadius: 12, background: on ? C.primary : C.border, cursor: "pointer", position: "relative", transition: "background 0.2s", flexShrink: 0 }}>
      <div style={{ width: 18, height: 18, borderRadius: "50%", background: "#fff", position: "absolute", top: 3, left: on ? 23 : 3, transition: "left 0.2s", boxShadow: "0 1px 4px rgba(0,0,0,0.15)" }} />
    </div>
  );

  return (
    <MobileShell activeNav="notifications" onNav={onNav} title="Security" onBack={() => onNav("profile")}>
      <div style={{ padding: "16px 20px 0" }}>
        <p style={{ fontSize: 13, color: C.muted, marginBottom: 20 }}>Manage how you secure your HouseShare account.</p>

        <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 16, overflow: "hidden", marginBottom: 16 }}>
          {[
            { label: "Face ID / Biometric Login", sub: "Use biometrics to log in faster", on: biometric, toggle: () => setBiometric(!biometric) },
            { label: "Two-Factor Authentication", sub: "Extra code required on new devices", on: twoFactor, toggle: () => setTwoFactor(!twoFactor) },
          ].map((item, i, arr) => (
            <div key={item.label} style={{ padding: "16px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: i < arr.length - 1 ? `1px solid ${C.border}` : "none" }}>
              <div>
                <div style={{ fontFamily: "Outfit, sans-serif", fontSize: 14, fontWeight: 600, color: C.text }}>{item.label}</div>
                <div style={{ fontSize: 12, color: C.muted, marginTop: 2 }}>{item.sub}</div>
              </div>
              <Toggle on={item.on} onToggle={item.toggle} />
            </div>
          ))}
        </div>

        <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 16, overflow: "hidden", marginBottom: 16 }}>
          <div style={{ padding: "16px", borderBottom: `1px solid ${C.border}` }}>
            <div style={{ fontFamily: "Outfit, sans-serif", fontSize: 14, fontWeight: 600, color: C.text, marginBottom: 4 }}>Auto Lock</div>
            <select
              value={sessionTimeout}
              onChange={(e) => setSessionTimeout(e.target.value)}
              style={{ width: "100%", padding: "10px 12px", borderRadius: 10, border: `1px solid ${C.border}`, fontSize: 13, background: C.bg, color: C.text, marginTop: 6 }}
            >
              {["5 minutes", "15 minutes", "30 minutes", "1 hour", "Never"].map((o) => <option key={o}>{o}</option>)}
            </select>
          </div>
          <button
            style={{ padding: "16px", width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", background: "none", border: "none", cursor: "pointer" }}
          >
            <div>
              <div style={{ fontFamily: "Outfit, sans-serif", fontSize: 14, fontWeight: 600, color: C.text }}>Change Password</div>
              <div style={{ fontSize: 12, color: C.muted, marginTop: 2 }}>Last changed 3 months ago</div>
            </div>
            <ChevronRight size={16} color={C.muted} />
          </button>
        </div>

        <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 16, overflow: "hidden" }}>
          <div style={{ padding: "14px 16px", borderBottom: `1px solid ${C.border}` }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: C.muted, fontFamily: "Outfit, sans-serif", letterSpacing: 0.4 }}>ACTIVE SESSIONS</div>
          </div>
          {[
            { device: "iPhone 14 Pro", location: "Manila, PH", time: "Now · Current session" },
            { device: "Chrome on MacBook", location: "Quezon City, PH", time: "2 days ago" },
          ].map((s, i, arr) => (
            <div key={s.device} style={{ padding: "13px 16px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: i < arr.length - 1 ? `1px solid ${C.border}` : "none" }}>
              <div>
                <div style={{ fontFamily: "Outfit, sans-serif", fontSize: 13, fontWeight: 600, color: C.text }}>{s.device}</div>
                <div style={{ fontSize: 11, color: C.muted }}>{s.location} · {s.time}</div>
              </div>
              {i > 0 && <button style={{ background: C.unpaidBg, color: C.unpaid, border: "none", borderRadius: 8, padding: "5px 10px", fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "Outfit, sans-serif" }}>Revoke</button>}
            </div>
          ))}
        </div>
      </div>
    </MobileShell>
  );
}

// ── Notification Preferences Screen ───────────────────────────────────────
function NotifPrefsScreen({ onNav }: { onNav: (s: Screen) => void }) {
  const [prefs, setPrefs] = useState({ dueReminders: true, paymentSubmitted: true, paymentAccepted: true, paymentRejected: true, newExpense: true, householdInvite: false, activityFeed: false });
  const toggle = (key: keyof typeof prefs) => setPrefs((p) => ({ ...p, [key]: !p[key] }));

  const Toggle = ({ on, onToggle }: { on: boolean; onToggle: () => void }) => (
    <div onClick={onToggle} style={{ width: 44, height: 24, borderRadius: 12, background: on ? C.primary : C.border, cursor: "pointer", position: "relative", transition: "background 0.2s", flexShrink: 0 }}>
      <div style={{ width: 18, height: 18, borderRadius: "50%", background: "#fff", position: "absolute", top: 3, left: on ? 23 : 3, transition: "left 0.2s", boxShadow: "0 1px 4px rgba(0,0,0,0.15)" }} />
    </div>
  );

  const groups = [
    { label: "PAYMENTS", items: [
      { key: "dueReminders", label: "Payment Due Reminders", sub: "Get notified before an expense is due" },
      { key: "paymentSubmitted", label: "Payment Proof Submitted", sub: "When a member submits payment proof" },
      { key: "paymentAccepted", label: "Payment Accepted", sub: "When your payment is verified" },
      { key: "paymentRejected", label: "Payment Rejected", sub: "When your payment proof is rejected" },
    ]},
    { label: "HOUSEHOLD", items: [
      { key: "newExpense", label: "New Expense Added", sub: "When a new bill is posted" },
      { key: "householdInvite", label: "Household Invitations", sub: "When someone invites you to a household" },
      { key: "activityFeed", label: "Activity Feed Updates", sub: "General household activity" },
    ]},
  ] as const;

  return (
    <MobileShell activeNav="notifications" onNav={onNav} title="Notifications" onBack={() => onNav("profile")}>
      <div style={{ padding: "16px 20px 0" }}>
        <p style={{ fontSize: 13, color: C.muted, marginBottom: 20 }}>Choose which notifications you want to receive.</p>
        {groups.map((group) => (
          <div key={group.label} style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: C.muted, fontFamily: "Outfit, sans-serif", letterSpacing: 0.4, marginBottom: 8 }}>{group.label}</div>
            <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 16, overflow: "hidden" }}>
              {group.items.map((item, i, arr) => (
                <div key={item.key} style={{ padding: "14px 16px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: i < arr.length - 1 ? `1px solid ${C.border}` : "none" }}>
                  <div style={{ flex: 1, marginRight: 12 }}>
                    <div style={{ fontFamily: "Outfit, sans-serif", fontSize: 14, fontWeight: 600, color: C.text }}>{item.label}</div>
                    <div style={{ fontSize: 12, color: C.muted, marginTop: 2 }}>{item.sub}</div>
                  </div>
                  <Toggle on={prefs[item.key]} onToggle={() => toggle(item.key)} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </MobileShell>
  );
}

// ── Privacy Screen ─────────────────────────────────────────────────────────
function PrivacyScreen({ onNav }: { onNav: (s: Screen) => void }) {
  const [showBalance, setShowBalance] = useState(true);
  const [showHistory, setShowHistory] = useState(false);

  const Toggle = ({ on, onToggle }: { on: boolean; onToggle: () => void }) => (
    <div onClick={onToggle} style={{ width: 44, height: 24, borderRadius: 12, background: on ? C.primary : C.border, cursor: "pointer", position: "relative", transition: "background 0.2s", flexShrink: 0 }}>
      <div style={{ width: 18, height: 18, borderRadius: "50%", background: "#fff", position: "absolute", top: 3, left: on ? 23 : 3, transition: "left 0.2s", boxShadow: "0 1px 4px rgba(0,0,0,0.15)" }} />
    </div>
  );

  return (
    <MobileShell activeNav="notifications" onNav={onNav} title="Privacy" onBack={() => onNav("profile")}>
      <div style={{ padding: "16px 20px 0" }}>
        <p style={{ fontSize: 13, color: C.muted, marginBottom: 20 }}>Control what other household members can see about you.</p>

        <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 16, overflow: "hidden", marginBottom: 16 }}>
          {[
            { label: "Show My Balance to Others", sub: "Household members can see your outstanding balance", on: showBalance, toggle: () => setShowBalance(!showBalance) },
            { label: "Show My Payment History", sub: "Members can see when and how you paid", on: showHistory, toggle: () => setShowHistory(!showHistory) },
          ].map((item, i, arr) => (
            <div key={item.label} style={{ padding: "16px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: i < arr.length - 1 ? `1px solid ${C.border}` : "none" }}>
              <div style={{ flex: 1, marginRight: 12 }}>
                <div style={{ fontFamily: "Outfit, sans-serif", fontSize: 14, fontWeight: 600, color: C.text }}>{item.label}</div>
                <div style={{ fontSize: 12, color: C.muted, marginTop: 2 }}>{item.sub}</div>
              </div>
              <Toggle on={item.on} onToggle={item.toggle} />
            </div>
          ))}
        </div>

        <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 16, overflow: "hidden", marginBottom: 16 }}>
          <div style={{ padding: "14px 16px", borderBottom: `1px solid ${C.border}` }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: C.muted, fontFamily: "Outfit, sans-serif", letterSpacing: 0.4 }}>DATA & ACCOUNT</div>
          </div>
          {["Download My Data", "Delete My Account"].map((label, i) => (
            <button key={label} style={{ padding: "14px 16px", width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", background: "none", border: "none", borderBottom: i === 0 ? `1px solid ${C.border}` : "none", cursor: "pointer" }}>
              <span style={{ fontFamily: "Outfit, sans-serif", fontSize: 14, fontWeight: 600, color: i === 1 ? C.unpaid : C.text }}>{label}</span>
              <ChevronRight size={16} color={C.muted} />
            </button>
          ))}
        </div>

        <p style={{ fontSize: 12, color: C.muted, textAlign: "center", lineHeight: 1.6 }}>
          HouseShare only shares your information with members of your own household. Your data is never sold or shared externally.
        </p>
      </div>
    </MobileShell>
  );
}

function SupportTicketScreen({ onNav }: { onNav: (s: Screen) => void }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [hasImage, setHasImage] = useState(false);
  const [sent, setSent] = useState(false);

  return (
    <MobileShell activeNav="notifications" onNav={onNav} title="Support" onBack={() => onNav("profile")}>
      <div style={{ padding: "16px 20px 0" }}>
        <ScreenPrelude label="Help Desk" title="Report a concern" value={sent ? "Sent" : "Draft"} icon={LifeBuoy} />
        <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 16, padding: 18, marginBottom: 14 }}>
          <label style={{ fontSize: 11, fontWeight: 800, color: C.muted, display: "block", marginBottom: 6, fontFamily: "Outfit, sans-serif" }}>TITLE OF CONCERN</label>
          <input className="auth-input" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Payment proof won't upload" style={{ width: "100%", padding: "13px 14px", borderRadius: 12, border: `1.5px solid ${C.border}`, fontSize: 14, background: C.bg, color: C.text, boxSizing: "border-box", marginBottom: 12 }} />
          <label style={{ fontSize: 11, fontWeight: 800, color: C.muted, display: "block", marginBottom: 6, fontFamily: "Outfit, sans-serif" }}>DESCRIPTION</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Describe what happened, what screen you were on, and what you expected." style={{ width: "100%", minHeight: 116, padding: "13px 14px", borderRadius: 12, border: `1.5px solid ${C.border}`, fontSize: 14, background: C.bg, color: C.text, boxSizing: "border-box", resize: "vertical", fontFamily: "Inter, sans-serif", marginBottom: 12 }} />
          <button onClick={() => setHasImage(!hasImage)} style={{ width: "100%", border: `1.5px dashed ${hasImage ? C.paid : C.border}`, background: hasImage ? C.paidBg : C.bg, color: hasImage ? C.paid : C.muted, borderRadius: 14, padding: "18px 12px", cursor: "pointer", fontFamily: "Outfit, sans-serif", fontWeight: 800 }}>
            <ImagePlus size={20} style={{ verticalAlign: "middle", marginRight: 8 }} />
            {hasImage ? "Screenshot attached: issue_screen.png" : "Attach screenshot / image"}
          </button>
        </div>
        {sent && (
          <div style={{ background: C.paidBg, color: C.paid, border: `1px solid ${C.paid}40`, borderRadius: 14, padding: 14, marginBottom: 12, fontWeight: 800, fontFamily: "Outfit, sans-serif" }}>
            Ticket submitted. The support/community team can review it.
          </div>
        )}
        <button onClick={() => setSent(Boolean(title && description))} style={{ width: "100%", border: "none", borderRadius: 14, background: C.primary, color: "#fff", padding: "15px 0", fontFamily: "Outfit, sans-serif", fontSize: 15, fontWeight: 800, cursor: "pointer", opacity: title && description ? 1 : 0.55 }}>
          Send Concern
        </button>
      </div>
    </MobileShell>
  );
}

// ── Household Settings Screen ──────────────────────────────────────────────
function HouseholdSettingsScreen({ onNav, household, currentMember }: { onNav: (s: Screen) => void; household: HouseholdRecord; currentMember: DemoMember }) {
  const rules = [
    { category: "Rent", method: "Equal Split", Icon: Home },
    { category: "Electricity", method: "Occupancy-Based", Icon: Zap },
    { category: "Water", method: "Custom", Icon: Droplets },
    { category: "Internet", method: "Equal Split", Icon: Wifi },
    { category: "Groceries / Supplies", method: "Selected Members", Icon: ShoppingBasket },
  ];

  const sections = [
    { label: "Household Information", sub: `${household.name} · ${household.inviteCode}`, Icon: Users },
    { label: "Invitation Link", sub: household.inviteLink, Icon: ChevronRight },
    { label: "Permissions", sub: "Who can add expenses, verify payments", Icon: Shield },
    { label: "Transfer Main Tenant", sub: "Pass manager role to another member", Icon: Users },
  ];
  const manager = household.mainTenantId === currentMember.id;

  return (
    <MobileShell activeNav="household" onNav={onNav} title="Household Settings" onBack={() => onNav("household")}>
      <div style={{ padding: "16px 20px 0" }}>

        {/* General sections */}
        <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 16, overflow: "hidden", marginBottom: 16 }}>
          {sections.map((s, i, arr) => (
            <button key={s.label} style={{ padding: "14px 16px", width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", background: "none", border: "none", borderBottom: i < arr.length - 1 ? `1px solid ${C.border}` : "none", cursor: "pointer" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 34, height: 34, borderRadius: 9, background: C.primaryLight, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <s.Icon size={16} color={C.primary} strokeWidth={1.8} />
                </div>
                <div style={{ textAlign: "left" }}>
                  <div style={{ fontFamily: "Outfit, sans-serif", fontSize: 14, fontWeight: 600, color: s.label === "Transfer Main Tenant" ? C.unpaid : C.text }}>{s.label}</div>
                  <div style={{ fontSize: 12, color: C.muted }}>{s.sub}</div>
                </div>
              </div>
              <ChevronRight size={16} color={C.muted} />
            </button>
          ))}
        </div>

        <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 16, padding: 16, marginBottom: 16 }}>
          <div style={{ fontSize: 11, fontWeight: 800, color: C.primary, fontFamily: "Outfit, sans-serif", letterSpacing: 0.4 }}>HOUSEHOLD SETUP</div>
          <h3 style={{ fontFamily: "Outfit, sans-serif", fontSize: 16, fontWeight: 900, color: C.text, margin: "5px 0 10px" }}>{household.name}</h3>
          <div style={{ background: C.bg, border: `1px solid ${C.border}`, borderRadius: 12, padding: 12, marginBottom: 12 }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: C.muted, fontFamily: "Outfit, sans-serif" }}>CURRENT INVITE CODE</div>
            <div style={{ fontFamily: "Outfit, sans-serif", fontSize: 16, fontWeight: 900, color: C.text, marginTop: 3 }}>{household.inviteCode}</div>
            <div style={{ fontSize: 11, color: C.muted, marginTop: 2 }}>{household.inviteLink}</div>
          </div>
          {(household.fixedBills.length ? household.fixedBills : [{ label: "No fixed bills yet", value: manager ? "Add expenses to start" : "Waiting for main tenant", Icon: Receipt }]).map((bill) => (
            <div key={bill.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderTop: `1px solid ${C.border}` }}>
              <span style={{ display: "flex", alignItems: "center", gap: 9, fontFamily: "Outfit, sans-serif", fontSize: 13, fontWeight: 800, color: C.text }}><bill.Icon size={15} color={C.primary} /> {bill.label}</span>
              <span style={{ fontSize: 12, color: C.muted, background: C.bg, border: `1px solid ${C.border}`, borderRadius: 8, padding: "4px 9px" }}>{bill.value}</span>
            </div>
          ))}
        </div>

        {/* Cost-sharing rules */}
        <div style={{ marginBottom: 8 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: C.muted, fontFamily: "Outfit, sans-serif", letterSpacing: 0.4 }}>COST-SHARING RULES</div>
            <button style={{ background: "none", border: "none", color: C.primary, fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "Outfit, sans-serif" }}>Edit</button>
          </div>
          <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 16, overflow: "hidden" }}>
            {rules.map((r, i, arr) => (
              <div key={r.category} style={{ padding: "13px 16px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: i < arr.length - 1 ? `1px solid ${C.border}` : "none" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <r.Icon size={15} color={C.muted} strokeWidth={1.8} />
                  <span style={{ fontFamily: "Outfit, sans-serif", fontSize: 13, fontWeight: 600, color: C.text }}>{r.category}</span>
                </div>
                <span style={{ fontSize: 12, color: C.muted, background: C.bg, border: `1px solid ${C.border}`, borderRadius: 8, padding: "3px 9px", fontFamily: "Outfit, sans-serif" }}>{r.method}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MobileShell>
  );
}

function ProfileScreen({ onNav, onReset, currentMember, linkedSources, theme, onToggleTheme, profilePhotos, onSetProfilePhoto }: { onNav: (s: Screen) => void; onReset: () => void; currentMember: DemoMember; linkedSources: LinkedFundingSource[]; theme: "light" | "dark"; onToggleTheme: () => void; profilePhotos: Record<number, string>; onSetProfilePhoto: (memberId: number, value: string) => void }) {
  const [nick, setNick] = useState(currentMember.nick);
  const [editing, setEditing] = useState(false);
  const linkedAccounts = linkedSources.map((source) => ({
    source,
    bank: BANK_METHODS.find((bank) => bank.id === source.bankId),
  }));

  useEffect(() => {
    setNick(currentMember.nick);
  }, [currentMember]);

  return (
    <MobileShell
      activeNav="notifications"
      onNav={onNav}
      title="Profile"
      onBack={() => onNav("notifications")}
    >
      <div style={{ padding: "16px 20px 0" }}>
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          {profilePhotos[currentMember.id] ? (
            <div style={{ width: 72, height: 72, borderRadius: "50%", background: profilePhotos[currentMember.id], color: "#fff", display: "inline-flex", alignItems: "center", justifyContent: "center", fontFamily: "Outfit, sans-serif", fontSize: 26, fontWeight: 900, border: `3px solid ${C.primaryLight}` }}>
              {currentMember.avatar}
            </div>
          ) : (
            <Avatar initials={currentMember.avatar} color={currentMember.color} size={72} />
          )}
          <h2 style={{ fontFamily: "Outfit, sans-serif", fontSize: 20, fontWeight: 800, color: C.text, margin: "12px 0 2px" }}>
            {currentMember.name}
          </h2>
          <p style={{ color: C.muted, fontSize: 13 }}>{memberEmail(currentMember)} · {currentMember.role}</p>
          <p style={{ color: C.muted, fontSize: 13 }}>Sunrise Apartment</p>
          <button onClick={() => onSetProfilePhoto(currentMember.id, `linear-gradient(135deg, ${currentMember.color}, ${C.accent})`)} style={{ marginTop: 10, border: `1px solid ${C.border}`, background: C.card, color: C.primary, borderRadius: 999, padding: "8px 12px", fontFamily: "Outfit, sans-serif", fontSize: 12, fontWeight: 800, cursor: "pointer" }}>
            <Camera size={14} style={{ verticalAlign: "middle", marginRight: 6 }} /> Edit profile photo
          </button>
        </div>

        <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 16, padding: "18px", marginBottom: 14 }}>
          <h3 style={{ fontFamily: "Outfit, sans-serif", fontSize: 14, fontWeight: 700, color: C.text, marginBottom: 14 }}>
            Account Information
          </h3>
          {[
            { label: "Registered Name", value: currentMember.name, editable: false },
            { label: "Email", value: memberEmail(currentMember), editable: false },
          ].map((f) => (
            <div key={f.label} style={{ marginBottom: 12 }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: C.muted, fontFamily: "Outfit, sans-serif", marginBottom: 4 }}>
                {f.label.toUpperCase()}
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: 14, color: C.text }}>{f.value}</span>
                {!f.editable && (
                  <span style={{ fontSize: 10, background: C.bg, border: `1px solid ${C.border}`, borderRadius: 6, padding: "3px 7px", color: C.muted, fontFamily: "Outfit, sans-serif" }}>
                    Cannot edit
                  </span>
                )}
              </div>
            </div>
          ))}
          <div>
            <div style={{ fontSize: 11, fontWeight: 600, color: C.muted, fontFamily: "Outfit, sans-serif", marginBottom: 4 }}>
              NICKNAME
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              {editing ? (
                <>
                  <input
                    value={nick}
                    onChange={(e) => setNick(e.target.value)}
                    style={{
                      flex: 1,
                      padding: "8px 10px",
                      borderRadius: 8,
                      border: `1.5px solid ${C.primary}`,
                      fontSize: 14,
                      color: C.text,
                      marginRight: 10,
                      fontFamily: "Inter, sans-serif",
                      outline: "none",
                    }}
                  />
                  <button
                    onClick={() => setEditing(false)}
                    style={{
                      background: C.primary,
                      color: "#fff",
                      border: "none",
                      borderRadius: 8,
                      padding: "8px 14px",
                      fontSize: 13,
                      fontWeight: 600,
                      cursor: "pointer",
                      fontFamily: "Outfit, sans-serif",
                    }}
                  >
                    Save
                  </button>
                </>
              ) : (
                <>
                  <span style={{ fontSize: 14, color: C.text }}>{nick}</span>
                  <button
                    onClick={() => setEditing(true)}
                    style={{
                      background: "none",
                      border: "none",
                      color: C.primary,
                      fontSize: 13,
                      fontWeight: 600,
                      cursor: "pointer",
                      fontFamily: "Outfit, sans-serif",
                    }}
                  >
                    Edit
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 16, padding: "18px", marginBottom: 14 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, marginBottom: 14 }}>
            <div>
              <h3 style={{ fontFamily: "Outfit, sans-serif", fontSize: 14, fontWeight: 800, color: C.text, margin: 0 }}>
                Billing & Linked Accounts
              </h3>
              <p style={{ fontSize: 12, color: C.muted, margin: "3px 0 0" }}>Saved payment sources for bill payments</p>
            </div>
            <button
              onClick={() => onNav("link-account")}
              style={{ border: `1px solid ${C.primary}40`, background: C.primaryLight, color: C.primary, borderRadius: 10, padding: "8px 10px", fontFamily: "Outfit, sans-serif", fontSize: 12, fontWeight: 800, cursor: "pointer", whiteSpace: "nowrap" }}
            >
              Add
            </button>
          </div>

          {linkedAccounts.length === 0 ? (
            <div style={{ background: C.bg, border: `1px dashed ${C.border}`, borderRadius: 14, padding: "16px", textAlign: "center" }}>
              <CreditCard size={26} color={C.muted} strokeWidth={1.6} />
              <div style={{ fontFamily: "Outfit, sans-serif", fontSize: 13, fontWeight: 800, color: C.text, marginTop: 8 }}>No linked payment account yet</div>
              <div style={{ fontSize: 12, color: C.muted, marginTop: 3 }}>
                Link a bank account during payment to see it here.
              </div>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {linkedAccounts.map(({ source, bank }) => (
                <div
                  key={source.id}
                  style={{ border: `1px solid ${C.border}`, borderRadius: 14, padding: "12px 14px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 10, minWidth: 0 }}>
                    {bank ? (
                      <BrandLogo
                        src={bank.logoUrl}
                        alt={`${source.label} logo`}
                        fallback={bank.fallback}
                        fallbackBg={bank.bg}
                        fallbackColor={bank.text}
                        size={38}
                      />
                    ) : (
                      <CreditCard size={24} color={C.primary} />
                    )}
                    <div style={{ minWidth: 0 }}>
                      <div style={{ fontFamily: "Outfit, sans-serif", fontSize: 13, fontWeight: 800, color: C.text, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                        {source.label} •••• {source.last4}
                      </div>
                      <div style={{ fontSize: 11, color: C.muted, marginTop: 2, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                        {source.holder} · {source.source}
                      </div>
                    </div>
                  </div>
                  <span style={{ fontSize: 11, fontWeight: 800, color: C.paid, background: C.paidBg, borderRadius: 999, padding: "5px 8px", flexShrink: 0 }}>
                    Linked
                  </span>
                </div>
              ))}
            </div>
          )}
          <p style={{ fontSize: 11, color: C.muted, lineHeight: 1.5, margin: "12px 0 0" }}>
            Full account numbers are not shown. HouseShare displays only the linked source and last four digits.
          </p>
        </div>

        <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 16, padding: "18px", marginBottom: 14 }}>
          <h3 style={{ fontFamily: "Outfit, sans-serif", fontSize: 14, fontWeight: 800, color: C.text, margin: 0 }}>
            Support & Community
          </h3>
          <p style={{ fontSize: 12, color: C.muted, margin: "3px 0 14px" }}>
            Contact us for bugs, future fixes, or household app help.
          </p>
          {[
            { Icon: Mail, label: "Email Support", sub: "houseshare.help@gmail.com" },
            { Icon: MessageCircle, label: "Discord Community", sub: "Open community chat for fixes and feedback" },
            { Icon: LifeBuoy, label: "In-App Help Desk", sub: "Send a bug report or feature request" },
          ].map((item, i) => (
            <button
              key={item.label}
              onClick={() => onNav("support-ticket")}
              style={{
                width: "100%",
                border: "none",
                background: "transparent",
                textDecoration: "none",
                color: "inherit",
                borderTop: i > 0 ? `1px solid ${C.border}` : "none",
                padding: i > 0 ? "12px 0 0" : "0",
                marginTop: i > 0 ? 12 : 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 12,
              }}
            >
              <span style={{ display: "flex", alignItems: "center", gap: 10, minWidth: 0 }}>
                <span style={{ width: 36, height: 36, borderRadius: 12, background: C.primaryLight, display: "grid", placeItems: "center", flexShrink: 0 }}>
                  <item.Icon size={17} color={C.primary} strokeWidth={1.9} />
                </span>
                <span style={{ minWidth: 0 }}>
                  <span style={{ display: "block", fontFamily: "Outfit, sans-serif", fontSize: 13, fontWeight: 800, color: C.text }}>{item.label}</span>
                  <span style={{ display: "block", fontSize: 11, color: C.muted, marginTop: 2, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{item.sub}</span>
                </span>
              </span>
              <ChevronRight size={15} color={C.muted} />
            </button>
          ))}
        </div>

        <button
          onClick={onToggleTheme}
          style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 14, padding: "14px 16px", width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer", marginBottom: 10 }}
        >
          <span style={{ fontFamily: "Outfit, sans-serif", fontSize: 14, fontWeight: 700, color: C.text, display: "flex", alignItems: "center", gap: 8 }}>
            {theme === "dark" ? <Sun size={16} color={C.muted} /> : <Moon size={16} color={C.muted} />}
            {theme === "dark" ? "Switch to Light Theme" : "Switch to Dark Theme"}
          </span>
          <span style={{ color: C.muted }}>→</span>
        </button>

        {[
          { Icon: Shield, label: "Security", dest: "security" as Screen },
          { Icon: BellRing, label: "Notification Preferences", dest: "notif-prefs" as Screen },
          { Icon: EyeOff, label: "Privacy", dest: "privacy" as Screen },
        ].map((item) => (
          <button
            key={item.label}
            onClick={() => onNav(item.dest)}
            style={{
              background: C.card,
              border: `1px solid ${C.border}`,
              borderRadius: 14,
              padding: "14px 16px",
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              cursor: "pointer",
              marginBottom: 10,
            }}
          >
            <span style={{ fontFamily: "Outfit, sans-serif", fontSize: 14, fontWeight: 600, color: C.text }}>
              <item.Icon size={16} color={C.muted} strokeWidth={1.8} style={{ marginRight: 8 }} /> {item.label}
            </span>
            <span style={{ color: C.muted }}>→</span>
          </button>
        ))}

        <button
          onClick={() => onNav("welcome")}
          style={{
            background: C.unpaidBg,
            color: C.unpaid,
            border: `1px solid ${C.unpaid}30`,
            borderRadius: 14,
            padding: "14px 16px",
            width: "100%",
            fontSize: 14,
            fontWeight: 700,
            cursor: "pointer",
            fontFamily: "Outfit, sans-serif",
            marginBottom: 10,
          }}
        >
          Log Out
        </button>

        <button
          onClick={onReset}
          style={{
            background: C.bg,
            color: C.muted,
            border: `1px dashed ${C.border}`,
            borderRadius: 14,
            padding: "13px 16px",
            width: "100%",
            fontSize: 13,
            fontWeight: 600,
            cursor: "pointer",
            fontFamily: "Outfit, sans-serif",
            marginBottom: 10,
          }}
        >
          Reset Demo Data
        </button>
      </div>
    </MobileShell>
  );
}

// ── Desktop Dashboard (wide layout) ────────────────────────────────────────
function DesktopDashboard({ screen, onNav, expensesLive, myUnpaid, unpaidCount, pendingQueue, onSelectExpense, currentMember, household, members, expenseShares = {}, memberStatuses = {}, onSelectMember, onLogout }: {
  screen: Screen; onNav: (s: Screen) => void;
  expensesLive: typeof EXPENSES; myUnpaid: number; unpaidCount: number;
  pendingQueue: number[]; onSelectExpense: (id: number, dest?: Screen) => void;
  currentMember: DemoMember;
  household: HouseholdRecord;
  members: DemoMember[];
  expenseShares?: Record<number, Record<number, number>>;
  memberStatuses?: Record<number, Record<number, StatusKey>>;
  onSelectMember: (id: number) => void;
  onLogout: () => void;
}) {
  const manager = household.mainTenantId === currentMember.id;
  const paidTotal = expensesLive.filter((e) => e.status === "Paid").reduce((sum, e) => sum + e.myShare, 0);
  const pendingTotal = expensesLive.filter((e) => e.status === "Pending Verification").reduce((sum, e) => sum + e.myShare, 0);
  const memberOwed = (memberId: number) =>
    expensesLive
      .filter((expense) => (memberStatuses?.[memberId]?.[expense.id] ?? expense.status ?? "Unpaid") !== "Paid")
      .reduce((sum, expense) => sum + getExpenseShare(expense, memberId, expenseShares[expense.id]), 0);

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: C.bg }}>
      <DesktopSidebar active={screen} onNav={onNav} currentMember={currentMember} onLogout={onLogout} />
      <div style={{ marginLeft: 220, flex: 1, padding: "28px 32px", maxWidth: 1220 }}>
        {/* Top bar */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 28 }}>
          <div>
            <p style={{ color: C.muted, fontSize: 13, margin: 0 }}>Good evening,</p>
            <h1 style={{ fontFamily: "Outfit, sans-serif", fontSize: 26, fontWeight: 800, color: C.text, margin: "2px 0 0" }}>
              {currentMember.name} · {currentMember.role} · {household.name}
            </h1>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            {manager && (
              <button
                style={{
                  background: C.primary,
                  color: "#fff",
                  border: "none",
                  borderRadius: 10,
                  padding: "10px 18px",
                  fontSize: 14,
                  fontWeight: 700,
                  cursor: "pointer",
                  fontFamily: "Outfit, sans-serif",
                }}
                onClick={() => onNav("add-expense")}
              >
                + Add Expense
              </button>
            )}
            <button
              onClick={() => onNav("notifications")}
              style={{
                background: C.card,
                border: `1px solid ${C.border}`,
                borderRadius: 10,
                width: 40,
                height: 40,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                position: "relative",
              }}
            >
              <Bell size={18} color={C.text} strokeWidth={1.8} />
              <span style={{ position: "absolute", top: 6, right: 6, width: 8, height: 8, background: C.primary, borderRadius: "50%", border: "2px solid white" }} />
            </button>
            <AccountMenu currentMember={currentMember} onNav={onNav} onLogout={onLogout} />
          </div>
        </div>

        {/* KPI row */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 28 }}>
            {[
            { label: "Your Balance", value: peso(myUnpaid), sub: `${unpaidCount} unpaid expense${unpaidCount === 1 ? "" : "s"}`, color: C.primary, bg: C.primaryLight },
            { label: "Total Paid", value: peso(paidTotal), sub: "This month", color: C.paid, bg: C.paidBg },
            { label: "Household Total", value: peso(expensesLive.reduce((sum, expense) => sum + expense.total, 0)), sub: "September 2026", color: C.text, bg: C.card },
            { label: manager ? "Pending Review" : "Pending", value: manager ? `${pendingQueue.length} payment${pendingQueue.length === 1 ? "" : "s"}` : peso(pendingTotal), sub: manager ? "Main tenant queue" : "Awaiting review", color: C.pending, bg: C.pendingBg },
          ].map((kpi) => (
            <div key={kpi.label} style={{ background: kpi.bg, border: `1px solid ${C.border}`, borderRadius: 16, padding: "20px" }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: kpi.color, fontFamily: "Outfit, sans-serif", letterSpacing: 0.3 }}>
                {kpi.label.toUpperCase()}
              </div>
              <div style={{ fontFamily: "Outfit, sans-serif", fontSize: 24, fontWeight: 800, color: C.text, margin: "8px 0 4px" }}>
                {kpi.value}
              </div>
              <div style={{ fontSize: 12, color: C.muted }}>{kpi.sub}</div>
            </div>
          ))}
        </div>

        <div style={{ maxWidth: 460, marginBottom: 22 }}>
          <BillingCycleChart compact />
        </div>

        {/* Two-column content */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 360px", gap: 20 }}>
          {/* Expenses table */}
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
              <h2 style={{ fontFamily: "Outfit, sans-serif", fontSize: 17, fontWeight: 700, color: C.text, margin: 0 }}>
                Expenses
              </h2>
              <button
                onClick={() => onNav("expenses")}
                style={{ background: "none", border: "none", color: C.primary, fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "Outfit, sans-serif" }}
              >
                View all
              </button>
            </div>
            <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 16, overflow: "hidden" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ background: C.bg }}>
                    {["Expense", "Period", "Total", "Your Share", "Due", "Status"].map((h) => (
                      <th key={h} style={{ padding: "12px 16px", textAlign: "left", fontSize: 11, fontWeight: 700, color: C.muted, fontFamily: "Outfit, sans-serif", borderBottom: `1px solid ${C.border}` }}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {expensesLive.map((exp, i) => (
                    <tr
                      key={exp.id}
                      onClick={() => onNav("expense-detail")}
                      style={{
                        borderBottom: i < expensesLive.length - 1 ? `1px solid ${C.border}` : "none",
                        cursor: "pointer",
                      }}
                    >
                      <td style={{ padding: "13px 16px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                          <exp.Icon size={15} color={C.primary} strokeWidth={1.8} />
                          <span style={{ fontFamily: "Outfit, sans-serif", fontSize: 13, fontWeight: 600, color: C.text }}>{exp.name}</span>
                        </div>
                      </td>
                      <td style={{ padding: "13px 16px", fontSize: 13, color: C.muted }}>{exp.period}</td>
                      <td style={{ padding: "13px 16px", fontFamily: "Outfit, sans-serif", fontSize: 13, fontWeight: 600, color: C.text }}>{peso(exp.total)}</td>
                      <td style={{ padding: "13px 16px", fontFamily: "Outfit, sans-serif", fontSize: 13, fontWeight: 700, color: C.primary }}>{peso(exp.myShare)}</td>
                      <td style={{ padding: "13px 16px", fontSize: 13, color: C.muted }}>{exp.due}</td>
                      <td style={{ padding: "13px 16px" }}>
                        <StatusBadge status={exp.status} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Right column */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {/* Members */}
            <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 16, padding: "18px" }}>
              <h3 style={{ fontFamily: "Outfit, sans-serif", fontSize: 15, fontWeight: 700, color: C.text, marginBottom: 14 }}>
                Members
              </h3>
              {members.length === 0 ? (
                <div style={{ padding: "8px 0", fontSize: 12, color: C.muted }}>No approved tenants yet.</div>
              ) : members.map((m, i) => (
                <div
                  key={m.id}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "9px 0",
                    borderBottom: i < members.length - 1 ? `1px solid ${C.border}` : "none",
                    cursor: "pointer",
                  }}
                  onClick={() => { onSelectMember(m.id); onNav("member-detail"); }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <Avatar initials={m.avatar} color={m.color} size={30} />
                    <div>
                      <div style={{ fontFamily: "Outfit, sans-serif", fontSize: 13, fontWeight: 600, color: C.text }}>{m.nick}</div>
                      <div style={{ fontSize: 11, color: C.muted }}>{m.role}</div>
                    </div>
                  </div>
                  {memberOwed(m.id) > 0 ? (
                    <span style={{ fontSize: 12, fontWeight: 700, color: C.unpaid }}>{peso(memberOwed(m.id))} owed</span>
                  ) : (
                    <StatusBadge status="Paid" />
                  )}
                </div>
              ))}
            </div>

            {/* Activity */}
            <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 16, padding: "18px" }}>
              <h3 style={{ fontFamily: "Outfit, sans-serif", fontSize: 15, fontWeight: 700, color: C.text, marginBottom: 14 }}>
                Activity
              </h3>
              {ACTIVITIES.map((act, i) => (
                <div
                  key={act.id}
                  style={{
                    display: "flex",
                    gap: 10,
                    padding: "8px 0",
                    borderBottom: i < ACTIVITIES.length - 1 ? `1px solid ${C.border}` : "none",
                  }}
                >
                  <act.Icon size={14} color={C.primary} strokeWidth={2} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 12, color: C.text }}>{act.text}</div>
                    <div style={{ fontSize: 11, color: C.muted, marginTop: 2 }}>{act.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── App State Types ────────────────────────────────────────────────────────
type AppStatuses = Record<number, StatusKey>;

// ── Root App ───────────────────────────────────────────────────────────────
export default function App() {
  const [screen, setScreen] = useState<Screen>("welcome");
  const [isWide, setIsWide] = useState(window.innerWidth >= 900);
  const [selectedExpenseId, setSelectedExpenseId] = useState<number>(2);
  const [selectedMemberId, setSelectedMemberId] = useState<number>(2);
  const [currentMemberId, setCurrentMemberId] = useState<number>(1);
  const [members, setMembers] = useState<AccountRecord[]>(MEMBERS);
  const [households, setHouseholds] = useState<Record<string, HouseholdRecord>>(DEFAULT_HOUSEHOLDS);
  const [customExpenses, setCustomExpenses] = useState<Record<string, ExpenseRecord[]>>({});
  const [expenseShares, setExpenseShares] = useState<Record<number, Record<number, number>>>({});
  const [approvedMemberIds, setApprovedMemberIds] = useState<number[]>(MEMBERS.map((m) => m.id));
  const [joinRequests, setJoinRequests] = useState<JoinRequest[]>([]);
  const [profilePhotos, setProfilePhotos] = useState<Record<number, string>>({});
  const [theme, setTheme] = useState<"light" | "dark">("light");
  Object.assign(C, theme === "dark" ? DARK_COLORS : LIGHT_COLORS);

  // Live expense statuses — updated when payments are made/accepted/rejected
  const [statuses, setStatuses] = useState<AppStatuses>({
    1: "Unpaid",               // Rent
    2: "Unpaid",               // Electricity
    3: "Pending Verification", // Water (Alex already submitted)
    4: "Paid",                 // Internet
    5: "Overdue",              // Supplies
  });

  const [memberStatuses, setMemberStatuses] = useState<Record<number, Record<number, StatusKey>>>({
    1: { 1: "Unpaid", 2: "Unpaid", 3: "Pending Verification", 4: "Paid", 5: "Overdue" },
    2: { 1: "Paid",   2: "Unpaid", 3: "Unpaid",               4: "Paid", 5: "Unpaid"  },
    3: { 1: "Paid",   2: "Paid",   3: "Paid",                 4: "Paid", 5: "Paid"   },
    4: { 1: "Unpaid", 2: "Unpaid", 3: "Unpaid",               4: "Paid", 5: "Unpaid" },
  });

  // Pending receipt records in the manager's verification queue.
  const [pendingReceipts, setPendingReceipts] = useState<PendingReceipt[]>([
    { expenseId: 3, memberId: 1, submittedAt: "Sept. 9, 2026", method: "GCash" },
  ]);
  const [notifications, setNotifications] = useState<AppNotification[]>(NOTIFICATIONS);
  const [linkedSources, setLinkedSources] = useState<LinkedFundingSource[]>([]);

  // Resize listener
  useEffect(() => {
    const handler = () => setIsWide(window.innerWidth >= 900);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  useEffect(() => {
    const validScreens: Screen[] = [
      "welcome", "login", "register", "dashboard", "expenses", "expense-detail",
      "add-expense", "payments", "make-payment", "link-account", "payment-submitted", "household",
      "household-settings", "member-detail", "notifications", "profile", "security",
      "notif-prefs", "privacy", "support-ticket", "reports", "verify-payments",
    ];
    const syncFromHash = () => {
      const next = window.location.hash.replace("#", "") as Screen;
      if (validScreens.includes(next)) setScreen(next);
    };
    syncFromHash();
    window.addEventListener("hashchange", syncFromHash);
    return () => window.removeEventListener("hashchange", syncFromHash);
  }, []);

  // ── Derived data ─────────────────────────────────────────────────────────
  const currentMember = members.find((m) => m.id === currentMemberId) ?? members[0];
  const currentHouseholdId = memberHouseholdId(currentMember);
  const currentHousehold = households[currentHouseholdId] ?? DEFAULT_HOUSEHOLDS[SUNRISE_HOUSEHOLD_ID];
  const manager = currentHousehold.mainTenantId === currentMember.id;
  const approvedMembers = members.filter((member) => memberHouseholdId(member) === currentHousehold.id && approvedMemberIds.includes(member.id));
  const splitCount = Math.max(approvedMembers.length, 1);
  const currentStatuses = memberStatuses[currentMember.id] ?? statuses;
  const householdExpensesBase = [
    ...EXPENSES.filter((expense) => currentHousehold.expenseIds.includes(expense.id)),
    ...(customExpenses[currentHousehold.id] ?? []),
  ];
  const expensesLive = householdExpensesBase.map((e) => ({
    ...e,
    myShare: expenseShares[e.id]?.[currentMember.id] ?? Math.round((e.total / splitCount) * 100) / 100,
    status: currentStatuses[e.id] ?? statuses[e.id],
  }));
  const selectedExpense = expensesLive.find((e) => e.id === selectedExpenseId) ?? expensesLive[0] ?? EXPENSES[0];
  const managerPendingExpenses = pendingReceipts
    .map((receipt) => {
      const expense = householdExpensesBase.find((e) => e.id === receipt.expenseId);
      return expense
        ? { ...expense, status: "Pending Verification" as StatusKey, submittedBy: receipt.memberId, submittedAt: receipt.submittedAt, paymentMethod: receipt.method }
        : null;
    })
    .filter((expense): expense is typeof EXPENSES[number] & { submittedBy: number; submittedAt: string; paymentMethod: string } => Boolean(expense));
  const memberPendingExpenses = expensesLive.filter((e) => e.status === "Pending Verification");
  const pendingExpenses = manager ? managerPendingExpenses : memberPendingExpenses;
  const pendingQueue = pendingExpenses.map((e) => e.id);

  const myUnpaid = expensesLive
    .filter((e) => e.status === "Unpaid" || e.status === "Overdue")
    .reduce((s, e) => s + e.myShare, 0);

  const myPaid = expensesLive
    .filter((e) => e.status === "Paid")
    .reduce((s, e) => s + e.myShare, 0);

  const myPending = expensesLive
    .filter((e) => e.status === "Pending Verification")
    .reduce((s, e) => s + e.myShare, 0);

  const unpaidCount = expensesLive.filter(
    (e) => e.status === "Unpaid" || e.status === "Overdue"
  ).length;

  // ── Actions ───────────────────────────────────────────────────────────────
  const submitPayment = (expenseId: number, paymentMethod = "GCash") => {
    setMemberStatuses((prev) => ({
      ...prev,
      [currentMember.id]: { ...prev[currentMember.id], [expenseId]: "Pending Verification" },
    }));
    setPendingReceipts((prev) =>
      prev.some((receipt) => receipt.expenseId === expenseId && receipt.memberId === currentMember.id)
        ? prev
        : [...prev, { expenseId, memberId: currentMember.id, submittedAt: "Sept. 29, 2026", method: paymentMethod }]
    );
    setNotifications((prev) => [
      {
        id: Date.now(),
        text: `${currentMember.nick} submitted proof for ${EXPENSES.find((e) => e.id === expenseId)?.name ?? "an expense"}.`,
        time: "Just now",
        Icon: Upload,
        today: true,
        memberId: currentHousehold.mainTenantId,
      },
      ...prev,
    ]);
  };

  const acceptPayment = (expenseId: number) => {
    const receipt = pendingReceipts.find((item) => item.expenseId === expenseId);
    if (!receipt) return;
    setMemberStatuses((prev) => {
      const memberRecord = prev[receipt.memberId] ?? {};
      return { ...prev, [receipt.memberId]: { ...memberRecord, [expenseId]: "Paid" } };
    });
    setPendingReceipts((prev) => prev.filter((item) => !(item.expenseId === expenseId && item.memberId === receipt.memberId)));
    const expenseName = EXPENSES.find((e) => e.id === expenseId)?.name ?? "your payment";
    const approverName = currentMember.nick;
    setNotifications((prev) => [
      {
        id: Date.now(),
        text: `${approverName} accepted your receipt for ${expenseName}.`,
        time: "Just now",
        Icon: CheckCircle2,
        today: true,
        memberId: receipt.memberId,
      },
      ...prev,
    ]);
  };

  const rejectPayment = (expenseId: number) => {
    const receipt = pendingReceipts.find((item) => item.expenseId === expenseId);
    if (!receipt) return;
    setMemberStatuses((prev) => {
      const memberRecord = prev[receipt.memberId] ?? {};
      return { ...prev, [receipt.memberId]: { ...memberRecord, [expenseId]: "Rejected" } };
    });
    setPendingReceipts((prev) => prev.filter((item) => !(item.expenseId === expenseId && item.memberId === receipt.memberId)));
    const expenseName = EXPENSES.find((e) => e.id === expenseId)?.name ?? "your payment";
    const approverName = currentMember.nick;
    setNotifications((prev) => [
      {
        id: Date.now(),
        text: `${approverName} rejected your receipt for ${expenseName}. Please upload a clearer proof.`,
        time: "Just now",
        Icon: BellRing,
        today: true,
        memberId: receipt.memberId,
      },
      ...prev,
    ]);
  };

  const resetDemo = () => {
    setMembers(MEMBERS);
    setHouseholds(DEFAULT_HOUSEHOLDS);
    setCustomExpenses({});
    setExpenseShares({});
    setApprovedMemberIds(MEMBERS.map((m) => m.id));
    setJoinRequests([]);
    setProfilePhotos({});
    setTheme("light");
    setStatuses({ 1: "Unpaid", 2: "Unpaid", 3: "Pending Verification", 4: "Paid", 5: "Overdue" });
    setMemberStatuses({
      1: { 1: "Unpaid", 2: "Unpaid", 3: "Pending Verification", 4: "Paid", 5: "Overdue" },
      2: { 1: "Paid",   2: "Unpaid", 3: "Unpaid",               4: "Paid", 5: "Unpaid"  },
      3: { 1: "Paid",   2: "Paid",   3: "Paid",                 4: "Paid", 5: "Paid"   },
      4: { 1: "Unpaid", 2: "Unpaid", 3: "Unpaid",               4: "Paid", 5: "Unpaid" },
    });
    setPendingReceipts([{ expenseId: 3, memberId: 1, submittedAt: "Sept. 9, 2026", method: "GCash" }]);
    setNotifications(NOTIFICATIONS);
    setLinkedSources([]);
    setSelectedExpenseId(2);
    setScreen("dashboard");
  };

  const navToExpense = (id: number, dest: Screen = "expense-detail") => {
    setSelectedExpenseId(id);
    setScreen(dest);
  };

  const navToPayment = (id: number) => {
    setSelectedExpenseId(id);
    setScreen("make-payment");
  };

  const addExpense = (draft: { name: string; category: string; total: number; due: string; method: string; Icon: typeof Home; shares: Record<number, number> }) => {
    if (!draft.total || draft.total <= 0) return;
    const nextExpense: ExpenseRecord = {
      id: Date.now(),
      name: draft.name,
      category: draft.category,
      total: draft.total,
      myShare: draft.shares[currentMember.id] ?? Math.round((draft.total / Math.max(approvedMembers.length, 1)) * 100) / 100,
      due: draft.due,
      status: "Unpaid",
      period: "September 2026",
      method: draft.method,
      Icon: draft.Icon,
    };
    setCustomExpenses((prev) => ({
      ...prev,
      [currentHousehold.id]: [...(prev[currentHousehold.id] ?? []), nextExpense],
    }));
    setExpenseShares((prev) => ({ ...prev, [nextExpense.id]: draft.shares }));
    setMemberStatuses((prev) => {
      const next = { ...prev };
      approvedMembers.forEach((member) => {
        next[member.id] = { ...(next[member.id] ?? {}), [nextExpense.id]: "Unpaid" };
      });
      return next;
    });
    setSelectedExpenseId(nextExpense.id);
    setNotifications((prev) => [
      {
        id: Date.now(),
        text: `${currentMember.nick} added ${nextExpense.name}. Member shares were calculated for ${currentHousehold.name}.`,
        time: "Just now",
        Icon: FilePlus,
        today: true,
        memberId: "all",
      },
      ...prev,
    ]);
  };

  const logout = () => {
    setCurrentMemberId(1);
    setScreen("welcome");
    window.location.hash = "welcome";
  };

  const registerMember = (member: AccountRecord, householdValue: string, role: "main" | "tenant", faceVerified: boolean, idUploaded: boolean) => {
    const matchedHousehold = Object.values(households).find((household) => inviteMatches(householdValue, household.inviteCode));
    if (role === "tenant" && !matchedHousehold) return;
    const createdHouseholdId = `household-${member.id}`;
    const newInviteCode = makeInviteCode(householdValue || member.nick, member.id);
    const targetHousehold =
      role === "main"
        ? {
            id: createdHouseholdId,
            name: householdValue.trim() || `${member.nick}'s Household`,
            inviteCode: newInviteCode,
            inviteLink: makeInviteLink(newInviteCode),
            mainTenantId: member.id,
            expenseIds: [],
            fixedBills: [],
          }
        : matchedHousehold;
    const householdForMember = targetHousehold ?? DEFAULT_HOUSEHOLDS[SUNRISE_HOUSEHOLD_ID];
    const memberRecord = { ...member, householdId: householdForMember.id };

    if (role === "main") {
      setHouseholds((prev) => ({ ...prev, [householdForMember.id]: householdForMember }));
      setApprovedMemberIds((prev) => prev.includes(member.id) ? prev : [...prev, member.id]);
    }

    setMembers((prev) => [...prev, memberRecord]);
    setMemberStatuses((prev) => ({ ...prev, [member.id]: { 1: "Unpaid", 2: "Unpaid", 3: "Unpaid", 4: "Unpaid", 5: "Unpaid" } }));
    setCurrentMemberId(member.id);

    if (role === "tenant" && matchedHousehold) {
      setJoinRequests((prev) => [...prev, { id: Date.now(), memberId: member.id, householdId: matchedHousehold.id, inviteCode: matchedHousehold.inviteCode, status: "Pending", submittedAt: "Just now", faceVerified, idUploaded }]);
    }

    setNotifications((prev) => [
      {
        id: Date.now(),
        text:
          role === "main"
            ? `${member.name} created ${householdForMember.name}. Add fixed bills or monthly expenses to start calculations.`
            : `${member.name} requested to join ${householdForMember.name} and needs identity approval.`,
        time: "Just now",
        Icon: BadgeCheck,
        today: true,
        memberId: householdForMember.mainTenantId,
      },
      ...prev,
    ]);
  };

  const acceptJoinRequest = (requestId: number) => {
    const request = joinRequests.find((item) => item.id === requestId);
    if (!request) return;
    setJoinRequests((prev) => prev.map((item) => item.id === requestId ? { ...item, status: "Accepted" } : item));
    setApprovedMemberIds((prev) => prev.includes(request.memberId) ? prev : [...prev, request.memberId]);
    const newbie = members.find((member) => member.id === request.memberId);
    const household = households[request.householdId] ?? currentHousehold;
    const approver = members.find((member) => member.id === household.mainTenantId);
    setNotifications((prev) => [
      { id: Date.now(), text: `${approver?.nick ?? "Main tenant"} accepted ${newbie?.name ?? "the new tenant"} into ${household.name}. Shares have been recalculated.`, time: "Just now", Icon: CheckCircle2, today: true, memberId: "all" },
      ...prev,
    ]);
  };

  const rejectJoinRequest = (requestId: number) => {
    const request = joinRequests.find((item) => item.id === requestId);
    setJoinRequests((prev) => prev.map((item) => item.id === requestId ? { ...item, status: "Rejected" } : item));
    if (request) {
      setNotifications((prev) => [
        { id: Date.now(), text: `${currentMember.nick} rejected your household join request. Please contact the main tenant.`, time: "Just now", Icon: XCircle, today: true, memberId: request.memberId },
        ...prev,
      ]);
    }
  };

  // ── Shared props bundles ──────────────────────────────────────────────────
  const sharedNav = { onNav: setScreen };

  const DESKTOP_SCREENS: Screen[] = [
    "dashboard", "expenses", "payments", "household", "reports", "notifications", "profile",
  ];

  if (isWide && DESKTOP_SCREENS.includes(screen)) {
    if (screen === "dashboard")
      return (
        <DesktopDashboard
          screen={screen}
          onNav={setScreen}
          expensesLive={expensesLive}
          myUnpaid={myUnpaid}
          unpaidCount={unpaidCount}
          pendingQueue={pendingQueue}
          onSelectExpense={navToExpense}
          currentMember={currentMember}
          household={currentHousehold}
          members={approvedMembers}
          expenseShares={expenseShares}
          memberStatuses={memberStatuses}
          onSelectMember={(id) => { setSelectedMemberId(id); setScreen("member-detail"); }}
          onLogout={logout}
        />
      );
    return (
      <div style={{ display: "flex", minHeight: "100vh", background: C.bg }}>
        <DesktopSidebar active={screen} onNav={setScreen} currentMember={currentMember} onLogout={logout} />
        <div style={{ marginLeft: 220, flex: 1, maxWidth: 680 }}>
          {screen === "expenses" && (
            <ExpensesScreen {...sharedNav} expensesLive={expensesLive} onSelectExpense={navToExpense} currentMember={currentMember} />
          )}
          {screen === "payments" && (
            <PaymentsScreen
              {...sharedNav}
              pendingQueue={pendingQueue}
              pendingExpenses={pendingExpenses}
              expensesLive={expensesLive}
              myPaid={myPaid}
              myPending={myPending}
              myUnpaid={myUnpaid}
              onSelectExpense={navToExpense}
              onPay={navToPayment}
              currentMember={currentMember}
            />
          )}
          {screen === "household" && (
            <HouseholdScreen {...sharedNav} currentMember={currentMember} members={approvedMembers} accounts={members} household={currentHousehold} expensesLive={expensesLive} expenseShares={expenseShares} memberStatuses={memberStatuses} joinRequests={joinRequests} onAcceptJoin={acceptJoinRequest} onRejectJoin={rejectJoinRequest} onSelectMember={(id) => { setSelectedMemberId(id); setScreen("member-detail"); }} />
          )}
          {screen === "member-detail" && <MemberDetailScreen {...sharedNav} memberId={selectedMemberId} members={approvedMembers} household={currentHousehold} expensesLive={expensesLive} memberStatuses={memberStatuses} expenseShares={expenseShares} />}
          {screen === "reports" && <ReportsScreen {...sharedNav} household={currentHousehold} expensesLive={expensesLive} members={approvedMembers} memberStatuses={memberStatuses} expenseShares={expenseShares} />}
          {screen === "notifications" && <NotificationsScreen {...sharedNav} notifications={notifications} currentMember={currentMember} household={currentHousehold} accounts={members} joinRequests={joinRequests} onAcceptJoin={acceptJoinRequest} onRejectJoin={rejectJoinRequest} />}
          {screen === "profile" && <ProfileScreen {...sharedNav} onReset={resetDemo} currentMember={currentMember} linkedSources={linkedSources} theme={theme} onToggleTheme={() => setTheme((t) => t === "dark" ? "light" : "dark")} profilePhotos={profilePhotos} onSetProfilePhoto={(id, value) => setProfilePhotos((prev) => ({ ...prev, [id]: value }))} />}
          {screen === "security" && <SecurityScreen {...sharedNav} />}
          {screen === "notif-prefs" && <NotifPrefsScreen {...sharedNav} />}
          {screen === "privacy" && <PrivacyScreen {...sharedNav} />}
          {screen === "household-settings" && <HouseholdSettingsScreen {...sharedNav} household={currentHousehold} currentMember={currentMember} />}
        </div>
      </div>
    );
  }

  switch (screen) {
    case "welcome":
      return <WelcomeScreen onNav={setScreen} />;
    case "login":
      return <LoginScreen onNav={setScreen} currentMember={currentMember} onLogin={setCurrentMemberId} members={members} />;
    case "register":
      return <RegisterScreen onNav={setScreen} onRegister={registerMember} nextMemberId={Math.max(...members.map((m) => m.id)) + 1} inviteCodes={Object.values(households).map((household) => household.inviteCode)} accounts={members} />;
    case "dashboard":
      return (
        <DashboardScreen
          onNav={setScreen}
          expensesLive={expensesLive}
          myUnpaid={myUnpaid}
          unpaidCount={unpaidCount}
          pendingQueue={pendingQueue}
          onSelectExpense={navToExpense}
          currentMember={currentMember}
          household={currentHousehold}
          onLogout={logout}
        />
      );
    case "expenses":
      return <ExpensesScreen onNav={setScreen} expensesLive={expensesLive} onSelectExpense={navToExpense} currentMember={currentMember} />;
    case "expense-detail":
      return (
        <ExpenseDetailScreen
          onNav={setScreen}
          expense={selectedExpense}
          onPay={() => navToPayment(selectedExpense.id)}
          currentMember={currentMember}
          members={approvedMembers}
          memberStatuses={memberStatuses}
          expenseShares={expenseShares}
        />
      );
    case "add-expense":
      return <AddExpenseScreen onNav={setScreen} currentMember={currentMember} members={approvedMembers} household={currentHousehold} onAddExpense={addExpense} />;
    case "payments":
      return (
        <PaymentsScreen
          onNav={setScreen}
          pendingQueue={pendingQueue}
          pendingExpenses={pendingExpenses}
          expensesLive={expensesLive}
          myPaid={myPaid}
          myPending={myPending}
          myUnpaid={myUnpaid}
          onSelectExpense={navToExpense}
          onPay={navToPayment}
          currentMember={currentMember}
        />
      );
    case "make-payment":
      return (
        <MakePaymentScreen
          onNav={setScreen}
          expense={selectedExpense}
          linkedSources={linkedSources}
          onLinkSource={(source) => setLinkedSources((prev) => [source, ...prev])}
          onSubmit={(paymentMethod) => { submitPayment(selectedExpense.id, paymentMethod); setScreen("payment-submitted"); }}
        />
      );
    case "link-account":
      return (
        <MakePaymentScreen
          onNav={setScreen}
          expense={selectedExpense}
          linkedSources={linkedSources}
          onLinkSource={(source) => setLinkedSources((prev) => [source, ...prev])}
          onSubmit={() => setScreen("profile")}
          mode="link-only"
        />
      );
    case "payment-submitted":
      return <PaymentSubmittedScreen onNav={setScreen} expense={selectedExpense} currentMember={currentMember} />;
    case "verify-payments":
      return (
        <VerifyPaymentsScreen
          onNav={setScreen}
          pendingExpenses={pendingExpenses}
          onAccept={acceptPayment}
          onReject={rejectPayment}
          currentMember={currentMember}
          members={approvedMembers}
        />
      );
    case "household":
      return <HouseholdScreen onNav={setScreen} currentMember={currentMember} members={approvedMembers} accounts={members} household={currentHousehold} expensesLive={expensesLive} expenseShares={expenseShares} memberStatuses={memberStatuses} joinRequests={joinRequests} onAcceptJoin={acceptJoinRequest} onRejectJoin={rejectJoinRequest} onSelectMember={(id) => { setSelectedMemberId(id); setScreen("member-detail"); }} />;
    case "member-detail":
      return <MemberDetailScreen onNav={setScreen} memberId={selectedMemberId} members={approvedMembers} household={currentHousehold} expensesLive={expensesLive} memberStatuses={memberStatuses} expenseShares={expenseShares} />;
    case "notifications":
      return <NotificationsScreen onNav={setScreen} notifications={notifications} currentMember={currentMember} household={currentHousehold} accounts={members} joinRequests={joinRequests} onAcceptJoin={acceptJoinRequest} onRejectJoin={rejectJoinRequest} />;
    case "reports":
      return <ReportsScreen onNav={setScreen} household={currentHousehold} expensesLive={expensesLive} members={approvedMembers} memberStatuses={memberStatuses} expenseShares={expenseShares} />;
    case "profile":
      return <ProfileScreen onNav={setScreen} onReset={resetDemo} currentMember={currentMember} linkedSources={linkedSources} theme={theme} onToggleTheme={() => setTheme((t) => t === "dark" ? "light" : "dark")} profilePhotos={profilePhotos} onSetProfilePhoto={(id, value) => setProfilePhotos((prev) => ({ ...prev, [id]: value }))} />;
    case "security":
      return <SecurityScreen onNav={setScreen} />;
    case "notif-prefs":
      return <NotifPrefsScreen onNav={setScreen} />;
    case "privacy":
      return <PrivacyScreen onNav={setScreen} />;
    case "support-ticket":
      return <SupportTicketScreen onNav={setScreen} />;
    case "household-settings":
      return <HouseholdSettingsScreen onNav={setScreen} household={currentHousehold} currentMember={currentMember} />;
    default:
      return (
        <DashboardScreen
          onNav={setScreen}
          expensesLive={expensesLive}
          myUnpaid={myUnpaid}
          unpaidCount={unpaidCount}
          pendingQueue={pendingQueue}
          onSelectExpense={navToExpense}
          currentMember={currentMember}
          household={currentHousehold}
          onLogout={logout}
        />
      );
  }
}
