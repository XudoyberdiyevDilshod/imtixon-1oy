import { read, hashPassword } from "../utils/model.js";

const adminController = {
  GET: (request, response) => {
    response.end("ok");
  },
  POST: async (request, response) => {
    let { username, password } = await request.body;
    const users = read("admins");
    try {
      password = hashPassword(password);
      let user = users.find(
        (user) => user.username == username && user.password == password
      );
      if (!user) {
        throw new Error("wrong username or password");
      }
      response.json(201, { status: 201, message: true });
    } catch (error) {
      response.json(400, { status: 400, message: error.message });
    }
  },
};

export default adminController;
