import React, { Component } from 'react';
import { View, Text, StyleSheet, ImageBackground, FlatList } from 'react-native';
import { Container, Header, Title, Content, Button, Icon, Left, Body, Right } from "native-base";
import { HOST, ColorBg, ColorHeader } from '../key';
import { fetchGetOrderRequest } from '../actions';
import { _handleGetFromStorage } from '../utils/Storage';
import { connect } from 'react-redux';
import OrderListItem from '../Components/OrderListItem';
class OrderScreen extends Component {

    componentDidMount() {
        this._handleGetOrder();
    }

    _handleGetOrder = async () => {
        let { token } = this.props;
        if (!token) {
            token = await _handleGetFromStorage('token');
        }
        if (token) {
            const bearer = `Bearer ${token}`;
            this.props.fetchGetOrder(bearer);
        } else {
            console.log(`Don't have token in Order screen`);
        }

    }

    shouldComponentUpdate(nextProps, nextState) {
        if (this.props.token !== nextProps.token) {
            return true;
        }
        if (this.props.listOrder.length !== nextProps.listOrder.length) {
            return true;
        }
        if (this.props.isAdmin !== nextProps.isAdmin) {
            return true;
        }
        return false;
    }

    componentDidUpdate() {
        this._handleGetOrder();
    }

    render() {
        const { listOrder, isAdmin } = this.props;
        return (
            <Container style={{ backgroundColor: ColorBg }}>
                <Header style={{ backgroundColor: ColorHeader }} androidStatusBarColor='#000' transparent>
                    <Body>
                        <Title style={{ fontSize: 26, color: '#D90368', fontWeight: '700', alignSelf: 'center' }}>Orders</Title>
                    </Body>
                </Header>
                {
                    listOrder.length === 0 ?
                        <ImageBackground
                            source={{ uri: 'https://cdn.dribbble.com/users/357929/screenshots/2276751/orderup-emptystate-sadbag.png' }}
                            style={{ flex: 1 }}
                        /> :
                        <FlatList
                            data={listOrder}
                            renderItem={({ item, index }) =>
                                <OrderListItem
                                    item={item}
                                    navigation={this.props.navigation}
                                    isAdmin={isAdmin}
                                    index={index}
                                />
                            }
                            keyExtractor={(item) => `${item._id}`}
                            contentContainerStyle={styles.container}
                        />

                }
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 15,
        paddingHorizontal: 15
    }
})

const mapStateToProps = (state) => {
    return {
        token: state.token,
        listOrder: state.listOrder,
        isAdmin: state.isAdmin
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        fetchGetOrder: (bearer) => {
            dispatch(fetchGetOrderRequest(bearer));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderScreen);