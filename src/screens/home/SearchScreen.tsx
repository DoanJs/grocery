import { Camera, SearchNormal1, Setting5 } from 'iconsax-react-native';
import React, { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import {
  Container,
  InputComponent,
  RowComponent,
  SectionComponent,
  SpaceComponent,
  TextComponent,
} from '../../components';
import { colors } from '../../constants/colors';
import { fontFamillies } from '../../constants/fontFamilies';
import { sizes } from '../../constants/sizes';
const data = ['Fresh Grocery', 'Bananas', 'cheetos', 'vegetables', 'Fruits', 'discounted items', 'Fresh vegetables']

const SearchScreen = ({ navigation }: any) => {
  const [initialHistory, setInitialHistory] = useState(data);
  const [initialMore, setInitialMore] = useState(data);
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
      <View style={{
        backgroundColor: colors.background1,
        flex: 1
      }}>
        <SectionComponent
          styles={{
            flex: 1,
            paddingVertical: 16
          }}
        >
          <RowComponent justify='space-between'>
            <TextComponent
              text="Search History"
              size={sizes.thinTitle}
              font={fontFamillies.poppinsSemiBold}
            />
            <TouchableOpacity onPress={() => setInitialHistory([])}>
              <TextComponent
                text="clear"
                font={fontFamillies.poppinsMedium}
                color={colors.blue}
              />
            </TouchableOpacity>
          </RowComponent>
          <RowComponent styles={{
            flexWrap: 'wrap'
          }}>
            {
              initialHistory.map((_, index) =>
                <TouchableOpacity
                  onPress={() => { }}
                  key={index}
                  style={{
                    backgroundColor: colors.background,
                    padding: 8,
                    borderRadius: 5,
                    marginRight: 10,
                    marginBottom: 10
                  }}>
                  <TextComponent
                    text={_}
                    font={fontFamillies.poppinsMedium}
                    size={sizes.smallText}
                    color={colors.text}
                  />
                </TouchableOpacity>
              )
            }
          </RowComponent>

          <SpaceComponent height={20} />

          <RowComponent justify='space-between'>
            <TextComponent
              text="Discover more"
              size={sizes.thinTitle}
              font={fontFamillies.poppinsSemiBold}
            />
            <TouchableOpacity onPress={() => setInitialMore([])}>
              <TextComponent
                text="clear"
                font={fontFamillies.poppinsMedium}
                color={colors.blue}
              />
            </TouchableOpacity>
          </RowComponent>
          <RowComponent styles={{
            flexWrap: 'wrap'
          }}>
            {
              initialMore.map((_, index) =>
                <TouchableOpacity
                  onPress={() => { }}
                  key={index}
                  style={{
                    backgroundColor: colors.background,
                    padding: 8,
                    borderRadius: 5,
                    marginRight: 10,
                    marginBottom: 10
                  }}>
                  <TextComponent
                    text={_}
                    font={fontFamillies.poppinsMedium}
                    size={sizes.smallText}
                    color={colors.text}
                  />
                </TouchableOpacity>
              )
            }
          </RowComponent>
        </SectionComponent>

        <SectionComponent>
          <RowComponent justify='space-between'>
            <RowComponent
              onPress={() => { }}
              justify='space-between'
              styles={{
                backgroundColor: colors.background,
                paddingVertical: 24,
                paddingHorizontal: 30
              }}>
              <Camera size={24} color={colors.text} />
              <SpaceComponent width={16} />
              <TextComponent
                text='Image Search'
                font={fontFamillies.poppinsMedium}
                color={colors.text}
              />
            </RowComponent>
            
            <RowComponent
              onPress={() => { }}
              justify='space-between'
              styles={{
                backgroundColor: colors.background,
                paddingVertical: 24,
                paddingHorizontal: 30
              }}>
              <Camera size={24} color={colors.text} />
              <SpaceComponent width={16} />
              <TextComponent
                text='Image Search'
                font={fontFamillies.poppinsMedium}
                color={colors.text}
              />
            </RowComponent>
          </RowComponent>
        </SectionComponent>
      </View>
    </Container>
  );
};

export default SearchScreen;
