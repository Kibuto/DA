import React, { Component } from 'react';
import { View, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import CategoryListItem from "../Components/CategoryListItem";
import { HOST } from '../key';
class Categories extends Component {

    static navigationOptions = {
        headerTitleAlign: {
            textAlign: 'center'
        }
    };

    state = {
        categories: []
    }

    componentDidMount() {
        this._handleCallApi();
    }

    _handleCallApi = () => {
        fetch(`${HOST}/api/categories`)
            .then(res => res.json())
            .then(json => {
                if(json.success) {
                    this.setState({
                        categories: json.message
                    })
                }
        });
    }

    render() {
        const { categories } = this.state;
        const { navigation } = this.props;
        return (
            <>{
                categories.length < 1 ? 
                <View style={[styles.container_indicator, styles.horizontal]}>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View> :
                <FlatList 
                    data={categories}
                    numColumns={2}
                    renderItem={({ item }) =>
                        <View style={{flex: 1, paddingHorizontal: 10}}>
                            <CategoryListItem random={Math.random} category={item} onPress={() => navigation.navigate('Products', { categoryProduct: item })}/>
                        </View>
                    }
                    keyExtractor={(item) => `${item.id}`}
                    contentContainerStyle={styles.container}
                />
            }</>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 10, 
        backgroundColor: '#fffaff',
        paddingTop: 16
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

export default Categories;
// import React, { Component } from 'react';
// import { View, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
// import LogoTitle from '../Components/LogoTitle';
// import CategoryListItem from "../Components/CategoryListItem";
// import { HOST } from '../key';
// class Categories extends Component {

//     static navigationOptions = {
//         headerTitle: () => <LogoTitle />,
//         headerTitleAlign: {
//             textAlign: 'center'
//         }
//     };

//     state = {
//         categories: []
//     }
    
//     componentDidMount() {
//         this._handleCallApi();
//     }

//     _handleCallApi = () => {
//         fetch(`${HOST}/api/categories`)
//             .then(res => res.json())
//             .then(json => {
//                 if(json.success) {
//                     this.setState({
//                         categories: json.message
//                     })
//                 }
//         });
//     }

//     render() {
//         const { navigation } = this.props;
//         const { categories } = this.state;
//         return (
//             <>
//                 {
//                     categories.length < 1 ? 
//                     <View style={[styles.container_indicator, styles.horizontal]}>
//                         <ActivityIndicator size="large" color="#0000ff" />
//                     </View> :
//                     <FlatList 
//                         data={categories}
//                         //
//                         renderItem={({ item }) => <CategoryListItem category={item} onPress={() => navigation.navigate('Products', { categoryProduct: item })}/>}
//                         keyExtractor={(item) => `${item.id}`}
//                         contentContainerStyle={{paddingHorizontal: 16, backgroundColor: '#fffaff', paddingTop: 16}}
//                     />
//                 }
//             </>
//         )
//     }
// }

// const styles = StyleSheet.create({
//     container_indicator: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center'
//     },
//     horizontal: {
//         flexDirection: 'row',
//         justifyContent: 'space-around',
//         padding: 10
//     }
// });

// export default Categories;