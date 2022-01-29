import { connect } from 'react-redux';
import {IState} from "./reducer";
import {Dispatch} from "redux";
import {ComponentType} from "react";
import * as actions from './actionTypes';
import {ITrans} from "../contract/types";


const mapStateToProps = (state: IState) => ({
    redux: state
});

export const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        setLanguage(language: string) {
            localStorage.setItem("lang", language);
            dispatch({
                type: actions.SET_LANG,
                data: language
            })
        },
        setWalletAddress(address: string) {
            sessionStorage.setItem("wallet_address", address);
            dispatch({
                type: actions.SET_WALLET_ADDRESS,
                data: address
            })
        },
        setTrans(trans: ITrans[]) {
            dispatch({
                type: actions.SET_TRANS,
                data: trans
            })
        },
        setLocalTrans(trans: ITrans[]) {
            sessionStorage.setItem("trans", JSON.stringify(trans));
            dispatch({
                type: actions.SET_LOCAL_TRANS,
                data: trans
            })
        },
        setCompletedHash(hash: string) {
            dispatch({
                type: actions.SET_COMPLETED_HASH,
                data: hash
            })
        },
        setToken(token: string) {
            sessionStorage.setItem("token", token);
            dispatch({
                type: actions.SET_TOKEN,
                data: token
            })
        }
    }
};

export interface IConnectProps extends ReturnType<typeof mapDispatchToProps> {
    redux: IState
}

export default <p>(component: ComponentType<p>) => {
    return connect(mapStateToProps, mapDispatchToProps)<ComponentType<any>>(component);
}
