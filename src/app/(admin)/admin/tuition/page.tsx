'use client';

import React, { useState } from 'react';
import {
    Box,
    Container,
    Typography,
    Tabs,
    Tab,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Grid,
    Card,
    IconButton,
    Stack,
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, Add as AddIcon } from '@mui/icons-material';

interface TuitionData {
    id: number;
    grade: string;
    tuition: string;
    level: 'elementary' | 'middle';
}

interface DiscountPolicy {
    id: number;
    description: string;
    discount: string;
}

interface PaymentSchedule {
    id: number;
    period: string;
    date: string;
    months: string;
}

interface FeeItem {
    id: number;
    name: string;
    type: 'included' | 'notIncluded';
}

export default function TuitionPage() {
    const [tabValue, setTabValue] = useState(0);
    const [tuitionData, setTuitionData] = useState<TuitionData[]>([
        { id: 1, grade: 'Pre', tuition: '5,690,000', level: 'elementary' },
        { id: 2, grade: 'Lớp 1', tuition: '5,690,000', level: 'elementary' },
        { id: 3, grade: 'Lớp 2', tuition: '5,690,000', level: 'elementary' },
        { id: 4, grade: 'Lớp 3', tuition: '6,290,000', level: 'elementary' },
        { id: 5, grade: 'Lớp 4', tuition: '6,490,000', level: 'elementary' },
        { id: 6, grade: 'Lớp 5', tuition: '6,390,000', level: 'elementary' },
        { id: 7, grade: 'Lớp 6', tuition: '7,290,000', level: 'middle' },
        { id: 8, grade: 'Lớp 7', tuition: '7,590,000', level: 'middle' },
        { id: 9, grade: 'Lớp 8', tuition: '7,590,000', level: 'middle' },
        { id: 10, grade: 'Lớp 9', tuition: '7,690,000', level: 'middle' },
    ]);

    const [discounts, setDiscounts] = useState<DiscountPolicy[]>([
        { id: 1, description: 'Học sinh thứ 2 trong cùng gia đình', discount: 'Giảm 5%' },
        { id: 2, description: 'Học sinh thứ 3 trong cùng gia đình', discount: 'Giảm 10%' },
    ]);

    const [schedules, setSchedules] = useState<PaymentSchedule[]>([
        { id: 1, period: 'Đợt 1', date: '01/08/2025', months: '2 tháng' },
        { id: 2, period: 'Đợt 2', date: '01/10/2025', months: '3 tháng' },
        { id: 3, period: 'Đợt 3', date: '01/01/2026', months: '2 tháng' },
        { id: 4, period: 'Đợt 4', date: '01/03/2026', months: '3 tháng' },
    ]);

    const [fees, setFees] = useState<FeeItem[]>([
        { id: 1, name: 'Chi phí ăn sáng, ăn trưa và ăn xế', type: 'included' },
        { id: 2, name: 'Phí đồng phục', type: 'notIncluded' },
        { id: 3, name: 'Phí ngoại khóa', type: 'notIncluded' },
        { id: 4, name: 'Phí sách giáo khoa', type: 'notIncluded' },
        { id: 5, name: 'Phí cơ sở vật chất (2,990,000 đồng/năm)', type: 'notIncluded' },
    ]);

    const [openDialog, setOpenDialog] = useState(false);
    const [editingItem, setEditingItem] = useState<any>(null);
    const [dialogType, setDialogType] = useState<'tuition' | 'discount' | 'schedule' | 'fee'>('tuition');

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };

    const handleOpenDialog = (type: 'tuition' | 'discount' | 'schedule' | 'fee', item?: any) => {
        setDialogType(type);
        setEditingItem(item || null);
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setEditingItem(null);
    };

    const handleDeleteTuition = (id: number) => {
        setTuitionData(tuitionData.filter((item) => item.id !== id));
    };

    const handleDeleteDiscount = (id: number) => {
        setDiscounts(discounts.filter((item) => item.id !== id));
    };

    const handleDeleteSchedule = (id: number) => {
        setSchedules(schedules.filter((item) => item.id !== id));
    };

    const handleDeleteFee = (id: number) => {
        setFees(fees.filter((item) => item.id !== id));
    };

    return (
        <Box sx={{ py: 4, bgcolor: 'var(--background)', minHeight: '100vh' }}>
            <Container maxWidth="lg">
                <Typography variant="h4" sx={{ fontWeight: 700, mb: 4, color: 'var(--foreground)' }}>
                    Quản Lý Học Phí
                </Typography>

                {/* Tabs */}
                <Paper sx={{ mb: 4 }}>
                    <Tabs
                        value={tabValue}
                        onChange={handleTabChange}
                        sx={{
                            '& .MuiTab-root': {
                                fontWeight: 600,
                                fontSize: '1rem',
                            },
                            '& .Mui-selected': {
                                color: 'var(--primary-color) !important',
                            },
                            '& .MuiTabs-indicator': {
                                backgroundColor: 'var(--primary-color)',
                            },
                        }}
                    >
                        <Tab label="Học Phí Theo Lớp" />
                        <Tab label="Chính Sách Giảm Học Phí" />
                        <Tab label="Lịch Nộp Học Phí" />
                        <Tab label="Khoản Phí Khác" />
                    </Tabs>
                </Paper>

                {/* Tab 1: Tuition by Grade */}
                {tabValue === 0 && (
                    <Box>
                        <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                Danh Sách Học Phí
                            </Typography>
                            <Button
                                variant="contained"
                                startIcon={<AddIcon />}
                                onClick={() => handleOpenDialog('tuition')}
                                sx={{ bgcolor: 'var(--primary-color)' }}
                            >
                                Thêm Mới
                            </Button>
                        </Box>

                        <Grid container spacing={3}>
                            {['elementary', 'middle'].map((level) => (
                                <Grid item xs={12} key={level}>
                                    <Card>
                                        <Box sx={{ p: 3 }}>
                                            <Typography
                                                variant="h6"
                                                sx={{
                                                    fontWeight: 700,
                                                    color: 'var(--primary-color)',
                                                    mb: 2,
                                                }}
                                            >
                                                {level === 'elementary' ? 'Tiểu Học (Grade 1-5)' : 'Trung Học Cơ Sở (Grade 6-9)'}
                                            </Typography>
                                            <TableContainer>
                                                <Table>
                                                    <TableHead>
                                                        <TableRow sx={{ backgroundColor: 'var(--primary-color)' }}>
                                                            <TableCell sx={{ color: 'white', fontWeight: 700 }}>
                                                                Lớp / Grade
                                                            </TableCell>
                                                            <TableCell
                                                                sx={{ color: 'white', fontWeight: 700, textAlign: 'center' }}
                                                            >
                                                                Học Phí/Tháng (VND)
                                                            </TableCell>
                                                            <TableCell
                                                                sx={{ color: 'white', fontWeight: 700, textAlign: 'center' }}
                                                            >
                                                                Hành Động
                                                            </TableCell>
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                        {tuitionData
                                                            .filter((item) => item.level === level)
                                                            .map((row, index) => (
                                                                <TableRow
                                                                    key={row.id}
                                                                    sx={{
                                                                        backgroundColor: index % 2 === 0 ? '#f5f5f5' : 'white',
                                                                        '&:hover': {
                                                                            backgroundColor: 'rgba(124, 179, 66, 0.1)',
                                                                        },
                                                                    }}
                                                                >
                                                                    <TableCell sx={{ fontWeight: 600 }}>
                                                                        {row.grade}
                                                                    </TableCell>
                                                                    <TableCell
                                                                        sx={{
                                                                            fontWeight: 700,
                                                                            color: 'var(--primary-color)',
                                                                            textAlign: 'center',
                                                                        }}
                                                                    >
                                                                        {row.tuition}
                                                                    </TableCell>
                                                                    <TableCell sx={{ textAlign: 'center' }}>
                                                                        <IconButton
                                                                            size="small"
                                                                            onClick={() =>
                                                                                handleOpenDialog('tuition', row)
                                                                            }
                                                                            sx={{ color: 'var(--primary-color)' }}
                                                                        >
                                                                            <EditIcon />
                                                                        </IconButton>
                                                                        <IconButton
                                                                            size="small"
                                                                            onClick={() => handleDeleteTuition(row.id)}
                                                                            sx={{ color: '#d32f2f' }}
                                                                        >
                                                                            <DeleteIcon />
                                                                        </IconButton>
                                                                    </TableCell>
                                                                </TableRow>
                                                            ))}
                                                    </TableBody>
                                                </Table>
                                            </TableContainer>
                                        </Box>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                )}

                {/* Tab 2: Discount Policy */}
                {tabValue === 1 && (
                    <Box>
                        <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                Chính Sách Giảm Học Phí
                            </Typography>
                            <Button
                                variant="contained"
                                startIcon={<AddIcon />}
                                onClick={() => handleOpenDialog('discount')}
                                sx={{ bgcolor: 'var(--primary-color)' }}
                            >
                                Thêm Mới
                            </Button>
                        </Box>

                        <Card>
                            <TableContainer>
                                <Table>
                                    <TableHead>
                                        <TableRow sx={{ backgroundColor: 'var(--primary-color)' }}>
                                            <TableCell sx={{ color: 'white', fontWeight: 700 }}>
                                                Điều Kiện
                                            </TableCell>
                                            <TableCell sx={{ color: 'white', fontWeight: 700, textAlign: 'center' }}>
                                                Mức Giảm
                                            </TableCell>
                                            <TableCell sx={{ color: 'white', fontWeight: 700, textAlign: 'center' }}>
                                                Hành Động
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {discounts.map((row, index) => (
                                            <TableRow
                                                key={row.id}
                                                sx={{
                                                    backgroundColor: index % 2 === 0 ? '#f5f5f5' : 'white',
                                                    '&:hover': {
                                                        backgroundColor: 'rgba(124, 179, 66, 0.1)',
                                                    },
                                                }}
                                            >
                                                <TableCell sx={{ fontWeight: 500 }}>{row.description}</TableCell>
                                                <TableCell
                                                    sx={{
                                                        fontWeight: 700,
                                                        color: 'var(--primary-color)',
                                                        textAlign: 'center',
                                                    }}
                                                >
                                                    {row.discount}
                                                </TableCell>
                                                <TableCell sx={{ textAlign: 'center' }}>
                                                    <IconButton
                                                        size="small"
                                                        onClick={() => handleOpenDialog('discount', row)}
                                                        sx={{ color: 'var(--primary-color)' }}
                                                    >
                                                        <EditIcon />
                                                    </IconButton>
                                                    <IconButton
                                                        size="small"
                                                        onClick={() => handleDeleteDiscount(row.id)}
                                                        sx={{ color: '#d32f2f' }}
                                                    >
                                                        <DeleteIcon />
                                                    </IconButton>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Card>
                    </Box>
                )}

                {/* Tab 3: Payment Schedule */}
                {tabValue === 2 && (
                    <Box>
                        <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                Lịch Nộp Học Phí
                            </Typography>
                            <Button
                                variant="contained"
                                startIcon={<AddIcon />}
                                onClick={() => handleOpenDialog('schedule')}
                                sx={{ bgcolor: 'var(--primary-color)' }}
                            >
                                Thêm Mới
                            </Button>
                        </Box>

                        <Grid container spacing={2}>
                            {schedules.map((schedule) => (
                                <Grid item xs={12} sm={6} md={3} key={schedule.id}>
                                    <Card
                                        sx={{
                                            p: 3,
                                            textAlign: 'center',
                                            backgroundColor: 'rgba(124, 179, 66, 0.08)',
                                            border: '2px solid var(--primary-color)',
                                            borderRadius: 2,
                                        }}
                                    >
                                        <Typography
                                            sx={{
                                                fontWeight: 700,
                                                color: '#2e7d32',
                                                fontSize: '1.1rem',
                                                mb: 1,
                                            }}
                                        >
                                            {schedule.period}
                                        </Typography>
                                        <Typography sx={{ color: '#555', fontWeight: 600, mb: 2 }}>
                                            {schedule.date}
                                        </Typography>
                                        <Typography sx={{ color: 'var(--primary-color)', fontWeight: 700, mb: 2 }}>
                                            {schedule.months}
                                        </Typography>
                                        <Stack direction="row" spacing={1} justifyContent="center">
                                            <IconButton
                                                size="small"
                                                onClick={() => handleOpenDialog('schedule', schedule)}
                                                sx={{ color: 'var(--primary-color)' }}
                                            >
                                                <EditIcon />
                                            </IconButton>
                                            <IconButton
                                                size="small"
                                                onClick={() => handleDeleteSchedule(schedule.id)}
                                                sx={{ color: '#d32f2f' }}
                                            >
                                                <DeleteIcon />
                                            </IconButton>
                                        </Stack>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                )}

                {/* Tab 4: Other Fees */}
                {tabValue === 3 && (
                    <Box>
                        <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                Khoản Phí Khác
                            </Typography>
                            <Button
                                variant="contained"
                                startIcon={<AddIcon />}
                                onClick={() => handleOpenDialog('fee')}
                                sx={{ bgcolor: 'var(--primary-color)' }}
                            >
                                Thêm Mới
                            </Button>
                        </Box>

                        <Grid container spacing={3}>
                            {['included', 'notIncluded'].map((type) => (
                                <Grid item xs={12} md={6} key={type}>
                                    <Card>
                                        <Box sx={{ p: 3 }}>
                                            <Typography
                                                variant="h6"
                                                sx={{
                                                    fontWeight: 700,
                                                    color: 'var(--primary-color)',
                                                    mb: 2,
                                                }}
                                            >
                                                {type === 'included' ? '✓ Học Phí Bao Gồm' : '✗ Học Phí Chưa Bao Gồm'}
                                            </Typography>
                                            <Stack spacing={1}>
                                                {fees
                                                    .filter((fee) => fee.type === type)
                                                    .map((fee) => (
                                                        <Box
                                                            key={fee.id}
                                                            sx={{
                                                                display: 'flex',
                                                                justifyContent: 'space-between',
                                                                alignItems: 'center',
                                                                p: 1.5,
                                                                backgroundColor: '#f5f5f5',
                                                                borderRadius: 1,
                                                            }}
                                                        >
                                                            <Typography sx={{ fontWeight: 500 }}>
                                                                {fee.name}
                                                            </Typography>
                                                            <Stack direction="row" spacing={0.5}>
                                                                <IconButton
                                                                    size="small"
                                                                    onClick={() => handleOpenDialog('fee', fee)}
                                                                    sx={{ color: 'var(--primary-color)' }}
                                                                >
                                                                    <EditIcon fontSize="small" />
                                                                </IconButton>
                                                                <IconButton
                                                                    size="small"
                                                                    onClick={() => handleDeleteFee(fee.id)}
                                                                    sx={{ color: '#d32f2f' }}
                                                                >
                                                                    <DeleteIcon fontSize="small" />
                                                                </IconButton>
                                                            </Stack>
                                                        </Box>
                                                    ))}
                                            </Stack>
                                        </Box>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                )}
            </Container>

            {/* Dialog for Add/Edit */}
            <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
                <DialogTitle>
                    {editingItem ? 'Chỉnh Sửa' : 'Thêm Mới'} {dialogType === 'tuition' && 'Học Phí'}
                    {dialogType === 'discount' && 'Chính Sách Giảm'}
                    {dialogType === 'schedule' && 'Lịch Nộp'}
                    {dialogType === 'fee' && 'Khoản Phí'}
                </DialogTitle>
                <DialogContent sx={{ pt: 2 }}>
                    {dialogType === 'tuition' && (
                        <Stack spacing={2}>
                            <TextField
                                fullWidth
                                label="Lớp / Grade"
                                defaultValue={editingItem?.grade || ''}
                                placeholder="Lớp 1"
                            />
                            <TextField
                                fullWidth
                                label="Học Phí/Tháng (VND)"
                                defaultValue={editingItem?.tuition || ''}
                                placeholder="5,690,000"
                            />
                        </Stack>
                    )}
                    {dialogType === 'discount' && (
                        <Stack spacing={2}>
                            <TextField
                                fullWidth
                                label="Điều Kiện"
                                defaultValue={editingItem?.description || ''}
                                multiline
                                rows={2}
                            />
                            <TextField
                                fullWidth
                                label="Mức Giảm"
                                defaultValue={editingItem?.discount || ''}
                                placeholder="Giảm 5%"
                            />
                        </Stack>
                    )}
                    {dialogType === 'schedule' && (
                        <Stack spacing={2}>
                            <TextField
                                fullWidth
                                label="Đợt"
                                defaultValue={editingItem?.period || ''}
                                placeholder="Đợt 1"
                            />
                            <TextField
                                fullWidth
                                label="Ngày Nộp"
                                defaultValue={editingItem?.date || ''}
                                placeholder="01/08/2025"
                            />
                            <TextField
                                fullWidth
                                label="Số Tháng"
                                defaultValue={editingItem?.months || ''}
                                placeholder="2 tháng"
                            />
                        </Stack>
                    )}
                    {dialogType === 'fee' && (
                        <Stack spacing={2}>
                            <TextField
                                fullWidth
                                label="Tên Khoản Phí"
                                defaultValue={editingItem?.name || ''}
                                multiline
                                rows={2}
                            />
                        </Stack>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>Hủy</Button>
                    <Button variant="contained" sx={{ bgcolor: 'var(--primary-color)' }} onClick={handleCloseDialog}>
                        Lưu
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}
