'use client';

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DownloadIcon from '@mui/icons-material/Download';
import PublicIcon from '@mui/icons-material/Public';
import PeopleIcon from '@mui/icons-material/People';
import SchoolIcon from '@mui/icons-material/School';
import AssignmentIcon from '@mui/icons-material/Assignment';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';

interface DisclosureItem {
    id: number;
    title: string;
    icon: React.ReactNode;
    description: string;
    details: string[];
    downloadUrl?: string;
}

export default function Reform() {
    const disclosureItems: DisclosureItem[] = [
        {
            id: 1,
            title: 'Thông tin về đội ngũ giáo viên, cán bộ quản lý và nhân viên',
            icon: <PeopleIcon />,
            description: 'Công khai đầy đủ thông tin về đội ngũ nhân sự của nhà trường',
            details: [
                'Danh sách giáo viên với trình độ, chuyên môn',
                'Thông tin cán bộ quản lý và chức vụ',
                'Thông tin nhân viên hành chính, kỹ thuật',
                'Lịch sử công tác và bằng cấp',
                'Các giải thưởng, khen thưởng',
            ],
            downloadUrl: '/files/thong-tin-doi-ngu.pdf',
        },
        {
            id: 2,
            title: 'Thông tin về cơ sở vật chất và tài liệu học tập sử dụng chung',
            icon: <SchoolIcon />,
            description: 'Công khai thông tin về cơ sở vật chất và tài liệu học tập',
            details: [
                'Danh sách phòng học, phòng chuyên môn',
                'Trang thiết bị dạy học hiện có',
                'Thư viện, tài liệu tham khảo',
                'Phòng máy tính, phòng thí nghiệm',
                'Các tiện ích phục vụ học sinh',
            ],
            downloadUrl: '/files/co-so-vat-chat.pdf',
        },
        {
            id: 3,
            title: 'Thông tin về kết quả đánh giá và kiểm định chất lượng giáo dục',
            icon: <VerifiedUserIcon />,
            description: 'Công khai kết quả đánh giá chất lượng giáo dục định kỳ',
            details: [
                'Kết quả đánh giá chất lượng ngoài nhà trường',
                'Kết quả kiểm định chất lượng giáo dục',
                'Báo cáo tự đánh giá chất lượng',
                'Kết quả khảo sát sự hài lòng của phụ huynh',
                'Kế hoạch cải thiện chất lượng',
            ],
            downloadUrl: '/files/ket-qua-danh-gia.pdf',
        },
        {
            id: 4,
            title: 'Thông tin về kết quả giáo dục thực tế của năm học trước',
            icon: <AssignmentIcon />,
            description: 'Công khai kết quả học tập và rèn luyện của học sinh',
            details: [
                'Tỷ lệ học sinh đạt các mức độ học lực',
                'Tỷ lệ học sinh đạt các mức độ hạnh kiểm',
                'Kết quả thi tuyển sinh vào cấp trên',
                'Tỷ lệ học sinh hoàn thành chương trình',
                'Kết quả các cuộc thi, hội thi',
            ],
            downloadUrl: '/files/ket-qua-giao-duc.pdf',
        },
    ];

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
                        Công Khai Thông Tin
                    </Typography>
                    <Typography variant="h6" sx={{ textAlign: 'center', opacity: 0.9 }}>
                        Theo Thông tư 09/2024/TT-BGDĐT
                    </Typography>
                </Container>
            </Box>

            <Container maxWidth="lg" sx={{ pb: 6 }}>
                {/* Header Info */}
                <Card
                    sx={{ p: 4, mb: 6, bgcolor: 'rgba(124, 179, 66, 0.05)', border: '2px solid var(--primary-color)' }}
                >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                        <PublicIcon sx={{ fontSize: 32, color: 'var(--primary-color)' }} />
                        <Typography variant="h5" sx={{ fontWeight: 700, color: 'var(--primary-color)' }}>
                            Công khai theo Thông tư 09/2024/TT-BGDĐT
                        </Typography>
                    </Box>
                    <Typography variant="body1" sx={{ color: '#666', lineHeight: 1.8 }}>
                        Trường AMIS cam kết công khai, minh bạch trong hoạt động giáo dục. Dưới đây là các thông tin
                        được công khai theo quy định của Bộ Giáo dục và Đào tạo:
                    </Typography>
                </Card>

                {/* Disclosure Items Grid */}
                <Grid container spacing={3}>
                    {disclosureItems.map((item) => (
                        <Grid size={{ xs: 12, md: 6 }} key={item.id}>
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
                                        {item.icon}
                                    </Box>
                                    <Box>
                                        <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5 }}>
                                            {item.title}
                                        </Typography>
                                    </Box>
                                </Box>

                                {/* Card Content */}
                                <Box sx={{ p: 3, flex: 1 }}>
                                    <Typography variant="body2" sx={{ color: '#666', mb: 2 }}>
                                        {item.description}
                                    </Typography>

                                    <Typography
                                        variant="subtitle2"
                                        sx={{
                                            fontWeight: 700,
                                            color: 'var(--primary-color)',
                                            mb: 1.5,
                                        }}
                                    >
                                        Nội dung công khai:
                                    </Typography>

                                    <List sx={{ py: 0 }}>
                                        {item.details.map((detail, idx) => (
                                            <ListItem
                                                key={idx}
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
                                                    primary={detail}
                                                    primaryTypographyProps={{
                                                        variant: 'body2',
                                                        sx: { color: '#555' },
                                                    }}
                                                />
                                            </ListItem>
                                        ))}
                                    </List>
                                </Box>

                                {/* Card Footer - Download Button */}
                                {item.downloadUrl && (
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
                                            href={item.downloadUrl}
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
                        Liên hệ với Phòng Hành chính để được tư vấn chi tiết về các thông tin công khai
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
