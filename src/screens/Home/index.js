import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import DropdownComponent from '../../components/base/CustomDropDown';
import MultiSelectComponent from '../../components/base/MultiSelect';

const Home = ({ navigation }) => {
    const [option, setOption] = useState("");
    const [selectedValues, setSelectedValues] = useState([])
    const data = [
        { name: "Item 1", value: "1" },
        { name: "Item 2", value: "2" },
        { name: "Item 3", value: "3" },
        { name: "Item 4", value: "4" },
        { name: "Item 5", value: "5" },
        { name: "Item 6", value: "6" },
        { name: "Item 7", value: "7" },
        { name: "Item 8", value: "8" },
    ];

    console.log(selectedValues)
    return (
        <ScrollView>
            <View>
                <Text>Home tab</Text>
                <DropdownComponent

                    disable={false}
                    data={data}
                    placeHolderText={"Parent"}
                    value={option}
                    setValue={setOption}
                />

                <MultiSelectComponent
                    list={data}
                    values={selectedValues}
                    setValues={setSelectedValues}
                    label={'Drop down'}
                    placeHolderText={'Drop Down '}
                />
            </View>
        </ScrollView>
    )
}

export default Home

const styles = StyleSheet.create({

})