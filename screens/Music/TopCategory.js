import { formatTop } from "../../helpers/extension";
import { StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";
import { List } from "react-native-paper";
import React from "react";


export default function TopCategory({ navigation })
{
    const { top_category } = useSelector(state => state.music);

    return (
        <View style={styles.container}>
            {
                top_category.length > 0 &&
                <List.AccordionGroup>
                    {
                        top_category.map((tc, idx) =>
                            <List.Accordion key={idx} id={idx + 1} title={formatTop(tc.top)}
                                left={props => <List.Icon {...props} icon="music" />}
                            >
                                {
                                    tc.category.map((ctg, idxx) => (
                                        <List.Item title={ctg} key={idxx}
                                            onPress={() => console.log(ctg)} />
                                    ))
                                }
                            </List.Accordion>
                        )
                    }
                </List.AccordionGroup>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});
