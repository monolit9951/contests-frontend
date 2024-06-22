// import { useDispatch, useSelector } from 'react-redux'
// import { setContestDateEnd, setContestDateStart } from 'pages/contestsCreationPage/model/services'
// import { Input } from 'shared/ui/input'
// import { HStack, VStack } from 'shared/ui/stack'
// import { Text } from 'shared/ui/text'

// import './competitionTimeInput.scss'

// interface CompetitionTimeInputProps {
//     dateTitle: string
//     timeTitle: string
// }

// export const CompetitionTimeInput = ({
//     dateTitle,
//     timeTitle,
// }: CompetitionTimeInputProps) => {
//     const dispatch: AppDispatch = useDispatch()


//     const dateFull = useSelector((state: RootState) => 
//         dateTitle === 'Start date' ? state.contestsCreationPage.dateStart : state.contestsCreationPage.dateEnd
//     )

//     const dateValue = dateFull.slice(0, 3).join('-')
//     const timeValue = dateFull.slice(3, 6).join(':')
    
//     const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const dateValues = e.target.value.split("-").map(Number)
//         const newDateFull = [...dateValues, ...dateFull.slice(3)]
//         if (dateTitle === 'Start date') {
//             dispatch(setContestDateStart(newDateFull))
//         } else {
//             dispatch(setContestDateEnd(newDateFull))
//         }
//     }

//     const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const timeValues = e.target.value.split(":").map(Number)
//         const newDateFull = [...dateFull.slice(0, 3), ...timeValues]
//         if (dateTitle === 'Start date') {
//             dispatch(setContestDateStart(newDateFull))
//         } else {
//             dispatch(setContestDateEnd(newDateFull))
//         }
//     }

//     return (
//         <HStack className='competitionTimeInput_container'>
//             <VStack className='dateInput_container'>
//                 <Text Tag='p'>{dateTitle}</Text>
               
//                 <Input
//                     type='date'
//                     placeholder='Placeholder'
//                     className='dateInput'
//                     value={dateValue}
//                     onChange={handleDateChange}
//                 />
//             </VStack>
//             <VStack className='timeInput_container'>
//                 <Text Tag='p'>{timeTitle}</Text>
//                 <Input
//                     type='time'
//                     placeholder='Placeholder'
//                     className='timeInput'
//                     value={timeValue}
//                     onChange={handleTimeChange}
//                 />
//             </VStack>
//         </HStack>
//     )
// }


import { useDispatch, useSelector } from 'react-redux';
import { setContestDateEnd, setContestDateStart } from 'pages/contestsCreationPage/model/services';
import { Input } from 'shared/ui/input';
import { HStack, VStack } from 'shared/ui/stack';
import { Text } from 'shared/ui/text';

import './competitionTimeInput.scss';

interface CompetitionTimeInputProps {
    dateTitle: string;
    timeTitle: string;
}

export const CompetitionTimeInput = ({
    dateTitle,
    timeTitle,
}: CompetitionTimeInputProps) => {
    const dispatch: AppDispatch = useDispatch();

    const dateFull = useSelector((state: RootState) => 
        dateTitle === 'Start date' ? state.contestsCreationPage.dateStart : state.contestsCreationPage.dateEnd
    );

    const [dateValue, timeValue] = dateFull.split(' ');

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const dateValues = e.target.value;
        const newDateFull = `${dateValues} ${timeValue}`;
        if (dateTitle === 'Start date') {
            dispatch(setContestDateStart(newDateFull));
        } else {
            dispatch(setContestDateEnd(newDateFull));
        }
    };

    const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const timeValues = e.target.value;
        const newDateFull = `${dateValue} ${timeValues}`;
        if (dateTitle === 'Start date') {
            dispatch(setContestDateStart(newDateFull));
        } else {
            dispatch(setContestDateEnd(newDateFull));
        }
    };

    return (
        <HStack className='competitionTimeInput_container'>
            <VStack className='dateInput_container'>
                <Text Tag='p'>{dateTitle}</Text>
                <Input
                    type='date'
                    placeholder='Placeholder'
                    className='dateInput'
                    value={dateValue}
                    onChange={handleDateChange}
                />
            </VStack>
            <VStack className='timeInput_container'>
                <Text Tag='p'>{timeTitle}</Text>
                <Input
                    type='time'
                    placeholder='Placeholder'
                    className='timeInput'
                    value={timeValue}
                    onChange={handleTimeChange}
                />
            </VStack>
        </HStack>
    );
};
