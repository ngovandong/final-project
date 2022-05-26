import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { Appbar, Searchbar } from "react-native-paper";
import { StyleSheet, View } from "react-native";
import useMusic from "../../hooks/useMusic";
import SongList from "./SongList";
import React from "react";

export default function SearchSong({ navigation })
{
    const { Search_Song_Title, Clear_Song_Store } = useMusic();

    const handleSearch = (query) =>
    {
        // Nếu không có thông tin thì song state không chứa gì cả
        if (query.length == 0)
            Clear_Song_Store();
        else
            Search_Song_Title(query);
    };

    const handleGoBack = () =>
    {
        // Clear song ở Redux Store trước khi go back
        Clear_Song_Store();
        navigation.goBack();
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
                    onPress={handleGoBack} color="white"
                    icon={({ color }) => <MaterialIcons name="search" color={color} size={26} />}
                />
            </Appbar.Header>

            <SongList />
        </View>
    );
}

const styles = StyleSheet.create({});
