// src/server.js
import {Server, Model} from "miragejs"

export function makeServer({environment = "test"} = {}) {
	let server = new Server({
		environment,

		models: {
			user: Model,
		},

		seeds(server) {
			server.create("user", {
				id: 0,
				key: 0,
				name: "Bob",
				roles: ['admin']
			});
			server.create("user", {
				id: 1,
				key: 1,
				name: "Mary",
				roles: ['guest', 'user']
			});
		},

		routes() {
			this.namespace = "api"

			this.get("/users", (schema) => {
				return schema.users.all()
			})
		},
	});

	return server;
}
