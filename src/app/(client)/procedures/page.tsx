'use client';

import { useState } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DownloadIcon from '@mui/icons-material/Download';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import DescriptionIcon from '@mui/icons-material/Description';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import SchoolIcon from '@mui/icons-material/School';
import PersonIcon from '@mui/icons-material/Person';
import FolderIcon from '@mui/icons-material/Folder';

interface Procedure {
    id: number;
    title: string;
    category: string;
    description: string;
    processingTime: string;
    steps: string[];
    documents: string[];
    forms?: { name: string; url: string }[];
    icon: React.ReactNode;
}

export default function ProceduresPage() {
    const [expanded, setExpanded] = useState<number | false>(false);
    const [selectedCategory, setSelectedCategory] = useState('all');

    const procedures: Procedure[] = [
        {
            id: 1,
            title: 'Thủ tục tuyển sinh',
            category: 'Tuyển sinh',
            description: 'Quy trình đăng ký và xét tuyển học sinh mới vào các cấp học',
            processingTime: '15 ngày làm việc',
            steps: [
                'Nộp hồ sơ đăng ký trực tuyến hoặc trực tiếp tại trường',
                'Trường tiếp nhận và kiểm tra hồ sơ',
                'Tổ chức kiểm tra đầu vào (nếu có)',
                'Công bố kết quả trúng tuyển',
                'Học sinh làm thủ tục nhập học',
            ],
            documents: [
                'Giấy khai sinh (bản sao)',
                'Học bạ năm học trước (bản sao)',
                'Giấy chứng nhận hoàn thành cấp học (nếu có)',
                '4 ảnh 3x4 (chụp trong 6 tháng)',
                'Giấy khám sức khỏe',
            ],
            forms: [
                { name: 'Đơn đăng ký tuyển sinh', url: '/files/form-admission.pdf' },
                { name: 'Phiếu khám sức khỏe', url: '/files/form-health.pdf' },
            ],
            icon: <SchoolIcon />,
        },
        {
            id: 2,
            title: 'Thủ tục xin nghỉ học',
            category: 'Học sinh',
            description: 'Quy trình xin nghỉ học tạm thời hoặc bảo lưu kết quả học tập',
            processingTime: '3-5 ngày làm việc',
            steps: [
                'Học sinh/phụ huynh điền đơn xin nghỉ học',
                'Giáo viên chủ nhiệm xem xét và ký duyệt',
                'Phòng Đào tạo phê duyệt',
                'Thông báo kết quả cho học sinh/phụ huynh',
            ],
            documents: [
                'Đơn xin nghỉ học (theo mẫu)',
                'Giấy xác nhận lý do (nếu có)',
                'Học bạ (nộp lại khi nghỉ học dài hạn)',
            ],
            forms: [{ name: 'Đơn xin nghỉ học', url: '/files/form-leave.doc' }],
            icon: <PersonIcon />,
        },
        {
            id: 3,
            title: 'Thủ tục chuyển trường',
            category: 'Học sinh',
            description: 'Quy trình chuyển trường đến hoặc đi từ trường AMIS',
            processingTime: '7 ngày làm việc',
            steps: [
                'Phụ huynh nộp đơn xin chuyển trường',
                'Trường cũ xác nhận và cấp giấy chuyển trường',
                'Trường mới tiếp nhận hồ sơ và xem xét',
                'Thông báo kết quả và sắp xếp lớp học',
                'Học sinh nhập học tại trường mới',
            ],
            documents: [
                'Đơn xin chuyển trường',
                'Giấy chuyển trường từ trường cũ',
                'Học bạ (bản chính)',
                'Giấy khai sinh (bản sao)',
                '4 ảnh 3x4',
            ],
            forms: [{ name: 'Đơn xin chuyển trường', url: '/files/form-transfer.doc' }],
            icon: <FolderIcon />,
        },
        {
            id: 4,
            title: 'Thủ tục cấp bản sao văn bằng, chứng chỉ',
            category: 'Hành chính',
            description: 'Quy trình xin cấp bản sao có xác nhận của nhà trường',
            processingTime: '5-7 ngày làm việc',
            steps: [
                'Nộp đơn xin cấp bản sao tại Phòng Hành chính',
                'Phòng Hành chính kiểm tra hồ sơ gốc',
                'Sao y bản chính và đóng dấu xác nhận',
                'Thông báo và trả kết quả',
            ],
            documents: [
                'Đơn xin cấp bản sao (theo mẫu)',
                'Bản chính văn bằng/chứng chỉ (để đối chiếu)',
                'CMND/CCCD (bản sao)',
            ],
            forms: [{ name: 'Đơn xin cấp bản sao', url: '/files/form-certificate.doc' }],
            icon: <DescriptionIcon />,
        },
        {
            id: 5,
            title: 'Thủ tục đăng ký học bổ sung',
            category: 'Học tập',
            description: 'Quy trình đăng ký các môn học bổ sung, ngoại khóa',
            processingTime: '3 ngày làm việc',
            steps: [
                'Học sinh điền phiếu đăng ký môn học',
                'Phụ huynh ký xác nhận',
                'Nộp phiếu tại Phòng Đào tạo',
                'Nhận thông báo lịch học và đóng học phí',
            ],
            documents: ['Phiếu đăng ký học bổ sung', 'Giấy xác nhận của phụ huynh'],
            forms: [{ name: 'Phiếu đăng ký học bổ sung', url: '/files/form-extra.pdf' }],
            icon: <AssignmentTurnedInIcon />,
        },
    ];

    const handleChange = (panel: number) => (event: React.SyntheticEvent, isExpanded: boolean) => {
        setExpanded(isExpanded ? panel : false);
    };

    const handleCategoryChange = (event: React.SyntheticEvent, newValue: string) => {
        setSelectedCategory(newValue);
    };

    const categories = ['all', ...Array.from(new Set(procedures.map((p) => p.category)))];
    
    const filteredProcedures = procedures.filter((procedure) => 
        selectedCategory === 'all' || procedure.category === selectedCategory
    );

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
                        Thủ tục hành chính
                    </Typography>
                    <Typography variant="h6" sx={{ textAlign: 'center', opacity: 0.9 }}>
                        Hướng dẫn các thủ tục và quy trình hành chính tại trường
                    </Typography>
                </Container>
            </Box>

            <Container maxWidth="lg">
                {/* Tabs Navigation */}
                <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 4 }}>
                    <Tabs
                        value={selectedCategory}
                        onChange={handleCategoryChange}
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
                        <Tab label="Tất cả" value="all" />
                        {Array.from(new Set(procedures.map((p) => p.category))).map((category) => (
                            <Tab key={category} label={category} value={category} />
                        ))}
                    </Tabs>
                </Box>

                <Box sx={{ mb: 4 }}>
                    {filteredProcedures.map((procedure) => (
                        <Accordion
                            key={procedure.id}
                            expanded={expanded === procedure.id}
                            onChange={handleChange(procedure.id)}
                            sx={{ mb: 2, '&:before': { display: 'none' } }}
                        >
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                sx={{
                                    bgcolor: expanded === procedure.id ? 'rgba(124, 179, 66, 0.05)' : 'transparent',
                                    '&:hover': { bgcolor: 'rgba(124, 179, 66, 0.05)' },
                                }}
                            >
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: '100%' }}>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            p: 1.5,
                                            borderRadius: '50%',
                                            bgcolor: 'rgba(124, 179, 66, 0.1)',
                                            color: 'var(--primary-color)',
                                        }}
                                    >
                                        {procedure.icon}
                                    </Box>
                                    <Box sx={{ flex: 1 }}>
                                        <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                            {procedure.title}
                                        </Typography>
                                        <Typography variant="body2" sx={{ color: '#666' }}>
                                            {procedure.description}
                                        </Typography>
                                    </Box>
                                    <Chip
                                        label={procedure.category}
                                        size="small"
                                        sx={{ display: { xs: 'none', sm: 'flex' } }}
                                    />
                                </Box>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Grid container spacing={3}>
                                    <Grid size={{ xs: 12, md: 6 }}>
                                        <Card sx={{ p: 3, height: '100%' }}>
                                            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                                                Quy trình thực hiện
                                            </Typography>
                                            <Stepper orientation="vertical">
                                                {procedure.steps.map((step, index) => (
                                                    <Step key={index} active>
                                                        <StepLabel
                                                            StepIconProps={{
                                                                sx: {
                                                                    color: 'var(--primary-color) !important',
                                                                },
                                                            }}
                                                        >
                                                            <Typography variant="body2">{step}</Typography>
                                                        </StepLabel>
                                                    </Step>
                                                ))}
                                            </Stepper>
                                            <Box
                                                sx={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: 1,
                                                    mt: 3,
                                                    p: 2,
                                                    bgcolor: 'rgba(124, 179, 66, 0.05)',
                                                    borderRadius: 1,
                                                }}
                                            >
                                                <AccessTimeIcon sx={{ color: 'var(--primary-color)' }} />
                                                <Box>
                                                    <Typography variant="caption" sx={{ color: '#666' }}>
                                                        Thời gian xử lý
                                                    </Typography>
                                                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                                        {procedure.processingTime}
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        </Card>
                                    </Grid>

                                    <Grid size={{ xs: 12, md: 6 }}>
                                        <Card sx={{ p: 3, height: '100%' }}>
                                            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                                                Hồ sơ cần thiết
                                            </Typography>
                                            <Box component="ul" sx={{ pl: 2, mb: 3 }}>
                                                {procedure.documents.map((doc, index) => (
                                                    <Typography
                                                        component="li"
                                                        key={index}
                                                        variant="body2"
                                                        sx={{ mb: 1 }}
                                                    >
                                                        {doc}
                                                    </Typography>
                                                ))}
                                            </Box>

                                            {procedure.forms && procedure.forms.length > 0 && (
                                                <>
                                                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                                                        Biểu mẫu tải về
                                                    </Typography>
                                                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                                                        {procedure.forms.map((form, index) => (
                                                            <Button
                                                                key={index}
                                                                variant="outlined"
                                                                startIcon={<DownloadIcon />}
                                                                fullWidth
                                                                sx={{
                                                                    justifyContent: 'flex-start',
                                                                    borderColor: 'var(--primary-color)',
                                                                    color: 'var(--primary-color)',
                                                                    '&:hover': {
                                                                        borderColor: 'var(--accent-color)',
                                                                        bgcolor: 'rgba(124, 179, 66, 0.05)',
                                                                    },
                                                                }}
                                                            >
                                                                {form.name}
                                                            </Button>
                                                        ))}
                                                    </Box>
                                                </>
                                            )}
                                        </Card>
                                    </Grid>
                                </Grid>
                            </AccordionDetails>
                        </Accordion>
                    ))}
                </Box>

                <Card sx={{ p: 4, textAlign: 'center', bgcolor: 'rgba(124, 179, 66, 0.05)' }}>
                    <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
                        Cần hỗ trợ thêm?
                    </Typography>
                    <Typography variant="body1" sx={{ color: '#666', mb: 3 }}>
                        Liên hệ với Phòng Hành chính để được tư vấn chi tiết
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
                        <Button
                            variant="contained"
                            sx={{
                                bgcolor: 'var(--primary-color)',
                                '&:hover': { bgcolor: 'var(--accent-color)' },
                            }}
                        >
                            Gọi: 024 1234 5678
                        </Button>
                        <Button
                            variant="outlined"
                            sx={{
                                borderColor: 'var(--primary-color)',
                                color: 'var(--primary-color)',
                                '&:hover': {
                                    borderColor: 'var(--accent-color)',
                                    bgcolor: 'rgba(124, 179, 66, 0.05)',
                                },
                            }}
                        >
                            Email: admin@amis.edu.vn
                        </Button>
                    </Box>
                </Card>
            </Container>
        </Box>
    );
}
