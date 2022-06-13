import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { getSongDuration } from "../../helpers/extension";
import Slider from '@react-native-community/slider';
import React, { useState, useEffect } from "react";
import usePlayer from "../../hooks/usePlayer";
import { useSelector } from "react-redux";
import { Audio } from 'expo-av';

export default function PlayerScreen()
{
    const { trackList } = useSelector(state => state.player);
    const { shuffleTrackList } = usePlayer();
    /*
    isPlaying : đang phát nhạc hay không ?
    playbackInstance : đối tượng phát nhạc được tạo ra từ expo-av
    currentIndex : chỉ mục của bài hát hiện tại trong Mảng bài hát
    volume : âm lượng 
    isBuffering : đang phát nhạc hay không ????
    playbackPosition : thời gian mà bài hát đã phát 
    playbackDuration : tổng thời gian của bài hát
    */
    const [player, setPlayer] = useState({
        isPlaying: false,
        playbackInstance: null,
        currentIndex: 0,
        volume: 1.0,
        isBuffering: true,
        playbackPosition: 0,
        playbackDuration: 10
    });

    useEffect(() =>
    {
        // Thiết lập Player
        setupPlayer();
    }, []);

    useEffect(() =>
    {
        // Effect tự động chuyển bài khi bài hiện tại kết thúc
        // Vì playbackPosition không thể bằng playbackDuration (thư viện củ chuối)
        // Nên ta chỉ cần lấy tỉ lệ > 0.99 là được
        const autoNextSong = async () =>
        {
            if (player.playbackPosition !== undefined &&
                player.playbackDuration !== undefined &&
                player.playbackPosition / player.playbackDuration > 0.99)
                await handleNextPlay();
        }
        autoNextSong();
    }, [player.playbackPosition, player.playbackDuration]);

    const setupPlayer = async () =>
    {
        // Hàm setup expo-av player
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
        // Hàm làm mới trình phát nhạc
        let { isPlaying, volume } = player;
        try
        {
            // Khởi tạo đối tượng phát nhạc mới
            let playbackInstance = new Audio.Sound();
            // Url bài hát
            const source = {
                uri: trackList[currentIndex].music
            };
            // Trạng thái phát nhạc
            const status = {
                shouldPlay: isPlaying,
                volume: volume
            };
            // Callback sẽ chạy khi bài hát đang được phát
            playbackInstance.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);
            // Load đối tượng phát nhạc
            await playbackInstance.loadAsync(source, status, false);
            // Lưu vào state
            setPlayer(player => ({
                ...player,
                playbackInstance
            }));
        }
        catch (e)
        {
            console.log(e);
        }
    };

    const onPlaybackStatusUpdate = (status) =>
    {
        // Hàm cập nhật state khi nhạc được phát
        // Cập nhật lại playbackPosition là thời gian bài hát đã được phát
        setPlayer(player => ({
            ...player,
            isBuffering: status.isBuffering,
            playbackPosition: status.positionMillis,
            playbackDuration: status.durationMillis
        }));
    };

    const handlePlayPause = async () =>
    {
        // Hàm play/pause bài hát
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
        // Hàm chuyển về bài trước đó, nếu đang là bài đầu tiên thì chuyển về bài cuối cùng
        let { playbackInstance } = player;
        if (playbackInstance)
        {
            await playbackInstance.unloadAsync();
            let currentIndex = player.currentIndex;
            if (currentIndex === 0)
                currentIndex = trackList.length - 1;
            else
                currentIndex -= 1;
            setPlayer(player => ({
                ...player,
                currentIndex
            }));
            // Do state chưa kịp update currentIndex mới nên hàm loadAudio
            // cần tự truyền vào currentIndex chứ không thể tự lấy ra từ state
            loadAudio(currentIndex);
        }
    };

    const handleNextPlay = async () =>
    {
        // Hàm chuyển đến bài tiếp theo, nếu đang là bài cuối thì chuyển về bài đầu tiên
        let { playbackInstance } = player;
        if (playbackInstance)
        {
            await playbackInstance.unloadAsync();
            let currentIndex = player.currentIndex;
            if (currentIndex === trackList.length - 1)
                currentIndex = 0;
            else
                currentIndex += 1;
            setPlayer(player => ({
                ...player,
                currentIndex
            }));
            // Do state chưa kịp update currentIndex mới nên hàm loadAudio
            // cần tự truyền vào currentIndex chứ không thể tự lấy ra từ state
            loadAudio(currentIndex);
        }
    };

    const moveAudio = async (value) =>
    {
        // Hàm thay đổi vị trí nhạc (kéo Slider)
        // value là giá trị (tỉ lệ) hiện tại của Slider (0<value<1)
        // nên cần nhân với PlaybackDuration để ra khoảng thời gian mới
        let { playbackInstance } = player;
        if (playbackInstance)
        {
            const newPlaybackPosition = Math.floor(player.playbackDuration * value);
            await playbackInstance.setPositionAsync(newPlaybackPosition);
        };
    };

    const calculateSeebBar = () =>
    {
        // Hàm tính toán tỉ lệ thơi gian hiện tại để cập nhật cho Slider
        const { playbackPosition, playbackDuration } = player;
        if (playbackPosition !== undefined && playbackDuration !== undefined)
        {
            return playbackPosition / playbackDuration;
        }
        return 0;
    };

    return (
        <View style={styles.container}>
            <View style={styles.artworkWrapper}>
                <Image
                    source={{ uri: trackList[player.currentIndex].avatar }}
                    style={styles.artworkImage}
                />
            </View>

            <View style={styles.inforBar}>
                <Text style={styles.titleInfor}>
                    {trackList[player.currentIndex].title}
                </Text>
                <Text style={styles.creatorInfor}>
                    {trackList[player.currentIndex].creator}
                </Text>
            </View>

            <View style={styles.progressSliderBar}>
                <Slider
                    style={styles.progressSlider}
                    value={calculateSeebBar()}
                    minimumValue={0}
                    maximumValue={1}
                    thumbTintColor="#2ea9ed"
                    minimumTrackTintColor="#2ea9ed"
                    maximumTrackTintColor="black"
                    onSlidingComplete={async (value) => await moveAudio(value)}
                />
            </View>

            <View style={styles.progressLabel}>
                <Text style={styles.progressLabelText}>
                    {getSongDuration(player.playbackPosition)}
                </Text>
                <Text style={styles.progressLabelText}>
                    {getSongDuration(player.playbackDuration)}
                </Text>
            </View>

            <View style={styles.musicController}>
                <TouchableOpacity onPress={shuffleTrackList} activeOpacity={0.5}>
                    <Ionicons name="shuffle" size={25}
                        color="black" style={styles.shufflePlay} />
                </TouchableOpacity>

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

                <TouchableOpacity onPress={() => { }} activeOpacity={0.5}>
                    <Ionicons name="musical-notes" size={25}
                        color="black" style={styles.trackQueue} />
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
        marginTop: 10,
        width: "85%"
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
        width: "75%",
        justifyContent: "space-between",
        marginTop: 15
    },
    playBackForward: {
        marginTop: 20
    },
    shufflePlay: {
        marginTop: 30
    },
    trackQueue: {
        marginTop: 30
    }
});
