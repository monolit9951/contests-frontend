import { Icon } from 'shared/ui/icon'
import { Input } from 'shared/ui/input'
import { MainInformationCombobox } from 'shared/ui/mainInformationCombobox/ui/mainInformationCombobox'
import { HStack, VStack } from 'shared/ui/stack'
import { Text } from 'shared/ui/text'

import './prizePlace.scss'

interface PrizePlaceProps {
    winIcon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>
    deleteIcon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>
}

const types = [
    { value: 'type1', label: 'Type 1' },
    { value: 'type2', label: 'Type 2' },
    { value: 'type3', label: 'Type 3' }
]

export const PrizePlace = ({winIcon, deleteIcon}: PrizePlaceProps) => {
    return (
        <VStack>

        
        <HStack className='prizePlace_container'>
                <Icon Svg={winIcon} height={44} width={44} className='winIcon'/>
  
                <VStack className='winnersNum_input_container'>
                        <Text Tag='p' className='inputTitle'>Number of winners</Text>
                        <Input type='number' placeholder='10' className='winnersNum_input'/>
                    </VStack>
                    <MainInformationCombobox title='Prize type' placeholder='Select type' options={types} width={164} />
                    <VStack className='prizeName_input_container'>
                        <Text Tag='p' className='inputTitle'>Prize name</Text>
                        <Input type='text' placeholder='10 000 $' className='prizeName_input'/>
                    </VStack>
                <Icon Svg={deleteIcon} height={48} width={24} className='deleteIcon'/>

        </HStack>

                <div className='divider'/>
        </VStack>
    )
}
