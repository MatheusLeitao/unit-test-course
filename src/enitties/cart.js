import _ from 'lodash'
import { app } from '../config/app'
import Dinero from 'dinero.js'

const Money = Dinero

Money.defaultCurrency = app.currency
Money.defaultPrecision = 2


export default class Cart {
    
    items = []
    
    getTotal(){
        return this.items.reduce((acc, { product, quantity, condition}) => { 
            
            const amount = Money({ amount: product.price * quantity})
            let discount = condition?  calculateDiscount(amount, quantity, condition) : Money({ amount: 0 })
            
            return acc.add(amount).subtract(discount)
            
        }, Money({ amount: 0 }))
    }
    
    addItem(item){
        const itemToFind = {product: item.product}
        if(_.find(this.items, itemToFind)) _.remove(this.items, itemToFind)
        
        this.items.push(item)
    }
    
    removeItem(product){
        _.remove(this.items, { product })
    }
    
    summary(){
        const total = this.getTotal()
        const formatted = total.toFormat('$0,0.00')
        const items = this.items
        
        return {
            total,
            formatted,
            items
        }
        
    }
    
    checkout(){
        const { total, items } = this.summary()
        
        this.items = []
        
        return {
            total: total.getAmount(),
            items
        }
    }
}

const calculateDiscount = (amount, quantity, condition) => {
    
    const list = Array.isArray(condition) ? condition : [ condition ]
    
    
    const [ higherDiscount, leastDiscount ] = list.map( cond => {
        
        if(cond.percentage && quantity > cond.minimun){
            return amount.percentage(cond.percentage).getAmount()
        }
        
        if(cond.quantity){
            const isEven = quantity % 2 === 0
            return amount.percentage(isEven? 50: 40).getAmount()
        }
        
    }).sort((a, b) => b - a)
    
    return Money({ amount: higherDiscount? higherDiscount:  0 })
}