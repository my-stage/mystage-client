import User from './User'

const apiUrl = "https://mystage.ngschaider.at/api/v1/";

async function otherRequest(method: string, data: object) {
  const response = await fetch(apiUrl, {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return await response.json();
}
async function getRequest(urlText: string, params?: object) {
  const url = new URL(urlText);
  if(params) {
    //Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
  }
  const response = await fetch(url.toString());
  return await response.json();
}
async function request(method: string, url: string, dataOrParams={}) {
  if(method === "GET") {
    return getRequest(url, dataOrParams);
  } else {
    return otherRequest(method, dataOrParams);
  }
}

export default class Api {

  static async getUsers() {
    const response = await request("GET", apiUrl + "records/users");
    return response.records.map((user: any) => new User(user));
  }

}
