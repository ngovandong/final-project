import { StyleSheet, Text, View, StatusBar, Dimensions, Image } from "react-native";
import Slider from '@react-native-community/slider';
import PlayerButton from "./PlayerButton";
import React, { useState } from "react";

const { width } = Dimensions.get('window');

export default function PlayerScreen()
{
  return (
    <View style={styles.container}>
      <View style={styles.audioCountContainer}>
        <View style={{ flexDirection: 'row' }}>
          {/* {context.isPlayListRunning && (
            <>
              <Text style={{ fontWeight: 'bold' }}>From Playlist: </Text>
              <Text>{context.activePlayList.title}</Text>
            </>
          )} */}
          <Text>ahihi</Text>
        </View>
        <Text style={styles.audioCount}>
          {/* {`${context.currentAudioIndex + 1} / ${context.totalAudioCount}`} */}
          123
        </Text>
      </View>
      <View style={styles.midBannerContainer}>
        <Image style={styles.bannerImage} source={{ uri: "https://avatar-ex-swe.nixcdn.com/song/2021/09/09/f/c/f/d/1631181753902.jpg" }} />
      </View>
      <View style={styles.audioPlayerContainer}>
        <Text numberOfLines={1} style={styles.audioTitle}>
          {/* {context.currentAudio.filename} */}
          Em la nhat
        </Text>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 15,
          }}
        >
          <Text>
            {/* {convertTime(context.currentAudio.duration)} */}
            01.00
          </Text>
          <Text>
            {/* {currentPosition ? currentPosition : renderCurrentTime()} */}
            10
          </Text>
        </View>

        <Slider
          style={{ width: width, height: 40 }}
          minimumValue={0}
          maximumValue={1}
          minimumTrackTintColor={"#636363"}
          maximumTrackTintColor={"#5252ad"}
        />

        {/* <Slider
          style={{ width: width, height: 40 }}
          minimumValue={0}
          maximumValue={1}
          value={calculateSeebBar()}
          minimumTrackTintColor={"#636363"}
          maximumTrackTintColor={"#5252ad"}
          onValueChange={value =>
          {
            setCurrentPosition(
              convertTime(value * context.currentAudio.duration)
            );
          }}
          onSlidingStart={async () =>
          {
            if (!context.isPlaying) return;

            try
            {
              await pause(context.playbackObj);
            } catch (error)
            {
              console.log('error inside onSlidingStart callback', error);
            }
          }}
          onSlidingComplete={async value =>
          {
            await moveAudio(context, value);
            setCurrentPosition(0);
          }}
        /> */}

        <View style={styles.audioControllers}>
          {/* <PlayerButton iconType='PREV' onPress={handlePrevious} />
          <PlayerButton
            onPress={handlePlayPause}
            style={{ marginHorizontal: 25 }}
            iconType={context.isPlaying ? 'PLAY' : 'PAUSE'}
          />
          <PlayerButton iconType='NEXT' onPress={handleNext} /> */}

          <PlayerButton iconType='PREV' onPress={() => { }} />
          <PlayerButton
            onPress={() => { }}
            style={{ marginHorizontal: 25 }}
            iconType={'PLAY'}
          />
          <PlayerButton iconType='NEXT' onPress={() => { }} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 10,
    paddingTop: StatusBar.currentHeight,
  },
  audioControllers: {
    width,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 20,
  },
  audioCountContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  audioCount: {
    textAlign: 'right',
    color: "#b6b8b9",
    fontSize: 14,
  },
  midBannerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bannerImage: {
    width: 300,
    height: 300,
    borderRadius: 300
  },
  audioTitle: {
    fontSize: 16,
    color: "#303d49",
    padding: 15,
  },
});
