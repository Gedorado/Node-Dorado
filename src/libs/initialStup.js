import Role from '../models/role'
import User from '../models/user'
import bcrypt from 'bcryptjs'

export const createRoles = async ()=>{

    try {
        const count = await Role.estimatedDocumentCount();
        if(count>0)return;

        const values = await Promise.all([
            new Role({name:"user"}).save(),
            new Role({name:"moderator"}).save(),
            new Role({name:"admin"}).save()
        ])
        
        console.log(values)
    } catch (error) {
        console.log(error)
    }
}
export const createAdmin = async () => {
    // check for an existing admin user
    const user = await User.findOne({ email: "admin@localhost" });
    // get roles _id
    const roles = await Role.find({ name: { $in: ["admin", "moderator"] } });
  
    if (!user) {
      // create a new admin user
      await User.create({
        username: "admin",
        email: "admin@localhost",
        password: await bcrypt.hash("admin", 10),
        roles: roles.map((role) => role._id),
      });
      console.log('Admin User Created!')
    }
  };