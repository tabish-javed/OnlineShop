class Order {

    constructor(cart, userData, status = "pending", date, orderId) {
        this.productData = cart
        this.userData = userData
        this.status = status
        this.date = new Date(date)
        if (this.date) {
            this.formatDate = this.date.toLocaleDateString("en-US", {
                weekday: "short",
                day: "numeric",
                month: "long",
                year: "numeric"
            })
        }
        this.id = orderId
    }


}

module.exports = Order