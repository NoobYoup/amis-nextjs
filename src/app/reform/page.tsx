'use client';

import { useState } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Chip from '@mui/material/Chip';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DescriptionIcon from '@mui/icons-material/Description';
import DownloadIcon from '@mui/icons-material/Download';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import AssignmentIcon from '@mui/icons-material/Assignment';
import GavelIcon from '@mui/icons-material/Gavel';
import FolderIcon from '@mui/icons-material/Folder';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import SearchIcon from '@mui/icons-material/Search';

interface Document {
    id: number;
    title: string;
    type: string;
    number: string;
    date: string;
    summary: string;
    fileUrl: string;
    fileType: 'pdf' | 'doc' | 'docx';
}

interface FormTemplate {
    id: number;
    title: string;
    category: string;
    description: string;
    fileUrl: string;
    fileType: 'pdf' | 'doc' | 'docx';
}

export default function Reform() {
    const [tabValue, setTabValue] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedYear, setSelectedYear] = useState('all');
    const [selectedDocType, setSelectedDocType] = useState('all');

    // Dữ liệu mẫu - Văn bản pháp quy
    const documents: Document[] = [
        {
            id: 1,
            title: 'Thông tư số 09/2024/TT-BGDĐT về công khai trong hoạt động của các cơ sở giáo dục',
            type: 'Thông tư',
            number: '09/2024/TT-BGDĐT',
            date: '2024-06-15',
            summary: 'Quy định về công khai thông tin đội ngũ giáo viên, cán bộ quản lý và nhân viên',
            fileUrl: '/files/09-bgd.pdf',
            fileType: 'pdf',
        },
        {
            id: 2,
            title: 'Quyết định về việc công khai kết quả đánh giá chất lượng giáo dục',
            type: 'Quyết định',
            number: '123/QĐ-AMIS',
            date: '2024-05-20',
            summary: 'Công khai kết quả đánh giá và kiểm định chất lượng giáo dục năm học 2023-2024',
            fileUrl: '/files/decision-123.pdf',
            fileType: 'pdf',
        },
        {
            id: 3,
            title: 'Quy chế tổ chức và hoạt động của nhà trường',
            type: 'Quy chế',
            number: '01/QC-AMIS',
            date: '2024-03-10',
            summary: 'Quy định về tổ chức bộ máy, chức năng nhiệm vụ của các phòng ban',
            fileUrl: '/files/regulation-01.pdf',
            fileType: 'pdf',
        },
        {
            id: 4,
            title: 'Kế hoạch cải cách hành chính năm 2024',
            type: 'Kế hoạch',
            number: '45/KH-AMIS',
            date: '2024-01-15',
            summary: 'Kế hoạch triển khai các hoạt động cải cách hành chính trong năm học 2024',
            fileUrl: '/files/plan-45.pdf',
            fileType: 'pdf',
        },
    ];

    // Dữ liệu mẫu - Biểu mẫu
    const formTemplates: FormTemplate[] = [
        {
            id: 1,
            title: 'Đơn xin nghỉ học',
            category: 'Học sinh',
            description: 'Biểu mẫu đơn xin nghỉ học dành cho học sinh',
            fileUrl: '/files/form-leave.doc',
            fileType: 'doc',
        },
        {
            id: 2,
            title: 'Đơn xin chuyển trường',
            category: 'Học sinh',
            description: 'Biểu mẫu đơn xin chuyển trường',
            fileUrl: '/files/form-transfer.doc',
            fileType: 'doc',
        },
        {
            id: 3,
            title: 'Phiếu đăng ký học bổ sung',
            category: 'Học tập',
            description: 'Biểu mẫu đăng ký học các môn bổ sung',
            fileUrl: '/files/form-register.pdf',
            fileType: 'pdf',
        },
        {
            id: 4,
            title: 'Đơn xin cấp bản sao văn bằng',
            category: 'Hành chính',
            description: 'Biểu mẫu đơn xin cấp bản sao văn bằng, chứng chỉ',
            fileUrl: '/files/form-certificate.doc',
            fileType: 'doc',
        },
    ];

    // Thống kê CCHC
    const stats = [
        { label: 'Chỉ số CCHC', value: '95.5', unit: 'điểm', icon: <TrendingUpIcon /> },
        { label: 'Văn bản công khai', value: '150+', unit: 'văn bản', icon: <DescriptionIcon /> },
        { label: 'Biểu mẫu trực tuyến', value: '50+', unit: 'mẫu', icon: <AssignmentIcon /> },
        { label: 'Quy trình công khai', value: '30+', unit: 'quy trình', icon: <GavelIcon /> },
    ];

    // Lọc văn bản
    const filteredDocuments = documents.filter((doc) => {
        const matchSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase());
        const matchYear = selectedYear === 'all' || doc.date.startsWith(selectedYear);
        const matchType = selectedDocType === 'all' || doc.type === selectedDocType;
        return matchSearch && matchYear && matchType;
    });

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };

    const getFileIcon = (fileType: string) => {
        return <DescriptionIcon sx={{ color: fileType === 'pdf' ? '#d32f2f' : '#1976d2' }} />;
    };

    return (
        <Box sx={{ bgcolor: 'var(--background)', minHeight: '100vh' }}>
            {/* Hero Section */}
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
                        Cải cách hành chính
                    </Typography>
                    <Typography variant="h6" sx={{ textAlign: 'center', opacity: 0.9 }}>
                        Công khai, minh bạch trong hoạt động giáo dục
                    </Typography>
                </Container>
            </Box>

            <Container maxWidth="lg">
                {/* Statistics */}
                <Grid container spacing={3} sx={{ mb: 6 }}>
                    {stats.map((stat, index) => (
                        <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
                            <Card
                                sx={{
                                    textAlign: 'center',
                                    p: 3,
                                    height: '100%',
                                    transition: 'transform 0.3s, box-shadow 0.3s',
                                    '&:hover': {
                                        transform: 'translateY(-4px)',
                                        boxShadow: 4,
                                    },
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
                </Grid>

                {/* Tabs Navigation */}
                <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 4 }}>
                    <Tabs
                        value={tabValue}
                        onChange={handleTabChange}
                        variant="scrollable"
                        scrollButtons="auto"
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
                        <Tab label="Giới thiệu" />
                        <Tab label="Văn bản pháp quy" />
                        <Tab label="Biểu mẫu" />
                        <Tab label="Quy trình" />
                    </Tabs>
                </Box>

                {/* Tab 0: Giới thiệu */}
                {tabValue === 0 && (
                    <Box>
                        <Typography variant="h4" sx={{ fontWeight: 700, mb: 3, color: 'var(--primary-color)' }}>
                            Về cải cách hành chính
                        </Typography>
                        <Card sx={{ mb: 4, p: 3 }}>
                            <Typography variant="body1" sx={{ mb: 2, lineHeight: 1.8 }}>
                                Cải cách hành chính là nhiệm vụ quan trọng, góp phần nâng cao chất lượng giáo dục và
                                đào tạo. Trường AMIS luôn chú trọng công khai, minh bạch trong mọi hoạt động.
                            </Typography>
                            <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
                                Theo Thông tư số 09/2024/TT-BGDĐT, nhà trường thực hiện công khai đầy đủ các thông tin
                                về đội ngũ, chương trình đào tạo, kết quả giáo dục và các hoạt động khác.
                            </Typography>
                        </Card>

                        <Typography variant="h5" sx={{ fontWeight: 700, mb: 3, color: 'var(--primary-color)' }}>
                            Mục tiêu cải cách hành chính
                        </Typography>
                        <Grid container spacing={3}>
                            {[
                                {
                                    title: 'Minh bạch thông tin',
                                    desc: 'Công khai đầy đủ thông tin về hoạt động giáo dục',
                                    icon: <DescriptionIcon />,
                                },
                                {
                                    title: 'Nâng cao chất lượng',
                                    desc: 'Cải thiện chất lượng dịch vụ hành chính công',
                                    icon: <TrendingUpIcon />,
                                },
                                {
                                    title: 'Hiện đại hóa',
                                    desc: 'Ứng dụng công nghệ thông tin trong quản lý',
                                    icon: <AssignmentIcon />,
                                },
                            ].map((item, index) => (
                                <Grid size={{ xs: 12, md: 4 }} key={index}>
                                    <Card sx={{ p: 3, height: '100%' }}>
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
                                            {item.icon}
                                        </Box>
                                        <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                                            {item.title}
                                        </Typography>
                                        <Typography variant="body2" sx={{ color: '#666' }}>
                                            {item.desc}
                                        </Typography>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                )}

                {/* Tab 1: Văn bản pháp quy */}
                {tabValue === 1 && (
                    <Box>
                        <Typography variant="h4" sx={{ fontWeight: 700, mb: 3, color: 'var(--primary-color)' }}>
                            Văn bản pháp quy
                        </Typography>

                        {/* Bộ lọc */}
                        <Card sx={{ p: 3, mb: 4 }}>
                            <Grid container spacing={2}>
                                <Grid size={{ xs: 12, md: 4 }}>
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
                                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
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
                                        <MenuItem value="2022">2022</MenuItem>
                                    </TextField>
                                </Grid>
                                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                                    <TextField
                                        fullWidth
                                        select
                                        label="Loại văn bản"
                                        value={selectedDocType}
                                        onChange={(e) => setSelectedDocType(e.target.value)}
                                    >
                                        <MenuItem value="all">Tất cả</MenuItem>
                                        <MenuItem value="Thông tư">Thông tư</MenuItem>
                                        <MenuItem value="Quyết định">Quyết định</MenuItem>
                                        <MenuItem value="Quy chế">Quy chế</MenuItem>
                                        <MenuItem value="Kế hoạch">Kế hoạch</MenuItem>
                                    </TextField>
                                </Grid>
                            </Grid>
                        </Card>

                        {/* Danh sách văn bản */}
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                            {filteredDocuments.map((doc) => (
                                <Card key={doc.id} sx={{ p: 3, '&:hover': { boxShadow: 4 } }}>
                                    <Grid container spacing={2} alignItems="center">
                                        <Grid size={{ xs: 12, md: 8 }}>
                                            <Box sx={{ display: 'flex', gap: 1, mb: 1, flexWrap: 'wrap' }}>
                                                <Chip
                                                    label={doc.type}
                                                    size="small"
                                                    sx={{
                                                        bgcolor: 'var(--primary-color)',
                                                        color: 'white',
                                                        fontWeight: 600,
                                                    }}
                                                />
                                                <Chip label={doc.number} size="small" variant="outlined" />
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
                    </Box>
                )}

                {/* Tab 2: Biểu mẫu */}
                {tabValue === 2 && (
                    <Box>
                        <Typography variant="h4" sx={{ fontWeight: 700, mb: 3, color: 'var(--primary-color)' }}>
                            Biểu mẫu tải về
                        </Typography>
                        <Grid container spacing={3}>
                            {formTemplates.map((form) => (
                                <Grid size={{ xs: 12, sm: 6, md: 4 }} key={form.id}>
                                    <Card
                                        sx={{
                                            p: 3,
                                            height: '100%',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            transition: 'transform 0.3s, box-shadow 0.3s',
                                            '&:hover': {
                                                transform: 'translateY(-4px)',
                                                boxShadow: 4,
                                            },
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                display: 'inline-flex',
                                                p: 2,
                                                borderRadius: 2,
                                                bgcolor:
                                                    form.fileType === 'pdf'
                                                        ? 'rgba(211, 47, 47, 0.1)'
                                                        : 'rgba(25, 118, 210, 0.1)',
                                                alignSelf: 'flex-start',
                                                mb: 2,
                                            }}
                                        >
                                            {getFileIcon(form.fileType)}
                                        </Box>
                                        <Chip
                                            label={form.category}
                                            size="small"
                                            sx={{ alignSelf: 'flex-start', mb: 2 }}
                                        />
                                        <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                                            {form.title}
                                        </Typography>
                                        <Typography variant="body2" sx={{ color: '#666', mb: 2, flexGrow: 1 }}>
                                            {form.description}
                                        </Typography>
                                        <Button
                                            variant="outlined"
                                            startIcon={<DownloadIcon />}
                                            fullWidth
                                            sx={{
                                                borderColor: 'var(--primary-color)',
                                                color: 'var(--primary-color)',
                                                '&:hover': {
                                                    borderColor: 'var(--accent-color)',
                                                    bgcolor: 'rgba(124, 179, 66, 0.1)',
                                                },
                                            }}
                                        >
                                            Tải xuống
                                        </Button>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                )}

                {/* Tab 3: Quy trình */}
                {tabValue === 3 && (
                    <Box>
                        <Typography variant="h4" sx={{ fontWeight: 700, mb: 3, color: 'var(--primary-color)' }}>
                            Quy trình hành chính
                        </Typography>
                        {[
                            {
                                title: 'Quy trình tuyển sinh',
                                items: [
                                    'Nộp hồ sơ đăng ký tuyển sinh',
                                    'Xét duyệt hồ sơ',
                                    'Thông báo kết quả',
                                    'Nhập học',
                                ],
                            },
                            {
                                title: 'Quy trình xin nghỉ học',
                                items: [
                                    'Điền đơn xin nghỉ học',
                                    'Giáo viên chủ nhiệm ký duyệt',
                                    'Phòng Đào tạo phê duyệt',
                                    'Thông báo kết quả',
                                ],
                            },
                            {
                                title: 'Quy trình cấp bản sao văn bằng',
                                items: [
                                    'Nộp đơn xin cấp bản sao',
                                    'Phòng Hành chính kiểm tra hồ sơ',
                                    'Cấp bản sao có xác nhận',
                                    'Nhận kết quả',
                                ],
                            },
                        ].map((process, index) => (
                            <Accordion key={index} sx={{ mb: 2 }}>
                                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                        <FolderIcon sx={{ color: 'var(--primary-color)' }} />
                                        <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                            {process.title}
                                        </Typography>
                                    </Box>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Box sx={{ pl: 2 }}>
                                        {process.items.map((item, idx) => (
                                            <Box
                                                key={idx}
                                                sx={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: 2,
                                                    mb: 2,
                                                    position: 'relative',
                                                }}
                                            >
                                                <Box
                                                    sx={{
                                                        width: 32,
                                                        height: 32,
                                                        borderRadius: '50%',
                                                        bgcolor: 'var(--primary-color)',
                                                        color: 'white',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        fontWeight: 700,
                                                        flexShrink: 0,
                                                    }}
                                                >
                                                    {idx + 1}
                                                </Box>
                                                <Typography variant="body1">{item}</Typography>
                                            </Box>
                                        ))}
                                    </Box>
                                </AccordionDetails>
                            </Accordion>
                        ))}
                    </Box>
                )}
            </Container>
        </Box>
    );
}
