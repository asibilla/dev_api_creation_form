import { serverHost, endpoint } from '../scripts/config';
import axios from 'axios';


export class DBService {
  private baseUrl: string = serverHost + endpoint;

  constructor() {}

  getDB(dbName: string) {

  }
}

