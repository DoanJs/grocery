import { AddCircle } from 'iconsax-react-native'
import React, { useState } from 'react'
import { ScrollView, View } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { Shadow } from 'react-native-shadow-2'
import masterCard from '../../assests/images/masterCard.png'
import visaCard from '../../assests/images/visaCard.png'
import { BtnShadowLinearComponent, ButtonComponent, CardItemComponent, Container, SectionComponent } from '../../components'
import { colors } from '../../constants/colors'
import { fontFamillies } from '../../constants/fontFamilies'
import { sizes } from '../../constants/sizes'

const MyCardScreen = ({ navigation }: any) => {
    const [makeDefault, setMakeDefault] = useState('');
    return (
        <Container bg={colors.background} back title='My Cards'
            right={<AddCircle
                size={26} color={colors.text2}
                onPress={() => navigation.navigate('AddCardScreen')}
            />}>
            <View style={{
                backgroundColor: colors.background1,
                flex: 1,
                paddingVertical: 20
            }}>
                <SectionComponent styles={{ flex: 1 }}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <CardItemComponent
                            icon={masterCard} title='Master Card'
                            cardNumber='XXXX  XXXX  XXXX  5678'
                            name='Russell Austin'
                            exp='01/23'
                            cvv='675'
                            value={makeDefault}
                            onPress={(val: string) => setMakeDefault(val)}
                        />
                        <CardItemComponent
                            icon={visaCard} title='Master Card'
                            cardNumber='XXXX  XXXX  XXXX  3435'
                            name='Russell Austin'
                            exp='05/22'
                            cvv='908'
                            value={makeDefault}
                            onPress={(val: string) => setMakeDefault(val)}
                        />
                        <CardItemComponent
                            icon={masterCard} title='Master Card'
                            cardNumber='XXXX  XXXX  XXXX  6784'
                            name='Russell Austin'
                            exp='07/20'
                            cvv='123'
                            value={makeDefault}
                            onPress={(val: string) => setMakeDefault(val)}
                        />
                    </ScrollView>
                </SectionComponent>

                <SectionComponent>
                    <BtnShadowLinearComponent
                        onPress={() => { }}
                        title="Save settings"
                    />
                </SectionComponent>
            </View>
        </Container>
    )
}

export default MyCardScreen