import * as actions from '../constants/index'

export const ingName = (payload) => {
    return { type: actions.ingActions.ING_NAME, payload }
}

export const ingMeasure = (payload) => {
    return { type: actions.ingActions.ING_MEASURE, payload }
}

export const createIng = (payload) => {
    return { type: actions.ingActions.CREATE_ING, payload }
}

export const deleteIng = (payload) => {
    return { type: actions.ingActions.DELETE_ING, payload }
}

export const updateIng = (payload) => {
    return { type: actions.ingActions.UPDATE_ING, payload }
}
export const allIng = (payload) => {
    return { type: actions.ingActions.ALL_ING, payload }
}