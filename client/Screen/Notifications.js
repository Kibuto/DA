import React, { Component } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { Container, Header, Title, Button, Icon, Left, Body, Right } from "native-base";
import ProductListItem from '../Components/ProductListItem';
import { ColorBg, ColorHeader } from '../key';
class Notifications extends Component {

    render() {
        const { list } = this.props;
        return (
            <Container style={{ backgroundColor: ColorBg }}>
                <Header style={{ backgroundColor: ColorHeader }} androidStatusBarColor='#000' transparent>
                    <Left>
                        <Button transparent >
                            <Icon style={{ color: '#D90368' }} name='arrow-back' />
                        </Button>
                    </Left>
                    <Body>
                        <Title style={{ fontSize: 26, fontWeight: '700', color: '#D90368' }}>Notification</Title>
                    </Body>
                    <Right>
                        <Button transparent>
                            <Icon style={{ color: '#D90368' }} name='search' />
                        </Button>
                    </Right>
                </Header>
                <FlatList
                    data={list}
                    renderItem={({ item }) =>
                        <View style={styles.wrapper}>
                            <ProductListItem notification={true} product={item} />
                        </View>
                    }
                    keyExtractor={(item) => `${item._id}`}
                    contentContainerStyle={styles.container}
                />
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    container_indicator: {
        flex: 1,
        justifyContent: 'center'
    },
    horizontal: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10
    },
    container: {
        paddingHorizontal: 10,
        paddingTop: 30,
    }
})

const mapStateToProps = (state) => {
    return {
        list: state.listNotifications
    }
}

export default connect(mapStateToProps, null)(Notifications);