/*

2 containers

1 on top is empty by default

1 on below is filled with all options


when clicking on a category it switches containers
1 on top is the 1 that is used as the "active" categories

 */

import React, { Component } from 'react';
import { View } from 'react-native';
import CategoryGroup from './categoryGroup';

export default class CategoryMultiSelect extends Component {
    render() {

        return (
            <View>
                <CategoryGroup/>
                <CategoryGroup/>
            </View>
        )
    }
}