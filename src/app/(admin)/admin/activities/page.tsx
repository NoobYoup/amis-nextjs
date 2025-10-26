'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
    Box,
    Container,
    Typography,
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    TablePagination,
    TextField,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Stack,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Alert,
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, Add as AddIcon, Image as ImageIcon } from '@mui/icons-material';
import { Activity } from '@/types/activity';
import dayjs from 'dayjs';

const categories = ['Học thuật', 'Thể thao', 'Văn nghệ', 'Ngoại khóa'];

export default function ActivitiesPage() {
    const router = useRouter();
    const [activities, setActivities] = useState<Activity[]>([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const [error, setError] = useState('');

    useEffect(() => {
        loadActivities();
    }, [page, searchQuery, selectedCategory]);

    const loadActivities = async () => {
        try {
            const params = new URLSearchParams({
                search: searchQuery,
                category: selectedCategory,
                page: (page + 1).toString(),
            });
            const res = await fetch(`/api/admin/activities?${params}`);
            if (!res.ok) throw new Error('Error loading activities');
            const { data, total } = await res.json();

            setActivities(data);
            setTotal(total);
        } catch (err) {
            setError('Lỗi tải dữ liệu');
        }
    };

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
        setPage(0);
    };

    const handleCategoryChange = (e: any) => {
        setSelectedCategory(e.target.value);
        setPage(0);
    };

    const filteredActivities = useMemo(() => activities, [activities]);

    const handleOpenDeleteDialog = (id: number) => {
        setSelectedId(id);
        setDeleteDialogOpen(true);
    };

    const handleCloseDeleteDialog = () => {
        setDeleteDialogOpen(false);
        setSelectedId(null);
    };

    const handleConfirmDelete = async () => {
        if (!selectedId) return;
        try {
            const res = await fetch(`/api/admin/activities/${selectedId}`, { method: 'DELETE' });
            if (!res.ok) throw new Error('Error deleting');
            loadActivities(); // Refresh list
            handleCloseDeleteDialog();
        } catch (err) {
            setError('Lỗi xóa hoạt động');
        }
    };

    return (
        <Box sx={{ py: 4, bgcolor: 'var(--background)', minHeight: '100vh' }}>
            {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                    {error}
                </Alert>
            )}

            <Container maxWidth="xl">
                {/* Header */}
                <Box sx={{ mb: 4 }}>
                    <Typography variant="h4" sx={{ fontWeight: 700, color: 'var(--foreground)' }}>
                        Quản Lý Hoạt Động
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#666', mt: 1 }}>
                        Quản lý danh sách các hoạt động của trường
                    </Typography>
                </Box>

                {/* Filters */}
                <Paper sx={{ p: 3, mb: 4, borderRadius: 2 }}>
                    <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                        <TextField
                            fullWidth
                            label="Tìm kiếm theo tiêu đề hoặc tác giả"
                            value={searchQuery}
                            onChange={handleSearchChange}
                            InputProps={{
                                startAdornment: <ImageIcon sx={{ mr: 1, color: '#666' }} />,
                            }}
                        />
                        <FormControl fullWidth>
                            <InputLabel>Phân loại</InputLabel>
                            <Select value={selectedCategory} onChange={handleCategoryChange} label="Phân loại">
                                <MenuItem value="">Tất cả</MenuItem>
                                {categories.map((cat) => (
                                    <MenuItem key={cat} value={cat}>
                                        {cat}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <Button
                            variant="contained"
                            startIcon={<AddIcon />}
                            onClick={() => router.push('/admin/activities/add')}
                            sx={{ bgcolor: 'var(--primary-color)', minWidth: 180 }}
                        >
                            Thêm hoạt động
                        </Button>
                    </Stack>
                </Paper>

                {/* Table */}
                <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
                    <Table>
                        <TableHead sx={{ bgcolor: 'var(--primary-color)' }}>
                            <TableRow>
                                <TableCell sx={{ color: '#fff', fontWeight: 600 }}>Tiêu đề</TableCell>
                                <TableCell sx={{ color: '#fff', fontWeight: 600 }}>Phân loại</TableCell>
                                <TableCell sx={{ color: '#fff', fontWeight: 600 }}>Ngày</TableCell>
                                <TableCell sx={{ color: '#fff', fontWeight: 600 }}>Tác giả</TableCell>
                                <TableCell sx={{ color: '#fff', fontWeight: 600, textAlign: 'center' }}>
                                    Hành động
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredActivities.map((activity) => (
                                <TableRow key={activity._id} hover>
                                    <TableCell>{activity.title}</TableCell>
                                    <TableCell>{activity.category}</TableCell>
                                    <TableCell>{dayjs(activity.date).format('DD/MM/YYYY')}</TableCell>
                                    <TableCell>{activity.author}</TableCell>
                                    <TableCell sx={{ textAlign: 'center' }}>
                                        <IconButton
                                            size="small"
                                            onClick={() => router.push(`/admin/activities/update/${activity._id}`)}
                                            sx={{ color: 'var(--primary-color)' }}
                                        >
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton
                                            size="small"
                                            onClick={() => handleOpenDeleteDialog(activity._id)}
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

                {/* Pagination */}
                <TablePagination
                    rowsPerPageOptions={[10]}
                    component="div"
                    count={total}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    sx={{ bgcolor: '#fff', mt: 2, display: 'flex', justifyContent: 'center' }}
                />

                {/* Delete Dialog */}
                <Dialog open={deleteDialogOpen} onClose={handleCloseDeleteDialog}>
                    <DialogTitle>Xác nhận xóa</DialogTitle>
                    <DialogContent>
                        <Typography>Bạn có chắc chắn muốn xóa hoạt động này không?</Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleConfirmDelete} variant="contained" color="error">
                            Xóa
                        </Button>
                        <Button onClick={handleCloseDeleteDialog}>Hủy</Button>
                    </DialogActions>
                </Dialog>
            </Container>
        </Box>
    );
}
