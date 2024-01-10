import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import AppMapView from './AppMapView'
import Header from './Header'
import SearchBar from './SearchBar'
import { UserLocationContext } from '../../context/UserLocationContent'
import { useContext } from 'react'
import { useEffect, useState } from 'react'
import GlobalApi from '../../utils/GlobalApi'
import PlaceListView from './PlaceListView'
import { SelectMarkerContext } from '../../context/SelectedMarker'

export default function HomeScreen(){

    const {location, setLocation}=useContext(UserLocationContext);

    const [selectedMarker, setSelectedMarker]=useState([]);

    const [placeList,setPlaceList]=useState([]);

    useEffect(()=>{
        location&&GetNearByPlace();
    },[location])

    const GetNearByPlace=()=>{
        const data={
            "includedTypes": ["cafe"],
            "maxResultCount": 10,
            "locationRestriction": {
                "circle": {
                    "center": {
                        "latitude": location?.latitude,
                        "longitude": location?.longitude},
                    "radius": 5000.0
                }
            }
        }
        GlobalApi.NewNearByPlace(data).then(resp=>{
            console.log(resp.data);
            setPlaceList(resp.data?.places);
        })
    }

    return(
        <SelectMarkerContext.Provider value={{selectedMarker,setSelectedMarker}}>
        <View>
            <View style={styles.headerContainer}>
                <Header/>
                <SearchBar searchedLocation={(location)=>console.log(location)}/>
            </View>
            {placeList&&<AppMapView placeList={placeList}/>}
            <View style={styles.listContainer}> 
                {placeList&&<PlaceListView  placeList={placeList}/>}
            </View>
        </View>
        </SelectMarkerContext.Provider>
    )
}

const styles = StyleSheet.create({
    headerContainer:{
        position:'absolute',
        zIndex:10,
        padding:10,
        width:'100%',
        
    },
    listContainer:{
        position:'absolute',
        bottom:0,
        zIndex:10,
        width:'100%'
    }
})