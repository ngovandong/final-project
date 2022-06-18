import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { useFirebase } from "../../hooks/useFirebase";
import { IconButton } from "react-native-paper";
import useMusic from "../../hooks/useMusic";
import usePlayer from "../../hooks/usePlayer";

export default function SongCard({ song, isFavor, showSnackbar })
{
    const { addSongToFavorite, removeSongFromFavorite, getListFavorite } = useFirebase();
    const handleDelete = (music) =>
    {
        removeSongFromFavorite(music)
    }
    const { addTrackToPlayer } = usePlayer();

    return (
        <TouchableOpacity style={styles.songCard} activeOpacity={0.5}
            onPress={() =>
            {
                addTrackToPlayer(song)
                showSnackbar()
            }}
            onLongPress={() => { addSongToFavorite(song) }}>
            <View style={styles.imgBox}>
                <Image style={styles.avatarIMG} source={{ uri: song.avatar }} />
            </View>

            <View style={styles.inforBox}>
                <Text style={styles.songTitle}>{song.title}</Text>
                <Text style={styles.songCreator}>{song.creator}</Text>
            </View>
            {isFavor && <View style={styles.btnContainer}>
                <IconButton
                    icon="delete"
                    size={20}
                    onPress={() => handleDelete(song.music)}
                />
            </View>}
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    songCard: {
        borderWidth: 1,
        flexDirection: "row",
        borderColor: "#dedede",
        margin: 5,
        marginLeft: 15,
        marginRight: 15,
        padding: 10,
        borderRadius: 5,
        // Android
        elevation: 2,
        // iOS
        shadowColor: 'rgba(0,0,0, .4)',
        shadowOffset: { height: 1, width: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
    },

    imgBox: {
        flex: 1
    },
    avatarIMG: {
        width: 70,
        height: 70,
        borderRadius: 5
    },

    inforBox: {
        flex: 4,
        marginLeft: 30,
        alignSelf: "center"
    },
    songTitle: {
        fontSize: 19
    },
    songCreator: {
        fontSize: 15,
        color: "#959596"
    },
    btnContainer: {
        flex: 1,
        justifyContent: 'center'
    }
});
