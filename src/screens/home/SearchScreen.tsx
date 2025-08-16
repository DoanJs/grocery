import { SearchNormal1, Setting5 } from 'iconsax-react-native';
import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import {
  Container,
  InputComponent,
  SectionComponent,
  TextComponent,
} from '../../components';
import { colors } from '../../constants/colors';
import { fontFamillies } from '../../constants/fontFamilies';
import { sizes } from '../../constants/sizes';

const SearchScreen = ({ navigation }: any) => {
  const [keySearch, setKeySearch] = useState('');
  return (
    <Container
      bg={colors.background}
      back
      center={
        <InputComponent
          styles={{
            backgroundColor: colors.background1,
            paddingVertical: 12,
            paddingHorizontal: 26,
            borderRadius: 5,
            flex: 1,
            marginLeft: 10,
            top: 8,
          }}
          prefix={<SearchNormal1 color={colors.text} size={26} />}
          color={colors.background1}
          affix={
            <TouchableOpacity
              onPress={() => navigation.navigate('FilterScreen')}
            >
              <Setting5 size={26} color={colors.text} />
            </TouchableOpacity>
          }
          value={keySearch}
          placeholder="Search keywords..."
          placeholderTextColor={colors.text}
          textStyles={{
            color: colors.text,
          }}
          onChange={val => setKeySearch(val)}
        />
      }
    >
      <SectionComponent
        styles={{
          backgroundColor: colors.background1,
          flex: 1,
          paddingVertical: 16
        }}
      >
        <TextComponent
          text="Search History"
          size={sizes.thinTitle}
          font={fontFamillies.poppinsSemiBold}
        />
      </SectionComponent>
    </Container>
  );
};

export default SearchScreen;
