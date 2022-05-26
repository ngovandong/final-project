import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import useMusic from "../../hooks/useMusic";
import { Appbar } from 'react-native-paper';
import React from "react";


export default function CustomHeader({ navigation, back })
{
    const { Clear_Song_Store, Reload_Music } = useMusic();

    const handleReload = async () =>
    {
        await Reload_Music();
    };

    const handleSearchNavigate = () =>
    {
        navigation.navigate("SearchSong");
    };

    const handleGoBack = () =>
    {
        // Clear song ở Redux Store trước khi go back
        Clear_Song_Store();
        navigation.goBack();
    };

    return (
        <Appbar.Header>
            {
                !back && <Appbar.Action color='white' onPress={handleReload}
                    icon={({ color }) => <MaterialCommunityIcons name="reload" color={color} size={26} />} />
            }
            {back ? <Appbar.BackAction color='white' onPress={handleGoBack} /> : null}
            <Appbar.Content color='white' title="Top 100" />
            {
                !back && <Appbar.Action color='white' onPress={handleSearchNavigate}
                    icon={({ color }) => <MaterialIcons name="search" color={color} size={26} />} />
            }
        </Appbar.Header>
    );
}