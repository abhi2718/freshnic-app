import React,{useState,useEffect} from 'react';
import {View,Text,Image,StyleSheet,Picker,TouchableWithoutFeedback} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import {useDispatch} from 'react-redux';
import {removeFromCart} from '../../store/actions/cart';
import {upDateQty} from  '../../store/actions/cart';
const CartItem=props=>{
    const {description,id,imageUrl,ownerId,price,qtyInStock,title,qty}=props;
    const [qtyOfItem, setQty] = useState(qty);
    const options=()=>{
        let optionsArray=[];
        for(let i=1;i<=qtyInStock;i++){
               let option=<Picker.Item key={i}  value={`${i}`} label={`${i}`} />
               optionsArray.push(option)
        }
        return optionsArray;
    }
    const dispatch=useDispatch();
    useEffect(()=>{
        dispatch(upDateQty({
            description,id,imageUrl,ownerId,price,qtyInStock,title,qty:qtyOfItem
        }))
    },[qtyOfItem])
    return(
         <View style={{backgroundColor:"white",paddingVertical:0,margin:10}}>
         <View style={styles.row}>
              <Image style={{width:100,height:80}} source={{uri:props.imageUrl}} />
              <Text style={styles.textColor}> {qtyOfItem} X {'\u20B9'} {price}</Text>
              <TouchableWithoutFeedback onPress={()=>dispatch(removeFromCart(props.id))}>
                 <View style={{alignItems:"center"}}>
                   <MaterialCommunityIcons name="delete-empty" size={24} color="red" />
                   <Text style={styles.textColor}>Delete</Text>
                 </View>
              </TouchableWithoutFeedback> 
          </View>
          <View style={{...styles.row}}>
               <Text style={styles.textColor}>{title}</Text>
               <Text style={styles.textColor}>qty : {qtyOfItem}</Text>
                     <Picker
                      selectedValue={qtyOfItem}
                      onValueChange={val=>{
                            setQty(val)
                        }}
                      style={{width:30,height:30}}>
                          { options()}
                    </Picker>
         </View>
         </View>
    );
}
const styles=StyleSheet.create({
    container:{
        width:"100%",
        height:"100%",
        paddingHorizontal:10,
        borderRadius:20
    },
    row:{
        flexDirection:'row',
        justifyContent:"space-between",
        alignItems:"center",
        backgroundColor:"white",
        paddingHorizontal:5,
    },
    textColor:{
       color:"blue"
    }
  
})

export default CartItem;