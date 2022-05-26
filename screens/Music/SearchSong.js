import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { StyleSheet, View, FlatList } from "react-native";
import { Appbar, Searchbar } from "react-native-paper";
import useMusic from "../../hooks/useMusic";
import { useSelector } from "react-redux";
import SongCard from "./SongCard";
import React from "react";

export default function SearchSong({ navigation })
{
    const { songs } = useSelector(state => state.music);
    const { Search_Song_Title, Clear_Song_Store } = useMusic();

    const renderSong = ({ item }) => <SongCard song={item} />;

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

            {
                songs.length > 0 &&
                <FlatList
                    data={songs}
                    renderItem={renderSong}
                    keyExtractor={item => item.id}
                />
            }
        </View>
    );
}

const styles = StyleSheet.create({});
