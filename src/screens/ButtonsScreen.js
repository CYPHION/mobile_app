import React from 'react'
import { View } from 'react-native'
import CustomButton from '../components/base/CustomButton'

const ButtonsScreen = () => {
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
                        title={"click me"}
                        onPress={() => alert("cliked")}
                    />
                </View>
            </View>
            <CustomButton
                variant={'fill'}
                title={"click me"}
                onPress={() => alert("cliked")}
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