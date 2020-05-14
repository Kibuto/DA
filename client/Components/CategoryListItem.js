import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
export default class CategoryListItem extends Component {

    _handleRandomColor = () => {
        const { random } = this.props;
        let index = Math.round(random() * 10);
        if (index < 3) {
            return '#4C7C9B';
        }
        else if (index < 7) {
            return '#B9314F';
        }
        else {
            return '#F5853F';
        }
    }

    render() {
        const { category, onPress } = this.props;
        return (
            <TouchableOpacity onPress={onPress} style={[styles.container, { backgroundColor: this._handleRandomColor() }]} activeOpacity={0.5}>
                <Text style={styles.header}>{category.name}</Text>
                <View style={{ elevation: 1, position: 'relative' }}>
                    <View style={styles.boxShadow} />
                    <Image resizeMode='stretch' style={styles.categoryImg} source={{ uri: category.img }} />
                </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 16,
        paddingHorizontal: 32,
        borderRadius: 10,
        marginBottom: 16,
        shadowOffset: {
            width: 0,
            height: 0
        },
        shadowOpacity: .9,
        shadowRadius: 10,
        elevation: 4
    },
    header: {
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '700',
        marginBottom: 15,
        color: '#FFF'
    },
    categoryImg: {
        height: 150,
        marginBottom: 10,
        borderRadius: 8,
    },
    boxShadow: {
        backgroundColor: '#000',
        position: "absolute",
        top: 3,
        left: 6,
        height: '95%',
        width: `100%`,
        borderRadius: 8,
        opacity: 0.3
    }
});
// import React from 'react';
// import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

// export default function CategoryListItem(props) {
//     const { category, onPress } = props;
//     return (
//         <TouchableOpacity activeOpacity={0.5} onPress={onPress}>
//             <View style={styles.container}>
//                 <Text style={styles.title}>{category.name}</Text>
//                 <Image style={styles.categoryImg} source={{ uri: category.img }} />
//             </View>
//         </TouchableOpacity>
//     )
// }

// const styles = StyleSheet.create({
//     container: {
//         alignItems: 'center',
//         padding: 16,
//         borderRadius: 4,
//         borderColor: '#CCC',
//         borderStyle: 'solid',
//         borderWidth: 2,
//         backgroundColor: '#FFF',
//         marginBottom: 16
//     },
//     title: {
//         textTransform: 'uppercase',
//         marginBottom: 8,
//         fontWeight: '700'
//     },
//     categoryImg: {
//         width: 64,
//         height: 64
//     }
// });