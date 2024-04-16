import { DrawerContentScrollView, createDrawerNavigator } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import AntIcon from 'react-native-vector-icons/AntDesign';
import { AuthSTack } from '../../../App';
import CustomAppBar from '../../components/base/CustomAppBar';
import AboutUs from '../../screens/About-us';
import ApplyOnline from '../../screens/ApplyOnline';
import AwardingBodies from '../../screens/AwardingBodies';
import BrightStudent from '../../screens/BrightStudent';
import Careers from '../../screens/Careers';
import Childcare from '../../screens/Childcare';
import ContactUs from '../../screens/ContactUs';
import Fees from '../../screens/Fees';
import JobApply from '../../screens/JobApply';
import JobListing from '../../screens/JobListing';
import LessonTiming from '../../screens/LessonTiming';
import OurServices from '../../screens/OurServices';
import Reviews from '../../screens/Reviews';
import SummerPakage from '../../screens/SummerPakage';
import TermsAndConditions from '../../screens/TermsAndConditions';
import { Color } from '../../utils/color';
import { FontFamily, FontSizes } from '../../utils/font';
import { screenDimensions } from '../../utils/functions';
const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();



// Main stack navigator for the entire app
export function HomeStack() {

    return (
        <Stack.Navigator
            initialRouteName='aboutus'
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen name="aboutus" component={AboutUs}
                options={{
                    headerShown: true,
                    header: () => <CustomAppBar title={'About Us'} back={false} />
                }}
            />
            <Stack.Screen name="lessonTiming" component={LessonTiming}
                options={{
                    headerShown: true,
                    header: () => <CustomAppBar title={'Lesson Timings'} back={false} />
                }}
            />
            <Stack.Screen name="fees" component={Fees}
                options={{
                    headerShown: true,
                    header: () => <CustomAppBar title={'Fees'} back={false} />
                }}
            />
            <Stack.Screen name="summerpakage" component={SummerPakage}
                options={{
                    headerShown: true,
                    header: () => <CustomAppBar title={'Summer Package'} back={false} />
                }}
            />
            <Stack.Screen name="ourservices" component={OurServices}
                options={{
                    headerShown: true,
                    header: () => <CustomAppBar title={'Our Services'} back={false} />
                }}
            />
            <Stack.Screen name="brightstudent" component={BrightStudent}
                options={{
                    headerShown: true,
                    header: () => <CustomAppBar title={'Bright Students'} back={false} />
                }}
            />
            <Stack.Screen name="termsandcondition" component={TermsAndConditions} />
            <Stack.Screen name="awardingbodies" component={AwardingBodies}
                options={{
                    headerShown: true,
                    header: () => <CustomAppBar title={'Awarding Bodies'} back={false} />
                }}
            />
            <Stack.Screen name="childcare" component={Childcare}
                options={{
                    headerShown: true,
                    header: () => <CustomAppBar title={'Childcare'} back={false} />
                }}
            />
            <Stack.Screen name="reviews" component={Reviews}
                options={{
                    headerShown: true,
                    header: () => <CustomAppBar title={'Reviews'} back={false} />
                }}
            />
            <Stack.Screen name="career" component={Careers} />
            <Stack.Screen name="joblisting" component={JobListing} />
            <Stack.Screen name="applyonline" component={ApplyOnline}
                options={{
                    headerShown: true,
                    header: () => <CustomAppBar title={'Apply Online'} back={false} />
                }}
            />
            <Stack.Screen name="contactus" component={ContactUs}
                options={{
                    headerShown: true,
                    header: () => <CustomAppBar title={'Contact Us'} back={false} />
                }}
            />
            <Stack.Screen name="jobapply" component={JobApply} />
        </Stack.Navigator>
    );
}


// List of items in the drawer menu
const DrawerList = [
    { label: 'About us', navigateTo: 'aboutus', icon: 'right', mainRoute: 'homestack' },
    { label: 'Lesson Timings', navigateTo: 'lessonTiming', icon: 'right', mainRoute: 'homestack' },
    { label: 'Fees', navigateTo: 'fees', icon: 'right', mainRoute: 'homestack' },
    { label: 'Summer Pakages', navigateTo: 'summerpakage', icon: 'right', mainRoute: 'homestack' },
    { label: 'Our Services', navigateTo: 'ourservices', icon: 'right', mainRoute: 'homestack' },
    { label: 'Bright Student', navigateTo: 'brightstudent', icon: 'right', mainRoute: 'homestack' },
    { label: 'Terms and conditions', navigateTo: 'termsandcondition', icon: 'right', mainRoute: 'homestack' },
    { label: 'Awarding Bodies', navigateTo: 'awardingbodies', icon: 'right', mainRoute: 'homestack' },
    { label: 'Childcare', navigateTo: 'childcare', icon: 'right', mainRoute: 'homestack' },
    { label: 'Reviews', navigateTo: 'reviews', icon: 'right', mainRoute: 'homestack' },
    { label: 'Careers', navigateTo: 'career', icon: 'right', mainRoute: 'homestack' },
    { label: 'Job listing', navigateTo: 'joblisting', icon: 'right', mainRoute: 'homestack' },
    { label: 'Job Apply', navigateTo: 'jobapply', icon: 'right', mainRoute: 'homestack' },
    { label: 'Apply online', navigateTo: 'applyonline', icon: 'right', mainRoute: 'homestack' },
    { label: 'Contact Us', navigateTo: 'contactus', icon: 'right', mainRoute: 'homestack' },
    { label: 'Login', navigateTo: 'login', icon: 'right', mainRoute: 'auth' },
];




// Individual item in the drawer menu
const DrawerLayout = ({ icon, label, navigateTo, setOpen, mainRoute }) => {
    const navigation = useNavigation();
    const routeName = navigation.getCurrentRoute()?.name; // Get current route name

    // Check if the route name exists and matches navigateTo
    const isActiveScreen = routeName && routeName === navigateTo;

    return (
        <TouchableOpacity activeOpacity={0.7} style={isActiveScreen && {
            backgroundColor: `rgba(255,255,255,0.2)`, borderTopEndRadius: 50,
            borderBottomEndRadius: 50,
        }} onPress={() => {
            navigation.navigate(`${mainRoute}`, { screen: navigateTo })
        }}
        >
            <View style={[styles.labelContainer, { width: '100%', }]}>
                <Text style={{ fontSize: FontSizes.xl, fontWeight: '600', color: Color.white }}>{label}</Text>

                {icon && <AntIcon name={icon} color={Color.white} size={20} />}
            </View>
        </TouchableOpacity>
    )
};




// Custom drawer content component
function CustomDrawerContent(props) {

    return (
        <DrawerContentScrollView {...props}>
            <View style={styles.drawerContent}>
                <View style={styles.drawerSection}>
                    {DrawerList.map((el, i) => {
                        return (
                            <DrawerLayout
                                key={i}
                                label={el.label}
                                navigateTo={el.navigateTo}
                                icon={el.icon}
                                mainRoute={el.mainRoute}
                                {...props}
                            />
                        );
                    })}
                </View>
            </View>


        </DrawerContentScrollView>

    );
}



const HomeDrawar = () => {
    return (
        <Drawer.Navigator
            initialRouteName='homestack'
            drawerContent={(props) => <CustomDrawerContent {...props} />}
            screenOptions={{
                headerShown: false, // Hide header for all screens
                drawerStyle: {
                    backgroundColor: Color.primary,
                    width: '100%',
                },
            }}

        >
            <Drawer.Screen name="auth" component={AuthSTack} />
            <Drawer.Screen name="homestack" component={HomeStack} />

        </Drawer.Navigator>
    )
}

export default HomeDrawar

const styles = StyleSheet.create({
    drawerContent: {
        flex: 1,
        padding: 30
    },
    title: {
        fontSize: FontSizes.xxxl,
        marginTop: 3,
        color: Color.white,
        fontWeight: 'bold',
    },

    drawerSection: {
        marginTop: 25,
        paddingTop: 25,
        marginLeft: 0,
        gap: 10
    },
    image: {
        backgroundColor: Color.grayBackground,
        width: screenDimensions.width * 0.18,
        height: screenDimensions.width * 0.18,
        borderRadius: screenDimensions.width * 0.18 * 0.5,
    },
    labelContainer: {
        marginLeft: 0,
        padding: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    text: {
        fontFamily: FontFamily.interRegular,
        textAlign: 'center',
        color: Color.text
    },
    btnView: {
        width: '15%'
    },
    btnView: {
        // marginTop: 15,
        width: "100%",
        justifyContent: "space-between",
        // backgroundColor: 'red',
        flexDirection: "row",
    },
});