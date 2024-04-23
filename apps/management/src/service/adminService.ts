import Admin from '../model/adminModel';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';






  class AdminService {
    public static async registerAdmin(adminData) { // Add type annotation
        try {
            // Check if email already exists
            const existingAdmin = await Admin.findOne<Admin>({ where: { email: adminData.email } });

            if (existingAdmin) {
                throw new Error('email already exists');
            }

            const hashedPassword = await bcrypt.hash(adminData.password, 10);

            const admin = new Admin({

                name: adminData.name,
                phonenumber: adminData.phonenumber,
                email: adminData.email,
                password: hashedPassword,
                Role: adminData.Role // Pass Role from adminData
            });

            await admin.save();

            
            return admin;
        } catch (error) {
            throw new Error('Failed to register admin: ' + error.message);
        }
    }


   
    public static async login(credentials) {
        try {
            // Assuming you have a database where admin credentials are stored
            const admin = await Admin.findOne({ where: { email: credentials.email } });

    
            if (!admin) {
                return { error: 'notExist', message: 'Admin not found' }; // Admin doesn't exist
            }
    
            // Compare password hashes
            const validPassword = await bcrypt.compare(credentials.password, admin.password);
    
            if (!validPassword) {
                return { error: 'invalidAdmin', message: 'Invalid password' }; // Invalid password
            }
    
            // Generate token
            const token = jwt.sign({ id: admin.id }, process.env.secret_key, { expiresIn: '1h' });

    
            return { token, message: 'Login successful' };
        } catch (error) {
            console.error(error);
            return { error: 'serverError', message: 'Something went wrong while logging in' };
        }
    }

    



public static async updateAdmin(id: string, adminData: { name: string, email: string}) {
  try {
      // Find admin by ID
      const admin = await Admin.findByPk(id);

      // If admin does not exist, throw an error
      if (!admin) {
          throw new Error('Admin not found');
      }

      // Update admin data
      admin.name = adminData.name,
      admin.email = adminData.email;

      // Save changes to the database
      await admin.save();

      return admin;
  } catch (error) {
      throw new Error('Failed to update admin: ' + error.message);
  }
}


public static async deleteAdmin(adminId: string) {
    try {
        const deletedAdmin = await Admin.findByPk(adminId);
        if (!deletedAdmin) {
            throw new Error('Admin not found');
        }
        await deletedAdmin.destroy();
        return deletedAdmin; // Return the deleted admin object
    } catch (error) {
        throw new Error(`Failed to delete admin: ${error.message}`);
    }

}


public static async changePassword(id: string, Password: string, newPassword: string, confirmPassword: string) {
    try {
        // Check if Password, newPassword, and confirmPassword are provided
        if (!Password || !newPassword || !confirmPassword) {
            return { status: 400, message: ' password, new password, and confirm password are required' };
        }

        const user = await Admin.findByPk(id);
        if (!user) {
            return { status: 404, message: 'Admin not found' };
        }

        // Compare  password
        const passwordMatch = await bcrypt.compare(Password, user.password);
        if (!passwordMatch) {
            return { status: 401, message: 'Incorrect old password' };
        }

        // Check if new password is same as old password
        if (Password === newPassword) {
            return { status: 400, message: 'New password must be different from the  password' };
        }

        // Check if new password matches confirm password
        if (newPassword !== confirmPassword) {
            return { status: 400, message: 'New password and confirm password do not match' };
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update Admin password with the hashed password
        user.password = hashedPassword;
        await user.save();

        return { status: 200, message: 'Password changed successfully' };
    } catch (error) {
        console.error('Error:', error);
        return { status: 500, message: 'Internal Server Error' };
    }
}

  }
export default AdminService;
