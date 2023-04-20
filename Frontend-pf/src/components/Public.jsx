import useTitle from "../hooks/useTitle";

const Public = () => {
  useTitle("Datazo.com");
  const content = (
    <>
      <section id="inicio" className="p-4">
        <div class="presentation">
          <img
            src="https://i.ibb.co/BwmgQJD/Presentacion.png"
            alt="Presentacion"
          />
        </div>
      </section>
      <div class="moreinfo1">
        <a href="#categories" class="btn btn-primary btn-lg">
          Ver Categorías ⤓
        </a>
      </div>
      <section id="categories">
        <div class="parrafo">
          <h2>¡Buscá según la categoría que necesitás!</h2>
        </div>
        <div class="categorias1">
          <a href="#plomeros" class="botoncategorias">
            <img
              src="https://i.ibb.co/LzGk2nC/Plomeros.png"
              alt="Plomeros"
            ></img>
          </a>
          <a href="#gasistas" class="botoncategorias">
            <img
              src="https://i.ibb.co/zS3KzQ3/Gasistas.png"
              alt="Gasistas"
            ></img>
          </a>
          <a href="#pintores" class="botoncategorias">
            <img
              src="https://i.ibb.co/5kP23P9/Pintores.png"
              alt="Pintores"
            ></img>
          </a>
        </div>
        <div class="categorias2">
          <a href="#carpinteros" class="botoncategorias">
            <img
              src="https://i.ibb.co/3SB9f4p/Carpinteros.png"
              alt="Carpinteros"
            ></img>
          </a>
          <a href="#electricistas" class="botoncategorias">
            <img
              src="https://i.ibb.co/rM6Qr0X/Electricistas.png"
              alt="Electricistas"
            ></img>
          </a>
          <a href="#albaniles" class="botoncategorias">
            <img
              src="https://i.ibb.co/jWxsHQ4/Alba-iles.png"
              alt="Albañiles"
            ></img>
          </a>
        </div>
      </section>
      <br />
      <br />
      <div class="moreinfo2" id="about">
        <a class="btn btn-primary btn-lg" href="#about">
          Acerca de nosotros ⤓
        </a>
      </div>
      <br />
      <br />
      <div class="img-container2">
        <img src="https://i.ibb.co/XDmXrt1/About.png" alt="About" border="0" />
      </div>
      <br />
      <br />
      <br />
      <div class="moreinfo2" id="faqs">
        <a class="btn btn-primary btn-lg" href="#faqs">
          FAQs ⤓
        </a>
      </div>
      <div class="img-container2" id="faqs">
        <img src="https://i.ibb.co/GWtMKcT/FAQs.png" alt="FAQs" border="0" />
      </div>
      <br />
      <br />
      <br />
      <br />
    </>
  );
  return content;
};
export default Public;
