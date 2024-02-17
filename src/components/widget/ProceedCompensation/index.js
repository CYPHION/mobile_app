import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Color } from '../../../utils/color'
import { screenDimensions } from '../../../utils/functions'
import CustomButton from '../../base/CustomButton'
import GridTable from '../../base/GridTable'


const ProceedCompensation = (props) => {


    const { setActiveStudent, setProcess } = props

    const item = [
        {
            name: "Enrollment date",
            value: "10/8/2024",
        },
        {
            name: "agblsuyuil syufy sfap",
            value: "jfksafh.ajkkflas;jk",
        },
        {
            name: "hfsgksabjhfuklagklsakfa",
            value: "10/8/2024",
        },
        {
            name: "date",
            value: "10/8/2024",
        },
        {
            name: "name",
            value: "M.Owais",
        },
        {
            name: "Enrollment date",
            value: "10/8/2024",
        },
    ]
    const tableData = [
        {
            item,
        },
        {
            item,
        },
        {
            item,
        },
        {
            item,
        },
    ]


    return (
        <View>
            <View style={{ padding: 10 }}>
                {tableData.map((elem, index) => (
                    <GridTable
                        data={elem.item}
                        key={index}

                    />
                ))}
            </View>
            <View style={{ width: screenDimensions.width, alignItems: 'center' }}>

                <CustomButton
                    title='Create All'
                    variant='fill'
                    btnstyle={{ width: '90%' }}
                    onPress={() => alert('Compensation Created!')}
                />
            </View>
            <View style={{ width: screenDimensions.width, alignItems: 'center' }}>

                <CustomButton
                    title='Go Back'
                    btnstyle={{ width: '90%', borderWidth: 1, borderColor: Color.primary }}
                    onPress={() => {
                        setProcess(false)
                        setActiveStudent(true);
                    }}
                />
            </View>
        </View>
    )
}

export default ProceedCompensation

const styles = StyleSheet.create({})