import React, {useState} from "react";
import {Button, Text, View, StyleSheet} from "react-native";
import Modal from "react-native-modal";


export default class ModelTester extends React.Component {
    state = {visible: false};

    openModel = () => this.setState({visible: true});

    closeModel = () => this.setState({visible: false});

    checkModel = () => console.log("checkModel");

    render() {
        return (
            <View style={{flex: 1}}>
                <Button title="Show modal" onPress={this.openModel}/>

                <Modal isVisible={this.state.visible} onBackdropPress={this.closeModel}>
                    <View style={styles.box}>
                        <Text>Termininformationen</Text>
                        <br/>
                        <Text>Datum: 12.05.2022</Text>
                        <Text>Start: 09:15</Text>
                        <Text>Ende: 09:50</Text>
                        <Text>Behandler: Dr. Hans Huber</Text>
                        <Text>Praxis: Praxis</Text>
                        <Text>Patient: Bernd Bosch</Text>
                        <Text>Behandlungsart: Wurzelbehandlung</Text>
                        <br/>
                        <br/>
                        <Button title="Hide modal" onPress={this.closeModel}/>
                    </View>
                </Modal>
            </View>
        );

        function test(text) {
            console.log(text);
        }
    }
}

const styles = StyleSheet.create({
    box: {
        backgroundColor: '#F0F8FF',
        flex: 0.35,
        borderRadius: 10,
        padding: 20,
        marginLeft: 10,
        marginRight: 10,
        fontSize: 18,
    }
});
