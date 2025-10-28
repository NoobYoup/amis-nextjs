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
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Chip from '@mui/material/Chip';
import Pagination from '@mui/material/Pagination';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import VisibilityIcon from '@mui/icons-material/Visibility';

interface NewsArticle {
    id: number;
    title: string;
    excerpt: string;
    category: string;
    date: string;
    author: string;
    thumbnail: string;
    views: number;
}

export default function NewsPage() {
    const router = useRouter();
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 9;

    const newsArticles: NewsArticle[] = [
        {
            id: 1,
            title: 'Học sinh lớp 5 đạt giải Nhất cuộc thi Toán Tuổi thơ cấp Thành phố',
            excerpt: 'Em Nguyễn Minh An, học sinh lớp 5A, đã xuất sắc giành giải Nhất cuộc thi Toán Tuổi thơ năm 2024',
            category: 'Tiểu học',
            date: '2024-10-20',
            author: 'Khối Tiểu học',
            thumbnail: '/images/hero_backround.jpg',
            views: 1250,
        },
        {
            id: 2,
            title: 'Khai giảng năm học 2024-2025 - Chào đón các em học sinh lớp 1',
            excerpt: 'Lễ khai giảng đặc biệt dành cho các em học sinh lớp 1 với nhiều hoạt động vui chơi và làm quen',
            category: 'Tiểu học',
            date: '2024-09-05',
            author: 'Ban Giám hiệu',
            thumbnail: '/images/hero_backround.jpg',
            views: 2100,
        },
        {
            id: 3,
            title: 'Học sinh lớp 8 đạt giải Nhì Olympic Tiếng Anh cấp Quốc gia',
            excerpt: 'Em Trần Thị Hương, lớp 8B, đã đạt giải Nhì tại kỳ thi Olympic Tiếng Anh dành cho học sinh THCS',
            category: 'THCS',
            date: '2024-08-15',
            author: 'Khối THCS',
            thumbnail: '/images/hero_backround.jpg',
            views: 1800,
        },
        {
            id: 4,
            title: 'Ngày hội "Tuổi thơ rực rỡ" dành cho học sinh Tiểu học',
            excerpt:
                'Các em học sinh tiểu học đã có một ngày vui chơi với nhiều trò chơi dân gian và hoạt động ngoại khóa',
            category: 'Tiểu học',
            date: '2024-07-28',
            author: 'Đội Thiếu niên',
            thumbnail: '/images/hero_backround.jpg',
            views: 980,
        },
        {
            id: 5,
            title: 'Đội tuyển bóng đá THCS vô địch giải liên trường cấp Quận',
            excerpt: 'Đội tuyển bóng đá khối THCS đã xuất sắc giành chức vô địch sau những trận đấu căng thẳng',
            category: 'THCS',
            date: '2024-06-10',
            author: 'Câu lạc bộ Thể thao',
            thumbnail: '/images/hero_backround.jpg',
            views: 1500,
        },
        {
            id: 6,
            title: 'Tổ chức lớp học ngoại khóa "Khám phá thiên nhiên" cho học sinh lớp 3-4',
            excerpt:
                'Các em học sinh lớp 3 và 4 đã có chuyến tham quan thực tế tại vườn quốc gia để tìm hiểu về thiên nhiên',
            category: 'Tiểu học',
            date: '2024-05-22',
            author: 'Tổ Khoa học',
            thumbnail: '/images/hero_backround.jpg',
            views: 1100,
        },
        {
            id: 7,
            title: 'Học sinh lớp 9 tham gia hội trại "Tuổi trẻ sáng tạo"',
            excerpt: 'Các em học sinh lớp 9 đã có những trải nghiệm bổ ích tại hội trại kỹ năng sống và làm việc nhóm',
            category: 'THCS',
            date: '2024-04-15',
            author: 'Đoàn trường',
            thumbnail: '/images/hero_backround.jpg',
            views: 1650,
        },
        {
            id: 8,
            title: 'Tổ chức ngày "Đọc sách cùng con" cho phụ huynh và học sinh Tiểu học',
            excerpt: 'Chương trình khuyến khích văn hóa đọc với sự tham gia của phụ huynh và các em học sinh',
            category: 'Tiểu học',
            date: '2024-03-20',
            author: 'Thư viện trường',
            thumbnail: '/images/hero_backround.jpg',
            views: 890,
        },
        {
            id: 9,
            title: 'Khen thưởng 30 học sinh THCS đạt danh hiệu "Học sinh giỏi toàn diện"',
            excerpt: 'Lễ trao giải thưởng cho các em học sinh THCS có thành tích xuất sắc trong học tập và rèn luyện',
            category: 'THCS',
            date: '2024-02-10',
            author: 'Ban Giám hiệu',
            thumbnail: '/images/hero_backround.jpg',
            views: 1320,
        },
        {
            id: 10,
            title: 'Học sinh lớp 6 tham gia cuộc thi "Khoa học kỹ thuật trẻ"',
            excerpt: 'Các em lớp 6 đã sáng tạo nhiều mô hình khoa học độc đáo và đạt giải khuyến khích cấp Thành phố',
            category: 'THCS',
            date: '2024-01-18',
            author: 'Tổ Khoa học',
            thumbnail: '/images/hero_backround.jpg',
            views: 750,
        },
        {
            id: 11,
            title: 'Chương trình "Tiếng Anh qua trò chơi" cho học sinh lớp 1-2',
            excerpt: 'Phương pháp học Tiếng Anh mới giúp các em lớp 1-2 hứng thú và tiếp thu kiến thức hiệu quả',
            category: 'Tiểu học',
            date: '2024-01-05',
            author: 'Tổ Ngoại ngữ',
            thumbnail: '/images/hero_backround.jpg',
            views: 920,
        },
        {
            id: 12,
            title: 'Học sinh lớp 7 đạt giải Ba cuộc thi Vẽ tranh "Em yêu Tổ quốc"',
            excerpt: 'Em Lê Minh Tâm, lớp 7A, đã đạt giải Ba với bức tranh thể hiện tình yêu quê hương đất nước',
            category: 'THCS',
            date: '2023-12-20',
            author: 'Tổ Mỹ thuật',
            thumbnail: '/images/hero_backround.jpg',
            views: 680,
        },
    ];

    const handleCategoryChange = (event: React.SyntheticEvent, newValue: string) => {
        setSelectedCategory(newValue);
        setCurrentPage(1);
    };

    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setCurrentPage(value);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const filteredNews = newsArticles.filter(
        (article) => selectedCategory === 'all' || article.category === selectedCategory,
    );

    const totalPages = Math.ceil(filteredNews.length / itemsPerPage);
    const paginatedNews = filteredNews.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

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
                        Tin tức giáo dục
                    </Typography>
                    <Typography variant="h6" sx={{ textAlign: 'center', opacity: 0.9 }}>
                        Cập nhật tin tức mới nhất về hoạt động giáo dục tại trường
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
                        {Array.from(new Set(newsArticles.map((n) => n.category))).map((category) => (
                            <Tab key={category} label={category} value={category} />
                        ))}
                    </Tabs>
                </Box>

                {/* News Grid */}
                <Grid container spacing={3} sx={{ mb: 4 }}>
                    {paginatedNews.map((article) => (
                        <Grid size={{ xs: 12, sm: 6, md: 4 }} key={article.id}>
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
                                onClick={() => router.push(`/news/${article.id}`)}
                            >
                                <Box sx={{ position: 'relative' }}>
                                    <CardMedia
                                        component="img"
                                        height={200}
                                        image={article.thumbnail}
                                        alt={article.title}
                                        sx={{ objectFit: 'cover' }}
                                    />
                                    <Chip
                                        label={article.category}
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
                                <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
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
                                        {article.title}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                        sx={{
                                            mb: 2,
                                            flexGrow: 1,
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            display: '-webkit-box',
                                            WebkitLineClamp: 3,
                                            WebkitBoxOrient: 'vertical',
                                        }}
                                    >
                                        {article.excerpt}
                                    </Typography>
                                    <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', fontSize: '0.875rem' }}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                            <CalendarTodayIcon sx={{ fontSize: 14, color: 'var(--primary-color)' }} />
                                            <Typography variant="caption">{article.date}</Typography>
                                        </Box>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                            <VisibilityIcon sx={{ fontSize: 14, color: 'var(--primary-color)' }} />
                                            <Typography variant="caption">{article.views} lượt xem</Typography>
                                        </Box>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>

                {/* Pagination */}
                {totalPages > 1 && (
                    <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
                        <Pagination
                            count={totalPages}
                            page={currentPage}
                            onChange={handlePageChange}
                            color="primary"
                            size="large"
                            sx={{
                                '& .MuiPaginationItem-root': {
                                    '&.Mui-selected': {
                                        bgcolor: 'var(--primary-color)',
                                        '&:hover': {
                                            bgcolor: 'var(--accent-color)',
                                        },
                                    },
                                },
                            }}
                        />
                    </Box>
                )}
            </Container>
        </Box>
    );
}
