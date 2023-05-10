import { createSlice } from '@reduxjs/toolkit'
import { v4 as uuidv4} from 'uuid';

const initialState = {
    kanaList: [],
    searchList: [],
    searchText: {
        masterpiece: '',
        kanji: '',
        kana: ''
    },
    showAddModal: false,
    showEditModal: false,
    editId: '',
    order: ['あ','い','う','え','お','か','き','く','け','こ','さ','し','す','せ','そ','た','ち','つ','て','と','な','に','ぬ','ね','の','は','ひ','ふ','へ','ほ','ま','み','む','め','も','や','ゆ','よ','ら','り','る','れ','ろ','わ','ゐ','ゑ','を','ん']
}

const sortList = (array) => {
    const kana_order = ['あ','い','う','え','お','か','き','く','け','こ','さ','し','す','せ','そ','た','ち','つ','て','と','な','に','ぬ','ね','の','は','ひ','ふ','へ','ほ','ま','み','む','め','も','や','ゆ','よ','ら','り','る','れ','ろ','わ','ゐ','ゑ','を','ん']
    array.sort((a, b) => {
        const a_index = kana_order.indexOf(a.kana);
        const b_index = kana_order.indexOf(b.kana);
        return a_index - b_index;
    });

    const kanji_array = [];
    array.forEach(obj => kanji_array.push(obj.kanji));
    const kanji_order = Array.from(new Set(kanji_order));
    array.sort((a, b) => {
        const a_index = kanji_order.indexOf(a.kanji);
        const b_index = kanji_order.indexOf(b.kanji);
        return a_index - b_index;
    })
    return array;
}

export const kanaSlice = createSlice({
    name: 'kana',
    initialState,
    reducers: {
        addCharacter: (state, action) => {
            const v4Id = uuidv4();
            state.kanaList.push({
                id: v4Id,
                ...action.payload
            })
            state.kanaList = sortList(state.kanaList);
        },
        updateCharacter: (state, action) => {
            state.kanaList = state.kanaList.map(
                kana => 
                kana.id === action.payload.id ?
                    action.payload : kana
            )
            state.kanaList = sortList(state.kanaList);
        },
        deleteCharacter: (state, action) => {
            state.kanaList = state.kanaList.filter(kana => kana.id !== action.payload);
        },
        searchCharacter: (state) => {
            state.searchList = state.kanaList.filter(
                kana => 
                    state.searchText.masterpiece === '' ? true : kana.masterpiece === state.searchText.masterpiece
                    &&
                    state.searchText.kanji === '' ? true : kana.kanji === state.searchText.kanji
                    &&
                    state.searchText.kana === '' ? true : kana.kana === state.searchText.kana
            )
        },
        updateSearchText: (state, action) => {
            state.searchText = {
                masterpiece: action.payload.masterpiece,
                kanji: action.payload.kanji,
                kana: action.payload.kana
            }
        },
        toggleAddModal: (state) => {
            state.showAddModal = !state.showAddModal;
        },
        toggleEditModal: (state, action) => {
            state.showEditModal = !state.showEditModal;
            state.showEditModal ? state.editId = action.payload : state.editId = ''
        },
    },
})

export const { 
    addCharacter, 
    updateCharacter, 
    deleteCharacter, 
    searchCharacter, 
    updateSearchText, 
    toggleAddModal, 
    toggleEditModal 
} = kanaSlice.actions

export default kanaSlice.reducer