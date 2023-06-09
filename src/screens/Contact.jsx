import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import fondo from "../../images/Frame57.png"
import { ImageBackground } from 'react-native';

export default function Contact(){
  return (
    <ImageBackground source={fondo} style={styles.contContact1}>
      <View style={styles.contTitleContact}>
        <Text style={styles.title}>Contact</Text>
      </View>

      <View style={styles.contInfoContact}>
        <View style={styles.detailsContact}>
          <View>
            <Text style={styles.titleInfo}>Address</Text>
          </View>
          <View>
            <Text style={styles.info}>Calle Vista Alegre, Valencia, C. P. 10445</Text>
          </View>
        </View>
        <View style={styles.detailsContact}>
          <View>
            <Text style={styles.titleInfo}>Email</Text>
          </View>
          <View>
            <Text style={styles.info}>Lance@gmail.com</Text>
          </View>
        </View>
        <View style={styles.detailsContact}>
          <View>
            <Text style={styles.titleInfo}>Phone</Text>
          </View>
          <View>
            <Text style={styles.info}>+5435849215482</Text>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};
const altura = Dimensions.get('window').height;
const styles = StyleSheet.create({
    gradient: {
        flex: 1,
      },
  contContact1: {
    alignItems: 'center',
    justifyContent: 'space-between',
    height: altura,
  },
  contTitleContact: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "25%",
    marginBottom: 20,
    width: "100%",
  },
  title: {
    fontSize: 50,
    fontFamily:'Montserrat-Bold'
  },
  contInfoContact: {
    height: "100%",
    alignItems: 'center',
    justifyContent: "flex-start",
    gap: 60,
    width: "100%"
  },
  detailsContact: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginVertical: 5,
    width: "50%",
  },
  titleInfo: {
    fontFamily:'Montserrat-Bold',
    fontSize: 20,
    marginRight: 10,
    marginBottom: 10
  },
  info: {
    fontSize: 14,
    fontFamily:'Montserrat-Medium',
    width: 170
  },
});
