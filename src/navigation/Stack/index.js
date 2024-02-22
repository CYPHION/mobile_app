import { useRoute } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CustomAppBar from '../../components/base/CustomAppBar';
import AddTestimonial from '../../screens/AddTestimonial';
import Compensation from '../../screens/Compensation';
import HomeWork from '../../screens/HomeWork';
import LeaveApplication from '../../screens/LeaveApplication';
import Notifications from '../../screens/Notifications';
import StudentDetails from '../../screens/StudentDetails';
import Testimonials from '../../screens/Testimonials';
import ViewAttendance from '../../screens/ViewAttendance';
import ViewChildren from '../../screens/ViewChildren';
import ViewFess from '../../screens/ViewFees';
import ViewSchedule from '../../screens/ViewSchedule';
import ViewAllStudents from '../../screens/viewAllStudents';
import ViewAppointments from '../../screens/viewAppointments';
import ViewProgress from '../../screens/viewProgress';
import TabNavigation from '../Tab';
const Stack = createNativeStackNavigator();

let screenOptionss = {
    headerShown: false, // Hide header for all screens
}


const StackProfile = createNativeStackNavigator();
const ChildrenStack = () => {
    return <StackProfile.Navigator
        initialRouteName='childrenView'
        screenOptions={screenOptionss}
    >
        <Stack.Screen name="childrenView" component={ViewAllStudents} options={{
            headerShown: true,
            header: () => <CustomAppBar title={'Childrens'} />

        }} />
        <Stack.Screen name="viewStudent" component={ViewChildren} options={({ route, navigation }) => ({
            headerShown: true,
            header: () => <CustomAppBar title={route.params.title} />
        })} />
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
        <Stack.Screen name="fee" component={ViewFess} options={{
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
    </StackProfile.Navigator>
}



export function MyStack() {
    const route = useRoute()

    return (
        <Stack.Navigator
            screenOptions={screenOptionss}
        >

            <Stack.Screen name="main" component={TabNavigation} />
            <Stack.Screen name="children" component={ChildrenStack} />
            <Stack.Screen name="addTestimonial" component={AddTestimonial} options={{
                headerShown: true,
                headerTitle: 'Testimonials',

            }} />
            <Stack.Screen name="viewAppointment" component={ViewAppointments} options={{
                headerShown: true,
                headerTitle: 'View Appointments ',

            }} />
            <Stack.Screen name="leaveApplication" component={LeaveApplication} options={{
                headerShown: true,
                headerTitle: 'Leave Application ',

            }} />
            <Stack.Screen name="compensation" component={Compensation} />
            <Stack.Screen name="testimonials" component={Testimonials} options={{
                headerShown: true,
                headerTitle: 'Testimonials',

            }} />
            <Stack.Screen name="notifications" component={Notifications}
                options={{
                    headerShown: true,
                    header: () => <CustomAppBar title={'Notifications'} />

                }}
            />


        </Stack.Navigator>
    );
}