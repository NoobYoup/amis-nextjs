'use client';

import { useParams, useRouter } from 'next/navigation';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PersonIcon from '@mui/icons-material/Person';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ShareIcon from '@mui/icons-material/Share';
import Image from 'next/image';

interface NewsArticle {
    id: number;
    title: string;
    excerpt: string;
    content: string;
    category: string;
    date: string;
    author: string;
    thumbnail: string;
    images: string[];
    views: number;
    tags: string[];
}

export default function NewsDetailPage() {
    const params = useParams();
    const router = useRouter();
    const newsId = Number(params.id);

    // Dữ liệu mẫu - Trong thực tế sẽ fetch từ API
    const newsArticles: NewsArticle[] = [
        {
            id: 1,
            title: 'Học sinh lớp 5 đạt giải Nhất cuộc thi Toán Tuổi thơ cấp Thành phố',
            excerpt: 'Em Nguyễn Minh An, học sinh lớp 5A, đã xuất sắc giành giải Nhất cuộc thi Toán Tuổi thơ năm 2024',
            content: `
                <p>Ngày 20/10/2024, tại Hội trường Thành phố, em Nguyễn Minh An, học sinh lớp 5A trường AMIS đã xuất sắc giành giải Nhất cuộc thi Toán Tuổi thơ cấp Thành phố năm 2024.</p>
                
                <p>Cuộc thi năm nay có sự tham gia của hơn 200 học sinh xuất sắc đến từ các trường tiểu học trên địa bàn Thành phố. Các em đã trải qua 3 vòng thi: vòng sơ loại, vòng bán kết và vòng chung kết với những bài toán đòi hỏi tư duy logic cao và khả năng giải quyết vấn đề nhanh nhạy.</p>
                
                <h3>Hành trình đến với chiến thắng</h3>
                <p>Em Nguyễn Minh An chia sẻ: "Em rất vui và tự hào khi đạt được giải Nhất. Em đã chuẩn bị rất kỹ lưỡng cho cuộc thi này với sự hướng dẫn tận tình của cô giáo và sự động viên của gia đình."</p>
                
                <p>Theo cô Nguyễn Thị Lan, giáo viên chủ nhiệm lớp 5A, em Minh An là học sinh có năng khiếu về toán học, luôn tích cực tham gia các hoạt động học tập và có tinh thần trách nhiệm cao.</p>
                
                <h3>Khen thưởng và động viên</h3>
                <p>Nhà trường đã tổ chức buổi lễ khen thưởng và trao giải cho em Minh An. Ban Giám hiệu đã tặng giấy khen và phần thưởng để ghi nhận thành tích xuất sắc của em.</p>
                
                <p>Thầy Hiệu trưởng Trần Văn Nam cho biết: "Đây là niềm tự hào của toàn thể thầy cô và học sinh nhà trường. Chúng tôi hy vọng em Minh An sẽ tiếp tục phát huy năng lực và đạt được nhiều thành tích cao hơn nữa trong tương lai."</p>
            `,
            category: 'Tiểu học',
            date: '2024-10-20',
            author: 'Khối Tiểu học',
            thumbnail: '/images/hero_backround.jpg',
            images: ['/images/hero_backround.jpg', '/images/logo_amis.png'],
            views: 1250,
            tags: ['Toán học', 'Giải thưởng', 'Học sinh giỏi'],
        },
        {
            id: 2,
            title: 'Khai giảng năm học 2024-2025 - Chào đón các em học sinh lớp 1',
            excerpt: 'Lễ khai giảng đặc biệt dành cho các em học sinh lớp 1 với nhiều hoạt động vui chơi và làm quen',
            content: `
                <p>Sáng ngày 5/9/2024, trường AMIS đã tổ chức Lễ khai giảng năm học mới 2024-2025 với chủ đề "Chào đón các em học sinh lớp 1 - Bước vào ngôi trường mới".</p>
                
                <p>Năm học này, trường đón 120 học sinh lớp 1 chia thành 4 lớp. Các em đã được tham gia nhiều hoạt động vui chơi, làm quen với thầy cô và bạn bè trong không khí tràn đầy niềm vui.</p>
                
                <h3>Chương trình đặc biệt</h3>
                <p>Lễ khai giảng năm nay có nhiều hoạt động đặc biệt dành cho các em học sinh lớp 1:</p>
                <ul>
                    <li>Đón chào các em với những món quà ý nghĩa</li>
                    <li>Tham quan các phòng học và khu vui chơi</li>
                    <li>Làm quen với thầy cô giáo và bạn bè</li>
                    <li>Tham gia các trò chơi tập thể</li>
                </ul>
                
                <h3>Thông điệp từ Ban Giám hiệu</h3>
                <p>Thầy Hiệu trưởng Trần Văn Nam đã gửi lời chúc mừng đến các em học sinh lớp 1: "Các em là những mầm non tương lai của đất nước. Nhà trường cam kết sẽ đồng hành cùng các em trên con đường học tập, giúp các em phát triển toàn diện cả về kiến thức và kỹ năng sống."</p>
                
                <p>Phụ huynh học sinh cũng bày tỏ sự hài lòng về chương trình khai giảng ý nghĩa và môi trường học tập thân thiện của nhà trường.</p>
            `,
            category: 'Tiểu học',
            date: '2024-09-05',
            author: 'Ban Giám hiệu',
            thumbnail: '/images/hero_backround.jpg',
            images: ['/images/hero_backround.jpg'],
            views: 2100,
            tags: ['Khai giảng', 'Lớp 1', 'Năm học mới'],
        },
    ];

    const article = newsArticles.find((a) => a.id === newsId);

    if (!article) {
        return (
            <Container maxWidth="lg" sx={{ py: 8 }}>
                <Typography variant="h4" sx={{ textAlign: 'center', mb: 4 }}>
                    Không tìm thấy bài viết
                </Typography>
                <Box sx={{ textAlign: 'center' }}>
                    <Button
                        variant="contained"
                        startIcon={<ArrowBackIcon />}
                        onClick={() => router.push('/news')}
                        sx={{
                            bgcolor: 'var(--primary-color)',
                            '&:hover': { bgcolor: 'var(--accent-color)' },
                        }}
                    >
                        Quay lại danh sách tin tức
                    </Button>
                </Box>
            </Container>
        );
    }

    // Tin tức liên quan (cùng danh mục, trừ bài hiện tại)
    const relatedNews = newsArticles.filter((a) => a.category === article.category && a.id !== article.id).slice(0, 3);

    return (
        <Box sx={{ bgcolor: 'var(--background)', minHeight: '100vh' }}>
            <Container maxWidth="lg" sx={{ py: 6 }}>
                {/* Back Button */}
                <Button
                    startIcon={<ArrowBackIcon />}
                    onClick={() => router.push('/news')}
                    sx={{ mb: 3, color: 'var(--primary-color)' }}
                >
                    Quay lại
                </Button>

                <Grid container spacing={4}>
                    {/* Main Content */}
                    <Grid size={{ xs: 12, md: 8 }}>
                        <Card sx={{ p: 4 }}>
                            {/* Category & Tags */}
                            <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
                                <Chip
                                    label={article.category}
                                    sx={{ bgcolor: 'var(--primary-color)', color: 'white', fontWeight: 600 }}
                                />
                                {article.tags.map((tag) => (
                                    <Chip key={tag} label={tag} size="small" variant="outlined" />
                                ))}
                            </Box>

                            {/* Title */}
                            <Typography variant="h3" sx={{ fontWeight: 700, mb: 3, lineHeight: 1.3 }}>
                                {article.title}
                            </Typography>

                            {/* Meta Info */}
                            <Box sx={{ display: 'flex', gap: 3, mb: 3, flexWrap: 'wrap', color: '#666' }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                    <CalendarTodayIcon sx={{ fontSize: 18 }} />
                                    <Typography variant="body2">{article.date}</Typography>
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                    <PersonIcon sx={{ fontSize: 18 }} />
                                    <Typography variant="body2">{article.author}</Typography>
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                    <VisibilityIcon sx={{ fontSize: 18 }} />
                                    <Typography variant="body2">{article.views} lượt xem</Typography>
                                </Box>
                            </Box>

                            <Divider sx={{ mb: 3 }} />

                            {/* Featured Image */}
                            <Box sx={{ mb: 4 }}>
                                <Image
                                    src={article.thumbnail}
                                    alt={article.title}
                                    style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
                                />
                            </Box>

                            {/* Content */}
                            <Box
                                sx={{
                                    '& p': { mb: 2, lineHeight: 1.8, fontSize: '1.1rem' },
                                    '& h3': { mt: 4, mb: 2, fontWeight: 700, color: 'var(--primary-color)' },
                                    '& ul': { pl: 3, mb: 2 },
                                    '& li': { mb: 1, lineHeight: 1.8 },
                                }}
                                dangerouslySetInnerHTML={{ __html: article.content }}
                            />

                            <Divider sx={{ my: 4 }} />

                            {/* Share Button */}
                            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                <Button
                                    variant="outlined"
                                    startIcon={<ShareIcon />}
                                    sx={{
                                        borderColor: 'var(--primary-color)',
                                        color: 'var(--primary-color)',
                                        '&:hover': {
                                            borderColor: 'var(--accent-color)',
                                            bgcolor: 'rgba(124, 179, 66, 0.05)',
                                        },
                                    }}
                                >
                                    Chia sẻ bài viết
                                </Button>
                            </Box>
                        </Card>
                    </Grid>

                    {/* Sidebar */}
                    <Grid size={{ xs: 12, md: 4 }}>
                        {/* Related News */}
                        {relatedNews.length > 0 && (
                            <Card sx={{ p: 3 }}>
                                <Typography variant="h5" sx={{ fontWeight: 700, mb: 3, color: 'var(--primary-color)' }}>
                                    Tin tức liên quan
                                </Typography>
                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                    {relatedNews.map((news) => (
                                        <Card
                                            key={news.id}
                                            sx={{
                                                cursor: 'pointer',
                                                transition: 'transform 0.3s, box-shadow 0.3s',
                                                '&:hover': {
                                                    transform: 'translateY(-2px)',
                                                    boxShadow: 2,
                                                },
                                            }}
                                            onClick={() => {
                                                router.push(`/news/${news.id}`);
                                                window.scrollTo({ top: 0, behavior: 'smooth' });
                                            }}
                                        >
                                            <CardMedia
                                                component="img"
                                                height={120}
                                                image={news.thumbnail}
                                                alt={news.title}
                                                sx={{ objectFit: 'cover' }}
                                            />
                                            <CardContent>
                                                <Typography
                                                    variant="subtitle2"
                                                    sx={{
                                                        fontWeight: 600,
                                                        overflow: 'hidden',
                                                        textOverflow: 'ellipsis',
                                                        display: '-webkit-box',
                                                        WebkitLineClamp: 2,
                                                        WebkitBoxOrient: 'vertical',
                                                    }}
                                                >
                                                    {news.title}
                                                </Typography>
                                                <Typography
                                                    variant="caption"
                                                    sx={{ color: '#666', mt: 1, display: 'block' }}
                                                >
                                                    {news.date}
                                                </Typography>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </Box>
                            </Card>
                        )}
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}
