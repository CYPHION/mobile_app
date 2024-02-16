import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Color } from '../../utils/color';

const Graph = () => {
    return (
        <View>
            <View style={{ paddingHorizontal: 10, backgroundColor: Color.white }}>
                <LineChart
                    data={{
                        labels: ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"],
                        datasets: [
                            {
                                data: [
                                    Math.random() * 10,
                                    Math.random() * 10,
                                    Math.random() * 40,
                                    Math.random() * 3,
                                    Math.random() * 10,
                                    Math.random() * 100,
                                    Math.random() * 100
                                ],
                                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,  // Custom color for the line
                            },
                            {
                                data: [
                                    Math.random() * 20,
                                    Math.random() * 30,
                                    Math.random() * 10,
                                    Math.random() * 50,
                                    Math.random() * 60,
                                    Math.random() * 40,
                                    Math.random() * 80,

                                ],
                                strokeWidth: 3,
                                r: "7",
                                stroke: Color.error,
                                color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`,  // Custom color for the line

                            },
                            // Add more datasets for additional lines if needed
                        ]
                    }}
                    width={Dimensions.get("window").width} // from react-native
                    height={200}
                    yAxisLabel="£"
                    yAxisSuffix="k"
                    yAxisInterval={2} // optional, defaults to 1
                    chartConfig={{
                        backgroundColor: Color.black,
                        backgroundGradientFrom: Color.white,
                        backgroundGradientTo: Color.pureWhite,
                        backgroundGradientFromOpacity: 0,
                        backgroundGradientToOpacity: 0.5,
                        fillShadowGradientFrom: 'transparent', // Turn off shadows by setting to transparent
                        decimalPlaces: 2,
                        color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`, // Default color for the lines
                        labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                        style: {
                            borderRadius: 16
                        },
                        // propsForDots: {
                        //     r: "4",
                        //     strokeWidth: "1",
                        //     stroke: Color.error,
                        //     fill: 'transparent',

                        // }
                    }}
                    // bezier
                    style={{
                        marginVertical: 8,
                        borderRadius: 16,
                        // width: Dimensions.get("window").width * 0.85
                    }}
                />
            </View>
        </View>
    );
};

export default Graph;

const styles = StyleSheet.create({});
