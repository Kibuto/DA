import React, { Component } from 'react';
import { View, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import { Header, Title, Button, Icon, Body, Right } from "native-base";
import CategoryListItem from "../Components/CategoryListItem";
import { HOST, ColorBg, ColorHeader } from '../key';
import { connect } from 'react-redux';
import { fetchCategoriesRequest } from '../actions';
class Categories extends Component {
    componentDidMount() {
        this.props.fetchAllCategories();
    }

    render() {
        const { categories, navigation } = this.props;
        return (
            <>{
                categories.length < 1 ?
                    <View style={[styles.container_indicator, styles.horizontal]}>
                        <ActivityIndicator size="large" color="#0000ff" />
                    </View> :
                    <>
                        <Header style={{ backgroundColor: ColorHeader }} androidStatusBarColor='#000' transparent>
                            <Body>
                                <Title style={{ fontSize: 26, color: '#D90368', fontWeight: '700' }}>Categories</Title>
                            </Body>
                            <Right>
                                <Button transparent>
                                    <Icon style={{ color: '#D90368' }} name='menu' />
                                </Button>
                            </Right>
                        </Header>
                        <FlatList
                            data={categories}
                            numColumns={2}
                            renderItem={({ item }) =>
                                <View style={{ flex: 1, paddingHorizontal: 10 }}>
                                    <CategoryListItem
                                        random={Math.random}
                                        category={item}
                                        onPress={() => navigation.navigate('Products', { categoryProduct: item })}
                                    />
                                </View>
                            }
                            keyExtractor={(item) => `${item._id}`}
                            contentContainerStyle={styles.container}
                        />
                    </>
            }</>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        categories: state.categories
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        fetchAllCategories: () => {
            dispatch(fetchCategoriesRequest())
        }
    }
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 10,
        paddingTop: 16,
        backgroundColor: ColorBg
    },
    container_indicator: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    horizontal: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Categories);