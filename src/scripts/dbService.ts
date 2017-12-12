import { serverHost, endpoint } from '../scripts/config';
import axios from 'axios';


export class DBService {
  private baseUrl: string = serverHost + endpoint;

  constructor() {}

  getDB(dbName: string): Promise<any> {
    return axios.get(this.baseUrl + '?db=' + dbName);
  }

  createDB(dbName: string): Promise<any> {
    return axios.post(this.baseUrl + '?db=' + dbName + '&action=post');
  }
}

