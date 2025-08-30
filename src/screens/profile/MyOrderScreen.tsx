import { Setting5 } from 'iconsax-react-native'
import React from 'react'
import { ScrollView } from 'react-native'
import { Container, OrderItemComponent, SectionComponent } from '../../components'
import { colors } from '../../constants/colors'


const MyOrderScreen = () => {
    return (
        <Container bg={colors.background} back title='My Order'
            right={<Setting5 size={26} color={colors.text2} />}>
            <SectionComponent styles={{
                backgroundColor: colors.background1,
                flex: 1, paddingVertical: 26,
                marginBottom: 0
            }}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <OrderItemComponent code='Order #90897' />
                    <OrderItemComponent code='Order #54908' />
                    <OrderItemComponent code='Order #34090' />
                    <OrderItemComponent code='Order #34090' />
                </ScrollView>
            </SectionComponent>
        </Container>
    )
}

export default MyOrderScreen