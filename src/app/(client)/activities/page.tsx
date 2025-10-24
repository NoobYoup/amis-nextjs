'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Chip from '@mui/material/Chip';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Pagination from '@mui/material/Pagination';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import ImageIcon from '@mui/icons-material/Image';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';

interface Activity {
    id: number;
    title: string;
    description: string;
    category: string;
    date: string;
    author: string;
    thumbnail: string;
    images: string[];
    videoUrl?: string;
    featured?: boolean;
}

export default function ActivitiesPage() {
    const router = useRouter();
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 9;

    // Dữ liệu mẫu - sau này sẽ lấy từ API
    const activities: Activity[] = [
        {
            id: 1,
            title: 'Hội thảo Khoa học Quốc tế 2024',
            description: 'Học sinh AMIS tham gia hội thảo khoa học quốc tế với nhiều nghiên cứu xuất sắc',
            category: 'Học thuật',
            date: '2024-10-15',
            author: 'Nguyễn Văn A',
            thumbnail: '/images/hero_backround.jpg',
            images: ['/images/hero_backround.jpg', '/images/logo_amis.png'],
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            featured: true,
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
            featured: true,
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
        },
        {
            id: 5,
            title: 'Cuộc thi Olympic Toán học',
            description: 'Học sinh AMIS đạt giải nhất cuộc thi Olympic Toán học cấp quốc gia',
            category: 'Học thuật',
            date: '2024-09-20',
            author: 'Hoàng Văn E',
            thumbnail: '/images/hero_backround.jpg',
            images: ['/images/hero_backround.jpg'],
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
        },
    ];

    const categories = ['all', 'Thể thao', 'Văn nghệ', 'Học thuật', 'Ngoại khóa'];

    // Lọc activities theo category
    const filteredActivities = activities.filter(
        (activity) => selectedCategory === 'all' || activity.category === selectedCategory,
    );

    // Phân trang
    const totalPages = Math.ceil(filteredActivities.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedActivities = filteredActivities.slice(startIndex, startIndex + itemsPerPage);

    const handleCategoryChange = (event: React.SyntheticEvent, newValue: string) => {
        setSelectedCategory(newValue);
        setCurrentPage(1);
    };

    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setCurrentPage(value);
        window.scrollTo({ top: 0, behavior: 'smooth' });
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
                        Hoạt động của trường
                    </Typography>
                    <Typography variant="h6" sx={{ textAlign: 'center', opacity: 0.9 }}>
                        Khám phá những hoạt động sôi nổi và ý nghĩa tại AMIS
                    </Typography>
                </Container>
            </Box>

            <Container maxWidth="lg">
                {/* Filter Tabs */}
                <Box sx={{ mb: 4, borderBottom: 1, borderColor: 'divider' }}>
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
                        {categories.map((category) => (
                            <Tab key={category} label={category === 'all' ? 'Tất cả' : category} value={category} />
                        ))}
                    </Tabs>
                </Box>

                {/* Activities Grid */}
                <Grid container spacing={3} sx={{ mb: 4 }}>
                    {paginatedActivities.map((activity) => (
                        <Grid size={{ xs: 12, sm: 6, md: 4 }} key={activity.id}>
                            <Card
                                sx={{
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    cursor: 'pointer',
                                    transition: 'transform 0.3s, box-shadow 0.3s',
                                    '&:hover': {
                                        transform: 'translateY(-4px)',
                                        boxShadow: 4,
                                    },
                                }}
                                onClick={() => router.push(`/activities/${activity.id}`)}
                            >
                                <Box sx={{ position: 'relative' }}>
                                    <CardMedia
                                        component="img"
                                        height={400}
                                        width={400}
                                        image={activity.thumbnail}
                                        alt={activity.title}
                                        sx={{ objectFit: 'cover', width: '100%', height: '100%' }}
                                    />
                                    {activity.videoUrl && (
                                        <Box
                                            sx={{
                                                position: 'absolute',
                                                top: '50%',
                                                left: '50%',
                                                transform: 'translate(-50%, -50%)',
                                            }}
                                        >
                                            <PlayCircleOutlineIcon
                                                sx={{ fontSize: 48, color: 'white', opacity: 0.9 }}
                                            />
                                        </Box>
                                    )}
                                    <Chip
                                        label={activity.category}
                                        size="small"
                                        sx={{
                                            position: 'absolute',
                                            top: 12,
                                            right: 12,
                                            bgcolor: 'var(--primary-color)',
                                            color: 'white',
                                            fontWeight: 600,
                                        }}
                                    />
                                </Box>
                                <CardContent sx={{ flexGrow: 1 }}>
                                    <Typography
                                        variant="h6"
                                        sx={{
                                            fontWeight: 700,
                                            mb: 1,
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            display: '-webkit-box',
                                            WebkitLineClamp: 2,
                                            WebkitBoxOrient: 'vertical',
                                        }}
                                    >
                                        {activity.title}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                        sx={{
                                            mb: 2,
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            display: '-webkit-box',
                                            WebkitLineClamp: 2,
                                            WebkitBoxOrient: 'vertical',
                                        }}
                                    >
                                        {activity.description}
                                    </Typography>
                                    <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap', fontSize: '0.875rem' }}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                            <CalendarTodayIcon sx={{ fontSize: 14, color: 'var(--primary-color)' }} />
                                            <Typography variant="caption">{activity.date}</Typography>
                                        </Box>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                            <ImageIcon sx={{ fontSize: 14, color: 'var(--primary-color)' }} />
                                            <Typography variant="caption">{activity.images.length} ảnh</Typography>
                                        </Box>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>

                {/* Pagination */}
                {totalPages > 1 && (
                    <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
                        <Pagination
                            count={totalPages}
                            page={currentPage}
                            onChange={handlePageChange}
                            color="primary"
                            size="large"
                            sx={{
                                '& .MuiPaginationItem-root': {
                                    fontWeight: 600,
                                },
                                '& .Mui-selected': {
                                    bgcolor: 'var(--primary-color) !important',
                                },
                            }}
                        />
                    </Box>
                )}
            </Container>
        </Box>
    );
}
