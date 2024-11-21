import notifee from '@notifee/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';

// Create a context
const NotificationContext = createContext();


// Key for AsyncStorage
const STORAGE_KEY = 'notificationCount';


// Custom hook to use the context
export const useNotification = () => useContext(NotificationContext);

// Provider component
export const NotificationProvider = ({ children }) => {
    const [notificationCount, setNotificationCount] = useState(0);

    // Function to increment notification count
    const incrementNotificationCount = () => {
        setNotificationCount(prevCount => prevCount + 1);
    };

    // Function to reset notification count
    const resetNotificationCount = async () => {
        await notifee.cancelAllNotifications();
        setNotificationCount(0);  // Reset count to 0
        await AsyncStorage.removeItem(STORAGE_KEY); // Remove from storage
    };

    // Load notification count from AsyncStorage on app start
    useEffect(() => {
        const loadNotificationCount = async () => {
            try {
                const storedCount = await AsyncStorage.getItem(STORAGE_KEY);
                if (storedCount !== null) {
                    setNotificationCount(Number(storedCount));
                }
            } catch (error) {
                console.error('Failed to load notification count from storage:', error);
            }
        };

        loadNotificationCount();
    }, []);

    // Save notification count to AsyncStorage whenever it changes
    useEffect(() => {
        const saveNotificationCount = async () => {
            try {
                await AsyncStorage.setItem(STORAGE_KEY, notificationCount.toString());
            } catch (error) {
                console.error('Failed to save notification count to storage:', error);
            }
        };

        saveNotificationCount();
    }, [notificationCount]);

    return (
        <NotificationContext.Provider
            value={{
                notificationCount,
                incrementNotificationCount,
                resetNotificationCount
            }}
        >
            {children}
        </NotificationContext.Provider>
    );
};
