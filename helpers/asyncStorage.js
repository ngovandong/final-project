import AsyncStorage from "@react-native-async-storage/async-storage";

export const storeTrackList = async (trackList) =>
{
    await AsyncStorage.setItem(
        "track-list",
        JSON.stringify(trackList)
    );
};

export const restoreTrackList = async () =>
{
    const trackList = await AsyncStorage.getItem("track-list");
    return JSON.parse(trackList);
};