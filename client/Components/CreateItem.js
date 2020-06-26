import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Alert, Picker, Dimensions } from 'react-native';
import ActionSheet from 'react-native-actionsheet';
import ImagePicker from 'react-native-image-picker';
import { Input, Item, Label, Textarea } from 'native-base';
import Logo from '../images/logo.jpg';
import { validateMoney } from '../utils/Validation';
import { HOST, ColorBg } from '../key';
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
        errorDescription: '',
        errorCategory: '',
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
                if (json.success) {
                    this.showAlert(json.message);
                } else {
                    console.log('Error')
                }
            })
    };

    _handleCheckCreate = () => {
        const {
            name,
            price,
            category,
            description,
            errorName,
            errorPrice,
            errorPhone,
            errorMessage,
            errorCategory } = this.state;
        if (!name && !price && category === 'category' && !description) {
            this.setState({
                errorName: true,
                errorPrice: true,
                errorDescription: true,
                errorCategory: true,
                errorMessage: 'These fields can not be blank'
            })
        }
        else if (!name) {
            this.setState({
                errorName: true,
                errorPrice: false,
                errorDescription: false,
                errorCategory: false,
                errorMessage: 'Email Invalid'
            })
        }
        else if (!validateMoney(price)) {
            this.setState({
                errorName: false,
                errorPrice: true,
                errorDescription: false,
                errorCategory: false,
                errorMessage: 'Price Invalid (must be at least 5 number)'
            })
        }
        else if (category === 'category') {
            this.setState({
                errorName: false,
                errorPrice: false,
                errorDescription: false,
                errorCategory: true,
                errorMessage: 'Category Invalid'
            })
        }
        else if (!description) {
            this.setState({
                errorName: false,
                errorPrice: false,
                errorDescription: true,
                errorCategory: false,
                errorMessage: 'Description Invalid'
            })
        }
        else {
            this._handleOnSale();
        }
    }

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

    render() {
        const { name, price, errorPrice, errorName, errorCategory, errorDescription, image, category, description, errorMessage } = this.state;
        return (
            <View>
                <View style={styles.container}>
                    <Image resizeMode='contain' source={Logo} style={styles.logo} />
                    <Text style={{ textAlign: 'center', fontSize: 18, fontWeight: '700', marginBottom: 15 }}>What would you like to sell?</Text>
                    {errorMessage ? <Text style={styles.text_err}>{errorMessage}</Text> : null}
                    <Item
                        stackedLabel
                        bordered
                        rounded
                        style={styles.wrapper_input}
                        error={errorName ? true : false}
                    >
                        <Input
                            placeholder='Name'
                            style={styles.input}
                            onChangeText={name => this.setState({ name })}
                        />
                    </Item>
                    <Item
                        stackedLabel
                        rounded
                        bordered
                        style={styles.wrapper_input}
                        error={errorPrice ? true : false}
                    >
                        <Input
                            placeholder='Price'
                            style={styles.input}
                            onChangeText={price => this.setState({ price })}
                        />
                    </Item>
                    <View style={styles.category}>
                        <Text style={styles.category_text}>Category: </Text>
                        <Text style={[styles.category_text, errorCategory && { color: 'red' }]}>{category}</Text>
                        <Picker
                            style={styles.picker}
                            selectedValue={category}
                            onValueChange={(itemValue, itemIndex) => this.setState({ category: itemValue })}
                        >
                            <Picker.Item label="History" value="History" />
                            <Picker.Item label="Adventure" value="Adventure" />
                            <Picker.Item label="Mystery" value="Mystery" />
                            <Picker.Item label="Romance" value="Romance" />
                            <Picker.Item label="Horror" value="Horror" />
                        </Picker>
                    </View>
                    <Textarea
                        onChangeText={description => this.setState({ description })}
                        rowSpan={3}
                        style={[styles.description, errorDescription && { borderColor: 'red' }]}
                        bordered
                        placeholder="Describe product"
                    />


                    <TouchableOpacity style={styles.btn} activeOpacity={0.5} onPress={this.showActionSheet}>
                        <Text style={styles.btn_text} >Choose Image</Text>
                    </TouchableOpacity>

                    {image ? <Image resizeMode='contain' source={{ uri: image }} style={{ width: 120, height: 120, marginTop: 10 }} /> : null}

                    {
                        image ?
                            <TouchableOpacity
                                style={styles.btn}
                                activeOpacity={0.5}
                                onPress={this._handleCheckCreate}
                            >
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
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 16,
        backgroundColor: ColorBg,
        borderRadius: 10,
        width: '92%',
        alignSelf: 'center',
        marginBottom: 10
    },
    logo: {
        width: `100%`,
        height: 120
    },
    btn: {
        width: `60%`,
        backgroundColor: `#8DCDE3`,
        borderRadius: 10,
        marginTop: 20,
        marginBottom: 10,
        paddingVertical: 15,
        shadowRadius: 10,
        shadowOpacity: .9,
        shadowOffset: {
            width: 0,
            hieght: 2
        },
        elevation: 2,
    },
    btn_text: {
        textAlign: 'center',
        fontSize: 16,
        color: '#FFF',
        fontWeight: 'bold'
    },
    category: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        marginVertical: 10
    },
    picker: {
        height: 32,
        width: 32,
        flex: 1 / 5
    },
    text_err: {
        color: '#E9446A',
        fontSize: 16,
        fontWeight: '700',
        marginVertical: 10
    },
    description: {
        width: (width / 100) * 85,
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: .9,
        shadowRadius: 10,
        elevation: 2,
    },
    category_text: {
        flex: 2 / 5,
        fontSize: 18
    },
    wrapper_input: {
        backgroundColor: 'white',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: .9,
        shadowRadius: 10,
        elevation: 2,
        marginTop: 10,
        width: '100%',
        alignSelf: 'center'
    },
    input: {
        fontStyle: 'italic',
        letterSpacing: 1,
        marginLeft: 10,
        width: '90%'
    }

});

export default CreateItem;