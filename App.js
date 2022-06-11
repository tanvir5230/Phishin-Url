/* eslint-disable react-native/no-inline-styles */
import axios from 'axios';
import React, {useState, useRef} from 'react';
import {
  Text,
  TextInput,
  View,
  Button,
  Alert,
  ActivityIndicator,
} from 'react-native';

const App = () => {
  const [data, setData] = useState([]);
  const [url, setUrl] = useState('');
  const [processingStart, setprocessingStart] = useState(false);
  const inputRef = useRef();

  function fetchDataFromBackend() {
    setData('');
    setprocessingStart(true);
    axios.get(`http://192.168.0.102:3000/url?name=${url}`).then(response => {
      setData(response.data);
      setprocessingStart(false);
      inputRef.current.clear();
    });
  }
  return (
    <View style={{backgroundColor: '#1A1A40', height: 1000}}>
      <Text
        style={{
          textAlign: 'center',
          fontSize: 36,
          paddingTop: 20,
          textShadowColor: '#fff',
          textShadowOffset: {width: -1, height: 1},
          textShadowRadius: 1,
        }}>
        Phishing URL Detection APP
      </Text>
      <View style={{padding: 10, marginTop: 20}}>
        <TextInput
          style={{
            borderColor: 'gray',
            borderWidth: 1,
            borderRadius: 10,
            padding: 10,
          }}
          placeholder="Type here to enter url ...."
          onChangeText={newUrl => setUrl(newUrl.toLowerCase())}
          ref={inputRef}
        />
        <SubmitButton url={url} fetchDataFromBackend={fetchDataFromBackend} />
      </View>

      {processingStart ? <ProcessingComp /> : null}

      {data.prediction !== undefined ? (
        <Text
          style={{
            textAlign: 'center',
            fontSize: 30,
            color: '#40E0D0',
            marginTop: 20,
            padding: 10,
          }}>
          <Text style={{}}>you have entered "{url}"</Text>
          {'\n'}
          <Text style={{textAlign: 'center', fontSize: 30, color: '#ffffff'}}>
            &
          </Text>
          {'\n'}
          <Text style={{textAlign: 'center', fontSize: 30, color: '#FF7F50'}}>
            {data.prediction}
          </Text>
        </Text>
      ) : (
        <Text style={{textAlign: 'center', fontSize: 30, color: '#DE3163'}}>
          No prediction yet.
        </Text>
      )}
    </View>
  );
};

const SubmitButton = ({url, fetchDataFromBackend}) => (
  <View style={{marginTop: 20}}>
    <Button
      title="Send the URL"
      color="#f194ff"
      onPress={() => {
        if (url.length === 0) {
          Alert.alert("you haven't entered anything.");
          return;
        } else {
          fetchDataFromBackend();
        }
      }}
    />
  </View>
);

const ProcessingComp = () => (
  <View>
    <Text style={{marginTop: 10, fontSize: 30, textAlign: 'center'}}>
      processing...
    </Text>
    <ActivityIndicator />
  </View>
);

export default App;
