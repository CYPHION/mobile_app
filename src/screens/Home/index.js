import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import AccordionItem from '../../components/base/Accordion';
import { GlobalStyles } from '../../utils/globalStyles';

const Home = ({ navigation }) => {
    const [activeItem, setActiveItem] = useState(null);
    const items = [
        {
            date: "18 Jan - 20 Jan ",
            studentName: "Abdullah Khan (Weekly)",
            title: "£120",
            data: [
                { name: "Previous Dues", value: "£0" },
                { name: "Book dues", value: "£78" },
                { name: "Discount", value: "£10" },
                { name: "Paid Amount", value: "£89" },
            ],
        },
        {
            date: "28 Mar - 30 Apr ",
            studentName: "Hammad  (Weekly)",
            title: "£1000",
            data: [
                { name: "Previous Dues", value: "£19" },
                { name: "Book dues", value: "£952" },
                { name: "Discount", value: "£185" },
                { name: "Paid Amount", value: "£78" },
            ],
        },
    ];
    const toggleItem = (index) => {
        setActiveItem(activeItem === index ? null : index); // Toggle state based on click
    };





    return (
        <ScrollView>
            <View>
                <Text>Home tab</Text>
                <TouchableOpacity onPress={() => navigation.navigate('testimonials')}>
                    <Text>navigate to testimonials</Text>
                </TouchableOpacity>
                {items.map((item, index) => (
                    <AccordionItem
                        children={item.data?.map((elem, index) => (
                            <View key={index} style={GlobalStyles.contentView}>
                                <Text style={[GlobalStyles.contentItem]}>{elem.name}</Text>
                                <Text style={[GlobalStyles.contentItem]}>{elem.value}</Text>
                            </View>
                        ))}
                        key={index}
                        date={item.date}
                        studentName={item.studentName}
                        total={item.title}
                        data={item.data}
                        expanded={activeItem === index}
                        onToggle={() => toggleItem(index)} // Pass toggle function to each item
                    />
                ))}




            </View>
        </ScrollView>
    )
}

export default Home

const styles = StyleSheet.create({

})