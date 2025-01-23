import PropTypes from 'prop-types';
import React, { useState } from 'react';
import {
  Image, StyleSheet, View,
} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import {
  Text,
} from 'react-native-paper';
import DocumentIcon from '../../../../../assets/icon/filex.png';
import { theme } from '../../../../../helpers/theme';
// import InfoIcon from '../../../../../assets/icon/info.png';
import Row from './Row';
import ResponsiveTable from '../../../../../components/ResponsiveTable';
import ListSeparator from '../../../../../components/ListSeparator';
import Head from '../Header';

const styles = StyleSheet.create({
  rowXL: {
    flex: 9,
    // alignItems: 'flex-start',
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
});

const TableStudent = (props) => {
  const {
    data,
    onSort,
    onDeleteItem,
    onChangeItem,
    onSwitch,
    isReadOnly,
    routeParams,
  } = props;

  const dataHeader = [
    {
      label: 'ID EMIS',
      value: 'id',
      presable: false,
      style: styles.rowSm,
    },
    {
      label: 'ID PUSDATIN',
      value: 'id_pusdatin',
      presable: false,
      style: styles.rowSm,
    },
    {
      label: 'JURUSAN/PRODI',
      value: 'name',
      presable: true,
      style: styles.rowL,
    },
    {
      label: 'Tanggal Dibuat',
      value: 'created_at',
      presable: true,
      style: styles.rowSm,
    },
    {
      label: 'Tanggal Diubah',
      value: 'updated_at',
      presable: true,
      style: styles.rowSm,
    },
    {
      label: '',
      value: 'status',
      presable: true,
      style: styles.rowSm,
    },
  ];

  const [sortBy, setSortBy] = useState(routeParams?.sort_by);
  const [sortOrder, setSortOrder] = useState(routeParams?.sort_order);

  const renderItem = ({ item, index }) => (
    <Row
      item={item}
      index={index}
      onDeleteItem={(itemData, _onSucc, _onErr) => {
        onDeleteItem(itemData, _onSucc, _onErr);
      }}
      onChangeItem={(itemData) => {
        onChangeItem(itemData);
      }}
      onSwitch={onSwitch}
      isReadOnly={isReadOnly}
    />

  );

  const _renderEmpty = () => {
    const _description = 'Tidak ada data';
    return (
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          height: 300,
        }}
      >
        <Image
          source={DocumentIcon}
          style={{
            width: 120,
            height: 120,
            marginBottom: 20,
          }}
          resizeMode="cover"
        />
        <Text
          style={{
            paddingTop: theme.gutter.spacingHalf,
            color: theme.colors.textbodyTitle,
            fontstyle: 18,
            fontWeight: 'bold',
          }}
        >
          {_description}
        </Text>
      </View>
    );
  };

  return (
    <ResponsiveTable>
      <FlatList
        initialNumToRender={10}
        data={data}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        ListEmptyComponent={_renderEmpty}
        ItemSeparatorComponent={ListSeparator}
        ListHeaderComponent={(
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              height: 45,
            }}
          >
            <Head
              data={dataHeader}
              sortBy={sortBy}
              sortOrder={sortOrder}
              onSort={onSort}
              setSortBy={setSortBy}
              setSortOrder={setSortOrder}
              routeParams={routeParams}
            />
          </View>
          )}
        renderItem={
          ({ item, index }) => (renderItem({ item, index }))
        }
      />
    </ResponsiveTable>
  );
};

TableStudent.propTypes = {
  data: PropTypes.arrayOf(PropTypes.any).isRequired,
  onSort: PropTypes.func.isRequired,
  onChangeItem: PropTypes.func.isRequired,
  onDeleteItem: PropTypes.func.isRequired,
  onSwitch: PropTypes.func.isRequired,
  isReadOnly: PropTypes.bool.isRequired,
  routeParams: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default TableStudent;
