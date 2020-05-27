import React, { PureComponent } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { Container, Header, Content } from "native-base";
import { ColorBg, ColorHeader } from '../key';
import { fetchRefuseOrderRequest, fetchCheckOrderRequest } from '../actions';
import { _changeFormatToVND } from '../utils/Number';
import { connect } from 'react-redux';
import HomeListItem from '../Components/HomeListItem';
class OrderDetails extends PureComponent {

    _handleCheckOrder = (id, index) => {
        const { token } = this.props;
        const bearer = `Bearer ${token}`;
        this.props.fetchCheckOrder(bearer, id, index);
        this.props.navigation.navigate('Orders');
    }

    _handleRefuseOrder = (id, index) => {
        const { token } = this.props;
        const bearer = `Bearer ${token}`;
        this.props.fetchRefuseOrder(bearer, id, index);
        this.props.navigation.navigate('Orders');
    }

    showAlert = (id, index, type) => {
        Alert.alert(
            'Hello',
            `Do you want to ${type ? 'check' : 'refuse'} this order?`,
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel'
                },
                {
                    text: 'OK',
                    onPress: () => type ? this._handleCheckOrder(id, index) : this._handleRefuseOrder(id, index)
                },
            ],
            { cancelable: false },
        )
    }

    render() {
        const { listOrder, isAdmin, index } = this.props.route.params;
        return (
            <Container style={{ backgroundColor: ColorBg }}>
                <Header style={{ backgroundColor: ColorHeader }} androidStatusBarColor='#000' transparent />
                <Content style={{ marginVertical: 10, fontSize: 18, fontStyle: 'italic', fontWeight: '700', letterSpacing: 1 }}>
                    <Text style={styles.title}>Order Details</Text>
                    <Text style={styles.thank}>Thank you for shopping with us</Text>
                    <View>
                        <View style={styles.container}>
                            <View style={[styles.Wrapper_tax, { fontSize: 20, borderBottomWidth: 1, paddingBottom: 10 }]}>
                                <Text style={[styles.key, { fontWeight: "bold", fontSize: 24 }]}>Order No.</Text>
                                <Text style={styles.key}>#{listOrder._id.slice(0, 7).toUpperCase()}</Text>
                            </View>
                            <FlatList
                                data={listOrder.cartItems}
                                renderItem={({ item, index }) =>
                                    <HomeListItem
                                        onPress={() => navigation.navigate('Detail', { product: item })}
                                        index={index}
                                        length={listOrder.cartItems.length - 1}
                                        category={false}
                                        order={true}
                                        detail={true}
                                        product={item}
                                    />
                                }
                                horizontal={true}
                                keyExtractor={(item) => `${item._id}`}
                                contentContainerStyle={{ paddingTop: 20 }}
                                showsHorizontalScrollIndicator={false}
                            />
                            <View style={styles.Wrapper_tax}>
                                <Text style={styles.key}>Name:</Text>
                                <Text style={styles.key}>{listOrder.name}</Text>
                            </View>
                            <View style={styles.Wrapper_tax}>
                                <Text style={styles.key}>Phone:</Text>
                                <Text style={styles.key}>{listOrder.phone}</Text>
                            </View>
                            {/* <View style={styles.Wrapper_tax}>
                                    <Text style={styles.key}>Address:</Text>
                                    <Text style={styles.key}>209/43/2 Ton That Thuyet P3 Q4</Text>
                                </View> */}
                            <View style={styles.Wrapper_tax}>
                                <Text style={styles.key}>Product:</Text>
                                <Text style={styles.key}>{_changeFormatToVND(listOrder.price)}</Text>
                            </View>
                            <View style={styles.Wrapper_tax}>
                                <Text style={styles.key}>Estimated Tax:</Text>
                                <Text style={styles.key}>{`0 VNĐ`}</Text>
                            </View>
                            <View style={[styles.Wrapper_tax, { borderStyle: 'solid', borderBottomWidth: 1, paddingBottom: 20 }]}>
                                <Text style={styles.key}>Shipping Charges:</Text>
                                <Text style={styles.key}>{`0 VNĐ`}</Text>
                            </View>
                            <View style={styles.Wrapper_tax}>
                                <Text style={styles.key}>Order Total:</Text>
                                <Text style={styles.key}>{_changeFormatToVND(listOrder.price)}</Text>
                            </View>
                        </View>
                        {
                            isAdmin ?
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
                                    <TouchableOpacity
                                        onPress={() => this.showAlert(listOrder._id, index, true)}
                                        style={[styles.btn_admin, { backgroundColor: '#42b72a' }]}
                                    >
                                        <Text style={styles.btn_text}>Accept</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() => this.showAlert(listOrder._id, index, false)}
                                        style={[styles.btn_admin, { backgroundColor: '#e82b2b' }]}
                                    >
                                        <Text style={styles.btn_text}>Refuse</Text>
                                    </TouchableOpacity>
                                </View>
                                :
                                <TouchableOpacity
                                    activeOpacity={.6}
                                    style={styles.btn}
                                >
                                    <Text style={styles.btn_text}>Delete</Text>
                                </TouchableOpacity>
                        }
                    </View>

                </Content>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 20,
        width: '90%',
        alignSelf: 'center',
        paddingHorizontal: 10,
        backgroundColor: '#fff',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: .9,
        shadowRadius: 10,
        elevation: 3,
        marginVertical: 10,
        borderRadius: 10
    },
    title: {
        marginVertical: 5,
        marginLeft: '5%',
        fontSize: 26,
        fontStyle: 'italic',
        fontWeight: '700',
        letterSpacing: 1,
        color: '#D90368',
        textTransform: 'capitalize'
    },
    thank: {
        marginBottom: 5,
        marginLeft: '15%',
        fontSize: 18,
        fontStyle: 'italic',
        letterSpacing: 1,
        textTransform: 'capitalize'
    },
    details: {
        fontSize: 20,
        fontWeight: '700',
        borderStyle: 'solid',
        borderBottomWidth: 1,
        paddingBottom: 10
    },
    key: {
        fontSize: 18,
        fontStyle: 'italic'
    },
    Wrapper_tax: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 7
    },
    btn: {
        width: '80%',
        backgroundColor: '#D90368',
        alignSelf: 'center',
        paddingVertical: 15,
        borderRadius: 999,
        marginVertical: 10
    },
    btn_text: {
        textAlign: 'center',
        color: 'white',
        textTransform: 'capitalize',
        fontSize: 20,
        fontWeight: 'bold'
    },
    btn_admin: {
        marginVertical: 10,
        width: '40%',
        paddingVertical: 15,
        borderRadius: 999
    }
})

const mapStateToProps = (state) => {
    return {
        token: state.token
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        fetchCheckOrder: (bearer, id, index) => {
            dispatch(fetchCheckOrderRequest(bearer, id, index));
        },
        fetchRefuseOrder: (bearer, id, index) => {
            dispatch(fetchRefuseOrderRequest(bearer, id, index));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderDetails);