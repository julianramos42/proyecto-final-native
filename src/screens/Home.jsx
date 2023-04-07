import React from 'react'
import { Text, View,ImageBackground,StyleSheet,StatusBar,Dimensions} from 'react-native'
import BtnIndex from '../components/BtnIndex/BtnIndex'

export default function Home() {
  return (
    <View style={{flex:1}}>
        <ImageBackground source={require('../../images/img_home.jpg')} style={styles.img_home} resizeMode='cover'>
          <View style={styles.cont_1}>
            <View style={styles.cont_text}>
              <Text style={styles.text_1}>Finally, a modern</Text>
              <Text style={styles.text_2}>Online store builder for anyone</Text>
              <Text style={styles.text_1}>Easy. For cell phones. Open source.</Text>
            </View>
          </View>
          <View style={styles.cont_btn}>
            <BtnIndex name='See all stores' color='white' bg='#495464'/>
          </View>
        </ImageBackground>
    </View>
  )
}
const altura = Dimensions.get('window').height;
const styles = StyleSheet.create({
  img_home:{
    flex:1,
    height:altura
  },
  cont_1:{
    flex:0.5,
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    paddingTop:116
  },
  cont_text:{
    width:360
  },
  text_1:{
    fontSize:22,
    fontWeight:500
  },
  text_2:{
    fontSize:45,
    fontWeight:700
  },
  cont_btn:{
    flex:0.5,
    display:'flex',
    justifyContent:'flex-end',
    alignItems:'center',
    paddingBottom:67,
  }
  
})