import React from 'react'
import { Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

const Home = ({ navigation }) => {

    return (
        <View>
            <Text>Home tab</Text>
            <TouchableOpacity onPress={() => navigation.navigate('testimonials')}>
                <Text>navigate to testimoniasl</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Home