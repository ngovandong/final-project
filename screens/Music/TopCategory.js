import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { formatTop } from "../../helpers/extension";
import { StyleSheet, View } from "react-native";
import Loading from "../../components/Loading";
import { Appbar } from 'react-native-paper';
import useMusic from "../../hooks/useMusic";
import { useSelector } from "react-redux";
import { List } from "react-native-paper";
import React from "react";


export default function TopCategory({ navigation })
{
    const { top_category, isLoading } = useSelector(state => state.music);
    const { Filter_Song_Top_Category, Reload_Music } = useMusic();

    const handleSelectCategory = async (top, category) =>
    {
        await Filter_Song_Top_Category(top, category);
        navigation.navigate("SongList");
    };

    const handleReload = async () =>
    {
        await Reload_Music();
    };

    const handleSearchNavigate = () =>
    {
        navigation.navigate("SearchSong");
    };

    return (
        <View style={styles.container}>
            <Appbar.Header>
                <Appbar.Action color='white' onPress={handleReload}
                    icon={({ color }) => <MaterialCommunityIcons name="reload" color={color} size={26} />} />
                <Appbar.Content color='white' title="Top 100" />
                <Appbar.Action color='white' onPress={handleSearchNavigate}
                    icon={({ color }) => <MaterialIcons name="search" color={color} size={26} />} />
            </Appbar.Header>

            {
                !isLoading
                    ?
                    top_category.length > 0 &&
                    <List.AccordionGroup>
                        {
                            top_category.map((tc, idx) =>
                                <List.Accordion
                                    key={idx} id={idx + 1}
                                    title={formatTop(tc.top)}
                                    left={props => <List.Icon {...props} icon="music" />}
                                >
                                    {
                                        tc.category.map((ctg, idxx) => (
                                            <List.Item
                                                title={ctg} key={idxx}
                                                onPress={() => handleSelectCategory(tc.top, ctg)}
                                            />
                                        ))
                                    }
                                </List.Accordion>
                            )
                        }
                    </List.AccordionGroup>
                    :
                    <View style={styles.loadingIndicator} >
                        <Loading />
                    </View>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    loadingIndicator: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
});
