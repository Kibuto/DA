import React, { Component } from 'react';
import { View, StyleSheet, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import { Container, Header, Title, Body, Content } from "native-base";
import { connect } from 'react-redux';
import { fetchProductsLikeRequest, fetchProductsHomeRequest, changeTypesHome } from '../actions';
import HomeListItem from '../Components/HomeListItem';
import { ColorBg, ColorHeader, HOST } from '../key';
class Home extends Component {
    componentDidMount() {
        this._handleOnSelected(0);
        this.props.fetchAllLike();
    }

    _handleOnSelected = (key) => {
        const { types, changeTypesHome } = this.props;
        types.map((item, index) => {
            if (key === index) {
                this.props.fetchAllCategoires(item.category);
                item.selected = true;
            } else {
                item.selected = false;
            }
        })
        changeTypesHome(types);
    }

    render() {
        const { navigation, like, categories, types } = this.props;
        return (
            <Container style={{ backgroundColor: ColorBg }}>
                <Header style={{ backgroundColor: ColorHeader }} androidStatusBarColor='#000' transparent>
                    <Body>
                        <Title style={styles.title_header}>Home</Title>
                    </Body>
                </Header>
                <Content>
                    <Image resizeMode='stretch' style={styles.image} source={{ uri: 'https://www.netguru.co/hubfs/Blog_posts_-_images/pexels-photo-46274.jpeg' }} />
                    <FlatList
                        data={types}
                        renderItem={({ item, index, separators }) =>
                            <TouchableOpacity onPress={() => this._handleOnSelected(index)} >
                                <Text style={[item.selected && { fontWeight: '700' }, { fontSize: 17, marginHorizontal: 7 }]}>{item.title}</Text>
                            </TouchableOpacity>
                        }
                        horizontal={true}
                        keyExtractor={(item) => `${item.id}`}
                        //extraData={selected}
                        contentContainerStyle={{ marginLeft: 5 }}
                        showsHorizontalScrollIndicator={false}
                    />

                    <FlatList
                        data={categories}
                        renderItem={({ item }) =>
                            <HomeListItem
                                onPress={() => navigation.navigate('Detail', { product: item })}
                                category={true}
                                product={item}
                            />
                        }
                        horizontal={true}
                        keyExtractor={(item) => `${item._id}`}
                        contentContainerStyle={styles.container}
                        showsHorizontalScrollIndicator={false}
                    />

                    <Text style={styles.title}>You may also like</Text>
                    <FlatList
                        data={like}
                        renderItem={({ item, index }) =>
                            <HomeListItem
                                onPress={() => navigation.navigate('Detail', { product: item })}
                                index={index}
                                length={like.length - 1}
                                category={false}
                                order={false}
                                product={item}
                            />
                        }
                        horizontal={true}
                        keyExtractor={(item) => `${item._id}`}
                        contentContainerStyle={{ paddingHorizontal: 10 }}
                        showsHorizontalScrollIndicator={false}
                    />
                </Content>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 15,
        marginHorizontal: 5
    },
    container_indicator: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title_header: {
        fontSize: 26,
        color: '#D90368',
        fontWeight: '700',
        alignSelf: 'center'
    },
    image: {
        height: 150,
        borderRadius: 20,
        marginBottom: 15
    },
    horizontal: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10
    },
    title: {
        fontSize: 18,
        fontWeight: '700',
        marginLeft: 12,
        marginVertical: 10
    },
    err: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    wrapper: {
        marginHorizontal: 10
    }
});

const mapStateToProps = (state) => {
    return {
        like: state.categoriesLike,
        categories: state.categoriesHome,
        types: state.typesHome
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        fetchAllLike: () => {
            dispatch(fetchProductsLikeRequest('Thriller'))
        },
        fetchAllCategoires: (id) => {
            dispatch(fetchProductsHomeRequest(id))
        },
        changeTypesHome: (typesList) => {
            dispatch(changeTypesHome(typesList))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);