import { StyleSheet, Text, View, Image} from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { Ionicons, FontAwesome, MaterialIcons } from '@expo/vector-icons';
import CoinDetails from '../assets/crypto.json'
import { useNavigation } from '@react-navigation/native';
import { collection, getDoc, doc, setDoc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore'; 
import { db } from '../firebase';
import { AuthContext } from '../navigation/AuthProvider';
import { useFavouriteList } from '../Contexts/FavouriteListContext';

const CoinDetailsHeader = (props) => {
    const {image, name, coinId, marketCapRank} = props;
    const navigation = useNavigation();

    const {favouriteCoinIds, storeFavouriteCoinId, removeFavouriteCoinId} = useFavouriteList();

    const chechIfCoinIsFavourite = () => favouriteCoinIds.some((coinIdValue) => coinIdValue === coinId)

    const handleFavouriteListCoin = () => {
      if (chechIfCoinIsFavourite()){
        return removeFavouriteCoinId(coinId)
      }
      return storeFavouriteCoinId(coinId)
    }

    // // ISPOD OVOGA JE DIO KODA KOJI JE RADIO
    // // const [isFavourite, setIsFavourite] = useState(false);

    // // const {user} = useContext(AuthContext);
    // // const favouritesRef = doc(db, "users", user.email);
    // // const docRef = doc(db, "users", user.email);

    // // const addFavourite = async () => {
    // //   await updateDoc(favouritesRef, {
    // //     favourites: arrayUnion(id)
    // // });
    // // setIsFavourite((prevState) => !prevState);

    // // }

    // // const removeFavourite = async () => {
    // //   await updateDoc(favouritesRef, {
    // //     favourites: arrayRemove(id)
    // // });
    // // setIsFavourite((prevState) => !prevState);

    // // }

    // // const getData = async () => {
    // //   const docSnap = await getDoc(docRef);
    // //   if (docSnap.exists()) {
    // //     // console.log("Document data:", docSnap.data());
    // //     // console.log("Document data:", docSnap.data().favourites);
    // //     const favouriteList = docSnap.data().favourites;
    // //     console.log("favouriteList:", favouriteList);
    // //     if (favouriteList.includes(id)){
    // //       console.log("YES favourite", id)
    // //       setIsFavourite(true);
    // //     } else {
    // //       console.log("NO favourite:", id)
    // //       setIsFavourite(false);
    // //     }
    // //   } else {
    // //     // doc.data() will be undefined in this case
    // //     console.log("No such document!");
    // //   }
    // // }
    // // useEffect(() => {
    // //   getData();
    // // }, [])
    
    // // useEffect(() => {
    // //   if (isFavourite) {
    // //     console.log("Component will show");
    // //     // Perform any action you want when the component is about to be shown
    // //   } else {
    // //     console.log("Component will hide");
    // //     // Perform any action you want when the component is about to be hidden
    // //   }
    // // }, [isFavourite]);
    // // IZNAD OVOGA JE DIO KODA KOJI JE RADIO

  return (
    <View style={styles.headerContainer}>
      <Ionicons name="chevron-back" size={32} color="#18c68b" onPress={() => navigation.goBack()}/>
      <View style={styles.coinContainer}>
        <Image source={{uri: image}} style={{width:25, height: 25}}/>
        <Text style={styles.coinTitle}>{name}</Text>
        <View style={styles.rankContainer}>
            <Text style={styles.coinRank}>#{marketCapRank}</Text>
        </View>
      </View>
      
      {chechIfCoinIsFavourite() ? <MaterialIcons name="favorite" size={32} color="#18c68b" onPress={() => handleFavouriteListCoin()}/> : <MaterialIcons name="favorite-border" size={32} color="#18c68b" onPress={() => handleFavouriteListCoin()}/> }
      
      
    </View>
  )
}

export default CoinDetailsHeader

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection:'row', 
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    coinContainer: {
        flexDirection: 'row', 
        alignItems: 'center'
    },
    coinTitle: {
        color: '#18c68b', 
        fontWeight: 'bold', 
        marginHorizontal: 10, 
        fontSize: 18
    },
    rankContainer: {
        backgroundColor: '#6d897e',
        paddingHorizontal: 5,
        paddingVertical: 2,
        borderRadius: 5
    },
    coinRank: {
        color: '#0b0d11', 
        fontWeight: 'bold', 
        fontSize: 16
    },
})