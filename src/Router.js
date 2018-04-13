import React from 'react';
import { Scene, Router, Actions, ActionConst, Modal, Overlay, Stack, Tabs, Lightbox } from 'react-native-router-flux';
import LoginForm from './components/Views/Auth/LoginForm';
import ForgettenPassword from './components/Views/Auth/ForgottenPassword';
import SignUpForm from './components/Views/Auth/SignUpForm';
import Main from './components/Main';
import NewExpense from './components/Views/Modals/Expenses/NewExpense';
import NewMemo from './components/Views/Modals/NewMemo';
import NewRequest from './components/Views/Modals/NewRequest';
import CreateUserProfile from './components/Views/Auth/CreateUserProfile';
import NewExpenseForm from './components/Views/Modals/Expenses/NewExpenseForm';
import NewExpenseSummary from './components/Views/Modals/Expenses/NewExpenseSummary';
import ExpenseItem from './components/Views/Summary/ExpenseItem';
import NewConnection from './components/Views/Modals/NewConnection';
import NewMessage from './components/Views/Modals/Messages/NewMessage';
import NewMessageInfo from './components/Views/Modals/Messages/NewMessageInfo';
import NewMessagePreview from './components/Views/Modals/Messages/NewMessagePreview';
import Messages from './components/Views/Messages/Messages';
import MessageBlock from './components/UI/Messages/MessageBlock';
import ProfileSharing from './components/Views/Settings/Sharing/ProfileSharing';
import ProfileUserSettings from './components/Views/Settings/User/ProfileUserSettings';
import ProfileBankSelector from './components/Views/Settings/User/ProfileBankSelector';
import ProfileSharingConfirmation from './components/Views/Settings/Sharing/ProfileSharingConfirmation';
import SplashScreen from './components/Views/Splash/SplashScreen';
import TutorialSwiper from './components/Views/Tutorial/TutorialSwiper';
import MessageInfo from './components/Views/Messages/MessageInfo';
import ExpenseInfo from './components/Views/Summary/ExpenseInfo';


const RouterComponent = () => {
    return (
        <Router>
            <Overlay key="overlay">
                <Modal key="root" hideNavBar>
                    
                    <Scene key="splash" component={SplashScreen} hideNavBar />

                    <Scene key="tutorial" component={TutorialSwiper} hideNavBar />

                    <Scene key="auth">
                        <Scene key="login" component={LoginForm} title="Login" hideNavBar/>
                        <Scene key="forgottenPW" component={ForgettenPassword} 
                        title="Forgotten Password" 
                        back={true} 
                        backButtonTintColor="#ffffff"
                        navTransparent={true}
                        titleStyle={{color:'#ffffff'}}/>

                        <Scene key="signUp" component={SignUpForm} 
                        title="Create Account" 
                        back={true} 
                        backButtonTintColor="#ffffff"
                        navTransparent={true}
                        titleStyle={{color:'#ffffff'}}/>

                        <Scene key="saveAccount" component={CreateUserProfile} 
                        title="Save Account"  
                        navTransparent={true}
                        back={true} 
                        backButtonTintColor="#ffffff"
                        titleStyle={{color:'#ffffff'}}/>
                    </Scene>

                    <Scene key="main" component={Main} hideNavBar/>

                    <Scene key="MessageInfo" component={MessageInfo} hideNavBar/>

                    <Scene key="newexpenseModal" component={NewExpense} title="New Expense" hideNavBar/>
                    <Scene key="newexpenseform" component={NewExpenseForm} title="New Expense" hideNavBar/>
                    <Scene key="newexpensesum" component={NewExpenseSummary} title="Expense Summary" hideNavBar/>
                    <Scene key="expenseItem" component={ExpenseItem} title="Expense Item" hideNavBar/>
                    <Scene key="ExpenseInfo" component={ExpenseInfo} title="Expense Info" hideNavBar />
                    <Scene key="newmemoModal" component={NewMemo} />

                    <Scene key="newMessage" component={NewMessage} title="New Message" hideNavBar />
                    <Scene key="newMessageInfo" component={NewMessageInfo} title="New Message" hideNavBar/>
                    <Scene key="newMessagePreview"  component={NewMessagePreview} title="New Message" hideNavBar/> 
                    <Scene key="newconnection" component={NewConnection} />

                    <Scene key="ProfileSharing" component={ProfileSharing} hideNavBar/>
                    <Scene key="ProfileSharingConfirmation" component={ProfileSharingConfirmation} hideNavBar />
                    <Scene key="profileUserSettings" component={ProfileUserSettings} hideNavBar/>
                    <Scene key="profileBanks" component={ProfileBankSelector} hideNavBar/>
                </Modal>    
            </Overlay>
        </Router>
    );
};

export default RouterComponent