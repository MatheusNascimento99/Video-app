import { useState, useRef, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Camera, CameraRecordingOptions, CameraView } from 'expo-camera';
import { Video } from 'expo-av';
import { shareAsync } from 'expo-sharing';
import * as MediaLibrary from 'expo-media-library';

import { VideoPlayer } from './src/components/VideoPlayer';
import { CameraViewComponent } from './src/components/CameraView';


export default function App() {
    const cameraRef = useRef < CameraView > (null);
    const [isRecording, setIsRecording] = useState(false);
    const [video, setVideo] = useState<any>();

    const [hasCameraPermission, setHasCameraPermissio] = useState(false);
    const [hasMicrophonePermission, setHasMicrophonePermissio] =
        useState(false);
    const [hasMediaPermission, setHasMediaPermissio] = useState(false);

    useEffect(() => {
        (async () => {
            const cameraPermission =
                await Camera.requestCameraPermissionsAsync();
            const audioPermission =
                await Camera.requestMicrophonePermissionsAsync();
            const mediaLibraryPermission =
                await MediaLibrary.requestPermissionsAsync();

            setHasCameraPermissio(cameraPermission.status === 'granted');
            setHasMicrophonePermissio(audioPermission.status === 'granted');
            setHasMediaPermissio(mediaLibraryPermission.status === 'granted');
        })();
    }, []);

    const recordVideo = () => {
        setIsRecording(true)
        const options : CameraRecordingOptions = {
            maxDuration:30,
        };
        if(cameraRef && cameraRef.current){
            cameraRef.current.recordAsync(options).then((recordVideo:any) => {
                setVideo(recordVideo);
                setIsRecording(false)
            })
        }
    }

    const stopRecordVideo = () => {
        
    }



    return hasCameraPermission && hasMicrophonePermission ? (
        <View style={styles.container}>
            <CameraViewComponent 
            cameraRef={cameraRef}
            isRecording={isRecording}
            onRecording={recordVideo}
            stopRecording={stopRecordVideo}
            />
            (hasMediaPermission ? (): ())
        </View>
    ) : (
        <View style={styles.notpermission}>
            <Text>
                <View style={styles.notpermission}>
                    <Text>VOCÊ AINDA NÃO POSSUI PERMISSÕES DE MÍDIA</Text>
                </View>
                VOCÊ AINDA NÃO POSSUI PERMISSÕES DE ÁUDIO OU CÂMERA
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    notpermission:{
      flex: 1,
        backgroundColor: '#000',
        color:"white",
        alignItems: 'center',
        marginTop:25
    },
});
