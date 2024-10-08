import moment from "moment";
import { Button } from "react-bootstrap";


type ResultadoProps = {
  id: string;
  name: string;
  enterpriseName: string;
  email: string;
  countLogin: string;
  lastLogin: Date;
  search: string;
  active: string;
};

const ResultadoListClients = (props: ResultadoProps) => {
      return (
        <tr key={props.id}>
          <td>{props.id.substring(props.id.length - 6 )}</td>
          <td>{props.name}</td>
          <td>{props.enterpriseName}</td>
          <td>{props.email}</td>
          <td>{props.countLogin ?? 0}</td>
          <td>{props.lastLogin ? moment(props.lastLogin).format('DD/MM/YYYY HH:II:SS') : 'Indeterminate'}</td>
          <td>{props.search ?? 0}</td>
          <td>
            {(props.active === "A") ? (
              <Button className="btn btn-primary botao" > Ativo </Button>
            ) : (
              (props.active === "I") ? (
                <Button className="btn btn-info botao" > Inativo </Button>
              ) : (
                <Button className="btn btn-danger botao" > Bloqueado </Button>
              )
            )
            }  
          </td>
        </tr>
      );  
};

export default ResultadoListClients;
