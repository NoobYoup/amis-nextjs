'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
    Box,
    Container,
    Typography,
    TextField,
    Button,
    Paper,
    Stack,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Grid,
    Card,
    CardMedia,
    IconButton,
    Alert,
    SelectChangeEvent,
} from '@mui/material';
import { Close as CloseIcon, CloudUpload as CloudUploadIcon } from '@mui/icons-material';
import { ActivityFormData } from '@/types/activity';

const categories = ['Học thuật', 'Thể thao', 'Văn nghệ', 'Ngoại khóa'];

export default function AddActivityPage() {
    const router = useRouter();
    const [formData, setFormData] = useState<Partial<ActivityFormData>>({
        title: '',
        description: '',
        category: '',
        date: '',
        author: '',
        images: [],
        videos: [],
    });
    const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
    const [imagePreviews, setImagePreviews] = useState<string[]>([]);
    const [dragActive, setDragActive] = useState(false);
    const [error, setError] = useState('');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSelectChange = (e: SelectChangeEvent) => {
        setFormData((prev) => ({ ...prev, category: e.target.value }));
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
        const fileArray = Array.from(files).filter((file) => file.type.startsWith('image/'));
        let loadedCount = 0;
        const newPreviews: string[] = [];
        const newImages: File[] = [];

        if (fileArray.length === 0) return;

        fileArray.forEach((file, index) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                if (e.target?.result) {
                    newPreviews[index] = e.target.result as string;
                    loadedCount++;

                    // Update state only when all files are loaded
                    if (loadedCount === fileArray.length) {
                        setImagePreviews((prev) => [...prev, ...newPreviews]);
                        setFormData((prev) => ({
                            ...prev,
                            images: [...(prev.images || []), ...newImages],
                        }));
                    }
                }
            };
            reader.onerror = () => {
                console.error(`Failed to read file: ${file.name}`);
                loadedCount++;
                if (loadedCount === fileArray.length) {
                    setImagePreviews((prev) => [...prev, ...newPreviews.filter((p) => p)]);
                    setFormData((prev) => ({
                        ...prev,
                        images: [...(prev.images || []), ...newImages],
                    }));
                }
            };
            reader.readAsDataURL(file);
            newImages.push(file);
        });
    };

    const handleRemoveImage = (index: number) => {
        setImagePreviews((prev) => prev.filter((_, i) => i !== index));
        setFormData((prev) => ({
            ...prev,
            images: (prev.images || []).filter((_, i) => i !== index),
        }));
    };

    const handleSetThumbnail = (index: number) => {
        setThumbnailPreview(imagePreviews[index]);
        setFormData((prev) => ({
            ...prev,
            thumbnail: prev.images?.[index] || '',
        }));
    };

    const validateForm = () => {
        if (!formData.title?.trim()) {
            setError('Vui lòng nhập tiêu đề');
            return false;
        }
        if (!formData.description?.trim()) {
            setError('Vui lòng nhập mô tả');
            return false;
        }
        if (!formData.category) {
            setError('Vui lòng chọn danh mục');
            return false;
        }
        if (!formData.date) {
            setError('Vui lòng chọn ngày');
            return false;
        }
        if (!formData.author?.trim()) {
            setError('Vui lòng nhập tác giả');
            return false;
        }
        if (!imagePreviews.length) {
            setError('Vui lòng tải lên ít nhất một hình ảnh');
            return false;
        }
        setError('');
        return true;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validateForm()) {
            console.log('Form data:', formData);
            router.push('/admin/activities');
        }
    };

    return (
        <Box sx={{ py: 4, bgcolor: 'var(--background)', minHeight: '100vh' }}>
            <Container maxWidth="lg">
                <Typography variant="h4" sx={{ fontWeight: 700, mb: 4, color: 'var(--foreground)' }}>
                    Thêm hoạt động mới
                </Typography>

                {error && (
                    <Alert severity="error" sx={{ mb: 3 }}>
                        {error}
                    </Alert>
                )}

                <Paper sx={{ p: 4 }}>
                    <form onSubmit={handleSubmit}>
                        <Stack spacing={3}>
                            {/* Title */}
                            <TextField
                                fullWidth
                                label="Tiêu đề"
                                name="title"
                                value={formData.title || ''}
                                onChange={handleInputChange}
                                required
                                placeholder="Hội thảo khoa học quốc tế 2025"
                            />

                            {/* Description */}
                            <TextField
                                fullWidth
                                label="Mô tả"
                                name="description"
                                value={formData.description || ''}
                                onChange={handleInputChange}
                                multiline
                                rows={4}
                                required
                                placeholder="Học sinh AMIS tham gia hội thảo khoa học quốc tế với nhiều nghiên cứu xuất sắc"
                            />

                            {/* Category */}
                            <FormControl fullWidth>
                                <InputLabel>Danh mục</InputLabel>
                                <Select
                                    value={formData.category || ''}
                                    onChange={handleSelectChange}
                                    label="Danh mục"
                                    required
                                >
                                    {categories.map((cat) => (
                                        <MenuItem key={cat} value={cat}>
                                            {cat}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>

                            {/* Date */}
                            <TextField
                                fullWidth
                                label="Ngày"
                                name="date"
                                type="date"
                                value={formData.date || ''}
                                onChange={handleInputChange}
                                InputLabelProps={{ shrink: true }}
                                required
                            />

                            {/* Author */}
                            <TextField
                                fullWidth
                                label="Tác giả"
                                name="author"
                                value={formData.author || ''}
                                onChange={handleInputChange}
                                required
                                placeholder="Amis School"
                            />

                            {/* Video URLs */}
                            <TextField
                                fullWidth
                                label="URL Video YouTube (tùy chọn)"
                                name="videos"
                                value={formData.videos || ''}
                                onChange={handleInputChange}
                                placeholder="https://www.youtube.com/embed/... (mỗi URL trên một dòng)"
                                multiline
                                rows={2}
                                helperText="Nhập nhiều URL, mỗi URL trên một dòng"
                            />

                            {/* Image Upload */}
                            <Box>
                                <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
                                    Tải lên hình ảnh
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
                                        multiple
                                        accept="image/*"
                                        onChange={handleFileInputChange}
                                        style={{ display: 'none' }}
                                        id="file-input"
                                    />
                                    <label htmlFor="file-input" style={{ cursor: 'pointer', display: 'block' }}>
                                        <CloudUploadIcon sx={{ fontSize: 48, color: 'var(--primary-color)', mb: 1 }} />
                                        <Typography variant="body1" sx={{ fontWeight: 600 }}>
                                            Kéo thả hình ảnh vào đây hoặc nhấp để chọn
                                        </Typography>
                                        <Typography variant="caption" sx={{ color: '#999' }}>
                                            Hỗ trợ các định dạng: JPG, PNG, GIF, WebP
                                        </Typography>
                                    </label>
                                </Box>
                            </Box>

                            {/* Image Previews */}
                            {imagePreviews.length > 0 && (
                                <Box>
                                    <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
                                        Hình ảnh đã tải lên ({imagePreviews.length})
                                    </Typography>
                                    <Grid container spacing={2}>
                                        {imagePreviews.map((preview, index) => (
                                            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
                                                <Card>
                                                    <Box sx={{ position: 'relative' }}>
                                                        <CardMedia
                                                            component="img"
                                                            height="200"
                                                            image={preview}
                                                            alt={`Preview ${index}`}
                                                            sx={{ objectFit: 'cover' }}
                                                        />
                                                        <Box
                                                            sx={{
                                                                position: 'absolute',
                                                                top: 0,
                                                                right: 0,
                                                                display: 'flex',
                                                                gap: 1,
                                                            }}
                                                        >
                                                            <Button
                                                                size="small"
                                                                variant="contained"
                                                                onClick={() => handleSetThumbnail(index)}
                                                                sx={{
                                                                    bgcolor:
                                                                        thumbnailPreview === preview
                                                                            ? 'var(--primary-color)'
                                                                            : '#666',
                                                                    m: 1,
                                                                }}
                                                            >
                                                                {thumbnailPreview === preview ? 'Đã chọn' : 'Chọn'}
                                                            </Button>
                                                            <IconButton
                                                                size="small"
                                                                onClick={() => handleRemoveImage(index)}
                                                                sx={{
                                                                    bgcolor: '#d32f2f',
                                                                    color: '#fff',
                                                                    m: 1,
                                                                    '&:hover': { bgcolor: '#b71c1c' },
                                                                }}
                                                            >
                                                                <CloseIcon />
                                                            </IconButton>
                                                        </Box>
                                                    </Box>
                                                </Card>
                                            </Grid>
                                        ))}
                                    </Grid>
                                </Box>
                            )}

                            {/* Buttons */}
                            <Stack direction="row" spacing={2} sx={{ mt: 4 }}>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    sx={{
                                        bgcolor: 'var(--primary-color)',
                                        '&:hover': { bgcolor: 'var(--accent-color)' },
                                    }}
                                >
                                    Thêm hoạt động
                                </Button>
                                <Button variant="outlined" onClick={() => router.push('/admin/activities')}>
                                    Hủy
                                </Button>
                            </Stack>
                        </Stack>
                    </form>
                </Paper>
            </Container>
        </Box>
    );
}
