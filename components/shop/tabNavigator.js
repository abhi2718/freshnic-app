import React from 'react';
import {View,Text,StyleSheet,Dimensions,TouchableWithoutFeedback} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
const {width} =Dimensions.get("screen");
const CreateTabNavigator=props=>{
    const {tabData,navigation}=props;
    const eachTabWidth=width/tabData.length;
    const tabList=tabData.map(tabInfo=>(
        <TouchableWithoutFeedback  key={tabInfo.id} onPress={()=>navigation.navigate(tabInfo.action)}>
        <View style={{...styles.tabStyle,width:eachTabWidth}}>
             <Ionicons 
              color={navigation.state.routeName===tabInfo.action?tabInfo.activeColor
                       :tabInfo.inactiveColor
                    }
              size={20} 
              name={tabInfo.iconName} 
             />
            <Text style={
                {color:navigation.state.routeName===tabInfo.action?tabInfo.activeColor
                       :tabInfo.inactiveColor,fontSize:10}}
            >{tabInfo.title}
            </Text>
        </View>
        </TouchableWithoutFeedback>
    ))
    return(
        <View style={styles.container}>
            {
                tabList
            }
        </View>
    )
}
const styles=StyleSheet.create({
    container:{
      backgroundColor:"white",
      paddingVertical:5,
      height:50,
      flexDirection:"row"
    },
    tabStyle:{
        borderWidth:1,
        borderColor:"white",
        justifyContent:"center",
        alignItems:"center"
    }
})
export default CreateTabNavigator;