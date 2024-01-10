import { View, Text, Image } from 'react-native'
import React, { useContext } from 'react'
import { Marker } from 'react-native-maps'
import { SelectMarkerContext } from '../../context/SelectedMarker'

export default function Markers({index, place}){
    console.log("++++++",place)

    const {selectedMarker,setSelectedMarker}=useContext(SelectMarkerContext);

    return place&&(
        <Marker coordinate={{
            latitude:place?.location?.latitude,
            longitude:place?.location?.longitude
         }}
         onPress={()=>setSelectedMarker(index)}>
          <Image source={require('./../../../assets/images/coffee-marker.png')}
             style={{width:40, height:40}}/>
         </Marker>
    )
}