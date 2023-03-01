import { StyleSheet, Text, View, Button, FlatList, RefreshControl} from 'react-native'
import React, { useEffect, useContext, useState } from 'react'
import { collection, getDoc, doc, setDoc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore'; 
import { db } from '../firebase';
import { AuthContext } from '../navigation/AuthProvider';
import { getFavouriteCoins } from '../services/requests';
import CoinItem from '../components/CoinItem';
import { useFavouriteList } from '../Contexts/FavouriteListContext';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const FavouritesScreen = () => {

  const {favouriteCoinIds} = useFavouriteList();

  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isArrayEmpty, setIsArrayEmpty] = useState(false);

  const transformCoinIds = () => favouriteCoinIds.join('%2C');

  const fetchFavouriteCoins = async () => {
    if (loading){
      return;
    }
    setLoading(true);
    if (favouriteCoinIds.length === 0) {
      setIsArrayEmpty(true);
    } else {
      setIsArrayEmpty(false);
      const favouriteCoinsData = await getFavouriteCoins(1, transformCoinIds());
      setCoins(favouriteCoinsData);
    }
    setLoading(false);
  }

  useEffect( () => {
    fetchFavouriteCoins();
  }, [favouriteCoinIds]);

  return (
    <View style={{flex: 1}}>
      <View style={{alignItems: 'center'}}>
        <View style={{flexDirection: 'row', alignItems: 'baseline'}}>
          <MaterialCommunityIcons name="playlist-star" size={25} color="#18c68b" />
          <Text style={{fontFamily: 'Roboto-Regular', color: '#18c68b', fontSize: 25, letterSpacing: 1, paddingHorizontal: 20, paddingBottom: 10}}>Favourite coins</Text>
        </View>
      </View>
      { isArrayEmpty ? (
        <View style={{flex:1, alignItems: 'center', justifyContent: 'center'}}>
          <Text style={{color: '#3d4542', fontSize: 18, fontWeight: 'bold'}}>Your favourite coins list is empty!</Text>
        </View>
        
        )
      : (
        <FlatList 
          data={coins} 
          renderItem={({ item }) => <CoinItem marketCoin={item}/> }
          refreshControl={
            <RefreshControl
              refreshing={loading}
              tintColor="white"
              onRefresh={fetchFavouriteCoins}
            />
          }
      />
      )}
    </View>
  )
}

export default FavouritesScreen

const styles = StyleSheet.create({})