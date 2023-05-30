import { addDoc, collection, deleteDoc, doc, onSnapshot } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { FIRESTORE_DB, FIRESTORE_STORAGE } from '../../firebaseConfig';
import * as ImagePicker from 'expo-image-picker';
import { getDownloadURL, ref, uploadBytes, uploadString } from 'firebase/storage';


const Cadastro = ({ navigation }: any) => {

    const [noticia, setNoticia] = useState('');
    const [titulo, setTitulo] = useState('');
    const [data, setData] = useState('');
    const [imagem, setImagem] = useState('');


    const selectImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });

        if(!result.cancelled){
            setImagem(result.uri);
        }
        
    }


    async function convertImageToBase64(uri: any) {
        const response = await fetch(uri);
        const blob = await response.blob();
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.onerror = reject;
          reader.readAsDataURL(blob);
        });
      }


    const addNoticia = async () => {
        try{
            const storageRef = ref(FIRESTORE_STORAGE, 'images/' + new Date().getTime()); 
            const response = await fetch(imagem);
            const blob = await response.blob();
                
            await uploadBytes(storageRef, blob);
            const imageUrl = await getDownloadURL(storageRef);
    
            const doc = addDoc(collection(FIRESTORE_DB, 'Tarefas'), 
            { title: titulo, description: noticia,
              data: data, imageUrl: imageUrl, done: false });

            setNoticia('');
            setTitulo('');
            setData('');
            setImagem('');
        }
        catch (error){
            alert("erro: " + error);
        }
       
    }

    return (
        <View style={styles.container}>

            <Text style={styles.texto}>Informe o título da noticia:</Text> 
            <TextInput
                placeholder="Título: "
                onChangeText={(t: string) => setTitulo(t)}
                value={titulo}
                style={styles.input}
            />

            <Text style={styles.texto}>Informe a descrição da noticia: </Text>
            <TextInput
                placeholder="Descreva a noticia: "
                onChangeText={(t: string) => setNoticia(t)}
                value={noticia}
                style={styles.input}
            />

            <Text style={styles.texto}>Informe a data do acontecimento: </Text>
            <TextInput
                placeholder="Data do acontecimento: "
                onChangeText={(t: string) => setData(t)}
                value={data}
                style={styles.input}
            />

            <Text style={styles.texto}>Comprove a vericidade da notícia com uma imagem: </Text>
            <TextInput
                placeholder="Imagem: "
                onChangeText={(t: string) => setImagem(t)}
                value={imagem}
                style={styles.input}
            />

            {  imagem != null &&
                <Image style={{width: 50, height: 50}} source={{uri:imagem}} />
            }
            
            <Button title="Selecionar arquivos" onPress={selectImage} />

            <TouchableOpacity
                onPress={() => addNoticia()}
                disabled={noticia === '' } // ta certo isso? {&& titulo === '' && data === '' && imagem === ''}
                style={styles.btnAdd}
            >
                <Text>Adicionar Noticia :) </Text>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => navigation.navigate('Lista')}
                style={styles.btnLista}
            >
                <Text> Ir para Lista :) </Text>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => navigation.navigate('CarouselCards')}
                style={styles.btnLista}
            >
                <Text> Ir para CarouselCards :) </Text>
            </TouchableOpacity>
        </View>
    );
}

export default Cadastro;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FBE3E0'
    },
    input: {
        height: 40,
        padding: 5,
        fontSize: 16,
        color: '#000',
        backgroundColor: '#FAF3C5',
        marginVertical: 10,
        marginHorizontal: 30,
        borderRadius: 5,
    },

    btnAdd: {
        backgroundColor: "#D7D2FA",
        height: 40,
        marginHorizontal: 30,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        margin: 5
    },

    btnLista: {
        backgroundColor: '#D7D2FA',
        height: 40,
        marginHorizontal: 30,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        margin: 5
    },

    texto:{
        marginHorizontal: 30,
        fontSize: 18,
        color: '#000',
        marginTop: 10,
        fontWeight: 'bold',
    },

});



{/*
 <Button
                title="Adicionar Tarefa"
                onPress={() => addTarefa()} 
                disabled = {tarefa === ''}
            />   

                   //onPress={()=> ExcluirElemento(tarefa.id)}
*/}