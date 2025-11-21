import { Image } from "expo-image";
import React from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { horizontalScale, moderateScale, verticalScale } from "../utils/scaling";
import { Settings } from "./colorpicker";

const editIcon = require("../../assets/images/edit.png");
const settings = require("../../assets/images/settings.png");
const transfer = require("../../assets/images/transfer.png");
const ProfileScreen = () => {
  const data = [
    {id:1, settings, Label: "Settings", transfer},
    {id:2, settings, Label: "History", transfer},
    {id:3, settings, Label: "About", transfer},
    {id:4, settings, Label: "Log Out", transfer},


  ]
  return (
    <SafeAreaView style={styles.container}>
    <View style={{...styles.container, paddingHorizontal: moderateScale(20)}}>

      {/*4:22 arrow back display*/ }

      {/*link to dev page button*/ }
          {/*color picker page as profile imge*/ }
          <Text style={styles.title}>{"Profile"}</Text>
          <View style={styles.profilecontainer}>
            <View style={styles.profileview}>
              <View style={styles.profileviewtwo}>
                <View>
                  <Image
                  style ={styles.profileimage}
                  source={Settings.selectedColor}></Image>
                  <TouchableOpacity style={styles.editImagebtn}
                  onPress={() => {
                    /* Navigate to color picker page */
                    Alert.alert('Edit Profile Image', 'Navigate to color picker page');
                  }}>

                    <Image source={editIcon} ></Image>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View>
              <Text style={styles.usertext}>{Settings.displayName}</Text>
              <Text style={styles.usertext}>{"1234567890"}</Text>
              <Text style={styles.usertext}>{"ssdfiua@gmail.com"}</Text>
            </View>

          </View>
    </View>
    </SafeAreaView>
  );
}

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: moderateScale(16),
    fontWeight: 'bold',
    //color: '#360479',
    textAlign: 'center',
    marginTop: 12,
  },
  profilecontainer: {
    alignItems: 'center',
    marginTop: verticalScale(20),

  },
  profileview: {
    width: moderateScale(150),
    height: moderateScale(150),
    borderRadius: 100,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileviewtwo: {
    width: moderateScale(130),
    height:moderateScale(130),
    borderRadius: 100,
    borderWidth: 1,
  },
  profileimage: {
    width:moderateScale(100),
    height: moderateScale(100),
    alignItems: 'center',
    justifyContent: 'center',
  },
  editImagebtn: {
    position: 'absolute',
    bottom: moderateScale(6),
    right: moderateScale(6),
    width: moderateScale(22),
    height: moderateScale(22),
  },
  usertext: {
    fontSize: horizontalScale(14),
    fontWeight: '400',
    color: "black",
    textAlign: 'center',
    marginTop: moderateScale(16),
  },
});
