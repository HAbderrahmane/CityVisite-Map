import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { gestureHandlerRootHOC } from "react-native-gesture-handler";

class HomeScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.link}
          onPress={() => this.props.navigation.navigate("Map")}
        >
          <Text style={styles.linkText}>Go to Map</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

class MapScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      region: {
        latitude: 43.296398,
        longitude: 5.370000,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
      markers: [
        {
          latlng: {
            latitude: 37.78825,
            longitude: -122.4324,
          },
          title: "Title 1",
          description: "Description 1",
        },
        {
          latlng: {
            latitude: 37.78825,
            longitude: -122.4324,
          },
          title: "Title 2",
          description: "Description 2",
        },
      ],
    };
  }

  onRegionChange(region) {
    this.setState({ region });
  }

  render() {
    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          region={this.state.region}
          onRegionChange={(region) => this.onRegionChange(region)}
        >
          {this.state.markers.map((marker, index) => (
            <Marker
              key={index}
              coordinate={marker.latlng}
              title={marker.title}
              description={marker.description}
            />
          ))}
        </MapView>
        <TouchableOpacity
          style={styles.link}
          onPress={() => this.props.navigation.navigate("Home")}
        >
          <Text style={styles.linkText}>Go back to home</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: "100%",
    height: "100%",
  },
  link: {
    position: "absolute",
    bottom: 20,
    left: 20,
    padding: 10,
    backgroundColor: "blue",
    borderRadius: 5,
  },
  linkText: {
    color: "white",
  },
});

const AppNavigator = createStackNavigator(
  {
    Home: HomeScreen,
    Map: gestureHandlerRootHOC(MapScreen),
  },
  {
    initialRouteName: "Home",
  }
);

export default createAppContainer(AppNavigator);
