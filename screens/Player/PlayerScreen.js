import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { getSongDuration } from "../../helpers/extension";
import Slider from '@react-native-community/slider';
import React, { useState, useEffect } from "react";
import { Audio } from 'expo-av';

const songs = [
    {
        avatar: "https://avatar-ex-swe.nixcdn.com/song/2017/11/01/8/9/5/4/1509504821826.jpg",
        bgImage: "https://avatar-ex-swe.nixcdn.com/singer/avatar/2020/10/28/6/b/8/9/1603867029190_600.jpg",
        coverImage: "https://avatar-ex-swe.nixcdn.com/playlist/2021/05/26/b/e/2/9/1622014505032_500.jpg",
        creator: "Ariana Grande, Nicki Minaj",
        lyric: "https://lrc-nct.nixcdn.com/2016/12/13/4/d/3/7/1481609376317.lrc",
        music: "https://aredir.nixcdn.com/Unv_Audio75/SideToSide-ArianaGrandeNickiMinaj-5319387.mp3?st=YsSOqZW2qY5Q6bjlUWmDJQ&e=1631635369",
        title: "Side To Side",
        url: "https://www.nhaccuatui.com/bai-hat/side-to-side-ariana-grande-ft-nicki-minaj.O4stLs6DzdKx.html"
    },
    {
        avatar: "https://avatar-ex-swe.nixcdn.com/song/2018/06/22/0/c/c/b/1529655970762.jpg",
        bgImage: "https://avatar-ex-swe.nixcdn.com/singer/avatar/2018/02/08/d/9/d/9/1518102796944_600.jpg",
        coverImage: "https://avatar-ex-swe.nixcdn.com/playlist/2021/05/26/b/e/2/9/1622014505032_500.jpg",
        creator: "Maroon 5",
        lyric: "https://lrc-nct.nixcdn.com/2015/02/22/5/4/8/e/1424606806135.lrc",
        music: "https://aredir.nixcdn.com/Unv_Audio73/Sugar-Maroon5-3338455.mp3?st=BvKZKnL226gGdRcbbuFD-Q&e=1631635369",
        title: "Sugar",
        url: "https://www.nhaccuatui.com/bai-hat/sugar-maroon-5.eZqJdBiX1raA.html"
    },
    {
        avatar: "https://avatar-ex-swe.nixcdn.com/song/2017/10/03/c/c/f/9/1506994069006.jpg",
        bgImage: "https://avatar-ex-swe.nixcdn.com/singer/avatar/2016/01/25/4/1/1/7/1453717591437_600.jpg",
        coverImage: "https://avatar-ex-swe.nixcdn.com/playlist/2021/05/26/b/e/2/9/1622014505032_500.jpg",
        creator: "Jessie J, Ariana Grande, Nicki Minaj",
        lyric: "https://lrc-nct.nixcdn.com/2014/09/23/c/8/b/9/1411479917710.lrc",
        music: "https://aredir.nixcdn.com/Unv_Audio21/BangBang-JessieJArianaGrandeNickiMinaj-3336065.mp3?st=_FB8qm7RCB7p5IR3ZUtAmA&e=1631635369",
        title: "Bang Bang",
        url: "https://www.nhaccuatui.com/bai-hat/bang-bang-jessie-j-ft-ariana-grande-ft-nicki-minaj.uJpUD2uosAd0.html"
    },
    {
        avatar: "https://avatar-ex-swe.nixcdn.com/song/2018/08/29/a/7/9/a/1535524424716.jpg",
        bgImage: "https://avatar-ex-swe.nixcdn.com/singer/avatar/2016/12/22/5/a/d/7/1482395179151_600.jpg",
        coverImage: "https://avatar-ex-swe.nixcdn.com/playlist/2021/05/26/b/e/2/9/1622014505032_500.jpg",
        creator: "Pitbull, Kesha",
        lyric: "https://lrc-nct.nixcdn.com/2016/03/02/3/9/8/6/1456912264370.lrc",
        music: "https://aredir.nixcdn.com/Sony_Audio46/Timber-PitbullKeha-5612609.mp3?st=CdJPIqJQnIuIMiiI_f-Khg&e=1631635369",
        title: "Timber",
        url: "https://www.nhaccuatui.com/bai-hat/timber-pitbull-ft-kesha.Wvw8GjerWgL0.html"
    },
    {
        avatar: "https://avatar-ex-swe.nixcdn.com/song/2018/01/25/5/2/d/e/1516891769034.jpg",
        bgImage: "https://avatar-ex-swe.nixcdn.com/singer/avatar/2021/06/25/5/6/f/6/1624608342223_600.jpg",
        coverImage: "https://avatar-ex-swe.nixcdn.com/playlist/2021/05/26/b/e/2/9/1622014505032_500.jpg",
        creator: "Ed Sheeran",
        lyric: "https://lrc-nct.nixcdn.com/2017/06/20/a/c/0/4/1497891884063.lrc",
        music: "https://aredir.nixcdn.com/Warner_Audio38/ShapeOfYou-EdSheeran-6443488.mp3?st=ycuZei2P_WKHl48bXVvUlA&e=1631635369",
        title: "Shape Of You",
        url: "https://www.nhaccuatui.com/bai-hat/shape-of-you-ed-sheeran.syMtBZwXwA76.html"
    },
    {
        avatar: "https://avatar-ex-swe.nixcdn.com/song/2020/08/28/9/f/d/6/1598588186805.jpg",
        bgImage: "https://avatar-ex-swe.nixcdn.com/singer/avatar/2020/06/29/0/9/e/a/1593414639316_600.jpg",
        coverImage: "https://avatar-ex-swe.nixcdn.com/playlist/2021/05/26/b/e/2/9/1622014505032_500.jpg",
        creator: "BlackPink, Selena Gomez",
        lyric: "https://lrc-nct.nixcdn.com/2020/08/28/b/3/7/1/1598589793207.lrc",
        music: "https://aredir.nixcdn.com/YG_Audio1/IceCreamWithSelenaGomez-BLACKPINK-6720101.mp3?st=gF7FNZ3dl9TEl1CGHZ8aUA&e=1631635369",
        title: "Ice Cream",
        url: "https://www.nhaccuatui.com/bai-hat/ice-cream-blackpink-ft-selena-gomez.NBhWAVSyHGyQ.html"
    },
    {
        avatar: "https://avatar-ex-swe.nixcdn.com/song/2017/10/25/f/3/a/5/1508902512730.jpg",
        bgImage: "https://avatar-ex-swe.nixcdn.com/singer/avatar/2019/03/21/0/e/3/d/1553153837657_600.jpg",
        coverImage: "https://avatar-ex-swe.nixcdn.com/playlist/2021/05/26/b/e/2/9/1622014505032_500.jpg",
        creator: "Martin Garrix, Troye Sivan",
        lyric: "https://lrc-nct.nixcdn.com/2018/02/06/a/d/e/1/1517893110265.lrc",
        music: "https://aredir.nixcdn.com/Sony_Audio36/ThereForYou-MartinGarrixTroyeSivan-5001850.mp3?st=nkPQTE5teNyyMuqaqrBANA&e=1631635369",
        title: "There For You",
        url: "https://www.nhaccuatui.com/bai-hat/there-for-you-martin-garrix-ft-troye-sivan.mnSGeFl39YSp.html"
    }
]

export default function PlayerScreen()
{
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
                uri: songs[currentIndex].music
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
                currentIndex = songs.length - 1;
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
            if (currentIndex === songs.length - 1)
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
                    source={{ uri: songs[player.currentIndex].avatar }}
                    style={styles.artworkImage}
                />
            </View>

            <View style={styles.inforBar}>
                <Text style={styles.titleInfor}>
                    {songs[player.currentIndex].title}
                </Text>
                <Text style={styles.creatorInfor}>
                    {songs[player.currentIndex].creator}
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
