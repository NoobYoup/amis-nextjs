'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import {
    Box,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Collapse,
    IconButton,
    Divider,
    Button,
    useMediaQuery,
    useTheme,
} from '@mui/material';
import {
    Menu as MenuIcon,
    Close as CloseIcon,
    ExpandLess,
    ExpandMore,
    Logout as LogoutIcon,
    Dashboard as DashboardIcon,
    EventNote as EventNoteIcon,
    AttachMoney as AttachMoneyIcon,
    Info as InfoIcon,
    AttachFile as AttachFileIcon,
} from '@mui/icons-material';
import { SidebarMenuItem } from '@/types/sidebar';
import Link from 'next/link';

const SIDEBAR_WIDTH = 280;
const SIDEBAR_COLLAPSED_WIDTH = 80;

const menuItems: SidebarMenuItem[] = [
    {
        id: 'activities',
        label: 'Hoạt động',
        icon: EventNoteIcon,
        subItems: [
            { id: 'activities-list', label: 'Danh sách hoạt động', href: '/admin/activities' },
            { id: 'activities-add', label: 'Thêm hoạt động', href: '/admin/activities/add' },
        ],
    },
    {
        id: 'tuition',
        label: 'Học phí',
        icon: AttachMoneyIcon,
        subItems: [
            { id: 'tuition-list', label: 'Danh sách học phí', href: '/admin/tuition' },
            { id: 'tuition-add', label: 'Thêm học phí', href: '/admin/tuition/add' },
        ],
    },
    {
        id: 'info',
        label: 'Thông tin',
        icon: InfoIcon,
        subItems: [
            { id: 'info-school', label: 'Thông tin trường', href: '/admin/info/school' },
            { id: 'info-settings', label: 'Cài đặt', href: '/admin/info/settings' },
        ],
    },
    {
        id: 'documents',
        label: 'Tài liệu',
        icon: AttachFileIcon,
        subItems: [
            { id: 'documents-list', label: 'Danh sách tài liệu', href: '/admin/documents' },
            { id: 'documents-add', label: 'Thêm tài liệu', href: '/admin/documents/add' },
        ],
    },
];

interface SidebarProps {
    onLogout?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onLogout }) => {
    const [isOpen, setIsOpen] = useState(true);
    const [expandedItems, setExpandedItems] = useState<string[]>([]);
    const [mobileOpen, setMobileOpen] = useState(false);
    const pathname = usePathname();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const toggleCollapse = useCallback(() => {
        setIsOpen(!isOpen);
    }, [isOpen]);

    const toggleSubMenu = useCallback((itemId: string) => {
        setExpandedItems((prev) => (prev.includes(itemId) ? prev.filter((id) => id !== itemId) : [...prev, itemId]));
    }, []);

    const toggleMobileDrawer = useCallback(() => {
        setMobileOpen(!mobileOpen);
    }, [mobileOpen]);

    const isMenuItemActive = useCallback((href?: string) => {
        return href ? pathname === href || pathname.startsWith(href) : false;
    }, [pathname]);

    const isMenuItemExactActive = useCallback((href?: string) => {
        return href ? pathname === href : false;
    }, [pathname]);

    const isMenuItemOrSubItemActive = useCallback((item: SidebarMenuItem) => {
        if (item.href && isMenuItemActive(item.href)) return true;
        if (item.subItems) {
            return item.subItems.some((sub) => isMenuItemExactActive(sub.href));
        }
        return false;
    }, [isMenuItemActive, isMenuItemExactActive]);

    // Auto-expand main item if a sub-item is active
    useEffect(() => {
        const activeMainItem = menuItems.find(item =>
            item.subItems?.some(sub => pathname === sub.href)
        );
        if (activeMainItem && !expandedItems.includes(activeMainItem.id)) {
            setExpandedItems(prev => [...prev, activeMainItem.id]);
        }
    }, [pathname, expandedItems]);

    const sidebarContent = (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                backgroundColor: 'var(--secondary-color)',
                color: '#fff',
            }}
        >
            {/* Header */}
            <Box
                sx={{
                    padding: isOpen ? '20px 16px' : '20px 8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                }}
            >
                {isOpen && (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <DashboardIcon sx={{ fontSize: 28, color: 'var(--primary-color)' }} />
                        <Box>
                            <Box sx={{ fontSize: '16px', fontWeight: 'bold' }}>Admin</Box>
                            <Box sx={{ fontSize: '12px', opacity: 0.7 }}>Quản lý</Box>
                        </Box>
                    </Box>
                )}
                {!isMobile && (
                    <IconButton
                        onClick={toggleCollapse}
                        sx={{
                            color: '#fff',
                            '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' },
                        }}
                        aria-label={isOpen ? 'Thu gọn sidebar' : 'Mở rộng sidebar'}
                    >
                        {isOpen ? <MenuIcon /> : <MenuIcon />}
                    </IconButton>
                )}
            </Box>

            {/* Menu Items */}
            <List
                sx={{
                    flex: 1,
                    overflowY: 'auto',
                    padding: '8px 0',
                    '&::-webkit-scrollbar': {
                        width: '6px',
                    },
                    '&::-webkit-scrollbar-track': {
                        background: 'rgba(255, 255, 255, 0.05)',
                    },
                    '&::-webkit-scrollbar-thumb': {
                        background: 'rgba(255, 255, 255, 0.2)',
                        borderRadius: '3px',
                    },
                }}
            >
                {menuItems.map((item) => {
                    const isActive = isMenuItemOrSubItemActive(item);
                    const isExpanded = expandedItems.includes(item.id);
                    const Icon = item.icon;

                    return (
                        <React.Fragment key={item.id}>
                            <ListItem disablePadding>
                                <ListItemButton
                                    onClick={() => {
                                        if (item.subItems) {
                                            toggleSubMenu(item.id);
                                        }
                                    }}
                                    sx={{
                                        minHeight: 48,
                                        justifyContent: isOpen ? 'initial' : 'center',
                                        px: 2,
                                        backgroundColor: isActive ? 'rgba(124, 179, 66, 0.2)' : 'transparent',
                                        borderLeft: isActive
                                            ? '4px solid var(--primary-color)'
                                            : '4px solid transparent',
                                        color: isActive ? 'var(--primary-color)' : '#fff',
                                        transition: 'all 0.3s ease',
                                        '&:hover': {
                                            backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                        },
                                    }}
                                    aria-label={item.label}
                                    aria-expanded={item.subItems ? isExpanded : undefined}
                                >
                                    <ListItemIcon
                                        sx={{
                                            minWidth: 0,
                                            mr: isOpen ? 2 : 'auto',
                                            justifyContent: 'center',
                                            color: isActive ? 'var(--primary-color)' : '#fff',
                                        }}
                                    >
                                        <Icon />
                                    </ListItemIcon>
                                    {isOpen && (
                                        <>
                                            <ListItemText
                                                primary={item.label}
                                                sx={{
                                                    opacity: isOpen ? 1 : 0,
                                                    '& .MuiListItemText-primary': {
                                                        fontWeight: isActive ? 600 : 500,
                                                        fontSize: '14px',
                                                    },
                                                }}
                                            />
                                            {item.subItems && (
                                                <Box sx={{ ml: 'auto' }}>
                                                    {isExpanded ? <ExpandLess /> : <ExpandMore />}
                                                </Box>
                                            )}
                                        </>
                                    )}
                                </ListItemButton>
                            </ListItem>

                            {/* Sub Items */}
                            {item.subItems && isOpen && (
                                <Collapse in={isExpanded} timeout="auto" unmountOnExit>
                                    <List component="div" disablePadding>
                                        {item.subItems.map((subItem) => {
                                            const isSubActive = isMenuItemExactActive(subItem.href);
                                            return (
                                                <ListItem key={subItem.id} disablePadding>
                                                    <ListItemButton
                                                        href={subItem.href}
                                                        component="a"
                                                        sx={{
                                                            pl: 4,
                                                            minHeight: 40,
                                                            backgroundColor: isSubActive
                                                                ? 'rgba(124, 179, 66, 0.15)'
                                                                : 'transparent',
                                                            borderLeft: isSubActive
                                                                ? '3px solid var(--primary-color)'
                                                                : '3px solid transparent',
                                                            color: isSubActive ? 'var(--primary-color)' : '#fff',
                                                            fontSize: '13px',
                                                            transition: 'all 0.2s ease',
                                                            '&:hover': {
                                                                backgroundColor: 'rgba(255, 255, 255, 0.08)',
                                                            },
                                                        }}
                                                        aria-label={subItem.label}
                                                        aria-current={isSubActive ? 'page' : undefined}
                                                    >
                                                        <ListItemText primary={subItem.label}></ListItemText>
                                                    </ListItemButton>
                                                </ListItem>
                                            );
                                        })}
                                    </List>
                                </Collapse>
                            )}
                        </React.Fragment>
                    );
                })}
            </List>

            {/* Footer */}
            <Box
                sx={{
                    borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                    padding: '12px 8px',
                }}
            >
                <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<LogoutIcon />}
                    onClick={onLogout}
                    sx={{
                        color: '#fff',
                        borderColor: 'rgba(255, 255, 255, 0.3)',
                        justifyContent: isOpen ? 'flex-start' : 'center',
                        '&:hover': {
                            borderColor: '#fff',
                            backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        },
                    }}
                    aria-label="Đăng xuất"
                >
                    {isOpen && 'Đăng xuất'}
                </Button>
            </Box>
        </Box>
    );

    return (
        <>
            {/* Mobile Toggle Button */}
            {isMobile && (
                <IconButton
                    onClick={toggleMobileDrawer}
                    sx={{
                        position: 'fixed',
                        top: 16,
                        left: 16,
                        zIndex: 1300,
                        backgroundColor: 'var(--secondary-color)',
                        color: '#fff',
                        '&:hover': {
                            backgroundColor: 'var(--secondary-color)',
                            opacity: 0.9,
                        },
                    }}
                    aria-label="Mở menu"
                >
                    {mobileOpen ? <CloseIcon /> : <MenuIcon />}
                </IconButton>
            )}

            {/* Desktop Sidebar */}
            {!isMobile && (
                <Box
                    sx={{
                        width: isOpen ? SIDEBAR_WIDTH : SIDEBAR_COLLAPSED_WIDTH,
                        flexShrink: 0,
                        transition: 'width 0.3s ease',
                    }}
                >
                    {sidebarContent}
                </Box>
            )}

            {/* Mobile Drawer */}
            {isMobile && (
                <Drawer
                    anchor="left"
                    open={mobileOpen}
                    onClose={toggleMobileDrawer}
                    sx={{
                        '& .MuiDrawer-paper': {
                            width: SIDEBAR_WIDTH,
                        },
                    }}
                >
                    {sidebarContent}
                </Drawer>
            )}
        </>
    );
};

export default Sidebar;
