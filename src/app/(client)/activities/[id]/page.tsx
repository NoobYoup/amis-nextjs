'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PersonIcon from '@mui/icons-material/Person';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CloseIcon from '@mui/icons-material/Close';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

interface Activity {
    id: number;
    title: string;
    description: string;
    content: string;
    category: string;
    date: string;
    author: string;
    thumbnail: string;
    images: string[];
    videoUrl?: string;
}

export default function ActivityDetailPage() {
    const params = useParams();
    const router = useRouter();
    const [openGallery, setOpenGallery] = useState(false);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);

    // Dữ liệu mẫu - sau này sẽ lấy từ API theo ID
    const activities: Activity[] = [
        {
            id: 1,
            title: 'Hội thảo Khoa học Quốc tế 2024',
            description: 'Học sinh AMIS tham gia hội thảo khoa học quốc tế với nhiều nghiên cứu xuất sắc',
            content: `
                <p>Ngày 15/10/2024, trường AMIS đã vinh dự được tổ chức Hội thảo Khoa học Quốc tế với sự tham gia của hơn 200 học sinh và giáo viên từ nhiều quốc gia.</p>
                
                <h3>Các hoạt động chính</h3>
                <p>Hội thảo bao gồm nhiều hoạt động phong phú:</p>
                <ul>
                    <li>Trình bày các nghiên cứu khoa học của học sinh</li>
                    <li>Thảo luận nhóm về các chủ đề khoa học đương đại</li>
                    <li>Workshop về phương pháp nghiên cứu khoa học</li>
                    <li>Giao lưu với các nhà khoa học quốc tế</li>
                </ul>
                
                <h3>Thành tựu đạt được</h3>
                <p>Học sinh AMIS đã có 5 nghiên cứu được đánh giá xuất sắc và nhận giải thưởng. Đặc biệt, đề tài "Ứng dụng AI trong giáo dục" của nhóm học sinh lớp 11 đã nhận được sự quan tâm đặc biệt từ ban giám khảo.</p>
                
                <p>Sự kiện này không chỉ là cơ hội để học sinh thể hiện năng lực mà còn là dịp để các em học hỏi kinh nghiệm từ bạn bè quốc tế, mở rộng tầm nhìn và phát triển kỹ năng nghiên cứu khoa học.</p>
            `,
            category: 'Học thuật',
            date: '2024-10-15',
            author: 'Nguyễn Văn A',
            thumbnail: '/images/hero_backround.jpg',
            images: [
                '/images/hero_backround.jpg',
                '/images/logo_amis.png',
                '/images/logo_cambridge.png',
                '/images/logo_michigan.png',
            ],
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        },
        {
            id: 2,
            title: 'Giải bóng đá liên trường 2024',
            description: 'Đội tuyển AMIS giành chức vô địch giải bóng đá liên trường khu vực',
            content: `
                <p>Sau 2 tuần tranh tài căng thẳng, đội tuyển bóng đá AMIS đã xuất sắc giành chức vô địch Giải bóng đá liên trường khu vực năm 2024.</p>
                
                <h3>Hành trình chiến thắng</h3>
                <p>Đội tuyển đã vượt qua 8 đội bóng mạnh khác với thành tích ấn tượng:</p>
                <ul>
                    <li>Vòng bảng: 3 trận thắng, ghi 12 bàn, thủng lưới 2 bàn</li>
                    <li>Tứ kết: Thắng 3-1</li>
                    <li>Bán kết: Thắng 2-0</li>
                    <li>Chung kết: Thắng 4-2</li>
                </ul>
                
                <h3>Cầu thủ xuất sắc</h3>
                <p>Nguyễn Văn B (lớp 10A1) được bình chọn là cầu thủ xuất sắc nhất giải với 8 bàn thắng. Thủ môn Trần Văn C cũng có màn trình diễn ấn tượng với nhiều pha cứu thua xuất sắc.</p>
            `,
            category: 'Thể thao',
            date: '2024-10-10',
            author: 'Trần Thị B',
            thumbnail: '/images/hero_backround.jpg',
            images: ['/images/hero_backround.jpg', '/images/logo_amis.png'],
        },
        {
            id: 3,
            title: 'Đêm nhạc từ thiện',
            description: 'Chương trình văn nghệ gây quỹ ủng hộ học sinh vùng cao',
            content: `
                <p>Đêm nhạc từ thiện "Chia sẻ yêu thương" do học sinh AMIS tổ chức đã thu về hơn 500 triệu đồng để hỗ trợ học sinh vùng cao.</p>
            `,
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
            content: `
                <p>Trại hè sáng tạo 2024 đã diễn ra thành công với sự tham gia của 150 học sinh.</p>
            `,
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
            content: `
                <p>Học sinh AMIS đã xuất sắc giành giải nhất Olympic Toán học cấp quốc gia.</p>
            `,
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
            content: `
                <p>Đội tuyển cầu lông AMIS đã có màn trình diễn xuất sắc tại giải đấu.</p>
            `,
            category: 'Thể thao',
            date: '2024-09-15',
            author: 'Đỗ Thị F',
            thumbnail: '/images/hero_backround.jpg',
            images: ['/images/hero_backround.jpg'],
        },
    ];

    const activity = activities.find((a) => a.id === Number(params.id));

    if (!activity) {
        return (
            <Container maxWidth="lg" sx={{ py: 8, textAlign: 'center' }}>
                <Typography variant="h4" sx={{ mb: 2 }}>
                    Không tìm thấy hoạt động
                </Typography>
                <Button variant="contained" onClick={() => router.push('/activities')}>
                    Quay lại danh sách
                </Button>
            </Container>
        );
    }

    const handleOpenGallery = (index: number) => {
        setSelectedImageIndex(index);
        setOpenGallery(true);
    };

    const handleCloseGallery = () => {
        setOpenGallery(false);
    };

    const handlePrevImage = () => {
        setSelectedImageIndex((prev) => (prev === 0 ? activity.images.length - 1 : prev - 1));
    };

    const handleNextImage = () => {
        setSelectedImageIndex((prev) => (prev === activity.images.length - 1 ? 0 : prev + 1));
    };

    return (
        <Box sx={{ bgcolor: 'var(--background)', minHeight: '100vh', py: 4 }}>
            <Container maxWidth="lg">
                {/* Back Button */}
                <Button
                    startIcon={<ArrowBackIcon />}
                    onClick={() => router.push('/activities')}
                    sx={{ mb: 3, color: 'var(--primary-color)' }}
                >
                    Quay lại
                </Button>

                {/* Header */}
                <Box sx={{ mb: 4 }}>
                    <Box sx={{ display: 'flex', gap: 2, mb: 2, flexWrap: 'wrap', alignItems: 'center' }}>
                        <Chip
                            label={activity.category}
                            sx={{
                                bgcolor: 'var(--primary-color)',
                                color: 'white',
                                fontWeight: 600,
                            }}
                        />
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <CalendarTodayIcon sx={{ fontSize: 18, color: 'var(--primary-color)' }} />
                            <Typography variant="body2">{activity.date}</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <PersonIcon sx={{ fontSize: 18, color: 'var(--primary-color)' }} />
                            <Typography variant="body2">{activity.author}</Typography>
                        </Box>
                    </Box>
                    <Typography variant="h3" sx={{ fontWeight: 700, mb: 2, color: 'var(--secondary-color)' }}>
                        {activity.title}
                    </Typography>
                    <Typography variant="h6" sx={{ color: '#555', fontStyle: 'italic' }}>
                        {activity.description}
                    </Typography>
                </Box>

                {/* Video Section */}
                {activity.videoUrl && (
                    <Box sx={{ mb: 4 }}>
                        <Card elevation={3}>
                            <Box
                                sx={{
                                    position: 'relative',
                                    paddingTop: '56.25%', // 16:9 aspect ratio
                                    overflow: 'hidden',
                                }}
                            >
                                <iframe
                                    src={activity.videoUrl}
                                    title={activity.title}
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    style={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        width: '100%',
                                        height: '100%',
                                        border: 0,
                                    }}
                                />
                            </Box>
                        </Card>
                    </Box>
                )}

                {/* Content */}
                <Box
                    sx={{
                        mb: 4,
                        '& h3': {
                            color: 'var(--primary-color)',
                            fontWeight: 700,
                            fontSize: '1.5rem',
                            mt: 3,
                            mb: 2,
                        },
                        '& p': {
                            fontSize: '1.1rem',
                            lineHeight: 1.8,
                            mb: 2,
                            color: '#333',
                        },
                        '& ul': {
                            pl: 3,
                            mb: 2,
                        },
                        '& li': {
                            fontSize: '1.1rem',
                            lineHeight: 1.8,
                            mb: 1,
                            color: '#333',
                        },
                    }}
                    dangerouslySetInnerHTML={{ __html: activity.content }}
                />

                {/* Image Gallery */}
                <Box sx={{ mb: 4 }}>
                    <Typography variant="h4" sx={{ fontWeight: 700, mb: 3, color: 'var(--primary-color)' }}>
                        Thư viện ảnh ({activity.images.length})
                    </Typography>
                    <Grid container spacing={2}>
                        {activity.images.map((image, index) => (
                            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
                                <Card
                                    sx={{
                                        cursor: 'pointer',
                                        transition: 'transform 0.3s, box-shadow 0.3s',
                                        '&:hover': {
                                            transform: 'scale(1.05)',
                                            boxShadow: 6,
                                        },
                                    }}
                                    onClick={() => handleOpenGallery(index)}
                                >
                                    <CardMedia
                                        component="img"
                                        height="250"
                                        image={image}
                                        alt={`${activity.title} - Ảnh ${index + 1}`}
                                        sx={{ objectFit: 'cover' }}
                                    />
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Box>

                {/* Related Activities */}
                <Box>
                    <Typography variant="h4" sx={{ fontWeight: 700, mb: 3, color: 'var(--primary-color)' }}>
                        Hoạt động liên quan
                    </Typography>
                    <Grid container spacing={3}>
                        {activities
                            .filter((a) => a.id !== activity.id && a.category === activity.category)
                            .slice(0, 3)
                            .map((relatedActivity) => (
                                <Grid size={{ xs: 12, sm: 6, md: 4 }} key={relatedActivity.id}>
                                    <Card
                                        sx={{
                                            height: '100%',
                                            cursor: 'pointer',
                                            transition: 'transform 0.3s, box-shadow 0.3s',
                                            '&:hover': {
                                                transform: 'translateY(-4px)',
                                                boxShadow: 4,
                                            },
                                        }}
                                        onClick={() => router.push(`/activities/${relatedActivity.id}`)}
                                    >
                                        <CardMedia
                                            component="img"
                                            height="200"
                                            image={relatedActivity.thumbnail}
                                            alt={relatedActivity.title}
                                            sx={{ objectFit: 'cover' }}
                                        />
                                        <Box sx={{ p: 2 }}>
                                            <Chip
                                                label={relatedActivity.category}
                                                size="small"
                                                sx={{
                                                    bgcolor: 'var(--primary-color)',
                                                    color: 'white',
                                                    fontWeight: 600,
                                                    mb: 1,
                                                }}
                                            />
                                            <Typography
                                                variant="h6"
                                                sx={{
                                                    fontWeight: 700,
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                    display: '-webkit-box',
                                                    WebkitLineClamp: 2,
                                                    WebkitBoxOrient: 'vertical',
                                                }}
                                            >
                                                {relatedActivity.title}
                                            </Typography>
                                        </Box>
                                    </Card>
                                </Grid>
                            ))}
                    </Grid>
                </Box>
            </Container>

            {/* Gallery Dialog */}
            <Dialog
                open={openGallery}
                onClose={handleCloseGallery}
                maxWidth="lg"
                fullWidth
                PaperProps={{
                    sx: {
                        bgcolor: 'rgba(0, 0, 0, 0.95)',
                        boxShadow: 'none',
                    },
                }}
            >
                <DialogContent sx={{ position: 'relative', p: 0, overflow: 'hidden' }}>
                    <IconButton
                        onClick={handleCloseGallery}
                        sx={{
                            position: 'absolute',
                            top: 16,
                            right: 16,
                            color: 'white',
                            bgcolor: 'rgba(0, 0, 0, 0.5)',
                            zIndex: 1,
                            '&:hover': {
                                bgcolor: 'rgba(0, 0, 0, 0.7)',
                            },
                        }}
                    >
                        <CloseIcon />
                    </IconButton>

                    <Box
                        sx={{
                            position: 'relative',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            minHeight: '80vh',
                        }}
                    >
                        <IconButton
                            onClick={handlePrevImage}
                            sx={{
                                position: 'absolute',
                                left: 16,
                                color: 'white',
                                bgcolor: 'rgba(0, 0, 0, 0.5)',
                                '&:hover': {
                                    bgcolor: 'rgba(0, 0, 0, 0.7)',
                                },
                            }}
                        >
                            <NavigateBeforeIcon sx={{ fontSize: 40 }} />
                        </IconButton>

                        <Box
                            component="img"
                            src={activity.images[selectedImageIndex]}
                            alt={`${activity.title} - Ảnh ${selectedImageIndex + 1}`}
                            sx={{
                                maxWidth: '100%',
                                maxHeight: '80vh',
                                objectFit: 'contain',
                            }}
                        />

                        <IconButton
                            onClick={handleNextImage}
                            sx={{
                                position: 'absolute',
                                right: 16,
                                color: 'white',
                                bgcolor: 'rgba(0, 0, 0, 0.5)',
                                '&:hover': {
                                    bgcolor: 'rgba(0, 0, 0, 0.7)',
                                },
                            }}
                        >
                            <NavigateNextIcon sx={{ fontSize: 40 }} />
                        </IconButton>
                    </Box>

                    <Typography
                        sx={{
                            textAlign: 'center',
                            color: 'white',
                            py: 2,
                        }}
                    >
                        {selectedImageIndex + 1} / {activity.images.length}
                    </Typography>
                </DialogContent>
            </Dialog>
        </Box>
    );
}
