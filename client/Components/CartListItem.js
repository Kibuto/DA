import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import { _changeFormatToK } from '../utils/Number';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function CartListItem(props) {
    const { item, countIncrease, removeFromCart, deleteFromCart } = props;
    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Image resizeMode='contain' style={styles.cartImg} source={{ uri: item.images[0].url }} />
                <View style={styles.title}>
                    <Text numberOfLines={2} ellipsizeMode='tail' style={styles.text}>{item.name}</Text>
                    <Text style={[styles.text, { color: '#AAA' }]}>{_changeFormatToK(item.price)}</Text>
                </View>
                <View style={styles.quantity}>
                    <Button
                        onPress={() => removeFromCart(item)}
                        icon={
                            <Icon
                                name="ios-arrow-down"
                                size={15}
                                type='ionicon'
                                color="white"
                            />
                        }
                    />
                    <Text style={{ paddingHorizontal: 8, minWidth: 20 }}>{item.quantity}</Text>
                    <Button
                        onPress={() => countIncrease(item)}
                        icon={
                            <Icon
                                name="ios-arrow-up"
                                size={15}
                                type='ionicon'
                                color="white"
                            />
                        }
                    />
                </View>
            </View>
            <Button
                onPress={() => deleteFromCart(item)}
                containerStyle={{ backgroundColor: 'red', position: 'absolute', top: -15, right: -10 }}
                buttonStyle={{ backgroundColor: 'red', borderRadius: 5 }}
                icon={
                    <Icon
                        name="ios-close"
                        size={15}
                        type='ionicon'
                        color="white"
                    />
                }
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        padding: 16,
        borderRadius: 10,
        borderColor: '#FFF',
        // borderStyle: 'solid',
        borderWidth: 5,
        backgroundColor: '#FFF',
        marginBottom: 16,
        shadowOffset: {
            width: 0,
            height: 0
        },
        shadowOpacity: .9,
        shadowRadius: 10,
        elevation: 4,
        position: "relative"
    },
    content: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    title: {
        textTransform: 'uppercase',
        fontWeight: '700',
        flex: 2 / 3,
        paddingLeft: 16
    },
    text: {
        fontSize: 16,
        marginVertical: 4
    },
    cartImg: {
        width: 64,
        height: 64
    },
    quantity: {
        flex: 1 / 3,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center'
    }
});