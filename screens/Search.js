import React, { useEffect, useState } from 'react';
import {
    View,
    Text
} from 'react-native';

import FormInput from '../components/FormInput'

const Search = () => {
    const [search, setSearch] = useState(null);
    useEffect( () => {
        console.log(`Search is: ${search}`)
    }, [search])
    return (
        <View>
            <FormInput labelValue={search} onChangeText={(searchTerm) => setSearch(searchTerm)} placeholderText="Search crypto..."/>
        </View>
    )
}

export default Search;