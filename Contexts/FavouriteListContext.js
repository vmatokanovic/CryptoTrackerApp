import React, { useContext, createContext, useState, useEffect } from 'react'
import { collection, getDoc, doc, setDoc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore'; 
import { db } from '../firebase';
import { AuthContext } from '../navigation/AuthProvider';
import { async } from '@firebase/util';

const FavouriteListContext = createContext();
export const useFavouriteList = () => useContext(FavouriteListContext);

const FavouriteListProvider = ({children}) => {
    const [favouriteCoinIds, setFavouriteCoinIds] = useState([]);

    const {user} = useContext(AuthContext);
    const docRef = doc(db, "users", user.email);

    const getFavouriteListData = async() => {
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            // console.log("Document data:", docSnap.data());
            const favouriteListIds = docSnap.data().favourites;
            console.log("favouriteList:", favouriteListIds);
            setFavouriteCoinIds(favouriteListIds);
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }

    useEffect( () => {
        getFavouriteListData()
    }, [])

    const storeFavouriteCoinId = async (coinId) => {
        await updateDoc(docRef, {
            favourites: arrayUnion(coinId)
        });
        getFavouriteListData()
    }

    const removeFavouriteCoinId = async (coinId) => {
        await updateDoc(docRef, {
            favourites: arrayRemove(coinId)
        });
        getFavouriteListData()
    }

  return (
    <FavouriteListContext.Provider value={{favouriteCoinIds, storeFavouriteCoinId, removeFavouriteCoinId}}>
        {children}
    </FavouriteListContext.Provider>
  )
}

export default FavouriteListProvider