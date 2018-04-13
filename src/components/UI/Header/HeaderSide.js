import React, { Component } from 'react';
import { Button, Left, Right, Text, Icon } from 'native-base';
import PropTypes from 'prop-types';

export const Sides = {
    Left: "Left",
    Right: "Right",
}

export class HeaderSide extends Component {
    constructor (props) {
        super (props);
        
        let text = this.props.text || this.props.title;

        this.state = {
            icon: !!this.props.icon ? this.props.icon : null,
            text: !!text ? text : null,
            onPress: !!this.props.onPress ? this.props.onPress : null,
            side: !!this.props.side ? this.props.side : Sides.Left,
        }
    }

    static propTypes = {
        icon: PropTypes.string,
        text: PropTypes.string,
        title: PropTypes.string,
        onPress: PropTypes.func,
        side: PropTypes.Sides,
    }

    _onPress = () => {
        if (this.state.onPress && typeof this.state.onPress === "function") {
            this.state.onPress();
        }
    }

    _renderButton () {
        if (this.state.text) {
            if (this.state.icon) {
                return (
                    <Button transparent light onPress={this._onPress}>
                        <Icon name={this.state.icon} />
                        <Text>{this.state.text}</Text>
                    </Button>
                )
            } else {
                return (
                    <Button transparent light  onPress={this._onPress}>
                        <Text>{this.state.text}</Text>
                    </Button>
                )
            }
        } else if (this.state.icon) {
            return (
                <Button transparent light onPress={this._onPress}>
                    <Icon name={this.state.icon} />
                </Button>
            )
        }
    }

    render () {
        if (this.state.text) {
            if (this.state.icon) {
                return (
                    <Button transparent light onPress={this._onPress}>
                        <Icon name={this.state.icon} />
                        <Text>{this.state.text}</Text>
                    </Button>
                )
            } else {
                return (
                    <Button transparent light  onPress={this._onPress}>
                        <Text>{this.state.text}</Text>
                    </Button>
                )
            }
        } else if (this.state.icon) {
            return (
                <Button transparent light onPress={this._onPress}>
                    <Icon name={this.state.icon} />
                </Button>
            )
        }
    }
}