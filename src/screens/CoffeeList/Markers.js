import { View, Text, Image } from 'react-native'
import React, { useContext } from 'react'
import { Marker } from 'react-native-maps'
import { SelectedMarkerContext } from '../../context/SelectedMarkerContext'

export default function Markers({index, place}){
    console.log("++++++",place)

    const {selectedMarker,setSelectedMarker}=useContext(SelectedMarkerContext);

    const markerImage = selectedMarker === index
    ? require('./../../../assets/images/selected-marker.png')
    : require('./../../../assets/images/coffee-marker.png');

    return place&&(
        <Marker coordinate={{
            latitude:place?.location?.latitude,
            longitude:place?.location?.longitude
         }}
         onPress={()=>setSelectedMarker(index)}>
          <Image source={markerImage}
             style={{width:40, height:40}}/>
         </Marker>
    )
}