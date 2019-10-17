import axios from 'axios';

export default {
    namespace: 'esc',
    state: {
        current: 1,
        results: []
    },
    // 同步
    reducers: {
        INIT(state, {results, total}){
            return {
                ...state,
                results,
                total
            };
        },
        CHANGECURRENT(state, {current}){
            return {
                ...state,
                current
            };
        }
    },
    // 异步
    effects: {
        *INITSAGA(action, { put, select }){
            const { current } = yield select(({esc}) => esc);
            const { results, total } = yield axios.get('http://192.168.2.250:3000/car?page=' + current).then(data => data.data);
            yield put({'type': 'INIT', results, total});
        },
        *CHANGECURRENT_SAGA({ current }, { put }){
            yield put({'type': 'CHANGECURRENT', current});
            yield put({'type': 'INITSAGA'});
        }
    }
};