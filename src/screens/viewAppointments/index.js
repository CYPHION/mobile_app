import React, { useEffect, useState } from 'react';
import {
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import CardIcon from 'react-native-vector-icons/AntDesign';
import FilterIcon from 'react-native-vector-icons/FontAwesome';
import BookIcon, {
  default as CalendarIcon,
  default as CapIcon,
} from 'react-native-vector-icons/FontAwesome5';
import GridIcon from 'react-native-vector-icons/Ionicons';
import { default as NoHomework } from 'react-native-vector-icons/MaterialCommunityIcons';
import TimeIcon from 'react-native-vector-icons/MaterialIcons';
import { useDispatch, useSelector } from 'react-redux';
import CustomDatePicker from '../../components/base/CustomDatePicker';
import Table from '../../components/base/Table';
import { globalData } from '../../store/thunk';
import { Color } from '../../utils/color';
import { FontFamily, FontSizes } from '../../utils/font';
import { formattedDate, screenDimensions } from '../../utils/functions';
import { GlobalStyles } from '../../utils/globalStyles';

const ViewAppointments = () => {
  // Importing necessary hooks and functions
  const [refresh, setRefresh] = useState(false); // State for refresh status
  const [open, setOpen] = useState(false); // State for controlling open status
  const [data, setData] = useState([]); // State for storing data
  const global = useSelector(state => state.global.data); // Selecting global data from Redux store
  const user = useSelector(state => state.user.data); // Selecting user data from Redux store
  const dispatch = useDispatch(); // Dispatch function for Redux actions

  // Object to define status colors
  const statusColor = {
    Completed: Color.active,
    Cancelled: Color.error,
    Pending: Color.freeze,
    Missed: Color.primary,
  };

  // Function to filter appointments by date range
  const filterByDate = (startDate, endDate) => {
    let filterData;
    if (!!startDate && !!endDate) {
      filterData = global?.appointments?.filter(item => {
        const itemDate = new Date(item?.appointDate);
        return itemDate >= startDate && itemDate <= endDate;
      });
    } else {
      filterData = global?.appointments?.filter(item => true);
    }
    setData(filterData);
  };

  // Function to handle refreshing data
  const handleRefresh = () => {
    setRefresh(true); // Set refresh status to true
    dispatch(globalData(user?.id)) // Dispatch action to fetch global data
      .then(() => {
        filterByDate(); // Filter data by date range
        setRefresh(false); // Set refresh status to false
      })
      .catch(() => {
        filterByDate(); // Filter data by date range
        setRefresh(false); // Set refresh status to false
      });
  };
  // Function to render item when no appointments are found

  const renderItem = () => (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        height: screenDimensions.height * 0.8,
      }}>
      <View>
        <NoHomework
          name="book-off-outline"
          size={screenDimensions.width * 0.5}
          color={Color.textTThree}
        />
        <Text style={styles.inactivetext}>No Appointment found</Text>
      </View>
    </View>
  );
  // Function to generate list items for appointment details
  const list = elem => [
    {
      name: ' Title',
      value: `${elem?.subject}`,
      icon: (
        <CardIcon color={Color.primary} name="idcard" size={FontSizes.lg} />
      ),
    },
    {
      name: ' Department',
      value: `${elem?.DepartmentAppointments.map(
        elem => elem?.Department?.name.split(' ')[0],
      ).join('\n')}`,
      icon: <BookIcon color={Color.primary} name="book" size={FontSizes.lg} />,
    },
    {
      name: ' Date',
      value: `${elem?.appointDate}`,
      icon: (
        <TimeIcon color={Color.primary} name="timelapse" size={FontSizes.lg} />
      ),
    },
    {
      name: ' Time',
      value: `${formattedDate(
        `${elem.appointDate}T${elem.startTime}`,
        'hh:mm:z',
      )} to ${formattedDate(`${elem.appointDate}T${elem.endTime}`, 'hh:mm:z')}`,
      icon: <GridIcon color={Color.primary} name="grid" size={FontSizes.lg} />,
    },
    {
      name: ' Status',
      // value: `${elem?.status}`,
      value: (
        <Text style={{ color: statusColor[elem?.status] }}>{elem?.status}</Text>
      ),
      icon: (
        <CapIcon
          color={Color.primary}
          name="graduation-cap"
          size={FontSizes.lg}
        />
      ),
    },
    {
      name: ' Remarks',
      value: `${elem?.remarks}`,
      icon: (
        <CalendarIcon
          color={Color.primary}
          name="calendar-check"
          size={FontSizes.lg}
        />
      ),
    },
  ];

  useEffect(() => {
    filterByDate();
  }, [global?.appointments]);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        refreshControl={
          <RefreshControl onRefresh={handleRefresh} refreshing={refresh} />
        }>
        {data?.length > 0 ? (
          <>
            <View style={[GlobalStyles.headerStyles]}>
              <Text style={GlobalStyles.headerTextStyle}>Analytics</Text>
              <TouchableOpacity
                onPress={() => setOpen(true)}
                activeOpacity={0.7}
                style={[styles.container, { gap: 5 }]}>
                <View style={[styles.iconView]}>
                  <FilterIcon
                    name="filter"
                    color={Color.white}
                    size={FontSizes.lg}
                  />
                </View>
                <Text style={[styles.CompText, styles.textFontFamily]}>
                  Select Date
                </Text>
              </TouchableOpacity>
            </View>
            <View>
              {data.length > 0 ? (
                data.map((elem, index) => (
                  <Table key={index} list={list(elem)} />
                ))
              ) : (
                <>{renderItem()}</>
              )}
            </View>
          </>
        ) : (
          <>{renderItem()}</>
        )}
        <CustomDatePicker
          isVisible={open}
          onToggle={() => setOpen(false)}
          onDone={date => filterByDate(date?.startDate, date?.endDate)}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default ViewAppointments;

const styles = StyleSheet.create({
  bgColor: {
    backgroundColor: Color.grayBackground,
    padding: 10,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  detailText: {
    fontSize: FontSizes.xl,
    color: Color.textThree,
    fontFamily: FontFamily.medium,
  },
  iconView: {
    backgroundColor: Color.primary,
    padding: 5,
    borderRadius: 4,
  },
  textFontFamily: {
    fontFamily: FontFamily.interRegular,
  },
  CompText: {
    color: Color.text,
  },
  inactivetext: {
    textAlign: 'center',
    color: Color.textTThree,
    fontSize: FontSizes.lg,
  },
});
