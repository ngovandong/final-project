import { RecyclerListView, DataProvider, LayoutProvider } from 'recyclerlistview';
import { StyleSheet, View, Dimensions } from "react-native";
import { Appbar } from 'react-native-paper';
import useMusic from "../../hooks/useMusic";
import { useSelector } from "react-redux";
import SongCard from "./SongCard";
import React from "react";

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

export default function SongList({ navigation })
{
    const { songs, current_tc } = useSelector(state => state.music);

    const { clearSongStore } = useMusic();

    const _dataProvider = new DataProvider((r1, r2) => r1 !== r2).cloneWithRows(songs);

    const _layoutProvider = new LayoutProvider(
        (index) => _dataProvider.getDataForIndex(index),
        (type, dim) => { dim.width = SCREEN_WIDTH; dim.height = 100; })

    const _rowRenderer = (type, data) =>
    {
        return <SongCard song={data} />
    };

    const handleGoBack = () =>
    {
        // Clear song ở Redux Store trước khi go back
        clearSongStore();
        navigation.navigate("Music", { screen: "TopCategory" })
    };

    return (
        <View>
            <Appbar.Header>
                <Appbar.BackAction color='white' onPress={handleGoBack} />
                <Appbar.Content color='white' title={current_tc} />
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
