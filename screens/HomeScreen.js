import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
    View,
    Text, 
    FlatList,
    RefreshControl
} from 'react-native';

import CoinItem from '../components/CoinItem';
import { getMarketData } from '../services/requests';
import { FontAwesome5 } from '@expo/vector-icons';

const HomeScreen = () => {
    const [coins, setCoins] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchCoins = async (pageNumber) => {
        if (loading) {
            return;
        }
        setLoading(true);
        const fetchedCoinsData = await getMarketData(pageNumber);
        setCoins((existingCoinsData) => ([...existingCoinsData, ...fetchedCoinsData]));
        setLoading(false);
    }

    const refetchCoins = async () => {
        if (loading) {
            return;
        }
        setLoading(true);
        const fetchedCoinsData = await getMarketData();
        setCoins(fetchedCoinsData);
        setLoading(false);
    }

    useEffect(() => {
        fetchCoins()
    }, [])

    return (
        <View style={{ alignItems: 'center'}}>
            <View style={{flexDirection: 'row', alignItems: 'baseline'}}>
                <FontAwesome5 name="coins" size={25} color="#18c68b" />            
                <Text style={{alignItems: 'center' ,fontFamily: 'Roboto-Regular', fontWeight: '500', color: '#18c68b', fontSize: 25, letterSpacing: 1, paddingHorizontal: 20, paddingBottom: 10}}>Cryptocurrencies</Text>
            </View>
            <FlatList 
                data={coins} 
                renderItem={({item}) => <CoinItem marketCoin={item} />}
                onEndReached={() => fetchCoins((coins.length / 50) + 1)}
                refreshControl={
                    <RefreshControl 
                        refreshing={loading}
                        tintColor="white"
                        onRefresh={refetchCoins}
                    />
                }
            />
        </View>
    )
}

export default HomeScreen;