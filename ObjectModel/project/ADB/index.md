# ADB 指令

> 介紹有關於 adb 的指令， 
> adb的全稱為 ``` android debug bridge ``` 
> --> 調試

### 如何安裝 

> 這裡不介紹安裝，只要有sdk 即可使用

## 指令

### 基本指令

``` adb devices ```  查看設備

``` adb connect <IP> ``` 連接設備

``` adb tcpip <port>``` 使用tcpip方式

``` adb usb ``` 使用usb方式(預設)

``` adb install <apk 本地端> ``` 從本地apk安裝至手機
 >#### -r 保留數據和緩存，重新安裝
 
 >#### -s 安裝到sd卡

``` adb uninstall <com.app> ``` 卸載app
 >#### -k  保留配置和緩存

``` adb shell ``` 進入app command

``` adb push <local> <android> ``` 複製文件到手機
 
``` adb pull <android> <local> ``` 從手機複製文件到電腦


``` adb reboot ``` 重啟
 >#### bootloader 刷機模式
 
 >#### recovery 恢復模式

``` adb logcat ``` 查看log
 >#### -c 清除log緩存

``` adb help ``` 幫助

### 應用操作

``` adb shell pm list packages ``` 查看所有package
  >#### -f 所有官網的 packages
  
  >#### -3 自行下載的 packages

``` adb shell dumosys activity ``` 查看app的 activity name

``` adb shell am start -n <com.app>/.<activity name> ``` 啟動app

``` adb shell top ``` 查看CPU內存占用
  >#### -m <number> 查看前幾筆資料
  
  >#### -n <number> 刷新幾次信息



### 錯誤處理


``` adb bugreport ``` 查看bug報告
``` adb remount ``` 將system重新掛載為可讀寫
``` adb kill-server ``` 終止adb服務process
``` adb start-server ``` 啟動adb服務process