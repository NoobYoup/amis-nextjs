import dbConnect from '@/lib/mongoose';
import User from '@/models/User';

async function checkUsers() {
    try {
        await dbConnect();
        console.log('✅ Connected to database');

        const users = await User.find({});
        console.log(`\n📊 Total users: ${users.length}`);

        if (users.length === 0) {
            console.log('❌ No users found in database');
            console.log('\n🔧 Creating admin user...');

            const admin = new User({
                name: 'Admin',
                email: 'admin@amis.edu.vn',
                password: 'Admin@123', // Will be hashed by pre-save hook
                role: 'admin'
            });

            await admin.save();
            console.log('✅ Admin user created!');
            console.log('📧 Email: admin@amis.edu.vn');
            console.log('🔑 Password: Admin@123');
        } else {
            console.log('\n📋 Users in database:');
            users.forEach((user, index) => {
                console.log(`\n${index + 1}. User:`);
                console.log(`   ID: ${user._id}`);
                console.log(`   Name: ${user.name}`);
                console.log(`   Email: ${user.email}`);
                console.log(`   Role: ${user.role}`);
                console.log(`   Password Hash: ${user.password.substring(0, 20)}...`);
            });
        }

        process.exit(0);
    } catch (error) {
        console.error('❌ Error:', error);
        process.exit(1);
    }
}

checkUsers();
