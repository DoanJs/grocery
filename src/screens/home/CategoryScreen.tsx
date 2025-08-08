import { Setting5 } from 'iconsax-react-native'
import React from 'react'
import { View } from 'react-native'
import beveragesCatePng from '../../assests/images/beveragesCate.png'
import edibleOilCatePng from '../../assests/images/edibleOilCate.png'
import fruitsCatePng from '../../assests/images/fruitsCate.png'
import groceryCatePng from '../../assests/images/groceryCate.png'
import householdCatePng from '../../assests/images/householdCate.png'
import babycareCatePng from '../../assests/images/babycare.png'
import { default as vegetableCate, default as vegetablesCatePng } from '../../assests/images/vegetableCate.png'
import { CategoryItem, Container, RowComponent, SectionComponent } from '../../components'
import { colors } from '../../constants/colors'
const data = [
    {
        name: 'Vegetables',
        icon: vegetablesCatePng,
        color: colors.vegetable,
    },
    {
        name: 'Fruits',
        icon: fruitsCatePng,
        color: colors.fruit,
    },
    {
        name: 'Beverages',
        icon: beveragesCatePng,
        color: colors.beverage,
    },
    {
        name: 'Grocery',
        icon: groceryCatePng,
        color: colors.grocery,
    },
    {
        name: 'Edible oil',
        icon: edibleOilCatePng,
        color: colors.edibleOil,
    },
    {
        name: 'Household',
        icon: householdCatePng,
        color: colors.household,
    },
    {
        name: 'Babycare',
        icon: babycareCatePng,
        color: colors.babycare,
    },
];

const CategoryScreen = () => {
    return (
        <Container back bg={colors.background} title='Categories'
            right={<Setting5
                onPress={() => { }}
                size={24}
                color={colors.text2}
            />}
        >
            <View style={{
                backgroundColor: colors.background1,
                flex: 1
            }}>
                <SectionComponent styles={{
                    paddingVertical: 20
                }}>
                    <RowComponent styles={{
                        flexWrap: 'wrap'
                    }}>
                        {
                            data.map((_, index) =>
                                <CategoryItem
                                    key={index}
                                    bg={_.color}
                                    srcImage={_.icon}
                                    text={_.name}
                                    styles={{
                                        backgroundColor: colors.background,
                                        width: '30%',
                                        paddingVertical: 16,
                                        borderRadius: 5,
                                        marginBottom: 16
                                    }}
                                    imgStyles={{
                                        paddingVertical: 20,
                                        paddingHorizontal: 20
                                    }}
                                />
                            )
                        }

                    </RowComponent>
                </SectionComponent>
            </View>
        </Container>
    )
}

export default CategoryScreen