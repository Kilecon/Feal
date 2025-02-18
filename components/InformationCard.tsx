import {Box, Text, theme, Theme} from 'theme';
import {Chips} from "~/components/Chips";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {IconProp} from "@fortawesome/fontawesome-svg-core";
import Svg, {Circle, Text as SvgText} from "react-native-svg";
import {useEffect, useState} from "react";

type InformationCardProps = {
    label: string;
    color?: keyof Theme['colors'];
    icon: IconProp;
};

export const InformationCard = ({label, color = 'green', icon}: InformationCardProps) => {

    const [circumference, setCircumference] = useState(0);

    const radius = 20;

    useEffect(() => {
        const circumferenceValue = 2 * Math.PI * radius;
        setCircumference(circumferenceValue);
    }, [radius]);
    const strokeDashoffset = circumference * (1 - 40);

    return (
        <Box
            borderRadius="base"
            backgroundColor="bgCard"
            padding="sm_12"
            flexDirection="column"
            alignItems="center"
            gap="sm_12"
        >
            <Svg width={radius * 2} height={radius * 2}>
                <Circle
                    stroke={color}
                    fill="transparent"
                    strokeWidth={2}
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    cx={radius}
                    cy={radius}
                    r={radius - 2 / 2}
                />
                <SvgText
                    x="50%"
                    y="50%"
                    textAnchor="middle"
                    alignmentBaseline="middle"
                    fontSize={radius / 2.5}
                    fill={color}
                    fontWeight="bold"
                >
                    10
                </SvgText>
            </Svg>
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
