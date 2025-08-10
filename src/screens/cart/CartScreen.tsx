import { View, Text } from 'react-native'
import React from 'react'
import { Container, SectionComponent, TextComponent } from '../../components'
import { colors } from '../../constants/colors'

const CartScreen = () => {
  return (
    <Container bg={colors.background} back title='Shopping Cart'>
      <SectionComponent>
        <TextComponent text='Js'/>
      </SectionComponent>
    </Container>
  )
}

export default CartScreen