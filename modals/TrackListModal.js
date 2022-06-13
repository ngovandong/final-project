import { RecyclerListView, DataProvider, LayoutProvider } from 'recyclerlistview';
import { Paragraph, Dialog, Portal } from "react-native-paper";
import { StyleSheet, Dimensions } from "react-native";
import * as React from "react";

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

export default function TrackListModal({ trackList, visible, hideDialog })
{
    const _dataProvider = new DataProvider((r1, r2) => r1 !== r2).cloneWithRows(trackList);

    const _layoutProvider = new LayoutProvider(
        (index) => _dataProvider.getDataForIndex(index),
        (type, dim) => { dim.width = SCREEN_WIDTH - 50; dim.height = 50; })

    const _rowRenderer = (type, data) =>
    {
        return <Paragraph>{data.title}</Paragraph>
    };

    return (
        <Portal>
            <Dialog visible={visible} onDismiss={hideDialog}
                style={styles.trackListDialog}>
                <Dialog.Title>Track List</Dialog.Title>
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

const styles = StyleSheet.create({
    trackListDialog: {
        height: 500
    }
});
