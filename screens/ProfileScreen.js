import React, { useContext, useEffect, useState } from "react";
import {
  Avatar,
  View,
  Text,
  StyleSheet,
  Platform,
  Image,
  Alert,
  TouchableOpacity,
} from "react-native";
import FormButton from "../components/FormButton";
import { AuthContext } from "../navigation/AuthProvider";
import { Feather, MaterialIcons, AntDesign } from "@expo/vector-icons";
import { storage } from "../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import * as ImagePicker from "expo-image-picker";

const ProfileScreen = () => {
  const { user, logout } = useContext(AuthContext);

  const storageRef = ref(storage, user.email);
  const [image, setImage] = useState(null);

  const [uploading, setUploading] = useState(false);
  const [transferred, setTransferred] = useState(0);

  const takeImageFromCamera = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      //convert image to array of bytes
      const img = await fetch(result.assets[0].uri);
      const bytes = await img.blob();

      await uploadBytes(storageRef, bytes);
    }
    showProfilePic();
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    console.log(result);

    if (!result.canceled) {
      //convert image to array of bytes
      const img = await fetch(result.assets[0].uri);
      const bytes = await img.blob();

      await uploadBytes(storageRef, bytes);
    }
    showProfilePic();
  };

  const showProfilePic = () => {
    getDownloadURL(ref(storage, user.email))
      .then((url) => {
        console.log("File available at: " + url);

        setImage(url);
      })
      .catch((e) => {
        setImage(null);
        console.log(e);
      });
  };

  useEffect(() => {
    showProfilePic();
    console.log("opened profile screen");
  }, []);

  return (
    <View>
      <View style={{ alignItems: "center" }}>
        <View style={{ flexDirection: "row", alignItems: "baseline" }}>
          <Feather name="user" size={25} color="#18c68b" />
          <Text
            style={{
              fontFamily: "Roboto-Regular",
              color: "#18c68b",
              fontSize: 25,
              letterSpacing: 1,
              paddingHorizontal: 20,
              paddingBottom: 10,
            }}
          >
            Profile
          </Text>
        </View>
      </View>
      <View>
        <View style={{ alignItems: "center", paddingVertical: 10 }}>
          {image === null ? (
            <View
              style={{
                height: 100,
                width: 100,
                backgroundColor: "#3d4542",
                borderRadius: 100,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <AntDesign name="questioncircle" size={40} color="#14181b" />
            </View>
          ) : (
            <Image source={{ uri: image }} style={styles.profilePicContainer} />
          )}
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <MaterialIcons name="email" size={24} color="#3d4542" />
        <Text style={styles.text}>{user.email}</Text>
      </View>
      <View style={{ paddingTop: 15, paddingLeft: 15 }}>
        <Text
          style={{
            fontFamily: "Roboto-Regular",
            color: "#18c68b",
            fontSize: 18,
          }}
        >
          Change profile picture
        </Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          padding: 15,
          justifyContent: "space-between",
        }}
      >
        <TouchableOpacity
          style={styles.changePictureContainer}
          onPress={() => pickImage()}
        >
          <View style={{ padding: 20 }}>
            <AntDesign name="folderopen" size={30} color="#6d897e" />
            <Text
              style={{ color: "#6d897e", paddingVertical: 20, fontSize: 18 }}
            >
              Choose from
            </Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text
                style={{ color: "#6d897e", fontSize: 18, fontWeight: "bold" }}
              >
                Storage
              </Text>
              <AntDesign name="arrowright" size={30} color="#18c68b" />
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.changePictureContainer}
          onPress={() => takeImageFromCamera()}
        >
          <View style={{ padding: 20 }}>
            <AntDesign name="camerao" size={30} color="#6d897e" />
            <Text
              style={{ color: "#6d897e", paddingVertical: 20, fontSize: 18 }}
            >
              Take from
            </Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text
                style={{ color: "#6d897e", fontSize: 18, fontWeight: "bold" }}
              >
                Camera
              </Text>
              <AntDesign name="arrowright" size={30} color="#18c68b" />
            </View>
          </View>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.logoutButtonContainer}
        onPress={() => logout()}
      >
        <View style={{ flexDirection: "row" }}>
          <Text
            style={{
              color: "#14181b",
              fontSize: 22,
              fontWeight: "bold",
              paddingEnd: 15,
            }}
          >
            Logout
          </Text>
          <MaterialIcons name="logout" size={30} color="#14181b" />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f9fafd",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  text: {
    fontSize: 20,
    color: "#3d4542",
    paddingStart: 8,
  },
  profilePicContainer: {
    height: 100,
    width: 100,
    borderRadius: 100,
  },
  changePictureContainer: {
    height: 170,
    width: "47%",
    backgroundColor: "#14181b",
    borderRadius: 10,
  },
  logoutButtonContainer: {
    backgroundColor: "#18c68b",
    height: 60,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 15,
  },
});
