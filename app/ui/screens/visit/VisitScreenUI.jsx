import Theme from '../../styles/Theme';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, TextInput, ActivityIndicator, Image } from 'react-native';
import VisitModal from '../../../components/VisitModal';
import { Calendar } from 'react-native-calendars';
import DropdownComponent from "../../../components/DropdownComponent";

export default VisitScreenUI = () => {
    const navigation = useNavigation();
    const [showSend, setShowSend] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const contador = [{ label: '01:00', value: '01:00' }, { label: '02:00', value: '02:00' }, { label: '03:00', value: '03:00' }, { label: '04:00', value: '04:00' }, { label: '05:00', value: '05:00' },
    { label: '06:00', value: '06:00' }, { label: '07:00', value: '07:00' }, { label: '08:00', value: '08:00' }, { label: '09:00', value: '09:00' }, { label: '10:00', value: '10:00' },
    { label: '11:00', value: '11:00' }, { label: '12:00', value: '12:00' }, { label: '13:00', value: '13:00' }, { label: '14:00', value: '14:00' }, { label: '15:00', value: '15:00' },
    { label: '16:00', value: '16:00' }, { label: '17:00', value: '17:00' }, { label: '18:00', value: '18:00' }, { label: '19:00', value: '19:00' }, { label: '20:00', value: '20:00' },
    { label: '21:00', value: '21:00' }, { label: '22:00', value: '22:00' }, { label: '23:00', value: '23:00' }, { label: '24:00', value: '24:00' },];

    const handleSendQuestion = () => {
        setShowSend(true);
    };

    const closeSendQuestion = () => {
        setShowSend(false);
    };

    return (
        <View style={styles.container}>
            <View style={{ width: '80%', height: '90%' }}>
                <View style={{ alignItems: 'center' }}>
                    <Text style={styles.title}>PROGRAMAR VISITA</Text>
                </View>
                <View style={{ marginTop: 10 }}>
                    <Calendar
                        onDayPress={(day) => setSelectedDate(day.dateString)}
                        markedDates={selectedDate ? { [selectedDate]: { selected: true } } : {}} />
                </View>
                <View style={styles.contentContainer}>
                    <View style={{ marginTop: 10 }}>
                        <DropdownComponent title="Horario" data={contador} name="time" onChange={(fieldName, selectedValue) => { setFieldValue(fieldName, selectedValue.value); }} />
                    </View>
                </View>

                <View style={styles.buttons}>
                    <TouchableOpacity style={[styles.blueButton]} onPress={handleSendQuestion} >
                        <Text style={[styles.realStateText]}>  Programar  </Text>
                    </TouchableOpacity>
                </View>
            </View>
            {showSend && (
                <VisitModal closeVisit={closeSendQuestion} />
            )}
        </View >
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',

    },
    title: {
        fontWeight: '400',
        fontSize: 26,
        color: Theme.colors.clear.PRIMARY,
    },
    inputText: {
        color: '#000',
        fontSize: 14,
        fontWeight: '400',
    },
    input: {
        width: '95%',
        backgroundColor: '#F6F6F6',
        padding: 3,
        borderRadius: 5,
        marginBottom: 30,
        borderRadius: 10,
        borderWidth: 0.5,
    },
    blueButton: {
        display: 'flex',
        padding: 5,
        paddingHorizontal: 20,
        marginHorizontal: 20,
        backgroundColor: Theme.colors.clear.PRIMARY,
        borderRadius: 30,
    },
    realStateText: {
        color: 'white',
        fontSize: 14,
    },

    buttons: {
        display: 'flex',
        width: '100%',
        justifyContent: 'center',
        flexDirection: 'row',
        marginTop: 30,
    },
    subtitleContainer: {
        margin: 30,
    },
    subtitle: {
        color: '#000',
        fontSize: 20,
        fontWeight: '400',
        justifyContent: 'center',
    },
    header: {
        backgroundColor: 'red',
        width: '100%',
        height: '13%'
    },
    stars: {
        marginBottom: 20,
    },
    whiteButton: {
        display: 'flex',
        padding: 5,
        paddingHorizontal: 20,
        marginHorizontal: 20,
        borderRadius: 30,
        borderColor: Theme.colors.clear.PRIMARY,
        borderWidth: 2,

    },
    whiteText: {
        color: Theme.colors.clear.PRIMARY,
        fontSize: 14,
    },
});