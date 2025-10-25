'use client';

import React, { useState, useMemo } from 'react';
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
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, Add as AddIcon, Image as ImageIcon } from '@mui/icons-material';
import { Activity } from '@/types/activity';

const mockActivities: Activity[] = [
    {
        id: 1,
        title: 'Hội thảo Khoa học Quốc tế 2024',
        description: 'Học sinh AMIS tham gia hội thảo khoa học quốc tế với nhiều nghiên cứu xuất sắc',
        category: 'Học thuậ t',
        date: '2024-10-15',
        author: 'Nguyễn Văn A',
        thumbnail: '/images/hero_backround.jpg',
        images: ['/images/hero_backround.jpg', '/images/logo_amis.png'],
        videos: ['https://www.youtube.com/embed/dQw4w9WgXcQ', 'https://www.youtube.com/embed/dQw4w9WgXcQ'],
        createdAt: '2024-10-15T10:00:00Z',
        updatedAt: '2024-10-15T10:00:00Z',
    },
    {
        id: 2,
        title: 'Giải bóng đá liên trường 2024',
        description: 'Đội tuyển AMIS giành chức vô địch giải bóng đá liên trường khu vực',
        category: 'Thể thao',
        date: '2024-10-10',
        author: 'Trần Thị B',
        thumbnail: '/images/hero_backround.jpg',
        images: ['/images/hero_backround.jpg'],
        createdAt: '2024-10-10T10:00:00Z',
        updatedAt: '2024-10-10T10:00:00Z',
    },
    {
        id: 3,
        title: 'Đêm nhạc từ thiện',
        description: 'Chương trình văn nghệ gây quỹ ủng hộ học sinh vùng cao',
        category: 'Văn nghệ',
        date: '2024-10-05',
        author: 'Lê Văn C',
        thumbnail: '/images/hero_backround.jpg',
        images: ['/images/hero_backround.jpg'],
        createdAt: '2024-10-05T10:00:00Z',
        updatedAt: '2024-10-05T10:00:00Z',
    },
    {
        id: 4,
        title: 'Trại hè sáng tạo 2024',
        description: 'Học sinh tham gia các hoạt động ngoại khóa bổ ích trong kỳ nghỉ hè',
        category: 'Ngoại khóa',
        date: '2024-09-28',
        author: 'Phạm Thị D',
        thumbnail: '/images/hero_backround.jpg',
        images: ['/images/hero_backround.jpg'],
        createdAt: '2024-09-28T10:00:00Z',
        updatedAt: '2024-09-28T10:00:00Z',
    },
    {
        id: 5,
        title: 'Cuộc thi Olympic Toán học',
        description: 'Học sinh AMIS đạt giải nhất cuộc thi Olympic Toán học cấp quốc gia',
        category: 'Học thuậ t',
        date: '2024-09-20',
        author: 'Hoàng Văn E',
        thumbnail: '/images/hero_backround.jpg',
        images: ['/images/hero_backround.jpg'],
        createdAt: '2024-09-20T10:00:00Z',
        updatedAt: '2024-09-20T10:00:00Z',
    },
    {
        id: 6,
        title: 'Giải cầu lông học sinh',
        description: 'Đội tuyển cầu lông AMIS xuất sắc giành 3 huy chương vàng',
        category: 'Thể thao',
        date: '2024-09-15',
        author: 'Đỗ Thị F',
        thumbnail: '/images/hero_backround.jpg',
        images: ['/images/hero_backround.jpg'],
        createdAt: '2024-09-15T10:00:00Z',
        updatedAt: '2024-09-15T10:00:00Z',
    },
    {
        id: 7,
        title: 'Khóa học lập trình Python',
        description: 'Khóa học lập trình Python cho học sinh cấp 2',
        category: 'Học thuậ t',
        date: '2024-09-10',
        author: 'Nguyễn Thị G',
        thumbnail: '/images/hero_backround.jpg',
        images: ['/images/hero_backround.jpg'],
        createdAt: '2024-09-10T10:00:00Z',
        updatedAt: '2024-09-10T10:00:00Z',
    },
    {
        id: 8,
        title: 'Giải bánh mỏ toàn trường',
        description: 'Giải bánh mỏ toàn trường với sự tham gia của 500+ học sinh',
        category: 'Thể thao',
        date: '2024-09-05',
        author: 'Trần Văn H',
        thumbnail: '/images/hero_backround.jpg',
        images: ['/images/hero_backround.jpg'],
        createdAt: '2024-09-05T10:00:00Z',
        updatedAt: '2024-09-05T10:00:00Z',
    },
    {
        id: 9,
        title: 'Hội họa mỏ cửa học sinh',
        description: 'Hội họa mỏ cửa học sinh với nhiều tác phẩm đẹp mắt',
        category: 'Văn nghệ',
        date: '2024-08-30',
        author: 'Lê Thị I',
        thumbnail: '/images/hero_backround.jpg',
        images: ['/images/hero_backround.jpg'],
        createdAt: '2024-08-30T10:00:00Z',
        updatedAt: '2024-08-30T10:00:00Z',
    },
    {
        id: 10,
        title: 'Chuyến tham quan bảo tàng lịch sử',
        description: 'Chuyến tham quan bảo tàng lịch sử Việt Nam của học sinh khối 10',
        category: 'Ngoại khóa',
        date: '2024-08-25',
        author: 'Phạm Văn J',
        thumbnail: '/images/hero_backround.jpg',
        images: ['/images/hero_backround.jpg'],
        createdAt: '2024-08-25T10:00:00Z',
        updatedAt: '2024-08-25T10:00:00Z',
    },
    {
        id: 11,
        title: 'Khóa học tiếng Anh quốc tế',
        description: 'Khóa học tiếng Anh quốc tế IELTS cho học sinh',
        category: 'Học thuậ t',
        date: '2024-08-20',
        author: 'Đỗ Thị K',
        thumbnail: '/images/hero_backround.jpg',
        images: ['/images/hero_backround.jpg'],
        createdAt: '2024-08-20T10:00:00Z',
        updatedAt: '2024-08-20T10:00:00Z',
    },
];

const categories = ['Tất cả', 'Học thuậ t', 'Thể thao', 'Văn nghệ', 'Ngoại khóa'];

export default function ActivitiesPage() {
    const router = useRouter();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('Tất cả');
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [selectedActivityId, setSelectedActivityId] = useState<number | null>(null);
    const [activities, setActivities] = useState<Activity[]>(mockActivities);

    const filteredActivities = useMemo(() => {
        return activities.filter((activity) => {
            const matchesSearch =
                activity.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                activity.author.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesCategory = selectedCategory === 'Tất cả' || activity.category === selectedCategory;
            return matchesSearch && matchesCategory;
        });
    }, [activities, searchTerm, selectedCategory]);

    const paginatedActivities = useMemo(() => {
        return filteredActivities.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
    }, [filteredActivities, page, rowsPerPage]);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleOpenDeleteDialog = (id: number) => {
        setSelectedActivityId(id);
        setDeleteDialogOpen(true);
    };

    const handleCloseDeleteDialog = () => {
        setDeleteDialogOpen(false);
        setSelectedActivityId(null);
    };

    const handleConfirmDelete = () => {
        if (selectedActivityId !== null) {
            setActivities((prev) => prev.filter((activity) => activity.id !== selectedActivityId));
            handleCloseDeleteDialog();
        }
    };

    return (
        <Box sx={{ py: 4, bgcolor: 'var(--background)', minHeight: '100vh' }}>
            <Container maxWidth="lg">
                {/* Header */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                    <Typography variant="h4" sx={{ fontWeight: 700, color: 'var(--foreground)' }}>
                        Quản lý Hoạt động
                    </Typography>
                    <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={() => router.push('/admin/activities/add')}
                        sx={{
                            bgcolor: 'var(--primary-color)',
                            '&:hover': { bgcolor: 'var(--accent-color)' },
                        }}
                    >
                        Thêm hoạt động
                    </Button>
                </Box>

                {/* Filters */}
                <Paper sx={{ p: 3, mb: 3, bgcolor: '#fff' }}>
                    <Stack spacing={2}>
                        <TextField
                            fullWidth
                            placeholder="Tìm kiếm theo tiêu đề hoạc tác giả..."
                            value={searchTerm}
                            onChange={(e) => {
                                setSearchTerm(e.target.value);
                                setPage(0);
                            }}
                            variant="outlined"
                            size="small"
                        />
                        <FormControl size="small" sx={{ minWidth: 200 }}>
                            <InputLabel>Danh mục</InputLabel>
                            <Select
                                value={selectedCategory}
                                onChange={(e) => {
                                    setSelectedCategory(e.target.value);
                                    setPage(0);
                                }}
                                label="Danh mục"
                            >
                                {categories.map((cat) => (
                                    <MenuItem key={cat} value={cat}>
                                        {cat}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Stack>
                </Paper>

                {/* Table */}
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow sx={{ bgcolor: 'var(--secondary-color)' }}>
                                <TableCell sx={{ color: '#fff', fontWeight: 700 }}>ID</TableCell>
                                <TableCell sx={{ color: '#fff', fontWeight: 700 }}>Tiêu đề</TableCell>
                                <TableCell sx={{ color: '#fff', fontWeight: 700 }}>Mô tả</TableCell>
                                <TableCell sx={{ color: '#fff', fontWeight: 700 }}>Danh mục</TableCell>
                                <TableCell sx={{ color: '#fff', fontWeight: 700 }}>Ngày</TableCell>
                                <TableCell sx={{ color: '#fff', fontWeight: 700 }}>Tác giả</TableCell>
                                <TableCell sx={{ color: '#fff', fontWeight: 700, textAlign: 'center' }}>
                                    Hình ảnh
                                </TableCell>
                                <TableCell sx={{ color: '#fff', fontWeight: 700, textAlign: 'center' }}>
                                    Hành động
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {paginatedActivities.map((activity) => (
                                <TableRow key={activity.id} hover>
                                    <TableCell>{activity.id}</TableCell>
                                    <TableCell sx={{ maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                        {activity.title}
                                    </TableCell>
                                    <TableCell sx={{ maxWidth: 250, overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                        {activity.description}
                                    </TableCell>
                                    <TableCell>{activity.category}</TableCell>
                                    <TableCell>{activity.date}</TableCell>
                                    <TableCell>{activity.author}</TableCell>
                                    <TableCell sx={{ textAlign: 'center' }}>
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                gap: 0.5,
                                            }}
                                        >
                                            <ImageIcon sx={{ fontSize: 18, color: 'var(--primary-color)' }} />
                                            <Typography variant="body2">{activity.images.length}</Typography>
                                        </Box>
                                    </TableCell>
                                    <TableCell sx={{ textAlign: 'center' }}>
                                        <IconButton
                                            size="small"
                                            onClick={() => router.push(`/admin/activities/update/${activity.id}`)}
                                            sx={{ color: 'var(--primary-color)' }}
                                        >
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton
                                            size="small"
                                            onClick={() => handleOpenDeleteDialog(activity.id)}
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
                    count={filteredActivities.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    sx={{ bgcolor: '#fff', mt: 2, display: 'flex', justifyContent: 'center' }}
                />
            </Container>

            {/* Delete Confirmation Dialog */}
            <Dialog open={deleteDialogOpen} onClose={handleCloseDeleteDialog}>
                <DialogTitle>Xác nhận xóa</DialogTitle>
                <DialogContent>
                    <Typography>Bạn có chắc chắn muốn xóa hoạt động này không?</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDeleteDialog}>Hủy</Button>
                    <Button onClick={handleConfirmDelete} variant="contained" color="error">
                        Xóa
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}
