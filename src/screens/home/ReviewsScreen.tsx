import { AddCircle } from 'iconsax-react-native'
import React from 'react'
import { Container, ReviewItemComponent, SectionComponent } from '../../components'
import { colors } from '../../constants/colors'
import avatar1 from '../../assests/images/avatar1.png';
import avatar2 from '../../assests/images/avatar2.png';
import avatar3 from '../../assests/images/avatar3.png';
import avatar4 from '../../assests/images/avatar4.png';
import { ScrollView } from 'react-native';

const data = [
    {
        name: 'Haylie Aminoff',
        icon: avatar1,
        time: '32 minutes ago',
        star: 4.5,
        text: 'Lorem ipsum dolor sit amet, consetetur sadi sspscing elitr, sed diam nonumy'
    },
    {
        name: 'Carla Septimus',
        icon: avatar2,
        time: '40 minutes ago',
        star: 4.0,
        text: 'Lorem ipsum dolor sit amet, consetetur sadi sspscing elitr, sed diam nonumy'
    },
    {
        name: 'Carla George',
        icon: avatar3,
        time: '48 minutes ago',
        star: 5.0,
        text: 'Lorem ipsum dolor sit amet, consetetur sadi sspscing elitr, sed diam nonumy'
    },
    {
        name: 'Maren Kenter',
        icon: avatar4,
        time: '50 minutes ago',
        star: 4.5,
        text: 'Lorem ipsum dolor sit amet, consetetur sadi sspscing elitr, sed diam nonumy'
    },
    {
        name: 'Kyngra Cin',
        icon: avatar1,
        time: '1 hour ago',
        star: 3.0,
        text: 'Lorem ipsum dolor sit amet, consetetur sadi sspscing elitr, sed diam nonumy'
    },
    {
        name: 'Owemart Pre',
        icon: avatar4,
        time: '8 hours ago',
        star: 4.5,
        text: 'Lorem ipsum dolor sit amet, consetetur sadi sspscing elitr, sed diam nonumy'
    },
]
const ReviewsScreen = ({navigation}: any) => {
    return (
        <Container bg={colors.background} back title='Reviews'
            right={<AddCircle size={24} color={colors.text2} 
            onPress={() => navigation.navigate('WriteReviewScreen')}/>}>
            <SectionComponent styles={{
                flex: 1,
                backgroundColor: colors.background1,
                paddingVertical: 20,
                marginBottom: 0
            }}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    {
                        data.map((_, index) =>
                            <ReviewItemComponent
                                key={index}
                                name={_.name}
                                icon={_.icon}
                                time={_.time}
                                star={_.star}
                                text={_.text}
                            />)
                    }
                </ScrollView>
            </SectionComponent>
        </Container>
    )
}

export default ReviewsScreen