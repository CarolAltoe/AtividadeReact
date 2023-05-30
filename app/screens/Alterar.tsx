import { faTachometerFast } from '@fortawesome/free-solid-svg-icons';
import React, { useEffect, useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { firestore } from 'react-native-firebase';
import { addDoc, collection, deleteDoc, doc, getDoc, onSnapshot, updateDoc } from 'firebase/firestore';
import { FIRESTORE_DB } from '../../firebaseConfig';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faTrash, faPencil, faMugSaucer } from '@fortawesome/free-solid-svg-icons';

const Alterar = ({ navigation, route }: any) => {

    const { id } = route.params;
    const [noticia, setNoticia] = useState<any>({});
    const [descricao, setDescricao] = useState<any>({});
    const [titulo, setTitulo] = useState<any>({});
    const [data, setData] = useState<any>({});
    const [imagem, setImagem] = useState<any>({});

    useEffect(() => {
        const fetchNoticia = async () => {
            const colecao = doc(FIRESTORE_DB, 'Tarefas', id);
            const colecaoSnapshot = await getDoc(colecao);
            if (colecaoSnapshot.exists()) {
                setNoticia({
                    id: colecaoSnapshot.id,
                    ...colecaoSnapshot.data()
                });
            }
        }
        fetchNoticia();
    }, []);

    const handleAtualizaTexto = (key: string, t: string) => {
        setNoticia({
            ...noticia,
            [key]: t
        })
    }


    const handleUpdateNoticia = async () => {
        const colecao = doc(FIRESTORE_DB, 'Tarefas', id);
        await updateDoc(colecao, noticia);
        navigation.navigate('Lista');
    }

    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.header}>Alterar :) </Text>

                <Text style={styles.texto}>Informe o título da noticia:</Text>
                <TextInput
                    value={noticia.title}
                    onChangeText={(t) => handleAtualizaTexto('titulo', t)}
                    style={styles.input}
                />

                <Text style={styles.texto}>Informe a descrição da noticia: </Text>
                <TextInput
                    value={noticia.description}
                    onChangeText={(t) => handleAtualizaTexto('noticia', t)}
                    style={styles.input}
                />

                <Text style={styles.texto}>Informe a data do acontecimento: </Text>     
                <TextInput
                    value={noticia.data}
                    onChangeText={(t) => handleAtualizaTexto('data', t)}
                    style={styles.input}
                />

                <Text style={styles.texto}>Comprove a vericidade da notícia com uma imagem: </Text>
                <TextInput
                    value={noticia.image}
                    onChangeText={(t) => handleAtualizaTexto('imagem', t)}
                    style={styles.input}
                />

                <Text style={styles.texto}>Marcar como concluído: </Text>
                <TextInput
                    value={noticia.done}
                    onChangeText={(t) => handleAtualizaTexto('done', t)}
                    style={styles.input}
                />

                <TouchableOpacity
                    style={styles.btnAlterar}
                    onPress={handleUpdateNoticia}
                >
                    <FontAwesomeIcon style={styles.textoBotao} icon={faPencil} />
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default Alterar;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FBE3E0',
    },
    input: {
        height: 40,
        margin: 10,
        fontSize: 18,
        borderColor: '#AAA',
        borderWidth: 1,
        borderRadius: 5,
        padding: 5,
        alignContent: 'center',
        backgroundColor: '#FAF3C5',
        marginHorizontal: 30,
    },

    header: {
        fontSize: 30,
        fontWeight: 'bold',
        alignSelf: 'center',
        marginVertical: 10,
    },

    btnAlterar: {
        backgroundColor: '#D7D2FA',
        height: 40,
        alignItems: 'center',
        marginHorizontal: 30,
        justifyContent: 'center',
        borderRadius: 5,
    },

    textoBotao: {
        color: '#FFF',
        fontWeight: 'bold'
    },

    texto:{
        marginHorizontal: 30,
        fontSize: 18,
        color: '#000',
        marginTop: 10,
        fontWeight: 'bold',
    },

});

// ... -> preserva o que ja tem dentro de array e insere os demais elementos em sequeuncia
// se não ponho os ... ele cri uma lista dentro da lista
// se ponho, ele insere os elementos como se fosse continuação da primeira lista e não uma lista dentro da outra


/*

    const handleAtualizaTitulo = (key: string, t: string) => {
        setTitulo({
            ...titulo,
            [key]: t
        })
    }

    const handleAtualizaData = (key: string, t: string) => {
        setData({
            ...data,
            [key]: t
        })
    }
    const handleAtualizaImagem = (key: string, t: string) => {
        setImagem({
            ...imagem,
            [key]: t
        })
    }





*/