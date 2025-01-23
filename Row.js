import { isEmpty as _isEmpty } from 'lodash/lang';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import {
  Image, Platform, Pressable, StyleSheet, TouchableOpacity, View,
} from 'react-native';
import {
  Button, Menu, Text, useTheme,
} from 'react-native-paper';

import moment from 'moment';

import Switch from 'react-ios-switch';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import IconActive from '../../../../../assets/icon/check-success.png';
import PdfIcon from '../../../../../assets/icon/icon_pdf.png';
import IconInfo from '../../../../../assets/icon/info.png';
import IconTimer from '../../../../../assets/icon/timer.png';
import DeleteConfirmation from '../../../../../components/DeleteConfirmation';
import TextListItem from '../../../../../components/TextListItem';
import { CUSTOM_FONTS } from '../../../../../helpers/constants';
import { theme } from '../../../../../helpers/theme';

const styles = StyleSheet.create({
  rowXL: {
    flex: 9,
    padding: 10,
  },
  rowL: {
    flex: 6,
    padding: 10,
  },
  rowSm: {
    flex: 5,
    padding: 10,
  },
  rowSSm: {
    flex: 3,
    padding: 10,
  },
  rowVsm: {
    flex: 1,
    padding: 10,
  },
  btnAction: {
    flexDirection: 'row',
    paddingLeft: 10,
    paddingRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    height: 40,
  },
});

const Row = ({
  item, index, onChangeItem, onDeleteItem, isReadOnly, onSwitch,
}) => {
  const themes = useTheme();
  const [visibleMenu, setVisibleMenu] = useState(false);
  const openMenu = () => setVisibleMenu(true);
  const closeMenu = () => setVisibleMenu(false);

  const _getStatus = () => {
    switch (item?.m_status_bap_bos_id) {
      case 1:
        return {
          label: 'Dijadwalkan',
          icon: IconInfo,
          color: theme.colors.primaryLighter,
        };

      case 2:
        return {
          label: 'Dalam Proses',
          icon: IconTimer,
          color: theme.colors.warningLighter,
        };

      default:
        return {
          label: 'Selesai',
          icon: IconActive,
          color: theme.colors.successLighter,
        };
    }
  };

  // eslint-disable-next-line max-len
  // const formatText = (_value) => (_value ? _value.replace(/\//g, ' / ').replace(/,/g, ', ').replace(/\./g, '. ') : '-');

  const dataRender = [
    {
      value: item?.id ? item?.id?.toString() : '-',
      style: styles.rowSm,
    },
    {
      value: item?.id_pusdatin ? item?.id_pusdatin?.toString() : '-',
      style: styles.rowSm,
    },
    {
      value: item?.name,
      style: styles.rowL,
    },
    {
      value: item?.created_at ? moment(item?.created_at).format('DD/MM/YYYY') : '-',
      style: styles.rowSm,
    },
    {
      value: item?.updated_at ? moment(item?.updated_at).format('DD/MM/YYYY') : '-',
      style: styles.rowSm,
    },
    {
      value: (
        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          <Switch
            checked={!item?.deleted_at ? 1 : 0}
            onChange={() => {
              onSwitch(item?.id, item?.deleted_at);
            }}
            onColor="#23C653"
            offColor="#C2C2C2"
            handleColor="white"
            style={{ marginRight: theme.gutter.spacingHalf }}
          />
          <Button
            mode="contained"
            color={theme.colors.primary}
            labelStyle={{ color: 'white' }}
            onPress={() => {
              onChangeItem(item);
            }}
            // disabled={item?.deleted_at ? 1 : 0}
          >
            Edit
          </Button>
        </View>
      ),
      style: styles.rowSm,
    },
  ];

  return (
    <View style={{ backgroundColor: 'white', borderRadius: 0 }}>
      {/* ROW */}
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        {dataRender.map((_val) => (
          <View style={_val?.style}>
            <View
              style={{ flexDirection: 'row', flexWrap: 'wrap' }}
            >
              <TextListItem>
                {_val?.value}
              </TextListItem>
            </View>
          </View>
        ))}
      </View>
    </View>

  );
};

Row.propTypes = {
  item: PropTypes.objectOf(PropTypes.any).isRequired,
  index: PropTypes.objectOf(PropTypes.any).isRequired,
  onSwitch: PropTypes.func.isRequired,
  onChangeItem: PropTypes.func.isRequired,
  onDeleteItem: PropTypes.func.isRequired,
  isReadOnly: PropTypes.bool.isRequired,
};

export default Row;
