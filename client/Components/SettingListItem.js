import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Content, Button, ListItem, Icon, Left, Body, List, Right, Badge } from 'native-base';
export default class SettingListItem extends Component {

    render() {
        const { navigation, nameSettings, isLoginSettings, handleLogOut, tokenSettings, list, amount, handleCheckNotification } = this.props;
        return (
            <Content>
                {
                    isLoginSettings ? 
                    <>
                        <Text style={{ marginVertical: 10, textAlign: 'center', fontSize: 24, fontWeight: '700', fontStyle: 'italic'}}>Hello {nameSettings}</Text>
                        <List>
                            <ListItem style={styles.list} icon onPress={() => navigation.navigate('Notification', { products: list, fnc: handleCheckNotification })}>
                                <Left>
                                    <Button transparent>
                                        <Icon style={styles.icon} active name="ios-notifications" />
                                    </Button>
                                </Left>
                                <Body>
                                    <Text style={styles.text}>Notifications</Text>
                                </Body>
                                {
                                    amount ? 
                                    <Right>
                                        <Badge style={{justifyContent: 'center'}} danger>
                                            <Text style={{color: 'white'}}>{amount}</Text>
                                        </Badge>
                                    </Right> : null
                                }
                            </ListItem>
                            <ListItem style={styles.list} icon onPress={() => navigation.navigate('Create', { token: tokenSettings })}>
                                <Left>
                                    <Button transparent>
                                        <Icon style={styles.icon} active name="create" />
                                    </Button>
                                </Left>
                                <Body>
                                    <Text style={styles.text}>Create Product</Text>
                                </Body>
                            </ListItem>
                            <ListItem icon style={styles.list} onPress={() => navigation.navigate('CheckProduct', { token: tokenSettings })}>
                                <Left>
                                    <Button transparent>
                                        <Icon style={styles.icon} name="folder" />
                                    </Button>
                                </Left>
                                <Body>
                                    <Text style={styles.text}>Follow products of yours</Text>
                                </Body>
                            </ListItem>
                            <ListItem icon style={styles.list} onPress={handleLogOut}>
                                <Left>
                                    <Button transparent>
                                        <Icon style={styles.icon} name="exit" />
                                    </Button>
                                </Left>
                                <Body>
                                    <Text style={styles.text}>Log Out</Text>
                                </Body>
                            </ListItem>
                        </List>
                    </> : 
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
                    </List>
                }
            </Content>
        )
    }
}

const styles = StyleSheet.create({
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