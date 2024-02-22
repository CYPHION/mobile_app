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

    static async getAllApointment(parentId) {
        return HttpService.GET(`/appointment/all?parentId=${parentId}`)
    }

    static async getAllTestimonial() {
        return HttpService.GET(`/testimonial/all`)
    }

    static async createTestimonial(data) {
        return HttpService.POST(`/testimonial/create`, data)
    }

    static async createLeave(formData) {
        return HttpService.POST(`/leave-application/create`, formData)
    }

    static async getAttendanceByDateRange(formData) {
        return formData.teacher
            ? HttpService.GET(`/attendance/date-range?${formData.formDataforSend}`)
            : HttpService.GET(`/attendance/date-range?${formData}`)
    }

    static async compensationAll() {
        return HttpService.GET(`/compensation/view`)
    }

}