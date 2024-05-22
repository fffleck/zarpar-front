import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';


type ResultadoProps = {
    armador: string;
    id_armador: string;
    tipo_container: string;
    porto_embarque: string;
    porto_descarga: string;
    navio: string;
    data_embarque: string;
    tempo_de_transito: string;
    data_chegada: string;
    base_freight: string;
    bunker: string;
    isps: string;
    imagem_link: string;
    shipment_id: string;
  };

// const LabelModal = (props: ResultadoProps) => {
//   const [smShow, setSmShow] = useState(false);

//   return (
//     <>
//     <Button onClick={() => setSmShow(true)}>USD {props.base_freight + props.bunker + props.isps} </Button>
//     {/* <a href='#'  onClick={() => setSmShow(true)}> {props.base_freight + props.bunker + props.isps }</a> */}
//       <Modal
//         size="sm"
//         show={smShow}
//         onHide={() => setSmShow(false)}
//         aria-labelledby="example-modal-sizes-title-sm"
//       >
//         <Modal.Header closeButton>
//           <Modal.Title id="example-modal-sizes-title-sm">
//             Taxes
//           </Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//                 <table className="table table-striped table-hover" >
//                      <tr>
//                          <td style={{"color": "black", "textAlign": "left"}}>Freight : </td>
//                          <td style={{"color": "black", "textAlign": "right"}}>{props.base_freight}</td>
//                      </tr>
//                      <tr>
//                          <td style={{"color": "black", "textAlign": "left"}}>Bunker : </td>
//                          <td style={{"color": "black", "textAlign": "right"}}>{props.bunker}</td>
//                      </tr>
//                      <tr>
//                          <td style={{"color": "black", "textAlign": "left"}}>Isps : </td>
//                          <td style={{"color": "black", "textAlign": "right"}}>{props.isps}</td>
//                      </tr>
//                  </table>
//         </Modal.Body>
//       </Modal>
//     </>
//   );
// }

// export default LabelModal;


const LabelModal = (props: ResultadoProps) => {
    if (props.base_freight === "No space available") {
      return (<Button>{props.base_freight} </Button>)
    } else {
      return (
        <>
          {['right'].map((placement) => (
            <OverlayTrigger
              trigger="hover"
              key={placement}
              placement={placement}
              overlay={
                <Popover id={`popover-positioned-${placement}`}>
                  <Popover.Header as="h3">Taxes</Popover.Header>
                  <Popover.Body>
                  <table className="table table-striped table-hover" style={{"width": "100px"}} >
                       <tr>
                           <td style={{"color": "black", "textAlign": "left"}}>Freight : </td>
                           <td style={{"color": "black", "textAlign": "right"}}>{props.base_freight}</td>
                       </tr>
                       <tr>
                           <td style={{"color": "black", "textAlign": "left"}}>Bunker : </td>
                           <td style={{"color": "black", "textAlign": "right"}}>{props.bunker}</td>
                       </tr>
                       <tr>
                           <td style={{"color": "black", "textAlign": "left"}}>Isps : </td>
                           <td style={{"color": "black", "textAlign": "right"}}>{props.isps}</td>
                       </tr>
                   </table>
                    
                  </Popover.Body>
                </Popover>
              }
            >
              <Button>USD {parseFloat(props.base_freight) + parseFloat(props.bunker) + parseFloat(props.isps)} </Button>
            </OverlayTrigger>
          ))}
        </>
      );
    } 
  
  
  }
  
  export default LabelModal;