import axios from "npm:axios";
import { Handlers } from "$fresh/server.ts";

export const handler:Handlers = {
  async POST(req: Request) {
    try {
      const body = await req.json(); // Espera un JSON con { name, email, phone }
      
      const nuevoContacto = {
        name: body.name,
        email: body.email,
        phone: body.phone,
      };

      const respuesta = await axios.post("https://back-a-p4.onrender.com/contacts/", nuevoContacto);

      return new Response(JSON.stringify(respuesta.data), {
        status: 201,
        headers: { "Content-Type": "application/json" },
      });
    } catch (e) {
      console.error(e);
      return new Response("Error al crear contacto", { status: 500 });
    }
  }
} 

export default function Counter() {
  return (
    
    <form method="POST" class="formulario-contacto">
      <input type="text" name="name" placeholder="Nombre" required />
      <input type="email" name="email" placeholder="Email" required />
      <input type="number" name="phone" placeholder="Teléfono" required />
      <button type="submit">Agregar contacto</button>
    </form>
  );
}
