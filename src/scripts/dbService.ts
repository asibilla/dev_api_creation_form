import { serverHost, endpoint } from '../scripts/config';
import axios from 'axios';

const baseUrl = serverHost + endpoint;
const privateEntry = /^_/;

// TODO: create options class w/ available query params,
// create response class for returned objects.
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
        let filteredResponse = filterResponse(docName, response);
        resolve(filteredResponse);
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

function filterResponse(docs: string, response: any): any {
  if (!response || !response.data) {
    return null;
  }
  let data = response.data;
  if (!docs) {
    return response.data.filter((v: any) => !privateEntry.test(v))
  }
  else if (data.rows) {
    let rows = data.rows.filter((v: any) => !privateEntry.test(v.id));
    let docsReturned = [];
    rows.forEach((v: any) => {
      if (v.doc) {
        let doc = {};
        for (let key in v.doc) {
          if (!privateEntry.test(key)) {
            doc[key] = v.doc[key];
          }
        }
        docsReturned.push(doc);
      }
    });
    if (docsReturned.length) {
      return docsReturned;
    }
    return rows;
  }
}

export { getDB, createDB };
