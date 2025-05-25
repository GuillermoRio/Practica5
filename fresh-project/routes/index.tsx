import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import axios from "npm:axios";
import Whatsapp from "../islands/Whatsapp.tsx"

type Contacto = {
  id: number,
  name: string,
  email: string,
  phone: number,
}

export const handler:Handlers = {
  async GET(_req: Request, ctx: FreshContext) {
    try {
      const respuesta = await axios.get<Contacto[]>("https://back-a-p4.onrender.com/contacts/");
      //console.log(respuesta);
      return ctx.render(respuesta.data)
    }catch(e){
      <div>ERROR</div>
    }
  }
}

export default function Page(props: PageProps) {
  //console.log(props.data.data);

  return (
    <div class="pagina-principal">
      <div class="lado-izquierdo">
        <div class="boton-creador"><a href={"../newcontact"}> Create Contact</a></div>
        {props.data.data.map((Contacto) => {
          return(
            <div class="num-contactos">
              {Contacto.name}
              <br style={{margin_bottom: 2}}/>
              {Contacto.phone}
            </div>
          );
        })}
      </div>
      <div class="whatsapp">
        <Whatsapp />
      </div>
    </div>
  );
}
