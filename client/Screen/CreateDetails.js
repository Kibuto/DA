import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Container, Header, Title, Body, Content, Button } from "native-base";
import { ColorBg, ColorHeader, HOST } from '../key';
import { _changeFormatToVND } from '../utils/Number';

function CreateDetails(props) {
    const { product, isAdmin, index, fncDelProduct, fncCheckProduct } = props.route.params;
    return (
        <Container style={{ backgroundColor: ColorBg }}>
            <Header
                style={{ backgroundColor: ColorHeader }}
                androidStatusBarColor='#000'
                transparent
            >
                <Body>
                    <Title style={{ fontSize: 26, color: '#D90368', fontWeight: '700', alignSelf: 'center' }}>Product Detail</Title>
                </Body>
            </Header>
            <Content>
                <View style={styles.container}>
                    <View style={styles.section_image}>
                        <Image
                            resizeMode='contain'
                            source={{ uri: `${HOST}${product.images[0].url}` }}
                            style={{ height: 180, width: 140, borderRadius: 20 }}
                        />
                    </View>
                    <View style={styles.section_content}>
                        <Text style={styles.section_content_name}>{product.author}</Text>
                        <Text style={styles.section_content_author}>{product.name}</Text>
                        <Text style={styles.section_content_description}>{product.description}</Text>
                    </View>
                    <View style={styles.section_price}>
                        <View style={styles.Wrapper_tax}>
                            <Text style={styles.key}>Seller:</Text>
                            <Text style={[styles.key, { marginRight: 10 }]}>{product.seller}</Text>
                        </View>
                        <View style={styles.Wrapper_tax}>
                            <Text style={styles.key}>Order Date:</Text>
                            <Text style={[styles.key, { marginRight: 10 }]}>{product.date.split('T')[0]}</Text>
                        </View>
                        <View style={styles.Wrapper_tax}>
                            <Text style={styles.key}>Price:</Text>
                            <Text style={[styles.key, { marginRight: 10 }]}>{_changeFormatToVND(product.price)}</Text>
                        </View>
                        <View style={[styles.Wrapper_tax, { borderStyle: 'solid', borderBottomWidth: 1, paddingBottom: 20 }]}>
                            <Text style={styles.key}>Estimated Tax:</Text>
                            <Text style={[styles.key, { marginRight: 10 }]}>{_changeFormatToVND(Math.trunc(Number.parseInt(product.price) * 20 / 100))}</Text>
                        </View>
                        <View style={[styles.Wrapper_tax, { marginBottom: 20, marginTop: 10 }]}>
                            <Text style={styles.key}>Total:</Text>
                            <Text style={[styles.key, { marginRight: 10 }]}>{_changeFormatToVND(Number.parseInt(product.price) - Math.trunc(Number.parseInt(product.price) * 20 / 100))}</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.section_btn}>
                    {
                        isAdmin ?
                            <View style={styles.wrapper_content}>
                                <TouchableOpacity
                                    onPress={() => fncCheckProduct(product._id, index, true)}
                                    style={[styles.btn_admin, { backgroundColor: '#42b72a' }]}
                                >
                                    <Text style={styles.text_btn}>Accept</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => fncCheckProduct(product._id, index, false)}
                                    style={[styles.btn_admin, { backgroundColor: '#e82b2b' }]}
                                >
                                    <Text style={styles.text_btn}>Refuse</Text>
                                </TouchableOpacity>
                            </View> :
                            product.isCheck ? product.isDeleted ?
                                <TouchableOpacity
                                    activeOpacity={.6}
                                    style={styles.btn}
                                    onPress={() => fncDelProduct(product._id, index)}
                                >
                                    <Text style={styles.text_btn}>Delete</Text>
                                </TouchableOpacity> : null :
                                <TouchableOpacity
                                    activeOpacity={.6}
                                    style={styles.btn}
                                    onPress={() => fncDelProduct(product._id, index)}
                                >
                                    <Text style={styles.text_btn}>Delete</Text>
                                </TouchableOpacity>
                    }
                </View>
            </Content>
        </Container>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        backgroundColor: '#fff',
        marginHorizontal: 20,
        borderRadius: 10,
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: .9,
        shadowRadius: 10,
        elevation: 3,
        borderRadius: 10,
        marginBottom: 10
    },
    section_image: {
        alignSelf: 'center',
        marginTop: 30,
    },
    section_content: {
        borderStyle: 'solid',
        borderBottomWidth: 1,
        marginHorizontal: 30,
    },
    section_content_name: {
        textAlign: 'center',
        marginTop: 10,
        fontSize: 18,
        fontWeight: '700',
        color: '#999'
    },
    section_content_author: {
        textAlign: 'center',
        marginTop: 5,
        fontSize: 28,
        fontWeight: '700'
    },
    section_content_description: {
        textAlign: 'justify',
        marginTop: 15,
        fontSize: 17,
        letterSpacing: 1,
        marginBottom: 20,
    },
    section_price: {
        marginTop: 20
    },
    Wrapper_tax: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 5,
        marginHorizontal: 30
    },
    key: {
        fontSize: 18,
        fontStyle: 'italic'
    },
    section_btn: {
        marginTop: 10,
        marginHorizontal: 20,
        marginBottom: 20
    },
    btn_admin: {
        width: '40%',
        paddingVertical: 15,
        borderRadius: 999
    },
    text_btn: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    wrapper_content: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    btn: {
        width: '80%',
        backgroundColor: '#D90368',
        alignSelf: 'center',
        paddingVertical: 15,
        borderRadius: 999
    },
})

export default CreateDetails;