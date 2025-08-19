import { ArrowDown2, Calendar, Call, GlobalSearch, Map, Map1, Message2, User } from 'iconsax-react-native'
import React, { useState } from 'react'
import { View } from 'react-native'
import { BtnShadowLinearComponent, CheckedButtonComponent, Container, InputComponent, ProgressShippingComponent, RowComponent, SectionComponent, SpaceComponent } from '../../components'
import { colors } from '../../constants/colors'
import { fontFamillies } from '../../constants/fontFamilies'
const data = [
    {
        icon: <User color={colors.text} size={26} />,
        placholder: 'Name',
        title: 'name'
    },
    {
        icon: <Message2 color={colors.text} size={26} />,
        placholder: 'Email address',
        title: 'email'
    },
    {
        icon: <Call color={colors.text} size={26} />,
        placholder: 'Phone number',
        title: 'phone'
    },
    {
        icon: <Map color={colors.text} size={26} />,
        placholder: 'Address',
        title: 'address'
    },
    {
        icon: <Calendar color={colors.text} size={26} />,
        placholder: 'Zip code',
        title: 'zipCode'
    },
    {
        icon: <Map1 color={colors.text} size={26} />,
        placholder: 'City',
        title: 'city'
    },
    {
        icon: <GlobalSearch color={colors.text} size={26} />,
        placholder: 'Country',
        title: 'country'
    },
]
const data1 = [
    {
        title: '1',
        status: 'success',
        description: 'DELIVERY'
    },
    {
        title: '2',
        status: 'pending',
        description: 'ADDRESS'
    },
    {
        title: '3',
        status: 'waiting',
        description: 'PAYMENT'
    },
]
const ShippingAddressScreen = ({navigation}: any) => {
    const [infoAddesss, setInfoAddesss] = useState<any>({
        name: '',
        email: '',
        phone: '',
        address: '',
        zipCode: '',
        city: '',
        country: ''
    });
    const [isSaved, setIsSaved] = useState(false);
    return (
        <Container bg={colors.background} back title='Shipping Address'>
            <View style={{
                backgroundColor: colors.background1,
                flex: 1,
                paddingVertical: 20
            }}>
                <SectionComponent styles={{
                    flex: 1
                }}>
                    <View style={{
                        paddingHorizontal: 30,
                        paddingVertical: 10
                    }}>
                        <RowComponent justify='space-around'>
                            {
                                data1.map((_, index) =>
                                    <ProgressShippingComponent key={index}
                                        index={index}
                                        status={_.status}
                                        title={_.title}
                                        description={_.description}
                                    />
                                )
                            }

                        </RowComponent>
                    </View>

                    <SpaceComponent height={20} />
                    {
                        data.map((_, index) =>
                            <InputComponent
                                key={index}
                                styles={{
                                    backgroundColor: colors.background,
                                    paddingVertical: 12,
                                    paddingHorizontal: 26,
                                    borderRadius: 5,
                                    marginBottom: 6
                                }}
                                allowClear={_.title !== 'country'}
                                prefix={_.icon}
                                placeholder={_.placholder}
                                placeholderTextColor={colors.text}
                                color={colors.background}
                                value={infoAddesss[_.title]}
                                editable={_.title !== 'country'}
                                onChange={val => setInfoAddesss({
                                    ...infoAddesss, [_.title]: val
                                })}
                                affix={_.title === 'country' ? <ArrowDown2
                                    variant='Bold'
                                    size={20} color={colors.text} />
                                    : undefined}
                            />
                        )
                    }
                    <SpaceComponent height={10} />
                    <SectionComponent>
                        <CheckedButtonComponent
                            value={isSaved}
                            title='Save this address'
                            onPress={(val: boolean) => setIsSaved(val)}
                        />
                    </SectionComponent>
                </SectionComponent>

                <SectionComponent>
                    <BtnShadowLinearComponent
                        onPress={() => navigation.navigate('PaymentMethodScreen')}
                        title='Next'
                    />
                </SectionComponent>
            </View>
        </Container>
    )
}

export default ShippingAddressScreen