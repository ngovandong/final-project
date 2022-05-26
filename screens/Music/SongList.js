import { StyleSheet, View, FlatList } from "react-native";
import { Appbar } from 'react-native-paper';
import useMusic from "../../hooks/useMusic";
import { useSelector } from "react-redux";
import SongCard from "./SongCard";
import React from "react";

export default function SongList({ navigation })
{
    const { songs, current_tc } = useSelector(state => state.music);
    const { Clear_Song_Store } = useMusic();

    const renderSong = ({ item }) => <SongCard song={item} />;

    const handleGoBack = () =>
    {
        // Clear song ở Redux Store trước khi go back
        Clear_Song_Store();
        navigation.goBack();
    };

    return (
        <View>
            <Appbar.Header>
                <Appbar.BackAction color='white' onPress={handleGoBack} />
                <Appbar.Content color='white' title={current_tc} />
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
