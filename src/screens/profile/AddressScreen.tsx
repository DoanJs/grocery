import { where } from '@react-native-firebase/firestore';
import { AddCircle } from 'iconsax-react-native';
import React, { useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { auth } from '../../../firebase.config';
import {
  AddressItemComponent,
  BtnShadowLinearComponent,
  Container,
  SectionComponent,
} from '../../components';
import { colors } from '../../constants/colors';
import { onSnapshotData } from '../../constants/onSnapshotData';
import { setDocData } from '../../constants/setDocData';
import { AddressModel } from '../../models/AddressModel';

const AddressScreen = ({ navigation }: any) => {
  const user = auth.currentUser;
  const [addressDefault, setAddressDefault] = useState('');
  const [addesses, setAddesses] = useState<AddressModel[]>([]);
  const [disable, setDisable] = useState(false);

  useEffect(() => {
    if (user) {
      onSnapshotData({
        nameCollect: 'addresses',
        setData: setAddesses,
        conditions: [where('userId', '==', user.uid)],
      });
    }
  }, [user]);

  useEffect(() => {
    if (addesses.length > 0) {
      addesses.map(_ => {
        _.default && setAddressDefault(_.id);
      });
    }
  }, [addesses]);

  useEffect(() => {
    if (addesses.length > 0) {
      const index = addesses.findIndex(_ => _.default);
      if (['', addesses[index].id].includes(addressDefault)) {
        setDisable(true);
      } else {
        setDisable(false);
      }
    }
  }, [addressDefault]);

  const handleChangeAddressDefault = () => {
    const index = addesses.findIndex(_ => _.default);

    setDocData({
      nameCollect: 'addresses',
      id: addesses[index].id,
      valueUpdate: { default: false },
    });
    setDocData({
      nameCollect: 'addresses',
      id: addressDefault,
      valueUpdate: { default: true },
    });

    setDisable(true)
  };

  return (
    <Container
      bg={colors.background}
      back
      title="My Address"
      right={
        <AddCircle
          size={26}
          color={colors.text2}
          onPress={() => navigation.navigate('AddAdressScreen',{addressDefault})}
        />
      }
    >
      <View
        style={{
          flex: 1,
          backgroundColor: colors.background1,
        }}
      >
        <SectionComponent
          styles={{
            paddingTop: 20,
            marginBottom: 0,
            flex: 1,
          }}
        >
          <ScrollView showsVerticalScrollIndicator={false}>
            {addesses.map((_, index) => (
              <AddressItemComponent
                key={index}
                address={_}
                value={addressDefault}
                onPress={val => setAddressDefault(val)}
              />
            ))}
          </ScrollView>
        </SectionComponent>

        <SectionComponent>
          <BtnShadowLinearComponent
            onPress={handleChangeAddressDefault}
            title="Save settings"
            disable={disable}
          />
        </SectionComponent>
      </View>
    </Container>
  );
};

export default AddressScreen;
