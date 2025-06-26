
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screens/home/home';
import BankQueue from '../screens/bankqueue/bankqueue';
import MyQueue from '../screens/myqueue/myqueue';
import HistotyLog from '../screens/historylog/histotylog';
import Favourite from '../screens/favourite/favourite';
import Account from '../screens/account/account';
import Login from '../screens/auth/login';
import EditInfo from '../screens/auth/editInfo';
import Help from '../screens/help/help';
import Inbox from '../screens/Inbox/inbox';
import { Test } from '../screens/Test/Test';
import Notifications from '../screens/notifications/notifications';
import Privacy from '../screens/privacy/privacy';
import Place_Details from '../screens/place_details/place_details';







export default function AppNavigator() {
    const Stack = createNativeStackNavigator()
    return (
        <Stack.Navigator
            initialRouteName='Home'
            screenOptions={{
                headerShown: false,
                animation: 'fade',
                animationDuration: 700
            }}
            
        >   
           
            
            <Stack.Screen name='Home' component={Home}  />
            <Stack.Screen name='BankQueue' component={BankQueue}  />
            <Stack.Screen name='MyQueue' component={MyQueue}  />
            <Stack.Screen name='History' component={HistotyLog}  />
            <Stack.Screen name='Favourite' component={Favourite}  />
            <Stack.Screen name='Account' component={Account}  />
            <Stack.Screen name='Login' component={Login}  />
            <Stack.Screen name='EditInfo' component={EditInfo}  />
            <Stack.Screen name='Help' component={Help}  />
            <Stack.Screen name='Inbox' component={Inbox}  />
            <Stack.Screen name='Notifications' component={Notifications}  />
            <Stack.Screen name='Test' component={Test}  />
            <Stack.Screen name='Privacy' component={Privacy}  />
            <Stack.Screen name='PlaceDetails' component={Place_Details}  />
            
        </Stack.Navigator>
    )
}
