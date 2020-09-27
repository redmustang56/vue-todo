import Vue from 'vue'
import Vuex from 'vuex'
import { vuexfireMutations, firestoreAction } from 'vuexfire'
import { db } from '../db'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        taskList: []
    },
    mutations: {
        ...vuexfireMutations,
    },
    actions: {
        bindTaskList: firestoreAction(context => {
            return context.bindFirestoreRef('taskList', db.collection('tasklist'))
        }),
        // bindTaskList: firestoreAction(({ bindFirestoreRef }) => {
        //     return bindFirestoreRef('taskList', db.collection('tasklist'))
        // }),
        addTask: firestoreAction((context, payload) => {
            return db.collection('tasklist').add(payload)
        }),
        deleteTask: firestoreAction((context, payload) => {
            db.collection('tasklist')
                .doc(payload)
                .delete()
        }),
        taskDone: firestoreAction((context, payload) => {
            db.collection('tasklist').doc(payload.id).set({
                key: payload.key,
                status: payload.status,
                title: payload.title,
            })
        }),
    }
})

