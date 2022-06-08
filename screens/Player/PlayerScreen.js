import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import Slider from '@react-native-community/slider';
import React, { useState, useEffect } from "react";
import { Audio } from 'expo-av'

const songs = [
    {
        avatar: "https://avatar-ex-swe.nixcdn.com/song/2021/03/12/e/2/9/e/1615554946033.jpg",
        creator: "Phúc Chinh",
        music: "https://aredir.nixcdn.com/NhacCuaTui1012/TheLuong-PhucChinh-6971140.mp3?st=Gjvx3xDEIBRMoGsc2wLqkA&e=1631635351",
        title: "Thê Lương",
    },
    {
        avatar: "https://avatar-ex-swe.nixcdn.com/song/2021/09/09/f/c/f/d/1631181753902.jpg",
        creator: "Masew, Masiu, B Ray, TAP",
        music: "https://aredir.nixcdn.com/NhacCuaTui1021/CuoiThoi-MasewMasiuBRayTAPVietNam-7085648.mp3?st=Fdf-94PGaMjuqak7C3FJzw&e=1631635351",
        title: "Cưới Thôi"
    },
    {
        avatar: "https://avatar-ex-swe.nixcdn.com/song/2021/08/15/a/7/9/2/1629021746388.jpg",
        creator: "Tăng Duy Tân",
        music: "https://aredir.nixcdn.com/Warner_Audio72/DaVu-TangDuyTan-7068051.mp3?st=Kp17_rGyQ2uLyHv7v6chDg&e=1631635351",
        title: "Dạ Vũ",
    },
]

export default function PlayerScreen()
{
    const [player, setPlayer] = useState({
        isPlaying: false,
        playbackInstance: null,
        currentIndex: 0,
        volume: 1.0,
        isBuffering: true
    });

    useEffect(() =>
    {
        setupPlayer();
    }, []);

    const setupPlayer = async () =>
    {
        try
        {
            await Audio.setAudioModeAsync({
                allowsRecordingIOS: false,
                playsInSilentModeIOS: true,
                shouldDuckAndroid: true,
                staysActiveInBackground: true,
                playThroughEarpieceAndroid: true
            });
            loadAudio(player.currentIndex);
        }
        catch (e)
        {
            console.log(e);
        }
    };

    const loadAudio = async (currentIndex) =>
    {
        let { isPlaying, volume } = player;
        console.log("Current Index : ", currentIndex);
        try
        {
            let playbackInstance = new Audio.Sound();
            const source = {
                uri: songs[currentIndex].music
            };

            const status = {
                shouldPlay: isPlaying,
                volume: volume
            };

            playbackInstance.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);
            await playbackInstance.loadAsync(source, status, false);

            setPlayer(player => ({
                ...player,
                playbackInstance
            }));
        }
        catch (e)
        {
            console.log(e)
        }
    };

    const onPlaybackStatusUpdate = (status) =>
    {
        setPlayer(player => ({
            ...player,
            isBuffering: status.isBuffering
        }));
    }

    const handlePlayPause = async () =>
    {

        let { isPlaying, playbackInstance } = player;
        if (isPlaying)
            await playbackInstance.pauseAsync();
        else
            await playbackInstance.playAsync();
        setPlayer(player => ({
            ...player,
            isPlaying: !isPlaying
        }));
    };

    const handlePreviousPlay = async () =>
    {
        let { playbackInstance, currentIndex } = player;
        if (playbackInstance)
        {
            await playbackInstance.unloadAsync();
            let currentIndex = player.currentIndex;
            if (currentIndex === 0)
                currentIndex = songs.length - 1;
            else
                currentIndex -= 1;
            setPlayer(player => ({
                ...player,
                currentIndex
            }));
            loadAudio(currentIndex);
        }
    };

    const handleNextPlay = async () =>
    {
        let { playbackInstance, currentIndex } = player;
        if (playbackInstance)
        {
            await playbackInstance.unloadAsync();
            let currentIndex = player.currentIndex;
            if (currentIndex === songs.length - 1)
                currentIndex = 0;
            else
                currentIndex += 1;
            setPlayer(player => ({
                ...player,
                currentIndex
            }));
            loadAudio(currentIndex);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.artworkWrapper}>
                <Image source={{ uri: songs[player.currentIndex].avatar }} style={styles.artworkImage} />
            </View>

            <View style={styles.inforBar}>
                <Text style={styles.titleInfor}>{songs[player.currentIndex].title}</Text>
                <Text style={styles.creatorInfor}>{songs[player.currentIndex].creator}</Text>
            </View>

            <View style={styles.progressSliderBar}>
                <Slider
                    style={styles.progressSlider}
                    value={10}
                    minimumValue={0}
                    maximumValue={100}
                    thumbTintColor="#2ea9ed"
                    minimumTrackTintColor="#2ea9ed"
                    maximumTrackTintColor="black"
                    onSlidingComplete={() => { }}
                />
            </View>

            <View style={styles.progressLabel}>
                <Text style={styles.progressLabelText}>0:00</Text>
                <Text style={styles.progressLabelText}>5:61</Text>
            </View>

            <View style={styles.musicController}>
                <TouchableOpacity onPress={handlePreviousPlay} activeOpacity={0.5}>
                    <Ionicons name="play-skip-back-outline" size={45}
                        color="black" style={styles.playBackForward} />
                </TouchableOpacity>

                <TouchableOpacity onPress={handlePlayPause} activeOpacity={0.5}>
                    <Ionicons name={player.isPlaying ? "ios-pause-circle" : "ios-play-circle"}
                        size={80} color="black" />
                </TouchableOpacity>

                <TouchableOpacity onPress={handleNextPlay} activeOpacity={0.5}>
                    <Ionicons name="play-skip-forward-outline" size={45}
                        color="black" style={styles.playBackForward} />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    /*-------ARTWORK------*/
    artworkWrapper: {
        width: 260,
        height: 300,
        marginBottom: 20,
        marginTop: 25,
        // iOS
        shadowColor: "#949996",
        shadowOffset: {
            width: 5,
            height: 5
        },
        shadowOpacity: 0.5,
        shadowRadius: 3.84,
        // Android
        elevation: 5
    },
    artworkImage: {
        width: "100%",
        height: "100%",
        borderRadius: 15
    },
    /*-------INFOR------*/
    inforBar: {
        marginTop: 10
    },
    titleInfor: {
        fontSize: 20,
        fontWeight: "800",
        textAlign: "center",
        color: "black"
    },
    creatorInfor: {
        fontSize: 16,
        fontWeight: "300",
        textAlign: "center",
        color: "black"
    },
    /*-------SLIDER------*/
    progressSlider: {
        width: 320,
        height: 40,
        marginTop: 25,
        flexDirection: "row"
    },
    /*-------TIMER------*/
    progressLabel: {
        width: 320,
        flexDirection: "row",
        justifyContent: "space-between"
    },
    progressLabelText: {
        color: "black"
    },
    /*-------CONTROLLER------*/
    musicController: {
        flexDirection: "row",
        width: "60%",
        justifyContent: "space-between",
        marginTop: 15
    },
    playBackForward: {
        marginTop: 20
    }
});
