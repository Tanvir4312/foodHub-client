export type OrderDataType = {
    delivery_address : string
    items : {
        mealId : string
        quantity : number
    }[]
}