import { addDoc, collection, deleteDoc, doc, onSnapshot } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import {View, Text, Button, TextInput, TouchableOpacity, StyleSheet} from 'react-native';
import { FIRESTORE_DB } from '../../firebaseConfig';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faTrash, faPencil, faMugSaucer } from '@fortawesome/free-solid-svg-icons';


const Lista = ({navigation}:any) => {

    const [noticias, setNoticias] = useState<any[]>([]);

    useEffect( () => {
        const NoticiasRef = collection(FIRESTORE_DB, "Tarefas");

        const subscriber = onSnapshot (NoticiasRef, {  
            //onSnapshot -. atualiza dados em tempo real no firebase e tras a aplicação
            next: (snapshot) => {
                //enquanto ha noticias, percorro trazendo os dados e jogando no array
                const noticias: any[] = [];
                snapshot.docs.forEach( doc => {
                    noticias.push({
                        id: doc.id,
                        ...doc.data(),
                    })
                })
                setNoticias(noticias);
            }
        })
        return () => subscriber();
    }, []);

    const ExcluirElemento = async (id: any) => {
        try{
            //collection premite recupetar os dados do banco -> como se fosse select * from
            const colecao = collection(FIRESTORE_DB, "Tarefas"); 
            const elemento = doc(colecao, id);
            await deleteDoc(elemento);
            alert ("Elemento Excluído!");
        } catch (error){
            alert ("Falha ao excluir!" + error)
        }
    }


    const AlterarElemento = async (id: any) => {
        navigation.navigate('Alterar', {id});
    }

    return (

        <View style={styles.container}>
            <Text style={styles.header}>Lista :) </Text>
            <View>
                {noticias.map((noticia) => (
                    <View style={styles.listagem}>
                        <Text key={noticia.id} style={styles.texto} >{noticia.title}</Text>
                        <Text key={noticia.id} style={styles.texto} >{noticia.description}</Text>
                        <Text key={noticia.id} style={styles.texto} >{noticia.data}</Text>
                        <Text key={noticia.id} style={styles.texto} >{noticia.imagem}</Text>
                        <View style={styles.botoes}>
                            <TouchableOpacity 
                                onPress={()=> ExcluirElemento(noticia.id)}
                                style={styles.botaoExcluir}
                                >
                                <FontAwesomeIcon style={styles.textoBotao} icon={ faTrash } />
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={()=> AlterarElemento(noticia.id)}
                                style={styles.botaoAlterar}
                                >
                                <FontAwesomeIcon style={styles.textoBotao} icon={ faPencil } />
                            </TouchableOpacity>
                        </View> 
                    </View>
                ))}  
                  
            </View>       
        </View>
    );
}


export default Lista;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FBE3E0',
    },
    listagem:{
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 200,
        marginVertical: 10,
        justifyContent: 'space-between',
        backgroundColor: '#FAF3C5',
        padding: 10,
        borderRadius: 5,
        //display: 'flex'
    },
    botaoExcluir: {
        backgroundColor: '#D7D2FA',
        width: 100,
        height: 40,
        alignItems: 'center',
        marginHorizontal: 30,
        justifyContent: 'center',
        borderRadius: 5,
    },

    botaoAlterar: {
        backgroundColor: '#D7D2FA',
        width: 100,
        height: 40,
        alignItems: 'center',
        marginHorizontal: 30,
        justifyContent: 'center',
        borderRadius: 5,
        marginLeft: 10,
    },

    textoBotao: {
        color: '#FFF',
        fontWeight: 'bold'
    },
    header:{
        fontSize: 30,
        fontWeight: 'bold',
        alignSelf: 'center',
        marginVertical: 10,
    },

    botoes:{
        flexDirection: 'row',
    },

    texto:{
        marginHorizontal: 30,
        fontSize: 18,
        color: '#000',
        marginTop: 10,
    },
});