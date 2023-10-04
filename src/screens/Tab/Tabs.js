import * as React from 'react';
import {View, useWindowDimensions, Text, Pressable, Image} from 'react-native';
import styles from './styles';
import Setting from '../Setting/Setting';
import Legal from '../Legal/Legal';
import AccountInfoScreen from '../AccountInfo/Account';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import {wp} from '../../utils/size';
import {SafeAreaView} from 'react-native-safe-area-context';

const renderScene = SceneMap({
  first: AccountInfoScreen,
  second: Setting,
  third: Legal,
});
export default function TabViewExample({navigation}) {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'first', title: 'Account Info'},
    {key: 'second', title: 'Settings'},
    {key: 'third', title: 'Legal'},
  ]);

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <SafeAreaView />
      <View style={styles.headerView}>
        <Pressable onPress={() => navigation.goBack()} style={{marginLeft: 15}}>
          <Image
            style={styles.backIcon}
            source={require('../../assets/ic_back.png')}
          />
        </Pressable>
        <Text style={styles.nameText}>Me</Text>
        <View style={{flex: 1}} />
        <Text style={styles.text1}>prtnr</Text>
      </View>

      {/* <Text style={[styles.text1, {marginBottom: 20}]}>prtnr</Text> */}
      <TabView
        style={{marginLeft: 15, marginRight: 15}}
        renderTabBar={props => (
          <TabBar
            tabStyle={{width: 'auto', borderWidth: 0, alignItems: 'flex-start'}}
            {...props}
            indicatorStyle={{backgroundColor: '#333333'}}
            activeColor="red"
            renderLabel={({focused, route}) => (
              <View style={{height: 40, alignItems: 'center'}}>
                <Text
                  style={[styles.tabtext, {color: focused ? 'black' : 'grey'}]}>
                  {route.title}
                </Text>
              </View>
            )}
            style={{backgroundColor: 'white', height: 55}}
          />
        )}
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{width: layout.width}}
      />
    </View>
  );
}
