import AntDesign from "react-native-vector-icons/AntDesign";
import { StyleSheet } from "react-native";
import React from "react";

export default function PlayerButton(props)
{
    const { iconType, size = 40, iconColor = "#303d49", onPress } = props;

    const getIconName = (type) =>
    {
        switch (type)
        {
            case 'PLAY':
                return 'pausecircle';
            case 'PAUSE':
                return 'playcircleo';
            case 'NEXT':
                return 'forward';
            case 'PREV':
                return 'banckward';
        }
    };
    return (
        <AntDesign
            {...props}
            onPress={onPress}
            name={getIconName(iconType)}
            size={size}
            color={iconColor}
        />
    );
}

const styles = StyleSheet.create({
});
