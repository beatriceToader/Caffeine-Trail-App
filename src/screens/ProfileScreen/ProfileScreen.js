// Import necessary libraries
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Auth } from 'aws-amplify';
import ProfileBar from './ProfileBar';
import { TouchableOpacity } from 'react-native';

const ProfileScreen = () => {

    const signOut =()=>{
        Auth.signOut();
    };

  const [userInfo, setUserInfo] = useState(null);

  
  useEffect(() => {
    
    const fetchUserInfo = async () => {
      try {
        const user = await Auth.currentAuthenticatedUser();
        setUserInfo(user.attributes);
      } catch (error) {
        console.error('Error fetching user information', error);
      }
    };

    fetchUserInfo();
  }, []); 
  return (
    <View style={styles.root}>
        <View>
            <ProfileBar/>
        </View>
      
       <View style={styles.textContainer}>
            {userInfo && (
                <View>
                <Text style={{fontSize:20, fontFamily:'Outfit-SemiBold', color:'black', marginLeft:10}}>Email</Text>
                <View style={styles.profileTextContainer}>
                    <Text style={styles.profileText}>{userInfo.email}</Text>
                </View>

                <Text style={{fontSize:20,paddingTop:20, fontFamily:'Outfit-SemiBold', color:'black', marginLeft:10}}>Username</Text>
                <View style={styles.profileTextContainer}>
                    <Text style={styles.profileText}>{userInfo.preferred_username}</Text>
                </View>
                
                <Text style={{fontSize:20,paddingTop:20, fontFamily:'Outfit-SemiBold', color:'black', marginLeft:10}}>Name</Text>
                <View style={styles.profileTextContainer}>
                <Text style={styles.profileText}>{userInfo.name}</Text>
                </View>

                </View>
            )}
       </View>

       <TouchableOpacity style={styles.button}
                onPress={signOut}>
                <Text style={styles.buttonText}>Sign Out</Text>
       </TouchableOpacity>
      
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor:'#73be73',
    marginTop:20
    //justifyContent: 'center',
  },
  textContainer:{
    paddingTop: 30,
    //alignItems: 'center',
  },
  profileTextContainer:{
    width: '100%',
    padding:8,
    marginVertical: 5,
    alignItems: 'center',
    backgroundColor:'#73be73',
    borderTopColor:'#73be73',
    borderLeftColor:'#73be73',
    borderRightColor:'#73be73',
    borderBottomColor: '#00A36C',
    borderWidth: 1,
  },
  profileText: {
    paddingTop: 5,
    paddingBottom:10,
    alignSelf:'flex-start',
    fontSize: 16,
    fontFamily:'Outfit-Regular',
    color: '#4F7942',
  },
  button:{
    backgroundColor: '#6f5e55',
    padding: 9,
    borderRadius: 99,
    marginTop: 25, 
    marginRight:10,
    marginLeft:10
},

buttonText:{
    color: 'white',
    textAlign: 'center',
    justifyContent:'center',
    marginTop:4,
    fontFamily: 'Outfit-Regular',
    fontSize: 16,
}
});

export default ProfileScreen;
