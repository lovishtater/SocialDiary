import React, {useState} from 'react'
import {StyleSheet, ScrollView, Image, TouchableOpacity} from 'react-native'
import {
  GoogleSigninButton
} from '@react-native-google-signin/google-signin';
import {
    Container,
    Form,
    Item,
    Input,
    Text,
    Button,
    H3
} from 'native-base'

import Welcome from '../assets/tlogo.png'


import {connect} from 'react-redux'
import {signIn, googleSignIn} from '../action/auth';
import propTypes from 'prop-types'

const SignIn = ({navigation, signIn}) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const doSignIn = () => {
        signIn({email, password})
    }


    return (
      <Container style={styles.container}>
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
          <Image
            source={Welcome}
            style={{width: null, height: 150, marginTop: 30}}
            resizeMode="contain"
          />

          <Form style={{margin: '5%'}}>
            <Item rounded style={styles.formItem}>
              <Input
                placeholder="Enter email"
                value={email}
                style={{color: '#000'}}
                onChangeText={text => setEmail(text)}
              />
            </Item>
            <Item rounded style={styles.formItem}>
              <Input
                placeholder="Enter password"
                value={password}
                secureTextEntry={true}
                style={{color: '#000'}}
                onChangeText={text => setPassword(text)}
              />
            </Item>
            <Button rounded block onPress={doSignIn}>
              <Text>SignIn</Text>
            </Button>
            <TouchableOpacity
              onPress={() => navigation.navigate('SignUp')}
              style={{marginTop: 10}}>
              <Text style={{color: '#000', textAlign: 'center'}}>
                Do not have an account, SignUp here
              </Text>
            </TouchableOpacity>
          </Form>
          {/* <GoogleSigninButton

            style={{width: 192, height: 48 , marginLeft: "25%"}}
            size={GoogleSigninButton.Size.Wide}
            color={GoogleSigninButton.Color.Dark}
            onPress={() => googleSignIn()}
          /> */}
        </ScrollView>
      </Container>
    );
}

const mapDispatchToProps = {
    signIn: (data) => signIn(data),
    googleSignIn: () => googleSignIn()

}

SignIn.propTypes = {
    signIn: propTypes.func.isRequired,
    googleSignIn: propTypes.func.isRequired
}


export default connect(null, mapDispatchToProps)(SignIn)

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#d4ecff',
    flex: 1,
    justifyContent: 'flex-start',
  },
  heading: {
    textAlign: 'center',
    color: '#1b262c',
    marginHorizontal: 5,
    marginTop: 30,
  },
  formItem: {
    marginBottom: 20,
  },
});
  