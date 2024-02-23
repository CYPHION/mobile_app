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

    static async getAvailableSchedule(form) {
        return form
            ? HttpService.GET(`/compensation-availability/view?date=${form.date}&yearName=${form.yearName}`)
            : HttpService.GET(`/compensation-availability/view`)
    }

    static async createCompensation(formData) {
        return HttpService.POST(`/compensation/bulk-create`, formData)
    }

    static async compensationByParent(id) {
        return HttpService.GET(`/compensation/byParent?studentId=${id}`)
    }

    static async getAllInvoice(id) {
        return id ? HttpService.GET(`/invoice/all?id=${id}`) : HttpService.GET('/invoice/all')
    }

    static async getStudentScheduledByParentId(id, isBooster = 'all') {
        return isBooster === 'all'
            ? await HttpService.GET(`/schedule/parent/${id}`)
            : await HttpService.GET(`/schedule/parent/${id}?isBooster=${isBooster}`)
    }

    static async getStudentWithActiveBooster(query) {
        return await HttpService.GET(`/student/active-booster?${query}`)
    }

    static async getAllStudentScheduleByIdWithBooster(id) {
        return await HttpService.GET(`/schedule/all?userType=student&studentId=${id}`)
    }

    static async getPrentFeeDetail(id) {
        return HttpService.GET(`/fee/parent/${id}`)
    }

    static async createIntent(formData) {
        return HttpService.POST(`/stripe/create`, formData)
    }
    static async stripeIntent(formData) {
        return HttpService.POST(`/fee/stripe/create-intent`, formData)
    }
    static async IntentSuccessURL(id) {
        return HttpService.GET(`/fee/stripe/intent/${id}?isMobile=1`)
    }

}