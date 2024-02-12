import React from 'react'
import { View } from 'react-native'
import CustomButton from '../components/base/CustomButton'
import { API } from '../network/API'
import { customToast } from '../utils/functions'

const ButtonsScreen = () => {
    const showToast = () => {
        API.getGlobalData()
            .then(res => console.log(res))
            .catch(err => customToast('error', err))
    }

    return (
        <View>
            <CustomButton
                variant={'fill'}
                disabled={true}
                title={"click me"}
                onPress={() => alert("cliked")}
            />
            <View style={{ flexDirection: "row" }}>
                <View style={{ width: "50%" }}>
                    <CustomButton
                        variant={'fill'}
                        disabled={false}
                        title={"click me"}
                        onPress={() => alert("cliked")}
                    />
                </View>
                <View style={{ width: "50%" }}>
                    <CustomButton
                        disabled={false}
                        title={"toast"}
                        onPress={() => customToast('success', "hello")}
                    />
                </View>
            </View>
            <CustomButton
                variant={'fill'}
                title={"Toast"}
                onPress={showToast}
            />
            <CustomButton
                disabled={true}
                btnstyle={{ width: 150, padding: 5 }}
                title={"click me"}
                onPress={() => alert("cliked")}
            />
        </View>
    )
}

export default ButtonsScreen