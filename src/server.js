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
			this.namespace = "api";

			this.get("/users", (schema) => {
				return schema.users.all()
			});
			
			this.post("/users/:id", (schema, request) => {
				let attrs = JSON.parse(request.requestBody);
				let id = request.params.id;
				if (id) {
					let user = schema.users.find(id);
	
	  				return user.update(attrs)
				}
				return schema.movies.create(attrs);
			});
			
			this.delete("/users/:id", (schema, request) => {
			  let id = request.params.id;
			
			  return schema.movies.find(id).destroy()
			})
		},
	});

	return server;
}
