import { StyleSheet, Text, View, Image, Pressable} from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const CoinItem = ({marketCoin}) => {
    const coinId = marketCoin.id;
    const coinName = marketCoin.name;
    const coinSymbol = marketCoin.symbol.toUpperCase();
    const price = marketCoin.current_price;
    const imageUri = marketCoin.image;
    const marketCapRank = marketCoin.market_cap_rank;
    const priceChange24h = marketCoin.price_change_percentage_24h;
    const marcetCap = marketCoin.market_cap;
    
    const navigation = useNavigation();

    const normalizeMarketCap = (marketCap) => {
        if (marketCap > 1e12) {
          return `${(marketCap / 1e12).toFixed(3)} T`;
        }
        if (marketCap > 1e9) {
          return `${(marketCap / 1e9).toFixed(3)} B`;
        }
        if (marketCap > 1e6) {
          return `${(marketCap / 1e6).toFixed(3)} M`;
        }
        if (marketCap > 1e3) {
          return `${(marketCap / 1e3).toFixed(3)} K`;
        }
        return marketCap;
      };

    const percentageColor = priceChange24h < 0 ? "#C70C4E" : "#0CC76E" || 'white';
  return (
    <Pressable style={styles.containerItem} onPress={() => navigation.navigate("CoinDetailsScreen", {coinId: coinId})}>
        <View style={styles.rankContainer}>
            <Text style={styles.rank}>{marketCapRank}</Text>
        </View>
        <Image 
            style={styles.image}
            source={{uri: imageUri}}
        />
        <View>
            <Text style={styles.coinNameText}>{coinName} <Text style={styles.coinSymbolText}>{coinSymbol}</Text></Text>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.coinSymbolText}>
                ${normalizeMarketCap(marcetCap)}
              </Text>
                
            </View>
        </View>

        <View style={{ marginLeft: "auto", alignItems: "flex-end" }}>
          <Text style={styles.coinNameText}>${price}</Text>
            <View style={{ flexDirection: "row" }}>
              <AntDesign
                  name={priceChange24h < 0 ? "caretdown" : "caretup"}
                  size={12}
                  color={percentageColor}
                  style={{ alignSelf: "center", marginRight: 5 }}
                />
              <Text style={{ color: percentageColor }}>
                  {priceChange24h?.toFixed(2)}%
              </Text>
            </View>
        </View>
    </Pressable>
  )
}

export default CoinItem

const styles = StyleSheet.create({
    containerItem: {
    flexDirection: "row",
    backgroundColor: '#14181b',
    borderRadius: 10,
    padding: 12,
    marginBottom: 8
    },
    image: {
        height: 40,
        width: 40,
        marginRight: 10,
        alignSelf: "center",
    },
    coinNameText: {
        color: '#caffea',
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 3,
    },
    coinSymbolText: {
        color: '#6d897e',
        fontSize: 16,
        fontWeight: 'normal'
    },
    rankContainer: {
        height: 50,
        width: 50,
        justifyContent: 'center',
        alignItems:'center',
        backgroundColor: '#18c68b',
        paddingHorizontal: 5,
        borderRadius: 5,
        marginRight: 5,
        marginRight: 12
    },
    rank: {
        fontSize: 22,
        color: '#14181b'
  },
})