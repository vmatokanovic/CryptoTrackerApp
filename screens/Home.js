import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
    View,
    Text, 
    FlatList
} from 'react-native';

import CoinItem from '../components/CoinItem';

const Home = () => {

    const [coins, setCoins] = useState([])

    const loadCoinData = async () => {
        try{
            const response = await axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=true&price_change_percentage=24h`);
            return response.data;
        } catch(e) {
            console.log(e);
        }
    } 

    const fetchAllCoins = async () => {
        const allCoins = await loadCoinData();
        setCoins(allCoins);
      };

    useEffect(() => {
        fetchAllCoins();
    }, []);

    return (
        <View>
            <FlatList
            data={coins}
            renderItem={({item}) => {
                return <CoinItem coin={item}/>
            }}
            />
        </View>
    )
}

export default Home;