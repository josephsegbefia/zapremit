import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
const TransferProgressTabs = ({ title, date, loading, subtitle }) => {
  return (
    <TouchableOpacity
      // key={index}
      onPress={() => {
        // handle onPress
      }}
    >
      <View style={styles.card}>
        <View style={styles.cardIcon}>
          <FontAwesome5 name='check-circle' size={24} color='green' />
        </View>
        <View style={styles.cardDelimiter}>
          {/* {index !== items.length - 1 && ( */}
          <View style={styles.cardDelimiterLine} />
          {/* )} */}
          <View
            style={[
              styles.cardDelimiterInset,
              // !end && { backgroundColor: '#ffcb05' },
            ]}
          />
        </View>
        <View style={styles.cardBody}>
          <View style={styles.cardBodyContent}>
            <View className='flex-row justify-between'>
              <Text style={styles.cardTitle}>{title}</Text>
              {loading && <ActivityIndicator color='#FF9C01' size='small' />}
            </View>

            {subtitle && <Text style={styles.cardSubtitle}>{subtitle}</Text>}
            <Text style={styles.cardDates}>{date}</Text>
            {/* <Text style={styles.cardDates}>{`${start.toLocaleString(
                  'en-US',
                  {
                    month: 'short',
                    year: 'numeric',
                  }
                )} - ${
                  end
                    ? end.toLocaleString('en-US', {
                        month: 'short',
                        year: 'numeric',
                      })
                    : 'Present'
                }`}</Text> */}
          </View>
          {/* <View style={styles.cardBodyAction}>
                <FeatherIcon color='#181818' name='arrow-right' size={16} />
              </View> */}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default TransferProgressTabs;

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardDelimiter: {
    position: 'relative',
    width: 60,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'stretch',
  },
  cardDelimiterLine: {
    position: 'absolute',
    left: 30,
    top: '50%',
    borderLeftWidth: 1,
    borderColor: '#FF9C01',
    height: '100%',
    zIndex: 1,
  },
  cardDelimiterInset: {
    width: 12,
    height: 12,
    borderWidth: 3,
    borderRadius: 9999,
    backgroundColor: '#fff',
    borderColor: '#FF9C01',
    zIndex: 9,
    position: 'relative',
  },
  cardBody: {
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  cardBodyContent: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#004d40',
    marginBottom: 3,
  },
  cardSubtitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#FF9C01',
    marginBottom: 3,
  },
  cardDates: {
    fontSize: 14,
    fontWeight: '500',
    color: '#ababab',
  },
  cardBodyAction: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    maxWidth: 28,
    alignItems: 'flex-end',
  },
});
