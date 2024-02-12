import HttpService from './httpService'

export class API {
    // #region AUTH
    static async login(email, password) {
        return await HttpService.POST('/auth/login', { email, password })
    }

    static async getGlobalData() {
        return HttpService.GET('/global/dropdown')
    }


}