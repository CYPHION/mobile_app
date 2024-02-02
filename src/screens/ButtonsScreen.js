import React from 'react'
import { View } from 'react-native'
import CustomButton from '../components/base/CustomButton'
import { Color } from '../utils/colorPalette'

const ButtonsScreen = () => {
    return (
        <View>
            <CustomButton
                disabled={true}
                title={"click me"}
                onPress={() => console.log("cliked")}
            />
            <View style={{ flexDirection: "row" }}>
                <View style={{ width: "50%" }}>
                    <CustomButton
                        disabled={false}
                        title={"click me"}
                        onPress={() => console.log("cliked")}
                    />
                </View>
                <View style={{ width: "50%" }}>
                    <CustomButton
                        disabled={false}
                        title={"click me"}
                        onPress={() => console.log("cliked")}
                    />
                </View>
            </View>
            <CustomButton
                color={Color.primary}
                btnstyle={{ backgroundColor: Color.white }}
                title={"click me"}
                onPress={() => console.log("cliked")}
            />
            <CustomButton
                disabled={true}
                btnstyle={{ width: 150, padding: 5 }}
                title={"click me"}
                onPress={() => console.log("cliked")}
            />
        </View>
    )
}

export default ButtonsScreen