import React from 'react';
import {View,Text,StyleSheet,TouchableWithoutFeedback} from 'react-native';
import CreateTabNavigator from '../../components/shop/tabNavigator';
import tabData from '../../data/tabNavigatorData';
import {useDispatch,useSelector } from 'react-redux';
import {Ionicons} from '@expo/vector-icons';

const Profile=props=>{
const dispatch=useDispatch();
const {userInfo}=useSelector(state=>state.authentication);
    return(
        <View style={{flex:1}}>
             <View style={{flex:0.9}}>
               <View style={styles.container}>
               <Ionicons 
                 name='person'
                 color="blue"
                 size={180}
                />
                <Text>{userInfo?userInfo.email:""}</Text>
                <Text>{userInfo?userInfo.name:""}</Text>
                <TouchableWithoutFeedback  onPress={()=>{
                    dispatch({type:"REQ_FOR_LOGOUT"});
                    props.navigation.navigate('SignIn');
                 }}>
                   <Text style={styles.btnStyle}>Logout</Text>
                </TouchableWithoutFeedback>
               </View>
             </View>
                <View style={{flex:0.1,justifyContent:"flex-end",maxHeight:50}}>
                  <CreateTabNavigator
                   tabData={tabData} 
                   {...props} 
                 />
                </View>
         </View>
    )
}
const styles=StyleSheet.create({
  container:{
      padding:16,
      alignItems:"center",
      justifyContent:"center",
      flex:1,
      backgroundColor:"white",
  },
  btnStyle:{
    marginTop:20,
    padding:10,
    backgroundColor:"red",
    width:"100%",
    textAlign:'center',
    color:"white"
  }
})
export default Profile;