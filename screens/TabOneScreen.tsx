import React, { useState, useMemo, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import {Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';

import { Picker, onOpen } from 'react-native-actions-sheet-picker';
import practiceData from './practices.json';
import {Props} from "expo-system-ui/plugin/build/withAndroidUserInterfaceStyle";

interface Therapist {
    name: string,
}

interface Practice {
    name: string,
    therapists: Therapist[]
}

export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {

  const [data, setData] = useState([]);
  const [selectedPractice, setSelectedPractice] = useState(undefined);
  const [selectedTherapist, setSelectedTherapist] = useState(undefined);
  const [query, setQuery] = useState('');
  const [therapistQuery, setTherapistQuery] = useState('');

  useEffect(() => {
    setData(data);
  }, []);

  /*
   **Example filter function
   * @param {string} filter
   */
  const filteredPractice: any = useMemo(() => {
    if (practiceData && practiceData.length > 0) {
      return practiceData.filter((item: Practice) =>
          item.name
              .toLocaleLowerCase('en')
              .includes(query.toLocaleLowerCase('en'))
      );
    }
  }, [data, query]);

    const filteredTherapist = useMemo(() => {
        if (selectedPractice !== null && selectedPractice !== undefined) {
            // @ts-ignore
            return selectedPractice.therapists.filter((item) =>
                item.name.toLocaleLowerCase('en')
                    .includes(therapistQuery.toLocaleLowerCase('en'))
            );
        }
    }, [selectedPractice, therapistQuery]);

  /*
   **Input search
   *@param {string} text
   */
  const onSearch = (text: string) => {
    setQuery(text);
  };

interface TherapistSelectionProps {
    selectedPractice?: Practice
}
const TherapistSelection = ( { selectedPractice }: TherapistSelectionProps ) => {

    if(selectedPractice === undefined) return (<View></View>);

    return (
        <View style={{ backgroundColor: '#ffffff' }}>
            <TouchableOpacity
                style={styles.button}
                onPress={() => {
                    onOpen('country');
                }}
            >
                <Text style={styles.text}>Behandler auswählen</Text>
            </TouchableOpacity>
            <Text style={{padding: 10, color: '#000000'}}>Aktueller
                Behandler: {JSON.stringify(selectedTherapist)}</Text>
            <Picker
                id="country"
                data={filteredTherapist}
                inputValue={query}
                searchable={true}
                label="Wähle deinen Behandler!"
                setSelected={setSelectedTherapist}
                onSearch={onSearch}
            />
        </View>);
}

  return (
      <View style={styles.container}>
        <Text style={styles.title}>Praxis & Behandler</Text>
        <View style={styles.separator}/>
        {/*<EditScreenInfo path="/screens/TabOneScreen.tsx" />*/}

          <SafeAreaView style={styles.container2}>
              <TouchableOpacity
                  style={styles.button}
                  onPress={() => {
                      onOpen('praxis');
                  }}
              >
                  <Text style={styles.text}>Praxis auswählen</Text>
              </TouchableOpacity>
              <Text style={{ padding: 10, color: '#000000' }}>Aktuelle Praxis: {JSON.stringify(selectedPractice)}</Text>
              <Picker
                  id="praxis"
                  data={filteredPractice}
                  inputValue={query}
                  searchable={true}
                  label="Wähle deine Praxis!"
                  setSelected={setSelectedPractice}
                  onSearch={onSearch}
              />
              <TherapistSelection selectedPractice={selectedPractice} />

          </SafeAreaView>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0084b5',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
    backgroundColor: '#0084b5',
  },
    container2: {
        flex: 1,
        alignItems: 'center',
    },
    button: {
        backgroundColor: '#0ebbff',
        padding: 10,
        borderRadius: 6,
        marginTop: 50,
    },
    text: {
        color: '#ffffff',
    },

});
