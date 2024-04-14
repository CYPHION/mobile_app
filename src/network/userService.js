import { store } from "../store"; // Importing the Redux store

export class UserService {
    // Method to get the authentication token from the Redux store
    static GetToken() {
        // Accessing the current Redux store state
        const state = store.getState();

        // Returning the authentication token if it exists in the user data
        return state?.user?.data?.token;
    }
}
