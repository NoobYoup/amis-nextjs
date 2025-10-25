'use client';

import { useState } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import DownloadIcon from '@mui/icons-material/Download';
import SchoolIcon from '@mui/icons-material/School';
import PersonIcon from '@mui/icons-material/Person';
import GavelIcon from '@mui/icons-material/Gavel';
import SecurityIcon from '@mui/icons-material/Security';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

interface Regulation {
    id: number;
    title: string;
    category: string;
    description: string;
    icon: React.ReactNode;
    content: {
        title: string;
        items: string[];
    }[];
    downloadUrl?: string;
}

export default function ProceduresPage() {
    const [selectedCategory, setSelectedCategory] = useState('all');

    const regulations: Regulation[] = [
        {
            id: 1,
            title: 'Nội quy học sinh',
            category: 'Học sinh',
            description: 'Các quy tắc ứng xử và kỷ luật học sinh trong trường',
            icon: <SchoolIcon />,
            downloadUrl: '/files/noi-quy-hoc-sinh.pdf',
            content: [
                {
                    title: 'Quy tắc ứng xử cơ bản',
                    items: [
                        'Tôn trọng thầy cô và các cán bộ nhà trường',
                        'Thân thiện và hỗ trợ các bạn học',
                        'Tuân thủ quy định về trang phục, tóc tẩm',
                        'Không sử dụng điện thoại trong giờ học',
                        'Đến lớp đúng giờ, không vắng mặt không phép',
                    ],
                },
                {
                    title: 'Kỷ luật và xử phạt',
                    items: [
                        'Vi phạm nhẹ: Nhắc nhở, ghi chép',
                        'Vi phạm trung bình: Cảnh cáo, viết kiểm điểm',
                        'Vi phạm nặng: Cảnh cáo lần 2, thông báo phụ huynh',
                        'Vi phạm rất nặng: Kỷ luật, có thể đình chỉ học',
                    ],
                },
                {
                    title: 'Quyền lợi học sinh',
                    items: [
                        'Được học tập trong môi trường an toàn, lành mạnh',
                        'Được tham gia các hoạt động ngoại khóa',
                        'Được tham gia các cuộc thi, hội thi',
                        'Được hỗ trợ học tập và tư vấn tâm lý',
                    ],
                },
            ],
        },
        {
            id: 2,
            title: 'Quy chế tuyển sinh',
            category: 'Tuyển sinh',
            description: 'Quy định về tuyển sinh và nhập học',
            icon: <PersonIcon />,
            downloadUrl: '/files/quy-che-tuyen-sinh.pdf',
            content: [
                {
                    title: 'Điều kiện tuyển sinh',
                    items: [
                        'Hoàn thành chương trình học cấp dưới',
                        'Có giấy khai sinh hợp lệ',
                        'Có sức khỏe phù hợp với học tập',
                        'Không bị bệnh truyền nhiễm nguy hiểm',
                    ],
                },
                {
                    title: 'Hồ sơ cần thiết',
                    items: [
                        'Đơn đăng ký tuyển sinh',
                        'Giấy khai sinh (bản sao)',
                        'Học bạ năm học trước',
                        'Giấy khám sức khỏe',
                        '4 ảnh 3x4 chụp trong 6 tháng',
                    ],
                },
                {
                    title: 'Quy trình xét tuyển',
                    items: [
                        'Kiểm tra hồ sơ đầu vào',
                        'Tổ chức kiểm tra năng lực (nếu có)',
                        'Công bố kết quả xét tuyển',
                        'Nhập học và hoàn tất thủ tục hành chính',
                    ],
                },
            ],
        },
        {
            id: 3,
            title: 'Quy chế học tập',
            category: 'Học tập',
            description: 'Quy định về quá trình học tập và đánh giá',
            icon: <GavelIcon />,
            downloadUrl: '/files/quy-che-hoc-tap.pdf',
            content: [
                {
                    title: 'Yêu cầu học tập',
                    items: [
                        'Tham dự đầy đủ các buổi học',
                        'Hoàn thành bài tập về nhà',
                        'Tham gia kiểm tra, thi cử',
                        'Tôn trọng quyền tác giả, không gian lận',
                    ],
                },
                {
                    title: 'Đánh giá học tập',
                    items: [
                        'Đánh giá thường xuyên qua bài tập, kiểm tra',
                        'Đánh giá giữa kỳ và cuối kỳ',
                        'Xếp loại: Xuất sắc, Giỏi, Khá, Trung bình, Yếu',
                        'Cấp chứng chỉ hoàn thành khóa học',
                    ],
                },
                {
                    title: 'Hỗ trợ học tập',
                    items: [
                        'Dạy thêm cho học sinh yếu',
                        'Tư vấn học tập từ giáo viên',
                        'Thư viện và tài liệu học tập',
                        'Hỗ trợ tâm lý và định hướng nghề nghiệp',
                    ],
                },
            ],
        },
        {
            id: 4,
            title: 'Quy chế an toàn trường học',
            category: 'An toàn',
            description: 'Quy định về an toàn và bảo vệ học sinh',
            icon: <SecurityIcon />,
            downloadUrl: '/files/quy-che-an-toan.pdf',
            content: [
                {
                    title: 'Trách nhiệm của nhà trường',
                    items: [
                        'Bảo đảm an toàn cơ sở vật chất',
                        'Cấp cứu y tế khi cần thiết',
                        'Bảo vệ học sinh khỏi bạo lực, xâm hại',
                        'Quản lý an toàn giao thông',
                    ],
                },
                {
                    title: 'Trách nhiệm của học sinh',
                    items: [
                        'Tuân thủ quy tắc an toàn',
                        'Báo cáo sự cố nguy hiểm cho thầy cô',
                        'Không mang vật cấm vào trường',
                        'Tham gia các hoạt động phòng chống tai nạn',
                    ],
                },
                {
                    title: 'Quy định về sức khỏe',
                    items: [
                        'Khám sức khỏe định kỳ hàng năm',
                        'Tiêm chủng theo lịch quốc gia',
                        'Báo cáo bệnh truyền nhiễm ngay',
                        'Vệ sinh cá nhân và vệ sinh trường học',
                    ],
                },
            ],
        },
        {
            id: 5,
            title: 'Quy chế khen thưởng - kỷ luật',
            category: 'Khen thưởng',
            description: 'Quy định về khen thưởng và xử phạt học sinh',
            icon: <EmojiEventsIcon />,
            downloadUrl: '/files/quy-che-khen-thuong.pdf',
            content: [
                {
                    title: 'Hình thức khen thưởng',
                    items: [
                        'Khen thưởng lời nói',
                        'Giấy khen, chứng chỉ',
                        'Học sinh giỏi, học sinh tốt',
                        'Bằng khen, huy chương',
                    ],
                },
                {
                    title: 'Tiêu chí khen thưởng',
                    items: [
                        'Học tập xuất sắc, giỏi',
                        'Rèn luyện tốt, có đạo đức',
                        'Tham gia hoạt động ngoại khóa nổi bật',
                        'Có thành tích đặc biệt',
                    ],
                },
                {
                    title: 'Hình thức kỷ luật',
                    items: [
                        'Nhắc nhở, cảnh cáo',
                        'Cảnh cáo lần 2, kỷ luật',
                        'Đình chỉ học tập tạm thời',
                        'Buộc thôi học (trường hợp đặc biệt)',
                    ],
                },
            ],
        },
    ];

    const handleCategoryChange = (event: React.SyntheticEvent, newValue: string) => {
        setSelectedCategory(newValue);
    };

    const categories = ['all', ...Array.from(new Set(regulations.map((r) => r.category)))];

    const filteredRegulations = regulations.filter(
        (regulation) => selectedCategory === 'all' || regulation.category === selectedCategory,
    );

    return (
        <Box sx={{ bgcolor: 'var(--background)', minHeight: '100vh' }}>
            {/* Header */}
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
                        Nội Quy & Quy Chế
                    </Typography>
                    <Typography variant="h6" sx={{ textAlign: 'center', opacity: 0.9 }}>
                        Các quy định và quy chế của trường AMIS
                    </Typography>
                </Container>
            </Box>

            <Container maxWidth="lg" sx={{ pb: 6 }}>
                {/* Tabs Navigation */}
                <Box sx={{ borderBottom: 2, borderColor: 'divider', mb: 4 }}>
                    <Tabs
                        value={selectedCategory}
                        onChange={handleCategoryChange}
                        variant="scrollable"
                        scrollButtons="auto"
                        sx={{
                            '& .MuiTab-root': {
                                fontWeight: 600,
                                fontSize: '1rem',
                                textTransform: 'none',
                            },
                            '& .Mui-selected': {
                                color: 'var(--primary-color) !important',
                            },
                            '& .MuiTabs-indicator': {
                                backgroundColor: 'var(--primary-color)',
                                height: 3,
                            },
                        }}
                    >
                        <Tab label="Tất cả" value="all" />
                        {categories.slice(1).map((category) => (
                            <Tab key={category} label={category} value={category} />
                        ))}
                    </Tabs>
                </Box>

                {/* Regulations Grid */}
                <Grid container spacing={3}>
                    {filteredRegulations.map((regulation) => (
                        <Grid size={{ xs: 12, md: 6, lg: 4 }} key={regulation.id}>
                            <Card
                                sx={{
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    transition: 'all 0.3s ease',
                                    '&:hover': {
                                        boxShadow: 4,
                                        transform: 'translateY(-4px)',
                                    },
                                }}
                            >
                                {/* Card Header */}
                                <Box
                                    sx={{
                                        p: 3,
                                        background:
                                            'linear-gradient(135deg, rgba(124, 179, 66, 0.1) 0%, rgba(124, 179, 66, 0.05) 100%)',
                                        borderBottom: '2px solid var(--primary-color)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 2,
                                    }}
                                >
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            p: 1.5,
                                            borderRadius: '50%',
                                            bgcolor: 'var(--primary-color)',
                                            color: 'white',
                                            fontSize: 28,
                                        }}
                                    >
                                        {regulation.icon}
                                    </Box>
                                    <Box>
                                        <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5 }}>
                                            {regulation.title}
                                        </Typography>
                                        <Chip
                                            label={regulation.category}
                                            size="small"
                                            sx={{
                                                bgcolor: 'var(--primary-color)',
                                                color: 'white',
                                                fontWeight: 600,
                                            }}
                                        />
                                    </Box>
                                </Box>

                                {/* Card Content */}
                                <Box sx={{ p: 3, flex: 1, overflow: 'auto' }}>
                                    <Typography variant="body2" sx={{ color: '#666', mb: 2 }}>
                                        {regulation.description}
                                    </Typography>

                                    {/* Content Sections */}
                                    {regulation.content.map((section, idx) => (
                                        <Box key={idx} sx={{ mb: 2 }}>
                                            <Typography
                                                variant="subtitle2"
                                                sx={{
                                                    fontWeight: 700,
                                                    color: 'var(--primary-color)',
                                                    mb: 1,
                                                }}
                                            >
                                                {section.title}
                                            </Typography>
                                            <List sx={{ py: 0 }}>
                                                {section.items.slice(0, 2).map((item, itemIdx) => (
                                                    <ListItem
                                                        key={itemIdx}
                                                        sx={{
                                                            py: 0.5,
                                                            px: 0,
                                                            display: 'flex',
                                                            alignItems: 'flex-start',
                                                        }}
                                                    >
                                                        <ListItemIcon
                                                            sx={{
                                                                minWidth: 24,
                                                                color: 'var(--primary-color)',
                                                            }}
                                                        >
                                                            <CheckCircleIcon sx={{ fontSize: 16 }} />
                                                        </ListItemIcon>
                                                        <ListItemText
                                                            primary={item}
                                                            primaryTypographyProps={{
                                                                variant: 'body2',
                                                                sx: { color: '#555' },
                                                            }}
                                                        />
                                                    </ListItem>
                                                ))}
                                                {section.items.length > 2 && (
                                                    <Typography
                                                        variant="caption"
                                                        sx={{
                                                            color: 'var(--primary-color)',
                                                            fontWeight: 600,
                                                            display: 'block',
                                                            mt: 0.5,
                                                        }}
                                                    >
                                                        +{section.items.length - 2} mục khác
                                                    </Typography>
                                                )}
                                            </List>
                                            {idx < regulation.content.length - 1 && <Divider sx={{ my: 1.5 }} />}
                                        </Box>
                                    ))}
                                </Box>

                                {/* Card Footer - Download Button */}
                                {regulation.downloadUrl && (
                                    <Box
                                        sx={{
                                            p: 2,
                                            borderTop: '1px solid #e0e0e0',
                                            bgcolor: '#f9f9f9',
                                        }}
                                    >
                                        <Button
                                            fullWidth
                                            variant="contained"
                                            startIcon={<DownloadIcon />}
                                            href={regulation.downloadUrl}
                                            sx={{
                                                bgcolor: 'var(--primary-color)',
                                                '&:hover': {
                                                    bgcolor: 'var(--accent-color)',
                                                },
                                            }}
                                        >
                                            Tải Về PDF
                                        </Button>
                                    </Box>
                                )}
                            </Card>
                        </Grid>
                    ))}
                </Grid>

                {/* Contact Section */}
                <Card
                    sx={{
                        p: 4,
                        mt: 6,
                        textAlign: 'center',
                        bgcolor: 'rgba(124, 179, 66, 0.05)',
                        border: '2px solid var(--primary-color)',
                    }}
                >
                    <Typography variant="h5" sx={{ fontWeight: 700, mb: 2, color: 'var(--primary-color)' }}>
                        📞 Cần Hỗ Trợ?
                    </Typography>
                    <Typography variant="body1" sx={{ color: '#666', mb: 3 }}>
                        Liên hệ với Phòng Hành chính để được tư vấn chi tiết về các quy định
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
                        <Button
                            variant="contained"
                            sx={{
                                bgcolor: 'var(--primary-color)',
                                '&:hover': { bgcolor: 'var(--accent-color)' },
                                px: 3,
                            }}
                        >
                            📱 Gọi: 024 1234 5678
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
                                px: 3,
                            }}
                        >
                            ✉️ Email: admin@amis.edu.vn
                        </Button>
                    </Box>
                </Card>
            </Container>
        </Box>
    );
}
