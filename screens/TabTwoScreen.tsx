import EditScreenInfo from '../components/EditScreenInfo';
import {Text, View} from '../components/Themed';
import {Agenda, DateData, AgendaEntry, AgendaSchedule} from 'react-native-calendars';
import {Calendar, CalendarTouchableOpacityProps, ICalendarEventBase} from 'react-native-big-calendar'
import ModelTester from './ModelTester';
import {
  StyleSheet,
  Animated,
  Easing,
  ScrollView,
  RefreshControl,
  AppRegistry,
  SafeAreaView,
  TouchableOpacity,
  Button
} from 'react-native';


interface State {
    items?: AgendaSchedule;
}

export default function TabTwoScreen() {
    return (
        <Agenda
            items={{
                '2022-05-02': [],
            }}
            onDayPress={day => {
                console.log('selected day:', day);
            }}
            minDate={'2022-04-01'}
            maxDate={'2022-06-30'}
            pastScrollRange={50}
            futureScrollRange={50}
            renderItem={(item, firstItemInDay) => {
                return <View/>;
            }}
            renderDay={(day, item) => {
                console.log(day);
                return <View/>;
            }}
            renderEmptyDate={() => {
                return (
                    <SafeAreaView style={{flex: 1}}>
                        <Calendar
                            events={events}
                            height={750}
                            mode={'day'}
                            scrollOffsetMinutes={420}
                            onPressEvent={OnPressEventHandler}
                            date={new Date('2022-05-06')}
                            hideNowIndicator={false}
                            hourRowHeight={50}
                            overlapOffset={100}
                        />
                        <ModelTester/>
                    </SafeAreaView>
                );
            }}
            renderKnob={() => {
                return <View/>;
            }}
            renderEmptyData={() => {
                return (
                    <ModelTester isVisible={true}/>
                    // <View>
                    //   <Text style={styles.emptyDate}>This is empty date!</Text>
                    // </View>
                );
            }}
            //rowHasChanged={this.RowHasChanged}
            hideKnob={false}
            showClosingKnob={true}

            markedDates={{
                '2022-05-02': {selected: false, marked: true},
                '2022-05-17': {marked: false},
                '2022-05-18': {disabled: false}
            }}

            onRefresh={() => console.log('refreshing...')}

            refreshing={false}
        />
    );

    function OnPressEventHandler(event: ICalendarEventBase) {
        console.log(event);
    }
}

const events = [
    {
        title: 'Meeting',
        start: new Date(2022, 4, 6, 8, 0),
        end: new Date(2022, 4, 6, 10, 35),
        id: 1,
    },
    {
        title: 'Meeting2',
        start: new Date(2022, 4, 6, 8, 0),
        end: new Date(2022, 4, 6, 10, 35),
    },
    {
        title: 'Meeting3',
        start: new Date(2022, 4, 6, 11, 40),
        end: new Date(2022, 4, 6, 12, 35),
    },
    {
        title: 'Coffee break',
        start: new Date(2022, 4, 6, 14, 45),
        end: new Date(2022, 4, 6, 16, 30),
    },
    {
        title: 'Coffee break2',
        start: new Date(2022, 4, 5, 12, 45),
        end: new Date(2022, 4, 5, 14, 30),
    },
    {
        title: 'Coffee break4',
        start: new Date(2022, 4, 5, 12, 45),
        end: new Date(2022, 4, 5, 14, 30),
    },
    {
        title: 'Coffee break5',
        start: new Date(2022, 4, 4, 9, 45),
        end: new Date(2022, 4, 4, 10, 30),
    },
]

const styles = StyleSheet.create({
    emptyDate: {
        height: 15,
        backgroundColor: '#AFEEEE',
        flex: 1,
        borderRadius: 10,
        paddingTop: 20,
        paddingBottom: 20,
        paddingLeft: 30,
        marginLeft: 10,
        marginRight: 10,
        fontSize: 18,
    },
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
