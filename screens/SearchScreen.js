import React, { useEffect, useState } from 'react';
import {
    View,
    Text
} from 'react-native';

import FormInput from '../components/FormInput'

const SearchScreen = () => {
    const [search, setSearch] = useState(null);
    return (
        <View>
            <FormInput labelValue={search} onChangeText={(searchTerm) => setSearch(searchTerm)} placeholderText="Search crypto..."/>
        </View>
    )
}

export default SearchScreen;