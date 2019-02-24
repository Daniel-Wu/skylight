import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button,
  TextInput,
} from 'react-native';
import { WebBrowser, MapView, Constants, Location, Permissions } from 'expo';
import { Marker } from 'react-native-maps';
import { createStackNavigator, createAppContainer, createBottomTabNavigator } from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';


import { MonoText } from '../components/StyledText';



//Home 
class HomeScreen extends React.Component {

  render() {

    return (

      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <View style={styles.welcomeContainer}>
            //<Image
              //source={
                  //: require('../assets/images/robot-prod.png')
              //}
              //style={styles.welcomeImage}
            ///>
          </View>

        <Button
          title="Look Around"
          onPress={() => this.props.navigation.navigate('Maps')}
          style={{fontSize:30}}
        />
      </View>
    );
  }
}

//Screen with mapview
class MapsScreen extends React.Component {

  constructor(props){
    super(props)
    this.state = {location: null, 

    }
  }




  render() {
    return (

      <View style={{flex: 1}}>

        <MapView
        style={{ flex: 1 }}
          initialRegion={{
            latitude: 11.722592, 
            longitude: 42.72183,
            latitudeDelta: 0.12,
            longitudeDelta: 0.1,
          }}
        />
      </View>

    );

  }
}


//Screen for item reporting
class ReportScreen extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      text: "Type here", 
      score: 0,
      counter: 0,
      questions: ["Concrete lining inside well?", "Can the well head be sealed?", 
      "Is a self-priming hand pump installed?", "Is there a well apron around the perimeter?", "Is the area kept separate from stagnant water and livestock?"],
      question: "Concrete lining inside well?"
    }

  }

  _submitReport(){
    if(this.state.score >5){
      this.state.score = 5;
    }

    if(this.state.score <= 0){
      this.state.score = 1;
    }
    var data = {
      lat: this.props.navigation.getParam('lat', 0),
      lng: this.props.navigation.getParam('lng', 0),
      quality: this.state.score,
    };
    this.props.navigation.navigate('Maps')
  }


  render() {
    return (
      <View style={{ flex: 1, alignItems: 'stretch', justifyContent: 'center' }}>
        <Text style={styles.headerText}>Well Status</Text>
//*
        <View style={styles.welcomeContainer}>
          <Image
            source={
              __DEV__
                ? require('../assets/images/LiveWellIcon.png')
                : require('../assets/images/robot-prod.png')
            }
            style={styles.welcomeImage}
          />
        </View>
*/
        <View
          style={{flex:1, marginLeft: 20, marginRight: 20, justifyContent: 'center', alignItems:'center'}}
          >
        <Text style={{fontSize:24, justifyContent:'center', fontFamily: 'sans-serif'}}>{this.state.question}</Text>
        </View>

        <View
          style={{flex:1, marginLeft: 20, marginRight: 20, justifyContent: 'center', paddingVertical: 100, paddingHorizontal: 100}}
          >

        <View style={{flex:2, flexDirection: 'row', justifyContent:'space-between'}}>
          <Button
          title="     Yes     "
          color="#1bd31b"
          onPress={() => {
            this.state.score += 1
            this.state.counter += 1
            if(this.state.counter >= 5){
              this._submitReport();
            }else{
              this.setState({'question': this.state.questions[this.state.counter]})
            }          
          }}
          style={{
            flex:1,
            marginHorizontal:20,
            marginVertical:20,
            paddingVertical:10,
            paddingHorizontal: 50
          }}
          />

          <Button 
          color="tomato"
          title="     No     "
          onPress={() => {
            this.state.counter += 1
            if(this.state.counter >= 5){
              this._submitReport();
            }else{
              this.setState({'question': this.state.questions[this.state.counter]})
            }
          }}
          style={{
            flex:1,
            marginHorizontal:20,
            marginVertical:20,
            paddingVertical:10,
            paddingHorizontal: 50
          }}
        />
        </View>
        </View>

      </View>
    );
  }
}

//Make navigator
const TabNavigator = createBottomTabNavigator({
  Home: { 
    screen: HomeScreen,
      navigationOptions: {
      tabBarTitle: 'Home',
      tabBarIcon: ({tintColor}) => <Ionicons name="md-home" size={30} color={tintColor} />,
    }
  },
  Maps: { 
    screen: MapsScreen,
      navigationOptions: {
      tabBarTitle: 'Map',
      tabBarIcon: ({tintColor}) => <Ionicons name="md-compass" size={30} color={tintColor} />,
    }
  },
  Report: {
    screen: ReportScreen,
    navigationOptions: {
      tabBarTitle: 'Report',
      tabBarIcon: ({tintColor}) => <Ionicons name="md-checkmark-circle" size={30} color={tintColor} />,
    }
  }
});

export default createAppContainer(TabNavigator);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 300,
    height: 240,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  headerText: {
    fontSize: 40,
    textAlign: 'center',
    marginTop: 10,
    fontWeight: 'bold',
    fontFamily: 'sans-serif'
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
  fab: {
    position: 'absolute',
    width: 56,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    right: 20,
    bottom: 20,
    backgroundColor: '#03A9F4',
    borderRadius: 30,
    elevation: 8
  },
  fabIcon: {
    fontSize: 30,
    color: 'white'
  },
  buttonDesign:{
    flex:1,
    marginHorizontal:20,
    marginVertical:20,

  }

});