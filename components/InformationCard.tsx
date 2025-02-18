import {Box, Text, theme, Theme} from 'theme';
import {Chips} from "~/components/Chips";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {IconProp} from "@fortawesome/fontawesome-svg-core";

type InformationCardProps = {
    label: string;
    color?: keyof Theme['colors'];
    icon: IconProp;
};

export const InformationCard = ({label, color = 'green', icon}: InformationCardProps) => {
    return (
        <Box
            borderRadius="base"
            backgroundColor="bgCard"
            padding="sm_12"
            flexDirection="column"
            alignItems="center"
            gap="sm_12"
        >
            <FontAwesomeIcon icon={icon} color={theme.colors[color]} size={16}/>
            <Box
                gap="s_8"
                flexDirection="column"
                alignItems="center">
                <Text variant="smallB">{label}</Text>
                <Chips label="10%" color={color}/>
            </Box>
        </Box>
    );
};
