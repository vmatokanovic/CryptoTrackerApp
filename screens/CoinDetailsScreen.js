import { Dimensions, StyleSheet, View, Text, TextInput, Image, ActivityIndicator} from 'react-native'
import React, { useState, useEffect } from 'react'
import CoinDetailsHeader from '../components/CoinDetailsHeader';
import { LineChart } from 'react-native-wagmi-charts';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';
import { getDetailedCoinData, getCoinMarketChart } from '../services/requests';

const CoinDetailsScreen = () => {
    const [coin, setCoin] = useState(null);
    const [coinChart, setCoinChart] = useState(null);
    const route = useRoute();
    const {params: {coinId}} = route;

    const [loading, setLoading] = useState(false);
    const [coinValue, setCoinValue] = useState("1");
    const [usdValue, setUsdValue] = useState("");

    const fetchCoinData = async() => {
      setLoading(true);
      const fetchedCoinData = await getDetailedCoinData(coinId);
      const fetchedCoinChartData = await getCoinMarketChart(coinId);
      setCoin(fetchedCoinData);
      setCoinChart(fetchedCoinChartData);
      setUsdValue(fetchedCoinData.market_data.current_price.usd.toString())
      setLoading(false);
    }

    useEffect(() => {
      fetchCoinData()
    }, [])

    if(loading || !coin || !coinChart) {
      return <ActivityIndicator style={{flex:1, justifyContent:'center', alignContent:'center'}} size="large" />
    }

    const {
      image: {small}, 
      name, 
      id,
      symbol,
      market_data: {market_cap_rank, current_price, price_change_percentage_24h}
    } = coin;

    const {prices} = coinChart;

    

    const percentageColor = price_change_percentage_24h < 0 ? "#C70C4E" : "#0CC76E" || 'white';
    const screenWidth = Dimensions.get("window").width;

    const data = prices.map( (price) => ({ timestamp: price[0], value: price[1] }));

    const changeCoinValue = (value) => {
      setCoinValue(value);
      const floatValue = parseFloat(value.replace(',','.')) || 0
      setUsdValue((floatValue * current_price.usd).toString())
    }

    const changeUsdValue = (value) => {
      setUsdValue(value)
      const floatValue = parseFloat(value.replace(',','.')) || 0
      setCoinValue((floatValue / current_price.usd).toString())
    }

  return (
    <View style={{paddingHorizontal: 10}}>
      <LineChart.Provider data={data}>
          <CoinDetailsHeader image={small} name={name} marketCapRank={market_cap_rank} coinId={id}/>
          <View style={{padding: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
            <View>
              <Text style={styles.text} >Current price</Text>
              <Text style={styles.currentPrice}>${current_price.usd}</Text>
            </View>
            <View style={{backgroundColor: percentageColor, padding: 10, borderRadius: 10}}>
              <Text style={styles.text}>{price_change_percentage_24h.toFixed(2)}%</Text>
            </View>
          </View>
          <GestureHandlerRootView>
            <LineChart width={screenWidth} height={screenWidth/2}>
              <LineChart.Path color={percentageColor}>
                <LineChart.Gradient />
              </LineChart.Path>
              <LineChart.CursorCrosshair color={percentageColor}>
                <LineChart.Tooltip>
                  <LineChart.PriceText 
                    precision={6}
                    style={{
                      backgroundColor: percentageColor,
                      borderRadius: 4,
                      color: 'white',
                      fontSize: 12,
                      padding: 4,
                      }}
                  />
                </LineChart.Tooltip>
                <LineChart.Tooltip position="bottom">
                  <LineChart.DatetimeText 
                    style={{
                      backgroundColor: percentageColor,
                      borderRadius: 4,
                      color: 'white',
                      fontSize: 12,
                      padding: 4,
                      }}
                  />
                </LineChart.Tooltip>
              </LineChart.CursorCrosshair>
            </LineChart>
          </GestureHandlerRootView>
          <View style={styles.converterContainer}>
            <View style={{flexDirection: 'row', flex: 1, alignItems: 'center'}}>
              <Image source={{uri: small}} style={{width:25, height: 25, marginEnd: 5}}/>
              <Text style={{color:'white'}}>{symbol.toUpperCase()}</Text>
              <TextInput 
                style={styles.input} 
                value={coinValue}
                keyboardType='numeric'
                onChangeText={changeCoinValue}
              />
            </View>
            <View>
              <MaterialIcons name="compare-arrows" size={25} color="white" style={{marginEnd: 5}}/>
            </View>
            <View style={{flexDirection: 'row', flex: 1, alignItems: 'center'}}>
              <FontAwesome name="usd" size={25} color="#18c68b" style={{marginEnd: 5}}/>
              <Text style={{color:'white'}}>USD</Text>
              <TextInput 
                style={styles.input} 
                value={usdValue}
                keyboardType='numeric'
                onChangeText={changeUsdValue}
              />
            </View>
          </View>
      </LineChart.Provider>
    </View>
  )
}

export default CoinDetailsScreen

const styles = StyleSheet.create({
  converterContainer: {
    flexDirection: 'row', 
    alignItems: 'center',
    backgroundColor: '#14181b',
    padding: 15,
    borderRadius: 10
  },
  text: {
    color: 'white', 
    fontSize: 16,
    fontWeight: '500'
  },
  currentPrice: {
    color: 'white', 
    fontSize: 32, 
    fontWeight: '500'
  },
  input: {
    flex: 1,
    height: 40,
    marginHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'white',
    padding: 0,
    fontSize: 16,
    color: 'white'
  }
})