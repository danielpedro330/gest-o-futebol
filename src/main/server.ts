import { app } from "./config/app"
import { env } from "../env/index"

app.listen({
    host: "0.0.0.0",
    port: env.PORT
}).then(() => {
    console.log("🚀HTTP Server Running!")
})