import { AddCircle } from 'iconsax-react-native';
import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Shadow } from 'react-native-shadow-2';
import {
  AddressItemComponent,
  BtnShadowLinearComponent,
  ButtonComponent,
  Container,
  SectionComponent,
} from '../../components';
import { colors } from '../../constants/colors';
import { fontFamillies } from '../../constants/fontFamilies';
import { sizes } from '../../constants/sizes';

const AddressScreen = ({ navigation }: any) => {
  const [addressDefault, setAddressDefault] = useState('');

  return (
    <Container
      bg={colors.background}
      back
      title="My Address"
      right={<AddCircle
        size={26}
        color={colors.text2}
        onPress={() => navigation.navigate('AddAdressScreen')}
      />}
    >
      <SectionComponent
        styles={{
          backgroundColor: colors.background1,
          paddingVertical: 20,
          marginBottom: 0,
          flex: 1,
        }}
      >
        <ScrollView>
          <AddressItemComponent
            title="Russell Austin"
            address="2811 Crescent Day. LA Port California, United States 77571"
            phone="+1  202  555  0142 "
            value={addressDefault}
            onPress={val => setAddressDefault(val)}
          />
          <AddressItemComponent
            title="Jissca Simpson"
            address="2811 Crescent Day. LA Port California, United States 77571"
            phone="+1  202  555  0142 "
            value={addressDefault}
            onPress={val => setAddressDefault(val)}
          />
        </ScrollView>
      </SectionComponent>

      <SectionComponent>
        <BtnShadowLinearComponent
          onPress={() => navigation.navigate('Main')}
          title="Save settings"
        />
      </SectionComponent>
    </Container>
  );
};

export default AddressScreen;
