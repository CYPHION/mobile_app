import React from 'react';
import { StyleSheet, View } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Color } from '../../utils/color';
import { screenDimensions } from '../../utils/functions';

const Graph = (prop) => {
    const { labels, dataOne, dataTwo } = prop
    return (
        <View style={styles.graphCont}>
            <LineChart
                data={{
                    labels: labels,
                    datasets: [
                        {
                            data: dataOne ? dataOne : [],
                            strokeWidth: 2,
                            r: "7",
                            color: (opacity = 1) => `rgba(18, 55, 42, 1)`,
                        },
                        {
                            data: dataTwo ? dataTwo : [],
                            strokeWidth: 2,
                            r: "7",
                            stroke: Color.primary,
                            color: (opacity = 1) => `rgba(13, 146, 118, 1)`,

                        },
                        // Add more datasets for additional lines if needed
                    ]
                }}
                width={screenDimensions.width * 0.92} // from react-native
                height={250}
                withShadow={false}
                yAxisLabel="£"
                yAxisSuffix="k"
                yAxisInterval={2} // optional, defaults to 1
                // yLabelsOffset={10}
                // horizontalLabelRotation={0}
                verticalLabelRotation={-45}
                chartConfig={{
                    // backgroundColor: Color.black,
                    backgroundGradientFrom: Color.white,
                    backgroundGradientTo: Color.pureWhite,
                    // backgroundGradientFromOpacity: 0,
                    // backgroundGradientToOpacity: 0.5,
                    fillShadowGradientFrom: 'transparent', // Turn off shadows by setting to transparent
                    decimalPlaces: 2,
                    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // Default color for the lines
                    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                    style: {
                        borderRadius: 16
                    },
                    propsForDots: {
                        r: "3.5",
                        strokeWidth: "0.5",
                        stroke: Color.black,
                        fill: 'white',

                    }
                }}
                // bezier
                style={{
                    // marginVertical: 50,
                    // borderRadius: 16,
                    // width: screenDimensions.width * 0.85
                }}
            />
        </View>
    );
};

export default Graph;

const styles = StyleSheet.create({
    graphCont: {
        padding: 10,
        backgroundColor: Color.white,
        width: screenDimensions.width,
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center'
    }
});
