import { AddCircle } from 'iconsax-react-native'
import React, { useState } from 'react'
import { AddressItemComponent, Container, SectionComponent } from '../../components'
import { colors } from '../../constants/colors'

const AddressScreen = () => {
    const [addressDefault, setAddressDefault] = useState('Jissca Simpson');

    return (
        <Container isScroll bg={colors.background} back title='My Address'
            right={<AddCircle size={26} color={colors.text2} />}>

            <SectionComponent styles={{
                backgroundColor: colors.background1,
                paddingVertical: 20,
                marginBottom: 0,
                flex: 1
            }}>
                <AddressItemComponent
                    title='Russell Austin'
                    address='2811 Crescent Day. LA Port California, United States 77571'
                    phone='+1  202  555  0142 '
                    value={addressDefault}
                    onPress={(val) => setAddressDefault(val)}
                />
                <AddressItemComponent
                    title='Jissca Simpson'
                    address='2811 Crescent Day. LA Port California, United States 77571'
                    phone='+1  202  555  0142 '
                    value={addressDefault}
                    onPress={(val) => setAddressDefault(val)}
                />

            </SectionComponent>
        </Container>
    )
}

export default AddressScreen