import { RecyclerListView, DataProvider, LayoutProvider } from 'recyclerlistview';
import { StyleSheet, View, Dimensions } from "react-native";
import { Appbar, Snackbar } from 'react-native-paper';
import useMusic from "../../hooks/useMusic";
import { useSelector } from "react-redux";
import SongCard from "./SongCard";
import React, { useState } from "react";

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

export default function SongList({ navigation })
{
    const [isShowSnackbar, setshowSnackbar] = useState(false);
    const showSnackbar = () => setshowSnackbar(true)
    const onDismissSnackBar = () => setshowSnackbar(false);

    const { songs, current_tc } = useSelector(state => state.music);

    const { clearSongStore } = useMusic();

    const _dataProvider = new DataProvider((r1, r2) => r1 !== r2).cloneWithRows(songs);


    const _layoutProvider = new LayoutProvider(
        (index) => _dataProvider.getDataForIndex(index),
        (type, dim) => { dim.width = SCREEN_WIDTH; dim.height = 100; })

    const isFavor = current_tc == "My favorite";

    const _rowRenderer = (type, data) =>
    {
        return <SongCard showSnackbar={showSnackbar} isFavor={isFavor} song={data} />
    };

    const handleGoBack = () =>
    {
        // Clear song ở Redux Store trước khi go back
        clearSongStore();

        if (isFavor) {
            navigation.navigate("Music", { screen: "TopCategory" })
            navigation.navigate("Profile")
        } else {
            navigation.navigate("Music", { screen: "TopCategory" })
        }
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
            <Snackbar
                duration={1000}
                visible={isShowSnackbar}
                onDismiss={onDismissSnackBar}
                action={{
                    label: 'Undo',
                    onPress: () =>
                    {
                        // Do something
                    },
                }}>
                Added to play queue
            </Snackbar>
        </View>
    );
}

const styles = StyleSheet.create({});
