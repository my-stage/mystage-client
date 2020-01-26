import User from './User';

async function createResponse(response: Response) {
  const json = await response.text();

  let data: any = {};
  try {
    data = JSON.parse(json);
  } catch (ex) {
    console.error(ex);
    console.log("Error parsing JSON: " + json);
  }

  return data;
}

export default class Api {

  static apiUrl = "http://mystage-server/api/v1/";
  static token: string;

  static async logout() {
    const response = await Api.request("POST", "logout", {}, {});
    return response;
  }

  static async request(method: string, route: string, params: {[key:string]:string}, data: object) {
    let url = new URL(Api.apiUrl + route);

    Object.keys(params).forEach(key => {
        url.searchParams.append(key, params[key]);
    });

    if(Api.token) {
      url.searchParams.append("token", Api.token);
    }

    let opts: {[key: string]: any} = {
      method: method,
    };

    if(method !== "GET" && method !== "HEAD") {
      opts["headers"] = {
        "Content-Type": "application/json",
      };
      opts["body"] = JSON.stringify(data);
    }

    const response = await fetch(url.toString(), opts);

    const result = await createResponse(response);
    console.log(method + " " + url.toString() + " " + JSON.stringify(data));
    console.log(result);
    return result;
  }


}
