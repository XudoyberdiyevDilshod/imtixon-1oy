import { read, hashPassword } from "../utils/model.js";

const adminController = {
  GET: (req, res) => {
    res.end("ok");
  },
  POST: async (req, res) => {
    let { username, password } = await req.body;
    const users = read("admins");
    try {
      password = hashPassword(password);
      let user = users.find(
        (user) => user.username == username && user.password == password
      );
      if (!user) {
        throw new Error("wrong username or password");
      }
      res.json(201, { status: 201, message: true });
    } catch (error) {
      res.json(400, { status: 400, message: error.message });
    }
  },
};

export default adminController;
