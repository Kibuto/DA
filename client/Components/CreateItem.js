import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Alert, Picker, Dimensions } from 'react-native';
import ActionSheet from 'react-native-actionsheet';
import ImagePicker from 'react-native-image-picker';
import { Input, Item, Label, Form, Icon, Textarea } from 'native-base';
import Logo from '../images/Brand-white.png';
import { validateMoney } from '../utils/Validation';
import { HOST } from '../key';
const { width, height } = Dimensions.get('window');
class CreateItem extends Component {

    state = {
        image: '',
        type: '',
        fileName: '',
        name: '',
        price: '',
        errorName: '',
        errorPrice: '',
        category: 'category',
        description: '',
    }

    showActionSheet = () => {
        this.ActionSheet.show()
    }

    onActionSelectPhotoDone = (index) => {
        const options = {
            title: 'Select Avatar',
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };
        switch (index) {
            case 0:
                ImagePicker.launchCamera(options, (response) => {
                    if (response.didCancel) {
                        console.log('User cancelled image picker');
                    } else if (response.error) {
                        console.log('ImagePicker Error: ', response.error);
                    } else if (response.customButton) {
                        console.log('User tapped custom button: ', response.customButton);
                    } else {
                        this.setState({
                            image: response.uri
                        })
                    }
                })
                break;
            case 1:
                ImagePicker.launchImageLibrary(options, (response) => {
                    if (response.didCancel) {
                        console.log('User cancelled image picker');
                    } else if (response.error) {
                        console.log('ImagePicker Error: ', response.error);
                    } else if (response.customButton) {
                        console.log('User tapped custom button: ', response.customButton);
                    } else {
                        this.setState({
                            image: response.uri,
                            type: response.type,
                            fileName: response.fileName
                        })
                    }
                })
                break;
            default:
                break;
        }
    };

    _handleOnSale = () => {
        const { name, image, price, category, type, fileName, description } = this.state;
        const { token } = this.props;
        const bearer = `Bearer ${token}`;
        let formData = new FormData();
        formData.append('avatar', {
            uri: image,
            type,
            name: fileName
        });
        formData.append('name', name);
        formData.append('price', price);
        formData.append('category', category);
        formData.append('description', description);
        fetch(`${HOST}/api/upload`, {
            method: 'post',
            headers: new Headers({
                'Authorization': bearer,
                "Content-category": "multipart/form-data"
            }),
            body: formData
        })
            .then(res => res.json())
            .then(json => {
                console.log(json);
                if (json.success) {
                    this.showAlert(json.message);
                } else {
                    console.log('Error')
                }
            })
    };

    showAlert = (str) => {
        const { navigation } = this.props;
        Alert.alert(
            `${str}`,
            'You are going to be redirected to the Products Screen',
            [
                { text: 'OK', onPress: () => navigation.navigate('Categories') },
            ]
        )
    }

    validatePrice = (money) => {
        const { price } = this.state;
        if (validateMoney(money)) {
            console.log('Money');
            this.setState({
                price,
                errorPrice: false,
                errorMessage: ''
            })
        } else {
            this.setState({
                errorPrice: true,
                errorMessage: 'Price invalid (Must be at least 5 number)'
            })
        }
    }

    render() {
        const { name, price, errorPrice, errorName, image, category, description, errorMessage } = this.state;
        return (
            <KeyboardAvoidingView>
                <View style={styles.container}>
                    <Image resizeMode='contain' source={Logo} style={styles.logo} />
                    <Text style={{ textAlign: 'center', fontSize: 18, fontWeight: '700', marginBottom: 15 }}>What would you like to sell?</Text>
                    {errorMessage ? <Text style={{ color: '#E9446A', fontSize: 16, fontWeight: '700', marginVertical: 10 }}>{errorMessage}</Text> : null}
                    <Item floatingLabel style={{ marginBottom: 20 }}>
                        <Label>Name Product</Label>
                        <Input
                            autoCapitalize='none'
                            autoCorrect={false}
                            onChangeText={name => this.setState({ name })}
                        />
                    </Item>
                    <Item floatingLabel style={{ marginBottom: 20 }} error={errorPrice.length ? true : false}>
                        <Label>Price product</Label>
                        <Input
                            autoCapitalize='none'
                            autoCorrect={false}
                            onChangeText={price => this.validatePrice(price)}
                        />
                    </Item>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', marginBottom: 10 }}>
                        <Text style={{ flex: 2 / 5, fontSize: 18 }}>Category: </Text>
                        <Text style={{ flex: 2 / 5, fontSize: 18 }}>{category}</Text>
                        <Picker
                            style={{ borderColor: 'red', borderWidth: 1, height: 32, width: 32, flex: 1 / 5 }}
                            selectedValue={category}
                            onValueChange={(itemValue, itemIndex) => this.setState({ category: itemValue })}>
                            <Picker.Item label="History" value="History" />
                            <Picker.Item label="Adventure" value="Adventure" />
                            <Picker.Item label="Mystery" value="Mystery" />
                            <Picker.Item label="Romance" value="Romance" />
                            <Picker.Item label="Horror" value="Horror" />
                            <Picker.Item label="Different..." value="Different..." />
                        </Picker>
                    </View>
                    <Textarea onChangeText={description => this.setState({ description })} rowSpan={3} style={{ width: (width / 100) * 85 }} bordered placeholder="Description product" />


                    <TouchableOpacity style={styles.btn} activeOpacity={0.5} onPress={this.showActionSheet}>
                        <Text style={styles.btn_text} >Choose Image</Text>
                    </TouchableOpacity>

                    {image ? <Image resizeMode='contain' source={{ uri: image }} style={{ width: 120, height: 120, marginTop: 10 }} /> : null}

                    {
                        image ?
                            <TouchableOpacity style={styles.btn} activeOpacity={0.5} onPress={this._handleOnSale}>
                                <Text style={styles.btn_text} >Sell</Text>
                            </TouchableOpacity> : null
                    }

                    <ActionSheet
                        ref={o => this.ActionSheet = o}
                        title={'Select photo'}
                        options={['Take Photo...', 'Choose from Library...', 'Cancel']}
                        cancelButtonIndex={2}
                        destructiveButtonIndex={1}
                        onPress={index => {
                            this.onActionSelectPhotoDone(index);
                        }}
                    />
                </View>
            </KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 16,
        backgroundColor: '#FFF',
        borderRadius: 10,
        width: '92%',
        alignSelf: 'center',
        shadowRadius: 10,
        shadowOpacity: .9,
        shadowOffset: {
            width: 0,
            hieght: 2
        },
        elevation: 3,
        marginBottom: 20
    },
    logo: {
        width: `100%`,
        height: 100
    },
    btn: {
        width: `50%`,
        backgroundColor: `#2089dc`,
        borderRadius: 5,
        marginTop: 20,
        marginBottom: 20
    },
    btn_text: {
        textAlign: 'center',
        padding: 12,
        fontSize: 16,
        color: '#FFF'
    }
});

export default CreateItem;