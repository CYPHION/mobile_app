import React from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import Table from '../../base/Table'

const ViewApplication = () => {
    const list = [
        { name: ' fkgksgfak', value: 'fkahf' },
        { name: ' fkgksgfak', value: 'fkahf' },
        { name: ' fkgksgfak', value: 'fkahf' },
        { name: ' fkgksgfak', value: 'fkahf' },

    ]

    const items = [
        {
            list,
            status: 'Pending'
        },
        {
            list,
            status: 'Rejected'
        },
        {
            list,
            status: 'Accepted'
        },
    ]


    return (
        <ScrollView>

            <View>
                <Text>Profile Tab</Text>
                {items.map((elem, index) => (
                    <Table key={index} status={elem.status} list={elem.list} />
                ))}
            </View>
        </ScrollView>
    )
}

export default ViewApplication

const styles = StyleSheet.create({})