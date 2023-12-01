const storeForm = document.getElementById("store-form")
const storeId = document.getElementById("store-id")
const storeAddress = document.getElementById("store-address")

storeForm.addEventListener("submit", addStore)

// Send POST to API to add store
async function addStore(e) {
	e.preventDefault()
    console.log(storeId,storeAddress)
	if (storeId.value === "" || storeAddress.value === "")
		alert("Please fill in fields")
    console.log(storeId, storeAddress)
	const sendData = {
		storeId: storeId.value,
		address: storeAddress.value,
	}

	try {
		const res = await fetch("api/v1/stores", {
			method: "POST",
			headers: {
				"content-type": "application/json",
			},
			body: JSON.stringify(sendData),
		})

		if (res.status == 400) {
			throw Error("The Store already exists")
		}
        if (res.status != 200) throw Error("An error occurred")
		alert("Store has been updated !")
		window.location.href = "/index.html"
	} catch (err) {
		alert(err)
		return
	}
}
