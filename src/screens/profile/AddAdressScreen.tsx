import { ArrowDown2, Barcode, Call, GlobalSearch, Location, Message, Solana, User } from 'iconsax-react-native';
import React, { useState } from 'react';
import { BtnShadowLinearComponent, CheckedButtonComponent, Container, InputComponent, SectionComponent } from '../../components';
import { colors } from '../../constants/colors';
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
                <CheckedButtonComponent
                    title='Save this address'
                    onPress={() => setSaved(!saved)}
                    value={saved}
                />
            </SectionComponent>

            <SectionComponent>
                <BtnShadowLinearComponent
                    onPress={() => { }}
                    title="Add address"
                />
            </SectionComponent>
        </Container>
    )
}

export default AddAdressScreen