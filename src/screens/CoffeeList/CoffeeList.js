import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { Auth } from 'aws-amplify';
import { NavigationContainer } from '@react-navigation/native';
import Header from './Header';
import SearchBar from './SearchBar';
import { useContext } from 'react';
import { UserLocationContext } from '../../context/UserLocationContext';
import GlobalApi from '../../../utils/GlobalApi';
import AppMapView from './AppMapView';
import PlaceListView from './PlaceListView';
import { SelectedMarkerContext } from '../../context/SelectedMarkerContext';

const CoffeeList = () => {

  const {location, setLocation}=useContext(UserLocationContext);

  const [selectedMarker, setSelectedMarker]=useState([]);

  const [placeList,setPlaceList]=useState([]);

  useEffect(()=>{
    location&&GetNearByPlace();
  },[location])

  const GetNearByPlace=()=>{
    const data={
        "includedTypes": ["cafe"],
        "maxResultCount": 15,
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

  return (
    <SelectedMarkerContext.Provider value={{selectedMarker,setSelectedMarker}}>
        <View>
            <View style={styles.headerContainer}>
                <Header/>
                <SearchBar searchedLocation={(location)=>
                    setLocation({
                        latitude:location.lat,
                        longitude:location.lng
                    })}/>
            </View>
            {placeList&&<AppMapView placeList={placeList}/>}
            <View style={styles.listContainer}> 
                {placeList&&<PlaceListView  placeList={placeList}/>}
            </View>
        </View>
      </SelectedMarkerContext.Provider>
  );
};

export default CoffeeList;

const styles = StyleSheet.create({
  headerContainer:{
      paddingTop:15,
      alignItems:'flex-start',
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