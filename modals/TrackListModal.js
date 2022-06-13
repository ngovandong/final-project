import { StyleSheet, Dimensions, TouchableOpacity, View, Image, Text } from "react-native";
import { RecyclerListView, DataProvider, LayoutProvider } from 'recyclerlistview';
import { Dialog, Portal } from "react-native-paper";
import React from "react";

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

function TrackListModal({ trackList, visible, hideDialog })
{
    const _dataProvider = new DataProvider((r1, r2) => r1 !== r2).cloneWithRows(trackList);

    const _layoutProvider = new LayoutProvider(
        (index) => _dataProvider.getDataForIndex(index),
        (type, dim) => { dim.width = SCREEN_WIDTH; dim.height = 80; })

    const _rowRenderer = (type, data) =>
    {
        return <TouchableOpacity style={styles.songCard} activeOpacity={0.5}
            onPress={() => { }}>
            <View style={styles.imgBox}>
                <Image style={styles.avatarIMG} source={{ uri: data.avatar }} />
            </View>
            <View style={styles.inforBox}>
                <Text style={styles.songTitle}>{data.title}</Text>
                <Text style={styles.songCreator}>{data.creator}</Text>
            </View>
        </TouchableOpacity>
    };

    return (
        <Portal>
            <Dialog visible={visible} onDismiss={hideDialog}
                style={styles.trackListDialog}>
                <Dialog.Title>
                    <Text>Track List</Text>
                </Dialog.Title>
                <Dialog.ScrollArea>
                    <RecyclerListView
                        style={{ height: SCREEN_HEIGHT - 150 }}
                        rowRenderer={_rowRenderer}
                        dataProvider={_dataProvider}
                        layoutProvider={_layoutProvider}
                    />
                </Dialog.ScrollArea>
            </Dialog>
        </Portal>
    );
}

export default React.memo(TrackListModal);

const styles = StyleSheet.create({
    trackListDialog: {
        height: 500,
        borderRadius: 15
    },
    // Card
    songCard: {
        borderWidth: 1,
        flexDirection: "row",
        borderColor: "#dedede",
        margin: 5,
        padding: 10,
        borderRadius: 5,
    },

    imgBox: {
        flex: 1
    },
    avatarIMG: {
        width: 50,
        height: 50,
        borderRadius: 5
    },

    inforBox: {
        flex: 4,
        marginLeft: 15,
        alignSelf: "center"
    },
    songTitle: {
        fontSize: 18
    },
    songCreator: {
        fontSize: 12,
        color: "#959596"
    }
});
