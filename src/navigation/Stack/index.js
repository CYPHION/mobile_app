import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ChangePasswordScreen from '../../screens/ChangePassword';
import Compensation from '../../screens/Compensation';
import Fee from '../../screens/Fee';
import FeeCollection from '../../screens/FeeCollection';
import Home from '../../screens/Home';
import HomeWork from '../../screens/HomeWork';
import LeaveApplication from '../../screens/LeaveApplication';
import Notifications from '../../screens/Notifications';
import StudentDetails from '../../screens/StudentDetails';
import Testimonials from '../../screens/Testimonials';
import ViewAttendance from '../../screens/ViewAttendance';
import ViewChildren from '../../screens/ViewChildren';
import ViewSchedule from '../../screens/ViewSchedule';
import ViewAllStudents from '../../screens/viewAllStudents';
import ViewAppointments from '../../screens/viewAppointments';
import ViewProgress from '../../screens/viewProgress';
const Stack = createNativeStackNavigator();

let screenOptionss = {
    headerShown: false, // Hide header for all screens
}


export function MyStack() {
    return (
        <Stack.Navigator
            screenOptions={screenOptionss}
        >
            {/* <Stack.Screen name="tabs" component={TabNavigation} /> */}
            <Stack.Screen name="home" component={Home} />
            <Stack.Screen name="children" component={ViewAllStudents} />
            <Stack.Screen name="viewStudent" component={ViewChildren} />
            <Stack.Screen name="studentDetail" component={StudentDetails} options={{
                headerShown: true,
                headerTitle: 'View Student Detail',

            }} />
            <Stack.Screen name="studentSchedule" component={ViewSchedule} options={{
                headerShown: true,
                headerTitle: 'View Schedule',

            }} />
            <Stack.Screen name="studentAttendance" component={ViewAttendance} options={{
                headerShown: true,
                headerTitle: 'View Attendance',

            }} />
            <Stack.Screen name="studentFee" component={Fee} options={{
                headerShown: true,
                headerTitle: 'View Fees',

            }} />
            <Stack.Screen name="studentHomework" component={HomeWork} options={{
                headerShown: true,
                headerTitle: 'Homework',

            }} />
            <Stack.Screen name="studentReport" component={ViewProgress} options={{
                headerShown: true,
                headerTitle: 'View Progress',

            }} />
            <Stack.Screen name="viewAppointment" component={ViewAppointments} />
            <Stack.Screen name="leaveApplication" component={LeaveApplication} options={{
                headerShown: true,
                headerTitle: 'Leave Application ',

            }} />
            <Stack.Screen name="compensation" component={Compensation} />
            <Stack.Screen name="payFees" component={FeeCollection} options={{
                headerShown: true,
                headerTitle: 'Student Fees ',

            }} />
            <Stack.Screen name="testimonials" component={Testimonials} options={{
                headerShown: true,
                headerTitle: 'Testimonials',

            }} />
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