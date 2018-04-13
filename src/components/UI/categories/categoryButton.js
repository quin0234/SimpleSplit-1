import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Content } from 'native-base';
import { clickOpacity, categoryTheme, colorTheme, underlayColor } from './style';
import categoryData from './categoryData';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class CategoryButton extends Component {
    constructor (props) {
        super(props);

        this.state = {
            pressed: false,
            disabled: !!this.props.disabled
        };
    }

    onPress (data) {
        if (!this.state.disabled) {
            // Flip the pressed state
            if (typeof data === "function") {
                data();
            }
            this.setState({pressed: !this.state.pressed})
        }
    }

    getColorTheme (color) {
        switch (color) {
            case "green":
                return colorTheme.Green;
            case "pink":
                return colorTheme.Pink;
            case "purple":
                return colorTheme.Purple;
            case "yellow":
                return colorTheme.Yellow;
            case "grass":
                return colorTheme.Grass;
            case "red":
                return colorTheme.Red;
            case "blue":
                return colorTheme.Blue;
            case "cyan":
                return colorTheme.Cyan;
            case "orange":
                return colorTheme.Orange;
            case "magenta":
                return colorTheme.Magenta;
            case "grey":
            default:
                return colorTheme.Grey;
        }
    }

    render () {
        let id = this.props.id;
        let title = categoryData[id].title;
        let color = categoryData[id].color.toLowerCase();
        let icon = categoryData[id].icon.toLowerCase();
        let colorStyle = this.getColorTheme(color);
        let combinedStyles = [];

        // Check the state of the button
        if (this.state.pressed) {
            combinedStyles.push(categoryTheme.pressed);
        } else {
            combinedStyles.push(categoryTheme.button);
        }

        if (this.state.disabled) {
            combinedStyles.push(categoryTheme.disabled);
        } else {
            combinedStyles.push(colorStyle);
        }

        return (
            <View>
                <TouchableOpacity activeOpacity={this.state.disabled ? 1 : clickOpacity} underlayColor={underlayColor} onPress={() => this.onPress(this.props.onPress)}>
                    <Content style={ combinedStyles }>
                        <Icon style={ categoryTheme.icon } name={icon} />
                        <Text style={ categoryTheme.text }>{title}</Text>
                    </Content>
                </TouchableOpacity>
            </View>
        );
    }
}