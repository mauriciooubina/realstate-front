import Theme from '../../styles/Theme';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
import realstateWS from '../../../networking/api/endpoints/realstateWS';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Rating } from "react-native-stock-star-rating";

export default ExperienceScreenUI = () => {
    const navigation = useNavigation();
    const [realStateData, setRealStateData] = useState(null);
    const [comments, setComments] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRealEstateData = async () => {
            try {
                const id = await AsyncStorage.getItem('contactId');
                const response = await realstateWS.get(id);
                setRealStateData(response.data[0]);
                const res = await realstateWS.getComment(id);
                setComments(res.data)
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };
        fetchRealEstateData();
    }, []);

    return (
        <View style={styles.container}>
            {loading ? (
                <ActivityIndicator size="large" color={Theme.colors.clear.PRIMARY} />
            ) : (
                <View style={{ width: '90%', height: '90%' }}>
                    <View style={{ alignItems: 'left' }}>
                        <Text style={styles.title}>{realStateData.fantasyName}</Text>
                    </View>
                    <View style={styles.stars}>
                        <Rating maxStars={5} size={35} stars={!realStateData.qualification ? 0 : realStateData.qualification} />
                    </View>

                    <View style={{ alignItems: 'left' }}>
                        <Text style={styles.title}>Experiencias</Text>
                    </View>
                    <ScrollView style={{ marginTop: 10 }}>
                        {comments ? (
                            comments.map((comment, index) => (
                                <View key={index} style={{ width: '90%' }}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text style={{ textDecorationLine: 'underline', fontSize: 17 }}>
                                            {`${comment.username}: `}
                                        </Text>
                                        <Text style={{ fontSize: 17 }}>{comment.comment}</Text>
                                    </View>
                                    <View
                                        style={{
                                            borderBottomWidth: 0.6,
                                            borderBottomColor: 'grey',
                                            marginVertical: 15,
                                        }}
                                    />
                                </View>
                            ))
                        ) : (null
                        )}
                    </ScrollView>

                </View>
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
        fontSize: 30,
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