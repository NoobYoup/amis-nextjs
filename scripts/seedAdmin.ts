import dbConnect from '@/lib/mongoose';
import User from '@/models/User';

async function createAdmin() {
    try {
        await dbConnect();
        console.log('✅ Connected to database');

        // Check if admin already exists
        const existingAdmin = await User.findOne({ email: 'admin@amis.edu.vn' });
        if (existingAdmin) {
            console.log('⚠️ Admin user already exists');
            console.log('📧 Email:', existingAdmin.email);
            console.log('👤 Name:', existingAdmin.name);
            console.log('🔒 Role:', existingAdmin.role);
            return;
        }

        // Create new admin user
        const admin = new User({
            name: 'Administrator',
            email: 'admin@amis.edu.vn',
            password: 'Amis@123', // Password user đang dùng để login
            role: 'admin'
        });

        await admin.save();
        console.log('✅ Admin user created successfully!');
        console.log('📧 Email: admin@amis.edu.vn');
        console.log('🔑 Password: Amis@123');
        console.log('👤 Name: Administrator');
        console.log('🔒 Role: admin');

        process.exit(0);
    } catch (error) {
        console.error('❌ Error creating admin:', error);
        process.exit(1);
    }
}

createAdmin();
