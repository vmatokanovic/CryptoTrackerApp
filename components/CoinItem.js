import { StyleSheet, Text, View, Image, Pressable} from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons';

const CoinItem = ({coin}) => {
    const coinName = coin.name;
    const coinSymbol = coin.symbol.toUpperCase();
    const price = coin.current_price;
    const imageUri = coin.image;
    const marketCapRank = coin.market_cap_rank;
    const priceChange24h = coin.price_change_percentage_24h;
    const marcetCap = coin.market_cap;

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

    const percentageColor = priceChange24h < 0 ? "#ea3943" : "#16c784" || 'white';
  return (
    <Pressable style={styles.containerItem} onPress={() => {console.log(coin.name)}}>
        <Image 
            style={styles.image}
            source={{uri: imageUri}}
        />
        <View>
            <Text style={styles.coinNameText}>{coinName}</Text>
            <View style={{ flexDirection: "row" }}>
                <View style={styles.rankContainer}>
                    <Text style={styles.rank}>{marketCapRank}</Text>
                </View>
                <Text style={styles.text}>{coinSymbol}</Text>
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

        <View style={{ marginLeft: "auto", alignItems: "flex-end" }}>
            <Text style={styles.coinNameText}>{price} $</Text>
            <Text style={styles.coinSymbolText}>
            MCap {normalizeMarketCap(marcetCap)}
            </Text>
        </View>
    </Pressable>
  )
}

export default CoinItem

const styles = StyleSheet.create({
    containerItem: {
    flexDirection: "row",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#282828",
    padding: 15,
    },
    image: {
        height: 40,
        width: 40,
        marginRight: 10,
        alignSelf: "center",
    },
    coinNameText: {
        color: '#FED053',
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 3,
    },
    coinSymbolText: {
        color: '#FED053',
        fontSize: 16
    },
    rankContainer: {
        backgroundColor: '#585858',
        paddingHorizontal: 5,
        borderRadius: 5,
        marginRight: 5,
    },
})