const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			],
			contacts: []
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},
			loadSomeData: () => {
				/**
					fetch().then().then(data => setStore({ "foo": data.bar }))
				*/
			},

			// READ CONTACTS
			getContacts: async () => {
				const store = getStore();

				try {
					const response = await fetch(`https://playground.4geeks.com/contact/agendas/fede/contacts`, { method: 'GET' })
					if (!response.ok) {
						console.log("Error getting all the contacts", response.statusText)
						throw new Error("Error getting all the contacts");
					}
					const data = await response.json();
					setStore({ ...store, contacts: data.contacts })

				} catch (error) {
					console.error(error)
				}
			},

			//ADD NEW CONTACT
			addContact: async (payload) => {
				try {
					const response = await fetch('https://playground.4geeks.com/contact/agendas/fede/contacts', {
						method: 'POST',
						body: JSON.stringify(payload),
						headers: {
							'Content-type': 'application/json; charset=UTF-8',
						}
					})
					if (!response.ok) {
						console.log("Error trying to add a new contact: ", response.statusText);
						throw new Error(response.statusText);
					}

					const data = response.json()
					setStore({ ...store, contacts: [...store.contacts, data] })

					return data
				} catch (error) {
					return error
				}
			},

			//EDIT CONTACT
			editContact: async (id, payload) => {


				try {
					const response = await fetch(`https://playground.4geeks.com/contact/agendas/fede/contacts/${id}`, {
						method: 'PUT',
						body: JSON.stringify(payload),
						headers: {
							'Content-type': 'application/json; charset=UTF-8',
						}
					});

					if (!response.ok) {
						throw new Error("Error trying to update contact, ", response.status);
					}
					const data = await response.json();
					
					const store = getStore();
					const updatedContacts = store.contacts.map(contact => 
						contact.id === id ? data : contact
					);
					setStore({ ...store, contacts: updatedContacts });
					return true

				} catch (error) {
					console.error(error)
					return false
				}
			},


			//DELETE CONTACT
			deleteContact: async (id) => {
				const store = getStore();

				try {
					const response = await fetch(`https://playground.4geeks.com/contact/agendas/fede/contacts/${id}`, { method: 'DELETE' })

					if (!response.ok) {
						throw new Error("Error trying to DELETE the contact", response.status);
					}
					setStore({
						...store, contacts: store.contacts.filter(contact => contact.id !== id)
					})

					return response

				} catch (error) {
					console.log("Error deleting contact from api", error)
				}
			},

			//CREATE USER (AGENDA)
			createUserAgenda: async (user) => {
				try {
					let payload = {
						slug: user
					}
					const response = await fetch(`https://playground.4geeks.com/contact/agendas/${user}`, {
						method: "POST",
						body: JSON.stringify(payload),
						headers: {
							'Content-type': 'application/json; charset=UTF-8',
						}
					});
					const data = await response.json();
		
					if (!response.ok) {
						throw new Error("There was an error into the createUserAgenda function", response.statusText, data.detail);
					}

					return data;

		
				} catch (error) {
					console.log("There was an error, this is inside the catch into the createUser function, ", error)
					return error
				}
			},
		}
	};
};

export default getState;
