/* eslint-disable no-use-before-define */
/* eslint-disable radix */
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
  ActionSheetIOS,
  Dimensions,
  FlatList,
  Modal,
  Platform,
  TouchableOpacity,
  StyleSheet,
  ViewPropTypes
} from 'react-native';
import { connectStyle } from 'native-base-shoutem-theme';

import mapPropsToStyleNames from '../utils/mapPropsToStyleNames';
import commonColor, { PLATFORM } from '../theme/variables/commonColor';

import { Text } from './Text';
import { Icon } from './Icon';
import { Left } from './Left';
import { Right } from './Right';
import { Body } from './Body';
import { ListItem } from './ListItem';

class ActionSheetContainer extends Component {
  static actionsheetInstance;
  static show(config, callback) {
    this.actionsheetInstance._root.showActionSheet(config, callback);
  }
  static hide() {
    this.actionsheetInstance._root.hideActionSheet();
  }

  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      items: []
    };
  }

  componentDidMount() {
    if (!this.props.autoHide && this.props.duration) {
      console.warn(`It's not recommended to set autoHide false with duration`);
    }
  }

  showActionSheet(config, callback) {
    if (Platform.OS === PLATFORM.IOS) {
      if (typeof config.options[0] === 'object') {
        const options = config.options;
        const filtered = options.map(item => {
          return item.text;
        });

        const filteredConfig = { ...config, options: filtered };
        ActionSheetIOS.showActionSheetWithOptions(filteredConfig, callback);
      } else {
        ActionSheetIOS.showActionSheetWithOptions(config, callback);
      }
    } else {
      this.setState({
        items: config.options,
        title: config.title,
        message: config.message,
        destructiveButtonIndex: config.destructiveButtonIndex,
        cancelButtonIndex: config.cancelButtonIndex,
        modalVisible: true,
        containerStyle: config.containerStyle,
        textStyle: config.textStyle,
        cancelButtonStyle: config.cancelButtonStyle,
        titleStyle: config.titleStyle,
        touchableBackground: config.touchableBackground,
        callback
      });
    }
  }

  hideActionSheet() {
    this.setState({ modalVisible: false });
  }

  render() {
    return (
      <Modal
        animationType={'fade'}
        transparent
        visible={this.state.modalVisible}
        onRequestClose={() => {
          this.state.callback(this.state.cancelButtonIndex);
          this.setState({ modalVisible: false });
        }}
      >
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {
            this.state.callback(this.state.cancelButtonIndex);
            this.setState({ modalVisible: false });
          }}
          style={[styles.containerTouchable,
              this.state.containerStyle]}
        >
          <TouchableOpacity activeOpacity={1} style={[styles.innerTouchable, this.state.containerStyle]}>
            {this.state.title ? (
              <Text style={[styles.touchableText, this.state.titleStyle]}>{this.state.title}</Text>
            ) : null}
            <FlatList
              style={[
                styles.flatList,
                { marginTop: this.state.title ? commonColor.marginTop : 0 }
              ]}
              data={this.state.items}
              keyExtractor={(item, index) => String(index)}
              renderItem={({ index, item }) => {
                return typeof this.state.items[0] === 'string' ? (
                  <ListItem
                    background={this.state.touchableBackground}
                    onPress={() => {
                      this.state.callback(parseInt(index));
                      this.setState({ modalVisible: false });
                    }}
                    style={styles.listItem}
                  >
                    <Text
                      style={[
                        this.state.textStyle,
                        this.state.cancelButtonIndex === index &&
                          this.state.cancelButtonStyle
                      ]}
                    >
                      {item}
                    </Text>
                  </ListItem>
                ) : (
                  <ListItem
                    background={this.state.touchableBackground}
                    onPress={() => {
                      this.state.callback(parseInt(index));
                      this.setState({ modalVisible: false });
                    }}
                    style={[
                      styles.listItem,
                      {
                        height: commonColor.listItemHeight
                      }
                    ]}
                    icon
                  >
                    <Left>
                      <Icon
                        name={item.icon}
                        style={{
                          color: item.iconColor ? item.iconColor : undefined
                        }}
                      />
                    </Left>
                    <Body style={styles.listItemBody}>
                      <Text style={[
                          this.state.textStyle,
                          this.state.cancelButtonIndex === index && this.state.cancelButtonStyle
                        ]}>{item.text}</Text>
                    </Body>
                    <Right />
                  </ListItem>
                );
              }}
            />
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    );
  }
}

ActionSheetContainer.propTypes = {
  ...ViewPropTypes,
  style: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.number,
    PropTypes.array
  ])
};

const styles = StyleSheet.create({
  containerTouchable: {
    backgroundColor: commonColor.containerTouchableBackgroundColor,
    flex: 1,
    justifyContent: 'flex-end'
  },
  flatList: {
    marginHorizontal: commonColor.marginHorizontal
  },
  innerTouchable: {
    backgroundColor: commonColor.innerTouchableBackgroundColor,
    minHeight: commonColor.minHeight,
    maxHeight: Dimensions.get('window').height / 2,
    padding: commonColor.padding,
    elevation: commonColor.elevation
  },
  listItem: {
    borderColor: commonColor.listItemBorderColor,
    marginLeft: commonColor.marginLeft
  },
  listItemBody: {
    borderColor: commonColor.listItemBorderColor,
    paddingLeft: commonColor.marginLeft / 2
  }
});

const StyledActionSheetContainer = connectStyle(
  'NativeBase.ActionSheetContainer',
  {},
  mapPropsToStyleNames
)(ActionSheetContainer);

export { StyledActionSheetContainer as ActionSheetContainer };
