import React, { Component } from 'react';
import PreLoader from '../PreLoader';
import { StyleSheet, FlatList, View } from 'react-native';
import { Card, Divider, Text } from 'react-native-elements';
import BackgroundImage from '../BackgroundImage';
import * as firebase from 'firebase';
import CommentEmpty from './CommentEmpty';
import Comment from './Comment';
import User from '../../components/User/User';

export default class CommentList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            comments: [],
            loaded: false
        };
    }

    componentDidMount() {
        this._loadComments(this.props.adId);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.adId !== nextProps.adId) {
            this._loadComments(nextProps.adId);
        }
    }

    _loadComments(adId) {
        firebase.database().ref(`comments/${adId}`).on('value', snapshot => {
            let comments = [];
            snapshot.forEach(row => {
                comments.push({
                    id: row.key,
                    rating: row.val().rating,
                    comment: row.val().comment,
                    userID: row.val().userID,

                })
            });
            this.setState({
                comments,
                loaded: true
            })
        });
    }

    render() {
        const { comments, loaded } = this.state;

        if (!loaded) {
            return (<PreLoader />)
        }

        if (!comments.length) {
            return (
                <CommentEmpty />
            )
        }
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Opiniones</Text>
                <Divider style={styles.divider} />
                <Card>
                    <FlatList
                        data={comments}
                        renderItem={(data) => this.renderComment(data.item)}
                        keyExtractor={(data) => data.id}
                    />
                </Card>
            </View>
        )
    }
    renderComment(comment) {
        return (
            <View>
                <Comment comment={comment} />
                <User userID={comment.userID}  detailUser={this.props.detailUser}/>
            </View>
        )
    };
}


const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        flex: 1,
        marginTop: 10,
        marginBottom: 10
    },
    title: {
        fontSize: 22,
        color: 'white',
        textAlign: 'center',
        backgroundColor: 'rgba(255, 38, 74, 0.9)'
    },
    divider: {
        backgroundColor: 'black'
    }
})