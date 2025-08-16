import { ArrowDown2, Barcode, Call, GlobalSearch, Location, Message, Solana, User } from 'iconsax-react-native';
import React, { useState } from 'react';
import { View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Shadow } from 'react-native-shadow-2';
import { ButtonComponent, Container, InputComponent, RowComponent, SectionComponent, SpaceComponent, TextComponent } from '../../components';
import { colors } from '../../constants/colors';
import { fontFamillies } from '../../constants/fontFamilies';
import { sizes } from '../../constants/sizes';
const data = [
    {
        icon: <User size={20} color={colors.text} />,
        title: 'Name',
    },
    {
        icon: <Message size={20} color={colors.text} />,
        title: 'Email address',
    },
    {
        icon: <Call size={20} color={colors.text} />,
        title: 'Phone number',
    },
    {
        icon: <Location size={20} color={colors.text} />,
        title: 'Address',
    },
    {
        icon: <Barcode size={20} color={colors.text} />,
        title: 'Zip code',
    },
    {
        icon: <Solana size={20} color={colors.text} />,
        title: 'City',
    },
    {
        icon: <GlobalSearch size={20} color={colors.text} />,
        title: 'Country',
    },
];
const AddAdressScreen = () => {
    const [address, setAddress] = useState({
        Name: '',
        'Email address': '',
        'Phone number': '',
        Address: '',
        'Zip code': '',
        City: '',
        Country: ''
    });
    const [saved, setSaved] = useState(false);
    return (
        <Container bg={colors.background} back title='Add Address'>
            <SectionComponent styles={{
                backgroundColor: colors.background1,
                paddingVertical: 20,
                flex: 1,
                marginBottom: 0
            }}>
                {
                    data.map((_, index) =>
                        <InputComponent
                            key={index}
                            styles={{
                                backgroundColor: colors.background,
                                paddingVertical: 12,
                                paddingHorizontal: 26,
                                borderRadius: 5,
                            }}
                            allowClear
                            prefix={_.icon}
                            affix={_.title === 'Country' && <ArrowDown2
                                size={20}
                                color={colors.text}
                                variant='Bold'
                            />}
                            placeholder={_.title}
                            placeholderTextColor={colors.text}
                            color={colors.background}
                            value={address.Name}
                            onChange={val => setAddress({ ...address, [_.title]: val })}
                        />
                    )
                }

                <RowComponent onPress={() => setSaved(!saved)}>
                    <View
                        style={{
                            height: 18,
                            width: 32,
                            borderRadius: 20,
                            borderWidth: 1,
                            borderColor: saved ? colors.primary : colors.text,
                            flexDirection: 'row',
                            justifyContent: saved ? 'flex-end' : 'flex-start',
                            backgroundColor: saved ? colors.primary : colors.text
                        }}
                    >
                        <View
                            style={{
                                width: 16,
                                height: 16,
                                borderRadius: 100,
                                backgroundColor: colors.background,
                            }}
                        />
                    </View>
                    <SpaceComponent width={10} />
                    <TextComponent
                        text="Save this address"
                        color={colors.text2}
                        font={fontFamillies.poppinsMedium}
                    />
                </RowComponent>

            </SectionComponent>

            <SectionComponent>

                <Shadow
                    distance={5}
                    startColor={`${colors.primaryLight}d8`}
                    endColor={`${colors.primary}10`}
                    offset={[0, 4]}
                    style={{
                        width: '100%',
                        marginBottom: 16,
                    }}
                >
                    <LinearGradient
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        colors={[colors.primaryDark, colors.primary]}
                        style={{ borderRadius: 5 }}
                    >
                        <ButtonComponent
                            color="transparent"
                            onPress={() => { }}
                            text="Add address"
                            textStyles={{
                                color: colors.background,
                                fontFamily: fontFamillies.poppinsMedium,
                                fontSize: sizes.bigText,
                                marginLeft: 20,
                            }}
                            styles={{
                                flexDirection: 'row',
                                justifyContent: 'center',
                                borderRadius: 5,
                            }}
                        />
                    </LinearGradient>
                </Shadow>
            </SectionComponent>
        </Container>
    )
}

export default AddAdressScreen