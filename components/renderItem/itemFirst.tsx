import {Box, Text} from '~/theme';
import {Button} from '~/components/Button';
import {FlatList, Image, View} from 'react-native';
import {AnimatedRef} from "react-native-reanimated";

type ItemFirstProps = {
    flatListRef: AnimatedRef<FlatList>
}

export default function ItemFirst({flatListRef}: ItemFirstProps) {

    const handleNextScreen = () => {
        flatListRef.current?.scrollToIndex({index: 1});
    };

    return (
        <>
            <Box height="100%">
                <Box style={{paddingHorizontal: 40, paddingTop: 90}} gap="l_32">
                    <View>
                        <Text variant="extra_large">Take care of your plant...</Text>
                        <Text variant="extra_large" color="darkGreen">
                            virtually
                        </Text>
                    </View>
                    <Button label="Let's plant" onPress={handleNextScreen}/>
                </Box>
                <Image
                    source={require('~/assets/plants_on_pots.png')}
                    style={{
                        resizeMode: 'contain',
                        height: 340,
                        aspectRatio: 1,
                        alignSelf: 'flex-end',
                    }}
                />
            </Box>
        </>
    );
}
