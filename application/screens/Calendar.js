import React, { Component } from 'react';
import { AsyncStorage, Text, ScrollView, View, StyleSheet } from 'react-native';
import BackgroundImage from '../components/BackgroundImage';
import { Card, Input } from 'react-native-elements';
import AppButton from '../components/AppButton';
import Toast from 'react-native-simple-toast';
import * as firebase from 'firebase';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import { Dimensions } from 'react-native';


export default class customCalendar extends Component {
    constructor() {
        super();
        this.state = {
            user: {},
            events: {}
        }
        this.refsUser = null;
        this.refsEvents = firebase.database().ref().child('ads');
    }

    componentDidMount() {
        const events = {};
        this.fetch().then((usrID) => {
            this.refsUser = firebase.database().ref().child(`users/${usrID}`);
            this.refsUser.on('value', snapshot => {
                const user = snapshot.val();
                this.setState({ user }, () => {
                    if (this.state.user && this.state.user.events.length > 1) {
                        const eventsKeys = Object.values(this.state.user.events);
                        this.refsEvents.on('value', snapshot => {
                            snapshot.forEach((row) => {
                                if (eventsKeys.includes(row.key)) {
                                    events[row.val().date] = row.val();
                                }
                            })
                        });
                        this.setState({
                            events
                        })
                    }
                });
            });
        });
    }


    render() {

        debugger
        return (
            <Agenda
                items={this.state.events}
                loadItemsForMonth={this.loadItems.bind(this)}
                selected={'2019-09-19'}
                renderItem={this.renderItem.bind(this)}
                renderEmptyDate={this.renderEmptyDate.bind(this)}
                rowHasChanged={this.rowHasChanged.bind(this)}
                // markingType={'period'}
                markedDates={this.state.events}
            // monthFormat={'yyyy'}
            // theme={{calendarBackground: 'red', agendaKnobColor: 'green'}}
            //renderDay={(day, item) => (<Text>{day ? day.day: 'item'}</Text>)}
            />
        );
    }

    loadItems(day) {
        debugger;
    }

    renderItem(item) {
        debugger
        return (
            <View style={[styles.item, { height: 40 }]}><Text>{item.name}</Text></View>
        );
    }

    renderEmptyDate() {
        debugger
        return (
            <View style={styles.emptyDate}><Text>This is empty date!</Text></View>
        );
    }

    rowHasChanged(r1, r2) {
        return r1.name !== r2.name;
    }

    timeToString(time) {
        const date = new Date(time);
        return date.toISOString().split('T')[0];
    }

    async fetch() {
        try {
            let user = await AsyncStorage.getItem('userID');
            if (user) {
                let parsed = JSON.parse(user);
                this.setState({
                    user: parsed
                })
                return parsed;
            }
        } catch (error) {
            Toast.showWithGravity('Error obteniendo', Toast.LONG, Toast.BOTTOM);
        }
    }
}

const styles = StyleSheet.create({
    item: {
        backgroundColor: 'white',
        flex: 1,
        borderRadius: 5,
        padding: 10,
        marginRight: 10,
        marginTop: 17
    },
    emptyDate: {
        height: 15,
        flex: 1,
        paddingTop: 30
    }
});


