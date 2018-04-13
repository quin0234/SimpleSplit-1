import React, { Component } from 'react';
import { View } from 'react-native';
import { Container } from 'native-base';
import CategoryButton from './categoryButton';
import { categoryTheme } from './style';

export default class CategoryGroup extends Component {
    render() {
        let buttonsList;
        let ids;
        
        if (!!this.props.all) {
            ids = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        } else {
            ids = this.props.ids;
        }

        let index = 0;
        buttonsList = ids.map( (data) => {
            index++;
            
            if (!!this.props.onPress) {
                return ( <CategoryButton onPress={() => this.onPress(this.props.onPress)} key={data + "-" + index} id={data}/> );
            } else {
                return ( button = <CategoryButton  key={data + "-" + index} id={data}/> )
            }
        })

        return (
            <View style={categoryTheme.group}>
                {buttonsList}
            </View>
        )
    }
}