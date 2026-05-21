"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import achievementCup from "@/assets/achivment.png";
import logoImage from "@/assets/logo_transparent_fixed.png";
import profileImage from "@/assets/profileImg.png";
import {
  BarChart3,
  Bell,
  BriefcaseBusiness,
  Building2,
  Calendar,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  ClipboardList,
  Clock3,
  FileBarChart,
  GraduationCap,
  Headphones,
  Home as HomeIcon,
  ImageIcon,
  Mail,
  Megaphone,
  Menu,
  Phone,
  RefreshCw,
  Search,
  Settings,
  ShieldCheck,
  Trophy,
  UserRound,
  UsersRound,
  X,
  type LucideIcon,
} from "lucide-react";
import { motion } from "framer-motion";
import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
} from "recharts";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const menuItems = [
  { label: "Dashboard", icon: HomeIcon, active: true },
  { label: "Profile", icon: UserRound },
  { label: "Schools Management", icon: Building2 },
  { label: "Staff Management", icon: UsersRound },
  { label: "Student Management", icon: GraduationCap },
  { label: "Reports", icon: BarChart3 },
  { label: "Job Application List", icon: BriefcaseBusiness },
  { label: "Holiday", icon: CalendarDays },
  { label: "My Achievements", icon: Trophy },
  { label: "Exam Schedule", icon: ClipboardList },
  { label: "Settings", icon: Settings },
];

const teacherMenuItems = [
  { label: "HOME WORKS", icon: ClipboardList },
  { label: "DIARY REMARKS", icon: FileBarChart },
  { label: "TIME TABLE", icon: Calendar },
  { label: "ANNOUNCEMENT", icon: Megaphone },
  { label: "MY ACHIEVEMENTS", icon: Trophy },
  { label: "PROFILE", icon: UserRound },
] as const;

type UserRole = "Admin" | "Principal" | "Teacher";
type MenuItem = {
  label: string;
  icon: LucideIcon;
  active?: boolean;
};
type TeacherMenuLabel = (typeof teacherMenuItems)[number]["label"];

const defaultTeacherSection: TeacherMenuLabel = "HOME WORKS";

function normalizeRole(value: unknown): UserRole | null {
  const role = String(value ?? "").trim().toLowerCase();

  if (role === "teacher") {
    return "Teacher";
  }

  if (role === "principal") {
    return "Principal";
  }

  if (role === "admin") {
    return "Admin";
  }

  return null;
}

function readStoredRole(): UserRole | null {
  if (typeof window === "undefined") {
    return null;
  }

  const searchRole = new URLSearchParams(window.location.search).get("role");
  if (searchRole) {
    return normalizeRole(searchRole);
  }

  const storageKeys = ["loggedInUserRole", "userRole", "role"];

  for (const key of storageKeys) {
    const value = window.localStorage.getItem(key) ?? window.sessionStorage.getItem(key);
    if (value) {
      return normalizeRole(value);
    }
  }

  const userKeys = ["loggedInUser", "authUser", "user"];

  for (const key of userKeys) {
    const rawValue = window.localStorage.getItem(key) ?? window.sessionStorage.getItem(key);
    if (!rawValue) {
      continue;
    }

    try {
      const parsed = JSON.parse(rawValue) as { role?: unknown; userRole?: unknown };
      if (parsed.role ?? parsed.userRole) {
        return normalizeRole(parsed.role ?? parsed.userRole);
      }
    } catch {
      const matchedRole = rawValue.match(/"?(role|userRole)"?\s*[:=]\s*"?([a-zA-Z ]+)/i);
      if (matchedRole?.[2]) {
        return normalizeRole(matchedRole[2]);
      }
    }
  }

  const cookieRole = document.cookie
    .split("; ")
    .find((item) => item.startsWith("role=") || item.startsWith("userRole="))
    ?.split("=")[1];

  return normalizeRole(cookieRole);
}

function useLoggedInRole() {
  const [role, setRole] = useState<UserRole | null>(null);

  useEffect(() => {
    const syncRole = () => setRole(readStoredRole());
    const timer = window.setTimeout(syncRole, 0);

    window.addEventListener("storage", syncRole);
    window.addEventListener("focus", syncRole);

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("storage", syncRole);
      window.removeEventListener("focus", syncRole);
    };
  }, []);

  return role;
}

const summaryCards = [
  {
    label: "Total Schools",
    value: "12",
    change: "3.2%",
    icon: Building2,
    gradient: "from-[#7C3AED] to-[#2563EB]",
  },
  {
    label: "Total Staff",
    value: "256",
    change: "5.4%",
    icon: UsersRound,
    gradient: "from-[#2563EB] to-[#38BDF8]",
  },
  {
    label: "Total Students",
    value: "4,258",
    change: "4.1%",
    icon: GraduationCap,
    gradient: "from-[#22C55E] to-[#16A34A]",
  },
  {
    label: "Total Reports",
    value: "128",
    change: "2.6%",
    icon: FileBarChart,
    gradient: "from-[#F97316] to-[#FB923C]",
  },
  {
    label: "Job Applications",
    value: "36",
    change: "8.7%",
    icon: BriefcaseBusiness,
    gradient: "from-[#FF3366] to-[#D91B8C]",
  },
];

const timetable = [
  ["09:00 AM - 09:45 AM", "Class 10 - A", "Mathematics", "Completed"],
  ["09:45 AM - 10:30 AM", "Class 10 - A", "Mathematics", "Completed"],
  ["10:45 AM - 11:30 AM", "Class 9 - B", "Algebra", "In Progress"],
  ["11:30 AM - 12:15 PM", "Class 9 - B", "Algebra", "Upcoming"],
  ["01:00 PM - 01:45 PM", "Class 8 - C", "Geometry", "Upcoming"],
];

const attendanceData = [
  { name: "Present", value: 81, color: "#22C55E" },
  { name: "Absent", value: 14, color: "#FF3366" },
  { name: "Leave", value: 5, color: "#F97316" },
];

const staffData = [
  { name: "Teaching Staff", value: 165, color: "#6D5DF6" },
  { name: "Non-Teaching Staff", value: 61, color: "#22C55E" },
  { name: "Support Staff", value: 30, color: "#F97316" },
];

const notices = [
  ["Staff Meeting Scheduled on 25 May 2024", "20 May 2024"],
  ["Summer Vacation from 01 June to 15 June", "18 May 2024"],
  ["New Academic Session 2024-25", "15 May 2024"],
  ["PTM on 30 May 2024", "14 May 2024"],
];

const exams = [
  ["Unit Test - 1 (Class 10)", "22 May 2024"],
  ["Half Yearly Exam (Class 9)", "05 Jun 2024"],
  ["Unit Test - 1 (Class 8)", "12 Jun 2024"],
  ["Annual Exam (All Classes)", "01 Jul 2024"],
];

const jobs = [
  { label: "New Applications", value: "36", icon: BriefcaseBusiness, color: "#FF3366", bg: "#FFE4EF" },
  { label: "Shortlisted", value: "12", icon: ShieldCheck, color: "#2563EB", bg: "#E5EDFF" },
  { label: "In Process", value: "8", icon: Clock3, color: "#F97316", bg: "#FFF0DB" },
  { label: "Selected", value: "5", icon: CheckCircle2, color: "#22C55E", bg: "#E0FBE7" },
];

const holidays = [
  ["25 May 2024", "Saturday", "Weekend"],
  ["26 May 2024", "Sunday", "Weekend"],
  ["27 May 2024", "Monday", "Summer Holiday"],
];

const teacherQuickSummaryCards = [
  {
    label: "Home Works",
    value: "4",
    note: "assigned today",
    icon: ClipboardList,
    gradient: "from-[#16C8C1] to-[#099A92]",
    soft: "bg-[#CFF5EA]",
    section: "HOME WORKS",
  },
  {
    label: "Diary Remarks",
    value: "2",
    note: "latest entries",
    icon: FileBarChart,
    gradient: "from-[#FFC22B] to-[#F58A00]",
    soft: "bg-[#FFD5A7]",
    section: "DIARY REMARKS",
  },
  {
    label: "Classes Today",
    value: "5",
    note: "on timetable",
    icon: Calendar,
    gradient: "from-[#43B8FF] to-[#087BDF]",
    soft: "bg-[#CAE2FF]",
    section: "TIME TABLE",
  },
  {
    label: "Announcements",
    value: "3",
    note: "new updates",
    icon: Megaphone,
    gradient: "from-[#A36BF2] to-[#6E38C4]",
    soft: "bg-[#E4C8FF]",
    section: "ANNOUNCEMENT",
  },
] as const;

const teacherLatestUpdates = [
  {
    title: "Class 10 - A Mathematics homework",
    detail: "Algebra worksheet assigned for today.",
    meta: "Home Works",
    section: "HOME WORKS",
    icon: ClipboardList,
    tone: "teal",
  },
  {
    title: "Parent note added",
    detail: "Diary remark pending for Class 9 - B.",
    meta: "Diary Remarks",
    section: "DIARY REMARKS",
    icon: FileBarChart,
    tone: "yellow",
  },
  {
    title: "Staff announcement",
    detail: "Please select announcement type to review details.",
    meta: "Announcement",
    section: "ANNOUNCEMENT",
    icon: Megaphone,
    tone: "purple",
  },
] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0 },
};

function useClientReady() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  return ready;
}

function IconTile({
  icon: Icon,
  className,
}: {
  icon: LucideIcon;
  className: string;
}) {
  return (
    <div className={cn("flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-[14px] text-white shadow-[0_12px_20px_rgba(8,27,75,0.16)]", className)}>
      <Icon className="h-6 w-6" />
    </div>
  );
}

function MotionCard({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      transition={{ duration: 0.45, delay, ease: "easeOut" }}
      whileHover={{ y: -4 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function Sidebar({
  isOpen,
  onClose,
  items = menuItems,
  activeLabel = "Dashboard",
  onSelect,
  profileName = "Admin",
  profileBadge = "Super Administrator",
  isTeacherTheme = false,
}: {
  isOpen: boolean;
  onClose: () => void;
  items?: readonly MenuItem[];
  activeLabel?: string;
  onSelect?: (label: string) => void;
  profileName?: string;
  profileBadge?: string;
  isTeacherTheme?: boolean;
}) {
  return (
    <aside
      className={cn(
        "fixed inset-y-0 left-0 z-50 flex w-[252px] max-w-[calc(100vw-2rem)] flex-col gap-[13px] overflow-y-auto p-[14px] shadow-[18px_0_45px_rgba(8,27,75,0.18)] transition-transform duration-300 lg:z-30 lg:translate-x-0 lg:rounded-r-[16px]",
        isTeacherTheme
          ? "bg-[linear-gradient(180deg,#F7FCFD_0%,#F5FAF8_42%,#FFF4DA_100%)] text-[#12264A]"
          : "bg-gradient-to-b from-[#0B1558] via-[#0A1552] to-[#06143A] text-white",
        isOpen ? "translate-x-0" : "-translate-x-full",
      )}
    >
      <button
        aria-label="Close sidebar"
        onClick={onClose}
        className={cn(
          "absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full backdrop-blur transition lg:hidden",
          isTeacherTheme
            ? "bg-[#E2F8F6] text-[#087D78] hover:bg-[#CCF1ED]"
            : "bg-white/12 text-white hover:bg-white/20",
        )}
      >
        <X className="h-4 w-4" />
      </button>

      <div className="flex h-[58px] items-center gap-2 rounded-[9px] bg-white px-2 py-1.5 shadow-[0_15px_35px_rgba(0,0,0,0.16)]">
        <Image
          src={logoImage}
          alt="Sri Chaitanya Educational Institutions"
          priority
          className="h-[43px] w-[43px] shrink-0 rounded-full object-contain"
        />
        <div className="min-w-0 leading-[1.02]">
          <p className={cn("truncate text-[18px] font-black", isTeacherTheme ? "text-[#10244A]" : "text-[#0B55D9]")}>
            Sri Chaitanya
          </p>
          <p className={cn("truncate text-[10px] font-extrabold", isTeacherTheme ? "text-[#087D78]" : "text-[#EF2A2A]")}>
            Educational Institutions
          </p>
        </div>
      </div>

      <div
        className={cn(
          "relative mt-[48px] rounded-[12px] px-4 pb-4 pt-[42px] text-center",
          isTeacherTheme
            ? "border border-[#D6EAE7] bg-white/62 shadow-[0_18px_34px_rgba(19,181,174,0.08)]"
            : "border border-white/14 bg-white/[0.055] shadow-inner shadow-white/5",
        )}
      >
        <Image
          src={profileImage}
          alt="Admin profile"
          width={92}
          height={92}
          className="absolute left-1/2 top-0 h-[84px] w-[84px] -translate-x-1/2 -translate-y-1/2 rounded-full border-[3px] border-white object-cover shadow-[0_12px_32px_rgba(255,255,255,0.16)]"
        />
        <h2 className="text-[21px] font-extrabold leading-tight">{profileName}</h2>
        <Badge
          className={cn(
            "mt-2 rounded-md px-3 py-1 text-[11px] text-white",
            isTeacherTheme
              ? "bg-gradient-to-r from-[#36B7B0] to-[#1D9E98]"
              : "bg-gradient-to-r from-[#FF2E7A] via-[#D91B8C] to-[#5B2BE8]",
          )}
        >
          {profileBadge}
        </Badge>
      </div>

      <nav className="grid gap-[3px]">
        {items.map((item) => (
          <button
            key={item.label}
            onClick={() => {
              onSelect?.(item.label);
              onClose();
            }}
            className={cn(
              "group flex h-[41px] items-center gap-3 rounded-[11px] px-4 text-left text-[13px] font-semibold transition-all duration-200 hover:translate-x-1",
              isTeacherTheme
                ? "text-[#12264A] hover:bg-[linear-gradient(90deg,#078EA0_0%,#24A7A1_34%,#79B978_68%,#DFCF36_100%)] hover:text-white hover:shadow-[0_14px_26px_rgba(7,142,160,0.20)]"
                : "text-white/88 hover:bg-white/10",
              (item.active || item.label === activeLabel) &&
                (isTeacherTheme
                  ? "bg-[linear-gradient(90deg,#078EA0_0%,#24A7A1_34%,#79B978_68%,#DFCF36_100%)] text-white shadow-[0_14px_28px_rgba(7,142,160,0.20)]"
                  : "bg-gradient-to-r from-[#FF3366] to-[#D91B8C] text-white shadow-[0_14px_24px_rgba(255,51,102,0.26)]"),
            )}
          >
            <item.icon className="h-[18px] w-[18px] shrink-0" />
            <span className="truncate">{item.label}</span>
          </button>
        ))}
      </nav>

      <div
        className={cn(
          "mt-auto rounded-[14px] p-4",
          isTeacherTheme
            ? "border border-[#F2DFA2] bg-[#FFF7E6] text-[#0B716D] shadow-[0_18px_40px_rgba(245,196,67,0.13)]"
            : "bg-gradient-to-br from-[#3927D8] via-[#6D28D9] to-[#A855F7] shadow-[0_18px_40px_rgba(109,40,217,0.32)]",
        )}
      >
        <div className="mb-3 flex items-center gap-3">
          <div className={cn("flex h-8 w-8 items-center justify-center rounded-full", isTeacherTheme ? "bg-[#DDF8F5] text-[#0B9F99]" : "bg-white/18")}>
            <Headphones className="h-4 w-4" />
          </div>
          <p className="text-sm font-extrabold">Need Help?</p>
        </div>
        <p className={cn("mb-4 text-xs leading-5", isTeacherTheme ? "text-[#0B716D]" : "text-white/86")}>
          We&apos;re here to help you manage everything smoothly.
        </p>
        <Button
          variant="outline"
          className={cn(
            "h-8 w-full rounded-md bg-white text-[11px] shadow-none hover:bg-white",
            isTeacherTheme ? "border border-[#D9E6E4] text-[#0B716D] hover:border-[#13B5AE]" : "border-0 text-[#081B4B]",
          )}
        >
          <Headphones className="h-3.5 w-3.5" />
          Contact Support
        </Button>
      </div>
    </aside>
  );
}

function Header({
  onMenuClick,
  title = "Welcome back, Admin!",
  subtitle = "Here's what's happening in your dashboard today.",
  isTeacherTheme = false,
}: {
  onMenuClick: () => void;
  title?: string;
  subtitle?: string;
  isTeacherTheme?: boolean;
}) {
  return (
    <header className="flex items-center justify-between gap-3 lg:items-center">
      <div className="flex items-start gap-4">
        <Button
          variant="outline"
          size="icon"
          aria-label="Open sidebar"
          onClick={onMenuClick}
          className="shrink-0 lg:hidden"
        >
          <Menu className="h-5 w-5" />
        </Button>

        <div className="hidden lg:block">
          <h1 className="text-[21px] font-black leading-tight text-[#081B4B] sm:text-[24px]">
            {title}{" "}
            <motion.span
              aria-hidden="true"
              className="inline-block origin-[70%_70%]"
              animate={{
                rotate: [0, 0, 22, -14, 18, -8, 10, 0, 0],
                scale: [1, 1, 1.08, 1.03, 1.08, 1.02, 1.05, 1, 1],
                y: [0, 0, -1, 0, -1, 0, 0, 0, 0],
              }}
              transition={{
                duration: 1.8,
                ease: [0.42, 0, 0.2, 1],
                repeat: Infinity,
                repeatDelay: 1.6,
              }}
            >
              {"\u{1F44B}"}
            </motion.span>
          </h1>
          <p className="mt-1 text-sm font-medium text-[#64748B]">
            {subtitle}
          </p>
        </div>
      </div>

      <div className="flex min-w-0 items-center gap-3 lg:shrink-0">
        <div
          className={cn(
            "hidden min-w-0 items-center gap-3 bg-white px-4 sm:w-[266px] lg:flex",
            isTeacherTheme
              ? "h-10 rounded-[10px] border border-[#E8EEF3] shadow-[0_10px_24px_rgba(15,40,80,0.09)]"
              : "h-11 rounded-xl border border-[#E6ECF5] shadow-[0_12px_30px_rgba(8,27,75,0.05)]",
          )}
        >
          <Search className={cn("h-5 w-5 shrink-0", isTeacherTheme ? "text-[#13B5AE]" : "text-[#8DA0C0]")} />
          <input
            aria-label="Search"
            className="min-w-0 flex-1 bg-transparent text-sm font-semibold text-[#081B4B] outline-none placeholder:text-[#8DA0C0]"
            placeholder="Search anything..."
          />
          <RefreshCw className={cn("h-4 w-4 shrink-0", isTeacherTheme ? "text-[#0EAFAA]" : "text-[#2563EB]")} />
        </div>
        <button
          aria-label="Notifications"
          className={cn(
            "relative flex shrink-0 items-center justify-center border bg-white text-[#081B4B] transition hover:-translate-y-0.5",
            isTeacherTheme
              ? "h-10 w-10 rounded-[10px] border-[#E8EEF3] shadow-[0_10px_24px_rgba(15,40,80,0.09)] hover:text-[#0EAFAA]"
              : "h-11 w-11 rounded-xl border-[#E6ECF5] shadow-[0_12px_30px_rgba(8,27,75,0.05)]",
          )}
        >
          <Bell className="h-5 w-5" />
          <span className={cn("absolute flex items-center justify-center rounded-full text-xs font-black text-white", isTeacherTheme ? "-right-1 -top-2 h-5 w-5 bg-[#0EAFAA]" : "-right-1.5 -top-1.5 h-5 w-5 bg-[#FF3366]")}>
            7
          </span>
        </button>
        <button
          className={cn(
            "flex min-w-0 items-center gap-2 border px-3 text-xs font-extrabold text-[#081B4B] transition hover:-translate-y-0.5 sm:gap-3 sm:px-4 sm:text-sm",
            isTeacherTheme
              ? "h-10 rounded-[10px] border-[#CFECE5] bg-[#F5FBF7] shadow-[0_10px_24px_rgba(15,40,80,0.07)]"
              : "h-11 rounded-xl border-[#FFD3E0] bg-[#FFF3F7] shadow-[0_12px_30px_rgba(236,72,153,0.08)]",
          )}
        >
          <Calendar className={cn("h-5 w-5 shrink-0", isTeacherTheme ? "text-[#0EAFAA]" : "text-[#2563EB]")} />
          <span className="truncate">20 May 2024, Monday</span>
          {/* <ChevronDown className="h-4 w-4 text-[#FF3366]" /> */}
        </button>
      </div>
    </header>
  );
}

function SummaryCard({
  card,
  index,
}: {
  card: (typeof summaryCards)[number];
  index: number;
}) {
  return (
    <MotionCard delay={0.05 + index * 0.04}>
      <Card className="h-full p-5">
        <div className="flex items-start gap-4">
          <IconTile icon={card.icon} className={`bg-gradient-to-br ${card.gradient}`} />
          <div className="min-w-0">
            <p className="text-[13px] font-semibold text-[#64748B]">{card.label}</p>
            <p className="mt-2 text-[26px] font-black leading-none text-[#081B4B]">{card.value}</p>
          </div>
        </div>
        <div className="mt-5 flex items-center gap-2 text-[13px]">
          <span className="font-black text-[#22C55E]">{"\u2197"} {card.change}</span>
          <span className="font-medium text-[#64748B]">from last month</span>
        </div>
      </Card>
    </MotionCard>
  );
}

function TimetableCard() {
  return (
    <MotionCard delay={0.12} className="xl:col-span-5">
      <Card className="h-full p-5">
        <CardHeader>
          <CardTitle>Today&apos;s Time Table</CardTitle>
          <button className="text-sm font-extrabold text-[#FF3366]">View Full Timetable</button>
        </CardHeader>
        <CardContent className="mt-3 overflow-x-auto thin-scrollbar">
          <table className="w-full min-w-[580px] border-collapse text-sm">
            <tbody>
              {timetable.map(([time, className, subject, status]) => (
                <tr key={`${time}-${status}`} className="border-t border-[#E6ECF5]">
                  <td className="py-3 font-semibold text-[#081B4B]">{time}</td>
                  <td className="py-3 font-semibold text-[#081B4B]">{className}</td>
                  <td className="py-3 font-semibold text-[#081B4B]">{subject}</td>
                  <td className="py-3 text-right">
                    <Badge
                      variant={
                        status === "Completed"
                          ? "green"
                          : status === "In Progress"
                            ? "blue"
                            : "purple"
                      }
                    >
                      {status}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </MotionCard>
  );
}

function AttendanceCard() {
  const chartsReady = useClientReady();

  return (
    <MotionCard delay={0.16} className="xl:col-span-4">
      <Card className="h-full p-5">
        <CardTitle>Student Attendance (Today)</CardTitle>
        <div className="mt-4 grid gap-4 sm:grid-cols-[170px_1fr] sm:items-center">
          <div className="relative h-[170px]">
            {chartsReady ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={attendanceData}
                    dataKey="value"
                    innerRadius={49}
                    outerRadius={70}
                    startAngle={90}
                    endAngle={-270}
                    paddingAngle={2}
                  >
                    {attendanceData.map((entry) => (
                      <Cell key={entry.name} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            ) : null}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-black text-[#081B4B]">81%</span>
              <span className="text-sm font-bold text-[#64748B]">Present</span>
            </div>
          </div>
          <div className="grid gap-4">
            {[
              ["Present", "3,456 (81%)", "#22C55E"],
              ["Absent", "602 (14%)", "#FF3366"],
              ["Leave", "200 (5%)", "#F97316"],
            ].map(([label, value, color]) => (
              <div key={label} className="flex items-center justify-between gap-4 text-sm">
                <span className="flex items-center gap-3 font-semibold text-[#081B4B]">
                  <span className="h-3 w-3 rounded-full" style={{ backgroundColor: color }} />
                  {label}
                </span>
                <span className="font-black text-[#081B4B]">{value}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-[#64748B]">Total Students</p>
            <p className="text-[26px] font-black leading-none text-[#081B4B]">4,258</p>
          </div>
          <Button variant="outline" className="h-10 border-[#FFC4D6] bg-[#FFF5F8] text-[#FF3366]">
            <BarChart3 className="h-4 w-4" />
            View Attendance Report
          </Button>
        </div>
      </Card>
    </MotionCard>
  );
}

function ProfileSummary() {
  const details = [
    ["Employee ID", "SC-ADM-001", ShieldCheck],
    ["Department", "Administration", Building2],
    ["Email", "admin@scinet.in", Mail],
    ["Contact", "9876543210", Phone],
    ["Joining Date", "01 Jan 2018", Calendar],
  ] as const;

  return (
    <MotionCard delay={0.2} className="xl:col-span-3">
      <div className="h-full rounded-[10px] bg-[linear-gradient(135deg,#252FA4_0%,#2A27B6_54%,#3A20C6_100%)] p-4 text-white shadow-[0_22px_55px_rgba(48,34,185,0.24)]">
        <h3 className="text-[13px] font-extrabold">Teacher / Profile Summary</h3>
        <div className="mt-4 flex items-center gap-3">
          <Image
            src={profileImage}
            alt="Admin profile"
            width={70}
            height={70}
            className="h-[70px] w-[70px] rounded-full border-2 border-white/80 object-cover"
          />
          <div>
            <p className="text-xl font-black leading-tight">Admin</p>
            <Badge className="mt-2 rounded-md border border-white/10 bg-[linear-gradient(90deg,#4B35C8_0%,#6739DF_100%)] px-2 py-1 text-[10px] font-semibold text-white shadow-[0_8px_18px_rgba(35,24,120,0.18)]">
              Super Administrator
            </Badge>
          </div>
        </div>
        <div className="mt-4 grid gap-2.5">
          {details.map(([label, value, Icon]) => (
            <div key={label} className="grid grid-cols-[18px_1fr_10px_1.2fr] items-center gap-2 text-[12px]">
              <Icon className="h-4 w-4 text-white/85" />
              <span className="font-semibold text-white/86">{label}</span>
              <span className="text-white/82">:</span>
              <span className="text-right font-bold">{value}</span>
            </div>
          ))}
        </div>
        <Button variant="outline" className="mt-4 h-8 w-full rounded-md border-0 bg-white text-xs text-[#3038B8] shadow-none hover:bg-white">
          View Full Profile
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </MotionCard>
  );
}

function StaffOverview() {
  const chartsReady = useClientReady();

  return (
    <MotionCard delay={0.18} className="xl:col-span-4">
      <Card className="h-full p-5">
        <CardHeader>
          <CardTitle>Staff Overview</CardTitle>
          <button className="text-sm font-extrabold text-[#FF3366]">View All</button>
        </CardHeader>
        <div className="mt-3 grid gap-4 sm:grid-cols-[170px_1fr] sm:items-center">
          <div className="relative h-[170px]">
            {chartsReady ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={staffData}
                    dataKey="value"
                    innerRadius={48}
                    outerRadius={69}
                    startAngle={90}
                    endAngle={-270}
                    paddingAngle={1}
                  >
                    {staffData.map((entry) => (
                      <Cell key={entry.name} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            ) : null}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-black">256</span>
              <span className="text-sm font-bold text-[#64748B]">Total Staff</span>
            </div>
          </div>
          <div className="grid gap-4">
            {staffData.map((item) => (
              <div key={item.name} className="flex items-center justify-between gap-4 text-sm">
                <span className="flex items-center gap-3 font-semibold text-[#081B4B]">
                  <span className="h-3 w-3 rounded-full" style={{ backgroundColor: item.color }} />
                  {item.name}
                </span>
                <span className="font-black">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </MotionCard>
  );
}

function ListCard({
  title,
  action,
  rows,
  icon,
  className,
  iconTone = "purple",
}: {
  title: string;
  action: string;
  rows: string[][];
  icon: LucideIcon;
  className?: string;
  iconTone?: "purple" | "pink";
}) {
  const Icon = icon;
  const toneClass =
    iconTone === "pink"
      ? "bg-[#FFEAF1] text-[#FF3366]"
      : "bg-[#F2ECFF] text-[#3A27C4]";

  return (
    <MotionCard delay={0.2} className={className}>
      <Card className="h-full p-4">
        <CardHeader>
          <CardTitle className="text-[15px]">{title}</CardTitle>
          <button className="text-[11px] font-extrabold text-[#FF3366]">{action}</button>
        </CardHeader>
        <div className="mt-3 grid gap-0">
          {rows.map(([label, date]) => (
            <div
              key={label}
              className="grid grid-cols-[30px_1fr_auto] items-center gap-3 border-b border-[#E6ECF5] py-2.5 last:border-b-0"
            >
              <span
                className={cn(
                  "flex h-7 w-7 items-center justify-center rounded-md",
                  toneClass,
                )}
              >
                <Icon className="h-[15px] w-[15px]" />
              </span>
              <p className="min-w-0 truncate text-[11px] font-medium text-[#081B4B]">{label}</p>
              <p className="whitespace-nowrap text-[10px] font-semibold text-[#526589]">{date}</p>
            </div>
          ))}
        </div>
      </Card>
    </MotionCard>
  );
}

function JobSummary() {
  return (
    <MotionCard delay={0.22} className="xl:col-span-4">
      <Card className="h-full p-4">
        <CardHeader>
          <CardTitle>Job Applications Summary</CardTitle>
          <button className="text-xs font-extrabold text-[#FF3366]">View All</button>
        </CardHeader>
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {jobs.map((job, index) => (
            <div
              key={job.label}
              className="flex min-h-[86px] flex-col items-center justify-center rounded-lg px-2 py-3 text-center transition hover:-translate-y-1"
              style={{ backgroundColor: job.bg }}
            >
              {index === 0 ? (
                <p className="text-2xl font-black leading-none" style={{ color: job.color }}>
                  {job.value}
                </p>
              ) : (
                <job.icon className="h-5 w-5" style={{ color: job.color }} />
              )}
              <p className="mt-2 text-xl font-black leading-none text-[#081B4B]">
                {job.value}
              </p>
              <p className="mt-1 text-[10px] font-semibold leading-tight text-[#081B4B]">
                {job.label}
              </p>
            </div>
          ))}
        </div>
      </Card>
    </MotionCard>
  );
}

function HolidayCalendar() {
  return (
    <MotionCard delay={0.24} className="xl:col-span-4">
      <Card className="h-full p-4">
        <CardHeader>
          <CardTitle>Holiday Calendar</CardTitle>
          <button className="text-xs font-extrabold text-[#FF3366]">View Calendar</button>
        </CardHeader>
        <div className="mt-4 grid gap-5 sm:grid-cols-[100px_1fr]">
          <div className="overflow-hidden rounded-lg border border-[#FF3366] text-center">
            <div className="bg-[#E91E72] py-2 text-xs font-black text-white">MAY</div>
            <div className="bg-white px-3 py-3">
              <p className="text-[40px] font-black leading-none text-[#081B4B]">20</p>
              <p className="text-sm font-bold text-[#081B4B]">Monday</p>
            </div>
          </div>
          <div className="grid gap-1">
            {holidays.map(([date, day, type]) => (
              <div key={date} className="grid grid-cols-[1fr_72px_1fr] gap-2 border-b border-[#E6ECF5] py-2 text-[11px] last:border-b-0">
                <span className="font-bold text-[#081B4B]">{date}</span>
                <span className="font-semibold text-[#64748B]">{day}</span>
                <span className={cn("text-right font-bold", type.includes("Holiday") ? "text-[#FF3366]" : "text-[#64748B]")}>
                  {type}
                </span>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </MotionCard>
  );
}

function AchievementCard() {
  return (
    <MotionCard delay={0.26} className="xl:col-span-4">
      <Card className="h-full p-4">
        <CardHeader>
          <CardTitle>My Achievements</CardTitle>
          <button className="text-xs font-extrabold text-[#FF3366]">View All</button>
        </CardHeader>
        <div className="mt-4 rounded-xl bg-gradient-to-br from-[#1B236E] via-[#3727D5] to-[#5E2EEB] px-4 py-4 text-white shadow-[0_16px_30px_rgba(57,39,216,0.24)]">
          <div className="grid grid-cols-[78px_1fr_18px] items-center gap-4">
            <div className="relative h-[70px] w-[70px] overflow-hidden">
              <Image
                src={achievementCup}
                alt="Achievement cup"
                width={120}
                height={120}
                className="absolute left-1/2 top-1/2 h-[118px] w-[118px] max-w-none -translate-x-1/2 -translate-y-[48%] object-cover drop-shadow-[0_10px_14px_rgba(0,0,0,0.24)]"
              />
            </div>
            <div>
              <p className="text-sm font-black">Excellent Performance Award</p>
              <p className="mt-1 text-[11px] leading-4 text-white/82">
                For outstanding contribution in academics 2023-24
              </p>
            </div>
            <ChevronRight className="h-5 w-5 text-white" />
          </div>
          <div className="mt-2 flex justify-center gap-3">
            <span className="h-2 w-2 rounded-full bg-white/45" />
            <span className="h-2 w-2 rounded-full bg-white" />
            <span className="h-2 w-2 rounded-full bg-white/45" />
          </div>
        </div>
      </Card>
    </MotionCard>
  );
}

function isTeacherMenuLabel(label: string): label is TeacherMenuLabel {
  return teacherMenuItems.some((item) => item.label === label);
}

function getLocalDateInputValue(date = new Date()) {
  const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60_000);
  return localDate.toISOString().slice(0, 10);
}

function formatTeacherDate(date = new Date()) {
  const weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const day = date.getDate();
  const suffix =
    day % 10 === 1 && day !== 11
      ? "st"
      : day % 10 === 2 && day !== 12
        ? "nd"
        : day % 10 === 3 && day !== 13
          ? "rd"
          : "th";

  return `${weekdays[date.getDay()]}, ${day}${suffix} ${months[date.getMonth()]}, ${date.getFullYear()}`;
}

function TeacherActionButton({ children }: { children: React.ReactNode }) {
  return (
    <button className="h-10 rounded-full border-2 border-[#0F9E99] bg-white px-5 text-xs font-bold uppercase leading-tight text-[#0B817C] shadow-none transition hover:-translate-y-0.5 hover:bg-[#E9FAF7] sm:px-6">
      {children}
    </button>
  );
}

function TeacherPageTitle({
  title,
  children,
}: {
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="border-b border-[#D8E2F0] pb-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[24px] font-light uppercase tracking-normal text-[#087D78]">
          {title}
        </h2>
        {children ? <div className="flex flex-wrap gap-2 sm:justify-end">{children}</div> : null}
      </div>
    </div>
  );
}

function TeacherDateNavigator() {
  return (
    <div className="grid grid-cols-[44px_1fr_44px] items-center bg-[linear-gradient(90deg,#EDFBEA_0%,#E8F8F5_45%,#EAF3FF_100%)] px-3 py-4 text-center">
      <button
        aria-label="Previous day"
        className="mx-auto flex h-8 w-8 items-center justify-center rounded-full border-2 border-[#13B5AE] text-[#13B5AE] transition hover:bg-[#E2F8F6]"
      >
        <ChevronRight className="h-4 w-4 rotate-180" />
      </button>
      <div>
        <p className="text-sm font-bold uppercase text-[#087D78]">Today</p>
        <p className="mt-2 text-sm text-[#334155]">{formatTeacherDate()}</p>
      </div>
      <button
        aria-label="Next day"
        className="mx-auto flex h-8 w-8 items-center justify-center rounded-full border-2 border-[#13B5AE] text-[#13B5AE] transition hover:bg-[#E2F8F6]"
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  );
}

function TeacherField({
  label,
  type = "text",
  defaultValue,
  select,
}: {
  label: string;
  type?: string;
  defaultValue?: string;
  select?: boolean;
}) {
  if (select) {
    return (
      <select
        aria-label={label}
        defaultValue=""
        className="h-10 w-full border border-[#CFD8E3] bg-white px-3 text-xs text-[#1E293B] outline-none focus:border-[#13B5AE] focus:ring-2 focus:ring-[#13B5AE]/15"
      >
        <option value="">{label}</option>
      </select>
    );
  }

  return (
    <input
      aria-label={label}
      type={type}
      defaultValue={defaultValue}
      className="h-10 w-full border border-[#CFD8E3] bg-white px-3 text-sm text-[#1E293B] outline-none focus:border-[#13B5AE] focus:ring-2 focus:ring-[#13B5AE]/15"
    />
  );
}

function TeacherTable({
  columns,
  filters,
  withDateNavigator = false,
}: {
  columns: string[];
  filters?: React.ReactNode[];
  withDateNavigator?: boolean;
}) {
  return (
    <Card className="overflow-hidden rounded-[6px] border-[#DDE5EC] bg-white shadow-none">
      {withDateNavigator ? <TeacherDateNavigator /> : null}
      <div className="overflow-x-auto thin-scrollbar">
        <table className="w-full min-w-[860px] border-collapse text-left text-sm">
          <thead>
            <tr className="bg-[linear-gradient(90deg,#129C96,#078B87)] text-white">
              {columns.map((column, index) => (
                <th
                  key={`${column}-${index}`}
                  className={cn(
                    "border-r border-white/70 px-5 py-4 font-medium last:border-r-0",
                    index === 0 && "w-[74px] text-center",
                  )}
                >
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          {filters ? (
            <tbody>
              <tr className="bg-[#F6F8F9]">
                {columns.map((column, index) => (
                  <td
                    key={`${column}-filter-${index}`}
                    className="border-r border-white/60 px-3 py-3 last:border-r-0"
                  >
                    {filters[index] ?? null}
                  </td>
                ))}
              </tr>
              <tr>
                <td colSpan={columns.length} className="px-3 py-5 text-[#081B4B]">
                  No results found.
                </td>
              </tr>
            </tbody>
          ) : (
            <tbody>
              <tr>
                <td colSpan={columns.length} className="px-3 py-5 text-[#081B4B]">
                  No results found.
                </td>
              </tr>
            </tbody>
          )}
        </table>
      </div>
    </Card>
  );
}

function HomeWorksSection() {
  return (
    <div className="grid gap-7">
      <TeacherPageTitle title="Home Works" />
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="sm:flex-1">
          <TeacherField label="Homework date" type="date" defaultValue={getLocalDateInputValue()} />
        </div>
        <TeacherActionButton>Create an Assignment</TeacherActionButton>
      </div>
      <TeacherTable
        withDateNavigator
        columns={["#", "Class", "Subject", "Title", "Attachment", "Start Date", "End Date", ""]}
        filters={[
          null,
          <TeacherField key="class" label="Select Class" select />,
          <TeacherField key="subject" label="Subject" />,
          <TeacherField key="title" label="Title" />,
        ]}
      />
    </div>
  );
}

function DiaryRemarksSection() {
  return (
    <div className="grid gap-7">
      <TeacherPageTitle title="Diary Remarks">
        <TeacherActionButton>Create a New Remark</TeacherActionButton>
      </TeacherPageTitle>
      <TeacherTable
        withDateNavigator
        columns={["#", "Class", "Category", "Message", "Attachment", "Added On", ""]}
        filters={[
          null,
          <TeacherField key="class" label="Select Class" select />,
          <TeacherField key="category" label="Select Category" select />,
          <TeacherField key="message" label="Message" />,
        ]}
      />
    </div>
  );
}

function TimeTableSection() {
  return (
    <div className="grid gap-5">
      <TeacherPageTitle title="Time Tables" />
      <TeacherTable
        columns={["#", "Time", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]}
      />
    </div>
  );
}

function AnnouncementSection() {
  return (
    <div className="grid gap-7">
      <TeacherPageTitle title="Announcements">
        <select
          aria-label="Announcement type"
          defaultValue=""
          className="h-[34px] min-w-[232px] rounded-[4px] border border-[#CFD8E3] bg-[#F6F8F9] px-3 text-sm text-[#334155] outline-none focus:border-[#13B5AE] focus:ring-2 focus:ring-[#13B5AE]/15"
        >
          <option value="">Select Announcement type...</option>
          <option value="school">School</option>
          <option value="class">Class</option>
          <option value="student">Student</option>
        </select>
        <TeacherField label="Announcement date" type="date" defaultValue={getLocalDateInputValue()} />
      </TeacherPageTitle>
      <div className="flex min-h-[190px] items-start justify-center pt-7">
        <p className="text-center font-serif text-[28px] text-[#087D78] sm:text-[30px]">
          Please select Announcement type
        </p>
      </div>
    </div>
  );
}

function AchievementsSection() {
  return (
    <div className="grid gap-7">
      <TeacherPageTitle title="My Achievements">
        <TeacherActionButton>Create Achievement</TeacherActionButton>
      </TeacherPageTitle>
      <TeacherTable
        withDateNavigator
        columns={[
          "#",
          "Achievement",
          "Description",
          "School-Class",
          "Student",
          "Achieved Date",
          "Attachment",
          "Added On",
          "",
        ]}
      />
    </div>
  );
}

function TeacherProfileSection() {
  const rows = [
    ["Employee ID", "106080", ShieldCheck],
    ["Name", "VARIGANJI NAGARAJU", UserRound],
    ["Gender", "Male", UsersRound],
    ["Date Of Birth", "-", Calendar],
    ["Email ID", "-", Mail],
    ["Schools", "Ashoknagar", Building2],
    ["Classes", "-", GraduationCap],
    ["Subjects", "-", FileBarChart],
  ] as const;

  return (
    <div className="grid gap-7">
      <TeacherPageTitle title="Profile" />
      <div className="grid min-h-[470px] gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="grid gap-0">
          {rows.map(([label, value, Icon]) => (
            <div
              key={label}
              className="grid grid-cols-[48px_minmax(112px,180px)_20px_1fr] items-center gap-4 border-b border-[#DDE9E7] py-4 text-[#081B4B] last:border-b-0 max-sm:grid-cols-[44px_1fr] max-sm:gap-x-3 max-sm:gap-y-1"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-[8px] bg-[#E2F8F6] text-[#13B5AE]">
                <Icon className="h-5 w-5" />
              </span>
              <span className="text-sm font-extrabold max-sm:text-base">{label}</span>
              <span className="text-sm font-bold max-sm:hidden">:</span>
              <span className="text-sm font-medium text-[#334155] max-sm:col-start-2 max-sm:text-base">
                {value}
              </span>
            </div>
          ))}
        </div>

        <div className="flex flex-col items-center justify-between gap-8 lg:items-end">
          <button
            className="group relative h-[210px] w-[210px] overflow-hidden rounded-full border-[6px] border-white bg-[#E2F8F6] shadow-[0_12px_32px_rgba(19,181,174,0.18)] transition hover:-translate-y-1 sm:h-[238px] sm:w-[238px]"
            aria-label="Update profile image"
          >
            <Image
              src={profileImage}
              alt="Teacher profile"
              width={260}
              height={260}
              className="h-full w-full object-cover"
              priority
            />
            <span className="absolute inset-x-0 bottom-0 flex items-center justify-center gap-2 bg-[#087D78]/82 px-4 py-4 text-xs font-extrabold uppercase text-white backdrop-blur-sm transition group-hover:bg-[#13B5AE]/90">
              <ImageIcon className="h-4 w-4" />
              Update Image
            </span>
          </button>
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row lg:justify-end">
            <Button
              variant="outline"
              className="h-12 rounded-[8px] border-2 border-[#13B5AE] bg-white px-6 text-xs uppercase italic text-[#087D78] shadow-none hover:bg-[#E2F8F6]"
            >
              <ShieldCheck className="h-4 w-4" />
              Reset Password
            </Button>
            <Button className="h-12 rounded-[8px] bg-[linear-gradient(90deg,#0FBAB3,#3CC9B7)] px-6 text-xs uppercase italic text-white shadow-[0_12px_24px_rgba(19,181,174,0.20)] hover:-translate-y-0.5">
              <ImageIcon className="h-4 w-4" />
              Update Profile
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function teacherUpdateToneClasses(tone: (typeof teacherLatestUpdates)[number]["tone"]) {
  if (tone === "yellow") {
    return {
      icon: "bg-[#FFF4D3] text-[#F59E0B]",
      badge: "bg-[#FFF4D3] text-[#C57900]",
    };
  }

  if (tone === "purple") {
    return {
      icon: "bg-[#F0E6FF] text-[#6E3BBE]",
      badge: "bg-[#F0E6FF] text-[#6E3BBE]",
    };
  }

  return {
    icon: "bg-[#E2F8F6] text-[#087D78]",
    badge: "bg-[#E8F8E3] text-[#087D38]",
  };
}

function TeacherQuickSummary({
  onSelect,
}: {
  onSelect: (section: TeacherMenuLabel) => void;
}) {
  return (
    <div className="mb-5 grid gap-4">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {teacherQuickSummaryCards.map((item, index) => (
          <MotionCard key={item.label} delay={0.04 + index * 0.03}>
            <button
              onClick={() => onSelect(item.section)}
              className="relative h-full min-h-[108px] w-full overflow-hidden rounded-[12px] border border-[#E3E9F0] bg-white p-5 text-left shadow-[0_10px_26px_rgba(15,40,80,0.10)] transition hover:-translate-y-1 hover:border-[#D7E2EC] hover:shadow-[0_14px_30px_rgba(15,40,80,0.13)]"
            >
              <span className={cn("pointer-events-none absolute -bottom-8 right-[-6%] h-20 w-[72%] rounded-[100%_0_0_0] opacity-70 blur-[1px]", item.soft)} />
              <span className={cn("pointer-events-none absolute -bottom-12 right-[16%] h-20 w-[60%] rounded-[100%_100%_0_0] opacity-45", item.soft)} />
              <div className="relative flex items-center gap-5">
                <IconTile icon={item.icon} className={`bg-gradient-to-br ${item.gradient}`} />
                <div className="min-w-0">
                  <p className="truncate text-sm font-extrabold text-[#081B4B]">{item.label}</p>
                  <div className="mt-2 flex items-end gap-2">
                    <p className="text-[30px] font-black leading-none text-[#081B4B]">
                      {item.value}
                    </p>
                    <p className="pb-1 text-xs font-semibold text-[#64748B]">{item.note}</p>
                  </div>
                </div>
              </div>
            </button>
          </MotionCard>
        ))}
      </div>

      <Card className="rounded-[18px] border-[#DDE9E7] bg-white p-4 shadow-[0_12px_32px_rgba(15,40,80,0.07)]">
        <CardHeader>
          <CardTitle>Latest Information</CardTitle>
          <span className="text-xs font-bold uppercase text-[#087D78]">
            {formatTeacherDate()}
          </span>
        </CardHeader>
        <div className="mt-3 grid gap-2 md:grid-cols-3">
          {teacherLatestUpdates.map((item) => {
            const tone = teacherUpdateToneClasses(item.tone);

            return (
              <button
                key={item.title}
                onClick={() => onSelect(item.section)}
                className="grid grid-cols-[36px_1fr] gap-3 rounded-[14px] border border-[#DDE9E7] bg-[#F8FAFB] p-3 text-left transition hover:border-[#13B5AE]/45 hover:bg-white"
              >
                <span className={cn("flex h-9 w-9 items-center justify-center rounded-lg", tone.icon)}>
                  <item.icon className="h-5 w-5" />
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-sm font-extrabold text-[#081B4B]">
                    {item.title}
                  </span>
                  <span className="mt-1 block text-xs leading-5 text-[#64748B]">
                    {item.detail}
                  </span>
                  <span className={cn("mt-2 inline-flex rounded-md px-2 py-1 text-[10px] font-black uppercase", tone.badge)}>
                    {item.meta}
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </Card>
    </div>
  );
}

function TeacherDashboard({
  activeSection,
  onSelect,
}: {
  activeSection: TeacherMenuLabel;
  onSelect: (section: TeacherMenuLabel) => void;
}) {
  const showQuickSummary = activeSection !== "PROFILE";

  return (
    <div className="mt-6">
      {showQuickSummary ? <TeacherQuickSummary onSelect={onSelect} /> : null}
      <div className="rounded-[8px] border border-[#DDE9E7] bg-white p-5 shadow-[0_10px_26px_rgba(15,40,80,0.08)] sm:p-7 lg:p-8">
        {activeSection === "HOME WORKS" ? <HomeWorksSection /> : null}
        {activeSection === "DIARY REMARKS" ? <DiaryRemarksSection /> : null}
        {activeSection === "TIME TABLE" ? <TimeTableSection /> : null}
        {activeSection === "ANNOUNCEMENT" ? <AnnouncementSection /> : null}
        {activeSection === "MY ACHIEVEMENTS" ? <AchievementsSection /> : null}
        {activeSection === "PROFILE" ? <TeacherProfileSection /> : null}
      </div>
    </div>
  );
}

function MissingRoleScreen() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#F6F8FC] p-4 font-sans text-[#081B4B]">
      <Card className="w-full max-w-[460px] p-7 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-[14px] bg-[#EEF4FF] text-[#2563EB]">
          <ShieldCheck className="h-7 w-7" />
        </div>
        <h1 className="mt-5 text-2xl font-black">Role Not Assigned</h1>
        <p className="mt-3 text-sm leading-6 text-[#64748B]">
          Please login with a valid Admin, Principal, or Teacher role to view the dashboard.
        </p>
      </Card>
    </main>
  );
}

export default function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTeacherSection, setActiveTeacherSection] =
    useState<TeacherMenuLabel>(defaultTeacherSection);
  const role = useLoggedInRole();
  const isTeacher = role === "Teacher";

  if (!role) {
    return <MissingRoleScreen />;
  }

  return (
    <main className={cn("min-h-screen font-sans text-[#081B4B]", isTeacher ? "bg-[#F8FAFB]" : "bg-[#F6F8FC]")}>
      <button
        aria-label="Close sidebar overlay"
        onClick={() => setIsSidebarOpen(false)}
        className={cn(
          "fixed inset-0 z-40 bg-[#06143A]/55 backdrop-blur-sm transition-opacity duration-300 lg:hidden",
          isSidebarOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0",
        )}
      />
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        items={isTeacher ? teacherMenuItems : menuItems}
        activeLabel={isTeacher ? activeTeacherSection : "Dashboard"}
        onSelect={(label) => {
          if (isTeacherMenuLabel(label)) {
            setActiveTeacherSection(label);
          }
        }}
        profileName={isTeacher ? "Teacher" : "Admin"}
        profileBadge={isTeacher ? "Teacher" : "Super Administrator"}
        isTeacherTheme={isTeacher}
      />
      <section className="min-h-screen p-4 sm:p-5 lg:pl-[284px] lg:pr-4 lg:pt-4">
        <Header
          onMenuClick={() => setIsSidebarOpen(true)}
          title={isTeacher ? "Welcome back, Teacher!" : undefined}
          subtitle={isTeacher ? "Manage your homework, remarks, timetable, and profile." : undefined}
          isTeacherTheme={isTeacher}
        />

        {isTeacher ? (
          <TeacherDashboard
            activeSection={activeTeacherSection}
            onSelect={setActiveTeacherSection}
          />
        ) : (
          <>
            <motion.div
              initial="hidden"
              animate="visible"
              className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-5"
            >
              {summaryCards.map((card, index) => (
                <SummaryCard key={card.label} card={card} index={index} />
              ))}
            </motion.div>

            <div className="mt-4 grid grid-cols-1 gap-3 xl:grid-cols-12">
              <TimetableCard />
              <AttendanceCard />
              <ProfileSummary />
            </div>

            <div className="mt-4 grid grid-cols-1 gap-3 xl:grid-cols-12">
              <StaffOverview />
              <ListCard title="School Notices" action="View All" rows={notices} icon={Megaphone} iconTone="purple" className="xl:col-span-4" />
              <ListCard title="Upcoming Exams" action="View All" rows={exams} icon={CalendarDays} iconTone="pink" className="xl:col-span-4" />
            </div>

            <div className="mt-4 grid grid-cols-1 gap-3 xl:grid-cols-12">
              <JobSummary />
              <HolidayCalendar />
              <AchievementCard />
            </div>
          </>
        )}

      </section>
    </main>
  );
}
