import { Setting5 } from 'iconsax-react-native'
import React from 'react'
import avacodaItem from '../../assests/images/avacodaItem.png'
import broccoliItem from '../../assests/images/broccoliItem.png'
import grapesItem from '../../assests/images/grapesItem.png'
import peachItem from '../../assests/images/peachItem.png'
import pineappleItem from '../../assests/images/pineappleItem.png'
import pomegranateItem from '../../assests/images/pomegranateItem.png'
import { Container, ProductItemComponent, RowComponent, SectionComponent } from '../../components'
import { colors } from '../../constants/colors'
import { FlatList, ScrollView } from 'react-native'
const data1 = [
    {
        id: 1,
        title: 'Fresh Peach',
        description: 'dozen',
        price: '8.0',
        source: peachItem,
        sale: '16%',
    },
    {
        id: 2,
        title: 'Avacoda',
        description: '2.0 lbs',
        price: '7.0',
        source: avacodaItem,
    },
    {
        id: 3,
        title: 'Pineapple',
        description: '1.50 lbs',
        price: '9.9',
        source: pineappleItem,
    },
    {
        id: 4,
        title: 'Black Grapes',
        description: '5.0 lbs',
        price: '7.05',
        source: grapesItem,
    },
    {
        id: 5,
        title: 'Pomegranate',
        description: '1.50 lbs',
        price: '2.09',
        source: pomegranateItem,
    },
    {
        id: 6,
        title: 'Fresh B roccoli',
        description: '1 kg',
        price: '3.00',
        source: broccoliItem,
    },
];
const dataHeart = [
    {
        id: 1,
        title: 'Fresh Peach',
        description: 'dozen',
        price: 8.0,
        source: peachItem,
    },
];
const dataCart = [
    {
        id: 4,
        title: 'Black Grapes',
        description: '5.0 lbs',
        price: 7.05,
        source: grapesItem,
    },
];
const CategoryProductScreen = ({ navigation }: any) => {
    return (
        <Container bg={colors.background} back title='Vegetables'
            right={<Setting5
                onPress={() => { }}
                size={24}
                color={colors.text2}
            />}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <SectionComponent styles={{
                    backgroundColor: colors.background1,
                    paddingVertical: 16,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap'
                }}>
                    {
                        data1.map((_, index) =>
                            <ProductItemComponent
                                key={index}
                                onPress={() => navigation.navigate('ProductDetailsScreen')}
                                product={_}
                                isCart={dataCart.filter(pro => pro.id === _.id).length > 0}
                                isHeart={dataHeart.filter(pro => pro.id === _.id).length > 0}
                            />
                        )
                    }
                </SectionComponent>
            </ScrollView>
        </Container>
    )
}

export default CategoryProductScreen