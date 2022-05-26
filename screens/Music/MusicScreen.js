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
  const { Create_Table, Drop_Table, Get_Music_DB, Delete_All } = useMusic();

  // useEffect(() =>
  // {
  //   const drop_table = async () => Drop_Table();
  //   drop_table();
  // }, []);

  // useEffect(() =>
  // {
  //   const delete_all = async () => Delete_All();
  //   delete_all();
  // }, []);

  useEffect(() =>
  {
    const create_table = async () => Create_Table();
    create_table();
  }, []);

  useEffect(() =>
  {
    const get_db = async () => Get_Music_DB();
    get_db();
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
