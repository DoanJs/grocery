import {
  ArrowRotateLeft,
  Box,
  Car,
  Tag,
  TickCircle,
} from 'iconsax-react-native';
import React, { useState } from 'react';
import { View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Shadow } from 'react-native-shadow-2';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {
  BtnShadowLinearComponent,
  ButtonComponent,
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

const data = [
  {
    icon: <Tag size={20} color={colors.text} />,
    title: 'Discount',
  },
  {
    icon: <Car size={20} color={colors.text} />,
    title: 'Free shipping',
  },
  {
    icon: <Box size={20} color={colors.text} />,
    title: 'Same day delivery',
  },
];

const FilterScreen = () => {
  const [min, setMin] = useState('');
  const [max, setMax] = useState('');
  const [starSelected, setStarSelected] = useState(2);
  const [dataOther, setDataOther] = useState<string[]>([]);

  const onSelectedOther = (title: string) => {
    const newData = [...dataOther];
    const index = dataOther.findIndex(val => val === title);

    if (index !== -1) {
      newData.splice(index, 1);
    } else {
      newData.push(title);
    }

    setDataOther(newData);
  };
  const resetData = () => {
    setMin('');
    setMax(''), setDataOther([]);
    setStarSelected(2);
  };
  return (
    <Container
      bg={colors.background}
      back
      title="Apply Filters"
      right={
        <ArrowRotateLeft onPress={resetData} size={20} color={colors.text2} />
      }
    >
      <SectionComponent
        styles={{
          backgroundColor: colors.background1,
          flex: 1,
        }}
      >
        <View
          style={{
            flex: 1,
            marginVertical: 20,
          }}
        >
          <View
            style={{
              paddingTop: 16,
              paddingHorizontal: 16,
              backgroundColor: colors.background,
            }}
          >
            <TextComponent
              text="Price Range"
              font={fontFamillies.poppinsSemiBold}
              size={sizes.bigText}
            />
            <SpaceComponent height={10} />
            <RowComponent justify="space-between">
              <InputComponent
                styles={{
                  backgroundColor: colors.background1,
                  paddingVertical: 12,
                  paddingHorizontal: 26,
                  borderRadius: 5,
                  width: '48%',
                }}
                prefix={
                  <TextComponent
                    text="Min."
                    font={fontFamillies.poppinsMedium}
                    color={colors.text}
                  />
                }
                color={colors.background1}
                value={min}
                textStyles={{
                  color: colors.text,
                }}
                onChange={val => setMin(val)}
              />
              <InputComponent
                styles={{
                  backgroundColor: colors.background1,
                  paddingVertical: 12,
                  paddingHorizontal: 26,
                  borderRadius: 5,
                  width: '48%',
                }}
                prefix={
                  <TextComponent
                    text="Max."
                    font={fontFamillies.poppinsMedium}
                    color={colors.text}
                  />
                }
                color={colors.background1}
                value={max}
                textStyles={{
                  color: colors.text,
                }}
                onChange={val => setMax(val)}
              />
            </RowComponent>
          </View>

          <View
            style={{
              height: 1,
              width: '100%',
              backgroundColor: colors.border,
            }}
          />

          <View
            style={{
              padding: 16,
              backgroundColor: colors.background,
            }}
          >
            <TextComponent
              text="Star Rating"
              font={fontFamillies.poppinsSemiBold}
              size={sizes.bigText}
            />
            <RowComponent
              justify="space-between"
              styles={{
                alignItems: 'center',
                backgroundColor: colors.background1,
                padding: 16,
                marginTop: 8,
              }}
            >
              <RowComponent>
                {Array.from({ length: 5 }).map((_, index) => (
                  <FontAwesome
                    name="star"
                    key={index}
                    size={18}
                    color={
                      index <= starSelected ? colors.star : colors.background
                    }
                    style={{
                      marginRight: 2,
                    }}
                    onPress={() => setStarSelected(index)}
                  />
                ))}
              </RowComponent>
              <TextComponent
                text={`${starSelected + 1} star${starSelected + 1 > 1 ? 's' : ''
                  }`}
                font={fontFamillies.poppinsMedium}
                color={colors.text}
              />
            </RowComponent>
          </View>

          <View
            style={{
              height: 1,
              width: '100%',
              backgroundColor: colors.border,
            }}
          />

          <View
            style={{
              paddingTop: 16,
              paddingHorizontal: 16,
              backgroundColor: colors.background,
            }}
          >
            <TextComponent
              text="Others"
              font={fontFamillies.poppinsSemiBold}
              size={sizes.bigText}
            />
            {data.map((_, index) => (
              <RowComponent
                key={index}
                justify="space-between"
                styles={{
                  alignItems: 'center',
                  paddingVertical: 16,
                  borderBottomWidth: 1,
                  borderBottomColor: colors.border,
                }}
                onPress={() => onSelectedOther(_.title)}
              >
                {_.icon}
                <SpaceComponent width={20} />
                <TextComponent
                  text={_.title}
                  flex={1}
                  color={colors.text}
                  font={fontFamillies.poppinsMedium}
                />
                <TickCircle
                  size={20}
                  color={
                    dataOther.includes(_.title) ? colors.primary : colors.text
                  }
                />
              </RowComponent>
            ))}
          </View>
        </View>

        <BtnShadowLinearComponent
          title='Apply filter'
          onPress={() => { }}
        />

      </SectionComponent>
    </Container>
  );
};

export default FilterScreen;
