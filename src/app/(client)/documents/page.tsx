'use client';

import { useState } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Chip from '@mui/material/Chip';
import DescriptionIcon from '@mui/icons-material/Description';
import DownloadIcon from '@mui/icons-material/Download';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import SearchIcon from '@mui/icons-material/Search';
import ArticleIcon from '@mui/icons-material/Article';

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

export default function DocumentsPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedYear, setSelectedYear] = useState('all');
    const [selectedType, setSelectedType] = useState('all');
    const [selectedField, setSelectedField] = useState('all');

    const documents: Document[] = [
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
    ];

    const stats = [
        { label: 'Tổng văn bản', value: documents.length, icon: <ArticleIcon /> },
        { label: 'Văn bản mới', value: documents.filter((d) => d.isNew).length, icon: <DescriptionIcon /> },
    ];

    const filteredDocuments = documents.filter((doc) => {
        const matchSearch =
            doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            doc.number.toLowerCase().includes(searchTerm.toLowerCase());
        const matchYear = selectedYear === 'all' || doc.date.startsWith(selectedYear);
        const matchType = selectedType === 'all' || doc.type === selectedType;
        const matchField = selectedField === 'all' || doc.field === selectedField;
        return matchSearch && matchYear && matchType && matchField;
    });

    return (
        <Box sx={{ bgcolor: 'var(--background)', minHeight: '100vh' }}>
            <Box
                sx={{
                    background: 'linear-gradient(135deg, var(--primary-color) 0%, var(--accent-color) 100%)',
                    color: 'white',
                    py: 8,
                    mb: 6,
                }}
            >
                <Container maxWidth="lg">
                    <Typography variant="h2" sx={{ fontWeight: 700, textAlign: 'center', mb: 2 }}>
                        Văn bản pháp quy
                    </Typography>
                    <Typography variant="h6" sx={{ textAlign: 'center', opacity: 0.9 }}>
                        Hệ thống văn bản quản lý và điều hành nhà trường
                    </Typography>
                </Container>
            </Box>

            <Container maxWidth="lg">
                {/* <Grid container spacing={3} sx={{ mb: 6 }}>
                    {stats.map((stat, index) => (
                        <Grid size={{ xs: 12, sm: 6 }} key={index}>
                            <Card
                                sx={{
                                    textAlign: 'center',
                                    p: 3,
                                    transition: 'transform 0.3s',
                                    '&:hover': { transform: 'translateY(-4px)', boxShadow: 4 },
                                }}
                            >
                                <Box
                                    sx={{
                                        display: 'inline-flex',
                                        p: 2,
                                        borderRadius: '50%',
                                        bgcolor: 'rgba(124, 179, 66, 0.1)',
                                        color: 'var(--primary-color)',
                                        mb: 2,
                                    }}
                                >
                                    {stat.icon}
                                </Box>
                                <Typography variant="h3" sx={{ color: 'var(--primary-color)', fontWeight: 700 }}>
                                    {stat.value}
                                </Typography>
                                <Typography variant="body2" sx={{ color: '#666', mt: 1 }}>
                                    {stat.label}
                                </Typography>
                            </Card>
                        </Grid>
                    ))}
                </Grid> */}

                <Card sx={{ p: 3, mb: 4 }}>
                    <Grid container spacing={2}>
                        <Grid size={{ xs: 12, md: 3 }}>
                            <TextField
                                fullWidth
                                placeholder="Tìm kiếm văn bản..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                InputProps={{
                                    startAdornment: <SearchIcon sx={{ mr: 1, color: '#999' }} />,
                                }}
                            />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 4, md: 3 }}>
                            <TextField
                                fullWidth
                                select
                                label="Năm ban hành"
                                value={selectedYear}
                                onChange={(e) => setSelectedYear(e.target.value)}
                            >
                                <MenuItem value="all">Tất cả</MenuItem>
                                <MenuItem value="2024">2024</MenuItem>
                                <MenuItem value="2023">2023</MenuItem>
                            </TextField>
                        </Grid>
                        <Grid size={{ xs: 12, sm: 4, md: 3 }}>
                            <TextField
                                fullWidth
                                select
                                label="Loại văn bản"
                                value={selectedType}
                                onChange={(e) => setSelectedType(e.target.value)}
                            >
                                <MenuItem value="all">Tất cả</MenuItem>
                                <MenuItem value="Thông tư">Thông tư</MenuItem>
                                <MenuItem value="Quyết định">Quyết định</MenuItem>
                                <MenuItem value="Quy chế">Quy chế</MenuItem>
                                <MenuItem value="Kế hoạch">Kế hoạch</MenuItem>
                                <MenuItem value="Quy định">Quy định</MenuItem>
                                <MenuItem value="Hướng dẫn">Hướng dẫn</MenuItem>
                            </TextField>
                        </Grid>
                        <Grid size={{ xs: 12, sm: 4, md: 3 }}>
                            <TextField
                                fullWidth
                                select
                                label="Lĩnh vực"
                                value={selectedField}
                                onChange={(e) => setSelectedField(e.target.value)}
                            >
                                <MenuItem value="all">Tất cả</MenuItem>
                                <MenuItem value="Quản lý giáo dục">Quản lý giáo dục</MenuItem>
                                <MenuItem value="Tuyển sinh">Tuyển sinh</MenuItem>
                                <MenuItem value="Đánh giá">Đánh giá</MenuItem>
                                <MenuItem value="Kế hoạch">Kế hoạch</MenuItem>
                                <MenuItem value="Học sinh">Học sinh</MenuItem>
                                <MenuItem value="Chương trình">Chương trình</MenuItem>
                            </TextField>
                        </Grid>
                    </Grid>
                </Card>

                <Typography variant="body2" sx={{ mb: 2, color: '#666' }}>
                    Tìm thấy {filteredDocuments.length} văn bản
                </Typography>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {filteredDocuments.map((doc) => (
                        <Card key={doc.id} sx={{ p: 3, '&:hover': { boxShadow: 4 } }}>
                            <Grid container spacing={2} alignItems="center">
                                <Grid size={{ xs: 12, md: 8 }}>
                                    <Box sx={{ display: 'flex', gap: 1, mb: 1, flexWrap: 'wrap' }}>
                                        <Chip
                                            label={doc.type}
                                            size="small"
                                            sx={{ bgcolor: 'var(--primary-color)', color: 'white', fontWeight: 600 }}
                                        />
                                        <Chip label={doc.number} size="small" variant="outlined" />
                                        <Chip label={doc.field} size="small" color="default" />
                                        {doc.isNew && (
                                            <Chip
                                                label="Mới"
                                                size="small"
                                                sx={{ bgcolor: '#f44336', color: 'white' }}
                                            />
                                        )}
                                    </Box>
                                    <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                                        {doc.title}
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: '#666', mb: 1 }}>
                                        {doc.summary}
                                    </Typography>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <CalendarTodayIcon sx={{ fontSize: 16, color: '#999' }} />
                                        <Typography variant="caption" sx={{ color: '#999' }}>
                                            Ngày ban hành: {doc.date}
                                        </Typography>
                                    </Box>
                                </Grid>
                                <Grid size={{ xs: 12, md: 4 }} sx={{ textAlign: { xs: 'left', md: 'right' } }}>
                                    <Button
                                        variant="contained"
                                        startIcon={<DownloadIcon />}
                                        sx={{
                                            bgcolor: 'var(--primary-color)',
                                            '&:hover': { bgcolor: 'var(--accent-color)' },
                                        }}
                                    >
                                        Tải xuống {doc.fileType.toUpperCase()}
                                    </Button>
                                </Grid>
                            </Grid>
                        </Card>
                    ))}
                </Box>
            </Container>
        </Box>
    );
}
