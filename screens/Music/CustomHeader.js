import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { Appbar } from 'react-native-paper';
import React from "react";


export default function CustomHeader({ navigation, back })
{
    const handleSearchNavigate = () =>
    {
        navigation.navigate("SearchSong");
    };

    return (
        <Appbar.Header>
            {back ? <Appbar.BackAction color='white' onPress={navigation.goBack} /> : null}
            <Appbar.Content color='white' title="Top 100" />
            {
                !back && <Appbar.Action color='white' onPress={handleSearchNavigate}
                    icon={({ color }) => <MaterialIcons name="search" color={color} size={26} />} />
            }
        </Appbar.Header>
    );
}