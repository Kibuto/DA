import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Content, Button, ListItem, Icon, Left, Body, List, Right, Badge } from 'native-base';
import Avatar from '../images/avatar.jpg';
export default class SettingListItem extends Component {

    render() {
        const { navigation, nameSettings, isLoginSettings, handleLogOut, tokenSettings, amount, onCheckNotification } = this.props;
        return (
            <Content>
                <View style={{ backgroundColor: '#ff9f1c', borderRadius: 10, alignSelf: 'center', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingVertical: 15, width: '70%', marginVertical: 10, shadowRadius: 10, shadowOffset: { width: 0, height: 2 }, shadowOpacity: .9 }}>
                    {isLoginSettings ? <Image source={Avatar} style={{ height: 60, width: 60, borderRadius: 10 }} /> : null}
                    <Text style={{ fontSize: 19, textAlign: 'center', fontWeight: 'bold', marginLeft: 10 }}>Hi <Text style={{ fontStyle: 'italic' }}>{isLoginSettings ? nameSettings : 'There'}</Text></Text>
                </View>
                <Text style={styles.title}>Account</Text>
                <View style={styles.container}>
                    {
                        isLoginSettings ?
                            <List>
                                <ListItem style={styles.list} icon onPress={onCheckNotification}>
                                    <Left>
                                        <Button transparent>
                                            <Icon style={styles.icon} active name="ios-notifications-outline" />
                                        </Button>
                                    </Left>
                                    <Body>
                                        <Text style={styles.text}>Notifications</Text>
                                    </Body>
                                    {
                                        amount ?
                                            <Right>
                                                <Badge style={{ justifyContent: 'center' }} danger>
                                                    <Text style={{ color: 'white' }}>{amount}</Text>
                                                </Badge>
                                            </Right> : null
                                    }
                                </ListItem>
                                <ListItem style={styles.list} icon onPress={() => navigation.navigate('Create', { token: tokenSettings })}>
                                    <Left>
                                        <Button transparent>
                                            <Icon style={styles.icon} active name="ios-create" />
                                        </Button>
                                    </Left>
                                    <Body>
                                        <Text style={styles.text}>Create Product</Text>
                                    </Body>
                                </ListItem>
                                <ListItem icon style={styles.list} onPress={() => navigation.navigate('CheckProduct', { token: tokenSettings })}>
                                    <Left>
                                        <Button transparent>
                                            <Icon style={styles.icon} name="stats" />
                                        </Button>
                                    </Left>
                                    <Body>
                                        <Text style={styles.text}>Follow products of yours</Text>
                                    </Body>
                                </ListItem>
                            </List> :
                            <List>
                                <ListItem style={styles.list} icon onPress={() => navigation.navigate('Login')}>
                                    <Left>
                                        <Button transparent>
                                            <Icon style={styles.icon} active name="contact" />
                                        </Button>
                                    </Left>
                                    <Body>
                                        <Text style={styles.text}>Log In</Text>
                                    </Body>
                                </ListItem>
                            </List>
                    }
                </View>
                <Text style={styles.title}>Community</Text>
                <View style={styles.container}>
                    <List>
                        <ListItem icon style={styles.list}>
                            <Left>
                                <Button transparent>
                                    <Icon style={styles.icon} active name="add" />
                                </Button>
                            </Left>
                            <Body>
                                <Text style={styles.text}>Invite friends</Text>
                            </Body>
                        </ListItem>
                        <ListItem icon style={styles.list}>
                            <Left>
                                <Button transparent>
                                    <Icon style={styles.icon} active name="star-outline" />
                                </Button>
                            </Left>
                            <Body>
                                <Text style={styles.text}>Rate us</Text>
                            </Body>
                        </ListItem>
                        <ListItem style={styles.list} icon>
                            <Left>
                                <Button transparent>
                                    <Icon style={styles.icon} active name="information-circle-outline" />
                                </Button>
                            </Left>
                            <Body>
                                <Text style={styles.text}>{`Term & Privacy`}</Text>
                            </Body>
                        </ListItem>
                    </List>
                </View>
                <Text style={styles.title}>{`Help & Support Center`}</Text>
                <View style={[styles.container, { marginBottom: 10 }]}>
                    <List>
                        <ListItem icon style={styles.list}>
                            <Left>
                                <Button transparent>
                                    <Icon style={styles.icon} active name="help" />
                                </Button>
                            </Left>
                            <Body>
                                <Text style={styles.text}>Help</Text>
                            </Body>
                        </ListItem>
                        {
                            isLoginSettings ?
                                <ListItem icon style={styles.list} onPress={handleLogOut}>
                                    <Left>
                                        <Button transparent>
                                            <Icon style={styles.icon} name="bicycle" />
                                        </Button>
                                    </Left>
                                    <Body>
                                        <Text style={styles.text}>Log Out</Text>
                                    </Body>
                                </ListItem> : null
                        }
                    </List>
                </View>
            </Content >
        )
    }
}

const styles = StyleSheet.create({
    title: {
        fontSize: 20,
        marginLeft: 10,
        marginVertical: 8,
        letterSpacing: .5
    },
    container: {
        backgroundColor: '#fff',
        paddingVertical: 15,
        paddingHorizontal: 10,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 1,
        shadowRadius: 10,
        elevation: 4,
        marginHorizontal: 10,
        borderRadius: 10
    },
    icon: {
        fontSize: 30
    },
    text: {
        fontSize: 18
    },
    list: {
        marginBottom: 5
    }
})