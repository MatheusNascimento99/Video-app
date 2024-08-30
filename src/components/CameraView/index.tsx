import React from 'react';

import { TouchableOpacity, View, Text } from 'react-native';

import { CameraView } from 'expo-camera';

import { CameraViewProps } from './props';
import { styles } from './style';

export const CameraViewComponent = ({
    cameraRef,
    isRecording,
    onRecording,
    stopRecording,
}: CameraViewProps) => {
    return (
        <CameraView style={styles.container} ref={cameraRef}>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                style={styles.buttonRecording}
                onPress={isRecording ? stopRecording : onRecording}>
                    <Text style={styles.buttonText}>
                        {isRecording ? "Stop Recording" : "Start Recording"}
                    </Text>
                </TouchableOpacity>
            </View>
        </CameraView>
    );
};
