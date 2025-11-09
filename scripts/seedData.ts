import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';

async function seedData() {
    try {
        console.log('🌱 Starting database seeding...\n');

        // 1. Create Admin User
        console.log('👤 Creating admin user...');
        const hashedPassword = await bcrypt.hash('Amis@123', 12);
        const admin = await prisma.user.upsert({
            where: { email: 'admin@amis.edu.vn' },
            update: {},
            create: {
                name: 'Administrator',
                email: 'admin@amis.edu.vn',
                password: hashedPassword,
                role: 'admin',
            },
        });
        console.log('✅ Admin user created');

        // 2. Create Activity Categories
        console.log('\n📂 Creating activity categories...');
        const categories = await Promise.all([
            prisma.activityCategory.upsert({
                where: { name: 'Hoạt động ngoại khóa' },
                update: {},
                create: { name: 'Hoạt động ngoại khóa' },
            }),
            prisma.activityCategory.upsert({
                where: { name: 'Sự kiện học đường' },
                update: {},
                create: { name: 'Sự kiện học đường' },
            }),
            prisma.activityCategory.upsert({
                where: { name: 'Thi đấu thể thao' },
                update: {},
                create: { name: 'Thi đấu thể thao' },
            }),
            prisma.activityCategory.upsert({
                where: { name: 'Văn nghệ' },
                update: {},
                create: { name: 'Văn nghệ' },
            }),
            prisma.activityCategory.upsert({
                where: { name: 'Học tập' },
                update: {},
                create: { name: 'Học tập' },
            }),
        ]);
        console.log(`✅ Created ${categories.length} categories`);

        // 3. Create Activities
        console.log('\n🎯 Creating activities...');
        const activities = await Promise.all([
            prisma.activity.create({
                data: {
                    title: 'Ngày hội thể thao năm học 2024-2025',
                    description: 'Ngày hội thể thao truyền thống của trường với nhiều môn thi đấu hấp dẫn như bóng đá, bóng chuyền, cầu lông...',
                    categoryId: categories[2].id, // Thi đấu thể thao
                    date: new Date('2024-10-15'),
                    author: 'Ban tổ chức',
                    thumbnail: 'https://via.placeholder.com/800x600/4CAF50/ffffff?text=Sports+Day',
                    images: [
                        'https://via.placeholder.com/800x600/4CAF50/ffffff?text=Sports+1',
                        'https://via.placeholder.com/800x600/2196F3/ffffff?text=Sports+2',
                    ],
                    videos: ['https://www.youtube.com/embed/dQw4w9WgXcQ'],
                },
            }),
            prisma.activity.create({
                data: {
                    title: 'Lễ khai giảng năm học mới',
                    description: 'Buổi lễ khai giảng năm học 2024-2025 với sự tham gia của toàn thể thầy cô và học sinh.',
                    categoryId: categories[1].id, // Sự kiện học đường
                    date: new Date('2024-09-05'),
                    author: 'Phòng Giáo dục',
                    thumbnail: 'https://via.placeholder.com/800x600/FF9800/ffffff?text=Opening+Ceremony',
                    images: [
                        'https://via.placeholder.com/800x600/FF9800/ffffff?text=Ceremony+1',
                    ],
                    videos: [],
                },
            }),
            prisma.activity.create({
                data: {
                    title: 'Chuyến tham quan bảo tàng lịch sử',
                    description: 'Học sinh khối 8 tham quan bảo tàng lịch sử Việt Nam, tìm hiểu về truyền thống dân tộc.',
                    categoryId: categories[0].id, // Hoạt động ngoại khóa
                    date: new Date('2024-11-01'),
                    author: 'Tổ Sử - Địa',
                    thumbnail: 'https://via.placeholder.com/800x600/9C27B0/ffffff?text=Museum+Visit',
                    images: [],
                    videos: [],
                },
            }),
            prisma.activity.create({
                data: {
                    title: 'Đêm nhạc từ thiện',
                    description: 'Chương trình văn nghệ gây quỹ ủng hộ học sinh có hoàn cảnh khó khăn.',
                    categoryId: categories[3].id, // Văn nghệ
                    date: new Date('2024-12-20'),
                    author: 'Đoàn trường',
                    thumbnail: 'https://via.placeholder.com/800x600/E91E63/ffffff?text=Charity+Concert',
                    images: [
                        'https://via.placeholder.com/800x600/E91E63/ffffff?text=Concert+1',
                        'https://via.placeholder.com/800x600/F44336/ffffff?text=Concert+2',
                    ],
                    videos: ['https://www.youtube.com/embed/dQw4w9WgXcQ'],
                },
            }),
        ]);
        console.log(`✅ Created ${activities.length} activities`);

        // 4. Create Documents
        console.log('\n📄 Creating documents...');
        const documents = await Promise.all([
            prisma.document.create({
                data: {
                    title: 'Thông tư 22/2021/TT-BGDĐT về đánh giá học sinh tiểu học',
                    type: 'Thông tư',
                    number: '22/2021/TT-BGDĐT',
                    date: new Date('2021-07-15'),
                    field: 'Đánh giá',
                    summary: 'Quy định về đánh giá học sinh tiểu học',
                    fileUrl: 'https://via.placeholder.com/1/pdf',
                    fileType: 'pdf',
                    isNew: false,
                },
            }),
            prisma.document.create({
                data: {
                    title: 'Quyết định 26/2020/QĐ-TTg về chính sách hỗ trợ học sinh',
                    type: 'Quyết định',
                    number: '26/2020/QĐ-TTg',
                    date: new Date('2020-06-10'),
                    field: 'Học sinh',
                    summary: 'Chính sách hỗ trợ học sinh vùng khó khăn',
                    fileUrl: 'https://via.placeholder.com/1/pdf',
                    fileType: 'pdf',
                    isNew: false,
                },
            }),
            prisma.document.create({
                data: {
                    title: 'Kế hoạch năm học 2024-2025',
                    type: 'Kế hoạch',
                    number: 'KH-01/2024',
                    date: new Date('2024-08-01'),
                    field: 'Kế hoạch',
                    summary: 'Kế hoạch tổng thể năm học 2024-2025',
                    fileUrl: 'https://via.placeholder.com/1/pdf',
                    fileType: 'pdf',
                    isNew: true,
                },
            }),
            prisma.document.create({
                data: {
                    title: 'Quy chế thi học sinh giỏi cấp trường',
                    type: 'Quy chế',
                    number: 'QC-02/2024',
                    date: new Date('2024-09-15'),
                    field: 'Quản lý giáo dục',
                    summary: 'Quy chế tổ chức thi học sinh giỏi các môn văn hóa',
                    fileUrl: 'https://via.placeholder.com/1/pdf',
                    fileType: 'pdf',
                    isNew: true,
                },
            }),
        ]);
        console.log(`✅ Created ${documents.length} documents`);

        // 5. Create Tuition Data
        console.log('\n💰 Creating tuition data...');
        const tuitions = await Promise.all([
            // Grade tuitions
            prisma.tuition.create({
                data: {
                    type: 'grade',
                    name: 'Học phí lớp 1',
                    description: 'Học phí cho học sinh lớp 1',
                    grade: 'Lớp 1',
                    level: 'elementary',
                    tuition: '1,500,000 VNĐ/tháng',
                },
            }),
            prisma.tuition.create({
                data: {
                    type: 'grade',
                    name: 'Học phí lớp 2',
                    description: 'Học phí cho học sinh lớp 2',
                    grade: 'Lớp 2',
                    level: 'elementary',
                    tuition: '1,500,000 VNĐ/tháng',
                },
            }),
            prisma.tuition.create({
                data: {
                    type: 'grade',
                    name: 'Học phí lớp 6',
                    description: 'Học phí cho học sinh lớp 6',
                    grade: 'Lớp 6',
                    level: 'middle',
                    tuition: '2,000,000 VNĐ/tháng',
                },
            }),
            // Discounts
            prisma.tuition.create({
                data: {
                    type: 'discount',
                    name: 'Giảm học phí con CBGV',
                    description: 'Giảm 50% học phí cho con em cán bộ giáo viên',
                    discount: '50%',
                },
            }),
            prisma.tuition.create({
                data: {
                    type: 'discount',
                    name: 'Giảm học phí học sinh giỏi',
                    description: 'Giảm 30% học phí cho học sinh đạt danh hiệu học sinh giỏi',
                    discount: '30%',
                },
            }),
            // Schedule
            prisma.tuition.create({
                data: {
                    type: 'schedule',
                    name: 'Lịch đóng học phí học kỳ 1',
                    description: 'Thời gian đóng học phí học kỳ 1 năm học 2024-2025',
                    period: 'Học kỳ 1',
                    date: new Date('2024-09-15'),
                    months: 'Tháng 9-12/2024',
                },
            }),
            prisma.tuition.create({
                data: {
                    type: 'schedule',
                    name: 'Lịch đóng học phí học kỳ 2',
                    description: 'Thời gian đóng học phí học kỳ 2 năm học 2024-2025',
                    period: 'Học kỳ 2',
                    date: new Date('2025-01-15'),
                    months: 'Tháng 1-5/2025',
                },
            }),
            // Fees
            prisma.tuition.create({
                data: {
                    type: 'fee',
                    name: 'Tiền ăn trưa',
                    description: 'Chi phí bữa ăn trưa tại trường',
                    typeFee: 'notIncluded',
                },
            }),
            prisma.tuition.create({
                data: {
                    type: 'fee',
                    name: 'Sách giáo khoa',
                    description: 'Chi phí sách giáo khoa và vở bài tập',
                    typeFee: 'notIncluded',
                },
            }),
            prisma.tuition.create({
                data: {
                    type: 'fee',
                    name: 'Bảo hiểm y tế học sinh',
                    description: 'Bảo hiểm y tế bắt buộc cho học sinh',
                    typeFee: 'included',
                },
            }),
        ]);
        console.log(`✅ Created ${tuitions.length} tuition records`);

        console.log('\n🎉 Database seeding completed successfully!');
        console.log('\n📊 Summary:');
        console.log(`   - Users: 1`);
        console.log(`   - Activity Categories: ${categories.length}`);
        console.log(`   - Activities: ${activities.length}`);
        console.log(`   - Documents: ${documents.length}`);
        console.log(`   - Tuition Records: ${tuitions.length}`);

        await prisma.$disconnect();
        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding database:', error);
        await prisma.$disconnect();
        process.exit(1);
    }
}

seedData();
