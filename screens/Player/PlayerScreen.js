import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import Slider from '@react-native-community/slider';
import React, { useState, useEffect } from "react";
import PlayerButton from "./PlayerButton";

const songs = [
  {
    avatar: "https://avatar-ex-swe.nixcdn.com/song/2021/03/12/e/2/9/e/1615554946033.jpg",
    bgImage: "https://avatar-ex-swe.nixcdn.com/singer/avatar/2021/07/13/0/6/d/2/1626145766324_600.jpg",
    coverImage: "https://avatar-ex-swe.nixcdn.com/playlist/2021/05/04/3/b/6/d/1620100988545_500.jpg",
    creator: "Phúc Chinh",
    lyric: "https://lrc-nct.nixcdn.com/2021/03/22/2/8/d/4/1616360845396.lrc",
    music: "https://aredir.nixcdn.com/NhacCuaTui1012/TheLuong-PhucChinh-6971140.mp3?st=Gjvx3xDEIBRMoGsc2wLqkA&e=1631635351",
    title: "Thê Lương",
    url: "https://www.nhaccuatui.com/bai-hat/the-luong-phuc-chinh.nmxw6tXZyBQy.html"
  },
  {
    avatar: "https://avatar-ex-swe.nixcdn.com/song/2021/09/09/f/c/f/d/1631181753902.jpg",
    bgImage: "https://avatar-ex-swe.nixcdn.com/singer/avatar/2019/10/29/a/a/d/4/1572318457703_600.jpg",
    coverImage: "https://avatar-ex-swe.nixcdn.com/playlist/2021/05/04/3/b/6/d/1620100988545_500.jpg",
    creator: "Masew, Masiu, B Ray, TAP",
    lyric: "https://lrc-nct.nixcdn.com/null",
    music: "https://aredir.nixcdn.com/NhacCuaTui1021/CuoiThoi-MasewMasiuBRayTAPVietNam-7085648.mp3?st=Fdf-94PGaMjuqak7C3FJzw&e=1631635351",
    title: "Cưới Thôi",
    url: "https://www.nhaccuatui.com/bai-hat/cuoi-thoi-masew-ft-masiu-ft-b-ray-ft-tap.SQTZSysfmPRJ.html"
  },
  {
    avatar: "https://avatar-ex-swe.nixcdn.com/song/2021/08/15/a/7/9/2/1629021746388.jpg",
    bgImage: "https://avatar-ex-swe.nixcdn.com/singer/avatar/2020/08/13/a/9/8/e/1597294555540_600.jpg",
    coverImage: "https://avatar-ex-swe.nixcdn.com/playlist/2021/05/04/3/b/6/d/1620100988545_500.jpg",
    creator: "Tăng Duy Tân",
    lyric: "https://lrc-nct.nixcdn.com/2021/08/15/d/8/0/6/1629022926567.lrc",
    music: "https://aredir.nixcdn.com/Warner_Audio72/DaVu-TangDuyTan-7068051.mp3?st=Kp17_rGyQ2uLyHv7v6chDg&e=1631635351",
    title: "Dạ Vũ",
    url: "https://www.nhaccuatui.com/bai-hat/da-vu-tang-duy-tan.8Q8yLCcES92H.html"
  },
]

export default function PlayerScreen()
{
  return (
    <View style={styles.container}>
      <View style={styles.artworkWrapper}>
        <Image source={{ uri: songs[1].avatar }} style={styles.artworkImage} />
      </View>

      <View style={styles.inforBar}>
        <Text style={styles.titleInfor}>{songs[1].title}</Text>
        <Text style={styles.creatorInfor}>{songs[1].creator}</Text>
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
        <TouchableOpacity onPress={() => { }} activeOpacity={0.5}>
          <Ionicons name="play-skip-back-outline" size={45}
            color="black" style={styles.playBackForward} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => { }} activeOpacity={0.5}>
          <Ionicons name="ios-pause-circle" size={80} color="black" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => { }} activeOpacity={0.5}>
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
