import { View, StyleSheet, Image } from 'react-native'
import React, {useContext} from 'react'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'
import MapViewStyle from './../../utils/MapViewStyle.json'
import { UserLocationContext } from '../../context/UserLocationContent'
import { Marker } from 'react-native-maps'

export default function AppMapView(){
    const {location, setLocation}=useContext(UserLocationContext)

    return location?.latitude&&(
        <View>
            <MapView
             style={styles.map}
             provider={PROVIDER_GOOGLE}
             customMapStyle={MapViewStyle}
             region={{latitude:location?.latitude,
                      longitude:location?.longitude,
                      latitudeDelta:0.0422,
                      longitudeDelta:0.0421}}>
             <Marker coordinate={{
                latitude:location?.latitude,
                longitude:location?.longitude
             }}>
              <Image source={require('./../../../assets/images/location.png')}
                 style={{width:40, height:40}}/>
             </Marker>

            </MapView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    map: {
      width: '100%',
      height: '100%',
    },
  });