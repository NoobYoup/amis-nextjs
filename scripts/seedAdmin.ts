import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';

async function createAdmin() {
    try {
        console.log('✅ Connected to database');

        // Check if admin already exists
        const existingAdmin = await prisma.user.findUnique({
            where: { email: 'admin@amis.edu.vn' },
        });
        
        if (existingAdmin) {
            console.log('⚠️ Admin user already exists');
            console.log('📧 Email:', existingAdmin.email);
            console.log('👤 Name:', existingAdmin.name);
            console.log('🔒 Role:', existingAdmin.role);
            await prisma.$disconnect();
            process.exit(0);
            return;
        }

        // Create new admin user
        const hashedPassword = await bcrypt.hash('Amis@123', 12);
        const admin = await prisma.user.create({
            data: {
                name: 'Administrator',
                email: 'admin@amis.edu.vn',
                password: hashedPassword,
                role: 'admin',
            },
        });

        console.log('✅ Admin user created successfully!');
        console.log('📧 Email: admin@amis.edu.vn');
        console.log('🔑 Password: Amis@123');
        console.log('👤 Name: Administrator');
        console.log('🔒 Role: admin');

        await prisma.$disconnect();
        process.exit(0);
    } catch (error) {
        console.error('❌ Error creating admin:', error);
        await prisma.$disconnect();
        process.exit(1);
    }
}

createAdmin();
