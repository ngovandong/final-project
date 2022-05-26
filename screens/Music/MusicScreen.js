import { createNativeStackNavigator } from '@react-navigation/native-stack';
import useMusic from "../../hooks/useMusic";
import { StyleSheet } from "react-native";
import React, { useEffect } from "react";

import CustomHeader from './CustomHeader';
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
    <Stack.Navigator initialRouteName="TopCategory" screenOptions={{ header: CustomHeader }}>
      <Stack.Screen name="TopCategory" component={TopCategory} />
      <Stack.Screen name="SongList" component={SongList} />
      <Stack.Screen name="SearchSong" component={SearchSong} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({});
