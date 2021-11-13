import React from 'react';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Foundation from 'react-native-vector-icons/Foundation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import {
  ViewStyle,
  TextStyle,
  StyleProp,
  GestureResponderEvent,
  Image,
  TouchableOpacity,
} from 'react-native';
import {View} from 'react-native';
import {AppIconType} from './Types';

interface Props {
  type?: AppIconType;
  name: string | {uri: string};
  color?: string;
  size: number;
  style?: StyleProp<TextStyle> | StyleProp<ViewStyle>;
  onPress?: (e?: GestureResponderEvent) => void;
  useDefaultColors?: boolean;
}

const AppIcon = ({
  type = 'MaterialIcons',
  name = 'email',
  color = '#000',
  size = 15,
  style,
  onPress,
  useDefaultColors = false,
}: Props) => {
  const icon = name as any;
  const iconStlye = style as any;

  switch (type) {
    case 'Image':
      if (onPress) {
        return (
          <TouchableOpacity
            activeOpacity={0.5}
            hitSlop={{
              top: 10,
              left: 10,
              bottom: 10,
              right: 10,
            }}
            style={style ? style : {}}
            onPress={() => {
              onPress && onPress();
            }}>
            <Image
              source={icon}
              style={[
                {width: size, height: size},
                !useDefaultColors && {tintColor: color},
              ]}
              resizeMode={iconStlye?.resizeMode || 'contain'}
            />
          </TouchableOpacity>
        );
      }
      return (
        <View style={style ? style : {}}>
          <Image
            source={icon}
            style={[
              {width: size, height: size},
              iconStlye?.borderRadius && {borderRadius: iconStlye.borderRadius},
              iconStlye?.resizeMode && {resizeMode: iconStlye.resizeMode},
              !useDefaultColors && {tintColor: color},
            ]}
            resizeMode={iconStlye?.resizeMode || 'contain'}
          />
        </View>
      );
    case 'SimpleLineIcons':
      if (onPress) {
        return (
          <SimpleLineIcons
            name={icon}
            color={color}
            size={size}
            style={iconStlye}
            onPress={() => {
              onPress && onPress();
            }}
          />
        );
      }
      return (
        <SimpleLineIcons
          name={icon}
          color={color}
          size={size}
          style={iconStlye}
        />
      );
    case 'AntDesign':
      if (onPress) {
        return (
          <AntDesign
            name={icon}
            color={color}
            size={size}
            style={iconStlye}
            onPress={() => {
              onPress && onPress();
            }}
          />
        );
      }
      return (
        <AntDesign name={icon} color={color} size={size} style={iconStlye} />
      );
    case 'Entypo':
      if (onPress) {
        return (
          <Entypo
            name={icon}
            color={color}
            size={size}
            style={iconStlye}
            onPress={() => {
              onPress && onPress();
            }}
          />
        );
      }
      return <Entypo name={icon} color={color} size={size} style={iconStlye} />;
    case 'EvilIcons':
      if (onPress) {
        return (
          <EvilIcons
            name={icon}
            color={color}
            size={size}
            style={iconStlye}
            onPress={() => {
              onPress && onPress();
            }}
          />
        );
      }
      return (
        <EvilIcons name={icon} color={color} size={size} style={iconStlye} />
      );
    case 'Feather':
      if (onPress) {
        return (
          <Feather
            name={icon}
            color={color}
            size={size}
            style={iconStlye}
            onPress={() => {
              onPress && onPress();
            }}
          />
        );
      }
      return (
        <Feather name={icon} color={color} size={size} style={iconStlye} />
      );
    case 'FontAwesome':
      if (onPress) {
        return (
          <FontAwesome
            name={icon}
            color={color}
            size={size}
            style={iconStlye}
            onPress={() => {
              onPress && onPress();
            }}
          />
        );
      }
      return (
        <FontAwesome name={icon} color={color} size={size} style={iconStlye} />
      );
    case 'Fontisto':
      if (onPress) {
        return (
          <Fontisto
            name={icon}
            color={color}
            size={size}
            style={iconStlye}
            onPress={() => {
              onPress && onPress();
            }}
          />
        );
      }
      return (
        <Fontisto name={icon} color={color} size={size} style={iconStlye} />
      );
    case 'Foundation':
      if (onPress) {
        return (
          <Foundation
            name={icon}
            color={color}
            size={size}
            style={iconStlye}
            onPress={() => {
              onPress && onPress();
            }}
          />
        );
      }
      return (
        <Foundation name={icon} color={color} size={size} style={iconStlye} />
      );
    case 'Ionicons':
      if (onPress) {
        return (
          <Ionicons
            name={icon}
            color={color}
            size={size}
            style={iconStlye}
            onPress={() => {
              onPress && onPress();
            }}
          />
        );
      }
      return (
        <Ionicons name={icon} color={color} size={size} style={iconStlye} />
      );
    case 'MaterialCommunityIcons':
      if (onPress) {
        return (
          <MaterialCommunityIcons
            name={icon}
            color={color}
            size={size}
            style={iconStlye}
            onPress={() => {
              onPress && onPress();
            }}
          />
        );
      }
      return (
        <MaterialCommunityIcons
          name={icon}
          color={color}
          size={size}
          style={iconStlye}
        />
      );
    case 'MaterialIcons':
      if (onPress) {
        return (
          <MaterialIcons
            name={icon}
            color={color}
            size={size}
            style={iconStlye}
            onPress={() => {
              onPress && onPress();
            }}
          />
        );
      }
      return (
        <MaterialIcons
          name={icon}
          color={color}
          size={size}
          style={iconStlye}
        />
      );
    case 'Octicons':
      if (onPress) {
        return (
          <Octicons
            name={icon}
            color={color}
            size={size}
            style={iconStlye}
            onPress={() => {
              onPress && onPress();
            }}
          />
        );
      }
      return (
        <Octicons name={icon} color={color} size={size} style={iconStlye} />
      );
    case 'SimpleLineIcons':
      if (onPress) {
        return (
          <SimpleLineIcons
            name={icon}
            color={color}
            size={size}
            style={iconStlye}
            onPress={() => {
              onPress && onPress();
            }}
          />
        );
      }
      return (
        <SimpleLineIcons
          name={icon}
          color={color}
          size={size}
          style={iconStlye}
        />
      );

    default:
      if (onPress) {
        return (
          <FontAwesome
            name={icon}
            color={color}
            size={size}
            style={iconStlye}
            onPress={() => {
              onPress && onPress();
            }}
          />
        );
      }
      return (
        <FontAwesome name={icon} color={color} size={size} style={iconStlye} />
      );
  }
};

export default AppIcon;
