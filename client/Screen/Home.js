import React, { Component } from 'react';
import { View, StyleSheet, ActivityIndicator, Dimensions, Text, FlatList, TouchableOpacity, ImageBackground, Image } from 'react-native';
import { Container, Header, Title, Content, Button, Icon, Left, Body, Right } from "native-base";
import HomeListItem from '../Components/HomeListItem';
import { ColorBg, ColorHeader, HOST } from '../key';
const { height, width } = Dimensions.get('screen');
export default class Home extends Component {

    state = {
        data: [],
        like: [],
        categories: [
            {
                id: 1,
                title: 'All',
                selected: true,
                category: 'Romance'
            }, 
            {
                id: 2,
                title: 'Recommended',
                selected: false,
                category: 'Mystery'
            }, 
            {
                id: 3,
                title: 'Popular books',
                selected: false,
                category: 'History'
            },
            {
                id: 4,
                title: 'Best seller',
                selected: false,
                category: 'Healthy'
            }
        ]
    }

    // componentDidMount() {
    //     this._handleBestSeller();
    //     this._handleRelease();
    // }

    // _handleBestSeller = () => {
    //     const id = 'Romance'
    //     fetch(`${HOST}/api/products?category=${id}`)
    //         .then(res => res.json())
    //         .then(json => {
    //             if(json.success) {
    //                 this.setState({
    //                     bestSeller: json.message
    //                 })
    //             }
    //             else {
    //                 console.log('Ko lay duoc products');
    //             }
    //     });
    // }

    // _handleRelease = () => {
    //     const id = 'Mystery'
    //     fetch(`${HOST}/api/products?category=${id}`)
    //         .then(res => res.json())
    //         .then(json => {
    //             if(json.success) {
    //                 this.setState({
    //                     release: json.message
    //                 })
    //             }
    //             else {
    //                 console.log('Ko lay duoc products');
    //             }
    //     });
    // }
    componentDidMount() {
        this._handleOnSelected(0);
        this._handleCallApi();
    }

    _handleCallApi = () => {
        fetch(`${HOST}/api/products?category=Thriller`)
            .then(res => res.json())
            .then(json => {
                if(json.success) {
                    this.setState({like: json.message})
                }
                else {
                    console.log('Ko lay duoc products');
                }
        });
    }

    _handleOnSelected = (key) => {
        this.state.categories.map((item, index) => {
            if(key === index) {
                fetch(`${HOST}/api/products?category=${item.category}`)
                    .then(res => res.json())
                    .then(json => {
                        if(json.success) {
                            this.setState({data: json.message})
                        }
                        else {
                            console.log('Ko lay duoc products');
                        }
                });
                item.selected = true;
            } else {
                item.selected = false
            }
        })
        this.setState({categories: this.state.categories})
    }
    
    render() {
        const { data, categories, like } = this.state;
        const { navigation } = this.props;
        return (
            <Container style={{backgroundColor: ColorBg}}>
                <Header style={{backgroundColor: ColorHeader}} androidStatusBarColor='#000' transparent>
                    <Body>
                        <Title style={{fontSize: 26, color: '#D90368', fontWeight:'700', alignSelf: 'center'}}>Home</Title>
                    </Body>
                </Header>
                <Image resizeMode='stretch' style={{height: 150, borderRadius: 20, marginBottom: 15}} source={{uri: 'https://www.netguru.co/hubfs/Blog_posts_-_images/pexels-photo-46274.jpeg'}}/>
                <View>
                    <FlatList 
                        data={ categories }
                        renderItem={({ item, index, separators }) => 
                            <TouchableOpacity onPress={() => this._handleOnSelected(index)} >
                                <Text style={[item.selected&&{fontWeight: '700'}, {fontSize: 17, marginHorizontal: 7}]}>{item.title}</Text>
                            </TouchableOpacity>
                        }
                        horizontal={true}
                        keyExtractor={(item) => `${item.id}`}
                        //extraData={selected}
                        contentContainerStyle={{marginLeft: 5}}
                    />

                    <FlatList 
                        data={ data }
                        renderItem={({ item }) => 
                            <HomeListItem onPress={() => navigation.navigate('Detail', { product: item })} category={true} product={item}/>
                        }
                        horizontal={true}
                        keyExtractor={(item) => `${item._id}`}
                        contentContainerStyle={styles.container}
                        showsHorizontalScrollIndicator={false}
                    />

                    <Text style={{fontSize: 18, fontWeight: '700', marginLeft: 12, marginVertical: 10}}>You may also like</Text>
                    <FlatList 
                        data={ like }
                        renderItem={({ item, index }) => 
                            <HomeListItem onPress={() => navigation.navigate('Detail', { product: item })} index={index} length={like.length - 1} category={false} product={item}/>
                        }
                        horizontal={true}
                        keyExtractor={(item) => `${item._id}`}
                        contentContainerStyle={{marginLeft: 10, marginRight: 100}}
                        showsHorizontalScrollIndicator={false}
                    />
                </View>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 15,
        marginHorizontal: 10
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
    },
    err: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    wrapper: {
        marginHorizontal: 10
    }
})