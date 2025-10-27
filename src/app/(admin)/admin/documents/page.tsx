'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
    Box,
    Container,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Button,
    TextField,
    MenuItem,
    Grid,
    Card,
    IconButton,
    Stack,
    Chip,
    TablePagination,
    InputAdornment,
    Alert,
    Paper,
    FormControl,
    InputLabel,
    Select,
    Dialog,
    DialogTitle,
    DialogActions,
    DialogContent,
} from '@mui/material';
import {
    Edit as EditIcon,
    Delete as DeleteIcon,
    Add as AddIcon,
    Search as SearchIcon,
    Download as DownloadIcon,
} from '@mui/icons-material';
import dayjs from 'dayjs';

interface Document {
    id: string; // _id from Mongo
    title: string;
    type: string;
    number: string;
    date: string;
    field: string;
    summary: string;
    fileUrl: string;
    fileType: 'pdf' | 'doc' | 'docx';
    isNew?: boolean;
}

const documentTypes = ['Thông tư', 'Quyết định', 'Quy chế', 'Kế hoạch', 'Quy định', 'Hướng dẫn'];
const documentFields = ['Quản lý giáo dục', 'Tuyển sinh', 'Đánh giá', 'Kế hoạch', 'Học sinh', 'Chương trình'];

export default function DocumentsPage() {
    const router = useRouter();
    const [documents, setDocuments] = useState<Document[]>([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedType, setSelectedType] = useState('');
    const [selectedField, setSelectedField] = useState('');
    const [error, setError] = useState('');
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [selectedId, setSelectedId] = useState<number | null>(null);

    useEffect(() => {
        loadDocuments();
    }, [page, searchQuery, selectedType, selectedField]);

    const loadDocuments = async () => {
        try {
            const params = new URLSearchParams({
                search: searchQuery,
                type: selectedType,
                field: selectedField,
                page: (page + 1).toString(),
            });
            const res = await fetch(`/api/admin/documents?${params}`);
            if (!res.ok) throw new Error('Error loading documents');
            const { data, total } = await res.json();

            setDocuments(data);
            setTotal(total);
        } catch (err) {
            setError('Lỗi tải dữ liệu');
        }
    };

    const handleChangePage = (event: unknown, newPage: number) => setPage(newPage);
    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
        setPage(0);
    };

    const handleTypeChange = (e: any) => {
        setSelectedType(e.target.value);
        setPage(0);
    };

    const handleFieldChange = (e: any) => {
        setSelectedField(e.target.value);
        setPage(0);
    };

    const handleConfirmDelete = async () => {
        try {
            const res = await fetch(`/api/admin/documents/${selectedId}`, { method: 'DELETE' });
            if (!res.ok) throw new Error('Error deleting');
            loadDocuments();
            handleCloseDeleteDialog();
        } catch (err) {
            setError('Lỗi xóa tài liệu');
        }
    };

    const handleOpenDeleteDialog = (id: number) => {
        setSelectedId(id);
        setDeleteDialogOpen(true);
    };

    const handleCloseDeleteDialog = () => {
        setDeleteDialogOpen(false);
        setSelectedId(null);
    };

    return (
        <Box sx={{ py: 4, bgcolor: 'var(--background)', minHeight: '100vh' }}>
            {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                    {error}
                </Alert>
            )}

            <Container maxWidth="xl">
                <Typography variant="h4" sx={{ fontWeight: 700, color: 'var(--foreground)' }}>
                    Quản Lý Tài Liệu
                </Typography>

                <Paper sx={{ p: 3, mb: 4, borderRadius: 2 }}>
                    <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                        <TextField
                            fullWidth
                            label="Tìm kiếm theo tiêu đề hoặc số văn bản"
                            value={searchQuery}
                            onChange={handleSearchChange}
                            InputProps={{ startAdornment: <SearchIcon sx={{ mr: 1, color: '#666' }} /> }}
                        />
                        <FormControl fullWidth>
                            <InputLabel>Loại tài liệu</InputLabel>
                            <Select value={selectedType} onChange={handleTypeChange} label="Loại tài liệu">
                                <MenuItem value="">Tất cả</MenuItem>
                                {documentTypes.map((type) => (
                                    <MenuItem key={type} value={type}>
                                        {type}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl fullWidth>
                            <InputLabel>Lĩnh vực</InputLabel>
                            <Select value={selectedField} onChange={handleFieldChange} label="Lĩnh vực">
                                <MenuItem value="">Tất cả</MenuItem>
                                {documentFields.map((field) => (
                                    <MenuItem key={field} value={field}>
                                        {field}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <Button
                            variant="contained"
                            startIcon={<AddIcon />}
                            onClick={() => router.push('/admin/documents/add')}
                            sx={{ bgcolor: 'var(--primary-color)', minWidth: 180 }}
                        >
                            Thêm tài liệu
                        </Button>
                    </Stack>
                </Paper>

                <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
                    <Table>
                        <TableHead sx={{ bgcolor: 'var(--primary-color)' }}>
                            <TableRow>
                                <TableCell sx={{ color: '#fff', fontWeight: 600 }}>Tiêu đề</TableCell>
                                <TableCell sx={{ color: '#fff', fontWeight: 600 }}>Loại</TableCell>
                                <TableCell sx={{ color: '#fff', fontWeight: 600 }}>Số</TableCell>
                                <TableCell sx={{ color: '#fff', fontWeight: 600 }}>Lĩnh vực</TableCell>
                                <TableCell sx={{ color: '#fff', fontWeight: 600 }}>Ngày tạo</TableCell>
                                <TableCell sx={{ color: '#fff', fontWeight: 600 }}>Ngày cập nhật</TableCell>
                                <TableCell sx={{ color: '#fff', fontWeight: 600, textAlign: 'center' }}>
                                    Hành động
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {documents.map((doc, index) => (
                                <TableRow key={index} hover>
                                    <TableCell>{doc.title}</TableCell>
                                    <TableCell>
                                        <Chip
                                            label={doc.type}
                                            size="small"
                                            sx={{ bgcolor: 'var(--primary-color)', color: 'white', fontWeight: 600 }}
                                        />
                                    </TableCell>
                                    <TableCell sx={{ fontWeight: 600 }}>{doc.number}</TableCell>
                                    <TableCell>{doc.field}</TableCell>

                                    <TableCell>{dayjs(doc.date).format('DD/MM/YYYY')}</TableCell>
                                    <TableCell>{dayjs(doc.updatedAt).format('DD/MM/YYYY')}</TableCell>
                                    <TableCell sx={{ textAlign: 'center' }}>
                                        <IconButton
                                            size="small"
                                            href={`/admin/documents/update/${doc._id}`}
                                            component="a"
                                            sx={{ color: 'var(--primary-color)' }}
                                        >
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton size="small" href={doc.fileUrl} target="_blank" title="Tải xuống">
                                            <DownloadIcon />
                                        </IconButton>
                                        <IconButton
                                            size="small"
                                            onClick={() => handleOpenDeleteDialog(doc._id)}
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

                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={total}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    sx={{ bgcolor: '#fff' }}
                />

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
