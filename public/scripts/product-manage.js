const deleteProductElements = document.querySelectorAll(".product-item button")

async function deleteProduct(event) {
    const buttonElement = event.target
    const productId = buttonElement.dataset.productid
    const csrfToken = buttonElement.dataset.csrf

    const response = await fetch("/admin/products/" + productId + "?_csrf=" + csrfToken, {
        method: "delete"
    })

    if (!response.ok) {
        alert("Something went wrong")
        return
    }

    buttonElement.parentElement.parentElement.parentElement.parentElement.remove()
}


for (const deleteProductElement of deleteProductElements) {
    deleteProductElement.addEventListener("click", deleteProduct)
}