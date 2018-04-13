import React, { Component } from 'react';
import { Text, Container, Header, Left, Button, Icon, Body, Right, Title } from 'native-base';
import { StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux';
import PropTypes from 'prop-types';
import HeaderSide, { Sides } from './HeaderSide';

export * from './HeaderSide';

export const Colors = {
    Green: "Green",
    Purple: "Purple",
}

// TODO: Add type errors to make it easier to use
export default class MainHeader extends Component {
    constructor (props) {
        super (props);

        let leftSide = null;
        let rightSide = null;

        if (!!props.children) {
            if (props.children.length > 1) {
                leftSide = !!props.children[0] ? props.children[0] : null;
                rightSide = !!props.children[1] ? props.children[1] : null;
            } else {
                if (props.children.props.side == Sides.Right) {
                    rightSide = props.children;
                } else {
                    leftSide = props.children;
                }
            }
        }

        this.state = {
            title: !!this.props.title ? this.props.title : "No Title",
            left: leftSide,
            right: rightSide,
            color: Colors.Purple,
        }
    }

    static propTypes = {
        title: PropTypes.string,
        color: PropTypes.object,
        children: PropTypes.node,
    }

    _renderTitle () {
        return (
            <Body>
                <Title style={styles.title}>{this.state.title}</Title>
            </Body>
        )
    }

    render () {
        let headerStyle = [];
        headerStyle.push(styles.header);

        if (this.state.color == Colors.Purple) {
            headerStyle.push(styles.purple);
        } else {
            headerStyle.push(styles.green)
        }

        return (
            <Header style={headerStyle}>
                {!!this.state.left ? <Left>{this.state.left}</Left> :  <Left />}
                {this._renderTitle()}
                {!!this.state.right ? <Right>{this.state.right}</Right> : <Right />}
            </Header>
        )
    }
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: "#7C6990",
    },
    title: {
        color: '#FFF',
    },
    purple: {
        backgroundColor: "#239B97",
    },
    green: {
        backgroundColor: "#7C6990",
    }
});