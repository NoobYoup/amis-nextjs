'use client';

import { useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Chip from '@mui/material/Chip';
import DownloadIcon from '@mui/icons-material/Download';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import SearchIcon from '@mui/icons-material/Search';

interface Document {
    id: string;
    title: string;
    type: string;
    number: string;
    date: string;
    field: string;
    summary: string | null;
    fileUrl: string;
    fileType: string;
    isNew: boolean;
    createdAt: string;
    updatedAt: string;
}

export default function DocumentsPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedYear, setSelectedYear] = useState('all');
    const [selectedType, setSelectedType] = useState('all');
    const [selectedField, setSelectedField] = useState('all');
    const [documents, setDocuments] = useState<Document[]>([]);
    const [loading, setLoading] = useState(true);
    const [years, setYears] = useState<number[]>([]);
    const [types, setTypes] = useState<string[]>([]);
    const [fields, setFields] = useState<string[]>([]);
    const [downloading, setDownloading] = useState<string | null>(null);

    const handleDownload = async (doc: Document) => {
        setDownloading(doc.id);
        try {
            const response = await fetch(`/api/download?url=${encodeURIComponent(doc.fileUrl)}`);

            if (!response.ok) {
                throw new Error('Download failed');
            }

            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `${doc.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.${doc.fileType}`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Download error:', error);
            alert('Lỗi khi tải file. Vui lòng thử lại.');
        } finally {
            setDownloading(null);
        }
    };

    // Load filters
    useEffect(() => {
        const loadFilters = async () => {
            try {
                const res = await fetch('/api/documents/filters');
                if (res.ok) {
                    const data = await res.json();
                    setYears(data.years);
                    setTypes(data.types);
                    setFields(data.fields);
                }
            } catch (err) {
                console.error('Error loading filters:', err);
            }
        };
        loadFilters();
    }, []);

    // Load documents
    useEffect(() => {
        const loadDocuments = async () => {
            setLoading(true);
            try {
                const params = new URLSearchParams();

                if (searchTerm) {
                    params.append('search', searchTerm);
                }
                if (selectedYear !== 'all') {
                    params.append('year', selectedYear);
                }
                if (selectedType !== 'all') {
                    params.append('type', selectedType);
                }
                if (selectedField !== 'all') {
                    params.append('field', selectedField);
                }

                const res = await fetch(`/api/documents?${params.toString()}`);
                if (res.ok) {
                    const { data } = await res.json();
                    console.log(data);
                    setDocuments(data);
                }
            } catch (err) {
                console.error('Error loading documents:', err);
            } finally {
                setLoading(false);
            }
        };

        loadDocuments();
    }, [searchTerm, selectedYear, selectedType, selectedField]);

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
                        Văn bản pháp quy
                    </Typography>
                    <Typography variant="h6" sx={{ textAlign: 'center', opacity: 0.9 }}>
                        Hệ thống văn bản quản lý và điều hành nhà trường
                    </Typography>
                </Container>
            </Box>

            <Container maxWidth="lg">
                <Card sx={{ p: 3, mb: 4 }}>
                    <Grid container spacing={2}>
                        <Grid size={{ xs: 12, md: 3 }}>
                            <TextField
                                fullWidth
                                placeholder="Tìm kiếm văn bản..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                InputProps={{
                                    startAdornment: <SearchIcon sx={{ mr: 1, color: '#999' }} />,
                                }}
                            />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 4, md: 3 }}>
                            <TextField
                                fullWidth
                                select
                                label="Năm ban hành"
                                value={selectedYear}
                                onChange={(e) => setSelectedYear(e.target.value)}
                            >
                                <MenuItem value="all">Tất cả</MenuItem>
                                {years.map((year) => (
                                    <MenuItem key={year} value={year.toString()}>
                                        {year}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid size={{ xs: 12, sm: 4, md: 3 }}>
                            <TextField
                                fullWidth
                                select
                                label="Loại văn bản"
                                value={selectedType}
                                onChange={(e) => setSelectedType(e.target.value)}
                            >
                                <MenuItem value="all">Tất cả</MenuItem>
                                {types.map((type) => (
                                    <MenuItem key={type} value={type}>
                                        {type}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid size={{ xs: 12, sm: 4, md: 3 }}>
                            <TextField
                                fullWidth
                                select
                                label="Lĩnh vực"
                                value={selectedField}
                                onChange={(e) => setSelectedField(e.target.value)}
                            >
                                <MenuItem value="all">Tất cả</MenuItem>
                                {fields.map((field) => (
                                    <MenuItem key={field} value={field}>
                                        {field}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                    </Grid>
                </Card>

                <Typography variant="body2" sx={{ mb: 2, color: '#666' }}>
                    {loading ? 'Đang tải...' : `Tìm thấy ${documents.length} văn bản`}
                </Typography>

                {loading ? (
                    <Box sx={{ textAlign: 'center', py: 4 }}>
                        <Typography variant="h6">Đang tải dữ liệu...</Typography>
                    </Box>
                ) : documents.length === 0 ? (
                    <Box sx={{ textAlign: 'center', py: 4 }}>
                        <Typography variant="h6">Không tìm thấy văn bản nào</Typography>
                    </Box>
                ) : (
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        {documents.map((doc) => (
                            <Card key={doc.id} sx={{ p: 3, '&:hover': { boxShadow: 4 } }}>
                                <Grid container spacing={2} alignItems="center">
                                    <Grid size={{ xs: 12, md: 8 }}>
                                        <Box sx={{ display: 'flex', gap: 1, mb: 1, flexWrap: 'wrap' }}>
                                            <Chip
                                                label={doc.type}
                                                size="small"
                                                sx={{
                                                    bgcolor: 'var(--primary-color)',
                                                    color: 'white',
                                                    fontWeight: 600,
                                                }}
                                            />
                                            <Chip label={doc.number} size="small" variant="outlined" />
                                            <Chip label={doc.field} size="small" color="default" />
                                            {doc.isNew && (
                                                <Chip
                                                    label="Mới"
                                                    size="small"
                                                    sx={{ bgcolor: '#f44336', color: 'white' }}
                                                />
                                            )}
                                        </Box>
                                        <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                                            {doc.title}
                                        </Typography>
                                        <Typography variant="body2" sx={{ color: '#666', mb: 1 }}>
                                            {doc.summary}
                                        </Typography>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <CalendarTodayIcon sx={{ fontSize: 16, color: '#999' }} />
                                            <Typography variant="caption" sx={{ color: '#999' }}>
                                                Ngày ban hành: {new Date(doc.date).toLocaleDateString('vi-VN')}
                                            </Typography>
                                        </Box>
                                    </Grid>
                                    <Grid size={{ xs: 12, md: 4 }} sx={{ textAlign: { xs: 'left', md: 'right' } }}>
                                        <Button
                                            variant="contained"
                                            startIcon={<DownloadIcon />}
                                            onClick={() => handleDownload(doc)}
                                            disabled={downloading === doc.id}
                                            sx={{
                                                bgcolor: 'var(--primary-color)',
                                                '&:hover': { bgcolor: 'var(--accent-color)' },
                                            }}
                                        >
                                            {downloading === doc.id
                                                ? 'Đang tải...'
                                                : `Tải xuống ${doc.fileType.toUpperCase()}`}
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Card>
                        ))}
                    </Box>
                )}
            </Container>
        </Box>
    );
}
