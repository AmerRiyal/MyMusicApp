import * as React from 'react';
import { Text, View, StyleSheet, ScrollView } from 'react-native';
import { Constants, Languages } from '../common';
import {
    LyricsProps,
} from '../common/Types';
import { Header, Loader } from '../components';
import { AppColors } from '../theme';
import { dimensionsCalculation } from '../utils';
import axios from "axios";



const Lyrics = ({ route }: LyricsProps) => {
    const { lyricsApi } = route?.params;
    const [loading, setLoading] = React.useState(true);
    const [lyricsObj, setLyricsObj] = React.useState({ lyrics: "", track: "" });
    const [error, setError] = React.useState(false);


    const getLyrics = () => {
        setLoading(true);
        axios.get(`${lyricsApi}?apikey=${Constants.apiKey}`).then((response) => {
            setLoading(false);
            if (response.data.success) {
                setLyricsObj(response.data.result)
                setError(false)
            } else {
                setError(true)
                setLoading(false);
                console.log("Error", response.data.error)
            }
        }).catch(function (error) {
            // handle error
            setError(true)
            setLoading(false);
            console.log("Error", error);
        })
    }

    React.useEffect(() => {
        getLyrics();
    }, []);


    return (
        <View style={styles.container}>
            <Header title={Languages.Lyrics} hasBack />
            {loading ? (
                <Loader />
            ) : (
                <ScrollView>
                    <Text style={styles.trackTitle}>{lyricsObj?.track}</Text>
                    <Text style={{
                        lineHeight: 35
                    }}>{lyricsObj?.lyrics}</Text>
                </ScrollView>
            )}

        </View>
    );
};

export default Lyrics;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: AppColors.white,
        padding: dimensionsCalculation(15),
    },
    trackTitle: {
        fontWeight: "600",
        textAlign: 'center',
        alignSelf: 'center',
        marginBottom: dimensionsCalculation(15),
        color: AppColors.black,
        fontSize:17
    }
});
