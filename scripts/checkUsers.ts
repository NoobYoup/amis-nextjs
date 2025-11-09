import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';

async function checkUsers() {
    try {
        console.log('✅ Connected to database');

        const users = await prisma.user.findMany();
        console.log(`\n📊 Total users: ${users.length}`);

        if (users.length === 0) {
            console.log('❌ No users found in database');
            console.log('\n🔧 Creating admin user...');

            const hashedPassword = await bcrypt.hash('Admin@123', 12);
            const admin = await prisma.user.create({
                data: {
                    name: 'Admin',
                    email: 'admin@amis.edu.vn',
                    password: hashedPassword,
                    role: 'admin',
                },
            });

            console.log('✅ Admin user created!');
            console.log('📧 Email: admin@amis.edu.vn');
            console.log('🔑 Password: Admin@123');
        } else {
            console.log('\n📋 Users in database:');
            users.forEach((user, index) => {
                console.log(`\n${index + 1}. User:`);
                console.log(`   ID: ${user.id}`);
                console.log(`   Name: ${user.name}`);
                console.log(`   Email: ${user.email}`);
                console.log(`   Role: ${user.role}`);
                console.log(`   Password Hash: ${user.password.substring(0, 20)}...`);
            });
        }

        await prisma.$disconnect();
        process.exit(0);
    } catch (error) {
        console.error('❌ Error:', error);
        await prisma.$disconnect();
        process.exit(1);
    }
}

checkUsers();
