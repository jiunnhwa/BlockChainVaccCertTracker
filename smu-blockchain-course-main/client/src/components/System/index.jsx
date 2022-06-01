import React, {useState, useEffect} from 'react'
import {Header, Icon, Segment, Form} from 'semantic-ui-react'
import sha256 from 'crypto-js/sha256';
import getWeb3 from '../../getWeb3';
import FileSystem from "../../contracts/FileSystem.json"

export default function System(){
  const [click, setClick] = useState(false);
  const [hash, setHash] = useState("");
  const [name, setName] = useState("");
  const [sex, setSex] = useState("");
  const [ic, setIc] = useState("");
  const [dob, setDob] = useState("");
  const [vaccinationStatus, setVaccinationStatus] = useState("");
  const [date, setDate] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [account, setAccount] = useState([]);
  const [contract, setContract] = useState();
  const [verified, setVerified] = useState(false);
  useEffect(()=>{
    async function fetchData() {
        try {
            const web3 = await getWeb3();
            await web3.eth.getAccounts().then(value=>setAccount(value));
            const networkId = await web3.eth.net.getId();
            const instance = new web3.eth.Contract(
                FileSystem.abi,
                FileSystem.networks[networkId] && FileSystem.networks[networkId].address,
            )
            setContract(instance)
            setLoaded(true);
        } 
        catch(e) {
            console.error(e);
        }
    }
    fetchData();
  },[account]);
  useEffect(()=>{
    async function fetchCertificate() {
        if (!click && hash !== "") {
            try {
                await contract.methods.fetchCert(hash).call()
                    .then(result => (
                        setName(result[0]), setCourse(result[1], setIssuer(result[2]), setDate(result[3]),
                        (result[3]) ? setVerified(true) : "")
                    ));
            }
            catch (e){
                console.error(e);
            }
        }
    }
    fetchCertificate();
  },[hash])
  const fileChange = (e) => {
      let reader = new FileReader();
      reader.onload = function(evt) {
        setHash(sha256(evt.target.result).toString());
      };
      reader.readAsText(e.target.files[0])
  }

  const handleClick = event => {
    hiddenFileInput.current.click();
  };

  const handleSubmit = async() => {
    await contract.methods.createCert(hash, name, sex, ic, dob, vaccinationStatus, date).send({from: account[0]});
    setHash("");
    setName("");
    setSex("");
    setIc("");
    setDob("");
    setDate("");
    setVaccinationStatus("");
  }

  const hiddenFileInput = React.useRef(null);
  
  return(
    <>
    {loaded ? (
    <div className="container">
      
  <div style={{display:'flex', justifyContent:"space-between", alignItems:"center", marginBottom:"15px"}}>
  <h1>CERTIFICATE</h1> <button onClick={()=>{setClick(!click); setVerified(false);}} >{click ? "ISSUER":"USER"}</button>
  </div>

  <Form>
      <Segment placeholder>
    <Header icon>
      <Icon name='pdf file outline' />
      {!hash ? "No documents are listed" :"Files Uploaded"}
    </Header>
    <div className="flex_center">
        <button onClick={handleClick}>Add Document</button>
    </div>
    <input
        type="file"
        ref={hiddenFileInput}
        hidden
        onChange={(e)=>fileChange(e)}
    />
  </Segment>
      {verified ? (<button style={{marginBottom:"20px"}}>VERIFIED</button>):""}
      <Form.Field >
      <label>Name:</label>
      <input value={name} onChange={(e)=>setName(e.target.value)}/>
    </Form.Field>
    <Form.Field >
      <label>Sex:</label>
      <input value={sex} onChange={(e)=>setSex(e.target.value)}/>
    </Form.Field>
    <Form.Field >
      <label>NRIC:</label>
      <input value={ic} onChange={(e)=>setIc(e.target.value)}/>
    </Form.Field>
    <Form.Field >
      <label>Date of Birth:</label>
      <input value={dob} onChange={(e)=>setDob(e.target.value)}/>
    </Form.Field>
    <Form.Field >
      <label>Vaccination Status:</label>
      <input value={vaccinationStatus} onChange={(e)=>setVaccinationStatus(e.target.value)}/>
    </Form.Field>
    <Form.Field >
      <label>Date:</label>
      <input value={date} onChange={(e)=>setDate(e.target.value)}/>
    </Form.Field>
    {click ? <button type='submit' onClick={()=>handleSubmit()}>Submit</button>:""}
    
  </Form>
  </div>
    ): (<h1>Not Loaded</h1>)}
    </>
  )
  
}

