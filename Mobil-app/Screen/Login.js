import { Button, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { Formik } from 'formik';
import * as Yup from 'yup';
import React from 'react'
import { apiUrl } from '../Constantes';

const Login = ({ navigation }) => {

  const SignupSchema = Yup.object().shape({
    lastname: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Your First name\'s required !'),
    firstname: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Your Last name\'s required !'),
    password: Yup.string()
      .min(8, 'Too Short!')
      .max(50, 'Too Long!')
      .matches(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
        'Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character, and must be at least 8 characters long.'
      )
      .required('A password\'s required !'),
    confirmPassword: Yup.string()
      .min(8, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required')
      .oneOf([Yup.ref('password'), null], 'Passwords must match'),
    email: Yup.string()
      .email('Invalid Email')
      .required('Your email\'s required'),
  });

  const createUser = async (userData) => {
    try {
      const url = "http://192.168.102.93:5000/api/users/register";
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        console.log('User created successfully');
        navigation.navigate('Login');
      } else {
        console.error('Failed to create the user');
      }
    } catch (error) {
      console.error('Error creating the user:', error);
    }
  };


  return (
    <View style={styles.safeview}>
      <Image source={require('../assets/Gozem.png')} style={styles.logo} />
      <View style={styles.formSection}>
        <View style={{ flex: 1 }}>
          <Formik
            validationSchema={SignupSchema}
            initialValues={{
              lastname: '',
              firstname: '',
              password: '',
              confirmPassword: '',
              email: '',
            }}
            onSubmit={async (values, { setSubmitting }) => {
              const { lastname, firstname, email, password } = values;
              const userData = {
                lastname,
                firstname,
                email,
                password,
              };
              console.log(userData);
              await createUser(userData);
              setSubmitting(false);
            }}
          >
            {({ handleSubmit, values, errors, touched, handleChange, isValid, setFieldTouched, handleBlur }) => (
              <View>
                <View style={{ display: 'flex', flexDirection: "row", alignItems: "center", marginTop: 5 }}>
                  <Text style={{ textAlign: 'left' }}>
                    Email
                  </Text>
                  {touched.email && errors.email && <Text style={styles.erro}>({errors.email})</Text>}
                </View>

                <TextInput
                  name="email"
                  placeholder='   Doe@gmail.com'
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                  style={styles.input}
                />

                <Text style={{ textAlign: 'left', marginTop: 5 }}>
                  Password
                </Text>
                <TextInput
                  name="password"
                  placeholder='   ******'
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                  style={styles.input}
                />

                {touched.password && errors.password && <Text style={styles.erro}>{errors.password}</Text>}

                <View style={{ justifyContent: 'center', alignItems: 'center', marginTop:20 }}>
                  <TouchableOpacity style={styles.signupButton} onPress={handleSubmit}>
                    <Text style={{ textAlign: 'center', color: 'white' }}>
                      Sign In
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </Formik>
        </View>

      </View>
    </View>
  )
}

export default Login

const styles = StyleSheet.create({
  safeview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: "#179138",
    position: "relative"
  },
  logo: {
    height: 300,
    width: 300,
    marginVertical:45

  },
  formSection: {
    height: 400,
    width: "100%",
    backgroundColor: "white",
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    padding: 20,
    paddingTop:60,
    justifyContent:'center'
  },
  textH: {
    fontSize: 25,
    textAlign: 'center',
    color: 'black',
  },
  input: {
    height: 50,
    backgroundColor: "#f8fafc",
    borderRadius: 20,
    padding: 4,
    marginVertical: 10
  },
  signupButton: {
    display: 'flex',
    marginTop: 20,
    backgroundColor: "#179138",
    height: 45,
    width: 124,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20
  },
  erro: {
    color: "black",
    marginHorizontal: 10
  }
})