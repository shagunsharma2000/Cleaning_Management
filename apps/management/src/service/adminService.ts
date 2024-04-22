import Admin from '../model/adminModel'; 
import bcrypt from 'bcrypt';

class AdminService {
  public static async registerAdmin(adminData) {
    try {
  // Check if username already exists
  const existingAdmin = await Admin.findOne<Admin>({
    where: { username: adminData.username }
  });

  if (existingAdmin) {
    throw new Error('Username already exists');
  }

      const hashedPassword = await bcrypt.hash(adminData.password, 10);

      const admin = new Admin({
        firstname: adminData.firstname,
        lastname: adminData.lastname,
        phonenumber: adminData.phonenumber,
        username: adminData.username,
        email: adminData.email,
        password: hashedPassword,
        Role: adminData.Role
      });

      await admin.save();

      return admin;
    } catch (error) {
      throw new Error('Failed to register admin: ' + error.message);
    }
  }
}


  export default AdminService;





