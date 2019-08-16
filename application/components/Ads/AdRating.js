import React, { Component } from 'react';
import { Rating, Text, AirbnbRating } from 'react-native-elements';
import * as firebase from 'firebase';
import { View, StyleSheet } from 'react-native';

export default class AdRating extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rating: 0,
            rarity: 0
        }
        const { adId } = props;
        this.commentsRef = firebase.database().ref(`comments/${adId}`);
    }

    componentDidMount() {
        this.commentsRef.on('child_added', snapshot => {
            this.commentsRef.on('value', snap => {
                this.loadRatings(snap);
            });
        });
    }

    loadRatings(snap) {
        ['rating', 'rarity'].forEach((item) => {
            let array = [];
            snap.forEach(row => {
                array.push(parseInt(row.val()[item]));
            });
            let media = this.estimate(array);
            this.setState({
                [item]: media
            });
            this.refs[item].setCurrentRating(
                media
            );
        });
    }

    estimate(arrayToEstimate) {
        let total = arrayToEstimate.reduce((previous, current) => previous + current)
        return total / arrayToEstimate.length
    }

    render() {
        const { rating, rarity } = this.state;
        return (
            <View>
                <Text style={styles.title}> Valoracion </Text>
                <Rating
                    ref="rating"
                    imageSize={20}
                    startingValue={rating}
                />
                <Text style={styles.title}> Rareza </Text>
                <Rating
                    ref="rarity"
                    imageSize={20}
                    startingValue={rarity}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center'
    }
})