import axios from 'axios';
import { CheckForHttpErrors } from '../utils/functions';
import { UserService } from './userService';

// export const URL = 'https://api.cyphion.com'
export const URL = 'http://localhost:5000'


export default class HttpService {
    static POST(endpoint, body) {
        return new Promise((resolve, reject) => {
            let token = UserService.GetToken()
            axios.post(`${URL}${endpoint}`, body, this.getHeader(token))
                .then(res => resolve(res.data))
                .catch(err => reject(CheckForHttpErrors(err)))
        })
    }

    static async GET(endpoint) {
        return new Promise((resolve, reject) => {
            let token = UserService.GetToken()
            axios.get(`${URL}${endpoint}`, this.getHeader(token))
                .then(res => resolve(res.data))
                .catch(err => reject(CheckForHttpErrors(err)))
        })

    }
    static async DEL(endpoint) {
        return new Promise((resolve, reject) => {
            let token = UserService.GetToken()
            axios.delete(`${URL}${endpoint}`, this.getHeader(token))
                .then(res => resolve(res.data))
                .catch(err => reject(CheckForHttpErrors(err)))
        })

    }
    static async UPD(endpoint, body) {
        return new Promise((resolve, reject) => {
            let token = UserService.GetToken()
            axios.put(`${URL}${endpoint}`, body, this.getHeader(token))
                .then(res => resolve(res.data))
                .catch(err => reject(CheckForHttpErrors(err)))
        })

    }

    static getHeader(token) {
        return (
            token ? { headers: { Authorization: `Bearer ${token}` } }
                : {}
        )
    }
}