import { serverHost, endpoint } from '../scripts/config';
import axios from 'axios';

const baseUrl = serverHost + endpoint;
const privateEntry = /^_/;

class Response {
  public data: any[];

  constructor(
    response: any = {},
    private hasDocs: boolean = false
  ) {
    if (!response.data) {
      this.data = [];
    }
    else {
      this.parseData(response.data);
    }
  }

  private parseData(data: any) {
    if (!this.hasDocs) {
      this.data = data.filter((v: string) => !privateEntry.test(v));
    }
    else if (data.rows) {
      let rows = <Document[]>data.rows.map((v: any) => new Document(v)).filter((v: Document) => !privateEntry.test(v.id));
      this.data = rows;
    }
    else {
      this.data = [new Document(data)];
    }
  }
}

class Document {
  constructor(
    private sourceObject: any = {}
  ) {}

  public get id() {
    return this.sourceObject.id || '';
  }
  public get value() {
    if (!this.sourceObject.doc) {
      return {};
    }
    else {
      let value: any = {};
      for (let key in this.sourceObject.doc) {
        if (!privateEntry.test(key)) {
          value[key] = this.sourceObject.doc[key];
        }
      }
      return value;
    }

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
        let validResponse = new Response(response, (docName) ? true : false);
        console.log(validResponse);
        resolve(validResponse.data);
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

export { getDB, createDB };
