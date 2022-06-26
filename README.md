# Music App - Top 100 NCT
*Ứng dụng nghe nhạc  dựa trên top  100  bài hát  hay nhất trên  trang Nhạc Của Tui*

*[Source](https://github.com/ngovandong/final-project)*

![N|Solid](https://nordiccoder.com/app/uploads/2018/10/react-native.png)
## Thành viên thực hiện
- Trương Minh Phước - 102190283 - 19Nh11
- Ngô Văn Đông - 102190107 - 19Nh15

## Phân công nhiệm vụ
- Phước : trang Music và trang Player (API, SQLite3)
- Đông : trang You (Firebase)

## Chức năng

- Đăng ký, đăng nhập, đăng xuất
- Xem top 100 bài hát theo từng thể loại
- Tìm kiếm bài hát
- Thêm, xóa, xáo trộn các bài hát trong hàng đợi
- Phát các bài hát trong hàng đợi
- Thêm, xóa bài hát trong danh sách yêu thích



## Công nghệ

Music app - top 100 NCT sử dụng khá nhiều công nghệ:

- [React Native](https://reactnative.dev/) 
- [Expo](https://expo.dev/)
- [Redux](https://redux.js.org/)
- [FastAPI](https://fastapi.tiangolo.com/) 
- [Firebase](https://firebase.google.com/)
- [MongoDB](https://www.mongodb.com/)
- [SQLite3](https://www.sqlite.org/index.html)

Ngoài các công nghệ đã liệt kê thì còn nhiều thư viện bổ sung.

## Hướng dẫn cài đặt
### Chạy local bằng Expo CLI
1. Cài NodeJS và NPM
2. Cài Expo CLI : 
    ```sh
    npm install --global expo-cli
    ```
3. Cài đặt node-modules : 
     ```sh
        npm install 
    ```
4. Chạy project :
     ```sh
        expo start 
    ```
5. Cài đặt Expo Go trên Android hoặc iOS sau đó quét mã QR hoặc chọn Project từ giao diện của Expo Go để sử dụng
6. Build ứng dụng thành .apk : 
     ```sh
        expo build:android 
    ```
7. Build ứng dụng thành .ipa  :
     ```sh
        expo build:ios 
    ```

### Chạy online thông qua Expo Host
1. Tải Expo go trong Apple Store [tại đây](https://apps.apple.com/vn/app/expo-go/id982107779?l=vi) hoặc CH Play [tại đây](https://play.google.com/store/apps/details?id=host.exp.exponent&hl=en&gl=US) 
2. Bật Expo go và quét mã QR
![Expo QR](https://qr.expo.dev/expo-go?owner=ngovandong&slug=top100-nct&releaseChannel=default&host=exp.host)


## Docker

Để chạy ứng dụng một cách nhanh nhất thì chúng ta có thể sử dụng docker.

1. Tìm địa chỉ ip của máy
2. Build docker image 
    ```sh
    docker build -t top100-nct .  
    ```
3. Run docker container
    ```sh
    docker run -it --rm -p 19000:19000 -p 19001:19001 -p 19002:19002  \
    -e REACT_NATIVE_PACKAGER_HOSTNAME=YOUR_DEVICE_IP \
    -e EXPO_DEVTOOLS_LISTEN_ADDRESS=0.0.0.0  top100-nct:latest
    ```
Thay YOUR_DEVICE_IP thành địa chỉ ip của máy
