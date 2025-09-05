import { where } from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import { ArrowDown2, ArrowUp2 } from 'iconsax-react-native';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import {
  RowComponent,
  SectionComponent,
  SpaceComponent,
  TextComponent,
} from '.';
import myOrder from '../assests/images/myOrder.png';
import { colors } from '../constants/colors';
import { fontFamillies } from '../constants/fontFamilies';
import { getDocsData } from '../constants/getDocsData';
import { sizes } from '../constants/sizes';
import { FulfillmentModel } from '../models/FulfillmentModel';
import { OrderModel } from '../models/OrderModel';
import useFulfillmentStore from '../zustand/store/useFulfillmentStore';
import useProductStore from '../zustand/store/useProductStore';

interface Props {
  order: OrderModel;
  notMore?: boolean;
}

const data = [
  {
    title: 'Order placed',
    description: 'Oct 19 2021',
    status: true,
  },
  {
    title: 'Order confirmed',
    description: 'Oct 20 2021',
    status: true,
  },
  {
    title: 'Order shipped',
    description: 'Oct 20 2021',
    status: true,
  },
  {
    title: 'Out for delivery',
    description: 'pending',
    status: false,
  },
  {
    title: 'Order delivered',
    description: 'pending',
    status: false,
  },
];
const OrderItemComponent = (props: Props) => {
  const navigation: any = useNavigation();
  const { products } = useProductStore();
  const { order, notMore } = props;
  const [isShow, setIsShow] = useState(false);
  const [fulfillments, setFulfillments] = useState<FulfillmentModel[]>([]);
  const { setFulfillment } = useFulfillmentStore()

  useEffect(() => {
    if (fulfillments) {
      setFulfillment(fulfillments[0])
    }
  }, [fulfillments])

  useEffect(() => {
    if (order) {
      getDocsData({
        nameCollect: 'fulfillments',
        condition: [where('orderId', '==', order.id)],
        setData: setFulfillments,
      });
    }
  }, [order]);

  const showTime = (title: string) => {
    let time: any
    switch (title) {
      case 'Order placed':
        time = fulfillments[0].placed
      case 'Order confirmed':
        time = fulfillments[0].confirmed
      case 'Order shipped':
        time = fulfillments[0].shipped
      case 'Order delivery':
        time = fulfillments[0].delivery
      default:
        time = fulfillments[0].delivered
    }

    return (title === 'Order delivery' && fulfillments[0].delivery === fulfillments[0].placed)
      || (title === 'Order delivered' && fulfillments[0].delivered === fulfillments[0].placed)
      ? 'Pending' : moment(time.toDate()).format('MMM D YYYY')
  }

  const handleCalculate = () => {
    let subTotal: number = 0;
    if (order.cartIds.length > 0) {
      order.cartIds.map((cartId: any) => {
        const index = products.findIndex(product => product.id === cartId);

        subTotal += Number(products[index].price);
      });
    }

    return subTotal;
  };

  return (
    <View style={{ marginVertical: isShow ? 0 : 6 }}>
      <RowComponent
        justify="space-between"
        onPress={
          !notMore ? () => navigation.navigate('TrackOrderScreen') : undefined
        }
        styles={{
          backgroundColor: colors.background,
          padding: 20,
        }}
      >
        <View
          style={{
            backgroundColor: colors.primaryLight,
            padding: 16,
            borderRadius: 100,
            marginRight: 16,
          }}
        >
          <Image
            source={myOrder}
            style={{
              width: 40,
              height: 40,
              resizeMode: 'contain',
            }}
          />
        </View>

        <RowComponent
          styles={{
            flexDirection: 'column',
            alignItems: 'flex-start',
            flex: 1,
          }}
        >
          <TextComponent
            text={`Order #${order.id.length > 10
              ? order.id.substring(0, 10) + '...'
              : order.id
              }`}
            size={sizes.bigText}
            font={fontFamillies.poppinsSemiBold}
          />
          <TextComponent
            text={`Placed on ${moment(order?.createAt?.toDate()).format(
              'MMMM D YYYY',
            )}`}
            size={sizes.text}
            color={colors.text}
            font={fontFamillies.poppinsMedium}
          />
          <RowComponent>
            <RowComponent>
              <TextComponent text="Items: " size={sizes.smallText} />
              <TextComponent
                text={`${order.cartIds.length}`}
                size={sizes.smallText}
                font={fontFamillies.poppinsSemiBold}
              />
            </RowComponent>
            <SpaceComponent width={24} />
            <RowComponent>
              <TextComponent text="Price: " size={sizes.smallText} />
              <TextComponent
                text={`${handleCalculate() +
                  (order.method === 'Next Day Delivery' ? 5 : 3)
                  }`}
                size={sizes.smallText}
                font={fontFamillies.poppinsSemiBold}
              />
            </RowComponent>
          </RowComponent>
        </RowComponent>

        {!notMore && (
          <TouchableOpacity
            onPress={() => setIsShow(!isShow)}
            style={{
              padding: 1,
              borderWidth: 1,
              borderColor: colors.primary,
              borderRadius: 100,
            }}
          >
            {isShow ? (
              <ArrowUp2 variant="Bold" size={20} color={colors.primary} />
            ) : (
              <ArrowDown2 variant="Bold" size={20} color={colors.primary} />
            )}
          </TouchableOpacity>
        )}
      </RowComponent>

      {isShow && (
        <>
          <View
            style={{
              height: 1,
              width: '100%',
              backgroundColor: colors.border,
            }}
          />

          <SectionComponent
            styles={{
              backgroundColor: colors.background,
              padding: 20,
            }}
          >
            {data.map((_, index) => (
              <View
                key={index}
                style={{
                  marginBottom: 8,
                }}
              >
                <RowComponent justify="space-between">
                  <View
                    style={{
                      height: 10,
                      width: 10,
                      borderRadius: 100,
                      backgroundColor: _.status
                        ? colors.primary
                        : colors.border,
                      marginRight: 10,
                    }}
                  />
                  <TextComponent
                    flex={1}
                    text={_.title}
                    font={fontFamillies.poppinsSemiBold}
                  />
                  <TextComponent
                    text={`${showTime(`Order ${_.title}`)}`}
                    color={colors.text}
                  />
                </RowComponent>
                {index > 0 && (
                  <View
                    style={{
                      height: 26,
                      width: 2,
                      backgroundColor: _.status
                        ? colors.primary
                        : colors.border,
                      position: 'absolute',
                      top: -14,
                      left: 4,
                    }}
                  />
                )}
              </View>
            ))}
          </SectionComponent>
        </>
      )}
    </View>
  );
};

export default OrderItemComponent;
