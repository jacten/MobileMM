import React, { Component } from 'react';
import { 
  Text, 
  View,
  ScrollView,
  StyleSheet,
  Dimensions,
  Image,
  Slider,
} from 'react-native';

import ImageScrollView from '../../globals/imageScrollView/ImageScrollview';
import DotIndicator from '../../globals/dotIndicator/DotIndicator';
import SubmitButton from '../../globals/buttons/Submit';
import turnBirthdayIntoAge from '../../../utils/turnBirthdayIntoAge';
import colors from '../../../utils/colors';

class RateItem extends Component {
  constructor() {
    super();

    this.state = {
      rating: '',
      value: 5.5,
      currentPhoto: 0,
    }
  }

  componentDidUpdate = () => {
    if (this.props.card !== this.props.target) {
      this.slider && this.slider.setNativeProps({value: 5.5})
    }
  }

  trackPhotoIndex = (photoIndex = 0) => {
    if (photoIndex !== this.state.currentPhoto) {
      this.setState({
        currentPhoto: photoIndex
      })
    }
  }

  render () {
    let { 
      ratee, 
      handleSlider, 
      handleSubmitRating,
      target,
      card,
      rating,
    } = this.props;

    if (ratee) {
      let realAge = turnBirthdayIntoAge(ratee.age);
  
      return (
        <View style={styles.container}>
          <View style={styles.imageHolder}>
            <ImageScrollView
              photos={ratee.photos}
              card={card}
              target={target}
              trackPhotoIndex={this.trackPhotoIndex}
              current={this.state.currentPhoto}
              width={width}
              height={width}
              />
          </View>
          <DotIndicator
            total={ratee.photos.length}
            current={this.state.currentPhoto}
            />
          <View style={styles.body}>
            <View style={styles.info}>
              <Text style={styles.name}>
                {ratee.firstname 
                  + ' ' +
                ratee.lastname[0]}
              </Text>
              <Text style={styles.text}>
              {realAge} years old
              </Text>
              <View style={styles.tags}>
                <Text style={styles.tag}>
                  {ratee.tags[0]} 
                </Text>
                <Text style={styles.tag}>
                  {ratee.tags[1]} 
                </Text>
                <Text style={styles.tag}>
                  {ratee.tags[2]} 
                </Text>
              </View>
              <Text style={styles.bio}>
              {`"${ratee.bio}"`}
              </Text>
            </View>
            <Text style={styles.rating}>
              {
                target === card  && !!rating || rating === 0 ? rating : `${ratee && ratee.firstname} is a...`
              }
            </Text>
            <Slider
              style={styles.slider}
              step={1}
              value={this.state.value}
              ref={r => this.slider = r}
              maximumValue={10}
              minimumValue={1}
              onValueChange={(rating) => handleSlider(rating)}
              minimumTrackTintColor={colors.s1}
              />
              <View style={styles.button}>
                <SubmitButton
                  onPress={handleSubmitRating}
                  title='Submit'
                  />
              </View>
            </View>
          </View>
      )
    } else {
      return (
        <View style={styles.container}>
          <Text style={styles.name}>
            No more people left to rate!
          </Text>
        </View>
      )
    }
    
  }
}

const {height, width} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.body,
    flex: 1,
    width: width,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: colors.text,
    fontWeight: '300',
  },
  bio: {
    color: colors.text,
    fontWeight: '300',
    fontSize: 10,
  },
  tag: {
    color: colors.body,
    backgroundColor: colors.s5,
    fontWeight: '400',
    fontSize: 12,
    padding: 5,
    borderRadius: 5,
    width: 100,
    textAlign: 'center'
  },
  name: {
    color: colors.text,
    fontWeight: '300',
    fontSize: 24,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  tags: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  slider: {
    width: width - 50,
  },
  rating: {
    fontSize: 34,
    color: colors.text,
    fontWeight: '200',
    textAlign: 'center',
  },
  imageHolder: {
    width: width, 
    height: width - 20,
    backgroundColor: colors.s5
  },
  body: {
    flex: 1,
    justifyContent: 'space-between',
    marginBottom: 10,
  }
})

export default RateItem;