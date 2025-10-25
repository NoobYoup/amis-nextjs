'use client';

import React, { useState } from 'react';
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
} from '@mui/material';
import {
    Edit as EditIcon,
    Delete as DeleteIcon,
    Add as AddIcon,
    Search as SearchIcon,
    Download as DownloadIcon,
} from '@mui/icons-material';

interface Document {
    id: number;
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
    const [documents, setDocuments] = useState<Document[]>([
        {
            id: 1,
            title: 'Thông tư 09/2024/TT-BGDĐT về công khai trong hoạt động của các cơ sở giáo dục',
            type: 'Thông tư',
            number: '09/2024/TT-BGDĐT',
            date: '2024-06-15',
            field: 'Quản lý giáo dục',
            summary: 'Quy định về công khai thông tin đội ngũ giáo viên, chương trình đào tạo, kết quả giáo dục',
            fileUrl: '/files/09-bgd.pdf',
            fileType: 'pdf',
            isNew: true,
        },
        {
            id: 2,
            title: 'Quyết định về việc ban hành quy chế tuyển sinh năm học 2024-2025',
            type: 'Quyết định',
            number: '456/QĐ-AMIS',
            date: '2024-05-20',
            field: 'Tuyển sinh',
            summary: 'Quy định về điều kiện, hồ sơ, quy trình tuyển sinh các cấp học',
            fileUrl: '/files/decision-456.pdf',
            fileType: 'pdf',
            isNew: true,
        },
        {
            id: 3,
            title: 'Quy chế đánh giá học sinh theo Thông tư 22/2021/TT-BGDĐT',
            type: 'Quy chế',
            number: '22/2021/TT-BGDĐT',
            date: '2024-03-10',
            field: 'Đánh giá',
            summary: 'Hướng dẫn đánh giá học sinh tiểu học, trung học cơ sở và trung học phổ thông',
            fileUrl: '/files/regulation-22.pdf',
            fileType: 'pdf',
        },
        {
            id: 4,
            title: 'Kế hoạch năm học 2024-2025',
            type: 'Kế hoạch',
            number: '789/KH-AMIS',
            date: '2024-08-01',
            field: 'Kế hoạch',
            summary: 'Kế hoạch tổ chức các hoạt động giáo dục trong năm học 2024-2025',
            fileUrl: '/files/plan-789.pdf',
            fileType: 'pdf',
            isNew: true,
        },
        {
            id: 5,
            title: 'Quy định về trang phục học sinh',
            type: 'Quy định',
            number: '101/QĐ-AMIS',
            date: '2024-02-15',
            field: 'Học sinh',
            summary: 'Quy định về trang phục, đồng phục học sinh các cấp học',
            fileUrl: '/files/uniform.pdf',
            fileType: 'pdf',
        },
        {
            id: 6,
            title: 'Hướng dẫn thực hiện chương trình giáo dục phổ thông 2018',
            type: 'Hướng dẫn',
            number: '32/2018/TT-BGDĐT',
            date: '2023-12-20',
            field: 'Chương trình',
            summary: 'Hướng dẫn thực hiện chương trình giáo dục phổ thông ban hành kèm theo Thông tư 32',
            fileUrl: '/files/guide-32.pdf',
            fileType: 'pdf',
        },
    ]);

    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState('all');
    const [filterField, setFilterField] = useState('all');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const filteredDocuments = documents.filter((doc) => {
        const matchSearch =
            doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            doc.number.toLowerCase().includes(searchTerm.toLowerCase());
        const matchType = filterType === 'all' || doc.type === filterType;
        const matchField = filterField === 'all' || doc.field === filterField;
        return matchSearch && matchType && matchField;
    });

    const paginatedDocuments = filteredDocuments.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <Box sx={{ py: 4, bgcolor: 'var(--background)', minHeight: '100vh' }}>
            <Container maxWidth="lg">
                <Typography variant="h4" sx={{ fontWeight: 700, mb: 4, color: 'var(--foreground)' }}>
                    Quản Lý Tài Liệu Văn Bản
                </Typography>

                {/* Filter & Search */}
                <Card sx={{ p: 3, mb: 4 }}>
                    <Grid container spacing={2}>
                        <Grid size={{ xs: 12, md: 4 }}>
                            <TextField
                                fullWidth
                                placeholder="Tìm kiếm theo tiêu đề hoặc số văn bản..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <SearchIcon sx={{ color: '#999' }} />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                            <TextField
                                fullWidth
                                select
                                label="Loại văn bản"
                                value={filterType}
                                onChange={(e) => setFilterType(e.target.value)}
                            >
                                <MenuItem value="all">Tất cả</MenuItem>
                                {documentTypes.map((type) => (
                                    <MenuItem key={type} value={type}>
                                        {type}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                            <TextField
                                fullWidth
                                select
                                label="Lĩnh vực"
                                value={filterField}
                                onChange={(e) => setFilterField(e.target.value)}
                            >
                                <MenuItem value="all">Tất cả</MenuItem>
                                {documentFields.map((field) => (
                                    <MenuItem key={field} value={field}>
                                        {field}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid size={{ xs: 12, md: 2 }}>
                            <Button
                                fullWidth
                                variant="contained"
                                startIcon={<AddIcon />}
                                href="/admin/documents/add"
                                component="a"
                                sx={{ bgcolor: 'var(--primary-color)', height: '56px', textDecoration: 'none' }}
                            >
                                Thêm Mới
                            </Button>
                        </Grid>
                    </Grid>
                </Card>

                {/* Statistics */}
                <Grid container spacing={2} sx={{ mb: 4 }}>
                    <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                        <Card sx={{ p: 2, textAlign: 'center' }}>
                            <Typography variant="h6" sx={{ fontWeight: 700, color: 'var(--primary-color)' }}>
                                {documents.length}
                            </Typography>
                            <Typography variant="body2" sx={{ color: '#666' }}>
                                Tổng văn bản
                            </Typography>
                        </Card>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                        <Card sx={{ p: 2, textAlign: 'center' }}>
                            <Typography variant="h6" sx={{ fontWeight: 700, color: '#f44336' }}>
                                {documents.filter((d) => d.isNew).length}
                            </Typography>
                            <Typography variant="body2" sx={{ color: '#666' }}>
                                Văn bản mới
                            </Typography>
                        </Card>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                        <Card sx={{ p: 2, textAlign: 'center' }}>
                            <Typography variant="h6" sx={{ fontWeight: 700, color: '#2e7d32' }}>
                                {filteredDocuments.length}
                            </Typography>
                            <Typography variant="body2" sx={{ color: '#666' }}>
                                Kết quả tìm kiếm
                            </Typography>
                        </Card>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                        <Card sx={{ p: 2, textAlign: 'center' }}>
                            <Typography variant="h6" sx={{ fontWeight: 700, color: '#1976d2' }}>
                                {new Set(documents.map((d) => d.type)).size}
                            </Typography>
                            <Typography variant="body2" sx={{ color: '#666' }}>
                                Loại văn bản
                            </Typography>
                        </Card>
                    </Grid>
                </Grid>

                {/* Documents Table */}
                <Card>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow sx={{ backgroundColor: 'var(--primary-color)' }}>
                                    <TableCell sx={{ color: 'white', fontWeight: 700 }}>Tiêu Đề</TableCell>
                                    <TableCell sx={{ color: 'white', fontWeight: 700 }}>Loại</TableCell>
                                    <TableCell sx={{ color: 'white', fontWeight: 700 }}>Số Văn Bản</TableCell>
                                    <TableCell sx={{ color: 'white', fontWeight: 700 }}>Lĩnh Vực</TableCell>
                                    <TableCell sx={{ color: 'white', fontWeight: 700 }}>Ngày Ban Hành</TableCell>
                                    <TableCell sx={{ color: 'white', fontWeight: 700, textAlign: 'center' }}>
                                        Hành Động
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {paginatedDocuments.map((doc, index) => (
                                    <TableRow
                                        key={doc.id}
                                        sx={{
                                            backgroundColor: index % 2 === 0 ? '#f5f5f5' : 'white',
                                            '&:hover': {
                                                backgroundColor: 'rgba(124, 179, 66, 0.1)',
                                            },
                                        }}
                                    >
                                        <TableCell>
                                            <Box>
                                                <Typography sx={{ fontWeight: 600, mb: 0.5 }}>{doc.title}</Typography>
                                                <Typography variant="caption" sx={{ color: '#999' }}>
                                                    {doc.summary}
                                                </Typography>
                                                {doc.isNew && (
                                                    <Chip
                                                        label="Mới"
                                                        size="small"
                                                        sx={{
                                                            bgcolor: '#f44336',
                                                            color: 'white',
                                                            mt: 0.5,
                                                        }}
                                                    />
                                                )}
                                            </Box>
                                        </TableCell>
                                        <TableCell>
                                            <Chip
                                                label={doc.type}
                                                size="small"
                                                sx={{
                                                    bgcolor: 'var(--primary-color)',
                                                    color: 'white',
                                                    fontWeight: 600,
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell sx={{ fontWeight: 600 }}>{doc.number}</TableCell>
                                        <TableCell>{doc.field}</TableCell>
                                        <TableCell>{doc.date}</TableCell>
                                        <TableCell sx={{ textAlign: 'center' }}>
                                            <IconButton
                                                size="small"
                                                href={`/admin/documents/update/${doc.id}`}
                                                component="a"
                                                sx={{ color: 'var(--primary-color)' }}
                                            >
                                                <EditIcon />
                                            </IconButton>
                                            <IconButton size="small" sx={{ color: '#1976d2' }} title="Tải xuống">
                                                <DownloadIcon />
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
                        count={filteredDocuments.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        sx={{ bgcolor: '#fff' }}
                    />
                </Card>
            </Container>
        </Box>
    );
}
