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
    IconButton,
    CircularProgress,
} from '@mui/material';
import {
    ArrowBack as ArrowBackIcon,
    Save as SaveIcon,
    CloudUpload as CloudUploadIcon,
    Close as CloseIcon,
} from '@mui/icons-material';

const documentTypes = ['Thông tư', 'Quyết định', 'Quy chế', 'Kế hoạch', 'Quy định', 'Hướng dẫn'];
const documentFields = ['Quản lý giáo dục', 'Tuyển sinh', 'Đánh giá', 'Kế hoạch', 'Học sinh', 'Chương trình'];

export default function UpdateDocumentPage() {
    const router = useRouter();
    const params = useParams();
    const documentId = params?.id as string;
    const [formData, setFormData] = useState({
        title: '',
        type: '',
        number: '',
        date: '',
        field: '',
        summary: '',
        fileUrl: '',
        file: null as File | null,
        fileType: 'pdf',
        isNew: false,
    });
    const [dragActive, setDragActive] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const [filePreview, setFilePreview] = useState<string | null>(null);

    useEffect(() => {
        const loadDocument = async () => {
            try {
                const res = await fetch(`/api/admin/documents/${documentId}`);
                if (!res.ok) throw new Error('Error loading document');
                const data = await res.json();
                setFormData({
                    title: data.title,
                    type: data.type,
                    number: data.number,
                    date: data.date.split('T')[0], // Format date input
                    field: data.field,
                    summary: data.summary || '',
                    fileUrl: data.fileUrl,
                    file: null,
                    fileType: data.fileType,
                    isNew: data.isNew || false,
                });
                setFilePreview(data.fileUrl); // Preview existing URL
                setLoading(false);
            } catch (err) {
                setError((err as Error).message || 'Lỗi tải dữ liệu');
                setLoading(false);
            }
        };

        if (documentId) {
            loadDocument();
        }
    }, [documentId]);

    const handleChange = (field: string, value: string | File | null | boolean) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setDragActive(true);
        } else if (e.type === 'dragleave') {
            setDragActive(false);
        }
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        const files = e.dataTransfer.files;
        if (files && files.length > 0) {
            handleFiles(files);
        }
    };

    const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            handleFiles(e.target.files);
        }
    };

    const handleFiles = (files: FileList) => {
        const fileArray = Array.from(files).filter((file) =>
            [
                'application/pdf',
                'application/msword',
                'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            ].includes(file.type),
        );

        if (fileArray.length === 0) {
            setError('Vui lòng chọn file PDF, DOC hoặc DOCX');
            return;
        }

        const file = fileArray[0];
        setFormData((prev) => ({
            ...prev,
            file,
            fileType: file.name.split('.').pop() as 'pdf' | 'doc' | 'docx',
        }));
        setFilePreview(URL.createObjectURL(file));
        setError('');
    };

    const handleRemoveFile = () => {
        setFormData((prev) => ({ ...prev, file: null, fileType: 'pdf' }));
        setFilePreview(formData.fileUrl || null); // Back to old URL
    };

    const handleSave = async () => {
        setError('');
        if (!formData.title || !formData.type || !formData.number || !formData.date || !formData.field) {
            setError('Vui lòng điền đầy đủ các trường bắt buộc');
            return;
        }

        const submitData = new FormData();
        submitData.append('title', formData.title);
        submitData.append('type', formData.type);
        submitData.append('number', formData.number);
        submitData.append('date', formData.date);
        submitData.append('field', formData.field);
        submitData.append('summary', formData.summary);
        submitData.append('fileType', formData.fileType);
        submitData.append('isNew', formData.isNew.toString());

        if (formData.file) {
            submitData.append('file', formData.file); // New file
        }

        try {
            const res = await fetch(`/api/admin/documents/${documentId}`, {
                method: 'PUT',
                body: submitData,
            });
            if (!res.ok) {
                const err = await res.json();
                setError(err.error || 'Lỗi cập nhật tài liệu');
                return;
            }
            router.push('/admin/documents');
        } catch (err) {
            setError((err as Error).message || 'Có lỗi xảy ra. Vui lòng thử lại.');
        }
    };

    const handleCancel = () => {
        router.push('/admin/documents');
    };

    if (loading) {
        return (
            <Box
                sx={{
                    py: 4,
                    bgcolor: 'var(--background)',
                    minHeight: '100vh',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <CircularProgress />
            </Box>
        );
    }

    if (error && error === 'Không tìm thấy tài liệu') {
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
                        Cập nhật thông tin tài liệu trong hệ thống
                    </Typography>
                </Box>

                {/* Error Alert */}
                {error && (
                    <Alert severity="error" sx={{ mb: 3 }}>
                        {error}
                    </Alert>
                )}

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

                        {/* File Upload - Drag & Drop */}
                        <Grid size={{ xs: 12 }}>
                            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
                                Tải lên tài liệu {formData.file ? '(Tùy chọn)' : '*'}
                            </Typography>
                            <Box
                                onDragEnter={handleDrag}
                                onDragLeave={handleDrag}
                                onDragOver={handleDrag}
                                onDrop={handleDrop}
                                sx={{
                                    border: '2px dashed',
                                    borderColor: dragActive ? 'var(--primary-color)' : '#ccc',
                                    borderRadius: 2,
                                    p: 3,
                                    textAlign: 'center',
                                    cursor: 'pointer',
                                    bgcolor: dragActive ? 'rgba(124, 179, 66, 0.05)' : 'transparent',
                                    transition: 'all 0.3s ease',
                                }}
                            >
                                <input
                                    type="file"
                                    accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                                    onChange={handleFileInputChange}
                                    style={{ display: 'none' }}
                                    id="file-input"
                                />
                                <label htmlFor="file-input" style={{ cursor: 'pointer', display: 'block' }}>
                                    <CloudUploadIcon sx={{ fontSize: 48, color: 'var(--primary-color)', mb: 1 }} />
                                    <Typography variant="body1" sx={{ fontWeight: 600 }}>
                                        Kéo thả tài liệu vào đây hoặc nhấp để chọn
                                    </Typography>
                                    <Typography variant="caption" sx={{ color: '#999' }}>
                                        Hỗ trợ các định dạng: PDF, DOC, DOCX
                                    </Typography>
                                </label>
                            </Box>
                        </Grid>

                        {/* File Preview - New File */}
                        {filePreview && formData.file && (
                            <Grid size={{ xs: 12 }}>
                                <Card
                                    sx={{
                                        p: 2,
                                        bgcolor: 'rgba(124, 179, 66, 0.05)',
                                        border: '1px solid var(--primary-color)',
                                    }}
                                >
                                    <Box
                                        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
                                    >
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                            <Box
                                                sx={{
                                                    width: 40,
                                                    height: 40,
                                                    borderRadius: 1,
                                                    bgcolor: 'var(--primary-color)',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    color: 'white',
                                                    fontWeight: 700,
                                                }}
                                            >
                                                {formData.fileType.toUpperCase().charAt(0)}
                                            </Box>
                                            <Box>
                                                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                                    {filePreview}
                                                </Typography>
                                                <Typography variant="caption" sx={{ color: '#999' }}>
                                                    Loại: {formData.fileType.toUpperCase()}
                                                </Typography>
                                            </Box>
                                        </Box>
                                        <IconButton
                                            size="small"
                                            onClick={handleRemoveFile}
                                            sx={{
                                                bgcolor: '#d32f2f',
                                                color: '#fff',
                                                '&:hover': { bgcolor: '#b71c1c' },
                                            }}
                                        >
                                            <CloseIcon />
                                        </IconButton>
                                    </Box>
                                </Card>
                            </Grid>
                        )}

                        {/* Existing File Display */}
                        {!formData.file && (
                            <Grid size={{ xs: 12 }}>
                                <Card
                                    sx={{
                                        p: 2,
                                        bgcolor: 'rgba(33, 150, 243, 0.05)',
                                        border: '1px solid rgba(33, 150, 243, 0.3)',
                                    }}
                                >
                                    <Box
                                        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
                                    >
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                            <Box
                                                sx={{
                                                    width: 40,
                                                    height: 40,
                                                    borderRadius: 1,
                                                    bgcolor: 'rgba(33, 150, 243, 0.8)',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    color: 'white',
                                                    fontWeight: 700,
                                                }}
                                            >
                                                {formData.fileType.toUpperCase().charAt(0)}
                                            </Box>
                                            <Box>
                                                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                                    {filePreview}
                                                </Typography>
                                                <Typography variant="caption" sx={{ color: '#999' }}>
                                                    File hiện tại - Loại: {formData.fileType.toUpperCase()}
                                                </Typography>
                                            </Box>
                                        </Box>
                                        <Button
                                            size="small"
                                            variant="outlined"
                                            color="error"
                                            onClick={handleRemoveFile}
                                            sx={{ minWidth: 'auto' }}
                                        >
                                            Thay thế
                                        </Button>
                                    </Box>
                                </Card>
                            </Grid>
                        )}

                        {/* Divider */}
                        <Grid size={{ xs: 12 }}>
                            <Box sx={{ borderTop: '1px solid #e0e0e0', my: 2 }} />
                        </Grid>

                        {/* Action Buttons */}
                        <Grid size={{ xs: 12 }}>
                            <Stack direction="row" spacing={2} justifyContent="flex-end">
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
                                        Cập Nhật Tài Liệu
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
                        <br />
                        • File hiện tại sẽ được giữ nguyên nếu không tải lên file mới
                        <br />• Nhấn &ldquo;Xóa Tài Liệu&rdquo; để xóa vĩnh viễn tài liệu này khỏi hệ thống
                    </Typography>
                </Card>
            </Container>
        </Box>
    );
}
