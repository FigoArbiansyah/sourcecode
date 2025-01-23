import React from 'react';
import { ScrollView, useWindowDimensions, View } from 'react-native';
import { Divider, Text } from 'react-native-paper';
import { GedungViewMaxHeight } from '../../../helpers/utils';
import Breadcrumb from '../../../components/Breadcrumb';
import TextDisplay3 from '../../../components/Text/Thypography/TextDisplay3';

const JurusanProdi = () => {
  // const { height: dimensionsHeight } = useWindowDimensions();
  const dimensions = useWindowDimensions();

  return (
    <View style={{ maxHeight: GedungViewMaxHeight(dimensions.height) }}>
      <ScrollView>
        <View
          style={{
            padding: 20,
          }}
        >
          <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
            <Breadcrumb
              containerStyle
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
          <TextDisplay3>Jurusan Prodi</TextDisplay3>
          <View style={{ paddingVertical: 20 }}>
            <Divider />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default JurusanProdi;
