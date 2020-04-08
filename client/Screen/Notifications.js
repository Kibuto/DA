import React, { Component } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import ProductListItem from '../Components/ProductListItem';
class Notifications extends Component {

    render() {
        const { list } = this.props;
        return (
            <FlatList
                data={list}
                renderItem={({ item }) => 
                    <View style={styles.wrapper}>
                        <ProductListItem notification={true} product={item}/>
                    </View>
                }
                keyExtractor={(item) => `${item._id}`}
                contentContainerStyle={styles.container}
            />
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