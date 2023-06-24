import React from 'react';

const UltimaSolicitud = () => {
  return (
    <><div>
      <h3 style={{ color: "#494C4F", textAlign: "left", marginLeft: "1.5vw", marginTop: "-8px" }}><br></br><br></br>
        Solicitudes de Trabajo<br></br>
     </h3>
    </div><br></br>
    <div class="col-md-3"
    style={{ marginLeft:"1.5vw"}}>
        <div class="card">
            <div class="card-body">
                <h4 class="card-title d-flex justify-content-between align-items-center">
                  Última Solicitud
                  <a href="      "></a>
                </h4>
                <p>Descripción</p>
                <form action="      " method="      ">
                    <input type="hidden" name="_method" value="delete"/>
                    <button class="btn btn-danger btn-block btn-sm" type="submit">
                        Cancelar
                    </button>
                </form>
            </div>
        </div>
     </div>
    <br></br><br></br><br></br></>
  );
}

export default UltimaSolicitud;
