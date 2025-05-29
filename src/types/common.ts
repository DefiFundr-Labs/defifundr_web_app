import type { JSX } from "react";

export interface SidebarLinkProps {
  to: string;
  icon: JSX.Element;

  name: string;
  toggleSidebar: () => void;
}
export interface SidebarRoute {
  name: string;
  icon: JSX.Element;

  path: string;
}
export interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}
