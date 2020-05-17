import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from "react-native-vector-icons/Ionicons";
import { Badge } from 'react-native-elements';
import { _changeFormatToVND } from '../utils/Number';
import { ColorBg, ColorHeader } from '../key';
export default function CartFooter(props) {
    const { amount, sum, navigation } = props;
    return (
        <View style={styles.footer}>
            <View style={{ position: 'relative' }}>
                <Ionicons name='ios-folder-open' size={24} color='#ddd' />
                <Badge status='error' value={amount} containerStyle={{ position: 'absolute', top: -4, right: -10 }} />
            </View>
            <Text style={styles.total}>{_changeFormatToVND(sum)}</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Cart')} style={styles.btn}>
                <Text style={styles.text_btn}>Order</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: ColorHeader,
        paddingVertical: 8,
        opacity: .9
    },
    btn: {
        width: `40%`,
        alignSelf: 'center',
        //marginTop: 15,
        borderRadius: 50,
        backgroundColor: '#DB3362',
        paddingVertical: 12
    },
    text_btn: {
        color: '#000',
        fontSize: 18,
        fontWeight: '700',
        color: '#FFF',
        textAlign: 'center',
        letterSpacing: 2
    },
    total: {
        letterSpacing: 1.5,
        fontWeight: '700',
        fontSize: 18,
        color: '#999'
    }
})