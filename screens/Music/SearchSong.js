import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { Appbar, Searchbar } from "react-native-paper";
import { StyleSheet, View } from "react-native";
import SongList from "./SongList";
import React from "react";

export default function SearchSong({ navigation })
{
    const handleSearch = () =>
    {

    };

    return (
        <View>
            <Appbar.Header>
                <Searchbar
                    placeholder="Search..."
                    style={{ width: "85%", marginLeft: 10 }}
                    onChangeText={handleSearch}
                />

                <Appbar.Action
                    onPress={navigation.goBack} color="white"
                    icon={({ color }) => <MaterialIcons name="search" color={color} size={26} />}
                />
            </Appbar.Header>

            <SongList />
        </View>
    );
}

const styles = StyleSheet.create({});
