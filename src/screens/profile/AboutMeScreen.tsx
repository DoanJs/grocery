import React from 'react'
import { Text, View } from 'react-native'
import { Container } from '../../components'
import { colors } from '../../constants/colors'

const AboutMeScreen = () => {
    return (
        <Container bg={colors.background} back title='About me'>
            <Text>AboutMeScreen</Text>
        </Container>
    )
}

export default AboutMeScreen