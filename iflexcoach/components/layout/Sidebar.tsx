"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  LayoutDashboard,
  Dumbbell,       // Icono cambiado
  Salad,          // Icono cambiado
  BookOpen,
  Users,
  Star,
  Calendar,
  User,
  MessageSquare,
  Settings,
  X,              // Icono cambiado
} from "lucide-react";

// Logo colapsado (SVG exacto)
const LogoCollapsed = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9.51953 21.5H7.11953C6.01953 21.5 5.51953 21 5.51953 19.9V10.4C5.51953 9.3 6.01953 8.8 7.11953 8.8H10.5195C11.7195 8.8 12.6195 9.7 12.6195 10.9V13.6C12.6195 14.8 11.7195 15.7 10.5195 15.7H9.51953" stroke="var(--primary)" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M14.4805 2.5H16.8805C17.9805 2.5 18.4805 3 18.4805 4.1V13.6C18.4805 14.7 17.9805 15.2 16.8805 15.2H13.4805C12.2805 15.2 11.3805 14.3 11.3805 13.1V10.4C11.3805 9.2 12.2805 8.3 13.4805 8.3H14.4805" stroke="var(--foreground)" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// Menú Items
const menuItems = [
  { section: "Menu", items: [
    { href: "/home", label: "Dashboard", icon: LayoutDashboard },
    { href: "/home/training", label: "Training", icon: Dumbbell },
    { href: "/home/nutrition", label: "Nutrition", icon: Salad },
    { href: "/home/learning", label: "Learning", icon: BookOpen },
    { href: "/home/clients", label: "Clients", icon: Users },
    { href: "/home/coaches", label: "Assistant coaches", icon: Star },
    { href: "/home/calendar", label: "Calendar", icon: Calendar },
  ]},
  { section: "Account", items: [
    { href: "/home/user", label: "User", icon: User },
    { href: "/home/messages", label: "Messages", icon: MessageSquare },
    { href: "/home/settings", label: "Settings", icon: Settings },
  ]},
];

export function Sidebar() {
  const [isExpanded, setIsExpanded] = React.useState(false); // Empezar colapsado
  const pathname = usePathname();

  return (
    <aside
      // Usamos variables CSS para colores
      className={cn(
        "flex h-screen flex-col border-r bg-[--sidebar] border-[--sidebar-border] text-[--sidebar-foreground] transition-all duration-300 ease-in-out",
        isExpanded ? "w-60" : "w-[72px]"
      )}
    >
      {/* --- Header Expandido --- */}
      <div className={cn(
        "flex items-center justify-between pl-5 pr-3 h-[72px] border-b border-[--sidebar-border]",
        !isExpanded && "hidden"
      )}>
        <div className="flex items-center gap-3">
          <Avatar className="h-9 w-9">
             <AvatarImage src="/avatars/ric.png" alt="@Ric.Mayers" />
             <AvatarFallback className="bg-[--accent] text-[--accent-foreground] text-sm">RM</AvatarFallback>
          </Avatar>
          <span className="font-medium text-sm">@Ric.Mayers</span>
        </div>
        <Button variant="ghost" size="icon" onClick={() => setIsExpanded(false)} className="text-[--muted-foreground] hover:text-[--foreground]">
          <X className="w-5 h-5" />
        </Button>
      </div>

      {/* --- Header Colapsado --- */}
      <div className={cn(
        "flex items-center justify-center h-[72px] border-b border-[--sidebar-border]",
        isExpanded && "hidden"
      )}>
        <Button variant="ghost" size="icon" onClick={() => setIsExpanded(true)} className="hover:bg-[--sidebar-accent]">
          <LogoCollapsed />
        </Button>
      </div>

      {/* --- Navegación --- */}
      <nav className="flex-1 space-y-4 px-3 py-4 overflow-y-auto">
        {menuItems.map((section) => (
          <div key={section.section}>
            {isExpanded && (
              <h3 className="mb-2 px-2 text-[10px] font-semibold uppercase text-[--muted-foreground] tracking-wider">
                {section.section}
              </h3>
            )}
            <div className={cn("space-y-1", !isExpanded && "mt-2")}>
              {section.items.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    title={isExpanded ? "" : item.label}
                    className={cn(
                      "flex items-center gap-3 rounded-md px-3 h-10 text-[--muted-foreground] transition-colors",
                      !isExpanded && "justify-center",
                      isActive
                        ? "bg-[--sidebar-primary]/10 text-[--sidebar-primary]" // Activo usa --sidebar-primary
                        : "hover:bg-[--sidebar-accent] hover:text-[--foreground]" // Hover usa --sidebar-accent
                    )}
                  >
                    <item.icon className="w-5 h-5 flex-shrink-0" />
                    <span className={cn("font-medium text-sm truncate", !isExpanded && "sr-only")}>
                      {item.label}
                    </span>
                  </Link>
                );
              })}
            </div>
            {isExpanded && section.section === "Menu" && <hr className="my-4 border-[--sidebar-border]" />} {/* Separador solo después de Menu */}
          </div>
        ))}
      </nav>
    </aside>
  );
}