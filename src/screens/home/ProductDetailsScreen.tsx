import { ArrowLeft, Heart } from 'iconsax-react-native';
import React from 'react';
import { Image, View } from 'react-native';
import lemonDetail from '../../assests/images/lemonDetail.png';
import {
  RowComponent,
  SectionComponent,
  TextComponent,
} from '../../components';
import { colors } from '../../constants/colors';
import { fontFamillies } from '../../constants/fontFamilies';
import { sizes } from '../../constants/sizes';

const ProductDetailsScreen = () => {
  // return (
  //   <View
  //     style={{
  //       backgroundColor: colors.background,
  //       flex: 1
  //     }}
  //   >
  //     <ArrowLeft
  //       size={26}
  //       color={colors.text2}
  //       onPress={() => navigation.goBack()}
  //       style={{
  //         position: 'absolute',
  //         top: 40,
  //         left: 20,
  //         zIndex: 2,
  //       }}
  //     />
  //     <Image
  //       source={lemonDetail}
  //       style={{
  //         width: sizes.width,
  //       }}
  //     />

  //     <SectionComponent styles={{
  //       flex:1,
  //       backgroundColor: colors.background1, paddingVertical: 20
  //     }} >
  //       <RowComponent justify='space-between'>
  //         <TextComponent
  //           text="$2.22"
  //           font={fontFamillies.poppinsSemiBold}
  //           size={sizes.thinTitle}
  //         />
  //         <Heart size={20} color={colors.text} />
  //       </RowComponent>
  //       <TextComponent
  //           text="Organic Lemons"
  //           font={fontFamillies.poppinsSemiBold}
  //           size={sizes.smallTitle}
  //         />
  //     </SectionComponent>
  //   </View>
  // );

  return (
    <View>
      <TextComponent text="Js" />
    </View>
  );
};

export default ProductDetailsScreen;
