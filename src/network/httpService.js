import axios from 'axios';
import Config from '../utils/config/branchNameConfig';
import { CheckForHttpErrors } from '../utils/functions';
import { UserService } from './userService';



export default class HttpService {
    static async POST(endpoint, body) {
        return new Promise(async (resolve, reject) => {
            const URL = Config.getBranchName();  // Fetch the latest branch name
            const token = UserService.GetToken();
            axios.post(`${URL}${endpoint}`, body, this.getHeader(token))
                .then(res => resolve(res.data))
                .catch(err => reject(CheckForHttpErrors(err)));
        });
    }

    static async GET(endpoint) {
        return new Promise(async (resolve, reject) => {
            const URL = Config.getBranchName();  // Fetch the latest branch name
            const token = UserService.GetToken();
            axios.get(`${URL}${endpoint}`, this.getHeader(token))
                .then(res => resolve(res.data))
                .catch(err => reject(CheckForHttpErrors(err)));
        });
    }

    static async DEL(endpoint) {
        return new Promise(async (resolve, reject) => {
            const URL = Config.getBranchName();  // Fetch the latest branch name
            const token = UserService.GetToken();
            axios.delete(`${URL}${endpoint}`, this.getHeader(token))
                .then(res => resolve(res.data))
                .catch(err => reject(CheckForHttpErrors(err)));
        });
    }

    static async UPD(endpoint, body) {
        return new Promise(async (resolve, reject) => {
            const URL = Config.getBranchName();  // Fetch the latest branch name
            const token = UserService.GetToken();
            axios.put(`${URL}${endpoint}`, body, this.getHeader(token))
                .then(res => resolve(res.data))
                .catch(err => reject(CheckForHttpErrors(err)));
        });
    }

    static getHeader(token) {
        return token
            ? { headers: { Authorization: `Bearer ${token}` } }
            : {};
    }
}
