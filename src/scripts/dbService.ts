import { serverHost, endpoint } from '../scripts/config';
import axios from 'axios';

const baseUrl = serverHost + endpoint;
const privateEntry = /^_/;

class Response {
  public data: ResponseItem[] = [];

  constructor(
    private response: any
  ) {
    if (response && Array.isArray(response)) {
      this.data = response.map((v: any) => new ResponseItem(v));
    }
  }
}

class ResponseItem {
  constructor(
    private item: any = {},
  ) {}

  public get id() {
    return this.item.id || '';
  }

  public get value() {
    return this.item.value || {};
  }
}


// TODO: create options class w/ available query params,
function getDB(dbName: string, docName: string = null, options: any = null): Promise<any> {
  return new Promise((resolve, reject) => {
    let url = baseUrl + '?db=' + dbName;
    if (docName) {
      url += '&doc=' + docName;
    }
    if (options) {
      url += '&query=';
      for (let key in options) {
        url += key + '|' + options[key] + ',';
      }
    }

    axios.get(url)
      .then(response => {
        let validatedResponse = new Response(response.data);
        resolve(validatedResponse.data);
      })
      .catch(e => {
        reject(e);
      }
    );
  });
}

function createDB(dbName: string): any {
  return axios.post(baseUrl + '?db=' + dbName + '&action=post');
}

export { getDB, createDB, ResponseItem };
