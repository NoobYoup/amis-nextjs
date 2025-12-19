// Mock data for development before backend is ready

export const mockUser = {
    id: '1',
    name: 'Admin User',
    email: 'admin@amis.edu.vn',
    role: 'admin',
};

export const mockNews = [
    {
        id: '1',
        title: 'Khai giảng năm học mới 2024-2025',
        description: 'Trường AMIS tổ chức lễ khai giảng năm học mới với nhiều hoạt động ý nghĩa',
        content: '<p>Nội dung chi tiết về lễ khai giảng...</p>',
        category: 'Tiểu học',
        date: '2024-09-05T00:00:00Z',
        thumbnail: '/images/placeholder.jpg',
        images: [],
        created_at: '2024-09-01T00:00:00Z',
        updated_at: '2024-09-01T00:00:00Z',
    },
    {
        id: '2',
        title: 'Hội thao học sinh giỏi',
        description: 'Cuộc thi hội thao dành cho học sinh giỏi các khối lớp',
        content: '<p>Nội dung chi tiết về hội thao...</p>',
        category: 'Trung học',
        date: '2024-10-15T00:00:00Z',
        thumbnail: '/images/placeholder.jpg',
        images: [],
        created_at: '2024-10-01T00:00:00Z',
        updated_at: '2024-10-01T00:00:00Z',
    },
];

export const mockActivities = [
    {
        id: '1',
        title: 'Hoạt động ngoại khóa tháng 10',
        description: 'Các hoạt động ngoại khóa phong phú cho học sinh',
        category_id: '1',
        category: {
            id: '1',
            name: 'Ngoại khóa',
        },
        date: '2024-10-20T00:00:00Z',
        author: 'Giáo viên Nguyễn Văn A',
        thumbnail: '/images/placeholder.jpg',
        images: [],
        videos: [],
        created_at: '2024-10-15T00:00:00Z',
        updated_at: '2024-10-15T00:00:00Z',
    },
];

export const mockDocuments = [
    {
        id: '1',
        title: 'Thông tư 01/2024/TT-BGD',
        type: 'Thông tư',
        number: '01/2024/TT-BGD',
        date: '2024-01-15T00:00:00Z',
        field: 'Quản lý giáo dục',
        summary: 'Quy định về quản lý giáo dục phổ thông',
        is_new: true,
        files: [],
        created_at: '2024-01-15T00:00:00Z',
        updated_at: '2024-01-15T00:00:00Z',
    },
];

// Mock API responses
export const mockApiResponses = {
    login: (email: string, password: string) => {
        if (email === 'admin@amis.edu.vn' && password === 'admin123') {
            return {
                user: mockUser,
                token: 'mock-jwt-token-12345',
                expires_at: new Date(Date.now() + 15 * 60 * 60 * 1000).toISOString(),
            };
        }
        throw new Error('Invalid credentials');
    },

    getNews: (page = 1, limit = 10) => ({
        data: mockNews,
        pagination: {
            page,
            limit,
            total: mockNews.length,
            pages: 1,
        },
    }),

    getActivities: (page = 1, limit = 10) => ({
        data: mockActivities,
        pagination: {
            page,
            limit,
            total: mockActivities.length,
            pages: 1,
        },
    }),

    getDocuments: (page = 1, limit = 10) => ({
        data: mockDocuments,
        pagination: {
            page,
            limit,
            total: mockDocuments.length,
            pages: 1,
        },
    }),
};
