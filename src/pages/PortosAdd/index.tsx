import { Button , Form } from 'react-bootstrap';
import Sidebar from "../Sidebar";
import HeaderPage from "../HeaderPage";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import "./styles.css";

const AddPortos = () => {
  const [cordaFonte, setcordaFonte] = useState('');
  const [tipodaFonte, settipodaFonte] = useState('');
  const email = sessionStorage.getItem("user_email");
  
  let navigate = useNavigate();

  const routeChange = () =>{ navigate("/cadastros")}

  const savePorto = async (event, dataToSend) => {
    event.preventDefault();
    await api.post('/portos/new', dataToSend)
    .then((res) => {
      console.log("Porto Cadastrado com Sucesso");
    })
    .catch(err => {
      console.log("Ocorreu um problema ao salvar no banco de dados");
    })
  }

  const extractFormData = () => {
    const formElements = document.querySelectorAll('input, select, text, number, textarea, textField');
    const dataForm = {};
    formElements.forEach((element: any) => {
        dataForm[element.name] = element.value || null;
    });
    return dataForm;
  };

  const createNewPorto = async (event) => {
    event.preventDefault()
  
    const dataToSend = {
        email,
        ...extractFormData()

    };
  
    if (!dataToSend.port_name || !dataToSend.port_code || !dataToSend.country || 
      !dataToSend.lat || !dataToSend.lon || !dataToSend.lat_float || !dataToSend.lon_float || 
      !dataToSend.port_id) {
      setcordaFonte("red")
      settipodaFonte("bold")
      alert('Preencha todos os campos obrigatórios')
    } else {
      try {
        savePorto(event, dataToSend);
        routeChange();
      } catch (error) {
          console.error("Ocorreu um problema ao salvar no banco de dados:", error);
      }
    }
  }


  return (
    <div className="flex-dashboard">
      <Sidebar elementoAtivo="cadastros"/>
      <main>
        <HeaderPage nomeOpcao="Portos"/>
        <div className="main-content">
          <p className="titulo-texto">Portos / Novo Porto</p> 

          <form className="form"  onSubmit={createNewPorto}>
            <div className="col-md-12">
              <section className="pedido-reserva">
                <div className="main-content">
                  <form className="form">
                    <div className="col-md-12">
                      <section className="pedido-reserva">
                        <div className="topo">
                          <h2 className="titulo-secao">Nova Porto</h2>
                        </div>
                        <div className='row'>
                          <div className="col-md-4">
                              <Form.Label htmlFor="port_name" style={{color: `${cordaFonte}`, fontWeight: `${tipodaFonte}`}}> Port Name *</Form.Label>
                              <Form.Control
                                type="text"
                                id="port_name"
                                name="port_name"
                                className="selecao"
                                aria-required="true"
                                aria-describedby="port_name"
                              />
                              <Form.Text id="port_name"><i>**(Santos - Brazil)</i></Form.Text>
                          </div>
                          <div className="col-md-4">
                            <Form.Label htmlFor="port_code" style={{color: `${cordaFonte}`, fontWeight: `${tipodaFonte}`}}> Port Code *</Form.Label>
                              <Form.Control
                                type="text"
                                id="port_code"
                                name="port_code"
                                className="selecao"
                                aria-required="true"
                                aria-describedby="port_code"
                              />
                              <Form.Text id="port_code"><i>**(BRSSZ)</i></Form.Text>
                          </div>
                          <div className="col-md-4">
                              <Form.Label htmlFor="country" style={{color: `${cordaFonte}`, fontWeight: `${tipodaFonte}`}}> Country *</Form.Label>
                                <Form.Select id="country" name="country" className='selecao' aria-label="Default select" >
                                <option value="">Country</option>
                                <option value="Afghanistan">Afghanistan</option>
                                <option value="Albania">Albania</option>
                                <option value="Algeria">Algeria</option>
                                <option value="American Samoa">American Samoa</option>
                                <option value="Andorra">Andorra</option>
                                <option value="Angola">Angola</option>
                                <option value="Anguilla">Anguilla</option>
                                <option value="Argentina">Argentina</option>
                                <option value="Armenia">Armenia</option>
                                <option value="Aruba">Aruba</option>
                                <option value="Australia">Australia</option>
                                <option value="Austria">Austria</option>
                                <option value="Azerbaijan">Azerbaijan</option>
                                <option value="Bahamas">Bahamas</option>
                                <option value="Bahrain">Bahrain</option>
                                <option value="Bangladesh">Bangladesh</option>
                                <option value="Barbados">Barbados</option>
                                <option value="Belarus">Belarus</option>
                                <option value="Belgium">Belgium</option>
                                <option value="Belize">Belize</option>
                                <option value="Benin">Benin</option>
                                <option value="Bermuda">Bermuda</option>
                                <option value="Bhutan">Bhutan</option>
                                <option value="Bolivia">Bolivia</option>
                                <option value="Bosnia and Herzegowina">Bosnia and Herzegowina</option>
                                <option value="Botswana">Botswana</option>
                                <option value="Bouvet Island">Bouvet Island</option>
                                <option value="Brazil">Brazil</option>
                                <option value="British Indian Ocean Territory">British Indian Ocean Territory</option>
                                <option value="Brunei Darussalam">Brunei Darussalam</option>
                                <option value="Bulgaria">Bulgaria</option>
                                <option value="Burkina Faso">Burkina Faso</option>
                                <option value="Burundi">Burundi</option>
                                <option value="Cambodia">Cambodia</option>
                                <option value="Cameroon">Cameroon</option>
                                <option value="Canada">Canada</option>
                                <option value="Cape Verde">Cape Verde</option>
                                <option value="Cayman Islands">Cayman Islands</option>
                                <option value="Central African Republic">Central African Republic</option>
                                <option value="Chad">Chad</option>
                                <option value="Chile">Chile</option>
                                <option value="China">China</option>
                                <option value="Christmas Island">Christmas Island</option>
                                <option value="Cocos (Keeling) Islands">Cocos (Keeling) Islands</option>
                                <option value="Colombia">Colombia</option>
                                <option value="Comoros">Comoros</option>
                                <option value="Congo">Congo</option>
                                <option value="Congo, the Democratic Republic of the">Congo, the Democratic Republic of the</option>
                                <option value="Cook Islands">Cook Islands</option>
                                <option value="Costa Rica">Costa Rica</option>
                                <option value="Cote d'Ivoire">Cote d'Ivoire</option>
                                <option value="Croatia (Hrvatska)">Croatia (Hrvatska)</option>
                                <option value="Cuba">Cuba</option>
                                <option value="Cyprus">Cyprus</option>
                                <option value="Czech Republic">Czech Republic</option>
                                <option value="Denmark">Denmark</option>
                                <option value="Djibouti">Djibouti</option>
                                <option value="Dominica">Dominica</option>
                                <option value="Dominican Republic">Dominican Republic</option>
                                <option value="Ecuador">Ecuador</option>
                                <option value="Egypt">Egypt</option>
                                <option value="El Salvador">El Salvador</option>
                                <option value="Equatorial Guinea">Equatorial Guinea</option>
                                <option value="Eritrea">Eritrea</option>
                                <option value="Estonia">Estonia</option>
                                <option value="Ethiopia">Ethiopia</option>
                                <option value="Falkland Islands (Malvinas)">Falkland Islands (Malvinas)</option>
                                <option value="Faroe Islands">Faroe Islands</option>
                                <option value="Fiji">Fiji</option>
                                <option value="Finland">Finland</option>
                                <option value="France">France</option>
                                <option value="French Guiana">French Guiana</option>
                                <option value="French Polynesia">French Polynesia</option>
                                <option value="French Southern Territories">French Southern Territories</option>
                                <option value="Gabon">Gabon</option>
                                <option value="Gambia">Gambia</option>
                                <option value="Georgia">Georgia</option>
                                <option value="Germany">Germany</option>
                                <option value="Ghana">Ghana</option>
                                <option value="Gibraltar">Gibraltar</option>
                                <option value="Greece">Greece</option>
                                <option value="Greenland">Greenland</option>
                                <option value="Grenada">Grenada</option>
                                <option value="Guadeloupe">Guadeloupe</option>
                                <option value="Guam">Guam</option>
                                <option value="Guatemala">Guatemala</option>
                                <option value="Guinea">Guinea</option>
                                <option value="Guinea-Bissau">Guinea-Bissau</option>
                                <option value="Guyana">Guyana</option>
                                <option value="Haiti">Haiti</option>
                                <option value="Heard and Mc Donald Islands">Heard and Mc Donald Islands</option>
                                <option value="Holy See (Vatican City State)">Holy See (Vatican City State)</option>
                                <option value="Honduras">Honduras</option>
                                <option value="Hong Kong">Hong Kong</option>
                                <option value="Hungary">Hungary</option>
                                <option value="Iceland">Iceland</option>
                                <option value="India">India</option>
                                <option value="Indonesia">Indonesia</option>
                                <option value="Iran (Islamic Republic of)">Iran (Islamic Republic of)</option>
                                <option value="Iraq">Iraq</option>
                                <option value="Ireland">Ireland</option>
                                <option value="Israel">Israel</option>
                                <option value="Italy">Italy</option>
                                <option value="Jamaica">Jamaica</option>
                                <option value="Japan">Japan</option>
                                <option value="Jordan">Jordan</option>
                                <option value="Kazakhstan">Kazakhstan</option>
                                <option value="Kenya">Kenya</option>
                                <option value="Kiribati">Kiribati</option>
                                <option value="Korea, Democratic People's Republic of">Korea, Democratic People's Republic of</option>
                                <option value="Korea, Republic of">Korea, Republic of</option>
                                <option value="Kuwait">Kuwait</option>
                                <option value="Kyrgyzstan">Kyrgyzstan</option>
                                <option value="Lao People's Democratic Republic">Lao People's Democratic Republic</option>
                                <option value="Latvia">Latvia</option>
                                <option value="Lebanon">Lebanon</option>
                                <option value="Lesotho">Lesotho</option>
                                <option value="Liberia">Liberia</option>
                                <option value="Libyan Arab Jamahiriya">Libyan Arab Jamahiriya</option>
                                <option value="Liechtenstein">Liechtenstein</option>
                                <option value="Lithuania">Lithuania</option>
                                <option value="Luxembourg">Luxembourg</option>
                                <option value="Macau">Macau</option>
                                <option value="Macedonia, The Former Yugoslav Republic of">Macedonia, The Former Yugoslav Republic of</option>
                                <option value="Madagascar">Madagascar</option>
                                <option value="Malawi">Malawi</option>
                                <option value="Malaysia">Malaysia</option>
                                <option value="Maldives">Maldives</option>
                                <option value="Mali">Mali</option>
                                <option value="Malta">Malta</option>
                                <option value="Marshall Islands">Marshall Islands</option>
                                <option value="Martinique">Martinique</option>
                                <option value="Mauritania">Mauritania</option>
                                <option value="Mauritius">Mauritius</option>
                                <option value="Mayotte">Mayotte</option>
                                <option value="Mexico">Mexico</option>
                                <option value="Micronesia, Federated States of">Micronesia, Federated States of</option>
                                <option value="Moldova, Republic of">Moldova, Republic of</option>
                                <option value="Monaco">Monaco</option>
                                <option value="Mongolia">Mongolia</option>
                                <option value="Montserrat">Montserrat</option>
                                <option value="Morocco">Morocco</option>
                                <option value="Mozambique">Mozambique</option>
                                <option value="Myanmar">Myanmar</option>
                                <option value="Namibia">Namibia</option>
                                <option value="Nauru">Nauru</option>
                                <option value="Nepal">Nepal</option>
                                <option value="Netherlands">Netherlands</option>
                                <option value="Netherlands Antilles">Netherlands Antilles</option>
                                <option value="New Caledonia">New Caledonia</option>
                                <option value="New Zealand">New Zealand</option>
                                <option value="Nicaragua">Nicaragua</option>
                                <option value="Niger">Niger</option>
                                <option value="Nigeria">Nigeria</option>
                                <option value="Niue">Niue</option>
                                <option value="Norfolk Island">Norfolk Island</option>
                                <option value="Northern Mariana Islands">Northern Mariana Islands</option>
                                <option value="Norway">Norway</option>
                                <option value="Oman">Oman</option>
                                <option value="Pakistan">Pakistan</option>
                                <option value="Palau">Palau</option>
                                <option value="Panama">Panama</option>
                                <option value="Papua New Guinea">Papua New Guinea</option>
                                <option value="Paraguay">Paraguay</option>
                                <option value="Peru">Peru</option>
                                <option value="Philippines">Philippines</option>
                                <option value="Pitcairn">Pitcairn</option>
                                <option value="Poland">Poland</option>
                                <option value="Portugal">Portugal</option>
                                <option value="Puerto Rico">Puerto Rico</option>
                                <option value="Qatar">Qatar</option>
                                <option value="Reunion">Reunion</option>
                                <option value="Romania">Romania</option>
                                <option value="Russian Federation">Russian Federation</option>
                                <option value="Rwanda">Rwanda</option>
                                <option value="Saint Kitts and Nevis">Saint Kitts and Nevis</option>
                                <option value="Saint Lucia">Saint Lucia</option>
                                <option value="Saint Vincent and the Grenadines">Saint Vincent and the Grenadines</option>
                                <option value="Samoa">Samoa</option>
                                <option value="San Marino">San Marino</option>
                                <option value="Sao Tome and Principe">Sao Tome and Principe</option>
                                <option value="Saudi Arabia">Saudi Arabia</option>
                                <option value="Senegal">Senegal</option>
                                <option value="Seychelles">Seychelles</option>
                                <option value="Sierra Leone">Sierra Leone</option>
                                <option value="Singapore">Singapore</option>
                                <option value="Slovakia (Slovak Republic)">Slovakia (Slovak Republic)</option>
                                <option value="Slovenia">Slovenia</option>
                                <option value="Solomon Islands">Solomon Islands</option>
                                <option value="Somalia">Somalia</option>
                                <option value="South Africa">South Africa</option>
                                <option value="Spain">Spain</option>
                                <option value="Sri Lanka">Sri Lanka</option>
                                <option value="St. Helena">St. Helena</option>
                                <option value="St. Pierre and Miquelon">St. Pierre and Miquelon</option>
                                <option value="Sudan">Sudan</option>
                                <option value="Suriname">Suriname</option>
                                <option value="Svalbard and Jan Mayen Islands">Svalbard and Jan Mayen Islands</option>
                                <option value="Swaziland">Swaziland</option>
                                <option value="Sweden">Sweden</option>
                                <option value="Switzerland">Switzerland</option>
                                <option value="Syrian Arab Republic">Syrian Arab Republic</option>
                                <option value="Taiwan">Taiwan</option>
                                <option value="Tajikistan">Tajikistan</option>
                                <option value="Tanzania, United Republic of">Tanzania, United Republic of</option>
                                <option value="Thailand">Thailand</option>
                                <option value="Togo">Togo</option>
                                <option value="Tokelau">Tokelau</option>
                                <option value="Tonga">Tonga</option>
                                <option value="Trinidad and Tobago">Trinidad and Tobago</option>
                                <option value="Tunisia">Tunisia</option>
                                <option value="Turkey">Turkey</option>
                                <option value="Turkmenistan">Turkmenistan</option>
                                <option value="Tuvalu">Tuvalu</option>
                                <option value="Uganda">Uganda</option>
                                <option value="Ukraine">Ukraine</option>
                                <option value="United Arab Emirates">United Arab Emirates</option>
                                <option value="United Kingdom">United Kingdom</option>
                                <option value="United States">United States</option>
                                <option value="Uruguay">Uruguay</option>
                                <option value="Uzbekistan">Uzbekistan</option>
                                <option value="Vanuatu">Vanuatu</option>
                                <option value="Venezuela">Venezuela</option>
                                <option value="Viet Nam">Viet Nam</option>
                                <option value="Western Sahara">Western Sahara</option>
                                <option value="Yemen">Yemen</option>
                                <option value="Yugoslavia">Yugoslavia</option>
                                <option value="Zambia">Zambia</option>
                                <option value="Zimbabwe">Zimbabwe</option>
                                </Form.Select>
                          </div>
                        </div>
                        <div className='row'>
                          <div className="col-md-4">
                              <Form.Label htmlFor="lat" style={{color: `${cordaFonte}`, fontWeight: `${tipodaFonte}`}}> Latitude (graus) *</Form.Label>
                              <Form.Control
                                type="text"
                                id="lat"
                                name="lat"
                                className="selecao"
                                aria-required="true"
                                aria-describedby="lat"
                              />
                              <Form.Text id="lat"><i>**(23°55'S)</i></Form.Text>
                          </div>
                          <div className="col-md-4">
                              <Form.Label htmlFor="lon" style={{color: `${cordaFonte}`, fontWeight: `${tipodaFonte}`}}> Longitude (graus) *</Form.Label>
                              <Form.Control
                                type="text"
                                id="lon"
                                name="lon"
                                className="selecao"
                                aria-required="true"
                                aria-describedby="lon"
                              />
                              <Form.Text id="lon"><i>**(46°19'W)</i></Form.Text>
                          </div>
                          <div className="col-md-4">
                              <Form.Label htmlFor="lat_float" style={{color: `${cordaFonte}`, fontWeight: `${tipodaFonte}`}}> Latitude *</Form.Label>
                              <Form.Control
                                type="text"
                                id="lat_float"
                                name="lat_float"
                                className="selecao"
                                aria-required="true"
                                aria-describedby="lat_float"
                              />
                              <Form.Text id="lat_float"><i>**(-23.91667)</i></Form.Text>
                          </div>
                        </div>
                        <div className='row'>
                          <div className="col-md-4">
                                <Form.Label htmlFor="lon_float" style={{color: `${cordaFonte}`, fontWeight: `${tipodaFonte}`}}> Longitude *</Form.Label>
                                <Form.Control
                                  type="text"
                                  id="lon_float"
                                  name="lon_float"
                                  className="selecao"
                                  aria-required="true"
                                  aria-describedby="lon_float"
                                />
                                <Form.Text id="lon_float"><i>**(-46.31667)</i></Form.Text>
                            </div>
                            <div className="col-md-4">
                                <Form.Label htmlFor="port_id" style={{color: `${cordaFonte}`, fontWeight: `${tipodaFonte}`}}> Port ID *</Form.Label>
                                <Form.Control
                                  type="text"
                                  id="port_id"
                                  name="port_id"
                                  className="selecao"
                                  aria-required="true"
                                  aria-describedby="port_id"
                                />
                                <Form.Text id="port_id" className="text-left"><i>**(BRSSZ_Brazil/Santos)</i></Form.Text>
                            </div>
                        </div>
                        <div className='row'>
                          <p></p>
                          <span className='small text-start'>
                            * Campos obrigatórios<p></p>
                            ** Exemplos de preenchimento
                          </span>
                        </div>
                      </section>
                    </div>
                  </form>
                </div>
                    <div className="row">
                      <div className="col-md-6">
                        <Button type="button" onClick={routeChange} className="btn btn-danger botao">Cancelar</Button>
                      </div>
                      <div className="col-md-6">
                        <Button type="submit" className="botao">Salvar</Button>
                      </div>
                    </div>
              </section>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default AddPortos;
