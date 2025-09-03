import { Box, Diagram, Driving, ShieldTick, Xrp } from 'iconsax-react-native';
import React from 'react';
import { View } from 'react-native';
import { BtnShadowLinearComponent, Container, OrderItemComponent, RowComponent, SectionComponent, TextComponent } from '../../components';
import { colors } from '../../constants/colors';
import { fontFamillies } from '../../constants/fontFamilies';
import { sizes } from '../../constants/sizes';
import useShippingSettingStore from '../../zustand/store/useShippingSetting';

const data = [
  {
    title: 'Order Placed',
    description: 'Octobar 21 2021',
    icon: (color: string | undefined) => <Box size={40} color={color ?? colors.primary} />
  },
  {
    title: 'Order Confirmed',
    description: 'Octobar 21 2021',
    icon: (color: string | undefined) => <ShieldTick size={40} color={color ?? colors.primary} />
  },
  {
    title: 'Order Shipped',
    description: 'Octobar 21 2021',
    icon: (color: string | undefined) => <Diagram size={40} color={color ?? colors.primary} />
  },
  {
    title: 'Out for Delivery',
    description: 'Pending',
    icon: (color: string | undefined) => <Driving size={40} color={color ?? colors.primary} />
  },
  {
    title: 'Order Delivered',
    description: 'Pending',
    icon: (color: string | undefined) => <Xrp size={40} color={color ?? colors.primary} />
  },
]
const TrackOrderScreen = ({ navigation }: any) => {

  const { shippingSetting } = useShippingSettingStore()
  console.log(shippingSetting)
  return (
    <Container bg={colors.background} back title='Track Order'>
      <SectionComponent styles={{
        backgroundColor: colors.background1,
        flex: 1,
        marginBottom: 0
      }}>
        <OrderItemComponent
          code='Order #34534'
          notMore={true}
        />

        <View style={{
          backgroundColor: colors.background,
          paddingLeft: 20
        }}>
          {
            data.map((_, index) =>
              <RowComponent key={index} styles={{
                marginVertical: 16
              }}>
                <View style={{
                  backgroundColor: _.description === 'Pending' ? colors.border : colors.primaryLight,
                  padding: 16,
                  borderRadius: 100,
                  marginRight: 16,
                }}>
                  {_.icon(_.description === 'Pending' ? colors.text : undefined)}
                  {
                    index !== data.length - 1 &&
                    <View style={{
                      position: 'absolute',
                      height: '100%',
                      width: 1,
                      backgroundColor: colors.border,
                      bottom: '-100%',
                      left: '90%'
                    }} />
                  }
                </View>

                <View style={{
                  borderBottomWidth: index === data.length - 1 ? 0 : 1,
                  borderBottomColor: colors.border,
                  flex: 1,
                  paddingVertical: 20
                }}>
                  <TextComponent
                    text={_.title}
                    size={sizes.bigText}
                    font={fontFamillies.poppinsSemiBold}
                  />
                  <TextComponent
                    text={_.description}
                    size={sizes.smallText}
                    color={colors.text}
                    font={fontFamillies.poppinsMedium}
                  />
                </View>
              </RowComponent>)
          }

        </View>
      </SectionComponent>

      <SectionComponent>
        <BtnShadowLinearComponent
          title='Go shopping'
          onPress={() => navigation.navigate('Main', {
            screen: 'Home',
            params: {
              screen: 'HomeScreen',
            },
          })}
        />
      </SectionComponent>
    </Container>
  )
}

export default TrackOrderScreen