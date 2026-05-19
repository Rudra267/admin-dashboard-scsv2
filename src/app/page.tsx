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
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  return (
    <aside
      className={cn(
        "fixed inset-y-0 left-0 z-50 flex w-[252px] max-w-[calc(100vw-2rem)] flex-col gap-[13px] overflow-y-auto bg-gradient-to-b from-[#0B1558] via-[#0A1552] to-[#06143A] p-[14px] text-white shadow-[18px_0_45px_rgba(8,27,75,0.18)] transition-transform duration-300 lg:z-30 lg:translate-x-0 lg:rounded-r-[16px]",
        isOpen ? "translate-x-0" : "-translate-x-full",
      )}
    >
      <button
        aria-label="Close sidebar"
        onClick={onClose}
        className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/12 text-white backdrop-blur transition hover:bg-white/20 lg:hidden"
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
          <p className="truncate text-[18px] font-black text-[#0B55D9]">
            Sri Chaitanya
          </p>
          <p className="truncate text-[10px] font-extrabold text-[#EF2A2A]">
            Educational Institutions
          </p>
        </div>
      </div>

      <div className="relative mt-[48px] rounded-[12px] border border-white/14 bg-white/[0.055] px-4 pb-4 pt-[42px] text-center shadow-inner shadow-white/5">
        <Image
          src={profileImage}
          alt="Admin profile"
          width={92}
          height={92}
          className="absolute left-1/2 top-0 h-[84px] w-[84px] -translate-x-1/2 -translate-y-1/2 rounded-full border-[3px] border-white object-cover shadow-[0_12px_32px_rgba(255,255,255,0.16)]"
        />
        <h2 className="text-[21px] font-extrabold leading-tight">Admin</h2>
        <Badge className="mt-2 rounded-md bg-gradient-to-r from-[#FF2E7A] via-[#D91B8C] to-[#5B2BE8] px-3 py-1 text-[11px] text-white">
          Super Administrator
        </Badge>
      </div>

      <nav className="grid gap-[3px]">
        {menuItems.map((item) => (
          <button
            key={item.label}
            onClick={onClose}
            className={cn(
              "group flex h-[41px] items-center gap-3 rounded-[11px] px-4 text-left text-[13px] font-semibold text-white/88 transition-all duration-200 hover:translate-x-1 hover:bg-white/10",
              item.active &&
                "bg-gradient-to-r from-[#FF3366] to-[#D91B8C] text-white shadow-[0_14px_24px_rgba(255,51,102,0.26)]",
            )}
          >
            <item.icon className="h-[18px] w-[18px] shrink-0" />
            <span className="truncate">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="mt-auto rounded-[14px] bg-gradient-to-br from-[#3927D8] via-[#6D28D9] to-[#A855F7] p-4 shadow-[0_18px_40px_rgba(109,40,217,0.32)]">
        <div className="mb-3 flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/18">
            <Headphones className="h-4 w-4" />
          </div>
          <p className="text-sm font-extrabold">Need Help?</p>
        </div>
        <p className="mb-4 text-xs leading-5 text-white/86">
          We&apos;re here to help you manage everything smoothly.
        </p>
        <Button variant="outline" className="h-8 w-full rounded-md border-0 bg-white text-[11px] text-[#081B4B] shadow-none hover:bg-white">
          <Headphones className="h-3.5 w-3.5" />
          Contact Support
        </Button>
      </div>
    </aside>
  );
}

function Header({ onMenuClick }: { onMenuClick: () => void }) {
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
            Welcome back, Admin!{" "}
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
            Here&apos;s what&apos;s happening in your dashboard today.
          </p>
        </div>
      </div>

      <div className="flex min-w-0 items-center gap-3 lg:shrink-0">
        <div className="hidden h-11 min-w-0 items-center gap-3 rounded-xl border border-[#E6ECF5] bg-white px-4 shadow-[0_12px_30px_rgba(8,27,75,0.05)] sm:w-[266px] lg:flex">
          <Search className="h-5 w-5 shrink-0 text-[#8DA0C0]" />
          <input
            aria-label="Search"
            className="min-w-0 flex-1 bg-transparent text-sm font-semibold text-[#081B4B] outline-none placeholder:text-[#8DA0C0]"
            placeholder="Search anything..."
          />
          <RefreshCw className="h-4 w-4 shrink-0 text-[#2563EB]" />
        </div>
        <button
          aria-label="Notifications"
          className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#E6ECF5] bg-white text-[#081B4B] shadow-[0_12px_30px_rgba(8,27,75,0.05)] transition hover:-translate-y-0.5"
        >
          <Bell className="h-5 w-5" />
          <span className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-[#FF3366] text-xs font-black text-white">
            7
          </span>
        </button>
        <button className="flex h-11 min-w-0 items-center gap-2 rounded-xl border border-[#FFD3E0] bg-[#FFF3F7] px-3 text-xs font-extrabold text-[#081B4B] shadow-[0_12px_30px_rgba(236,72,153,0.08)] transition hover:-translate-y-0.5 sm:gap-3 sm:px-4 sm:text-sm">
          <Calendar className="h-5 w-5 shrink-0 text-[#2563EB]" />
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

export default function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <main className="min-h-screen bg-[#F6F8FC] font-sans text-[#081B4B]">
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
      />
      <section className="min-h-screen p-4 sm:p-5 lg:pl-[284px] lg:pr-4 lg:pt-4">
        <Header onMenuClick={() => setIsSidebarOpen(true)} />

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

      </section>
    </main>
  );
}
