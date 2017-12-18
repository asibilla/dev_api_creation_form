import { serverHost, endpoint } from '../scripts/config';
import axios from 'axios';

const baseUrl = serverHost + endpoint;

function getDB(dbName: string, docName: string = null): any {
  let url = baseUrl + '?db=' + dbName;
  if (docName) {
    url += '&doc=' + docName;
  }
  return axios.get(url);
}

function createDB(dbName: string): any {
  return axios.post(baseUrl + '?db=' + dbName + '&action=post');
}

export { getDB, createDB };
