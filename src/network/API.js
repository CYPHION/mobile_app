import HttpService from './httpService'

export class API {
    // #region AUTH
    static async login(email, password) {
        return await HttpService.POST('/auth/login', { email, password })
    }

    static async getStudentByParentId(id) {
        return await HttpService.GET(`/student/${id}`)
    }

    static async getGlobalData(id) {
        return HttpService.GET(`/global/mobile/${id}`)
    }


}