import { createNativeStackNavigator } from '@react-navigation/native-stack';
import useMusic from "../../hooks/useMusic";
import { StyleSheet } from "react-native";
import React, { useEffect } from "react";

import TopCategory from "./TopCategory";
import SearchSong from "./SearchSong";
import SongList from "./SongList";

const Stack = createNativeStackNavigator();

export default function MusicScreen()
{
  const { createMusicTable, dropMusicTable, getMusicDB, deleteAll } = useMusic();

  // useEffect(() =>
  // {
  //   const dropTable = async () => dropMusicTable();
  //   dropTable();
  // }, []);

  // useEffect(() =>
  // {
  //   const deleteDB = async () => deleteAll();
  //   deleteDB();
  // }, []);

  useEffect(() =>
  {
    const createTable = async () => createMusicTable();
    createTable();
  }, []);

  useEffect(() =>
  {
    const getDB = async () => getMusicDB();
    getDB();
  }, []);

  return (
    <Stack.Navigator initialRouteName="TopCategory">
      <Stack.Screen name="TopCategory" component={TopCategory} options={{ headerShown: false }} />
      <Stack.Screen name="SongList" component={SongList} options={{ headerShown: false }} />
      <Stack.Screen name="SearchSong" component={SearchSong} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({});
