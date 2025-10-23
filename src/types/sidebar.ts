export interface SidebarMenuItem {
  id: string;
  label: string;
  icon: React.ComponentType<any>;
  href?: string;
  subItems?: SidebarSubItem[];
}

export interface SidebarSubItem {
  id: string;
  label: string;
  href: string;
}
