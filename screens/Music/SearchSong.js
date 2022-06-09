import { RecyclerListView, DataProvider, LayoutProvider } from 'recyclerlistview';
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { StyleSheet, View, Dimensions } from "react-native";
import { Appbar, Searchbar } from "react-native-paper";
import useMusic from "../../hooks/useMusic";
import { useSelector } from "react-redux";
import SongCard from "./SongCard";
import React from "react";

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

export default function SearchSong({ navigation })
{
    const { songs } = useSelector(state => state.music);
    const { searchSongTitle, clearSongStore } = useMusic();

    const _dataProvider = new DataProvider((r1, r2) => r1 !== r2).cloneWithRows(songs);

    const _layoutProvider = new LayoutProvider(
        (index) => _dataProvider.getDataForIndex(index),
        (type, dim) => { dim.width = SCREEN_WIDTH; dim.height = 100; })

    const _rowRenderer = (type, data) =>
    {
        return <SongCard song={data} />
    };

    const handleSearch = (query) =>
    {
        // Nếu không có thông tin thì song state không chứa gì cả
        if (query.length == 0)
            clearSongStore();
        else
            searchSongTitle(query);
    };

    const handleGoBack = () =>
    {
        // Clear song ở Redux Store trước khi go back
        clearSongStore();
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
                <RecyclerListView
                    style={{ height: SCREEN_HEIGHT - 150 }}
                    rowRenderer={_rowRenderer}
                    dataProvider={_dataProvider}
                    layoutProvider={_layoutProvider}
                />
            }
        </View>
    );
}

const styles = StyleSheet.create({});
