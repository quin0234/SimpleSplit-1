import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import firebase from 'firebase';
import reducers from './src/reducers';
import { Container, Root } from 'native-base';
import Router from './src/Router';
import { StatusBar } from 'react-native';
import Expo from 'expo';


class App extends Component {
    constructor(props) {
        super(props);
        this.state = { loading: true};
    }

    
    async componentWillMount() {
        await Expo.Font.loadAsync({
            Arial: require('./assets/arial.ttf'),
            Roboto: require("native-base/Fonts/Roboto.ttf"),
            Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
            Ionicons: require("@expo/vector-icons/fonts/Ionicons.ttf"),
        });
        const config = {
            apiKey: 'AIzaSyAYqp3KdrZKUK_dz-Fyuzwil4Zz4HovnlY',
            authDomain: 'simplesplit-5d7ab.firebaseapp.com',
            databaseURL: 'https://simplesplit-5d7ab.firebaseio.com',
            projectId: 'simplesplit-5d7ab',
            storageBucket: 'simplesplit-5d7ab.appspot.com',
            messagingSenderId: '560934402075'
        };
        firebase.initializeApp(config);
        this.setState({ loading: false});
      }

    //componentWillMount(){
        
        
    //}
    render() {
        if( this.state.loading) {
            return <Expo.AppLoading />;
        }
        const store = createStore(reducers, {}, applyMiddleware(ReduxThunk))
        return (
            <Provider store={store}>
            <Root>
                <Container>
                <StatusBar hidden={true} />
                    <Router/>
                </Container>
                </Root>
            </Provider>
        );
    }
}

export default App;