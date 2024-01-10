import { View, Text, FlatList, Dimensions } from 'react-native'
import React, { useContext, useEffect } from 'react'
import PlaceItem from './PlaceItem'
import { useRef } from 'react'
import { SelectMarkerContext } from '../../context/SelectedMarker';

export default function PlaceListView({placeList}){
    console.log("!!!!!!!!!!!!",placeList.length);
    
    const flatListRef = useRef(null);
    const {selectedMarker,setSelectedMarker}=useContext(SelectMarkerContext);

    useEffect(()=>{
        scrollToIndex(selectedMarker)
    },[selectedMarker])

    const scrollToIndex=(index)=>{
        flatListRef.current?.scrollToIndex({animated:true,index})
    }

    const getItemLayout=(_,index)=>({
        length:Dimensions.get('window').width,
        offset:Dimensions.get('window').width*index,
        index
    });

    return(
        <View>
            <FlatList
                data={placeList}
                horizontal={true}
                pagingEnabled
                ref={flatListRef}
                getItemLayout={getItemLayout}
                showsHorizontalScrollIndicator={true}
                renderItem={({item,index})=>(
                    <View key={index}>
                       <PlaceItem place={item}/>
                    </View>
                )}
            />
        </View>
    )
}