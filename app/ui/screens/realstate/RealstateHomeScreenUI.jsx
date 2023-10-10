import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Theme from '../../styles/Theme';
import Mail from '../../../../assets/images/mail.png';
import {useNavigation} from '@react-navigation/native';
import NavigatorConstants from '../../../navigation/NavigatorConstants';

export default RealstateHomeScreenUI = () => {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>

        </View>
    )
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: 'center',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
