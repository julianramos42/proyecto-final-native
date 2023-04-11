import React, { useState } from "react";
import { View, Text, Image, StyleSheet, Dimensions } from "react-native";
import persona1 from "../../images/persona11.png"
import persona2 from "../../images/persona21.png"
import persona3 from "../../images/persona31.png"
import vector from "../../images/Vector.png"

export default function Customers() {
const [activeIndex, setActiveIndex] = useState(0);
const handleNext = () => setActiveIndex((prevIndex) => prevIndex + 1);
const handlePrev = () => setActiveIndex((prevIndex) => prevIndex - 1);

const customers = [
{
name: "Jaime Foldón",
comment:
"I loved the experience of shopping at Lance's online store. From the moment I entered his website, I was able to easily navigate through the different categories and find what I was looking for.",
rating: 5,
image: persona1,
},
{
name: "Aleja Amigo",
comment:
"I highly recommend Lance's online store. It is easy to use, intuitive, and has a wide variety of high-quality products. Also, I love that they offer free shipping on orders over a certain amount.",
rating: 5,
image: persona2,
},
{
name: "Antonio Garrete",
comment:
"Lance's app is awesome! From the visually appealing design to the ease of navigation. Also, the range of products available was impressive and I was able to find exactly what I was looking for.",
rating: 5,
image: persona3,
},
];

const customer = customers[activeIndex];

return (
<View style={styles.customers1}>

    <View style={styles.contTitleCustomers}>
        <Text style={styles.title}>Satisfied customers</Text>
    </View>

  <View style={styles.contNames}>
    
    {activeIndex > 0 && (
        <Text style={styles.prevBtn} onPress={handlePrev}>
          &#8249;
        </Text>
      )}
    
    <View style={styles.cartaNames}>
      <View style={styles.img}>
        <Image source={customer.image} style={styles.imgPersona} />
      </View>

      <View style={styles.contTextos}>
        <Text style={styles.name}>{customer.name}</Text>
        <Text style={styles.comment}>{customer.comment}</Text>
        <View style={styles.rating}>
          {[...Array(customer.rating)].map((_, index) => (
            <Image
              source={vector}
              style={styles.estrella}
              key={index}
            />
          ))}
        </View>
      </View>
    </View>
    
    
    {activeIndex < customers.length - 1 && (
        <Text style={styles.nextBtn} onPress={handleNext}>
          &#8250;
        </Text>
      )}
    
    
  </View>

</View>
);
}
const altura = Dimensions.get('window').height;
const styles = StyleSheet.create({
customers1: {
    flex:1,
    minHeight:altura,
},
contTitleCustomers: {
    marginVertical: 20,
    alignItems: 'center',
},
title: {
    textAlign: "center",
    fontSize: 40,
    width: 200,
    fontWeight: 900,
    fontWeight: 'bold',
    marginBottom: 30,
},
contNames: {
    position: "relative",
    flexDirection: 'row',
    justifyContent: 'center',
    marginHorizontal: 20,
    alignItems: "center",
},
cartaNames: {
    flexDirection: 'column',
    alignItems: "center",
    width: "100%"
},
imgPersona: {
    width: 300,
    height: 300,
    borderRadius: 10,
},
rating:{
    display: "flex",
    flexDirection: "row",
    gap: 10
},
contTextos:{
    display: "flex",
    marginTop: 20,
    gap: 0,
    alignItems: "center",
    justifyContent: "center"
},
name:{
    fontSize: 30,
    fontWeight: 600,
},
comment:{
    fontSize: 18,
    textAlign: "center",
    padding: 15
},
estrella:{
    width: 20,
    height: 20,
},
prevBtn:{
    fontSize: 50,
    zIndex: 100,
    position: "absolute",
    left: 0,
    top: 150
},
nextBtn:{
    position: "absolute",
    fontSize: 50,
    zIndex: 100,
    right: 0,
    top: 150
},

})