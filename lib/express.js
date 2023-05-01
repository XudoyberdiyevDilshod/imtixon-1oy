import { parse } from "url";
import { parse as _parse } from "querystring";

class Express {
  constructor(request, response) {
    this.request = request;
    this.response = response;

    if (this.request.method != "GET") {
      this.request.body = new Promise((done, reject) => {
        let str = "";
        request.on("data", (chunk) => (str += chunk));
        request.on("end", () => {
          try {
            done(JSON.parse(str));
          } catch (error) {
            reject(error);
          }
        });
      });
    }

    this.response.json = (status, data) => {
      this.response.writeHead(status, { "Content-Type": "application/json" });
      return this.response.end(JSON.stringify(data));
    };

    this.response.setHeader("Access-Control-Allow-Origin", "*");
  }

  get(route, callback) {
    let { query, pathname } = parse(this.request.url);
    this.request.query = _parse(query);
    if (pathname == route && this.request.method == "GET") {
      callback(this.request, this.response);
    }
  }

  post(route, callback) {
    if (this.request.url == route && this.request.method == "POST") {
      callback(this.request, this.response);
    }
  }

  put(route, callback) {
    if (this.request.url == route && this.request.method == "PUT") {
      callback(this.request, this.response);
    }
  }

  delete(route, callback) {
    if (this.request.url == route && this.request.method == "DELETE") {
      callback(this.request, this.response);
    }
  }
}

export default Express;
