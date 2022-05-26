import { StyleSheet, View, FlatList } from "react-native";
import { useSelector } from "react-redux";
import SongCard from "./SongCard";
import React from "react";

export default function SongList()
{
    const { songs } = useSelector(state => state.music);

    const renderSong = ({ item }) => <SongCard song={item} />;

    return (
        <View>
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
