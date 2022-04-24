import React, {useState, useEffect} from 'react';
import {Image, Linking} from 'react-native';
import {
  Card,
  CardItem,
  Thumbnail,
  Text,
  Button,
  Icon,
  Left,
  Body,
  Right,
} from 'native-base';
import database from '@react-native-firebase/database';



const Post = ({item, userDetails}) => {

    const [upvote, setUpvote] = useState(0)
    const [downvote, setDownvote] = useState(0)

    useEffect(() => {
      console.log(item)

      if (item.vote) {
        let upVote = 0
        let downVote = 0

        Object.values(item.vote).map((val) => {
          if (val.upvote) {
            upVote += 1
          }

          if (val.downvote) {
            downVote += 1
          }
        })

        setUpvote(upVote)
        setDownvote(downVote)
      }


    }, [item])

    const upVotePost = () => {
      database()
        .ref(`/posts/${item.id}/vote/${userDetails.uid}`)
        .set({
          upvote: 1
        })
        .then(() => console.log('UPVOTED'))
    }

    const downVotePost = () => {
      database()
        .ref(`/posts/${item.id}/vote/${userDetails.uid}`)
        .set({
          downvote: 1
        })
        .then(() => console.log('DOWNVOTED'))
    }

    const getDate = () => {
      let date = new Date(item.date)
      let day = date.getDate()
      let month = date.getMonth() + 1
      let year = date.getFullYear()

      return `${day}/${month}/${year}`
    }

    

    return (
      <Card
        style={{
          backgroundColor: '#4B7BE5',
          borderColor: '#4B7BE5',
        }}>
        <CardItem
          style={{
            backgroundColor: 'transparent',
          }}>
          <Left>
            <Thumbnail source={{uri: item.userImage}} small />
            <Body>
              <Text
                style={{
                  color: '#eee',
                  fontWeight: 'bold',
                }}>
                {item.by}
              </Text>

              <Text 
                style={{
                  color: '#eee',
                  fontSize: 12,
                }}
              >{item.location}</Text>
              <Text
              style={{
                color: '#eee',
                fontSize: 12,
              }}>{getDate()}</Text>
            </Body>
          </Left>
        </CardItem>
        <CardItem cardBody>
          <Image
            source={{uri: item.picture}}
            style={{height: 250, width: null, flex: 1}}
          />
        </CardItem>
        <CardItem
          cardBody
          style={{
            backgroundColor: 'transparent',
          }}>
          <Text
            numberOfLines={2}
            style={{
              color: '#fff',
              marginHorizontal: 10,
            }}>
            {item.description.substring(0, 100)} 
            {item.description.length > 100 ? '...' : ''}
          </Text>
        </CardItem>

        <CardItem
          style={{
            backgroundColor: '#4B7BE5',
          }}>
          <Left>
            <Button transparent onPress={upVotePost}>
              <Icon
                name="thumbs-up"
                type="Entypo"
                style={{fontSize: 20, color: '#fdcb9e'}}
              />
              <Text
                style={{
                  color: '#fdcb9e',
                }}>
                {upvote}
              </Text>
            </Button>
            <Button transparent onPress={downVotePost}>
              <Icon
                name="thumbs-down"
                type="Entypo"
                style={{fontSize: 20, color: '#fdcb9e'}}
              />
              <Text
                style={{
                  color: '#fdcb9e',
                }}>
                {downvote}
              </Text>
            </Button>
          </Left>
          <Right>
            <Button
              transparent
              iconLeft
              onPress={() => {
                Linking.openURL(`instagram://user?username=${item.instaId}`);
              }}>
              <Text
                style={{
                  color: '#fdcb9e',
                }}>
                Open in
              </Text>
              <Icon
                name="instagram"
                type="Feather"
                style={{fontSize: 20, color: '#fdcb9e'}}
              />
            </Button>
          </Right>
        </CardItem>
      </Card>
    );
  
}

export default Post