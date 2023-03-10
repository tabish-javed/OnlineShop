class Cart {

    constructor(items = [], totalQuantity = 0, totalPrice = 0) {
        this.items = items
        this.totalQuantity = totalQuantity
        this.totalPrice = totalPrice
    }

    addItem(product) {
        const cartItem = {
            product: product,
            quantity: 1,
            totalPrice: product.price
        }

        for (let index = 0; index < this.items.length; index++) {
            const item = this.items[index]
            if (item.product.id === product.id) {
                cartItem.quantity = item.quantity + 1
                cartItem.totalPrice = item.totalPrice + product.price
                this.items[index] = cartItem

                this.totalQuantity++
                this.totalPrice += product.price
                return
            }
        }

        this.items.push(cartItem)
        this.totalQuantity++
        this.totalPrice += product.price
    }

    updateItem(productId, newQuantity) {
        for (let index = 0; index < this.items.length; index++) {
            const item = this.items[index]
            if (item.product.id === productId && newQuantity > 0) {
                const cartItem = { ...item }
                const quantityChange = newQuantity - item.quantity
                cartItem.quantity = newQuantity
                cartItem.totalPrice = newQuantity * item.product.price
                this.items[index] = cartItem

                this.totalQuantity = this.totalQuantity + quantityChange
                this.totalPrice += quantityChange * item.product.price
                return { updatedItemPrice: cartItem.totalPrice }
            } else if (item.product.id === productId && newQuantity <= 0) {
                this.items.splice(index, 1)
                this.totalQuantity = this.totalQuantity - item.quantity
                this.totalPrice -= item.totalPrice
                return { updatedItemPrice: 0 }
            }
        }
    }
}

module.exports = Cart