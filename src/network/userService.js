import { store } from "../store"



export class UserService {
    static GetToken() {
        const state = store.getState()

        return state?.user?.data?.token
    }
}