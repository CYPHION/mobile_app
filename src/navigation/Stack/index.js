import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ChangePasswordScreen from '../../screens/ChangePassword';
import Compensation from '../../screens/Compensation';
import Dashboard from '../../screens/Dashboard';
import LeaveApplication from '../../screens/LeaveApplication';
import Notifications from '../../screens/Notifications';
import Testimonials from '../../screens/Testimonials';
import ViewAppointment from '../../screens/ViewAppointment';
import ViewChildren from '../../screens/ViewChildren';
const Stack = createNativeStackNavigator();

export function MyStack() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false, // Hide header for all screens
            }}
        >
            {/* <Stack.Screen name="tabs" component={TabNavigation} /> */}
            <Stack.Screen name="dashboard" component={Dashboard} />
            <Stack.Screen name="viewChildren" component={ViewChildren} />
            <Stack.Screen name="viewAppointment" component={ViewAppointment} />
            <Stack.Screen name="leaveApplication" component={LeaveApplication} />
            <Stack.Screen name="compensation" component={Compensation} />
            <Stack.Screen name="testimonials" component={Testimonials} />
            <Stack.Screen name="notifications" component={Notifications}
                options={{
                    headerShown: true,
                    headerTitle: 'Notifications',

                }}
            />
            <Stack.Screen name="changePassword" component={ChangePasswordScreen}
                options={{
                    headerShown: true,
                    headerTitle: 'Change Password',
                }}
            />
        </Stack.Navigator>
    );
}