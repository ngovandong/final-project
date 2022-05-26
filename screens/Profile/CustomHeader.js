import { Appbar } from 'react-native-paper';
import React from "react";


export default function CustomHeader({ navigation, back })
{
    const handleGoBack = () =>
    {
        navigation.goBack();
    };

    return (
        <Appbar.Header>
            {back ? <Appbar.BackAction color='white' onPress={handleGoBack} /> : null}
            <Appbar.Content color='white' title="Login" />
        </Appbar.Header>
    );
}