import React, { Component } from 'react';
import { View, StyleSheet, ActivityIndicator, SafeAreaView, Text } from 'react-native';
import { Container, Header, Title, Content, Button, Icon, Left, Body, Right } from "native-base";
import LogoTitle from '../Components/LogoTitle';
import { ColorBg, ColorHeader } from '../key';
export default class Home extends Component {

    static navigationOptions = {
        headerTitle: () => <LogoTitle />,
        headerTitleAlign: {
            textAlign: 'center'
        }
    };
    
    render() {
        return (
            // <>{
            //     categories.length < 1 ? 
            //     <View style={[styles.container_indicator, styles.horizontal]}>
            //         <ActivityIndicator size="large" color="#0000ff" />
            //     </View> :
            //     <FlatList 
            //         data={categories}
            //         numColumns={2}
            //         renderItem={({ item }) =>
            //             <View style={{flex: 1, paddingHorizontal: 10}}>
            //                 <CategoryListItem random={Math.random} category={item} onPress={() => navigation.navigate('Products', { categoryProduct: item })}/>
            //             </View>
            //         }
            //         keyExtractor={(item) => `${item.id}`}
            //         contentContainerStyle={styles.container}
            //     />
            // }</>
            <Container style={{backgroundColor: ColorBg}}>
                <Header style={{backgroundColor: ColorHeader}} androidStatusBarColor='#000' transparent>
                    <Body>
                        <Title style={{fontSize: 26, color: '#D90368', fontWeight:'700', alignSelf: 'center'}}>Home</Title>
                    </Body>
                </Header>
                <Content contentContainerStyle={styles.err}>
                    <Text style={{color: '#888'}}>Home</Text>
                </Content>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
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
    }
})