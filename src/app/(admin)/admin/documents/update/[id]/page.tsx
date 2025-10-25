'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import {
    Box,
    Container,
    Typography,
    TextField,
    MenuItem,
    Button,
    Card,
    Grid,
    Stack,
    Breadcrumbs,
    Link,
    Alert,
} from '@mui/material';
import { ArrowBack as ArrowBackIcon, Save as SaveIcon, Delete as DeleteIcon } from '@mui/icons-material';

const documentTypes = ['Thông tư', 'Quyết định', 'Quy chế', 'Kế hoạch', 'Quy định', 'Hướng dẫn'];
const documentFields = ['Quản lý giáo dục', 'Tuyển sinh', 'Đánh giá', 'Kế hoạch', 'Học sinh', 'Chương trình'];

// Mock data - replace with API call
const mockDocuments = {
    1: {
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
    2: {
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
};

export default function UpdateDocumentPage() {
    const router = useRouter();
    const params = useParams();
    const id = params?.id as string;

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        title: '',
        type: '',
        number: '',
        date: '',
        field: '',
        summary: '',
        fileUrl: '',
        fileType: 'pdf',
        isNew: false,
    });

    useEffect(() => {
        if (id) {
            // TODO: Replace with API call
            const doc = mockDocuments[id];
            if (doc) {
                setFormData(doc);
                setLoading(false);
            } else {
                setError('Không tìm thấy tài liệu');
                setLoading(false);
            }
        }
    }, [id]);

    const handleChange = (field: string, value: any) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleSave = () => {
        // Validate required fields
        if (!formData.title || !formData.type || !formData.number || !formData.date || !formData.field) {
            alert('Vui lòng điền đầy đủ các trường bắt buộc');
            return;
        }
        // TODO: Call API to update document
        console.log('Updating document:', formData);
        router.push('/admin/documents');
    };

    const handleDelete = () => {
        if (confirm('Bạn có chắc chắn muốn xóa tài liệu này?')) {
            // TODO: Call API to delete document
            console.log('Deleting document:', id);
            router.push('/admin/documents');
        }
    };

    const handleCancel = () => {
        router.back();
    };

    if (loading) {
        return (
            <Box sx={{ py: 4, bgcolor: 'var(--background)', minHeight: '100vh' }}>
                <Container maxWidth="lg">
                    <Typography>Đang tải...</Typography>
                </Container>
            </Box>
        );
    }

    if (error) {
        return (
            <Box sx={{ py: 4, bgcolor: 'var(--background)', minHeight: '100vh' }}>
                <Container maxWidth="lg">
                    <Alert severity="error">{error}</Alert>
                    <Button
                        variant="outlined"
                        startIcon={<ArrowBackIcon />}
                        onClick={() => router.push('/admin/documents')}
                        sx={{ mt: 2 }}
                    >
                        Quay Lại
                    </Button>
                </Container>
            </Box>
        );
    }

    return (
        <Box sx={{ py: 4, bgcolor: 'var(--background)', minHeight: '100vh' }}>
            <Container maxWidth="lg">
                {/* Breadcrumb */}
                <Breadcrumbs sx={{ mb: 3 }}>
                    <Link
                        component="button"
                        variant="body2"
                        onClick={() => router.push('/admin/documents')}
                        sx={{ cursor: 'pointer', color: 'var(--primary-color)', textDecoration: 'none' }}
                    >
                        Quản Lý Tài Liệu
                    </Link>
                    <Typography variant="body2" sx={{ color: 'var(--foreground)' }}>
                        Chỉnh Sửa Tài Liệu
                    </Typography>
                </Breadcrumbs>

                {/* Header */}
                <Box sx={{ mb: 4 }}>
                    <Typography variant="h4" sx={{ fontWeight: 700, color: 'var(--foreground)' }}>
                        Chỉnh Sửa Tài Liệu Văn Bản
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#666', mt: 1 }}>
                        Cập nhật thông tin tài liệu
                    </Typography>
                </Box>

                {/* Form Card */}
                <Card sx={{ p: 4 }}>
                    <Grid container spacing={3}>
                        {/* Tiêu Đề */}
                        <Grid size={{ xs: 12 }}>
                            <TextField
                                fullWidth
                                label="Tiêu Đề *"
                                value={formData.title}
                                onChange={(e) => handleChange('title', e.target.value)}
                                multiline
                                rows={3}
                                placeholder="Nhập tiêu đề tài liệu..."
                                helperText="Tiêu đề đầy đủ của tài liệu"
                            />
                        </Grid>

                        {/* Loại Văn Bản & Số Văn Bản */}
                        <Grid size={{ xs: 12, md: 6 }}>
                            <TextField
                                fullWidth
                                select
                                label="Loại Văn Bản *"
                                value={formData.type}
                                onChange={(e) => handleChange('type', e.target.value)}
                                required
                            >
                                {documentTypes.map((type) => (
                                    <MenuItem key={type} value={type}>
                                        {type}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid size={{ xs: 12, md: 6 }}>
                            <TextField
                                fullWidth
                                label="Số Văn Bản *"
                                value={formData.number}
                                onChange={(e) => handleChange('number', e.target.value)}
                                placeholder="09/2024/TT-BGDĐT"
                                helperText="Ví dụ: 09/2024/TT-BGDĐT"
                            />
                        </Grid>

                        {/* Ngày Ban Hành & Lĩnh Vực */}
                        <Grid size={{ xs: 12, md: 6 }}>
                            <TextField
                                fullWidth
                                label="Ngày Ban Hành *"
                                type="date"
                                value={formData.date}
                                onChange={(e) => handleChange('date', e.target.value)}
                                InputLabelProps={{ shrink: true }}
                                required
                            />
                        </Grid>
                        <Grid size={{ xs: 12, md: 6 }}>
                            <TextField
                                fullWidth
                                select
                                label="Lĩnh Vực *"
                                value={formData.field}
                                onChange={(e) => handleChange('field', e.target.value)}
                                required
                            >
                                {documentFields.map((field) => (
                                    <MenuItem key={field} value={field}>
                                        {field}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>

                        {/* Tóm Tắt */}
                        <Grid size={{ xs: 12 }}>
                            <TextField
                                fullWidth
                                label="Tóm Tắt"
                                value={formData.summary}
                                onChange={(e) => handleChange('summary', e.target.value)}
                                multiline
                                rows={4}
                                placeholder="Nhập tóm tắt nội dung tài liệu..."
                                helperText="Mô tả ngắn gọn nội dung chính của tài liệu"
                            />
                        </Grid>

                        {/* Đường Dẫn File & Loại File */}
                        <Grid size={{ xs: 12, md: 8 }}>
                            <TextField
                                fullWidth
                                label="Đường Dẫn File"
                                value={formData.fileUrl}
                                onChange={(e) => handleChange('fileUrl', e.target.value)}
                                placeholder="/files/document.pdf"
                                helperText="Đường dẫn đến file tài liệu"
                            />
                        </Grid>
                        <Grid size={{ xs: 12, md: 4 }}>
                            <TextField
                                fullWidth
                                select
                                label="Loại File"
                                value={formData.fileType}
                                onChange={(e) => handleChange('fileType', e.target.value)}
                            >
                                <MenuItem value="pdf">PDF</MenuItem>
                                <MenuItem value="doc">DOC</MenuItem>
                                <MenuItem value="docx">DOCX</MenuItem>
                            </TextField>
                        </Grid>

                        {/* Divider */}
                        <Grid size={{ xs: 12 }}>
                            <Box sx={{ borderTop: '1px solid #e0e0e0', my: 2 }} />
                        </Grid>

                        {/* Action Buttons */}
                        <Grid size={{ xs: 12 }}>
                            <Stack direction="row" spacing={2} justifyContent="space-between">
                                <Button
                                    variant="outlined"
                                    startIcon={<DeleteIcon />}
                                    onClick={handleDelete}
                                    sx={{ color: '#d32f2f', borderColor: '#d32f2f' }}
                                >
                                    Xóa Tài Liệu
                                </Button>
                                <Stack direction="row" spacing={2}>
                                    <Button
                                        variant="outlined"
                                        startIcon={<ArrowBackIcon />}
                                        onClick={handleCancel}
                                        sx={{ color: '#666', borderColor: '#ddd' }}
                                    >
                                        Hủy
                                    </Button>
                                    <Button
                                        variant="contained"
                                        startIcon={<SaveIcon />}
                                        onClick={handleSave}
                                        sx={{ bgcolor: 'var(--primary-color)' }}
                                    >
                                        Cập Nhật
                                    </Button>
                                </Stack>
                            </Stack>
                        </Grid>
                    </Grid>
                </Card>

                {/* Info Box */}
                <Card
                    sx={{
                        p: 3,
                        mt: 4,
                        bgcolor: 'rgba(124, 179, 66, 0.08)',
                        border: '1px solid rgba(124, 179, 66, 0.2)',
                    }}
                >
                    <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'var(--primary-color)', mb: 1 }}>
                        ℹ️ Hướng dẫn
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#666', lineHeight: 1.8 }}>
                        • Các trường có dấu <span style={{ color: '#d32f2f' }}>*</span> là bắt buộc
                        <br />
                        • Tiêu đề nên đầy đủ và mô tả rõ nội dung tài liệu
                        <br />
                        • Số văn bản phải theo định dạng chuẩn (ví dụ: 09/2024/TT-BGDĐT)
                        <br />
                        • Tóm tắt giúp người dùng nhanh chóng hiểu nội dung chính
                        <br />• Nhấn "Xóa Tài Liệu" để xóa vĩnh viễn tài liệu này khỏi hệ thống
                    </Typography>
                </Card>
            </Container>
        </Box>
    );
}
