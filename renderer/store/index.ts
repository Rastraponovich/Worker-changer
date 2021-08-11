import { Context, createWrapper, MakeStore } from "next-redux-wrapper"
import { AnyAction, applyMiddleware, createStore, Store } from "redux"
import thunk, { ThunkAction, ThunkDispatch } from "redux-thunk"
import { RootState, reducer } from "./reducers"
import { composeWithDevTools } from "redux-devtools-extension"

const bindMiddleware = (middleware: any) => {
    if (process.env.NODE_ENV !== "production") {
        return composeWithDevTools(applyMiddleware(...middleware))
    }
    return applyMiddleware(...middleware)
}

const makeStore: MakeStore<Store<RootState>> = (context: Context) => {
    return createStore(reducer, bindMiddleware([thunk]))
}

export const wrapper = createWrapper<Store<RootState>>(makeStore, {
    debug: true,
})

export type NextThunkDispatch = ThunkDispatch<RootState, void, AnyAction>
