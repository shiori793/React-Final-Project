import { createSlice } from '@reduxjs/toolkit'
import { v4 as uuidv4} from 'uuid';

const initialState = {
    kanaList: {},
    searchList: {},
    masterpieceList: [],
    searchText: {
        masterpiece: '',
        kanji: '',
        kana: ''
    },
    showAddModal: false,
    showEditModal: false,
    editData: {},
    formData: {},
    order: ['あ','い','う','え','お','か','き','く','け','こ','さ','し','す','せ','そ','た','ち','つ','て','と','な','に','ぬ','ね','の','は','ひ','ふ','へ','ほ','ま','み','む','め','も','や','ゆ','よ','ら','り','る','れ','ろ','わ','ゐ','ゑ','を','ん']
}

export const kanaSlice = createSlice({
    name: 'kana',
    initialState,
    reducers: {
        addCharacter: (state) => {
            const v4Id = uuidv4();
            const newData = {
                ...state.formData,
                id: v4Id,
                masterpiece: state.formData.masterpiece === '' ? 'Other' : state.formData.masterpiece
            }
            if (state.kanaList.hasOwnProperty(newData.kana)){
                if (state.kanaList[newData.kana].hasOwnProperty(newData.kanji)){
                    state.kanaList[newData.kana][newData.kanji].push(newData)
                } else {
                    state.kanaList[newData.kana][newData.kanji] = [newData]
                }
            } else {
                state.kanaList[newData.kana] = {};
                state.kanaList[newData.kana][newData.kanji] = [newData];
            }
            !state.masterpieceList.includes(newData.masterpiece) && state.masterpieceList.push(newData.masterpiece);
            state.formData = {};
        },
        updateCharacter: (state) => {
            const updateData = state.formData;
            state.kanaList[updateData.kana][updateData.kanji] = state.kanaList[updateData.kana][updateData.kanji].map(
                kana => kana.id === updateData.id ? updateData : kana
            );
            state.formData = {};
            state.editData = {};

        },
        deleteCharacter: (state) => {
            const deleteData = state.editData;
            state.kanaList[deleteData.kana][deleteData.kanji] = 
                state.kanaList[deleteData.kana][deleteData.kanji].filter(kana => kana.id !== deleteData.id);
            state.formData = {};
            state.editData = {};
        },
        searchCharacter: (state) => {
            state.searchList = Object.assign({}, JSON.parse(JSON.stringify(state.kanaList)));
            if (state.searchText.kana !== '') {
                state.searchList = Object.fromEntries(Object.entries(state.searchList)
                    .filter(([key, value]) => key.includes(state.searchText.kana)))
            }

            if (state.searchText.kanji !== '') {
                Object.keys(state.searchList).forEach(kana => {
                    if (Object.keys(state.searchList[kana]).includes(state.searchText.kanji)){
                        state.searchList[kana] = Object.fromEntries(Object.entries(state.searchList[kana])
                            .filter(([key, value]) => key === state.searchText.kanji)
                        )
                    } else {
                        delete state.searchList[kana]
                    }
                })
            }

            if(state.searchText.masterpiece !== '') {
                Object.keys(state.searchList).forEach(kana => {
                    Object.keys(state.searchList[kana]).forEach(kanji => {
                        state.searchList[kana][kanji] = state.searchList[kana][kanji]
                            .filter(
                                data => data.masterpiece === state.searchText.masterpiece
                            )
                        state.searchList[kana][kanji].length === 0 && delete state.searchList[kana][kanji]
                    })
                    Object.values(state.searchList[kana]).length === 0 && delete state.searchList[kana]
                })
            }
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
            state.formData = {
                kana: 'あ',
                kanji: '',
                masterpiece: '',
                imageData: null
            }
        },
        toggleEditModal: (state) => {
            state.showEditModal = !state.showEditModal;
        },
        setEditData: (state, action) => {
            state.editData = action.payload;
        },
        setFormData: (state, action) => {
            state.formData = {
                ...state.formData,
                ...action.payload
            };
        }
    },
})

export const { 
    addCharacter, 
    updateCharacter, 
    deleteCharacter, 
    searchCharacter, 
    updateSearchText, 
    toggleAddModal, 
    toggleEditModal,
    setEditData,
    setFormData
} = kanaSlice.actions

export default kanaSlice.reducer