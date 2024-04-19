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
    static async updateUser(obj) {
        return await HttpService.UPD(`/user/update`, obj)
    }

    static async getAllNotifications(subType, type, category) {
        let queryParams = [];

        if (subType) queryParams.push(`subType=${encodeURIComponent(subType)}`);
        if (type) queryParams.push(`type=${encodeURIComponent(type)}`);
        if (category) queryParams.push(`category=${encodeURIComponent(category)}`);

        let queryString = queryParams.length > 0 ? `?${queryParams.join('&')}` : '';

        return HttpService.GET(`/notification-alert/all${queryString}`);
    }

    static async generateOtp(formData) {
        return HttpService.POST(`/otp/generate-otp`, formData)
    }
    static async checkOtp(formData) {
        return HttpService.UPD(`/otp/check-otp`, formData)
    }

    static async getAllNotification(parentId) {
        return HttpService.GET(`/notification-alert/parent?parentId=${Number(parentId)}`)
    }

    static async createJobApplication(formData) {
        return HttpService.POST('/jobapplication/create', formData)
    }

    static async uploadImage(file) {
        return HttpService.POST(`/upload/single`, file)
    }

    static async createReview(formData) {
        return HttpService.POST(`/review/create`, formData)
    }

    static async getAllReview() {
        return HttpService.GET(`/review/all`)
    }

    static async getAllJobs() {
        return HttpService.GET(`/jobapplication/alljobs`)
    }

    static async CreateApplyOnline(formData) {
        return HttpService.POST(`/application`, formData)
    }

    static async CreateALevelResult(formData) {
        return HttpService.POST(`/exam`, formData)
    }

    static async CreateGCSEResult(formData) {
        return HttpService.POST(`/gcse-result`, formData)
    }

    static async CreateContact(formData) {
        return HttpService.POST(`/contactus/create`, formData)
    }
}