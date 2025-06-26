import React from 'react'
import { useTranslation } from 'react-i18next';
import { Dropdown, Div, Icon } from 'react-native-magnus';
import CustomText from '../custom/CustomText';
import { useTheme } from '../context/ThemeContext';
import colors from '../config/colors';

export default function Select_Service_Menu({ place, setServiceId, get_all_waiting_queues, setServicesModalVisible, dropdownRef }: any) {
    const { theme } = useTheme();
    const { t, i18n } = useTranslation();
    const isLight = theme === 'light';
    const bgColor = isLight ? colors.lightTheme.background : colors.darkTheme.background;
    const optionBg = isLight ? colors.lightTheme.white : colors.darkTheme.dark;
    const borderColor = isLight ? colors.lightTheme.light : colors.darkTheme.primary;
    const accent = isLight ? colors.lightTheme.primary : colors.darkTheme.primary;
    const textColor = isLight ? colors.lightTheme.primary : colors.darkTheme.white;

    return (
        <Dropdown
            ref={dropdownRef}
            title={
                <Div alignItems="center" mb={20}>
                    <Icon name="list" fontFamily="Feather" color={accent} fontSize={32} mb={10} />
                    <CustomText
                        color={textColor}
                        textAlign="center"
                        content={t('select-your-service')}
                        fontSize={20}
                        fontWeight="extrabold"
                    />
                </Div>
            }
            mt="md"
            pb="2xl"
            bg={bgColor}
            h={420}
            showSwipeIndicator={true}
            roundedTop="2xl"
            style={{ borderTopLeftRadius: 32, borderTopRightRadius: 32 }}
        >
            {place && place.services && place.services.map((service: any, idx: number) => (
                <Dropdown.Option
                    key={service._id}
                    value={service._id}
                    mb={idx === place.services.length - 1 ? 0 : 10}
                    px="xl"
                    block
                    bg={optionBg}
                    borderBottomColor={borderColor}
                    borderBottomWidth={idx === place.services.length - 1 ? 0 : 1}
                    h={70}
                    rounded={16}
                    shadow="xs"
                    flexDir="row"
                    alignItems="center"
                    onPress={() => {
                        setServiceId(service._id)
                        get_all_waiting_queues()
                        setServicesModalVisible(false)
                        dropdownRef.current.close();
                    }}
                >
                    <Icon
                        name="chevron-right"
                        fontFamily="Feather"
                        color={accent}
                        fontSize={20}
                        mr={12}
                    />
                    <CustomText
                        textTransform="uppercase"
                        fontWeight="bold"
                        fontSize={16}
                        w="100%"
                        color={textColor}
                        textAlign="left"
                        content={i18n.language === "ar" ? service.nameAr : service.nameEn}
                    />
                </Dropdown.Option>
            ))}
        </Dropdown>
    )
}
