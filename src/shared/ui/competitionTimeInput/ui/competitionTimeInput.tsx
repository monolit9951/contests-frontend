import { Input } from 'shared/ui/input'
import { HStack, VStack } from 'shared/ui/stack'
import { Text } from 'shared/ui/text'

import './competitionTimeInput.scss'
import { useDispatch, useSelector } from 'react-redux'
import { setContestDateEnd, setContestDateStart } from 'pages/contestsCreationPage/model/services'

interface CompetitionTimeInputProps {
    dateTitle: string
    timeTitle: string
}

export const CompetitionTimeInput = ({
    dateTitle,
    timeTitle,
}: CompetitionTimeInputProps) => {
    const dispatch: AppDispatch = useDispatch()


    // let dateFull;
    // let dateValue
    // let timeValue

    // let DateChange;
    // let TimeChange;

    // if (dateTitle === 'Start date') {
    //     // const dateStart = useSelector(
    //      dateFull = useSelector(
    //         (state: RootState) => state.contestsCreationPage.dateStart 
    //     )

    //     // const dateValue = dateStart.slice(0, 3).join('-')
    //     // const timeValue = dateStart.slice(-3,-1).join(':')
    //      dateValue = dateFull.slice(0, 3).join('-')
    //      timeValue = dateFull.slice(-3,-1).join(':')

       

    //      DateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //         console.log(e.target)
    //         const dateValues = e.target.value.split("-").map(Number);
        
    //         // Get the current dateStart array from the Redux state
    //         const currentDateStart = useSelector((state: RootState) => state.contestsCreationPage.dateStart);
        
    //         // Create a new array with updated date values and existing time values
    //         const newDateStart = [...dateValues, ...currentDateStart.slice(3)];
        
    //         // Dispatch the action with the updated array
    //         dispatch(setContestDateStart(newDateStart));
    //     }

    //     //  TimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     //     const timeValues = e.target.value.split(":");
    //     //     dispatch(setContestDateStart())//set date split by "-" and assigned to last 3 elements
    //     // }


    // } else {
    //     dateFull = useSelector((state: RootState) => state.contestsCreationPage.dateEnd)
       

    //     dateValue = dateFull.slice(0, 3).join('-')
    //     timeValue = dateFull.slice(-3,-1).join(':')

      

    //     DateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //        const dateValues = e.target.value.split("-").map(Number);
       
    //        // Get the current dateStart array from the Redux state
    //        const currentDateEnd = useSelector((state: RootState) => state.contestsCreationPage.dateEnd);
       
    //        // Create a new array with updated date values and existing time values
    //        const newDateEnd = [...dateValues, ...currentDateEnd.slice(3)];
       
    //        // Dispatch the action with the updated array
    //        dispatch(setContestDateStart(newDateEnd));
    //    }

    // //     TimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // //        const timeValues = e.target.value.split(":");
    // //        dispatch(setContestDateEnd())//set date split by "-" and assigned to last 3 elements
    // //    }
    // }


    const dateFull = useSelector((state: RootState) => 
        dateTitle === 'Start date' ? state.contestsCreationPage.dateStart : state.contestsCreationPage.dateEnd
    )

    const dateValue = dateFull.slice(0, 3).join('-')
    const timeValue = dateFull.slice(3, 6).join(':')
    
    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const dateValues = e.target.value.split("-").map(Number)
        const newDateFull = [...dateValues, ...dateFull.slice(3)]
        if (dateTitle === 'Start date') {
            dispatch(setContestDateStart(newDateFull))
        } else {
            dispatch(setContestDateEnd(newDateFull))
        }
    }

    const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const timeValues = e.target.value.split(":").map(Number)
        const newDateFull = [...dateFull.slice(0, 3), ...timeValues]
        if (dateTitle === 'Start date') {
            dispatch(setContestDateStart(newDateFull))
        } else {
            dispatch(setContestDateEnd(newDateFull))
        }
    }

    return (
        <HStack className='competitionTimeInput_container'>
            <VStack className='dateInput_container'>
                <Text Tag='p'>{dateTitle}</Text>
               
                <Input
                    type='date'
                    placeholder='Placeholder'
                    className='dateInput'
                    value={dateValue}
                    // defaultValue={"2024-06-06"}
                    onChange={handleDateChange}
                />
            </VStack>
            <VStack className='timeInput_container'>
                <Text Tag='p'>{timeTitle}</Text>
                <Input
                    type='time'
                    placeholder='Placeholder'
                    className='timeInput'
                    // defaultValue={"12:54"}
                    value={timeValue}
                    onChange={handleTimeChange}
                />
            </VStack>
        </HStack>
    )
}
