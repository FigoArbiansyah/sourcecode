import React from 'react';
import { ScrollView, useWindowDimensions, View } from 'react-native';
import { Divider, Text } from 'react-native-paper';
import { useRoute } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { GedungViewMaxHeight } from '../../../helpers/utils';
import Breadcrumb from '../../../components/Breadcrumb';
import TextDisplay3 from '../../../components/Text/Thypography/TextDisplay3';
import ButtonAdd from '../../../components/ButtonAdd';
import ShimmerElement from '../../../components/ShimmerElement';
import Item from './components/ListTable/Item';
import ModalForm from './ModalForm';
import authSelector from '../../../store/selectors/auth';
import { API_ENDPOINTS } from '../../../helpers/constants';
import ApiRequest from '../../../helpers/apiRequest';

const JurusanProdi = () => {
  // const { height: dimensionsHeight } = useWindowDimensions();
  const route = useRoute();
  const dimensions = useWindowDimensions();
  const [data, setData] = React.useState([]);
  const [metadata, setMetadata] = React.useState();
  const [itemBeingEdited, setItemBeingEdited] = React.useState();
  const [formIsOpen, setFormIsOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const auth = useSelector(authSelector);

  const _fetchData = async () => {
    setLoading(true);
    try {
      const headers = {
        Authorization: `Bearer ${auth?.data?.token}`,
      };

      let url = `${API_ENDPOINTS.personnels}/study-programs?page=${
        route?.params?.page ?? 1
      }`;
      if (route?.params?.per_page) {
        url += `&per_page=${route?.params?.per_page}`;
      }
      if (route?.params?.q) {
        url += `&q=${route?.params?.q}`;
      }
      if (route?.params?.status && ['active', 'inactive']?.includes(route?.params?.status)) {
        url += `&status=${route?.params?.status}`;
      }

      const request = await ApiRequest.get(url, headers);
      if (request && request.status === 200) {
        const response = await request.json();

        console.log('testingggggg', response);
        setData(response.results);
        setMetadata(response?.metadata);
      } else {
        throw Error();
      }
    } catch (e) {
      console.log('e', e);
      setData([]);
      setMetadata();
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    _fetchData();
  }, [route.params]);

  return (
    <View style={{ maxHeight: GedungViewMaxHeight(dimensions.height) }}>
      <ScrollView>
        <View
          style={{
            padding: 20,
            paddingHorizontal: 40,
          }}
        >
          <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
            <Breadcrumb
              items={[
                {
                  name: 'Home',
                  icon: 'home',
                  linkTo: '/dashboard',
                },
                {
                  name: 'Master Data',
                },
                {
                  name: 'Jurusan & Prodi',
                  leaf: true,
                },
              ]}
            />
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <TextDisplay3>Jurusan Prodi</TextDisplay3>
            <ButtonAdd
              onPress={() => {}}
            />
          </View>
          <View style={{ paddingVertical: 20 }}>
            <Divider />
          </View>
          <>
            <ShimmerElement
              loading={loading}
              options={{ height: 250 }}
            >
              <Item
                data={data}
                onSort={() => {}}
                onChangeItem={(itemData) => {
                  setItemBeingEdited({
                    ...itemData,
                    prodi: itemData?.name,
                    id_pusdatin: itemData?.id_pusdatin?.toString(),
                  });
                  setFormIsOpen(true);
                  console.log('edit data !!');
                }}
                onSwitch={() => {}}
                onDeleteItem={(itemData, _onSucc, _onErr) => {
                  // deleteItem(itemData, _onSucc, _onErr);
                }}
                isReadOnly={false}
                routeParams={route?.params}
              />
            </ShimmerElement>
            <ModalForm
              key={formIsOpen}
              isOpen={formIsOpen}
              data={itemBeingEdited}
              onCancel={() => {
                setFormIsOpen(false);
              }}
              onSave={(values, _onSuccess, _onError) => {
                // _handleSave(values, _onSuccess, _onError);
              }}
              auth={auth}
              isReadOnly={false}
            />
          </>
        </View>
      </ScrollView>
    </View>
  );
};

export default JurusanProdi;
