import AsyncStorage from '@react-native-async-storage/async-storage';

const Config = {
    branchName: '', // Initial value, will be loaded dynamically

    // Load branchName from AsyncStorage
    async loadBranchName() {
        try {
            const storedBranchName = await AsyncStorage.getItem('branchName');
            this.branchName = storedBranchName || 'https://default.url'; // Fallback to default
        } catch (error) {
            console.error('Error loading branchName:', error);
            this.branchName = 'https://default.url'; // Fallback in case of error
        }
    },

    // Update branchName both in memory and AsyncStorage
    async updateBranchName(newBranchName) {
        try {
            this.branchName = newBranchName; // Update in memory
            await AsyncStorage.setItem('branchName', newBranchName); // Persist in storage
        } catch (error) {
            console.error('Error updating branchName:', error);
        }
    },

    // Get the current branchName
    getBranchName() {
        return this.branchName;
    }
};

export default Config;
