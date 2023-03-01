import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput
} from 'react-native';
import SearchableDropdown from 'react-native-searchable-dropdown';
import { getAllCoins } from '../services/requests';
import { useNavigation } from '@react-navigation/native';
import { Foundation } from '@expo/vector-icons';

const SearchScreen = () => {
    
    const [allCoins, setAllCoins] = useState([]);
    const [loading, setLoading] = useState(false);

    const navigation = useNavigation();

    const fetchAllCoins = async () => {
        if(loading){
            return;
        }
        setLoading(true);
        const allCoins = await getAllCoins();
        setAllCoins(allCoins);
        setLoading(false);
    }

    useEffect( () => {
        fetchAllCoins();
    }, [])
    return (
        <View style={{alignItems: 'center'}}>
            <View style={{flexDirection: 'row', alignItems: 'baseline'}}>
                <Foundation name="page-search" size={25} color="#18c68b" />
                <Text style={{ fontFamily: 'Roboto-Regular', color: '#18c68b', fontSize: 25, letterSpacing: 1, paddingHorizontal: 20, paddingBottom: 10}}>Search coins</Text>
            </View>
            <SearchableDropdown
                items={allCoins}
                onItemSelect={(item) => navigation.navigate("CoinDetailsScreen", {coinId: item.id})}
                containerStyle={styles.dropdownContainer}
                itemStyle={styles.item}
                itemTextStyle={{color: '#caffea'}}
                resetValue={false}
                placeholder={"Search for coin..."}
                placeholderTextColor="#364540"
                textInputProps={{
                    underlineColorAndroid: "transparent",
                    style: {
                        padding: 12,
                        borderWidth: 1.5,
                        borderColor: "#364540",
                        borderRadius: 10,
                        backgroundColor: '#14181b',
                        color: '#18c68b'
                    }
                }}
            />
        </View>
    )
}

export default SearchScreen;

const styles = StyleSheet.create({
    dropdownContainer: {
        width: "100%",
        paddingHorizontal: 10,
        paddingVertical: 10
    },
    item: {
        padding: 10,
        marginTop: 2,
        backgroundColor: '#1e1e1e',
        borderWidth: 1,
        borderColor: '#364540',
        borderRadius: 5
    },
})