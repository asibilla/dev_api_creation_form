import { serverHost, endpoint } from '../scripts/config';
import axios from 'axios';

const baseUrl = serverHost + endpoint;

function getDB(dbName: string): any {
  return axios.get(baseUrl + '?db=' + dbName);
}

function createDB(dbName: string): any {
  return axios.post(baseUrl + '?db=' + dbName + '&action=post');
}

export { getDB, createDB };
