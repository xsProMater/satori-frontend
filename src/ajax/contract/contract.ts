import {fetchGet, fetchPost} from "../index";

/*Get Trading Pairs*/
export interface IPair {
    change: number
    id: number
    price: number
    settleCoin: SettleCoin
    settleCoinId: number
    symbol: string
    tradeCoin: TradeCoin
    tradeCoinId: number
}
export interface SettleCoin {
    icon: string
    id: number
    name: string
    settleDecimal: number
    symbol: string
}
export interface TradeCoin {
    icon: string
    id: number
    name: string
    settleDecimal: number
    symbol: string
}
export function getContractPairList() {
    return fetchPost<IPair[]>("/contract-provider/contract/contractPairList")
}
/*withdraw*/
interface IWithdraw {
    "amount": number,
    "expireTime": string,
    "signHash": string,
    "salt": string
}
export function withdraw(amount: string, originMsg: string, signHash: string) {
    return fetchPost<IWithdraw>("/contract-provider/withdraw/ask", {amount, originMsg, signHash})
}
interface IAddOrderParams {
    amount?: number
    contractPairId: number
    contractPositionId?: number
    isClose: boolean
    isLong: boolean
    isMarket: boolean
    price?: number | null
    quantity: number
    signHash: string
    originMsg: string
    lever: number
}
/*Contract placement*/
export async function addOrder(params: IAddOrderParams) {
    const { data } = await fetchPost<IPair>("/contract-provider/contract/order", params);
    return data;
}

/*Get Position List*/
export type IPositionList = {
    amount: number
    closingQuantity: number
    contractPairId: number
    createTime: string
    entrustId: number
    id: number
    isLong: boolean
    marginAmount: number
    openingPrice: number
    quantity: number
    restrictPrice: number
    status: number
    symbol: string
    lever: number
}
export const getPositionList = "/contract-provider/contract/selectContractPositionList";
/*Get the current delegate*/
export type ICurrentEntrustList = {
    amount: number
    contractPairId: number
    contractPositionId: number
    createTime: string
    dealAmount: string
    dealQuantity: string
    id: number
    isClose: boolean
    isLong: boolean
    isMarket: boolean
    price: number
    quantity: number
    symbol: string
}
export const getCurrentEntrustList = "/contract-provider/contract/selectContractCurrentEntrustList";

/*Get Contract Balance*/
export type IAccount = {
    availableAmount: string
    coinId: number
    frozenAmount: string
    id: number
    userId: number
}
export async function getAccountDetail(coinId: number) {
    const { data } = await fetchPost<IAccount>(`/contract-provider/contract-account/account/${coinId}`);
    return data;
}

/*Cancel current commission*/
export async function cancelEntrust(id: number) {
    return fetchGet<boolean>("/contract-provider/contract/cancelEntrust", {id})
}

/*Get Fills History*/
export type IFills = {
    amount: number
    averagePrice: number
    contractPairId: number
    contractPositionId: number
    createTime: string
    entrustId: number
    id: number
    isClose: boolean
    isLong: boolean
    isMarket: boolean
    isTaker: boolean
    positionFee: number
    profitLoss: number
    quantity: number
    status: number
    symbol: string
    tradeFee: number
}
export const getFillHistory = "/contract-provider/contract/selectContractMatchPairList";

export type ITransRecord = {
    accountAmount: string
    coinSymbol: string
    contractPairSymbol: string
    createTime: string
    id: number
    logType: string
    operateAmount: string
}
export const getTransRecord = "/contract-provider/contract/selectContractTransactionList";

export type IKline = {
    amount: number
    close: number
    contractPairId: number
    count: number
    hight: number
    low: number
    open: number
    period: string
    quantity: number
    time: number
}
export type IKlineParams = {
    contractPairId: number
    limit: number
    period: string
}
export const selectKlinePillarList = "/contract-quotes-provider/contract-quotes/selectKlinePillarList";

export type ITrade = {
    amount: number
    contractMatchPairId: number
    contractPairId: number
    isLong: boolean
    price: number
    quantity: number
    time: string
}
