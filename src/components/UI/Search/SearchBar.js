import React, { Component } from 'react';
import { Content, Container, Card, CardItem, Body, Item, Input, Icon, View } from 'native-base';

export default class SearchBar extends Component {
    constructor (props) {
        super (props);

        this.state = {
            items: props.items || [],
            results: [],
        }
    }

    _onChange (changes) {
        if (this.props.onChange && typeof this.props.onChange === "function") {
            this.props.onChange(changes);
        }

        this.setState({results: changes});
    }

    _onChangeSearchText (text) {
        let resultList = [];
        let items = this.state.items;

        if (!!text && items) {
            for (var i = 0; i < items.length; i++) {
                let title = "";
                if (items[i].title != null && items[i].title.length > 0 && typeof items[i].title === "string") {
                    title = items[i].title.toLowerCase() || "";
                }

                let description = "";
                if (items[i].description != null && items[i].description.length > 0 && typeof items[i].description === "string") {
                    description = items[i].description.toLowerCase() || "";
                }
    
                if (~title.indexOf(text.toLowerCase()) || ~description.indexOf(text.toLowerCase())) {
                    resultList.push(items[i]);
                }
            }
        } else {
            resultList = this.state.items;
        }

        this._onChange(resultList);
    }

    render () {
        if (this.props.show) {
            return (
                <Content padder scrollEnabled={false} style={{maxHeight: 100, backgroundColor: '#fff'}}>
                    <Card style={{ borderWidth: 0, shadowColor: '#000'}}>
                        <CardItem>
                            <Body>
                                <Item rounded>
                                    <Input onChangeText={(text) => {this._onChangeSearchText(text)}} placeholder='Search'/>
                                </Item>
                            </Body>
                        </CardItem>
                    </Card>
                </Content>
            )
        } else {
            return (
                <View>
                </View>
            )
        }
    }
}