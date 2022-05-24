import { Appbar } from 'react-native-paper';
import React, { useState } from "react";


export default function CustomHeader({ navigation, back })
{
    return (
        <Appbar.Header>
            {back ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
            <Appbar.Content title="Top 100" />
        </Appbar.Header>
    );
}